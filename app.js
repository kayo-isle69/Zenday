/* ═══════════════════════════════════════════════════════
   ZenDay — app.js  v0.1.0
   komino_dev · 10-day 10-apps #5
═══════════════════════════════════════════════════════ */

// ─── DATA ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'dev',      label: '💻 Dev',      color: '#7c9e8a' },
  { id: 'study',    label: '📚 Study',    color: '#9e8a7c' },
  { id: 'health',   label: '🌿 Health',   color: '#8a9e7c' },
  { id: 'social',   label: '☕ Social',   color: '#9e7c8a' },
  { id: 'business', label: '💼 Business', color: '#7c8a9e' },
  { id: 'personal', label: '🌙 Personal', color: '#9e9a7c' },
  { id: 'food',     label: '🍜 Meals',    color: '#c4a882' },
  { id: 'creative', label: '🎨 Creative', color: '#a882c4' },
];

const ALARM_SOUNDS = [
  { id: 'bell',  label: '🔔 Bell' },
  { id: 'chime', label: '🎵 Chime' },
  { id: 'rain',  label: '🌧 Rain Drop' },
  { id: 'bowl',  label: '🏮 Singing Bowl' },
  { id: 'none',  label: '🔕 No Sound' },
];

const DEFAULT_EVENTS = [
  { id:'e1',  title:'🌅 Morning Routine + Breakfast', start:9.5,  end:10,   category:'food',     date:'2026-04-05', alarm:{sound:'chime',min:5},  shared:[], notes:'' },
  { id:'e2',  title:'🗣️ Language Learning',           start:10,   end:11,   category:'study',    date:'2026-04-05', alarm:{sound:'bell',min:10},   shared:[], notes:'Pick ONE language. 20m input + 20m practice + 20m writing.' },
  { id:'e3',  title:'🖥️ Dev Block 1 — Komino Browser',start:11,   end:13,   category:'dev',      date:'2026-04-05', alarm:{sound:'bowl',min:5},    shared:[], notes:'Goal: ship 1 feature.' },
  { id:'e4',  title:'🍜 Lunch Break',                  start:13,   end:13.5, category:'food',     date:'2026-04-05', alarm:{sound:'none',min:0},   shared:[], notes:'' },
  { id:'e5',  title:'🤖 Dev Block 2 — AI Agent',       start:13.5, end:15.5, category:'dev',      date:'2026-04-05', alarm:{sound:'chime',min:5},   shared:[], notes:'Push 1 commit minimum.' },
  { id:'e6',  title:'💰 Side Hustle Block',            start:15.5, end:17,   category:'business', date:'2026-04-05', alarm:{sound:'bell',min:10},   shared:[], notes:'Create Fiverr/Upwork listing today.' },
  { id:'e7',  title:'🎵 Music App Dev',                start:17,   end:18.5, category:'creative', date:'2026-04-05', alarm:{sound:'bowl',min:5},    shared:[], notes:'1 UI screen or 1 backend feature.' },
  { id:'e8',  title:'☕ Break — Rest & Recharge',      start:18.5, end:19,   category:'personal', date:'2026-04-05', alarm:{sound:'none',min:0},   shared:[], notes:'Screen-free. Walk, pray, breathe.' },
  { id:'e9',  title:'🍽️ Dinner',                       start:19,   end:19.5, category:'food',     date:'2026-04-05', alarm:{sound:'none',min:0},   shared:[], notes:'' },
  { id:'e10', title:'📈 Trading Bot Check',            start:19.5, end:20.5, category:'business', date:'2026-04-05', alarm:{sound:'chime',min:5},   shared:[], notes:'NVDA,TSLA,AAPL,AMD,MSFT + SGOL signal check.' },
  { id:'e11', title:'💼 Business Management Block',   start:20.5, end:24,   category:'business', date:'2026-04-05', alarm:{sound:'bell',min:15},   shared:[], notes:'Bot monitoring, side hustle, GitHub admin, planning.' },
  { id:'e12', title:'📚 Study Session',                start:24,   end:25,   category:'study',    date:'2026-04-05', alarm:{sound:'chime',min:5},   shared:[], notes:'AI ethics, algorithms, or Islamic finance. Pomodoro 25+5.' },
  { id:'e13', title:'🌙 Wind Down + Day Review',       start:25,   end:25.5, category:'personal', date:'2026-04-05', alarm:{sound:'none',min:0},   shared:[], notes:'3 wins, 1 to improve. Set tomorrow top 3.' },
];

