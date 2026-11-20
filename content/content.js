/**
 * Sheets Order States Tracker - Content Script
 * Tracks order states: مؤكدة, ملغية, مكررة, fausse commande
 */

console.log("[Sheets Order States Tracker] Content Script active.");

// Message listener from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "SCAN_SHEET_STATES" || request.action === "QUICK_SCAN_SHEET") {
    try {
      const data = extractVersionHistoryStates();
      if (data.length > 0) {
        chrome.storage.local.set({ savedSheetEdits: data });
        sendResponse({ success: true, count: data.length, data: data });
      } else {
        sendResponse({ 
          success: false, 
          message: "Please open File > Version history to read accurate collaborator edit records." 
        });
      }
    } catch (e) {
      sendResponse({ success: false, message: e.toString() });
    }
    return true;
  }
});

/**
 * Extracts revision entries from Google Sheets Version History DOM
 * and maps states (مؤكدة, ملغية, مكررة, fausse commande)
 */
function extractVersionHistoryStates() {
  const results = [];
  const validStates = ["مؤكدة", "ملغية", "مكررة", "fausse commande"];

  // Exact Google Sheets selector: textarea containing version date & time
  const versionInputs = document.querySelectorAll('textarea[aria-label="Name this version"]');
  
  if (versionInputs.length > 0) {
    versionInputs.forEach((input, index) => {
      const rawDate = (input.value || input.textContent || "").replace(/\u202f|\xa0/g, ' ').trim();
      const parsedDate = parseDateString(rawDate);

      // Find parent tile container
      let tile = input.closest('[role="listitem"], [role="option"]') || 
                 input.parentElement.parentElement.parentElement;

      // Extract authors
      const authorBlocks = tile.querySelectorAll('.appsDocsRevisionsWizSidebarAuthorInfo');
      
      const authors = [];
      if (authorBlocks.length > 0) {
        authorBlocks.forEach(ab => {
          const nameEl = ab.querySelector('.appsDocsRevisionsWizSidebarBodySmallOnSurfaceVariant') || ab;
          const name = nameEl.textContent.trim();
          if (name) authors.push(name);
        });
      } else {
        const single = tile.querySelector('.appsDocsRevisionsWizSidebarBodySmallOnSurfaceVariant');
        if (single && single.textContent.trim()) authors.push(single.textContent.trim());
      }

      // Check if tile or highlighted cells contain specific state tags
      const tileText = tile.textContent || "";
      let assignedState = "مؤكدة"; // default
      for (const st of validStates) {
        if (tileText.includes(st)) {
          assignedState = st;
          break;
        }
      }

      authors.forEach(u => {
        results.push({
          user: u,
          status: assignedState,
          date: parsedDate.iso,
          dayStr: parsedDate.day,
          timeStr: parsedDate.time,
          rawDate: rawDate,
          count: 1
        });
      });
    });

    return results;
  }

  return results;
}

function parseDateString(raw) {
  const year = 2026;
  const match = raw.match(/([a-zA-Z]+)\s+(\d{1,2}),?\s*(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?)/i);
  if (match) {
    const monthName = match[1];
    const day = parseInt(match[2], 10);
    const timeStr = match[3];

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthIdx = months.findIndex(m => m.toLowerCase().startsWith(monthName.toLowerCase().slice(0, 3)));
    const finalMonth = monthIdx >= 0 ? monthIdx : 10;

    const dayStr = `${year}-${(finalMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return {
      iso: `${dayStr}T12:00:00`,
      day: dayStr,
      time: timeStr
    };
  }

  const todayStr = new Date().toISOString().split('T')[0];
  return { iso: `${todayStr}T12:00:00`, day: todayStr, time: "12:00 PM" };
}

// -------------------------------------------------------------
// Floating On-Screen Widget (Directly inside Google Sheets)
// -------------------------------------------------------------
function injectFloatingButton() {
  if (document.getElementById('sheets-counter-widget-btn')) return;

  const btn = document.createElement('div');
  btn.id = 'sheets-counter-widget-btn';
  btn.innerHTML = `<span>📦</span> حساب حالات الطلبيات (Order States)`;
  btn.addEventListener('click', () => {
    alert("اضغط على أيقونة الإضافة 📦 في شريط أدوات المتصفح (Chrome Toolbar) لمشاهدة تفصيل الحالات: مؤكدة، ملغية، مكررة، fausse commande لكل عضو.");
  });
  document.body.appendChild(btn);
}

setTimeout(injectFloatingButton, 2000);
