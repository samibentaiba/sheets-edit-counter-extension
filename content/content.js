/**
 * Sheets Edit & Activity Counter - Content Script
 * Tailored for Google Sheets Version History (Maisonette Deco)
 */

console.log("[Sheets Edit Counter] Content Script loaded.");

// Listen for messages from extension popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "QUICK_SCAN_SHEET") {
    try {
      const data = extractRevisionsFromDOM();
      if (data.length > 0) {
        chrome.storage.local.set({ savedSheetEdits: data });
        sendResponse({ success: true, count: data.length, data: data });
      } else {
        sendResponse({ success: false, message: "No version tiles found in DOM." });
      }
    } catch (e) {
      sendResponse({ success: false, message: e.toString() });
    }
    return true;
  }

  if (request.action === "DEEP_SCAN_SHEET") {
    deepScanTiles().then(data => {
      chrome.storage.local.set({ savedSheetEdits: data });
      sendResponse({ success: true, count: data.length, data: data });
    }).catch(err => {
      sendResponse({ success: false, message: err.toString() });
    });
    return true;
  }
});

/**
 * Extracts revision entries using the exact Google Sheets DOM classes
 */
function extractRevisionsFromDOM() {
  const results = [];

  // Exact Google Sheets selector: textarea containing version date & time
  const versionInputs = document.querySelectorAll('textarea[aria-label="Name this version"]');
  
  if (versionInputs.length > 0) {
    versionInputs.forEach(input => {
      const rawDate = (input.value || input.textContent || "").replace(/\u202f|\xa0/g, ' ').trim();
      const parsedDate = parseDateString(rawDate);

      // Find the parent tile container
      let tile = input.closest('[role="listitem"], [role="option"]') || 
                 input.parentElement.parentElement.parentElement;

      // Find all authors in this tile
      const authorBlocks = tile.querySelectorAll('.appsDocsRevisionsWizSidebarAuthorInfo');
      
      if (authorBlocks.length > 0) {
        authorBlocks.forEach(ab => {
          const nameEl = ab.querySelector('.appsDocsRevisionsWizSidebarBodySmallOnSurfaceVariant') || ab;
          const name = nameEl.textContent.trim();
          const swatch = ab.querySelector('.appsDocsRevisionsWizSidebarTileSwatch');
          const color = swatch ? swatch.style.backgroundColor : '';

          if (name) {
            results.push({
              user: name,
              color: color,
              date: parsedDate.iso,
              dayStr: parsedDate.day,
              timeStr: parsedDate.time,
              rawDate: rawDate,
              count: 1
            });
          }
        });
      } else {
        // Fallback for single user without .appsDocsRevisionsWizSidebarAuthorInfo
        const singleNameEl = tile.querySelector('.appsDocsRevisionsWizSidebarBodySmallOnSurfaceVariant');
        if (singleNameEl) {
          const name = singleNameEl.textContent.trim();
          results.push({
            user: name,
            date: parsedDate.iso,
            dayStr: parsedDate.day,
            timeStr: parsedDate.time,
            rawDate: rawDate,
            count: 1
          });
        }
      }
    });

    return results;
  }

  return results;
}

/**
 * Deep Scan: Sequentially clicks visible version tiles to extract exact "Total: X edits"
 */
async function deepScanTiles() {
  const versionInputs = document.querySelectorAll('textarea[aria-label="Name this version"]');
  if (versionInputs.length === 0) throw new Error("Please open File > Version history first.");

  const results = [];
  const maxToScan = Math.min(versionInputs.length, 30); // scan up to 30 recent versions smoothly

  for (let i = 0; i < maxToScan; i++) {
    const input = versionInputs[i];
    const tile = input.closest('[role="listitem"], [role="option"]') || input.parentElement;
    if (tile) {
      tile.click();
      await new Promise(r => setTimeout(r, 200));

      const editsCount = readTopBarCount();
      const rawDate = (input.value || input.textContent || "").replace(/\u202f|\xa0/g, ' ').trim();
      const parsedDate = parseDateString(rawDate);

      const authorBlocks = tile.querySelectorAll('.appsDocsRevisionsWizSidebarAuthorInfo');
      const authors = [];
      authorBlocks.forEach(ab => {
        const nameEl = ab.querySelector('.appsDocsRevisionsWizSidebarBodySmallOnSurfaceVariant') || ab;
        if (nameEl && nameEl.textContent.trim()) authors.push(nameEl.textContent.trim());
      });

      if (authors.length === 0) {
        const single = tile.querySelector('.appsDocsRevisionsWizSidebarBodySmallOnSurfaceVariant');
        if (single) authors.push(single.textContent.trim());
      }

      authors.forEach(u => {
        const count = authors.length > 1 ? Math.max(1, Math.round(editsCount / authors.length)) : editsCount;
        results.push({
          user: u,
          count: count,
          date: parsedDate.iso,
          dayStr: parsedDate.day,
          timeStr: parsedDate.time,
          rawDate: rawDate
        });
      });
    }
  }

  return results.length > 0 ? results : extractRevisionsFromDOM();
}

/**
 * Reads "Total: X edits" from the top bar indicator
 */
function readTopBarCount() {
  const indicator = document.getElementById('docs-toolbar-iterator-label');
  if (indicator && indicator.textContent) {
    const m = indicator.textContent.match(/Total:\s*(\d+)\s*edit/i);
    if (m) return parseInt(m[1], 10);
  }

  // Fallback scan
  const allSpans = document.querySelectorAll('.docs-labelseparator, [role="heading"]');
  for (const s of allSpans) {
    const m = s.textContent.match(/Total:\s*(\d+)\s*edit/i);
    if (m) return parseInt(m[1], 10);
  }

  return 1;
}

/**
 * Parses raw date string e.g. "November 20, 4:17 PM"
 */
function parseDateString(raw) {
  const now = new Date();
  const year = 2026; // matches user's current spreadsheet year

  const match = raw.match(/([a-zA-Z]+)\s+(\d{1,2}),?\s*(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?)/i);
  if (match) {
    const monthName = match[1];
    const day = parseInt(match[2], 10);
    const timeStr = match[3];

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthIdx = months.findIndex(m => m.toLowerCase().startsWith(monthName.toLowerCase().slice(0, 3)));
    const finalMonth = monthIdx >= 0 ? monthIdx : 10;

    const d = new Date(year, finalMonth, day);
    const dayStr = `${year}-${(finalMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return {
      iso: `${dayStr}T12:00:00`,
      day: dayStr,
      time: timeStr
    };
  }

  const todayStr = getTodayISO();
  return { iso: `${todayStr}T12:00:00`, day: todayStr, time: "12:00 PM" };
}

function getTodayISO() {
  return new Date().toISOString().split('T')[0];
}

// -------------------------------------------------------------
// Floating On-Screen Widget (Directly inside Google Sheets)
// -------------------------------------------------------------
function injectFloatingButton() {
  if (document.getElementById('sheets-counter-widget-btn')) return;

  const btn = document.createElement('div');
  btn.id = 'sheets-counter-widget-btn';
  btn.innerHTML = `<span>📊</span> حساب التعديلات (Count Edits)`;
  btn.addEventListener('click', () => {
    // Notify user to click toolbar icon
    alert("اضغط على أيقونة الإضافة 📊 في شريط أدوات Chrome لرؤية لوحة المتابعة الكاملة، الإحصائيات اليومية، وتصدير التقارير.");
  });
  document.body.appendChild(btn);
}

setTimeout(injectFloatingButton, 2000);
