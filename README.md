# Aesthetic Minimalist Task Management System

A minimalist, human-designed task and focus management system built with HTML, CSS, JavaScript, and React. Inspired by the calm, distraction-free aesthetics of Things 3 and Linear.

---

## Features

- **Real Authentication**: Functional Sign-In & Sign-Up flow with client-side credential verification and per-account data scoping.
- **Multiple Views**: Switch seamlessly between a clean Task List and an interactive Kanban Board (Todo, In Progress, Review, Completed).
- **Subtasks / Checklists**: Add checklist items to tasks with dynamic progress indicators.
- **Built-in Pomodoro Timer**: Integrated focus timer with gentle Web Audio chimes for work sessions and breaks.
- **Search & Filters**: Instant full-text search (`Ctrl+K` / `/`), priority filtering, and project tags.
- **Keyboard Shortcuts & Sound Effects**: Subtle audio cues and rapid keyboard shortcuts for an authentic, tactile feel.
- **Data Portability**: Full JSON and Markdown export/import to back up or migrate tasks at any time.
- **Dark Mode**: Neutral charcoal and matte black surfaces designed for low eye-strain.

---

## 🚀 How to Run

### Option 1: Direct Double-Click (Zero Setup!)
Simply **double-click** `index.html` in File Explorer or open it in your browser. It runs immediately with zero dependencies, build steps, or CORS issues.

### Option 2: Local HTTP Server
Double-click `start.bat` or run:
```bash
node server.cjs
```
Then open `http://localhost:3000` in your browser.

### Option 3: Modern Vite Development
If you prefer developing with a modern build pipeline:
```bash
npm install
npm run dev
```

---

## 📁 Repository Structure

```text
├── index.html              # Standalone app launcher (double-click to run anywhere)
├── style.css               # Clean human design system stylesheet
├── app.js                  # Standalone React 18 logic & component tree
├── server.cjs              # Zero-dependency local Node.js server
├── start.bat               # Windows 1-click launcher for local server
├── package.json            # npm package configuration
├── vite.config.js          # Vite build configuration
└── src/                    # Modular React source files
    ├── main.jsx            # React DOM root entry
    ├── App.jsx             # Modular React application tree
    ├── index.css           # Modular styling
    └── components/
        └── Icon.jsx        # Pure React SVG icon component
```

---

## 🔑 Demo Account

- **Email**: `alex@example.com`
- **Password**: `password123`
*(Or click **"Fill demo credentials"** on the Sign-In page, or register a new account)*
