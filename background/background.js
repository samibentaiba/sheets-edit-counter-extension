/**
 * Sheets Edit & Activity Counter - Background Service Worker
 */

chrome.runtime.onInstalled.addListener((details) => {
  console.log("[Sheets Edit Counter] Extension installed successfully.", details);
});

// Relay messages between tabs if needed
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "PING") {
    sendResponse({ status: "OK" });
  }
  return true;
});
