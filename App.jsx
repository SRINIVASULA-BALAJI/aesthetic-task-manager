/* ========================================================
   Crafted Task Workspace - Human & Minimalist Logic
   Clean, authentic, distraction-free productivity system
   ======================================================== */

import React, { useState, useEffect, useMemo, useRef, Component } from 'react';

// ==========================================
// CLEAN, HANDCRAFTED SVG ICONS
// ==========================================
function Icon({ name, className = "w-4 h-4", fill = "none" }) {
  const paths = {
    'check': <polyline points="20 6 9 17 4 12" />,
    'check-circle-2': <React.Fragment><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></React.Fragment>,
    'circle': <circle cx="12" cy="12" r="9"/>,
    'clock': <React.Fragment><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></React.Fragment>,
    'star': <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    'edit-3': <React.Fragment><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></React.Fragment>,
    'trash-2': <React.Fragment><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></React.Fragment>,
    'plus': <React.Fragment><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></React.Fragment>,
    'search': <React.Fragment><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></React.Fragment>,
    'x': <React.Fragment><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></React.Fragment>,
    'chevron-down': <polyline points="6 9 12 15 18 9"/>,
    'chevron-right': <polyline points="9 18 15 12 9 6"/>,
    'calendar': <React.Fragment><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></React.Fragment>,
    'timer': <React.Fragment><line x1="10" y1="2" x2="14" y2="2"/><line x1="12" y1="14" x2="15" y2="11"/><circle cx="12" cy="14" r="8"/></React.Fragment>,
    'list': <React.Fragment><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></React.Fragment>,
    'kanban': <React.Fragment><path d="M6 5v11"/><path d="M12 5v6"/><path d="M18 5v14"/></React.Fragment>,
    'volume-2': <React.Fragment><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></React.Fragment>,
    'volume-x': <React.Fragment><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></React.Fragment>,
    'sun': <React.Fragment><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></React.Fragment>,
    'moon': <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>,
    'arrow-down-up': <React.Fragment><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></React.Fragment>,
    'download': <React.Fragment><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></React.Fragment>,
    'upload': <React.Fragment><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></React.Fragment>,
    'copy': <React.Fragment><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></React.Fragment>,
    'user': <React.Fragment><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></React.Fragment>,
    'mail': <React.Fragment><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></React.Fragment>,
    'lock': <React.Fragment><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></React.Fragment>,
    'eye': <React.Fragment><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></React.Fragment>,
    'eye-off': <React.Fragment><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></React.Fragment>,
    'shield-check': <React.Fragment><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></React.Fragment>,
    'play': <polygon points="5 3 19 12 5 21 5 3"/>,
    'pause': <React.Fragment><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></React.Fragment>,
    'rotate-ccw': <React.Fragment><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></React.Fragment>,
    'log-out': <React.Fragment><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></React.Fragment>,
    'arrow-right': <React.Fragment><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></React.Fragment>,
    'alert-circle': <React.Fragment><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></React.Fragment>
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name] || <circle cx="12" cy="12" r="8"/>}
    </svg>
  );
}

// ==========================================
// ERROR BOUNDARY
// ==========================================
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Workspace caught error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 text-center">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl max-w-sm card-shadow">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Session reloaded</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5">
              Click below to return to your tasks.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-medium btn-press"
            >
              Resume
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ==========================================
// SUBTLE, TACTILE SOUNDS
// ==========================================
const playSound = (type = 'click') => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'complete') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(720, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } else if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } else if (type === 'timer') {
      [440, 554.37, 659.25].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + idx * 0.1 + 0.25);
      });
    }
  } catch (e) {}
};