const DEFAULT_GOALS = [
  // ── DAILY — Apr 5 ──────────────────────────────────────────────────────────
  { id:'g1',  title:'🌅 Morning routine + breakfast done by 10AM',          type:'daily',   tag:'personal', done:false, xp:10  },
  { id:'g2',  title:'🗣️ Complete 1h language learning session',             type:'daily',   tag:'study',    done:false, xp:25  },
  { id:'g3',  title:'🖥️ Ship 1 feature on Komino Browser',                  type:'daily',   tag:'dev',      done:false, xp:40  },
  { id:'g4',  title:'🤖 Push 1 commit on AI Agent project',                 type:'daily',   tag:'dev',      done:false, xp:35  },
  { id:'g5',  title:'💰 Create first Fiverr or Upwork listing',             type:'daily',   tag:'business', done:false, xp:45  },
  { id:'g6',  title:'🎵 Implement 1 UI screen in Music App',                type:'daily',   tag:'creative', done:false, xp:35  },
  { id:'g7',  title:'🍜 Eat breakfast, lunch & dinner — all 3',             type:'daily',   tag:'food',     done:false, xp:15  },
  { id:'g8',  title:'📈 Review trading bot logs + check SGOL signal',       type:'daily',   tag:'business', done:false, xp:20  },
  { id:'g9',  title:'💼 Complete the full 8:30PM–12AM business block',      type:'daily',   tag:'business', done:false, xp:30  },
  { id:'g10', title:'📚 Complete 30–60min focused study session',           type:'daily',   tag:'study',    done:false, xp:25  },
  { id:'g11', title:'🌙 Day review + set tomorrow top 3 priorities',        type:'daily',   tag:'personal', done:false, xp:15  },
  // ── WEEKLY ─────────────────────────────────────────────────────────────────
  { id:'g12', title:'🖥️ Deploy ZenDay v0.0.1 to GitHub Pages',              type:'weekly',  tag:'dev',      done:false, xp:60  },
  { id:'g13', title:'🤖 Define new project MVP + push first commit',        type:'weekly',  tag:'dev',      done:false, xp:50  },
  { id:'g14', title:'🗣️ Maintain language practice every day this week',    type:'weekly',  tag:'study',    done:false, xp:40  },
  // ── MONTHLY ────────────────────────────────────────────────────────────────
  { id:'g15', title:'💰 Make first online earning — any amount',            type:'monthly', tag:'business', done:false, xp:100 },
  { id:'g16', title:'🎵 Publish Music App on GitHub as open source',        type:'monthly', tag:'creative', done:false, xp:80  },
  { id:'g17', title:'📲 Launch ZenDay v0.1.0 as live web app',              type:'monthly', tag:'dev',      done:false, xp:70  },
];

// ─── STATE ────────────────────────────────────────────────────────────────────

let state = {
  user: null,
  events: [],
  goals: [],
  friends: [],
  currentDate: todayStr(),
  goalFilter: 'all',
  editingEventId: null,
  alarmTimers: [],
};

// ─── UTILS ────────────────────────────────────────────────────────────────────

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

function formatHour(h) {
  const hh = Math.floor(h % 24);
  const mm = Math.round((h % 1) * 60);
  const ampm = hh < 12 ? 'AM' : 'PM';
  const display = hh % 12 === 0 ? 12 : hh % 12;
  return `${display}:${mm.toString().padStart(2,'0')} ${ampm}`;
}

function getCat(id) { return CATEGORIES.find(c => c.id === id) || CATEGORIES[0]; }

function uid() { return 'id_' + Date.now() + '_' + Math.random().toString(36).slice(2,7); }

function timeToDecimal(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h + m / 60;
}

