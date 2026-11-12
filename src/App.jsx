import React, { useState, useEffect, useMemo, useRef, Component } from 'react';
import confetti from 'canvas-confetti';
import Icon from './components/Icon.jsx';

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
    console.error("AuraTask error caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 text-center">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl max-w-md shadow-2xl glass-card">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center text-rose-500 mb-4">
              <Icon name="alert-circle" className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Display refreshed smoothly</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              {this.state.error?.message || "An interface sync occurred. Click below to continue organizing your tasks."}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold shadow-glow text-sm btn-press"
            >
              Resume Workspace
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ==========================================
// AUDIO SYNTHESIZER
// ==========================================
const playSound = (type = 'complete') => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'complete') {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.18);

      osc2.frequency.setValueAtTime(880, ctx.currentTime + 0.08);
      osc2.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.28);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start(ctx.currentTime + 0.08);
      osc1.stop(ctx.currentTime + 0.35);
      osc2.stop(ctx.currentTime + 0.35);
    } else if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } else if (type === 'timer') {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.3);
      });
    }
  } catch (e) {}
};

const DEFAULT_CATEGORIES = [
  { id: 'all', name: 'All Tags' },
  { id: 'work', name: 'Work', bg: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/60' },
  { id: 'personal', name: 'Personal', bg: 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800/60' },
  { id: 'study', name: 'Study', bg: 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800/60' },
  { id: 'health', name: 'Health', bg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60' },
  { id: 'finance', name: 'Finance', bg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/60' },
];

const PRIORITIES = {
  high: {
    label: 'High',
    badge: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/60',
    dot: 'bg-rose-500'
  },
  medium: {
    label: 'Medium',
    badge: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/60',
    dot: 'bg-amber-500'
  },
  low: {
    label: 'Low',
    badge: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/60',
    dot: 'bg-emerald-500'
  }
};

const DAILY_QUOTES = [
  { text: "Small daily disciplines repeated consistently lead to monumental achievements.", author: "Robin Sharma" },
  { text: "Focus is a muscle. The more you eliminate distractions, the stronger it grows.", author: "James Clear" },
  { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { text: "You don't have to be extreme, just consistent.", author: "Anonymous" }
];

const DEFAULT_DEMO_USER = {
  id: 'demo_user_1',
  name: 'Alex Rivera',
  email: 'alex@auratask.io',
  password: 'password123',
  avatarColor: 'from-brand-600 to-purple-600',
  createdAt: Date.now()
};

const createStarterTasksForUser = (userName) => [
  {
    id: '1',
    title: `Welcome to AuraTask Pro, ${userName}! 👋`,
    description: 'Explore the checklist, Kanban view, and toggle complete / uncomplete freely.',
    category: 'personal',
    priority: 'high',
    status: 'todo',
    dueDate: new Date().toISOString().split('T')[0],
    completed: false,
    starred: true,
    subtasks: [
      { id: 'st_1', title: 'Try switching to the Kanban Board view', done: true },
      { id: 'st_2', title: 'Open the Pomodoro Focus Timer', done: false },
      { id: 'st_3', title: 'Add a new task or custom tag', done: false }
    ],
    createdAt: Date.now() - 3600000 * 2,
  },
  {
    id: '2',
    title: 'Launch redesign mockups to product team',
    description: 'Review typography, responsiveness tokens, and light/dark theme contrast.',
    category: 'work',
    priority: 'high',
    status: 'in_progress',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    completed: false,
    starred: true,
    subtasks: [
      { id: 'st_4', title: 'Prepare Figma prototype link', done: true },
      { id: 'st_5', title: 'Compile feedback summary', done: false }
    ],
    createdAt: Date.now() - 3600000 * 6,
  },
  {
    id: '3',
    title: '30-minute afternoon stretch & hydration',
    description: 'Step away from screen, hydrate, and stretch.',
    category: 'health',
    priority: 'low',
    status: 'completed',
    dueDate: new Date().toISOString().split('T')[0],
    completed: true,
    starred: false,
    subtasks: [],
    createdAt: Date.now() - 3600000 * 10,
  }
];

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('auratask_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('auratask_sound') !== 'false';
  });

  const [viewMode, setViewMode] = useState('list');

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('auratask_users');
      return saved ? JSON.parse(saved) : [DEFAULT_DEMO_USER];
    } catch (e) {
      return [DEFAULT_DEMO_USER];
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('auratask_active_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [authMode, setAuthMode] = useState('login');
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('auratask_categories');
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

  const quote = useMemo(() => {
    return DAILY_QUOTES[Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % DAILY_QUOTES.length];
  }, []);

  useEffect(() => {
    localStorage.setItem('auratask_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('auratask_sound', soundEnabled ? 'true' : 'false');
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('auratask_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('auratask_active_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('auratask_active_user');
    }
  }, [currentUser]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('auratask_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('auratask_theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    if (currentUser) {
      const key = `auratask_tasks_${currentUser.id}`;
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
      const key = `auratask_tasks_${currentUser.id}`;
      localStorage.setItem(key, JSON.stringify(tasks));
    }
  }, [tasks, currentUser]);

  const triggerConfetti = () => {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 85,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#ec4899', '#10b981']
      });
    }
  };

  const toggleComplete = (id) => {
    const targetTask = tasks.find(t => t.id === id);
    const nextCompletedState = targetTask ? !targetTask.completed : false;

    if (soundEnabled) {
      playSound(nextCompletedState ? 'complete' : 'click');
    }

    setTasks(prev => {
      return prev.map(t => {
        if (t.id === id) {
          if (nextCompletedState) {
            const remaining = prev.filter(item => item.id !== id && !item.completed).length;
            if (remaining === 0) triggerConfetti();
          }
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
        const isCompleted = newStatus === 'completed';
        if (isCompleted && !t.completed) {
          const remaining = prev.filter(item => item.id !== id && !item.completed).length;
          if (remaining === 0) triggerConfetti();
        }
        return {
          ...t,
          status: newStatus,
          completed: isCompleted
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
    if (window.confirm("Are you sure you want to remove all completed tasks?")) {
      setTasks(prev => prev.filter(t => !t.completed));
    }
  };

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const starred = tasks.filter(t => t.starred).length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, pending, starred, percentage };
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
          localStorage.setItem(`auratask_tasks_${u.id}`, JSON.stringify(createStarterTasksForUser(u.name)));
          setCurrentUser(u);
        }}
        isDark={isDark}
        setIsDark={setIsDark}
      />
    );
  }

  return (
    <ErrorBoundary>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fadeIn">
        
        {/* HEADER & BRAND */}
        <header className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-glow">
              <Icon name="sparkles" className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  AuraTask Pro
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300">
                  v2.1
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Focus workspace & aesthetic task manager
              </p>
            </div>
          </div>

          {/* ACTION TOOLBAR */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-2">
            
            <button
              onClick={() => setIsPomodoroOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-all btn-press shadow-sm"
            >
              <Icon name="clock" className="w-3.5 h-3.5" />
              <span>Focus Timer</span>
            </button>

            <div className="flex items-center p-1 bg-slate-200/70 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-surface-darkCard text-brand-600 dark:text-brand-400 shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon name="list" className="w-3.5 h-3.5" />
                <span>List</span>
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                  viewMode === 'kanban'
                    ? 'bg-white dark:bg-surface-darkCard text-brand-600 dark:text-brand-400 shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon name="kanban" className="w-3.5 h-3.5" />
                <span>Board</span>
              </button>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Mute audio effects" : "Enable audio effects"}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors btn-press"
            >
              <Icon name={soundEnabled ? "volume-2" : "volume-x"} className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsDark(!isDark)}
              title={isDark ? "Light Mode" : "Dark Mode"}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors btn-press"
            >
              <Icon name={isDark ? "sun" : "moon"} className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsBackupOpen(true)}
              title="Export or Import tasks"
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors btn-press"
            >
              <Icon name="arrow-down-up" className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-white dark:bg-surface-darkCard border border-slate-200 dark:border-surface-darkBorder shadow-sm hover:border-brand-500/50 transition-all btn-press"
            >
              <div className={`w-6 h-6 rounded-lg bg-gradient-to-tr ${currentUser.avatarColor || 'from-brand-600 to-indigo-600'} flex items-center justify-center text-white font-bold text-[10px] uppercase`}>
                {(currentUser.name || 'U').charAt(0)}
              </div>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[90px] truncate">
                {(currentUser.name || 'User').split(' ')[0]}
              </span>
            </button>

            <button
              onClick={() => setIsAddFormOpen(true)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-medium px-3.5 py-2 rounded-xl shadow-glow transition-all btn-press text-xs"
            >
              <Icon name="plus" className="w-4 h-4 stroke-[2.5]" />
              <span>New Task</span>
            </button>
          </div>
        </header>

        {/* DAILY INSPIRATION */}
        <div className="relative overflow-hidden mb-6 p-4 rounded-2xl bg-gradient-to-r from-brand-900/20 via-purple-900/10 to-indigo-900/20 border border-brand-500/20 dark:border-brand-500/30 glass-card">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-brand-500/20 text-brand-600 dark:text-brand-300">
              <Icon name="quote" className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 italic">
                "{quote.text}"
              </p>
              <p className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 mt-0.5">
                — {quote.author}
              </p>
            </div>
          </div>
        </div>

        {/* STATS OVERVIEW */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-white dark:bg-surface-darkCard border border-slate-200/80 dark:border-surface-darkBorder/80 shadow-sm glass-card">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Tasks</span>
            <div className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stats.total}</div>
          </div>
          
          <div className="p-4 rounded-2xl bg-white dark:bg-surface-darkCard border border-slate-200/80 dark:border-surface-darkBorder/80 shadow-sm glass-card">
            <span className="text-xs font-medium text-amber-500 dark:text-amber-400">In Progress</span>
            <div className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stats.pending}</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-surface-darkCard border border-slate-200/80 dark:border-surface-darkBorder/80 shadow-sm glass-card">
            <span className="text-xs font-medium text-emerald-500 dark:text-emerald-400">Completed</span>
            <div className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stats.completed}</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-surface-darkCard border border-slate-200/80 dark:border-surface-darkBorder/80 shadow-sm glass-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-brand-600 dark:text-brand-400">Completion</span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{stats.percentage}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-brand-500 to-emerald-400 h-2 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${stats.percentage}%` }}
              ></div>
            </div>
          </div>
        </section>

        {/* QUICK INPUT BAR */}
        <div className="mb-6">
          <QuickAddBar onAdd={addTask} categories={categories} />
        </div>

        {/* FILTERS & SEARCH ROW */}
        <div className="space-y-3 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            
            <div className="flex items-center p-1 bg-slate-200/60 dark:bg-slate-900 rounded-xl text-xs sm:text-sm font-medium border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'all'
                    ? 'bg-white dark:bg-surface-darkCard text-brand-600 dark:text-brand-400 shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All ({tasks.length})
              </button>
              <button
                onClick={() => setActiveTab('active')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'active'
                    ? 'bg-white dark:bg-surface-darkCard text-brand-600 dark:text-brand-400 shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Active ({stats.pending})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'completed'
                    ? 'bg-white dark:bg-surface-darkCard text-brand-600 dark:text-brand-400 shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Done ({stats.completed})
              </button>
              <button
                onClick={() => setActiveTab('starred')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'starred'
                    ? 'bg-white dark:bg-surface-darkCard text-amber-500 shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                ★ Starred ({stats.starred})
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-60">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Icon name="search" className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tasks or subtasks..."
                  className="w-full pl-9 pr-8 py-1.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-surface-darkCard border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <Icon name="x" className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-surface-darkCard border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                <option value="date">Newest</option>
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>

          {/* Category Tags Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-medium whitespace-nowrap pl-1">Tags:</span>
            {categories.map(cat => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full font-medium transition-all whitespace-nowrap border ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-sm'
                      : 'bg-white/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
            
            <button
              onClick={() => setIsTagModalOpen(true)}
              className="px-2.5 py-1.5 rounded-full font-medium border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-500 transition-colors flex items-center gap-1"
            >
              <Icon name="plus" className="w-3 h-3" />
              <span>Add Tag</span>
            </button>
          </div>
        </div>

        {/* VIEW RENDERER */}
        {viewMode === 'list' ? (
          <div className="space-y-3">
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

        {/* FOOTER BAR */}
        {tasks.length > 0 && (
          <div className="mt-8 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Showing {filteredTasks.length} of {tasks.length} tasks</span>
            {stats.completed > 0 && (
              <button
                onClick={clearCompleted}
                className="hover:text-rose-500 dark:hover:text-rose-400 transition-colors flex items-center gap-1"
              >
                <Icon name="trash-2" className="w-3.5 h-3.5" />
                Clear completed ({stats.completed})
              </button>
            )}
          </div>
        )}

        {/* MODALS */}
        {isAddFormOpen && (
          <TaskModal
            title="Create New Task"
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
    </ErrorBoundary>
  );
}

// Child Components
function KanbanBoard({ tasks, categories, onMoveTask, onToggleComplete, onEdit, onDelete }) {
  const columns = [
    { id: 'todo', title: 'To Do', icon: 'circle', color: 'text-slate-400' },
    { id: 'in_progress', title: 'In Progress', icon: 'clock', color: 'text-amber-500' },
    { id: 'completed', title: 'Completed', icon: 'check-circle-2', color: 'text-emerald-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {columns.map(col => {
        const colTasks = tasks.filter(t => (t.status || (t.completed ? 'completed' : 'todo')) === col.id);
        return (
          <div
            key={col.id}
            className="bg-slate-100/70 dark:bg-surface-darkCard/50 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 flex flex-col min-h-[420px]"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60 dark:border-slate-800/60">
              <div className="flex items-center gap-2">
                <div className={col.color}>
                  <Icon name={col.icon} className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">{col.title}</h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {colTasks.length}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
              {colTasks.length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-400">
                  No tasks in this lane
                </div>
              ) : (
                colTasks.map(task => {
                  const priorityObj = PRIORITIES[task.priority] || PRIORITIES.medium;
                  const catObj = (categories && categories.find(c => c.id === task.category)) || categories[1] || { name: 'General' };
                  const totalSub = (task.subtasks || []).length;
                  const doneSub = (task.subtasks || []).filter(s => s.done).length;

                  return (
                    <div
                      key={task.id}
                      className="bg-white dark:bg-surface-darkCard border border-slate-200 dark:border-slate-800 p-3.5 rounded-xl shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 leading-snug">
                          {task.title}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-medium border flex-shrink-0 ${priorityObj.badge}`}>
                          {priorityObj.label}
                        </span>
                      </div>

                      {task.description && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                          {task.description}
                        </p>
                      )}

                      {totalSub > 0 && (
                        <div className="mt-2.5 text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                          <span>Checklist: {doneSub}/{totalSub}</span>
                          <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-brand-500 h-full rounded-full"
                              style={{ width: `${(doneSub / totalSub) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px]">
                        <span className="text-slate-400">{catObj ? catObj.name : ''}</span>
                        
                        <div className="flex items-center gap-1">
                          {col.id !== 'todo' && (
                            <button
                              onClick={() => onMoveTask(task.id, 'todo')}
                              title="Move to To Do"
                              className="px-1.5 py-0.5 rounded text-[10px] font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800"
                            >
                              To Do
                            </button>
                          )}
                          {col.id !== 'in_progress' && (
                            <button
                              onClick={() => onMoveTask(task.id, 'in_progress')}
                              title="Move to In Progress"
                              className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400"
                            >
                              In Progress
                            </button>
                          )}
                          {col.id !== 'completed' && (
                            <button
                              onClick={() => onMoveTask(task.id, 'completed')}
                              title="Move to Completed"
                              className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                            >
                              Done ✓
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

function TaskCard({ task, categories, onToggle, onStar, onEdit, onDelete, onToggleSubtask, onStartFocus }) {
  const [isSubtasksExpanded, setIsSubtasksExpanded] = useState(false);
  const categoryObj = (categories && categories.find(c => c.id === task.category)) || categories[1] || { name: 'Task', bg: 'bg-indigo-50 text-indigo-600 border-indigo-200' };
  const priorityObj = PRIORITIES[task.priority] || PRIORITIES.medium;
  
  const subtasks = task.subtasks || [];
  const completedSubtasks = subtasks.filter(s => s.done).length;

  const dueDateInfo = useMemo(() => {
    if (!task.dueDate) return null;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const [year, month, day] = task.dueDate.split('-');
    const target = new Date(year, month - 1, day);
    const diffTime = target - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { label: `Overdue (${Math.abs(diffDays)}d)`, alert: true };
    if (diffDays === 0) return { label: 'Due Today', alert: true, today: true };
    if (diffDays === 1) return { label: 'Due Tomorrow', alert: false };
    return { label: target.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), alert: false };
  }, [task.dueDate]);

  return (
    <div
      className={`group relative bg-white dark:bg-surface-darkCard border rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:shadow-card dark:hover:shadow-card-dark ${
        task.completed
          ? 'border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/30'
          : 'border-slate-200/90 dark:border-surface-darkBorder/90'
      }`}
    >
      <div className="flex items-start gap-3.5">
        <button
          onClick={() => onToggle(task.id)}
          className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
            task.completed
              ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
              : 'border-slate-300 dark:border-slate-700 hover:border-brand-500 bg-white dark:bg-slate-800'
          }`}
        >
          {task.completed ? (
            <Icon name="check" className="w-4 h-4 stroke-[3]" />
          ) : null}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3
              onClick={() => onToggle(task.id)}
              className={`text-base font-semibold cursor-pointer select-none transition-all break-words ${
                task.completed
                  ? 'text-slate-400 dark:text-slate-500 line-through'
                  : 'text-slate-800 dark:text-slate-100 hover:text-brand-600 dark:hover:text-brand-400'
              }`}
            >
              {task.title}
            </h3>
          </div>

          {task.description && (
            <p className={`text-xs sm:text-sm mt-1 break-words ${
              task.completed ? 'text-slate-400 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400'
            }`}>
              {task.description}
            </p>
          )}

          {subtasks.length > 0 && (
            <div className="mt-3">
              <button
                onClick={() => setIsSubtasksExpanded(!isSubtasksExpanded)}
                className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                <Icon name={isSubtasksExpanded ? "chevron-down" : "chevron-right"} className="w-3.5 h-3.5" />
                <span>Checklist: {completedSubtasks} of {subtasks.length} done</span>
                <div className="w-20 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden ml-1">
                  <div 
                    className="bg-brand-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${(completedSubtasks / subtasks.length) * 100}%` }}
                  ></div>
                </div>
              </button>

              {isSubtasksExpanded && (
                <div className="mt-2.5 space-y-1.5 pl-3 border-l-2 border-slate-200 dark:border-slate-800">
                  {subtasks.map(st => (
                    <div key={st.id} className="flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={st.done}
                        onChange={() => onToggleSubtask(task.id, st.id)}
                        className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 w-3.5 h-3.5 cursor-pointer"
                      />
                      <span className={`${st.done ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-300'}`}>
                        {st.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
            <span className={`px-2.5 py-0.5 rounded-md font-medium border ${categoryObj ? categoryObj.bg : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
              {categoryObj ? categoryObj.name : 'Task'}
            </span>

            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md font-medium border ${priorityObj.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${priorityObj.dot}`}></span>
              {priorityObj.label}
            </span>

            {dueDateInfo && (
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-medium border ${
                task.completed
                  ? 'border-slate-200 dark:border-slate-800 text-slate-400'
                  : dueDateInfo.alert
                  ? dueDateInfo.today
                    ? 'border-amber-300 dark:border-amber-800/80 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400'
                    : 'border-rose-300 dark:border-rose-800/80 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400'
                  : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'
              }`}>
                <Icon name="calendar" className="w-3 h-3" />
                {dueDateInfo.label}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onStartFocus(task)}
            title="Focus on this task with Pomodoro"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            <Icon name="timer" className="w-4 h-4" />
          </button>

          <button
            onClick={() => onStar(task.id)}
            title={task.starred ? "Unstar" : "Star"}
            className={`p-1.5 rounded-lg transition-colors ${
              task.starred
                ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Icon name="star" className={`w-4 h-4 ${task.starred ? 'fill-amber-500' : ''}`} />
          </button>

          <button
            onClick={() => onEdit(task)}
            title="Edit task"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Icon name="edit-3" className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDelete(task.id)}
            title="Delete task"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            <Icon name="trash-2" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

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
      className="bg-white dark:bg-surface-darkCard border border-slate-200/90 dark:border-surface-darkBorder/90 rounded-2xl p-2.5 sm:p-3 shadow-card dark:shadow-card-dark transition-all focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500"
    >
      <div className="flex items-center gap-2">
        <div className="p-2 text-brand-500">
          <Icon name="plus-circle" className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={title}
          onFocus={() => setIsExpanded(true)}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task... (press Enter to create)"
          className="w-full bg-transparent text-sm sm:text-base text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!title.trim()}
          className="px-4 py-2 rounded-xl text-sm font-semibold bg-brand-600 hover:bg-brand-500 disabled:opacity-40 disabled:hover:bg-brand-600 text-white transition-all btn-press whitespace-nowrap"
        >
          Add
        </button>
      </div>

      {isExpanded && (
        <div className="flex flex-wrap items-center gap-3 pt-3 mt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Tag:</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              {(categories || []).filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Priority:</span>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="low">Low 🟢</option>
              <option value="medium">Medium 🟡</option>
              <option value="high">High 🔴</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Due:</span>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-slate-700 dark:text-slate-300 focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="ml-auto text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-medium"
          >
            Collapse
          </button>
        </div>
      )}
    </form>
  );
}

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-surface-darkCard border border-slate-200 dark:border-surface-darkBorder rounded-3xl w-full max-w-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Icon name="x" className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Task Title *
            </label>
            <input
              type="text"
              required
              autoFocus
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="e.g. Prepare presentation slides"
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Description (Optional)
            </label>
            <textarea
              rows="2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add notes, bullet points, or instructions..."
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/40 resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Checklist & Subtasks ({subtasks.length})
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSubtaskInput}
                onChange={(e) => setNewSubtaskInput(e.target.value)}
                placeholder="Add a subtask item..."
                className="flex-1 px-3 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-brand-600 hover:text-white transition-colors"
              >
                Add Subtask
              </button>
            </div>

            {subtasks.length > 0 && (
              <div className="space-y-1.5 max-h-32 overflow-y-auto p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                {subtasks.map(st => (
                  <div key={st.id} className="flex items-center justify-between gap-2 text-xs">
                    <span className="text-slate-700 dark:text-slate-300 truncate">{st.title}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSubtask(st.id)}
                      className="text-slate-400 hover:text-rose-500"
                    >
                      <Icon name="x" className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Category Tag
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                {(categories || []).filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!taskTitle.trim()}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-brand-600 hover:bg-brand-500 disabled:opacity-40 text-white shadow-glow transition-all btn-press"
            >
              {initialData ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AuthScreen({ authMode, setAuthMode, registeredUsers, onLogin, onSignUp, isDark, setIsDark }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const switchMode = (mode) => {
    setErrorMsg('');
    setSuccessMsg('');
    setAuthMode(mode);
  };

  const handleFillDemo = () => {
    setEmail('alex@auratask.io');
    setPassword('password123');
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    const cleanEmail = email.trim().toLowerCase();

    if (authMode === 'signup') {
      if (!name.trim()) { setErrorMsg('Please enter your full name.'); return; }
      if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) { setErrorMsg('Please enter a valid email address.'); return; }
      if (password.length < 6) { setErrorMsg('Password must be at least 6 characters long.'); return; }
      if (password !== confirmPassword) { setErrorMsg('Passwords do not match.'); return; }

      const existing = registeredUsers.find(u => u.email.toLowerCase() === cleanEmail);
      if (existing) { setErrorMsg('An account with this email already exists.'); return; }

      const gradients = ['from-brand-600 to-purple-600', 'from-rose-500 to-amber-500', 'from-cyan-500 to-blue-600', 'from-emerald-500 to-teal-600'];
      const chosen = gradients[Math.floor(Math.random() * gradients.length)];

      const newUser = {
        id: 'user_' + Date.now(),
        name: name.trim(),
        email: cleanEmail,
        password: password,
        avatarColor: chosen,
        createdAt: Date.now()
      };

      setSuccessMsg('Account created! Welcome to AuraTask Pro...');
      setTimeout(() => onSignUp(newUser), 400);
    } else {
      if (!cleanEmail || !password) { setErrorMsg('Please enter email and password.'); return; }

      const found = registeredUsers.find(u => u.email.toLowerCase() === cleanEmail);
      if (!found) { setErrorMsg('No account found with this email.'); return; }
      if (found.password !== password) { setErrorMsg('Incorrect password.'); return; }

      setSuccessMsg(`Welcome back, ${found.name}!`);
      setTimeout(() => onLogin(found), 300);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative animate-fadeIn">
      <div className="absolute top-6 right-6">
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-colors btn-press shadow-sm"
        >
          <Icon name={isDark ? "sun" : "moon"} className="w-4 h-4" />
        </button>
      </div>

      <div className="text-center mb-8">
        <div className="w-14 h-14 mx-auto rounded-3xl bg-gradient-to-tr from-brand-600 to-purple-500 flex items-center justify-center text-white shadow-glow mb-3">
          <Icon name="sparkles" className="w-8 h-8 stroke-[2.2]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          AuraTask Pro
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {authMode === 'login' ? 'Sign in to access your personal task workspace' : 'Create an account to start organizing your life'}
        </p>
      </div>

      <div className="w-full max-w-md bg-white dark:bg-surface-darkCard border border-slate-200/90 dark:border-surface-darkBorder/90 rounded-3xl p-6 sm:p-8 shadow-card dark:shadow-card-dark glass-card">
        <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl mb-6 text-sm font-semibold">
          <button
            type="button"
            onClick={() => switchMode('login')}
            className={`py-2 rounded-xl transition-all ${authMode === 'login' ? 'bg-white dark:bg-surface-darkCard text-brand-600 dark:text-brand-400 shadow-sm' : 'text-slate-500'}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => switchMode('signup')}
            className={`py-2 rounded-xl transition-all ${authMode === 'signup' ? 'bg-white dark:bg-surface-darkCard text-brand-600 dark:text-brand-400 shadow-sm' : 'text-slate-500'}`}
          >
            Sign Up
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs font-medium text-rose-600 dark:text-rose-400 flex items-center gap-2">
            <Icon name="alert-circle" className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <Icon name="check" className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Icon name="user" className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya Lin"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Icon name="mail" className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">Password</label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Icon name="lock" className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={authMode === 'signup' ? "Minimum 6 characters" : "••••••••"}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <Icon name={showPassword ? "eye-off" : "eye"} className="w-4 h-4" />
              </button>
            </div>
          </div>

          {authMode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">Confirm Password</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Icon name="shield-check" className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-glow transition-all btn-press flex items-center justify-center gap-2"
          >
            <span>{authMode === 'login' ? 'Sign In to AuraTask' : 'Create My Account'}</span>
            <Icon name="arrow-right" className="w-4 h-4" />
          </button>
        </form>

        {authMode === 'login' && (
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center">
            <button
              type="button"
              onClick={handleFillDemo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-300 hover:bg-brand-100 dark:hover:bg-brand-900/60 transition-colors"
            >
              <Icon name="sparkles" className="w-3.5 h-3.5" />
              Auto-fill Demo: alex@auratask.io / password123
            </button>
          </div>
        )}

        <div className="mt-6 text-center text-xs text-slate-400">
          {authMode === 'login' ? (
            <span>Don't have an account? <button onClick={() => switchMode('signup')} className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">Sign up</button></span>
          ) : (
            <span>Already registered? <button onClick={() => switchMode('login')} className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">Sign in</button></span>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ searchQuery, activeTab, onOpenAdd, onSwitchTab }) {
  return (
    <div className="text-center py-12 px-4 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/40 dark:bg-slate-900/20 backdrop-blur-sm animate-fadeIn">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-4">
        <Icon name="inbox" className="w-7 h-7" />
      </div>
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
        {searchQuery
          ? 'No matching tasks found'
          : activeTab === 'completed'
          ? 'No completed tasks right now'
          : activeTab === 'active'
          ? 'All active tasks are completed!'
          : 'No tasks in this view'}
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
        {searchQuery
          ? `We couldn't find any tasks matching "${searchQuery}".`
          : activeTab === 'completed'
          ? 'If you just uncompleted a task, it moved back to your Active tasks!'
          : activeTab === 'active'
          ? 'You have cleared all active tasks. Great job!'
          : 'Your workspace is all clear! Add a new task to organize your day.'}
      </p>

      <div className="flex items-center justify-center gap-2 mt-4">
        {activeTab === 'completed' && onSwitchTab && (
          <button
            onClick={() => onSwitchTab('all')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-300 border border-brand-200 dark:border-brand-800/60 hover:bg-brand-100 transition-colors"
          >
            <span>View All Tasks</span>
          </button>
        )}

        {!searchQuery && (
          <button
            onClick={onOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-600 text-white hover:bg-brand-500 shadow-glow transition-all btn-press"
          >
            <Icon name="plus" className="w-4 h-4" />
            <span>Create a Task</span>
          </button>
        )}
      </div>
    </div>
  );
}
