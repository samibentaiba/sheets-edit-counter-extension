# 📊 Sheets Edit & Activity Counter (Chrome Extension)

A Google Chrome Extension (Manifest V3) designed to track, calculate, and report the number of changes/edits made in Google Sheets per collaborator/email across:
- **Today** (اليوم)
- **Last 7 Days / Week** (الأسبوع)
- **This Month** (الشهر)
- **Custom Date Range (Date-to-Date)** (من تاريخ إلى تاريخ)

---

## 📁 Project Structure

```text
sheets-edit-counter-extension/
├── manifest.json              # Extension Manifest V3 configuration
├── popup/
│   ├── popup.html             # Extension popup UI (filters, KPI cards, table)
│   ├── popup.css              # Modern UI styles
│   └── popup.js               # Calculation, filtering, and export logic
├── content/
│   ├── content.js             # Injected script to parse Google Sheets / Version History
│   └── content.css            # Floating status badge inside Google Sheets
├── background/
│   └── background.js          # Service worker for background operations
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

---

## 🚀 How to Install in Google Chrome

1. Open **Google Chrome**.
2. Navigate to: `chrome://extensions/`
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** (تحميل إضافة تم فك حزمتها).
5. Select this folder:
   ```text
   /home/sami/Documents/GitHub/sheets-edit-counter-extension
   ```
6. The extension is now installed! Pin it to your Chrome toolbar.

---

## 🧪 Testing with Demo Data
1. Click the extension icon in your Chrome toolbar.
2. Click **🧪 Demo Data** at the bottom of the popup.
3. You will immediately see the edit metrics, user filter, and breakdown for your collaborators (`ana2006 bouchra`, `Raouf Bentaiba`, `Sami Bentaiba`).
4. Test filtering by **Today**, **7 Days**, **This Month**, or choose a **Custom Date Range**.
5. Click **📥 Export CSV** to download a spreadsheet report.

---

## 🔄 Live Scanning on Google Sheets
1. Open your Google Sheet (**تأكيد طلبيات maisonette deco**).
2. Open **File > Version history > See version history** (`ملف > سجل النسخ > الاطلاع على سجل النسخ`).
3. Click the extension icon and click **🔄 Scan Active Sheet**.
4. The extension extracts the edit counts and updates your dashboard automatically.