function decimalToTime(dec) {
  const h = Math.floor(dec % 24);
  const m = Math.round((dec % 1) * 60);
  return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`;
}

// ─── STORAGE ──────────────────────────────────────────────────────────────────

function save() {
  localStorage.setItem('zenday_state', JSON.stringify({
    user: state.user,
    events: state.events,
    goals: state.goals,
    friends: state.friends,
  }));
}

function load() {
  const raw = localStorage.getItem('zenday_state');
  if (!raw) return false;
  const saved = JSON.parse(raw);
  state.user = saved.user || null;
  state.events = saved.events || [];
  state.goals = saved.goals || [];
  state.friends = saved.friends || [];
  return !!state.user;
}

// ─── TOAST ────────────────────────────────────────────────────────────────────

function toast(msg, color) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.style.borderLeftColor = color || 'var(--sage)';
  el.style.borderLeftWidth = '3px';
  el.textContent = msg;
  document.getElementById('toastContainer').appendChild(el);
  setTimeout(() => el.remove(), 4500);
}

// ─── ALARMS ───────────────────────────────────────────────────────────────────

function scheduleAlarms() {
  state.alarmTimers.forEach(clearTimeout);
  state.alarmTimers = [];
  const todayDate = todayStr();
  state.events.filter(e => e.date === todayDate && e.alarm && e.alarm.sound !== 'none').forEach(ev => {
    const now = new Date();
    const nowH = now.getHours() + now.getMinutes() / 60;
    const cat = getCat(ev.category);

    // before alarm
    if (ev.alarm.min > 0) {
      const alarmH = ev.start - ev.alarm.min / 60;
      const msUntil = (alarmH - nowH) * 3600000;
      if (msUntil > 0) {
        state.alarmTimers.push(setTimeout(() => {
          toast(`🔔 "${ev.title}" starts in ${ev.alarm.min} min`, cat.color);
          playAlarmSound(ev.alarm.sound);
        }, msUntil));
      }
    }
    // at start
    const startMs = (ev.start - nowH) * 3600000;
    if (startMs > 0) {
      state.alarmTimers.push(setTimeout(() => {
        toast(`▶️ Starting now: "${ev.title}"`, cat.color);
        playAlarmSound(ev.alarm.sound);
      }, startMs));
    }
  });
}

function playAlarmSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const freqMap = { bell: 880, chime: 1100, rain: 440, bowl: 320 };
    osc.frequency.value = freqMap[type] || 880;
    osc.type = type === 'bowl' ? 'sine' : 'triangle';
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
    osc.start();
    osc.stop(ctx.currentTime + 1.5);
  } catch(e) { /* audio not available */ }
}

// ─── LOGIN / LOGOUT ───────────────────────────────────────────────────────────

function doLogin() {
  const username = document.getElementById('login-username').value.trim();
  const name = document.getElementById('login-name').value.trim();
  if (!username) { toast('Please enter a username', '#c47c7c'); return; }
  state.user = { username, name: name || username, joinedAt: Date.now() };
  if (state.events.length === 0) state.events = DEFAULT_EVENTS;
  if (state.goals.length === 0) state.goals = DEFAULT_GOALS;
  state.friends = [
    { id:'f1', username:'algo_kayo',   name:'Algo Kayo',   color:'#9e7c8a' },
    { id:'f2', username:'brackets_dev',name:'Brackets Dev', color:'#7c8a9e' },
  ];
  save();
  bootApp();
}

function doLogout() {
  if (!confirm('Sign out of ZenDay?')) return;
  state.user = null;
  save();
  document.getElementById('app-shell').classList.add('hidden');
  document.getElementById('login-screen').style.display = 'flex';
}

function bootApp() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app-shell').classList.remove('hidden');
  updateHeader();
  renderCalendar();
  renderGoals();
  renderFriends();
  renderProfile();
  scheduleAlarms();
  setGoalFilter('all');

  // PWA install prompt
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    setTimeout(() => {
      if (confirm('Install ZenDay on your device for the best experience?')) e.prompt();
    }, 3000);
  });
}

// ─── HEADER ───────────────────────────────────────────────────────────────────

function updateHeader() {
  const { level, xp } = calcXP();
  document.getElementById('header-level').textContent = `Lv. ${level}`;
  document.getElementById('header-xp').textContent = `${xp} XP`;
  const av = document.getElementById('header-avatar');
  av.textContent = (state.user.name || state.user.username)[0].toUpperCase();
}

function calcXP() {
  const xp = state.goals.filter(g => g.done).reduce((a, g) => a + g.xp, 0);
  const level = Math.floor(xp / 100) + 1;
  return { xp, level, xpInLevel: xp % 100 };
}

// ─── TAB SWITCHING ────────────────────────────────────────────────────────────

function switchTab(tab) {
  ['calendar','goals','friends','profile'].forEach(t => {
    document.getElementById(`tab-${t}`).style.display = t === tab ? '' : 'none';
  });
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tab);
  });
  document.getElementById('fab').style.display = tab === 'calendar' ? 'flex' : 'none';

  if (tab === 'goals') renderGoals();
  if (tab === 'friends') renderFriends();
  if (tab === 'profile') renderProfile();
}

// ─── CALENDAR ─────────────────────────────────────────────────────────────────

function changeDate(delta) {
  const d = new Date(state.currentDate + 'T12:00:00');
  d.setDate(d.getDate() + delta);
  state.currentDate = d.toISOString().split('T')[0];
  renderCalendar();
}

function renderCalendar() {
  const d = new Date(state.currentDate + 'T12:00:00');
  document.getElementById('cal-date-main').textContent = d.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });
  document.getElementById('cal-date-sub').textContent = d.getFullYear();

  const dayEvents = state.events.filter(e => e.date === state.currentDate);
  const START = 8, END = 27;
  const PX = 76;

  let html = '';
  for (let h = START; h <= END; h++) {
    const label = h < 24 ? formatHour(h) : formatHour(h);
    const eventsInSlot = dayEvents.filter(e => Math.floor(e.start) === h % 24 && !(h >= 24 && e.start < 24));
    // extended: also catch events starting in "next day" hours displayed as 24,25
    const eventsHere = dayEvents.filter(e => {
      const es = e.start >= 24 ? e.start : e.start;
      return Math.floor(es) === h;
    });

    let evHtml = '';
    eventsHere.forEach(ev => {
      const cat = getCat(ev.category);
      const heightPx = Math.max((ev.end - ev.start) * PX - 6, 28);
      const alarmBadge = ev.alarm && ev.alarm.sound !== 'none' ? '<span class="event-alarm-badge">🔔</span>' : '';
      const sharedAv = ev.shared && ev.shared.length > 0 ? ev.shared.map(sid => {
        const f = state.friends.find(x => x.id === sid);
        return f ? `<span style="display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:50%;background:${f.color};color:#f5f0e8;font-size:8px;font-weight:700;margin-right:2px">${f.name[0]}</span>` : '';
      }).join('') : '';
      evHtml += `<div class="event-block fade-up" 
        style="background:${cat.color}1a;border-color:${cat.color};height:${heightPx}px;margin-bottom:4px"
        onclick="openEditEvent('${ev.id}')">
        <div class="event-block-title" style="color:${cat.color}">${ev.title}</div>
        <div class="event-block-meta" style="color:${cat.color}99">${formatHour(ev.start)} – ${formatHour(ev.end)}</div>
        ${sharedAv ? `<div style="margin-top:4px">${sharedAv}</div>` : ''}
        ${alarmBadge}
      </div>`;
    });

    html += `<div class="tl-row">
      <div class="tl-label">${formatHour(h)}</div>
      <div class="tl-line"></div>
      <div class="tl-events">${evHtml}</div>
    </div>`;
  }
  document.getElementById('timeline').innerHTML = html;
}

// ─── EVENT FORM ───────────────────────────────────────────────────────────────

let eventFormData = {};

function openEventForm() {
  state.editingEventId = null;
  eventFormData = {
    title: '', date: state.currentDate,
    start: 10, end: 11, category: 'dev',
    alarm: { sound: 'chime', min: 10 },
    shared: [], notes: ''
  };
  document.getElementById('event-modal-title').textContent = 'New Event';
  renderEventForm();
  openModal('event-modal');
}

function openEditEvent(id) {
  const ev = state.events.find(e => e.id === id);
  if (!ev) return;
  state.editingEventId = id;
  eventFormData = JSON.parse(JSON.stringify(ev));
  document.getElementById('event-modal-title').textContent = 'Edit Event';
  renderEventForm();
  openModal('event-modal');
}

function renderEventForm() {
  const d = eventFormData;
  const catBtns = CATEGORIES.map(c => `
    <button class="cat-btn" onclick="setFormCat('${c.id}')" id="cat-btn-${c.id}"
      style="border-color:${c.color};background:${d.category===c.id?c.color:'transparent'};color:${d.category===c.id?'#f5f0e8':c.color}">
      ${c.label}
    </button>`).join('');

  const alarmOpts = ALARM_SOUNDS.map(a => `<option value="${a.id}" ${d.alarm.sound===a.id?'selected':''}>${a.label}</option>`).join('');
  const minOpts = [0,5,10,15,30,60].map(m => `<option value="${m}" ${d.alarm.min===m?'selected':''}>${m===0?'At start only':`${m} min before`}</option>`).join('');

  const friendBtns = state.friends.map(f => {
    const sel = d.shared && d.shared.includes(f.id);
    return `<button class="share-friend-btn" onclick="toggleShareFriend('${f.id}')" id="share-btn-${f.id}"
      style="border-color:${f.color};background:${sel?f.color:'transparent'};color:${sel?'#f5f0e8':f.color}">
      <span style="width:20px;height:20px;border-radius:50%;background:${sel?'rgba(255,255,255,0.25)':f.color};color:#f5f0e8;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">${f.name[0]}</span>
      ${f.username}
    </button>`;
  }).join('');

  const deleteBtn = state.editingEventId ? `<button class="save-btn" onclick="deleteEvent()" style="background:#c47c7c;margin-top:4px">Delete Event</button>` : '';

  document.getElementById('event-form').innerHTML = `
    <div>
      <label>Event Title</label>
      <input class="input" id="ef-title" placeholder="What are you doing?" value="${d.title}" oninput="eventFormData.title=this.value" />
    </div>
    <div>
      <label>Date</label>
      <input class="input" type="date" id="ef-date" value="${d.date}" onchange="eventFormData.date=this.value" />
    </div>
    <div class="form-row-2">
      <div>
        <label>Start Time</label>
        <input class="input" type="time" id="ef-start" value="${decimalToTime(d.start)}" onchange="eventFormData.start=timeToDecimal(this.value)" />
      </div>
      <div>
        <label>End Time</label>
        <input class="input" type="time" id="ef-end" value="${decimalToTime(d.end % 24)}" onchange="eventFormData.end=timeToDecimal(this.value)" />
      </div>
    </div>
    <div>
      <label>Category</label>
      <div class="cat-grid">${catBtns}</div>
    </div>
    <div>
      <label>🔔 Reminder</label>
      <div class="alarm-row">
        <select class="input" onchange="eventFormData.alarm.sound=this.value">${alarmOpts}</select>
        <select class="input" onchange="eventFormData.alarm.min=parseInt(this.value)">${minOpts}</select>
      </div>
    </div>
    ${state.friends.length > 0 ? `<div><label>👥 Share With</label><div class="friends-share">${friendBtns}</div></div>` : ''}
    <div>
      <label>Notes (optional)</label>
      <textarea class="input" rows="2" style="resize:none" oninput="eventFormData.notes=this.value" placeholder="Any details...">${d.notes||''}</textarea>
    </div>
    <button class="save-btn" onclick="saveEvent()" style="background:${getCat(d.category).color}">Save Event</button>
    ${deleteBtn}
  `;
}

function setFormCat(id) {
  eventFormData.category = id;
  renderEventForm();
}

function toggleShareFriend(id) {
  if (!eventFormData.shared) eventFormData.shared = [];
  eventFormData.shared = eventFormData.shared.includes(id)
    ? eventFormData.shared.filter(x => x !== id)
    : [...eventFormData.shared, id];
  renderEventForm();
}

function saveEvent() {
  const d = eventFormData;
  if (!d.title.trim()) { toast('Add a title first!', '#c47c7c'); return; }
  if (state.editingEventId) {
    state.events = state.events.map(e => e.id === state.editingEventId ? { ...d, id: state.editingEventId } : e);
    toast('Event updated ✓', getCat(d.category).color);
  } else {
    state.events.push({ ...d, id: uid() });
    toast('Event added ✓', getCat(d.category).color);
  }
  save();
  closeModal('event-modal');
  renderCalendar();
  scheduleAlarms();
}

function deleteEvent() {
  if (!confirm('Delete this event?')) return;
  state.events = state.events.filter(e => e.id !== state.editingEventId);
  save();
  closeModal('event-modal');
  renderCalendar();
  scheduleAlarms();
  toast('Event deleted', '#9e8a7c');
}

// ─── GOALS ───────────────────────────────────────────────────────────────────

function setGoalFilter(f) {
  state.goalFilter = f;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    const c = btn.dataset.filter === f ? 'var(--brown)' : 'var(--border-strong)';
    const bg = btn.dataset.filter === f ? 'var(--brown)' : 'transparent';
    const col = btn.dataset.filter === f ? '#f5f0e8' : 'var(--muted)';
    btn.style.borderColor = c;
    btn.style.background = bg;
    btn.style.color = col;
  });
  renderGoals();
}

function renderGoals() {
  const { xp, level, xpInLevel } = calcXP();
  const done = state.goals.filter(g => g.done).length;

  document.getElementById('goals-level').textContent = `Level ${level}`;
  document.getElementById('goals-done-count').textContent = `${done} / ${state.goals.length} goals done`;
  document.getElementById('xp-label-left').textContent = `${xpInLevel} XP this level`;
  document.getElementById('xp-label-right').textContent = `${100 - xpInLevel} XP to next`;
  document.getElementById('xp-bar-fill').style.width = `${xpInLevel}%`;

  const filtered = state.goalFilter === 'all' ? state.goals : state.goals.filter(g => g.type === state.goalFilter);
  const typeColors = { daily:'#7c9e8a', weekly:'#9e7c8a', monthly:'#7c8a9e' };

  const html = filtered.map((g, i) => {
    const cat = getCat(g.tag);
    const tc = typeColors[g.type] || 'var(--muted)';
    return `<div class="goal-item ${g.done?'done':''} fade-up" style="animation-delay:${i*0.04}s" onclick="toggleGoal('${g.id}')">
      <div class="goal-check-circle ${g.done?'checked':''}">${g.done?'✓':''}</div>
      <div class="goal-body">
        <div class="goal-title ${g.done?'done':''}">${g.title}</div>
        <div class="goal-tags-row">
          <span class="tag" style="background:${tc}18;color:${tc};border-color:${tc}44">${g.type}</span>
          <span class="tag" style="background:${cat.color}18;color:${cat.color};border-color:${cat.color}44">${cat.label.split(' ').slice(1).join(' ')}</span>
          <span class="tag" style="background:rgba(196,168,130,0.15);color:#c4a882;border-color:rgba(196,168,130,0.3)">+${g.xp} xp</span>
        </div>
      </div>
      <div class="goal-xp-badge">+${g.xp}</div>
    </div>`;
  }).join('');

  document.getElementById('goals-list').innerHTML = html || '<div style="text-align:center;color:var(--faint);font-size:13px;padding:24px">No goals here yet</div>';
  updateHeader();
}

function toggleGoal(id) {
  const g = state.goals.find(x => x.id === id);
  if (!g) return;
  g.done = !g.done;
  save();
  renderGoals();
  toast(g.done ? `⚡ +${g.xp} XP earned!` : 'Goal unmarked', g.done ? '#7c9e8a' : '#9e8a7c');
}

function openGoalForm() {
  renderGoalForm();
  openModal('goal-modal');
}

let goalFormData = {};

function renderGoalForm() {
  goalFormData = { title:'', type:'daily', tag:'dev', xp:25 };
  const typeBtns = ['daily','weekly','monthly'].map(t => `
    <button class="filter-btn" id="gft-${t}" onclick="setGoalType('${t}')"
      style="border-color:var(--brown);background:${t==='daily'?'var(--brown)':'transparent'};color:${t==='daily'?'#f5f0e8':'var(--muted)'}">${t}</button>
  `).join('');
  const tagOpts = CATEGORIES.map(c => `<option value="${c.id}">${c.label}</option>`).join('');
  document.getElementById('goal-form').innerHTML = `
    <div>
      <label>Goal</label>
      <input class="input" placeholder="What do you want to achieve?" oninput="goalFormData.title=this.value" />
    </div>
    <div>
      <label>Type</label>
      <div style="display:flex;gap:6px">${typeBtns}</div>
    </div>
    <div>
      <label>Category Tag</label>
      <select class="input" onchange="goalFormData.tag=this.value">${tagOpts}</select>
    </div>
    <div>
      <label>XP Reward: <span id="xp-slider-val">25</span></label>
      <input type="range" min="5" max="100" step="5" value="25" style="width:100%;accent-color:var(--sage)"
        oninput="goalFormData.xp=parseInt(this.value);document.getElementById('xp-slider-val').textContent=this.value" />
    </div>
    <button class="save-btn" onclick="saveGoal()" style="background:var(--sage)">Add Goal</button>
  `;
}

function setGoalType(t) {
  goalFormData.type = t;
  ['daily','weekly','monthly'].forEach(x => {
    const btn = document.getElementById(`gft-${x}`);
    if (!btn) return;
    btn.style.background = x === t ? 'var(--brown)' : 'transparent';
    btn.style.color = x === t ? '#f5f0e8' : 'var(--muted)';
  });
}

function saveGoal() {
  if (!goalFormData.title.trim()) { toast('Add a goal title!', '#c47c7c'); return; }
  state.goals.push({ ...goalFormData, id: uid(), done: false });
  save();
  closeModal('goal-modal');
  renderGoals();
  toast('Goal added ✓', '#7c9e8a');
}

// ─── FRIENDS ─────────────────────────────────────────────────────────────────

function renderFriends() {
  const link = `https://zenday.app/invite/${state.user.username}-${Math.random().toString(36).slice(2,7)}`;
  document.getElementById('invite-link-box').textContent = `zenday.app/i/${state.user.username}`;
  document.getElementById('friends-count-label').textContent = `Friends (${state.friends.length})`;

  const html = state.friends.map(f => {
    const sharedCount = state.events.filter(e => e.shared && e.shared.includes(f.id)).length;
    return `<div class="friend-item">
      <div class="avatar" style="width:44px;height:44px;font-size:17px;background:${f.color}">${f.name[0]}</div>
      <div class="friend-info">
        <div class="friend-name">${f.name}</div>
        <div class="friend-shared">@${f.username} · ${sharedCount} shared event${sharedCount!==1?'s':''}</div>
      </div>
      <button class="btn btn-ghost" style="font-size:11px;padding:6px 12px">View</button>
    </div>`;
  }).join('');
  document.getElementById('friends-list').innerHTML = html || '<div style="color:var(--faint);font-size:13px;text-align:center;padding:20px">No friends added yet</div>';
}

