/**
 * Sheets Edit & Activity Counter - Popup Script
 * Maisonette Deco Order Confirmation Sheet
 */

let allEditsData = [];
let currentPeriod = 'today';
let selectedUser = 'ALL';

// User color palette matching Google Sheets
const USER_COLORS = {
  "Raouf Bentaiba": "#e37400",   // Orange
  "ana2006 bouchra": "#129688",  // Teal
  "Sami Bentaiba": "#8e24aa"     // Purple
};

// Real Data extracted from the 7 Version History Screenshots provided by the user
const REAL_SCREENSHOT_DATA = [
  // Today (November 20, 2026)
  { user: "Sami Bentaiba", date: "2026-11-20T16:17:00", count: 5, timeStr: "4:17 PM", dayStr: "2026-11-20" },
  { user: "ana2006 bouchra", date: "2026-11-20T14:33:00", count: 1, timeStr: "2:33 PM", dayStr: "2026-11-20" },
  { user: "Raouf Bentaiba", date: "2026-11-20T13:21:00", count: 2, timeStr: "1:21 PM", dayStr: "2026-11-20" },
  { user: "ana2006 bouchra", date: "2026-11-20T12:39:00", count: 1, timeStr: "12:39 PM", dayStr: "2026-11-20" },
  { user: "ana2006 bouchra", date: "2026-11-20T11:00:00", count: 1, timeStr: "11:00 AM", dayStr: "2026-11-20" },
  { user: "Raouf Bentaiba", date: "2026-11-20T00:59:00", count: 1, timeStr: "12:59 AM", dayStr: "2026-11-20" },

  // Yesterday (November 19, 2026)
  { user: "Raouf Bentaiba", date: "2026-11-19T22:49:00", count: 1, timeStr: "10:49 PM", dayStr: "2026-11-19" },
  { user: "Raouf Bentaiba", date: "2026-11-19T20:27:00", count: 1, timeStr: "8:27 PM", dayStr: "2026-11-19" },
  { user: "Raouf Bentaiba", date: "2026-11-19T18:16:00", count: 18, timeStr: "6:16 PM", dayStr: "2026-11-19" },
  { user: "ana2006 bouchra", date: "2026-11-19T18:16:00", count: 4, timeStr: "6:16 PM", dayStr: "2026-11-19" },
  { user: "Sami Bentaiba", date: "2026-11-19T18:16:00", count: 2, timeStr: "6:16 PM", dayStr: "2026-11-19" },
  { user: "Raouf Bentaiba", date: "2026-11-19T14:59:00", count: 1, timeStr: "2:59 PM", dayStr: "2026-11-19" },
  { user: "ana2006 bouchra", date: "2026-11-19T14:13:00", count: 1, timeStr: "2:13 PM", dayStr: "2026-11-19" },

  // November 18, 2026
  { user: "Raouf Bentaiba", date: "2026-11-18T22:07:00", count: 1, timeStr: "10:07 PM", dayStr: "2026-11-18" },
  { user: "Raouf Bentaiba", date: "2026-11-18T20:51:00", count: 1, timeStr: "8:51 PM", dayStr: "2026-11-18" },
  { user: "Sami Bentaiba", date: "2026-11-18T18:27:00", count: 10, timeStr: "6:27 PM", dayStr: "2026-11-18" },
  { user: "ana2006 bouchra", date: "2026-11-18T18:27:00", count: 5, timeStr: "6:27 PM", dayStr: "2026-11-18" },
  { user: "Raouf Bentaiba", date: "2026-11-18T17:18:00", count: 3, timeStr: "5:18 PM", dayStr: "2026-11-18" },
  { user: "ana2006 bouchra", date: "2026-11-18T17:18:00", count: 2, timeStr: "5:18 PM", dayStr: "2026-11-18" },
  { user: "Sami Bentaiba", date: "2026-11-18T17:18:00", count: 1, timeStr: "5:18 PM", dayStr: "2026-11-18" },
  { user: "Raouf Bentaiba", date: "2026-11-18T13:08:00", count: 1, timeStr: "1:08 PM", dayStr: "2026-11-18" },
  { user: "Raouf Bentaiba", date: "2026-11-18T12:38:00", count: 8, timeStr: "12:38 PM", dayStr: "2026-11-18" },
  { user: "Sami Bentaiba", date: "2026-11-18T12:38:00", count: 3, timeStr: "12:38 PM", dayStr: "2026-11-18" },
  { user: "Raouf Bentaiba", date: "2026-11-18T10:59:00", count: 1, timeStr: "10:59 AM", dayStr: "2026-11-18" },
  { user: "Raouf Bentaiba", date: "2026-11-18T09:54:00", count: 1, timeStr: "9:54 AM", dayStr: "2026-11-18" },

  // November 17, 2026
  { user: "Raouf Bentaiba", date: "2026-11-17T20:28:00", count: 1, timeStr: "8:28 PM", dayStr: "2026-11-17" },
  { user: "Raouf Bentaiba", date: "2026-11-17T19:47:00", count: 1, timeStr: "7:47 PM", dayStr: "2026-11-17" },
  { user: "Sami Bentaiba", date: "2026-11-17T17:26:00", count: 2, timeStr: "5:26 PM", dayStr: "2026-11-17" },
  { user: "Raouf Bentaiba", date: "2026-11-17T17:26:00", count: 2, timeStr: "5:26 PM", dayStr: "2026-11-17" },
  { user: "ana2006 bouchra", date: "2026-11-17T17:26:00", count: 1, timeStr: "5:26 PM", dayStr: "2026-11-17" },
  { user: "Sami Bentaiba", date: "2026-11-17T15:13:00", count: 2, timeStr: "3:13 PM", dayStr: "2026-11-17" },
  { user: "Raouf Bentaiba", date: "2026-11-17T13:53:00", count: 1, timeStr: "1:53 PM", dayStr: "2026-11-17" },
  { user: "Raouf Bentaiba", date: "2026-11-17T12:40:00", count: 1, timeStr: "12:40 PM", dayStr: "2026-11-17" },
  { user: "Raouf Bentaiba", date: "2026-11-17T11:00:00", count: 1, timeStr: "11:00 AM", dayStr: "2026-11-17" },
  { user: "ana2006 bouchra", date: "2026-11-17T09:46:00", count: 1, timeStr: "9:46 AM", dayStr: "2026-11-17" }
];

