// ── FLOWLY CORE ─────────────────────────────────────────────────────

const STORAGE_KEYS = {
  transactions: 'flowly_transactions',
  budgets: 'flowly_budgets',
  settings: 'flowly_settings',
  user: 'flowly_user'
};

// ── SETTINGS ────────────────────────────────────────────────────────
const DEFAULT_SETTINGS = {
  theme: 'dark',
  currency: 'USD',
  currencySymbol: '$',
  name: 'User'
};

function getSettings() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.settings) || JSON.stringify(DEFAULT_SETTINGS));
}
function saveSettings(s) {
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(s));
}

// ── TRANSACTIONS ────────────────────────────────────────────────────
function getTransactions() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.transactions) || '[]');
}
function saveTransactions(txs) {
  localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(txs));
}
function addTransaction(tx) {
  const txs = getTransactions();
  tx.id = Date.now().toString();
  tx.date = tx.date || new Date().toISOString().split('T')[0];
  txs.unshift(tx);
  saveTransactions(txs);
  return tx;
}
function deleteTransaction(id) {
  const txs = getTransactions().filter(t => t.id !== id);
  saveTransactions(txs);
}
function editTransaction(id, updates) {
  const txs = getTransactions().map(t => t.id === id ? { ...t, ...updates } : t);
  saveTransactions(txs);
}

// ── BUDGETS ─────────────────────────────────────────────────────────
const DEFAULT_BUDGETS = [
  { category: 'Food', emoji: '🍔', limit: 300 },
  { category: 'Housing', emoji: '🏠', limit: 800 },
  { category: 'Transport', emoji: '🚗', limit: 150 },
  { category: 'Shopping', emoji: '🛍', limit: 200 }
];
function getBudgets() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.budgets) || JSON.stringify(DEFAULT_BUDGETS));
}
function saveBudgets(b) {
  localStorage.setItem(STORAGE_KEYS.budgets, JSON.stringify(b));
}

// ── CATEGORIES ──────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'food',      label: 'Food',      emoji: '🍔', color: '#4eca8b' },
  { id: 'housing',   label: 'Housing',   emoji: '🏠', color: '#c4a365' },
  { id: 'transport', label: 'Transport', emoji: '🚗', color: '#5c9be0' },
  { id: 'shopping',  label: 'Shopping',  emoji: '🛍', color: '#b87ce0' },
  { id: 'health',    label: 'Health',    emoji: '💊', color: '#e05c9b' },
  { id: 'travel',    label: 'Travel',    emoji: '✈️', color: '#e0a35c' },
  { id: 'salary',    label: 'Salary',    emoji: '💼', color: '#4eca8b' },
  { id: 'other',     label: 'Other',     emoji: '📦', color: '#6c7a8a' }
];

function getCategoryInfo(id) {
  return CATEGORIES.find(c => c.id === id) || CATEGORIES[7];
}

// ── CALCULATIONS ────────────────────────────────────────────────────
function getMonthTransactions(year, month) {
  // month: 0-indexed
  return getTransactions().filter(t => {
    const d = new Date(t.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });
}

function calcTotals(txs) {
  let income = 0, expenses = 0;
  txs.forEach(t => {
    if (t.type === 'income') income += t.amount;
    else expenses += t.amount;
  });
  return { income, expenses, balance: income - expenses };
}

function calcCategorySpend(txs) {
  const map = {};
  txs.filter(t => t.type === 'expense').forEach(t => {
    map[t.category] = (map[t.category] || 0) + t.amount;
  });
  return map;
}

// ── CURRENCIES ──────────────────────────────────────────────────────
const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'DZD', symbol: 'DA', name: 'Algerian Dinar' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'MAD', symbol: 'MAD', name: 'Moroccan Dirham' }
];

function fmt(amount) {
  const s = getSettings();
  return s.currencySymbol + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ── THEME ────────────────────────────────────────────────────────────
function applyTheme() {
  const s = getSettings();
  document.documentElement.setAttribute('data-theme', s.theme || 'dark');
}

function toggleTheme() {
  const s = getSettings();
  s.theme = s.theme === 'dark' ? 'light' : 'dark';
  saveSettings(s);
  applyTheme();
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = s.theme === 'dark' ? '☀' : '🌙';
}

// ── TOAST ────────────────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = `toast ${type} show`;
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ── ACTIVE NAV ────────────────────────────────────────────────────────
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(el => {
    const href = el.getAttribute('href');
    if (href && page.includes(href.replace('.html', ''))) {
      el.classList.add('active');
      const dot = document.createElement('div');
      dot.className = 'nav-dot';
      el.appendChild(dot);
    }
  });
}

// ── PWA INSTALL ──────────────────────────────────────────────────────
let deferredInstall;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredInstall = e;
});

function triggerInstall() {
  if (deferredInstall) {
    deferredInstall.prompt();
  } else {
    showToast('Open in browser to install PWA', 'error');
  }
}

// ── SERVICE WORKER ───────────────────────────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

// ── SEED DATA (first run) ─────────────────────────────────────────────
function seedIfEmpty() {
  if (getTransactions().length > 0) return;
  const now = new Date();
  const y = now.getFullYear(), m = now.getMonth();
  const pad = n => String(n).padStart(2,'0');
  const d = (offset) => `${y}-${pad(m+1)}-${pad(Math.max(1, now.getDate()-offset))}`;

  const seeds = [
    { type:'income',  category:'salary',    name:'Monthly Salary',  amount:2500, date:d(22) },
    { type:'expense', category:'housing',   name:'Rent Payment',    amount:850,  date:d(21) },
    { type:'expense', category:'food',      name:'Grocery Store',   amount:48.3, date:d(18) },
    { type:'income',  category:'salary',    name:'Freelance Work',  amount:350,  date:d(15) },
    { type:'expense', category:'transport', name:'Fuel',            amount:62,   date:d(13) },
    { type:'expense', category:'shopping',  name:'New Headphones',  amount:89.99,date:d(10) },
    { type:'expense', category:'health',    name:'Pharmacy',        amount:24.5, date:d(8)  },
    { type:'expense', category:'food',      name:'Restaurant',      amount:55,   date:d(6)  },
    { type:'expense', category:'travel',    name:'Weekend Trip',    amount:210,  date:d(4)  },
    { type:'expense', category:'food',      name:'Supermarket',     amount:71.2, date:d(2)  },
  ];
  seeds.forEach(s => addTransaction(s));
}

// ── INIT ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  setActiveNav();
  seedIfEmpty();
  const s = getSettings();
  const tb = document.getElementById('theme-btn');
  if (tb) tb.textContent = s.theme === 'dark' ? '☀' : '🌙';
});