function addFriend() {
  const inp = document.getElementById('add-friend-input');
  const username = inp.value.trim();
  if (!username) { toast('Enter a username', '#c47c7c'); return; }
  if (state.friends.find(f => f.username === username)) { toast('Already added!', '#c4a882'); return; }
  const colors = ['#7c9e8a','#9e7c8a','#7c8a9e','#9e8a7c','#c4a882','#a882c4'];
  state.friends.push({ id: uid(), username, name: username, color: colors[state.friends.length % colors.length] });
  inp.value = '';
  save();
  renderFriends();
  toast(`${username} added ✓`, '#7c9e8a');
}

function copyInviteLink() {
  const link = `https://zenday.app/i/${state.user.username}`;
  navigator.clipboard?.writeText(link).then(() => toast('Invite link copied ✓', '#7c9e8a')).catch(() => toast('Copied to clipboard', '#7c9e8a'));
}

// ─── PROFILE ─────────────────────────────────────────────────────────────────

function renderProfile() {
  const { xp, level, xpInLevel } = calcXP();
  const u = state.user;
  const av = document.getElementById('profile-avatar');
  av.textContent = (u.name || u.username)[0].toUpperCase();
  document.getElementById('profile-name').textContent = u.name || u.username;
  document.getElementById('profile-username').textContent = `@${u.username}`;
  document.getElementById('profile-xp-label').textContent = `LVL ${level}`;
  document.getElementById('profile-xp-count').textContent = `${xp} total XP`;
  document.getElementById('profile-xp-fill').style.width = `${xpInLevel}%`;
  document.getElementById('stat-events').textContent = state.events.length;
  document.getElementById('stat-goals').textContent = state.goals.filter(g => g.done).length;
  document.getElementById('stat-level').textContent = level;
}

// ─── MODALS ───────────────────────────────────────────────────────────────────

function openModal(id) {
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

// close on overlay click
document.querySelectorAll && document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });
});

// ─── BOOT ────────────────────────────────────────────────────────────────────

window.addEventListener('DOMContentLoaded', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }

  const loggedIn = load();
  if (loggedIn) {
    document.getElementById('login-screen').style.display = 'none';
    bootApp();
  }
});
