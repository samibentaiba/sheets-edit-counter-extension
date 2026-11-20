/**
 * Sheets Edit & Activity Counter - Popup Script
 */

let allEditsData = [];
let currentPeriod = 'today';
let selectedUser = 'ALL';

// Sample Demo Data (using the names from Maisonette Deco sheet)
const DEMO_DATA = [
  // Today's edits
  { user: "ana2006 bouchra", email: "ana2006.bouchra@gmail.com", date: new Date().toISOString(), count: 18 },
  { user: "Raouf Bentaiba", email: "raouf.bentaiba@gmail.com", date: new Date().toISOString(), count: 12 },
  { user: "Sami Bentaiba", email: "sami.bentaiba@gmail.com", date: new Date().toISOString(), count: 5 },

  // Earlier this week (2 days ago)
  { user: "ana2006 bouchra", email: "ana2006.bouchra@gmail.com", date: daysAgo(2), count: 45 },
  { user: "Raouf Bentaiba", email: "raouf.bentaiba@gmail.com", date: daysAgo(2), count: 34 },
  { user: "Sami Bentaiba", email: "sami.bentaiba@gmail.com", date: daysAgo(3), count: 21 },

  // Earlier this month (10 days ago)
  { user: "ana2006 bouchra", email: "ana2006.bouchra@gmail.com", date: daysAgo(10), count: 110 },
  { user: "Raouf Bentaiba", email: "raouf.bentaiba@gmail.com", date: daysAgo(12), count: 85 },
  { user: "Sami Bentaiba", email: "sami.bentaiba@gmail.com", date: daysAgo(15), count: 64 },

  // Last month (35 days ago)
  { user: "ana2006 bouchra", email: "ana2006.bouchra@gmail.com", date: daysAgo(35), count: 150 },
  { user: "Raouf Bentaiba", email: "raouf.bentaiba@gmail.com", date: daysAgo(40), count: 130 }
];

function daysAgo(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

document.addEventListener('DOMContentLoaded', async () => {
  setupDefaultDates();
  setupEventListeners();
  checkCurrentTab();
});

// Setup default start and end dates
function setupDefaultDates() {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);

  document.getElementById('endDate').value = today.toISOString().split('T')[0];
  document.getElementById('startDate').value = weekAgo.toISOString().split('T')[0];
}

// Event Listeners
function setupEventListeners() {
  // Period filter buttons
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

  // Apply custom date button
  document.getElementById('applyCustomDateBtn').addEventListener('click', () => {
    renderDashboard();
  });

  // User Filter
  document.getElementById('userFilter').addEventListener('change', (e) => {
    selectedUser = e.target.value;
    renderDashboard();
  });

  // Scan Button
  document.getElementById('scanBtn').addEventListener('click', scanActiveSheet);

  // Demo Button
  document.getElementById('demoBtn').addEventListener('click', () => {
    allEditsData = DEMO_DATA;
    updateUserDropdown();
    renderDashboard();
  });

  // Export CSV
  document.getElementById('exportBtn').addEventListener('click', exportCSV);
}

// Check active tab URL
async function checkCurrentTab() {
  const statusBadge = document.getElementById('sheetStatus');
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url && tab.url.includes('docs.google.com/spreadsheets')) {
      statusBadge.textContent = 'Sheet Connected';
      statusBadge.className = 'status-badge connected';
      // Auto-load cached data if available
      loadCachedData(tab.id);
    } else {
      statusBadge.textContent = 'Not on Google Sheets';
      statusBadge.className = 'status-badge disconnected';
    }
  } catch (e) {
    statusBadge.textContent = 'Extension Ready';
    statusBadge.className = 'status-badge checking';
  }
}

// Scan the sheet by messaging content script
async function scanActiveSheet() {
  const statusBadge = document.getElementById('sheetStatus');
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.url || !tab.url.includes('docs.google.com/spreadsheets')) {
      alert('Please open your Google Sheet tab first, then click Scan.');
      return;
    }

    statusBadge.textContent = 'Scanning...';
    statusBadge.className = 'status-badge checking';

    chrome.tabs.sendMessage(tab.id, { action: 'SCAN_VERSION_HISTORY' }, (response) => {
      if (chrome.runtime.lastError || !response || !response.success) {
        // Fallback message
        statusBadge.textContent = 'Needs Version Panel Open';
        statusBadge.className = 'status-badge checking';
        alert(
          'Tip: Please open "File > Version history > See version history" in Google Sheets so the extension can read the exact edit records, then click Scan.'
        );
        return;
      }

      statusBadge.textContent = 'Sheet Synced';
      statusBadge.className = 'status-badge connected';
      allEditsData = response.data || [];
      updateUserDropdown();
      renderDashboard();
    });
  } catch (err) {
    console.error('Scan error:', err);
  }
}