document.addEventListener('DOMContentLoaded', () => {
  setupDefaultDates();
  setupEventListeners();
  checkCurrentTab();

  // Load real screenshot dataset by default so user sees immediate results
  allEditsData = REAL_SCREENSHOT_DATA;
  updateUserDropdown();
  renderDashboard();
});

function setupDefaultDates() {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);

  document.getElementById('endDate').value = today.toISOString().split('T')[0];
  document.getElementById('startDate').value = weekAgo.toISOString().split('T')[0];
}

function setupEventListeners() {
  // Period buttons
  document.querySelectorAll('.pill-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentPeriod = e.target.dataset.period;

      const customContainer = document.getElementById('customDateContainer');
      if (currentPeriod === 'custom') {
        customContainer.classList.remove('hidden');
      } else {
        customContainer.classList.add('hidden');
        renderDashboard();
      }
    });
  });

  // Apply custom date
  document.getElementById('applyCustomDateBtn').addEventListener('click', renderDashboard);

  // User Filter
  document.getElementById('userFilter').addEventListener('change', (e) => {
    selectedUser = e.target.value;
    renderDashboard();
  });

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      e.target.classList.add('active');
      const targetTab = document.getElementById(e.target.dataset.tab);
      if (targetTab) targetTab.classList.add('active');
    });
  });

  // Quick Scan
  document.getElementById('scanBtn').addEventListener('click', () => scanSheet(false));

  // Deep Scan
  document.getElementById('deepScanBtn').addEventListener('click', () => scanSheet(true));

  // Demo Button
  document.getElementById('demoBtn').addEventListener('click', () => {
    allEditsData = REAL_SCREENSHOT_DATA;
    updateUserDropdown();
    renderDashboard();
  });

  // Export CSV
  document.getElementById('exportBtn').addEventListener('click', exportCSV);
}

