/**
 * Sheets Edit & Activity Counter - Content Script
 * Injected into Google Sheets
 */

console.log("[Sheets Edit Counter] Content Script active.");

// Message Listener from Popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "QUICK_SCAN_SHEET") {
    const data = parseSidebarVersions();
    if (data.length > 0) {
      chrome.storage.local.set({ savedSheetEdits: data });
      sendResponse({ success: true, count: data.length, data: data });
    } else {
      sendResponse({ success: false, message: "No version items found." });
    }
    return true;
  }

  if (request.action === "DEEP_SCAN_SHEET") {
    deepScanVersions().then(data => {
      chrome.storage.local.set({ savedSheetEdits: data });
      sendResponse({ success: true, count: data.length, data: data });
    }).catch(err => {
      sendResponse({ success: false, message: err.toString() });
    });
    return true; // async response
  }
});

/**
 * Parses the Version History sidebar items from Google Sheets DOM
 */
function parseSidebarVersions() {
  const versions = [];
  const sidebar = findVersionHistorySidebar();
  if (!sidebar) {
    console.warn("[Sheets Edit Counter] Version history sidebar not visible.");
    return versions;
  }

  // Find all date sections and version tiles
  let currentDateStr = getTodayISO();

  // Walk through the sidebar's children
  const allElements = sidebar.querySelectorAll('*');
  allElements.forEach(el => {
    const text = el.textContent ? el.textContent.trim() : '';

    // Check if this element is a date header
    if (isDateHeader(text)) {
      currentDateStr = normalizeDateHeader(text);
    }

    // Check if this element contains a version timestamp (e.g. "4:17 PM", "2:33 PM", "12:38 PM")
    const timeMatch = text.match(/\b(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm))\b/);
    if (timeMatch && el.children.length <= 4) {
      const timeStr = timeMatch[1];
      const parentTile = el.closest('[role="listitem"], [role="option"], .docs-revisions-tile') || el.parentElement;

      // Extract collaborator names in this tile
      const users = extractCollaboratorsFromElement(parentTile || el);

      users.forEach(user => {
        // Avoid duplicate entries for same user and timestamp
        const exists = versions.some(v => v.user === user && v.timeStr === timeStr && v.dayStr === currentDateStr);
        if (!exists) {
          versions.push({
            user: user,
            timeStr: timeStr,
            dayStr: currentDateStr,
            date: `${currentDateStr}T${convertTo24h(timeStr)}`,
            count: 1
          });
        }
      });
    }
  });

  return versions;
}

/**
 * Deep Scan: Sequentially clicks visible version tiles to extract exact "Total: X edits"
 */
async function deepScanVersions() {
  const sidebar = findVersionHistorySidebar();
  if (!sidebar) throw new Error("Sidebar not open");

  const tiles = sidebar.querySelectorAll('[role="listitem"], [role="option"], .docs-revisions-tile');
  const results = [];

  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    tile.click();
    await wait(250); // wait for top bar to update

    const editsCount = readTopBarEditsCount();
    const users = extractCollaboratorsFromElement(tile);
    const timeMatch = tile.textContent.match(/\b(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm))\b/);
    const timeStr = timeMatch ? timeMatch[1] : "";
    const dateStr = getTodayISO(); // or header

    users.forEach((u, idx) => {
      // Divide edits among collaborators in multi-user version or attribute appropriately
      const allocatedCount = users.length > 1 ? Math.max(1, Math.round(editsCount / users.length)) : editsCount;
      results.push({
        user: u,
        count: allocatedCount,
        timeStr: timeStr,
        dayStr: dateStr,
        date: `${dateStr}T${convertTo24h(timeStr)}`
      });
    });
  }

  return results.length > 0 ? results : parseSidebarVersions();
}

/**
 * Reads "Total: X edits" from the top bar
 */
function readTopBarEditsCount() {
  const allTextElements = document.querySelectorAll('div, span, b');
  for (const el of allTextElements) {
    if (el.children.length === 0 && el.textContent) {
      const match = el.textContent.match(/Total:\s*(\d+)\s*edit/i);
      if (match) return parseInt(match[1], 10);
      const matchFr = el.textContent.match(/(\d+)\s*modification/i);
      if (matchFr) return parseInt(matchFr[1], 10);
      const matchAr = el.textContent.match(/(\d+)\s*تعديل/i);
      if (matchAr) return parseInt(matchAr[1], 10);
    }
  }
  return 1;
}

