# 🍃 ZenDay

> calm. focused. yours.

**ZenDay** is a lo-fi personal calendar + goals tracker built as a Progressive Web App (PWA). No frameworks, no build steps — pure HTML, CSS, and vanilla JS. Install it on any device straight from the browser.

---

[**→ Open App**](https://kayo-isle69.github.io/Zenday/app.html) &nbsp;·&nbsp; [**→ Landing Page**](https://kayo-isle69.github.io/Zenday) &nbsp;·&nbsp;

---
## 📸 What it looks like

```
Landing page  →  Login (username)  →  App
                                       ├── 📅 Calendar  (day timeline)
                                       ├── ⚡ Goals     (XP system)
                                       ├── 👥 Friends   (share events)
                                       └── 🌿 Profile   (stats + level)
```

---

## ✨ Features — v0.1.0

### 📅 Calendar
- Day-view timeline from 8AM to 3AM (next day)
- Overlapping events render side by side
- 8 color-coded categories: Dev, Study, Health, Social, Business, Personal, Meals, Creative
- Add, edit, delete events with a bottom sheet form
- Events persist across sessions via `localStorage`

### ⚡ Goals & XP
- Convert your to-dos into goals with XP rewards
- Filter by **Daily / Weekly / Monthly**
- Level bar fills as you complete goals — earn XP, level up
- 17 pre-loaded goals on first launch (Apr 5 schedule)
- Add custom goals with category tag + XP slider

### 🔔 Smart Alarms
- Per-event reminder sounds: Bell, Chime, Rain Drop, Singing Bowl, or None
- Set alert X minutes before event starts
- Fires at reminder time AND at event start via Web Audio API
- Toast notifications shown in-app

### 👥 Friends & Sharing
- Add friends by username
- Share events with specific friends (visible on event cards)
- Copy personal invite link to clipboard

### 🌿 Profile
- Display name + username
- Total XP, events created, goals completed, current level
- Sign out (clears session, keeps data)

### 📲 PWA — Install as App
- Works offline via Service Worker cache
- Install prompt on mobile (Android/iOS) and desktop
- No App Store. No Play Store. Just open in browser and install.

---

## 🗂 File Structure

```
zenday/
├── index.html      # Landing page
├── app.html        # The app shell
├── app.js          # All logic (login, calendar, goals, friends, alarms)
├── style.css       # Shared design system (variables, components)
├── manifest.json   # PWA manifest (name, icons, theme)
└── sw.js           # Service worker (offline caching)
```

No `node_modules`. No build step. No bundler. Drop the files, serve, done.

---

## 🏗 Roadmap

| Version | Features |
|---------|----------|
| **v0.1.0** | Username login, calendar, goals XP, friends, alarms, PWA install ✅ |
| **v0.2.0** | Real user accounts (Supabase), cloud sync, friend requests |
| **v0.3.0** | Week view, recurring events, event templates |
| **v0.4.0** | Push notifications (native, not in-app only) |
| **v0.5.0** | Goal streaks, achievement badges, leaderboard with friends |
| **v1.0.0** | Full social layer, public profiles, shared goal boards |

---

## 🛠 Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| UI | Vanilla HTML + CSS | Zero deps, instant load |
| Logic | Vanilla JS (ES6+) | No build step needed |
| Fonts | Playfair Display + DM Mono | Lo-fi warmth + readability |
| Storage | `localStorage` | Works offline, no backend |
| Audio | Web Audio API | Native alarm sounds, no library |
| PWA | Service Worker + manifest | Installable, offline-first |
| Hosting | GitHub Pages / Vercel | Free, static, fast |

---

## 🎨 Design Language

- **Palette:** warm cream `#f0ebe0`, sage green `#7c9e8a`, sand `#c4a882`, muted brown `#9e8a7c`
- **Typography:** Playfair Display (headings, serif warmth) + DM Mono (body, lo-fi feel)
- **Texture:** Subtle grain overlay via SVG noise filter
- **Motion:** Staggered fade-up on list items, smooth XP bar transitions
- **Layout:** Mobile-first, max-width 480px app shell, full-width landing

---

## 📋 Pre-loaded Data (first login)

13 events and 17 goals are loaded automatically on first sign-in, based on a real April 5 schedule:

**Goals pre-loaded:**
- 🌅 Morning routine + breakfast done by 10AM `daily · +10xp`
- 🗣️ Complete 1h language learning session `daily · +25xp`
- 🖥️ Ship 1 feature on Komino Browser `daily · +40xp`
- 🤖 Push 1 commit on AI Agent project `daily · +35xp`
- 💰 Create first Fiverr or Upwork listing `daily · +45xp`
- 🎵 Implement 1 UI screen in Music App `daily · +35xp`
- 🍜 Eat breakfast, lunch & dinner — all 3 `daily · +15xp`
- 📈 Review trading bot logs + check SGOL signal `daily · +20xp`
- 💼 Complete the full 8:30PM–12AM business block `daily · +30xp`
- 📚 Complete 30–60min focused study session `daily · +25xp`
- 🌙 Day review + set tomorrow top 3 priorities `daily · +15xp`
- 🖥️ Deploy ZenDay v0.0.1 to GitHub Pages `weekly · +60xp`
- 🤖 Define new project MVP + push first commit `weekly · +50xp`
- 🗣️ Maintain language practice every day this week `weekly · +40xp`
- 💰 Make first online earning — any amount `monthly · +100xp`
- 🎵 Publish Music App on GitHub as open source `monthly · +80xp`
- 📲 Launch ZenDay v0.1.0 as live web app `monthly · +70xp`

---

## 👤 Author

**komino_dev** · [@kayo-isle69](https://github.com/kayo-isle69)

Part of the **10-day 10-apps** series — building 10 real, deployable web apps in 10 days.

| # | App | Status |
|---|-----|--------|
| 1 | Brackets — tournament bracket manager | ✅ Live at [kayo-isle69.github.io/bracket](https://kayo-isle69.github.io/bracket) |
| 2 |  Tabib - Algeria's Medical Directory | [kayo-isle69.github.io/tabib](https://kayo-isle69.github.io/tabib) |
| 3 | FlipNote - notes & reminder manager | [kayo-isle69.github.io/FlipNote](https://kayo-isle69.github.io/FlipNote) |
| 4 | Flowly - Personal Finance Tracker | [kayo-isle69.github.io/Flowly](https://kayo-isle69.github.io/Flowly) |
| **5** | **ZenDay — calm calendar + goals** | ✅ **This repo** |
| 6–10 | Coming... | 🔜 |

---

## 📄 License

MIT — use it, fork it, build on it.