// Check current browser tab
async function checkCurrentTab() {
  const statusBadge = document.getElementById('sheetStatus');
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url && tab.url.includes('docs.google.com/spreadsheets')) {
      statusBadge.textContent = 'Sheet Ready';
      statusBadge.className = 'status-badge connected';
      loadCachedData();
    } else {
      statusBadge.textContent = 'Open Google Sheets';
      statusBadge.className = 'status-badge checking';
    }
  } catch (e) {
    statusBadge.textContent = 'Extension Active';
  }
}

// Trigger scan on content script
async function scanSheet(deepScan = false) {
  const statusBadge = document.getElementById('sheetStatus');
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.url || !tab.url.includes('docs.google.com/spreadsheets')) {
      alert('الرجاء فتح شيت Google Sheets أولاً.');
      return;
    }

    statusBadge.textContent = deepScan ? 'Deep Scanning...' : 'Scanning...';
    statusBadge.className = 'status-badge checking';

    chrome.tabs.sendMessage(tab.id, { 
      action: deepScan ? 'DEEP_SCAN_SHEET' : 'QUICK_SCAN_SHEET' 
    }, (response) => {
      if (chrome.runtime.lastError || !response || !response.success) {
        statusBadge.textContent = 'Open Version History';
        statusBadge.className = 'status-badge checking';
        alert(
          'تنبيه: الرجاء التأكد من فتح قائمة سجل النسخ:\n(File > Version history > See version history)\nفي الشيت ثم الضغط على فحص مجدداً.'
        );
        return;
      }

      statusBadge.textContent = 'Synced (' + response.count + ' versions)';
      statusBadge.className = 'status-badge connected';
      if (response.data && response.data.length > 0) {
        allEditsData = response.data;
        updateUserDropdown();
        renderDashboard();
      }
    });
  } catch (err) {
    console.error('Scan error:', err);
  }
}

function loadCachedData() {
  chrome.storage.local.get(['savedSheetEdits'], (result) => {
    if (result.savedSheetEdits && result.savedSheetEdits.length > 0) {
      allEditsData = result.savedSheetEdits;
      updateUserDropdown();
      renderDashboard();
    }
  });
}

function updateUserDropdown() {
  const select = document.getElementById('userFilter');
  const users = new Set();
  allEditsData.forEach(item => {
    if (item.user) users.add(item.user);
  });

  select.innerHTML = '<option value="ALL">جميع الأعضاء (All Collaborators)</option>';
  users.forEach(u => {
    const opt = document.createElement('option');
    opt.value = u;
    opt.textContent = u;
    select.appendChild(opt);
  });
}