function findVersionHistorySidebar() {
  return document.querySelector(
    '.docs-revisions-sidebar, [aria-label*="Version history"], [aria-label*="سجل النسخ"], [role="region"][aria-label*="history"]'
  ) || Array.from(document.querySelectorAll('div')).find(d => 
    d.textContent && (d.textContent.includes('Version history') || d.textContent.includes('سجل النسخ')) && d.offsetWidth > 150
  );
}

function isDateHeader(text) {
  if (!text) return false;
  return /^(Today|Yesterday|اليوم|أمس|(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2})/i.test(text);
}

function normalizeDateHeader(text) {
  const now = new Date();
  if (/Today|اليوم/i.test(text)) return now.toISOString().split('T')[0];
  if (/Yesterday|أمس/i.test(text)) {
    const y = new Date();
    y.setDate(y.getDate() - 1);
    return y.toISOString().split('T')[0];
  }

  // Parse Month Day e.g. "November 19"
  const m = text.match(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})/i);
  if (m) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthIdx = monthNames.findIndex(mn => mn.toLowerCase() === m[1].toLowerCase());
    const day = parseInt(m[2], 10);
    const d = new Date(now.getFullYear(), monthIdx, day);
    return d.toISOString().split('T')[0];
  }
  return now.toISOString().split('T')[0];
}

function extractCollaboratorsFromElement(el) {
  const knownUsers = ["Raouf Bentaiba", "ana2006 bouchra", "Sami Bentaiba"];
  const found = [];

  const text = el.textContent || "";
  knownUsers.forEach(u => {
    if (text.includes(u)) found.push(u);
  });

  // If no known user found, look for colored dot or author attributes
  if (found.length === 0) {
    const authorEl = el.querySelector('[title]');
    if (authorEl && authorEl.title) found.push(authorEl.title);
    else found.push("Collaborator");
  }

  return found;
}

function convertTo24h(timeStr) {
  if (!timeStr) return "12:00:00";
  const m = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?/);
  if (!m) return "12:00:00";
  let h = parseInt(m[1], 10);
  const min = m[2];
  const ampm = m[3] ? m[3].toUpperCase() : '';

  if (ampm === 'PM' && h < 12) h += 12;
  if (ampm === 'AM' && h === 12) h = 0;
  return `${h.toString().padStart(2, '0')}:${min}:00`;
}

function getTodayISO() {
  return new Date().toISOString().split('T')[0];
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// -------------------------------------------------------------
// Floating On-Screen Widget (Directly inside Google Sheets)
// -------------------------------------------------------------
function injectFloatingButton() {
  if (document.getElementById('sheets-counter-widget-btn')) return;

  const btn = document.createElement('div');
  btn.id = 'sheets-counter-widget-btn';
  btn.innerHTML = `<span>📊</span> حساب التعديلات (Count Edits)`;
  btn.addEventListener('click', toggleInPageModal);
  document.body.appendChild(btn);
}

function toggleInPageModal() {
  let modal = document.getElementById('sheets-counter-modal');
  if (modal) {
    modal.remove();
    return;
  }

  modal = document.createElement('div');
  modal.id = 'sheets-counter-modal';
  modal.innerHTML = `
    <div class="scm-header">
      <div class="scm-title">📊 إحصائيات تعديلات maisonette deco</div>
      <button class="scm-close-btn" id="scmClose">✕</button>
    </div>
    <div class="scm-body">
      <p style="font-size:12px; color:#64748b; margin-bottom:8px;">
        اضغط على أيقونة الإضافة في شريط المتصفح لمشاهدة التحليل الكامل وتصدير التقارير (Excel / CSV).
      </p>
      <div style="display:flex; gap:8px;">
        <button id="scmScanBtn" style="flex:1; padding:8px; background:#16a34a; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:600;">
          🔄 فحص سجل النسخ الآن
        </button>
      </div>
      <div id="scmResult" style="margin-top:10px; font-size:12px; font-weight:bold; color:#0f766e;"></div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('scmClose').addEventListener('click', () => modal.remove());
  document.getElementById('scmScanBtn').addEventListener('click', () => {
    const resBox = document.getElementById('scmResult');
    resBox.textContent = "جاري الفحص...";
    const data = parseSidebarVersions();
    if (data.length > 0) {
      chrome.storage.local.set({ savedSheetEdits: data });
      resBox.textContent = `تم العثور على ${data.length} نسخة وتعديل بنجاح! افتح الإضافة لمشاهدة التفاصيل.`;
    } else {
      resBox.textContent = "الرجاء فتح سجل النسخ أولاً (File > Version history).";
    }
  });
}

// Inject floating button when ready
setTimeout(injectFloatingButton, 2000);