// Load cached data from chrome.storage
function loadCachedData(tabId) {
  chrome.storage.local.get(['savedSheetEdits'], (result) => {
    if (result.savedSheetEdits && result.savedSheetEdits.length > 0) {
      allEditsData = result.savedSheetEdits;
      updateUserDropdown();
      renderDashboard();
    }
  });
}

// Update user dropdown list
function updateUserDropdown() {
  const select = document.getElementById('userFilter');
  const users = new Set();

  allEditsData.forEach(item => {
    if (item.user) users.add(item.user);
  });

  select.innerHTML = '<option value="ALL">All Collaborators (الكل)</option>';
  users.forEach(u => {
    const opt = document.createElement('option');
    opt.value = u;
    opt.textContent = u;
    select.appendChild(opt);
  });
}

// Main Calculation and UI Render
function renderDashboard() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

  // Week start: 7 days ago
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  weekStart.setHours(0, 0, 0, 0);

  // Month start: 1st day of current month
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);

  // Custom date range
  const startInput = document.getElementById('startDate').value;
  const endInput = document.getElementById('endDate').value;
  const customStart = startInput ? new Date(startInput + 'T00:00:00') : weekStart;
  const customEnd = endInput ? new Date(endInput + 'T23:59:59') : now;

  // Aggregate by user
  const userStats = {};

  allEditsData.forEach(item => {
    const u = item.user || 'Unknown User';
    const email = item.email || '';
    const itemDate = new Date(item.date);
    const count = item.count || 1;

    if (!userStats[u]) {
      userStats[u] = {
        name: u,
        email: email,
        today: 0,
        week: 0,
        month: 0,
        custom: 0,
        total: 0
      };
    }

    userStats[u].total += count;

    if (itemDate >= todayStart) {
      userStats[u].today += count;
    }
    if (itemDate >= weekStart) {
      userStats[u].week += count;
    }
    if (itemDate >= monthStart) {
      userStats[u].month += count;
    }
    if (itemDate >= customStart && itemDate <= customEnd) {
      userStats[u].custom += count;
    }
  });

  // Filter based on selected user
  const displayList = Object.values(userStats).filter(entry => {
    if (selectedUser === 'ALL') return true;
    return entry.name === selectedUser;
  });

  // Calculate KPI values
  let selectedMetricTotal = 0;
  let allTimeTotal = 0;

  displayList.forEach(item => {
    allTimeTotal += item.total;
    if (currentPeriod === 'today') selectedMetricTotal += item.today;
    else if (currentPeriod === 'week') selectedMetricTotal += item.week;
    else if (currentPeriod === 'month') selectedMetricTotal += item.month;
    else if (currentPeriod === 'custom') selectedMetricTotal += item.custom;
  });

  document.getElementById('kpiSelectedEdits').textContent = selectedMetricTotal;
  document.getElementById('kpiActiveUsers').textContent = displayList.length;
  document.getElementById('kpiTotalEdits').textContent = allTimeTotal;
  document.getElementById('recordCount').textContent = `${displayList.length} collaborator(s)`;

  // Update dynamic table header
  const thRange = document.getElementById('thCustomRange');
  if (currentPeriod === 'custom') {
    thRange.textContent = 'Custom Range';
  } else {
    thRange.textContent = 'Range';
  }

  // Render Table
  const tbody = document.getElementById('statsTableBody');
  tbody.innerHTML = '';

  if (displayList.length === 0) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="6">No activity records found.</td></tr>';
    return;
  }

  displayList.forEach(stat => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <span class="user-name-cell">${escapeHtml(stat.name)}</span>
        ${stat.email ? `<span class="user-email-tag">${escapeHtml(stat.email)}</span>` : ''}
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

// Export CSV Function
function exportCSV() {
  if (allEditsData.length === 0) {
    alert('No data to export. Please scan or load data first.');
    return;
  }

  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += 'Collaborator,Email,Date,Edit Count\n';

  allEditsData.forEach(row => {
    csvContent += `"${row.user}","${row.email || ''}","${row.date}",${row.count || 1}\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `sheets_edits_report_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
