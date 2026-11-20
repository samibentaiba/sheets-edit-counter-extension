/**
 * Sheets Edit & Activity Counter - Content Script
 * Injected into docs.google.com/spreadsheets/*
 */

console.log("[Sheets Edit Counter] Content script loaded on Google Sheets.");

// Listen for messages from popup or background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "SCAN_VERSION_HISTORY") {
    const extractedData = extractVersionHistoryData();
    if (extractedData && extractedData.length > 0) {
      // Save in local storage cache
      chrome.storage.local.set({ savedSheetEdits: extractedData });
      sendResponse({ success: true, count: extractedData.length, data: extractedData });
    } else {
      sendResponse({ 
        success: false, 
        message: "Version history sidebar not found or empty. Please open File > Version history." 
      });
    }
  }
  return true; // Keep channel open for async response
});

/**
 * Parses the Google Sheets Version History panel if open.
 * Extracts: Timestamp, User Name, Edit Count.
 */
function extractVersionHistoryData() {
  const results = [];
  
  // Selectors typically used by Google Docs/Sheets revision sidebar
  // We check multiple fallback selectors because Google's DOM updates occasionally
  const revisionTiles = document.querySelectorAll(
    '.docs-revisions-tile, [role="listitem"].docs-revisions-tile, .docs-revisions-sidebar-tile'
  );

  if (revisionTiles.length > 0) {
    revisionTiles.forEach((tile) => {
      try {
        // Extract author name
        const authorEl = tile.querySelector('.docs-revisions-tile-collaborator-name, .docs-revisions-tile-author, [title]');
        const author = authorEl ? (authorEl.getAttribute('title') || authorEl.textContent.trim()) : "Collaborator";

        // Extract date/time
        const timeEl = tile.querySelector('.docs-revisions-tile-timestamp, .docs-revisions-tile-title');
        const timeText = timeEl ? timeEl.textContent.trim() : "";

        // Parse approximate date from string (e.g. "November 20, 1:21 PM")
        const parsedDate = parseGoogleSheetsDate(timeText);

        results.push({
          user: author,
          email: "",
          date: parsedDate.toISOString(),
          count: 1,
          rawText: timeText
        });
      } catch (e) {
        console.warn("[Sheets Edit Counter] Tile parse error:", e);
      }
    });
    return results;
  }

  // Fallback: Check for generic sidebar items if version history is open
  const sidebar = document.querySelector('.docs-revisions-sidebar, [aria-label*="Version history"], [aria-label*="سجل النسخ"]');
  if (sidebar) {
    const textNodes = sidebar.querySelectorAll('div, span');
    textNodes.forEach(el => {
      // Look for user names or edit markers
      if (el.textContent && el.textContent.includes('edit')) {
        // Found an edit marker
      }
    });
  }

  return results;
}

/**
 * Helper to parse Google Sheets date text into Date object
 */
function parseGoogleSheetsDate(dateStr) {
  if (!dateStr) return new Date();
  
  // Try standard Date parsing
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d;

  // Handle formats like "Today, 1:21 PM" or "Yesterday, 6:09 PM"
  const now = new Date();
  if (dateStr.toLowerCase().includes('today') || dateStr.includes('اليوم')) {
    return now;
  }
  if (dateStr.toLowerCase().includes('yesterday') || dateStr.includes('أمس')) {
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    return yesterday;
  }

  return now;
}

// Add a subtle on-page badge in the bottom corner of Google Sheets
function injectFloatingButton() {
  if (document.getElementById('sheets-counter-floating-badge')) return;

  const badge = document.createElement('div');
  badge.id = 'sheets-counter-floating-badge';
  badge.innerHTML = `<span>📊</span> Edit Tracker Ready`;
  badge.title = "Click the Sheets Edit Counter extension icon in your Chrome toolbar to view stats.";
  document.body.appendChild(badge);
}

// Inject floating badge on sheet load
setTimeout(injectFloatingButton, 3000);
