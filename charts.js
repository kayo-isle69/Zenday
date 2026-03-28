// ── FLOWLY CHARTS ───────────────────────────────────────────────────

function chartDefaults() {
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  return {
    textColor: isDark ? 'rgba(240,235,224,0.5)' : 'rgba(26,18,8,0.5)',
    gridColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
    fontFamily: "'DM Mono', monospace"
  };
}

// ── PIE CHART (category breakdown) ──────────────────────────────────
function renderPieChart(canvasId, categorySpend) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const cats = Object.keys(categorySpend);
  if (cats.length === 0) return;

  const def = chartDefaults();
  const existing = Chart.getChart(canvas);
  if (existing) existing.destroy();

  const colors = cats.map(c => getCategoryInfo(c).color);

  new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: cats.map(c => getCategoryInfo(c).label),
      datasets: [{
        data: cats.map(c => categorySpend[c]),
        backgroundColor: colors.map(c => c + 'cc'),
        borderColor: colors,
        borderWidth: 1.5,
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      cutout: '68%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: def.textColor,
            font: { family: def.fontFamily, size: 10 },
            padding: 14,
            boxWidth: 10, boxHeight: 10,
            borderRadius: 5
          }
        },
        tooltip: {
          callbacks: {
            label: ctx => ` ${fmt(ctx.raw)}`
          }
        }
      },
      animation: { duration: 700, easing: 'easeInOutQuart' }
    }
  });
}

// ── BAR CHART (6-month trend) ────────────────────────────────────────
function renderBarChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const def = chartDefaults();
  const existing = Chart.getChart(canvas);
  if (existing) existing.destroy();

  const now = new Date();
  const labels = [];
  const incomeData = [];
  const expenseData = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    labels.push(d.toLocaleString('default', { month: 'short' }));
    const txs = getMonthTransactions(d.getFullYear(), d.getMonth());
    const tot = calcTotals(txs);
    incomeData.push(tot.income);
    expenseData.push(tot.expenses);
  }

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Income',
          data: incomeData,
          backgroundColor: 'rgba(78,202,139,0.25)',
          borderColor: '#4eca8b',
          borderWidth: 1.5,
          borderRadius: 6,
          borderSkipped: false
        },
        {
          label: 'Expenses',
          data: expenseData,
          backgroundColor: 'rgba(196,163,101,0.25)',
          borderColor: '#c4a365',
          borderWidth: 1.5,
          borderRadius: 6,
          borderSkipped: false
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          grid: { color: def.gridColor },
          ticks: { color: def.textColor, font: { family: def.fontFamily, size: 10 } }
        },
        y: {
          grid: { color: def.gridColor },
          ticks: {
            color: def.textColor,
            font: { family: def.fontFamily, size: 10 },
            callback: v => fmt(v)
          },
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          labels: {
            color: def.textColor,
            font: { family: def.fontFamily, size: 10 },
            boxWidth: 10, boxHeight: 10
          }
        },
        tooltip: {
          callbacks: { label: ctx => ` ${ctx.dataset.label}: ${fmt(ctx.raw)}` }
        }
      },
      animation: { duration: 700, easing: 'easeInOutQuart' }
    }
  });
}