// ==========================================
// NATURAL, RESTRAINED CONSTANTS
// ==========================================
const DEFAULT_CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'work', name: 'Work', badge: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700' },
  { id: 'personal', name: 'Personal', badge: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700' },
  { id: 'study', name: 'Study', badge: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700' },
  { id: 'health', name: 'Health', badge: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700' },
];

const PRIORITIES = {
  high: { label: 'High', dot: 'bg-red-500', text: 'text-red-600 dark:text-red-400' },
  medium: { label: 'Medium', dot: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
  low: { label: 'Low', dot: 'bg-zinc-400', text: 'text-zinc-500 dark:text-zinc-400' }
};

const DEFAULT_DEMO_USER = {
  id: 'user_alex',
  name: 'Alex Rivera',
  email: 'alex@example.com',
  password: 'password123',
  createdAt: Date.now()
};

const createStarterTasksForUser = (userName) => [
  {
    id: '1',
    title: 'Review quarterly goals and deliverables',
    description: 'Verify deadlines, align milestone priorities with team members.',
    category: 'work',
    priority: 'high',
    status: 'todo',
    dueDate: new Date().toISOString().split('T')[0],
    completed: false,
    starred: true,
    subtasks: [
      { id: 'st_1', title: 'Draft summary sheet', done: true },
      { id: 'st_2', title: 'Schedule follow-up call', done: false }
    ],
    createdAt: Date.now() - 3600000 * 3,
  },
  {
    id: '2',
    title: '30-minute cardio session',
    description: 'Outdoor jog or cycling workout.',
    category: 'health',
    priority: 'medium',
    status: 'in_progress',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    completed: false,
    starred: false,
    subtasks: [],
    createdAt: Date.now() - 3600000 * 5,
  },
  {
    id: '3',
    title: 'Organize desk and filing documents',
    description: 'Clean workspace before evening.',
    category: 'personal',
    priority: 'low',
    status: 'completed',
    dueDate: new Date().toISOString().split('T')[0],
    completed: true,
    starred: false,
    subtasks: [],
    createdAt: Date.now() - 3600000 * 8,
  }
];

// ==========================================
// MAIN WORKSPACE COMPONENT
// ==========================================
function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('folio_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('folio_sound') === 'true';
  });

  const [viewMode, setViewMode] = useState('list');

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('folio_users');
      return saved ? JSON.parse(saved) : [DEFAULT_DEMO_USER];
    } catch (e) {
      return [DEFAULT_DEMO_USER];
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('folio_active_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [authMode, setAuthMode] = useState('login');
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('folio_categories');
      return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
    } catch (e) {
      return DEFAULT_CATEGORIES;
    }
  });

  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const [editingTask, setEditingTask] = useState(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isPomodoroOpen, setIsPomodoroOpen] = useState(false);
  const [isBackupOpen, setIsBackupOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [pomodoroSelectedTask, setPomodoroSelectedTask] = useState(null);

  useEffect(() => {
    localStorage.setItem('folio_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('folio_sound', soundEnabled ? 'true' : 'false');
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('folio_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('folio_active_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('folio_active_user');
    }
  }, [currentUser]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('folio_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('folio_theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    if (currentUser) {
      const key = `folio_tasks_${currentUser.id}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          setTasks(JSON.parse(saved));
        } catch (e) {
          setTasks(createStarterTasksForUser(currentUser.name));
        }
      } else {
        const initial = createStarterTasksForUser(currentUser.name);
        setTasks(initial);
        localStorage.setItem(key, JSON.stringify(initial));
      }
    } else {
      setTasks([]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const key = `folio_tasks_${currentUser.id}`;
      localStorage.setItem(key, JSON.stringify(tasks));
    }
  }, [tasks, currentUser]);

  const toggleComplete = (id) => {
    const targetTask = tasks.find(t => t.id === id);
    const nextCompletedState = targetTask ? !targetTask.completed : false;

    if (soundEnabled) {
      playSound(nextCompletedState ? 'complete' : 'click');
    }

    setTasks(prev => {
      return prev.map(t => {
        if (t.id === id) {
          return { 
            ...t, 
            completed: nextCompletedState,
            status: nextCompletedState ? 'completed' : 'todo'
          };
        }
        return t;
      });
    });
  };

  const setTaskStatus = (id, newStatus) => {
    if (soundEnabled) playSound(newStatus === 'completed' ? 'complete' : 'click');
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status: newStatus,
          completed: newStatus === 'completed'
        };
      }
      return t;
    }));
  };

  const toggleStar = (id) => {
    if (soundEnabled) playSound('click');
    setTasks(prev => prev.map(t => t.id === id ? { ...t, starred: !t.starred } : t));
  };

  const deleteTask = (id) => {
    if (soundEnabled) playSound('click');
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const addTask = (newTask) => {
    if (soundEnabled) playSound('click');
    setTasks(prev => [newTask, ...prev]);
    setIsAddFormOpen(false);
  };

  const updateTask = (updatedTask) => {
    if (soundEnabled) playSound('click');
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    setEditingTask(null);
  };

  const toggleSubtask = (taskId, subtaskId) => {
    if (soundEnabled) playSound('click');
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextSubtasks = (t.subtasks || []).map(st => 
          st.id === subtaskId ? { ...st, done: !st.done } : st
        );
        return { ...t, subtasks: nextSubtasks };
      }
      return t;
    }));
  };

  const clearCompleted = () => {
    if (window.confirm("Remove all completed tasks?")) {
      setTasks(prev => prev.filter(t => !t.completed));
    }
  };

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const starred = tasks.filter(t => t.starred).length;
    return { total, completed, pending, starred };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (activeTab === 'active' && task.completed) return false;
      if (activeTab === 'completed' && !task.completed) return false;
      if (activeTab === 'starred' && !task.starred) return false;

      if (selectedCategory !== 'all' && task.category !== selectedCategory) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = (task.title || '').toLowerCase().includes(q);
        const matchDesc = (task.description || '').toLowerCase().includes(q);
        const matchCat = (task.category || '').toLowerCase().includes(q);
        const matchSubtask = (task.subtasks || []).some(st => (st.title || '').toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchCat && !matchSubtask) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'priority') {
        const weights = { high: 3, medium: 2, low: 1 };
        return (weights[b.priority] || 2) - (weights[a.priority] || 2);
      }
      if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return (b.createdAt || 0) - (a.createdAt || 0);
    });
  }, [tasks, activeTab, selectedCategory, searchQuery, sortBy]);

  if (!currentUser) {
    return (
      <AuthScreen
        authMode={authMode}
        setAuthMode={setAuthMode}
        registeredUsers={registeredUsers}
        onLogin={(u) => setCurrentUser(u)}
        onSignUp={(u) => {
          setRegisteredUsers(prev => [...prev, u]);
          localStorage.setItem(`folio_tasks_${u.id}`, JSON.stringify(createStarterTasksForUser(u.name)));
          setCurrentUser(u);
        }}
        isDark={isDark}
        setIsDark={setIsDark}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-fadeIn">
      
      {/* CLEAN HUMAN TOP BAR */}
      <header className="flex items-center justify-between pb-6 mb-6 border-b border-zinc-200 dark:border-zinc-800/80">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold text-sm">
            <Icon name="check" className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight leading-none">
              Workspace
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              {stats.pending === 1 ? '1 task remaining' : `${stats.pending} tasks remaining`}
            </p>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-1 sm:gap-2">
          
          <button
            onClick={() => setIsPomodoroOpen(true)}
            title="Focus timer"
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors btn-press"
          >
            <Icon name="timer" className="w-4 h-4" />
          </button>

          <div className="flex items-center bg-zinc-100 dark:bg-zinc-800/80 p-0.5 rounded-lg border border-zinc-200/60 dark:border-zinc-700/60 text-xs">
            <button
              onClick={() => setViewMode('list')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              Board
            </button>
          </div>

          <button
            onClick={() => setIsDark(!isDark)}
            title={isDark ? "Light mode" : "Dark mode"}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors btn-press"
          >
            <Icon name={isDark ? "sun" : "moon"} className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsBackupOpen(true)}
            title="Backup & Export"
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors btn-press"
          >
            <Icon name="arrow-down-up" className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsProfileOpen(true)}
            className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-xs font-medium text-zinc-700 dark:text-zinc-300 btn-press ml-1"
          >
            <div className="w-5 h-5 rounded-full bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 flex items-center justify-center text-[10px] font-bold">
              {(currentUser.name || 'U').charAt(0)}
            </div>
            <span className="hidden sm:inline">{(currentUser.name || 'User').split(' ')[0]}</span>
          </button>

          <button
            onClick={() => setIsAddFormOpen(true)}
            className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors btn-press ml-1"
          >
            <Icon name="plus" className="w-3.5 h-3.5" />
            <span>New</span>
          </button>
        </div>
      </header>

      {/* QUICK INLINE INPUT */}
      <div className="mb-6">
        <QuickAddBar onAdd={addTask} categories={categories} />
      </div>

      {/* FILTER TABS & SEARCH */}
      <div className="space-y-3 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          
          <div className="flex items-center gap-1 text-xs font-medium border-b border-zinc-200 dark:border-zinc-800 pb-2 sm:pb-0 sm:border-none">
            {[
              { id: 'all', label: 'All', count: tasks.length },
              { id: 'active', label: 'Active', count: stats.pending },
              { id: 'completed', label: 'Done', count: stats.completed },
              { id: 'starred', label: 'Starred', count: stats.starred }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-zinc-200/80 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold'
                    : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                {tab.label} <span className="opacity-60 text-[11px] ml-0.5">{tab.count}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-52">
              <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
                <Icon name="search" className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-8 pr-7 py-1 rounded-md text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  <Icon name="x" className="w-3 h-3" />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2 py-1 rounded-md text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 focus:outline-none"
            >
              <option value="date">Newest</option>
              <option value="dueDate">Due date</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>

        {/* TAG PILLS */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] transition-colors border ${
                  isSelected
                    ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white font-medium'
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
          
          <button
            onClick={() => setIsTagModalOpen(true)}
            className="px-2 py-1 rounded-md text-[11px] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center gap-1 transition-colors"
          >
            <Icon name="plus" className="w-2.5 h-2.5" />
            <span>Tag</span>
          </button>
        </div>
      </div>

      {/* VIEW RENDERER */}
      {viewMode === 'list' ? (
        <div className="space-y-2">
          {filteredTasks.length === 0 ? (
            <EmptyState
              searchQuery={searchQuery}
              activeTab={activeTab}
              onOpenAdd={() => setIsAddFormOpen(true)}
              onSwitchTab={(t) => setActiveTab(t)}
            />
          ) : (
            filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                categories={categories}
                onToggle={toggleComplete}
                onStar={toggleStar}
                onEdit={(t) => setEditingTask(t)}
                onDelete={deleteTask}
                onToggleSubtask={toggleSubtask}
                onStartFocus={(t) => {
                  setPomodoroSelectedTask(t);
                  setIsPomodoroOpen(true);
                }}
              />
            ))
          )}
        </div>
      ) : (
        <KanbanBoard
          tasks={filteredTasks}
          categories={categories}
          onMoveTask={setTaskStatus}
          onToggleComplete={toggleComplete}
          onEdit={(t) => setEditingTask(t)}
          onDelete={deleteTask}
        />
      )}

      {/* FOOTER */}
      {tasks.length > 0 && (
        <div className="mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <span>{filteredTasks.length} of {tasks.length} tasks</span>
          {stats.completed > 0 && (
            <button
              onClick={clearCompleted}
              className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors flex items-center gap-1 text-[11px]"
            >
              Clear completed ({stats.completed})
            </button>
          )}
        </div>
      )}

      {/* MODALS */}
      {isAddFormOpen && (
        <TaskModal
          title="New Task"
          categories={categories}
          onClose={() => setIsAddFormOpen(false)}
          onSave={addTask}
        />
      )}

      {editingTask && (
        <TaskModal
          title="Edit Task"
          initialData={editingTask}
          categories={categories}
          onClose={() => setEditingTask(null)}
          onSave={updateTask}
        />
      )}

      {isPomodoroOpen && (
        <PomodoroModal
          selectedTask={pomodoroSelectedTask}
          tasks={tasks}
          soundEnabled={soundEnabled}
          onSelectTask={setPomodoroSelectedTask}
          onClose={() => setIsPomodoroOpen(false)}
        />
      )}

      {isBackupOpen && (
        <BackupModal
          tasks={tasks}
          currentUser={currentUser}
          onImport={(newTasks) => setTasks(newTasks)}
          onClose={() => setIsBackupOpen(false)}
        />
      )}

      {isProfileOpen && (
        <ProfileModal
          user={currentUser}
          onUpdateUser={(updated) => {
            setCurrentUser(updated);
            setRegisteredUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
          }}
          onLogout={() => {
            setCurrentUser(null);
            setIsProfileOpen(false);
          }}
          onClose={() => setIsProfileOpen(false)}
        />
      )}

      {isTagModalOpen && (
        <TagModal
          onAddTag={(newTag) => {
            setCategories(prev => [...prev, newTag]);
            setIsTagModalOpen(false);
          }}
          onClose={() => setIsTagModalOpen(false)}
        />
      )}

    </div>
  );
}

// ==========================================
// KANBAN BOARD
// ==========================================
function KanbanBoard({ tasks, categories, onMoveTask, onToggleComplete, onEdit, onDelete }) {
  const columns = [
    { id: 'todo', title: 'To do' },
    { id: 'in_progress', title: 'In progress' },
    { id: 'completed', title: 'Completed' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {columns.map(col => {
        const colTasks = tasks.filter(t => (t.status || (t.completed ? 'completed' : 'todo')) === col.id);
        return (
          <div
            key={col.id}
            className="bg-zinc-100/70 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 flex flex-col min-h-[380px]"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-200 dark:border-zinc-800/80">
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{col.title}</span>
              <span className="text-[11px] font-medium text-zinc-400">{colTasks.length}</span>
            </div>

            <div className="space-y-2 flex-1 overflow-y-auto">
              {colTasks.length === 0 ? (
                <div className="text-center py-8 text-[11px] text-zinc-400">Empty</div>
              ) : (
                colTasks.map(task => {
                  const priorityObj = PRIORITIES[task.priority] || PRIORITIES.medium;
                  return (
                    <div
                      key={task.id}
                      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg card-shadow group"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100 leading-snug">
                          {task.title}
                        </span>
                        <span className={`w-1.5 h-1.5 rounded-full ${priorityObj.dot} flex-shrink-0 mt-1.5`}></span>
                      </div>

                      {task.description && (
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                          {task.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-zinc-100 dark:border-zinc-800/80 text-[10px]">
                        <span className="text-zinc-400 capitalize">{task.category}</span>
                        <div className="flex items-center gap-1">
                          {col.id !== 'todo' && (
                            <button
                              onClick={() => onMoveTask(task.id, 'todo')}
                              className="px-1.5 py-0.5 rounded text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            >
                              To do
                            </button>
                          )}
                          {col.id !== 'in_progress' && (
                            <button
                              onClick={() => onMoveTask(task.id, 'in_progress')}
                              className="px-1.5 py-0.5 rounded text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            >
                              Doing
                            </button>
                          )}
                          {col.id !== 'completed' && (
                            <button
                              onClick={() => onMoveTask(task.id, 'completed')}
                              className="px-1.5 py-0.5 rounded text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            >
                              Done
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ==========================================
// CLEAN TASK CARD
// ==========================================
function TaskCard({ task, categories, onToggle, onStar, onEdit, onDelete, onToggleSubtask, onStartFocus }) {
  const [isSubtasksExpanded, setIsSubtasksExpanded] = useState(false);
  const priorityObj = PRIORITIES[task.priority] || PRIORITIES.medium;
  const subtasks = task.subtasks || [];
  const completedSubtasks = subtasks.filter(s => s.done).length;

  const dueDateInfo = useMemo(() => {
    if (!task.dueDate) return null;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const [year, month, day] = task.dueDate.split('-');
    const target = new Date(year, month - 1, day);
    const diffDays = Math.ceil((target - now) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { label: 'Overdue', alert: true };
    if (diffDays === 0) return { label: 'Today', alert: true };
    if (diffDays === 1) return { label: 'Tomorrow', alert: false };
    return { label: target.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), alert: false };
  }, [task.dueDate]);

  return (
    <div
      className={`group bg-white dark:bg-zinc-900 border rounded-xl p-3 sm:p-3.5 transition-all card-shadow ${
        task.completed
          ? 'border-zinc-200/60 dark:border-zinc-800/60 opacity-60'
          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Minimal round checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
            task.completed
              ? 'bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-900'
              : 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-500 bg-transparent'
          }`}
        >
          {task.completed ? <Icon name="check" className="w-3 h-3 stroke-[2.5]" /> : null}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3
              onClick={() => onToggle(task.id)}
              className={`text-sm font-medium cursor-pointer select-none task-title break-words ${
                task.completed
                  ? 'text-zinc-400 dark:text-zinc-500 line-through'
                  : 'text-zinc-900 dark:text-zinc-100'
              }`}
            >
              {task.title}
            </h3>
          </div>

          {task.description && (
            <p className={`text-xs mt-0.5 break-words ${
              task.completed ? 'text-zinc-400 dark:text-zinc-600' : 'text-zinc-500 dark:text-zinc-400'
            }`}>
              {task.description}
            </p>
          )}

          {/* Subtasks dropdown */}
          {subtasks.length > 0 && (
            <div className="mt-2">
              <button
                onClick={() => setIsSubtasksExpanded(!isSubtasksExpanded)}
                className="flex items-center gap-1.5 text-[11px] text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              >
                <Icon name={isSubtasksExpanded ? "chevron-down" : "chevron-right"} className="w-3 h-3" />
                <span>{completedSubtasks}/{subtasks.length} subtasks</span>
              </button>

              {isSubtasksExpanded && (
                <div className="mt-1.5 space-y-1 pl-3 border-l border-zinc-200 dark:border-zinc-800">
                  {subtasks.map(st => (
                    <div key={st.id} className="flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={st.done}
                        onChange={() => onToggleSubtask(task.id, st.id)}
                        className="rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 focus:ring-0 w-3 h-3 cursor-pointer"
                      />
                      <span className={`text-[11px] ${st.done ? 'text-zinc-400 line-through' : 'text-zinc-700 dark:text-zinc-300'}`}>
                        {st.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Meta line */}
          <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px]">
            <span className="text-zinc-400 capitalize">{task.category}</span>

            <span className="flex items-center gap-1 text-zinc-400">
              <span className={`w-1.5 h-1.5 rounded-full ${priorityObj.dot}`}></span>
              {priorityObj.label}
            </span>

            {dueDateInfo && (
              <span className={`flex items-center gap-1 ${dueDateInfo.alert && !task.completed ? 'text-red-500 font-medium' : 'text-zinc-400'}`}>
                <Icon name="calendar" className="w-3 h-3" />
                {dueDateInfo.label}
              </span>
            )}
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-0.5 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onStartFocus(task)}
            title="Focus"
            className="p-1.5 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
          >
            <Icon name="clock" className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onStar(task.id)}
            title={task.starred ? "Unstar" : "Star"}
            className={`p-1.5 rounded ${
              task.starred ? 'text-amber-500' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
            }`}
          >
            <Icon name="star" className={`w-3.5 h-3.5 ${task.starred ? 'fill-amber-500' : ''}`} />
          </button>

          <button
            onClick={() => onEdit(task)}
            title="Edit"
            className="p-1.5 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
          >
            <Icon name="edit-3" className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onDelete(task.id)}
            title="Delete"
            className="p-1.5 rounded text-zinc-400 hover:text-red-500"
          >
            <Icon name="trash-2" className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// QUICK ADD BAR
// ==========================================
function QuickAddBar({ onAdd, categories }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('work');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      id: Date.now().toString(),
      title: title.trim(),
      description: '',
      category,
      priority,
      status: 'todo',
      dueDate: dueDate || null,
      completed: false,
      starred: false,
      subtasks: [],
      createdAt: Date.now()
    });

    setTitle('');
    setDueDate('');
    setIsExpanded(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 sm:p-3 card-shadow focus-within:border-zinc-400 dark:focus-within:border-zinc-600 transition-colors"
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={title}
          onFocus={() => setIsExpanded(true)}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task... (press Enter)"
          className="w-full bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!title.trim()}
          className="px-3 py-1 rounded-md text-xs font-medium bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 disabled:opacity-30 transition-colors btn-press"
        >
          Add
        </button>
      </div>

      {isExpanded && (
        <div className="flex flex-wrap items-center gap-3 pt-2.5 mt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-400 text-[11px]">Tag:</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded px-1.5 py-0.5 text-zinc-700 dark:text-zinc-300 focus:outline-none text-[11px]"
            >
              {(categories || []).filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-zinc-400 text-[11px]">Priority:</span>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded px-1.5 py-0.5 text-zinc-700 dark:text-zinc-300 focus:outline-none text-[11px]"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-zinc-400 text-[11px]">Due:</span>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded px-1.5 py-0.5 text-zinc-700 dark:text-zinc-300 focus:outline-none text-[11px]"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="ml-auto text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 text-[11px]"
          >
            Close
          </button>
        </div>
      )}
    </form>
  );
}

// ==========================================
// TASK MODAL
// ==========================================
function TaskModal({ title, initialData, categories, onClose, onSave }) {
  const [taskTitle, setTaskTitle] = useState(initialData ? initialData.title : '');
  const [description, setDescription] = useState(initialData ? initialData.description || '' : '');
  const [category, setCategory] = useState(initialData ? initialData.category : 'work');
  const [priority, setPriority] = useState(initialData ? initialData.priority : 'medium');
  const [dueDate, setDueDate] = useState(initialData ? initialData.dueDate || '' : '');
  const [subtasks, setSubtasks] = useState(initialData ? initialData.subtasks || [] : []);
  const [newSubtaskInput, setNewSubtaskInput] = useState('');

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newSubtaskInput.trim()) return;
    setSubtasks([...subtasks, { id: 'st_' + Date.now(), title: newSubtaskInput.trim(), done: false }]);
    setNewSubtaskInput('');
  };

  const handleRemoveSubtask = (id) => {
    setSubtasks(subtasks.filter(s => s.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    onSave({
      id: initialData ? initialData.id : Date.now().toString(),
      title: taskTitle.trim(),
      description: description.trim(),
      category,
      priority,
      status: initialData ? initialData.status || (initialData.completed ? 'completed' : 'todo') : 'todo',
      dueDate: dueDate || null,
      completed: initialData ? initialData.completed : false,
      starred: initialData ? initialData.starred : false,
      subtasks: subtasks,
      createdAt: initialData ? initialData.createdAt : Date.now(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-md p-5 card-shadow">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h2>
          <button onClick={onClose} className="p-1 rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
            <Icon name="x" className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              autoFocus
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full px-3 py-1.5 rounded-lg text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-zinc-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              Notes
            </label>
            <textarea
              rows="2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details..."
              className="w-full px-3 py-1.5 rounded-lg text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-zinc-400 resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              Checklist
            </label>
            <div className="flex gap-1.5 mb-1.5">
              <input
                type="text"
                value={newSubtaskInput}
                onChange={(e) => setNewSubtaskInput(e.target.value)}
                placeholder="Subtask item..."
                className="flex-1 px-2.5 py-1 rounded-md text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                className="px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300"
              >
                Add
              </button>
            </div>

            {subtasks.length > 0 && (
              <div className="space-y-1 max-h-24 overflow-y-auto p-1.5 rounded-md bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800">
                {subtasks.map(st => (
                  <div key={st.id} className="flex items-center justify-between text-xs py-0.5">
                    <span className="text-zinc-700 dark:text-zinc-300 truncate">{st.title}</span>
                    <button type="button" onClick={() => handleRemoveSubtask(st.id)} className="text-zinc-400 hover:text-red-500">
                      <Icon name="x" className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <div>
              <label className="block text-[11px] font-medium text-zinc-500 mb-1">Tag</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-2 py-1 rounded-md text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 focus:outline-none"
              >
                {(categories || []).filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-zinc-500 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-2 py-1 rounded-md text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 focus:outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-zinc-500 mb-1">Due</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-1.5 py-1 rounded-md text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!taskTitle.trim()}
              className="px-4 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 disabled:opacity-40 btn-press"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// CLEAN FOCUS TIMER
// ==========================================
function PomodoroModal({ selectedTask, tasks, soundEnabled, onSelectTask, onClose }) {
  const [mode, setMode] = useState('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const durations = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 };

  const setTimerMode = (m) => {
    setIsRunning(false);
    setMode(m);
    setTimeLeft(durations[m]);
  };

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (soundEnabled) playSound('timer');
      alert(mode === 'focus' ? 'Focus session completed.' : 'Break finished.');
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, soundEnabled]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-sm p-6 card-shadow text-center">
        
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Focus Timer</span>
          <button onClick={onClose} className="p-1 rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
            <Icon name="x" className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-1 my-4 bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg text-xs font-medium">
          <button
            onClick={() => setTimerMode('focus')}
            className={`px-3 py-1 rounded-md transition-all ${mode === 'focus' ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm' : 'text-zinc-500'}`}
          >
            25m Focus
          </button>
          <button
            onClick={() => setTimerMode('short')}
            className={`px-3 py-1 rounded-md transition-all ${mode === 'short' ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm' : 'text-zinc-500'}`}
          >
            5m Break
          </button>
          <button
            onClick={() => setTimerMode('long')}
            className={`px-3 py-1 rounded-md transition-all ${mode === 'long' ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm' : 'text-zinc-500'}`}
          >
            15m Break
          </button>
        </div>

        <div className="my-6">
          <div className="text-5xl font-semibold text-zinc-900 dark:text-zinc-100 font-mono tracking-tight">
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="mb-5 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 text-left text-xs">
          <span className="text-zinc-400 text-[10px] block mb-0.5">Task:</span>
          <select
            value={selectedTask ? selectedTask.id : ''}
            onChange={(e) => {
              const found = tasks.find(t => t.id === e.target.value);
              onSelectTask(found || null);
            }}
            className="w-full bg-transparent font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none"
          >
            <option value="">-- General session --</option>
            {tasks.filter(t => !t.completed).map(t => (
              <option key={t.id} value={t.id}>{t.title}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-6 py-2 rounded-lg text-xs font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 btn-press"
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(durations[mode]);
            }}
            className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 btn-press"
          >
            <Icon name="rotate-ccw" className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// BACKUP MODAL
// ==========================================
function BackupModal({ tasks, currentUser, onImport, onClose }) {
  const [copied, setCopied] = useState(false);

  const downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `tasks_${(currentUser.name || 'user').toLowerCase().replace(/\s+/g, '_')}.json`);
    dlAnchor.click();
  };

  const copyMarkdown = () => {
    let md = `# Tasks\n\n`;
    tasks.forEach(t => {
      md += `- [${t.completed ? 'x' : ' '}] ${t.title} (${t.priority})\n`;
      if (t.description) md += `  ${t.description}\n`;
    });

    navigator.clipboard.writeText(md).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (Array.isArray(parsed)) {
          onImport(parsed);
          alert("Imported " + parsed.length + " tasks.");
          onClose();
        }
      } catch (err) {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-sm p-5 card-shadow">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Backup & Export</span>
          <button onClick={onClose} className="p-1 rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
            <Icon name="x" className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 my-4">
          <button
            onClick={downloadJSON}
            className="w-full flex items-center justify-between p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-left transition-colors"
          >
            <div>
              <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200">Export JSON file</div>
              <div className="text-[11px] text-zinc-400">Save full task database</div>
            </div>
            <Icon name="download" className="w-4 h-4 text-zinc-400" />
          </button>

          <button
            onClick={copyMarkdown}
            className="w-full flex items-center justify-between p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-left transition-colors"
          >
            <div>
              <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                {copied ? "Copied!" : "Copy as Markdown"}
              </div>
              <div className="text-[11px] text-zinc-400">Formatted checklist</div>
            </div>
            <Icon name="copy" className="w-4 h-4 text-zinc-400" />
          </button>

          <div className="p-2.5 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800 text-center">
            <label className="cursor-pointer block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              <span>Import JSON file</span>
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-1.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// ==========================================
// PROFILE MODAL
// ==========================================
function ProfileModal({ user, onUpdateUser, onLogout, onClose }) {
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState(user.password);

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name: name.trim(),
      password: password
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-sm p-5 card-shadow">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Account</span>
          <button onClick={onClose} className="p-1 rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
            <Icon name="x" className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Email</label>
            <input
              type="email"
              disabled
              value={user.email}
              className="w-full px-3 py-1.5 rounded-lg text-xs bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 text-zinc-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Password</label>
            <input
              type="text"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onLogout}
              className="text-xs font-medium text-red-500 hover:text-red-600 flex items-center gap-1"
            >
              Sign out
            </button>

            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 btn-press"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// TAG CREATOR MODAL
// ==========================================
function TagModal({ onAddTag, onClose }) {
  const [tagName, setTagName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tagName.trim()) return;

    onAddTag({
      id: 'tag_' + Date.now(),
      name: tagName.trim()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-xs p-5 card-shadow">
        <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Add Tag</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            required
            autoFocus
            placeholder="Tag name"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 focus:outline-none"
          />

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded-md text-xs font-medium text-zinc-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!tagName.trim()}
              className="px-3 py-1 rounded-md text-xs font-medium bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 disabled:opacity-40 btn-press"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// CLEAN AUTH SCREEN
// ==========================================
function AuthScreen({ authMode, setAuthMode, registeredUsers, onLogin, onSignUp, isDark, setIsDark }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const switchMode = (mode) => {
    setErrorMsg('');
    setAuthMode(mode);
  };

  const handleFillDemo = () => {
    setEmail('alex@example.com');
    setPassword('password123');
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const cleanEmail = email.trim().toLowerCase();

    if (authMode === 'signup') {
      if (!name.trim()) { setErrorMsg('Enter your name.'); return; }
      if (!cleanEmail || !cleanEmail.includes('@')) { setErrorMsg('Enter a valid email.'); return; }
      if (password.length < 6) { setErrorMsg('Password must be at least 6 characters.'); return; }
      if (password !== confirmPassword) { setErrorMsg('Passwords do not match.'); return; }

      const existing = registeredUsers.find(u => u.email.toLowerCase() === cleanEmail);
      if (existing) { setErrorMsg('Email already in use.'); return; }

      const newUser = {
        id: 'user_' + Date.now(),
        name: name.trim(),
        email: cleanEmail,
        password: password,
        createdAt: Date.now()
      };

      onSignUp(newUser);
    } else {
      if (!cleanEmail || !password) { setErrorMsg('Enter your email and password.'); return; }

      const found = registeredUsers.find(u => u.email.toLowerCase() === cleanEmail);
      if (!found) { setErrorMsg('No account with this email.'); return; }
      if (found.password !== password) { setErrorMsg('Incorrect password.'); return; }

      onLogin(found);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative animate-fadeIn">
      <div className="absolute top-5 right-5">
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors btn-press"
        >
          <Icon name={isDark ? "sun" : "moon"} className="w-4 h-4" />
        </button>
      </div>

      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-10 h-10 mx-auto rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center mb-3">
            <Icon name="check" className="w-5 h-5 stroke-[2.5]" />
          </div>
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
            {authMode === 'login' ? 'Sign in' : 'Create an account'}
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            {authMode === 'login' ? 'Continue to your personal workspace' : 'Start organizing your tasks simply'}
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 card-shadow">
          {errorMsg && (
            <div className="mb-4 p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5">
              <Icon name="alert-circle" className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Maya Lin"
                  className="w-full px-3 py-1.5 rounded-lg text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-zinc-400"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 py-1.5 rounded-lg text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-zinc-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-3 pr-8 py-1.5 rounded-lg text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-zinc-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  <Icon name={showPassword ? "eye-off" : "eye"} className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Confirm password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  className="w-full px-3 py-1.5 rounded-lg text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-zinc-400"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-2 py-2 rounded-lg font-medium text-xs bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 transition-colors btn-press"
            >
              {authMode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          {authMode === 'login' && (
            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-center">
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 underline"
              >
                Use demo account: alex@example.com / password123
              </button>
            </div>
          )}

          <div className="mt-4 text-center text-xs text-zinc-500">
            {authMode === 'login' ? (
              <span>Don't have an account? <button onClick={() => switchMode('signup')} className="font-semibold text-zinc-900 dark:text-zinc-100 hover:underline">Sign up</button></span>
            ) : (
              <span>Already have an account? <button onClick={() => switchMode('login')} className="font-semibold text-zinc-900 dark:text-zinc-100 hover:underline">Sign in</button></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// EMPTY STATE
// ==========================================
function EmptyState({ searchQuery, activeTab, onOpenAdd, onSwitchTab }) {
  return (
    <div className="text-center py-10 px-4 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30">
      <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
        {searchQuery ? 'No matching tasks' : activeTab === 'completed' ? 'No completed tasks' : 'All clear'}
      </p>
      <p className="text-[11px] text-zinc-400 mt-0.5">
        {searchQuery ? 'Try a different search word.' : 'Nothing to show in this view.'}
      </p>

      {activeTab === 'completed' && onSwitchTab && (
        <button
          onClick={() => onSwitchTab('all')}
          className="mt-3 inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
        >
          View all tasks
        </button>
      )}
    </div>
  );
}

export default App;
export { ErrorBoundary, Icon };

// Optional direct mount when running in a standalone browser root
if (typeof document !== 'undefined' && document.getElementById('root') && !window.__REACT_ALREADY_MOUNTED__) {
  const el = document.getElementById('root');
  if (el && typeof ReactDOM !== 'undefined') {
    try {
      const root = ReactDOM.createRoot(el);
      root.render(
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      );
      window.__REACT_ALREADY_MOUNTED__ = true;
    } catch (e) {
      // Mounting handled by build entrypoint
    }
  }
}