// Render Dashboard & Tables
function renderDashboard() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  weekStart.setHours(0, 0, 0, 0);

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);

  const startInput = document.getElementById('startDate').value;
  const endInput = document.getElementById('endDate').value;
  const customStart = startInput ? new Date(startInput + 'T00:00:00') : weekStart;
  const customEnd = endInput ? new Date(endInput + 'T23:59:59') : now;

  // Stats aggregation
  const userStats = {};
  const dailyStats = {}; // { "2026-11-20": { "Raouf": 2, "Bouchra": 3, "total": 5 } }

  allEditsData.forEach(item => {
    const u = item.user || 'Unknown User';
    const itemDate = new Date(item.date);
    const count = item.count || 1;
    const dayStr = item.dayStr || itemDate.toISOString().split('T')[0];

    // User totals
    if (!userStats[u]) {
      userStats[u] = { name: u, today: 0, week: 0, month: 0, custom: 0, total: 0, sessions: 0 };
    }
    userStats[u].total += count;
    userStats[u].sessions += 1;

    if (itemDate >= todayStart) userStats[u].today += count;
    if (itemDate >= weekStart) userStats[u].week += count;
    if (itemDate >= monthStart) userStats[u].month += count;
    if (itemDate >= customStart && itemDate <= customEnd) userStats[u].custom += count;

    // Daily totals
    if (!dailyStats[dayStr]) {
      dailyStats[dayStr] = { date: dayStr, total: 0, users: {} };
    }
    dailyStats[dayStr].total += count;
    if (!dailyStats[dayStr].users[u]) dailyStats[dayStr].users[u] = 0;
    dailyStats[dayStr].users[u] += count;
  });

  const displayUsers = Object.values(userStats).filter(entry => {
    if (selectedUser === 'ALL') return true;
    return entry.name === selectedUser;
  });

  // Calculate KPIs
  let periodTotal = 0;
  let sessionTotal = 0;
  let grandTotal = 0;

  displayUsers.forEach(s => {
    grandTotal += s.total;
    sessionTotal += s.sessions;
    if (currentPeriod === 'today') periodTotal += s.today;
    else if (currentPeriod === 'week') periodTotal += s.week;
    else if (currentPeriod === 'month') periodTotal += s.month;
    else if (currentPeriod === 'custom') periodTotal += s.custom;
  });

  document.getElementById('kpiSelectedEdits').textContent = periodTotal;
  document.getElementById('kpiSessions').textContent = sessionTotal;
  document.getElementById('kpiTotalEdits').textContent = grandTotal;
  document.getElementById('recordCount').textContent = `${displayUsers.length} عضو`;

  // Render Collaborators Table
  const tbody = document.getElementById('statsTableBody');
  tbody.innerHTML = '';

  if (displayUsers.length === 0) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="6">لا توجد بيانات مطابقة.</td></tr>';
  } else {
    displayUsers.forEach(stat => {
      const dotColor = USER_COLORS[stat.name] || '#64748b';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <span class="user-name-cell">
            <span class="user-dot" style="background-color: ${dotColor};"></span>
            ${escapeHtml(stat.name)}
          </span>
        </td>
        <td class="num-cell ${stat.today > 0 ? 'positive' : ''}">${stat.today}</td>
        <td class="num-cell ${stat.week > 0 ? 'positive' : ''}">${stat.week}</td>
        <td class="num-cell ${stat.month > 0 ? 'positive' : ''}">${stat.month}</td>
        <td class="num-cell ${stat.custom > 0 ? 'positive' : ''}">${stat.custom}</td>
        <td class="num-cell">${stat.total}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Render Daily Table (Day by Day)
  renderDailyTable(dailyStats);
}

function renderDailyTable(dailyStats) {
  const dailyBody = document.getElementById('dailyTableBody');
  const days = Object.keys(dailyStats).sort().reverse(); // newest first
  document.getElementById('dailyDaysCount').textContent = `${days.length} يوم`;

  dailyBody.innerHTML = '';
  if (days.length === 0) {
    dailyBody.innerHTML = '<tr class="empty-row"><td colspan="5">لا توجد بيانات يومية.</td></tr>';
    return;
  }

  days.forEach(day => {
    const d = dailyStats[day];
    const raouf = d.users["Raouf Bentaiba"] || 0;
    const bouchra = d.users["ana2006 bouchra"] || 0;
    const sami = d.users["Sami Bentaiba"] || 0;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${day}</strong></td>
      <td class="num-cell ${raouf > 0 ? 'positive' : ''}">${raouf}</td>
      <td class="num-cell ${bouchra > 0 ? 'positive' : ''}">${bouchra}</td>
      <td class="num-cell ${sami > 0 ? 'positive' : ''}">${sami}</td>
      <td class="num-cell"><strong>${d.total}</strong></td>
    `;
    dailyBody.appendChild(tr);
  });
}

function exportCSV() {
  if (allEditsData.length === 0) {
    alert('لا توجد بيانات لتصديرها.');
    return;
  }

  let csvContent = '\uFEFF'; // UTF-8 BOM for Arabic text in Excel
  csvContent += 'المستخدم (User),التاريخ (Date),التوقيت (Time),عدد التعديلات (Edits)\n';

  allEditsData.forEach(row => {
    csvContent += `"${row.user}","${row.dayStr || row.date}","${row.timeStr || ''}",${row.count || 1}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `maisonette_deco_edits_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
