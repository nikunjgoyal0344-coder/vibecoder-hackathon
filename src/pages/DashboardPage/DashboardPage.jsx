import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  GraduationCap,
  Target,
  BookOpen,
  Flame,
  ChevronsLeft,
  ChevronsRight,
  Menu,
  X,
  LogOut,
  Settings,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Send,
  Loader2,
  Trophy,
  Award,
  Star,
  Clock,
  Rocket,
  Zap,
  ArrowRight,
  ListChecks,
  Gamepad2,
  Code2,
  Timer as TimerIcon,
  Link2,
  ExternalLink,
  Play,
  Pause,
  RotateCcw,
  Brain,
  XCircle,
  GitFork,
  Users2,
  RefreshCw,
  Coffee,
  Layers,
  Puzzle,
  Bug,
  Activity,
  Keyboard,
  Upload,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const Github = ({ size = 16, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Linkedin = ({ size = 16, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ============================================================================
// SHARED MOCK DATA
// ============================================================================
const ABTALKS_LOGO = "data:image/webp;base64,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";

const SUBJECTS = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'];

const initialMarks = [
  { subject: 'Day 1', test: 'Assignment 1', score: 42, max: 50 },
  { subject: 'Day 2', test: 'Assignment 2', score: 33, max: 50 },
  { subject: 'Day 3', test: 'Assignment 3', score: 45, max: 50 },
  { subject: 'Day 4', test: 'Assignment 4', score: 38, max: 50 },
  { subject: 'Day 5', test: 'Assignment 5', score: 40, max: 50 },
  { subject: 'Day 6', test: 'Assignment 6', score: 44, max: 50 },
];

const initialChallenges = [];

const initialLogs = [
  { id: 1, date: 'Aug 07', subject: 'Day 2', hours: 1.5, note: 'Linked lists practice' },
  { id: 2, date: 'Aug 07', subject: 'Day 3', hours: 1, note: 'Pipelining basics' },
  { id: 3, date: 'Aug 06', subject: 'Day 5', hours: 2, note: 'POSETs tutorial' },
  { id: 4, date: 'Aug 05', subject: 'Day 1', hours: 1, note: 'K-maps revision' },
];

const weeklyStudyTrend = [
  { day: 'Mon', hours: 3 },
  { day: 'Tue', hours: 4 },
  { day: 'Wed', hours: 2.5 },
  { day: 'Thu', hours: 4.5 },
  { day: 'Fri', hours: 3 },
  { day: 'Sat', hours: 5 },
  { day: 'Sun', hours: 2 },
];

const initialAssignments = [
  { id: 1, week: 1, title: 'Reverse a Linked List', topic: 'Data Structures', difficulty: 'Easy', done: true },
  { id: 2, week: 1, title: 'Two Sum', topic: 'Arrays', difficulty: 'Easy', done: true },
  { id: 3, week: 1, title: 'Binary Search Implementation', topic: 'Algorithms', difficulty: 'Easy', done: false },
  { id: 4, week: 2, title: 'Detect Cycle in a Linked List', topic: 'Data Structures', difficulty: 'Medium', done: false },
  { id: 5, week: 2, title: 'Valid Parentheses', topic: 'Stacks', difficulty: 'Easy', done: false },
  { id: 6, week: 2, title: 'K-Map Minimization Set', topic: 'Digital Electronics', difficulty: 'Medium', done: false },
  { id: 7, week: 3, title: 'Pipeline Hazards Case Study', topic: 'COA', difficulty: 'Hard', done: false },
  { id: 8, week: 3, title: 'POSET Hasse Diagrams', topic: 'DSTL', difficulty: 'Medium', done: false },
];

const nav = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'marks', label: 'Weekly Assignments', icon: GraduationCap },
  { id: 'challenges', label: 'Challenges', icon: Target },
  { id: 'study', label: 'Study Log', icon: BookOpen },
  { id: 'assignments', label: 'Coding Assignments', icon: ListChecks },
  { id: 'games', label: 'Mind Games', icon: Gamepad2 },
  { id: 'coding', label: 'Code Practice', icon: Code2 },
  { id: 'pomodoro', label: 'Pomodoro', icon: TimerIcon },
  { id: 'integrations', label: 'Integrations', icon: Link2 },
  { id: 'ai', label: 'AI Assistant', icon: Sparkles },
  { id: 'settings', label: 'Settings', icon: Settings },
];

// ============================================================================
// SIDEBAR
// ============================================================================
function Sidebar({ page, onNavigate, streak, collapsed, onToggleCollapse, mobileOpen, onCloseMobile, onLogOut }) {
  const itemRefs = useRef([]);

  const focusItem = useCallback((index) => {
    const el = itemRefs.current[index];
    if (el) el.focus();
  }, []);

  const handleKeyDown = (e, index) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        focusItem((index + 1) % nav.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        focusItem((index - 1 + nav.length) % nav.length);
        break;
      case 'Home':
        e.preventDefault();
        focusItem(0);
        break;
      case 'End':
        e.preventDefault();
        focusItem(nav.length - 1);
        break;
      case 'Escape':
        onCloseMobile?.();
        break;
      default:
        break;
    }
  };

  const widthClass = collapsed ? 'w-[72px]' : 'w-64';

  const content = (
    <aside
      className={`${widthClass} h-full bg-black border-r border-zinc-800 flex flex-col shrink-0 transition-[width] duration-200 relative`}
      aria-label="Primary"
    >
      <div className={`flex items-center gap-3 px-4 py-5 ${collapsed ? 'justify-center px-2' : ''}`}>
        {collapsed ? (
          <div className="w-9 h-9 rounded-lg bg-black border border-zinc-800 flex items-center justify-center shrink-0 overflow-hidden">
            <img src={ABTALKS_LOGO} alt="ABtalks" className="w-7 object-contain" />
          </div>
        ) : (
          <div className="min-w-0">
            <img src={ABTALKS_LOGO} alt="ABtalks" className="h-6 w-auto object-contain mb-1" />
            <p className="text-[11px] text-zinc-500 truncate">Track. Learn. Grow.</p>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onCloseMobile}
        className="md:hidden absolute top-4 right-4 p-1.5 rounded-md text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
        aria-label="Close menu"
      >
        <X size={18} />
      </button>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto" aria-label="Sections">
        {nav.map(({ id, label, icon: Icon, badge }, index) => {
          const active = page === id;
          return (
            <button
              key={id}
              ref={(el) => (itemRefs.current[index] = el)}
              type="button"
              title={collapsed ? label : undefined}
              aria-current={active ? 'page' : undefined}
              onClick={() => {
                onNavigate(id);
                onCloseMobile?.();
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                collapsed ? 'justify-center px-0' : ''
              } ${
                active
                  ? 'bg-purple-500/10 text-purple-300'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-purple-500" />
              )}
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
              {!collapsed && badge != null && (
                <span className="ml-auto text-[11px] font-semibold bg-purple-500 text-white rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                  {badge}
                </span>
              )}
              {collapsed && badge != null && (
                <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-purple-500" />
              )}
            </button>
          );
        })}
      </nav>

      <div className={`px-3 ${collapsed ? 'px-2' : ''}`}>
        <div
          className={`flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-3 ${
            collapsed ? 'justify-center px-2' : ''
          }`}
          title={collapsed ? `${streak} day streak` : undefined}
        >
          <Flame size={18} className="text-orange-400 shrink-0" />
          {!collapsed && (
            <div className="min-w-0">
              <strong className="block text-sm text-white">{streak} day streak</strong>
              <span className="text-xs text-zinc-500">Keep it going!</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-3 mt-2 border-t border-zinc-800 space-y-1">
        <button
          type="button"
          title={collapsed ? 'Settings' : undefined}
          onClick={() => {
            onNavigate('settings');
            onCloseMobile?.();
          }}
          aria-current={page === 'settings' ? 'page' : undefined}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
            page === 'settings' ? 'text-purple-300 bg-purple-500/10' : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300'
          } ${collapsed ? 'justify-center px-0' : ''}`}
        >
          <Settings size={16} className="shrink-0" />
          {!collapsed && 'Settings'}
        </button>
        <button
          type="button"
          title={collapsed ? 'Log out' : undefined}
          onClick={onLogOut}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300 ${
            collapsed ? 'justify-center px-0' : ''
          }`}
        >
          <LogOut size={16} className="shrink-0" />
          {!collapsed && 'Log out'}
        </button>

        <button
          type="button"
          onClick={onToggleCollapse}
          aria-expanded={!collapsed}
          className="hidden md:flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-600 hover:bg-zinc-900 hover:text-zinc-300 justify-center"
        >
          {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
          {!collapsed && 'Collapse'}
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden md:block h-full relative">{content}</div>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <button
            type="button"
            aria-label="Close menu backdrop"
            onClick={onCloseMobile}
            className="absolute inset-0 bg-black/60"
          />
          <div role="dialog" aria-modal="true" className="relative z-50 h-full">
            {content}
          </div>
        </div>
      )}
    </>
  );
}

// ============================================================================
// SMALL BUILDING BLOCKS
// ============================================================================
function Card({ label, value, sub, icon: Icon, trend }) {
  return (
    <div className="bg-zinc-900/60 rounded-xl border border-zinc-800 p-4 transition-all duration-200 hover:border-purple-500/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-zinc-500">{label}</span>
        {Icon && <Icon size={16} className="text-zinc-600" />}
      </div>
      <div className="text-2xl font-semibold text-white">{value}</div>
      {sub && (
        <div className={`flex items-center gap-1 text-xs mt-1 ${trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-zinc-500'}`}>
          {trend === 'up' && <TrendingUp size={12} />}
          {trend === 'down' && <TrendingDown size={12} />}
          {sub}
        </div>
      )}
    </div>
  );
}

function RadialProgress({ value, size = 80, strokeWidth = 8 }) {
  const clamped = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0 -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} fill="none" className="stroke-zinc-800" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        fill="none"
        stroke="#a855f7"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-[stroke-dashoffset] duration-700 ease-out"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="0.35em"
        className="fill-white font-semibold rotate-90"
        style={{ fontSize: 15, transformOrigin: 'center' }}
      >
        {clamped}%
      </text>
    </svg>
  );
}

// Larger ring used by the Pomodoro timer — shows a digital clock label instead of a percentage.
function TimerRing({ pct, label, size = 220, strokeWidth = 14, accent = '#a855f7' }) {
  const clamped = Math.min(100, Math.max(0, pct));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0 -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} fill="none" className="stroke-zinc-800" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        fill="none"
        stroke={accent}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-[stroke-dashoffset] duration-500 ease-linear"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="0.35em"
        className="fill-white font-semibold rotate-90 tabular-nums"
        style={{ fontSize: size * 0.16, transformOrigin: 'center' }}
      >
        {label}
      </text>
    </svg>
  );
}

function PageHeader({ title, sub, badge }) {
  return (
    <div className="mb-6">
      {badge && (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1 mb-3">
          {badge}
        </span>
      )}
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {sub && <p className="text-sm text-zinc-500 mt-1">{sub}</p>}
    </div>
  );
}

// A small reusable pill-tab switcher, used by every new section below.
function PillTabs({ tabs, active, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 bg-zinc-900/60 border border-zinc-800 rounded-full p-1 w-fit mb-5">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors duration-150 ${
            active === t.id ? 'bg-purple-500/20 text-purple-300' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          {t.icon && <t.icon size={13} />}
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ============================================================================
// PAGE: DASHBOARD
// ============================================================================
const PREVIEW_MODES = [
  { id: 'live', label: 'Active' },
  { id: 'missed', label: 'Missed a day' },
  { id: 'empty', label: 'New / empty profile' },
];

function DashboardPage({ challenges, setChallenges, logs, streak, bestStreak, onNavigate }) {
  const [preview, setPreview] = useState('live');

  const view =
    preview === 'empty'
      ? { streak: 0, bestStreak: 0, challenges: [], logs: [], trend: weeklyStudyTrend.map((d) => ({ ...d, hours: 0 })) }
      : preview === 'missed'
      ? { streak: 0, bestStreak: Math.max(bestStreak, 1), challenges, logs, trend: weeklyStudyTrend }
      : { streak, bestStreak, challenges, logs, trend: weeklyStudyTrend };

  const noStreakYet = view.streak === 0 && view.bestStreak === 0;
  const missedStreak = view.streak === 0 && view.bestStreak > 0;
  const isEmptyProfile = view.challenges.length === 0 && view.logs.length === 0 && noStreakYet;

  const activeChallengesList = view.challenges.filter((c) => !c.done);
  const doneChallenges = view.challenges.length - activeChallengesList.length;
  const challengeCompletionPct = view.challenges.length
    ? Math.round((doneChallenges / view.challenges.length) * 100)
    : null;

  const activeDaysThisWeek = view.trend.filter((d) => d.hours > 0).length;
  const consistencyPct = Math.round((activeDaysThisWeek / 7) * 100);
  const streakPct = Math.min(100, Math.round((view.streak / 7) * 100));

  const completionParts = [challengeCompletionPct, consistencyPct, streakPct].filter(
    (p) => p !== null && !(p === 0 && isEmptyProfile)
  );
  const overallCompletion = completionParts.length
    ? Math.round(completionParts.reduce((a, b) => a + b, 0) / completionParts.length)
    : 0;

  const featuredChallenge =
    [...activeChallengesList].sort((a, b) => b.progress / b.target - a.progress / a.target)[0] || null;

  const smallestOpenChallenge =
    [...activeChallengesList].sort((a, b) => a.target - a.progress - (b.target - b.progress))[0] || null;

  const todayTask = missedStreak
    ? smallestOpenChallenge
    : activeChallengesList.find((c) => c.target === 1) || featuredChallenge;

  const toggleTodayTask = (id) => {
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, done: !c.done, progress: !c.done ? c.target : c.progress } : c
      )
    );
  };

  const achievements = [
    { label: `${view.streak}-day streak`, achieved: view.streak >= 5, icon: Flame },
    { label: 'Weekly consistency', achieved: consistencyPct >= 70, icon: CalendarCheck },
    { label: 'Challenge momentum', achieved: challengeCompletionPct !== null && challengeCompletionPct >= 50, icon: GraduationCap },
    { label: 'Goal crusher', achieved: doneChallenges >= 2, icon: Trophy },
  ];

  const standing = isEmptyProfile
    ? { label: 'Just Getting Started', tone: 'text-zinc-400 bg-zinc-800/60 border-zinc-700', icon: Rocket }
    : overallCompletion >= 85
    ? { label: 'Top Performer', tone: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: Trophy }
    : overallCompletion >= 70
    ? { label: 'On Track', tone: 'text-purple-300 bg-purple-500/10 border-purple-500/20', icon: Star }
    : { label: 'Needs Attention', tone: 'text-amber-400 bg-amber-500/10 border-amber-500/20', icon: Award };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-1.5 bg-zinc-900/60 border border-zinc-800 rounded-full p-1 w-fit">
        {PREVIEW_MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setPreview(m.id)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors duration-150 ${
              preview === m.id ? 'bg-purple-500/20 text-purple-300' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-br from-purple-500/10 via-zinc-900 to-zinc-900 border border-purple-500/20 rounded-2xl p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-purple-500/10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            {missedStreak ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-300 bg-black/40 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
                <Zap size={12} className="text-amber-400" /> Streak reset — best was {view.bestStreak} days
              </span>
            ) : noStreakYet ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-300 bg-black/40 border border-purple-500/20 rounded-full px-3 py-1 mb-4">
                <Rocket size={12} className="text-purple-300" /> Day 1 — no streak yet
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-300 bg-black/40 border border-purple-500/20 rounded-full px-3 py-1 mb-4">
                <Flame size={12} className="text-orange-400 animate-pulse" /> {view.streak}-day study streak
              </span>
            )}

            <h2 className="text-2xl font-semibold text-white mb-1">
              {missedStreak
                ? "Yesterday slipped — today's a fresh start."
                : noStreakYet
                ? 'Welcome! Your first streak starts today.'
                : 'Keep building. Keep showing up.'}
            </h2>
            <p className="text-sm text-zinc-400 max-w-md mb-4">
              {missedStreak
                ? `One missed day doesn't erase ${view.bestStreak} days of work. Do one small thing today and the streak starts climbing again.`
                : isEmptyProfile
                ? "Add a challenge or log a study session to get your dashboard moving."
                : "Log today's study session and chip away at your active challenges."}
            </p>
            {!isEmptyProfile && (
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <CheckCircle2 size={14} /> {doneChallenges} challenge{doneChallenges !== 1 ? 's' : ''} completed
              </div>
            )}
          </div>
          <span className={`inline-flex items-center gap-1.5 text-sm font-medium border rounded-full px-4 py-2 shrink-0 transition-transform duration-200 hover:scale-105 ${standing.tone}`}>
            <standing.icon size={16} /> {standing.label}
          </span>
        </div>
      </div>

      {isEmptyProfile ? (
        <div className="bg-zinc-900/60 rounded-xl border border-dashed border-zinc-700 p-6">
          <h3 className="text-sm font-medium text-zinc-300 mb-1 flex items-center gap-2">
            <ListChecks size={14} className="text-purple-400" /> Get your dashboard started
          </h3>
          <p className="text-xs text-zinc-500 mb-4">
            Streak, challenge progress, and completion all fill in automatically once you've done these.
          </p>
          <div className="space-y-2">
            {[
              { label: 'Set your first challenge', page: 'challenges' },
              { label: 'Log a study session', page: 'study' },
              { label: 'Come back tomorrow to start your streak', page: null },
            ].map((step, i) => (
              <div
                key={step.label}
                className="flex items-center justify-between gap-3 bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-5 h-5 shrink-0 rounded-full border border-zinc-700 text-[11px] text-zinc-500 flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-sm text-zinc-300 truncate">{step.label}</span>
                </div>
                {step.page && (
                  <button
                    type="button"
                    onClick={() => onNavigate && onNavigate(step.page)}
                    className="text-xs font-medium text-purple-300 hover:text-purple-200 flex items-center gap-1 shrink-0 transition-colors"
                  >
                    Go <ArrowRight size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="lg:col-span-2 bg-zinc-900/60 rounded-xl border border-zinc-800 p-4 transition-all duration-200 hover:border-purple-500/40">
              <h3 className="text-sm font-medium text-zinc-300 mb-3 flex items-center gap-2">
                <Clock size={14} className="text-purple-400" /> Today's task
                {missedStreak && todayTask && (
                  <span className="text-[10px] font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-full px-2.5 py-0.5 ml-1">
                    Quick win to restart
                  </span>
                )}
              </h3>
              {todayTask ? (
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => toggleTodayTask(todayTask.id)}
                    aria-label={todayTask.done ? 'Mark incomplete' : 'Mark complete'}
                    className="mt-0.5 shrink-0 transition-transform duration-150 hover:scale-110 active:scale-90"
                  >
                    {todayTask.done ? (
                      <CheckCircle2 size={22} className="text-emerald-400" />
                    ) : (
                      <Circle size={22} className="text-zinc-700 hover:text-purple-400 transition-colors" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-base font-medium transition-colors duration-200 ${todayTask.done ? 'text-zinc-600 line-through' : 'text-white'}`}>
                      {todayTask.title}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {todayTask.done
                        ? 'Nice work — task complete for today.'
                        : `${todayTask.progress}/${todayTask.target} · tap the circle when you're done`}
                    </p>
                    {!todayTask.done && (
                      <div className="mt-2.5 h-1.5 bg-zinc-800 rounded-full overflow-hidden max-w-xs">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${Math.min(100, Math.round((todayTask.progress / todayTask.target) * 100))}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-zinc-500 py-1">
                  <CheckCircle2 size={16} className="text-emerald-400" /> All caught up — no open tasks today.
                </div>
              )}
            </div>

            <div className="bg-zinc-900/60 rounded-xl border border-zinc-800 p-4 flex items-center gap-4 transition-all duration-200 hover:border-purple-500/40">
              <RadialProgress value={overallCompletion} />
              <div className="min-w-0">
                <h3 className="text-sm font-medium text-zinc-300 mb-1">Overall completion</h3>
                <p className="text-xs text-zinc-500">Streak, consistency &amp; challenges combined</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="lg:col-span-2 bg-zinc-900/60 rounded-xl border border-zinc-800 p-4 transition-all duration-200 hover:border-purple-500/40">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                  <Target size={14} className="text-purple-400" /> Challenge progress
                </h3>
                <span className="text-xs text-zinc-500 shrink-0">
                  {view.challenges.length ? `${doneChallenges}/${view.challenges.length} complete` : 'No challenges yet'}
                </span>
              </div>
              {featuredChallenge ? (
                <div>
                  <div className="flex items-center justify-between mb-1.5 gap-3">
                    <p className="text-sm font-medium text-zinc-200 truncate">{featuredChallenge.title}</p>
                    <span className="text-xs text-zinc-500 shrink-0">
                      {featuredChallenge.progress}/{featuredChallenge.target}
                    </span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${Math.min(100, Math.round((featuredChallenge.progress / featuredChallenge.target) * 100))}%` }}
                    />
                  </div>
                </div>
              ) : view.challenges.length ? (
                <p className="text-sm text-zinc-500">All challenges complete — add a new one to keep momentum going.</p>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('challenges')}
                  className="text-sm text-purple-300 hover:text-purple-200 flex items-center gap-1 transition-colors"
                >
                  Add your first challenge <ArrowRight size={13} />
                </button>
              )}
              {view.challenges.length > 0 && (
                <>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mt-4">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${challengeCompletionPct}%` }}
                    />
                  </div>
                  <p className="text-xs text-zinc-600 mt-1.5">{challengeCompletionPct}% of all challenges done this term</p>
                </>
              )}
            </div>

            <Card
              label="Weekly consistency"
              value={`${consistencyPct}%`}
              icon={CalendarCheck}
              sub={`${activeDaysThisWeek}/7 days studied`}
              trend={consistencyPct >= 70 ? 'up' : consistencyPct > 0 ? 'down' : undefined}
            />
          </div>

          <div className="bg-zinc-900/60 rounded-xl border border-zinc-800 p-4 transition-all duration-200 hover:border-purple-500/40">
            <div className="flex items-center justify-between mb-3 gap-3">
              <h3 className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                <Award size={14} className="text-purple-400" /> Standing &amp; achievements
              </h3>
              <span className={`inline-flex items-center gap-1.5 text-xs font-medium border rounded-full px-2.5 py-1 shrink-0 ${standing.tone}`}>
                <standing.icon size={12} /> {standing.label}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {achievements.map((a) => (
                <span
                  key={a.label}
                  className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1.5 border transition-transform duration-150 hover:scale-105 ${
                    a.achieved
                      ? 'text-purple-300 bg-purple-500/10 border-purple-500/20'
                      : 'text-zinc-600 bg-zinc-900 border-zinc-800'
                  }`}
                >
                  <a.icon size={12} />
                  {a.label}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900/60 rounded-xl border border-zinc-800 p-4 transition-all duration-200 hover:border-purple-500/40">
            <h3 className="text-sm font-medium text-zinc-300 mb-3">Study hours this week</h3>
            <div style={{ width: '100%', height: 160 }}>
              <ResponsiveContainer>
                <LineChart data={view.trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#71717a' }} stroke="#3f3f46" />
                  <YAxis tick={{ fontSize: 12, fill: '#71717a' }} stroke="#3f3f46" />
                  <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #3f3f46', borderRadius: 8, fontSize: 12, color: '#e4e4e7' }} />
                  <Line type="monotone" dataKey="hours" stroke="#a855f7" strokeWidth={2} dot={{ r: 3, fill: '#a855f7' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-zinc-900/60 rounded-xl border border-zinc-800 p-4 transition-all duration-200 hover:border-purple-500/40">
            <h3 className="text-sm font-medium text-zinc-300 mb-3">Recent study log</h3>
            {view.logs.length ? (
              <div className="space-y-2">
                {view.logs.slice(0, 4).map((l) => (
                  <div
                    key={l.id}
                    className="flex items-center justify-between text-sm py-1.5 px-2 -mx-2 rounded-lg border-b border-zinc-800/60 last:border-0 transition-colors duration-150 hover:bg-zinc-800/40"
                  >
                    <span className="text-zinc-400 truncate">{l.note}</span>
                    <span className="text-zinc-500 shrink-0">{l.hours}h · {l.date}</span>
                  </div>
                ))}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('study')}
                className="text-sm text-purple-300 hover:text-purple-200 flex items-center gap-1 transition-colors"
              >
                Log your first study session <ArrowRight size={13} />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================================
// PAGE: WEEKLY ASSIGNMENTS
// ============================================================================
function MarksPage({ marks }) {
  const chartData = marks.map((m) => ({ subject: m.subject, pct: Math.round((m.score / m.max) * 100) }));

  return (
    <div>
      <PageHeader title="Weekly Assignments" sub="Scores by day for the latest assignment." badge="Weekly Assignments" />

      <div className="bg-zinc-900/60 rounded-xl border border-zinc-800 p-4 mb-4">
        <h3 className="text-sm font-medium text-zinc-300 mb-3">Score by day (%)</h3>
        <div style={{ width: '100%', height: 220 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="subject" tick={{ fontSize: 11, fill: '#71717a' }} stroke="#3f3f46" />
              <YAxis tick={{ fontSize: 12, fill: '#71717a' }} stroke="#3f3f46" domain={[0, 100]} />
              <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #3f3f46', borderRadius: 8, fontSize: 12, color: '#e4e4e7' }} />
              <Line type="monotone" dataKey="pct" stroke="#a855f7" strokeWidth={2} dot={{ r: 3, fill: '#a855f7' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-zinc-900/60 rounded-xl border border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-900 text-left text-xs text-zinc-500 uppercase tracking-wide">
              <th className="px-4 py-2.5">Day</th>
              <th className="px-4 py-2.5">Assignment</th>
              <th className="px-4 py-2.5 text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((m) => (
              <tr key={m.subject} className="border-t border-zinc-800">
                <td className="px-4 py-3 font-medium text-zinc-200">{m.subject}</td>
                <td className="px-4 py-3 text-zinc-500">{m.test}</td>
                <td className="px-4 py-3 text-right text-zinc-300">{m.score}/{m.max}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================================
// PAGE: CHALLENGES
// ============================================================================
function ChallengesPage({ challenges, setChallenges }) {
  const [title, setTitle] = useState('');

  const addChallenge = () => {
    if (!title.trim()) return;
    setChallenges((prev) => [
      ...prev,
      { id: Date.now(), title: title.trim(), progress: 0, target: 1, done: false },
    ]);
    setTitle('');
  };

  const toggleDone = (id) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, done: !c.done, progress: !c.done ? c.target : c.progress } : c))
    );
  };

  const remove = (id) => setChallenges((prev) => prev.filter((c) => c.id !== id));

  return (
    <div>
      <PageHeader title="Challenges" sub="Small goals to keep momentum going." badge="Challenges" />

      <div className="flex gap-2 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addChallenge()}
          placeholder="Add a new challenge…"
          className="flex-1 px-3 py-2 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="button"
          onClick={addChallenge}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-gradient-to-br from-purple-500 to-violet-600 text-white hover:opacity-90"
        >
          <Plus size={16} /> Add
        </button>
      </div>

      <div className="space-y-2">
        {challenges.map((c) => {
          const pct = Math.min(100, Math.round((c.progress / c.target) * 100));
          return (
            <div key={c.id} className="bg-zinc-900/60 rounded-xl border border-zinc-800 p-3.5 flex items-center gap-3">
              <button type="button" onClick={() => toggleDone(c.id)} aria-label={c.done ? 'Mark incomplete' : 'Mark complete'}>
                {c.done ? (
                  <CheckCircle2 size={20} className="text-emerald-400" />
                ) : (
                  <Circle size={20} className="text-zinc-700" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${c.done ? 'text-zinc-600 line-through' : 'text-zinc-200'}`}>{c.title}</p>
                {!c.done && (
                  <div className="mt-1.5 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                )}
              </div>
              <span className="text-xs text-zinc-600 shrink-0">{c.progress}/{c.target}</span>
              <button type="button" onClick={() => remove(c.id)} aria-label="Delete challenge" className="text-zinc-700 hover:text-red-400 shrink-0">
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// PAGE: STUDY LOG
// ============================================================================
function StudyLogPage({ logs, setLogs }) {
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [hours, setHours] = useState('');
  const [note, setNote] = useState('');

  const addLog = () => {
    const h = parseFloat(hours);
    if (!h || h <= 0) return;
    setLogs((prev) => [
      { id: Date.now(), date: 'Today', subject, hours: h, note: note.trim() || '—' },
      ...prev,
    ]);
    setHours('');
    setNote('');
  };

  const totalHours = logs.reduce((s, l) => s + l.hours, 0);

  return (
    <div>
      <PageHeader title="Study log" sub={`${totalHours.toFixed(1)} hours logged total.`} badge="Study log" />

      <div className="bg-zinc-900/60 rounded-xl border border-zinc-800 p-4 space-y-3 mb-4">
        <h3 className="text-sm font-medium text-zinc-300">Log a session</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <input
            type="number"
            step="0.5"
            min="0"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="Hours"
            className="px-3 py-2 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Note (optional)"
            className="px-3 py-2 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          type="button"
          onClick={addLog}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-gradient-to-br from-purple-500 to-violet-600 text-white hover:opacity-90"
        >
          <Plus size={16} /> Add entry
        </button>
      </div>

      <div className="space-y-2">
        {logs.map((l) => (
          <div key={l.id} className="bg-zinc-900/60 rounded-xl border border-zinc-800 px-4 py-3 flex items-center justify-between text-sm">
            <div className="min-w-0">
              <p className="font-medium text-zinc-200 truncate">{l.subject}</p>
              <p className="text-zinc-600 truncate">{l.note}</p>
            </div>
            <div className="text-right shrink-0 ml-3">
              <p className="font-medium text-zinc-300">{l.hours}h</p>
              <p className="text-zinc-600 text-xs">{l.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// PAGE: WEEKLY CODING ASSIGNMENTS (new feature)
// ============================================================================
const DIFFICULTY_STYLES = {
  Easy: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
  Medium: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
  Hard: 'text-red-300 bg-red-500/10 border-red-500/20',
};

function CodingAssignmentsPage({ assignments, setAssignments }) {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [week, setWeek] = useState(() => Math.max(1, ...assignments.map((a) => a.week)));

  const weeks = [...new Set(assignments.map((a) => a.week))].sort((a, b) => a - b);
  const totalDone = assignments.filter((a) => a.done).length;
  const totalPct = assignments.length ? Math.round((totalDone / assignments.length) * 100) : 0;

  const toggleDone = (id) => {
    setAssignments((prev) => prev.map((a) => (a.id === id ? { ...a, done: !a.done } : a)));
  };

  const remove = (id) => setAssignments((prev) => prev.filter((a) => a.id !== id));

  const addAssignment = () => {
    if (!title.trim()) return;
    setAssignments((prev) => [
      ...prev,
      {
        id: Date.now(),
        week: Number(week) || 1,
        title: title.trim(),
        topic: topic.trim() || 'General',
        difficulty,
        done: false,
      },
    ]);
    setTitle('');
    setTopic('');
  };

  return (
    <div>
      <PageHeader title="Weekly Coding Assignments" sub="Practice problems assigned per week, tracked to completion." badge="Coding Assignments" />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5 max-w-xl">
        <Card label="Total assignments" value={assignments.length} icon={ListChecks} />
        <Card label="Completed" value={totalDone} icon={CheckCircle2} />
        <Card label="Completion" value={`${totalPct}%`} icon={Trophy} trend={totalPct >= 70 ? 'up' : totalPct > 0 ? 'down' : undefined} />
      </div>

      <div className="bg-zinc-900/60 rounded-xl border border-zinc-800 p-4 mb-5">
        <h3 className="text-sm font-medium text-zinc-300 mb-3">Add an assignment</h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addAssignment()}
            placeholder="Problem title…"
            className="sm:col-span-2 px-3 py-2 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Topic"
            className="px-3 py-2 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <input
            type="number"
            min="1"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            placeholder="Week"
            className="px-3 py-2 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          type="button"
          onClick={addAssignment}
          className="mt-2 flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-gradient-to-br from-purple-500 to-violet-600 text-white hover:opacity-90"
        >
          <Plus size={16} /> Add assignment
        </button>
      </div>

      <div className="space-y-4">
        {weeks.map((w) => {
          const weekItems = assignments.filter((a) => a.week === w);
          const weekDone = weekItems.filter((a) => a.done).length;
          const weekPct = weekItems.length ? Math.round((weekDone / weekItems.length) * 100) : 0;
          return (
            <div key={w} className="bg-zinc-900/60 rounded-xl border border-zinc-800 p-4">
              <div className="flex items-center justify-between mb-3 gap-3">
                <h3 className="text-sm font-medium text-zinc-200">Week {w}</h3>
                <span className="text-xs text-zinc-500 shrink-0">{weekDone}/{weekItems.length} complete</span>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${weekPct}%` }}
                />
              </div>
              <div className="space-y-2">
                {weekItems.map((a) => (
                  <div key={a.id} className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5">
                    <button type="button" onClick={() => toggleDone(a.id)} aria-label={a.done ? 'Mark incomplete' : 'Mark complete'}>
                      {a.done ? (
                        <CheckCircle2 size={18} className="text-emerald-400" />
                      ) : (
                        <Circle size={18} className="text-zinc-700" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${a.done ? 'text-zinc-600 line-through' : 'text-zinc-200'}`}>{a.title}</p>
                      <p className="text-xs text-zinc-600">{a.topic}</p>
                    </div>
                    <span className={`text-[11px] font-medium border rounded-full px-2 py-0.5 shrink-0 ${DIFFICULTY_STYLES[a.difficulty] || DIFFICULTY_STYLES.Easy}`}>
                      {a.difficulty}
                    </span>
                    <button type="button" onClick={() => remove(a.id)} aria-label="Delete assignment" className="text-zinc-700 hover:text-red-400 shrink-0">
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// PAGE: MIND SHARPENING GAMES (feature 1)
// ============================================================================
const MEMORY_ICONS = ['🎯', '🚀', '🧠', '⚡', '🔥', '💡'];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildMemoryDeck() {
  return shuffleArray([...MEMORY_ICONS, ...MEMORY_ICONS]).map((icon, i) => ({ id: i, icon }));
}

function MemoryMatchGame() {
  const [cards, setCards] = useState(buildMemoryDeck);
  const [flipped, setFlipped] = useState([]);
  const [matchedIcons, setMatchedIcons] = useState([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const [best, setBest] = useState(null);

  const won = matchedIcons.length === MEMORY_ICONS.length;

  useEffect(() => {
    if (won) {
      setBest((prev) => (prev === null ? moves : Math.min(prev, moves)));
    }
  }, [won, moves]);

  const reset = () => {
    setCards(buildMemoryDeck());
    setFlipped([]);
    setMatchedIcons([]);
    setMoves(0);
    setLocked(false);
  };

  const flip = (idx) => {
    if (locked || flipped.includes(idx) || flipped.length === 2) return;
    if (matchedIcons.includes(cards[idx].icon)) return;

    const next = [...flipped, idx];
    setFlipped(next);

    if (next.length === 2) {
      setLocked(true);
      setMoves((m) => m + 1);
      const [a, b] = next;
      if (cards[a].icon === cards[b].icon) {
        setTimeout(() => {
          setMatchedIcons((prev) => [...prev, cards[a].icon]);
          setFlipped([]);
          setLocked(false);
        }, 450);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setLocked(false);
        }, 750);
      }
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex-1 grid grid-cols-3 gap-2 max-w-md">
          <Card label="Moves" value={moves} icon={RefreshCw} />
          <Card label="Matched" value={`${matchedIcons.length}/${MEMORY_ICONS.length}`} icon={Trophy} />
          <Card label="Best" value={best === null ? '—' : best} icon={Star} />
        </div>
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-purple-500/40 hover:text-purple-300 transition-colors"
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {won && (
        <div className="mb-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
          <p className="text-sm text-emerald-300 flex items-center gap-2">
            <Trophy size={16} /> Solved in {moves} moves! 🎉
          </p>
          <button
            type="button"
            onClick={reset}
            className="text-xs font-medium px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30 transition-colors"
          >
            Play again
          </button>
        </div>
      )}

      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 max-w-lg">
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matchedIcons.includes(card.icon);
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => flip(idx)}
              disabled={isFlipped}
              aria-label={isFlipped ? `Card showing ${card.icon}` : 'Hidden card'}
              className={`aspect-square rounded-xl flex items-center justify-center text-xl transition-all duration-200 border ${
                isFlipped
                  ? matchedIcons.includes(card.icon)
                    ? 'bg-emerald-500/10 border-emerald-500/30 scale-95'
                    : 'bg-zinc-800 border-zinc-700'
                  : 'bg-gradient-to-br from-purple-500/20 to-violet-600/20 border-purple-500/20 hover:border-purple-500/50 hover:-translate-y-0.5'
              }`}
            >
              {isFlipped ? card.icon : <Brain size={16} className="text-purple-400/50" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ---- Logic Sequence — spot the pattern and pick the next number ----------
function genLogicRound() {
  const kind = randInt(0, 4);
  let seq, next, rule;

  if (kind === 0) {
    const start = randInt(1, 10);
    const diff = randInt(2, 7);
    seq = [0, 1, 2, 3].map((i) => start + diff * i);
    next = start + diff * 4;
    rule = `Add ${diff} to get the next term.`;
  } else if (kind === 1) {
    const start = randInt(1, 3);
    const ratio = randInt(2, 3);
    seq = [0, 1, 2, 3].map((i) => start * ratio ** i);
    next = start * ratio ** 4;
    rule = `Multiply by ${ratio} to get the next term.`;
  } else if (kind === 2) {
    let a = randInt(1, 5);
    let b = randInt(a + 1, a + 5);
    seq = [a, b];
    for (let i = 0; i < 2; i++) seq.push(seq[seq.length - 1] + seq[seq.length - 2]);
    next = seq[seq.length - 1] + seq[seq.length - 2];
    rule = 'Each term is the sum of the two terms before it (Fibonacci-style).';
  } else if (kind === 3) {
    const start = randInt(1, 4);
    seq = [0, 1, 2, 3].map((i) => (start + i) ** 2);
    next = (start + 4) ** 2;
    rule = 'These are consecutive perfect squares.';
  } else {
    const start = randInt(6, 16);
    const d1 = randInt(2, 5);
    const d2 = randInt(2, 5);
    seq = [start];
    for (let i = 0; i < 3; i++) seq.push(seq[seq.length - 1] + (i % 2 === 0 ? d1 : -d2));
    next = seq[seq.length - 1] + (3 % 2 === 0 ? d1 : -d2);
    rule = `The pattern alternates +${d1} then −${d2}.`;
  }

  const optionSet = new Set([next]);
  while (optionSet.size < 4) {
    const offset = randInt(1, Math.max(3, Math.round(Math.abs(next) * 0.2) + 2));
    optionSet.add(next + (Math.random() > 0.5 ? offset : -offset));
  }
  const options = shuffleArray([...optionSet]);

  return { seq, next, rule, options };
}

const LOGIC_ROUNDS_PER_SESSION = 8;

function LogicSequenceGame() {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [problem, setProblem] = useState(genLogicRound);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(null);

  const finished = started && round >= LOGIC_ROUNDS_PER_SESSION;

  useEffect(() => {
    if (finished) setBestScore((b) => (b === null ? score : Math.max(b, score)));
  }, [finished, score]);

  const start = () => {
    setStarted(true);
    setRound(0);
    setScore(0);
    setProblem(genLogicRound());
    setSelected(null);
    setAnswered(false);
  };

  const choose = (val) => {
    if (answered) return;
    setSelected(val);
    setAnswered(true);
    if (val === problem.next) setScore((s) => s + 1);
  };

  const next = () => {
    setRound((r) => r + 1);
    setProblem(genLogicRound());
    setSelected(null);
    setAnswered(false);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-4 max-w-xl">
        <Card label="Round" value={started ? `${Math.min(round + 1, LOGIC_ROUNDS_PER_SESSION)}/${LOGIC_ROUNDS_PER_SESSION}` : '—'} icon={Puzzle} />
        <Card label="Score" value={score} icon={Trophy} />
        <Card label="Best session" value={bestScore === null ? '—' : `${bestScore}/${LOGIC_ROUNDS_PER_SESSION}`} icon={Star} />
      </div>

      <div className="bg-zinc-900/60 rounded-xl border border-zinc-800 p-6 max-w-md">
        {!started && (
          <div className="text-center py-4">
            <Puzzle size={28} className="text-purple-400 mx-auto mb-3" />
            <p className="text-sm text-zinc-400 mb-4">Spot the pattern in each sequence and pick what comes next. {LOGIC_ROUNDS_PER_SESSION} rounds, no clock.</p>
            <button
              type="button"
              onClick={start}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-br from-purple-500 to-violet-600 text-white hover:opacity-90 mx-auto"
            >
              <Play size={14} /> Start
            </button>
          </div>
        )}

        {finished && (
          <div className="text-center py-4">
            <Trophy size={28} className="text-amber-400 mx-auto mb-3" />
            <p className="text-lg font-semibold text-white mb-1">{score}/{LOGIC_ROUNDS_PER_SESSION} correct</p>
            <p className="text-sm text-zinc-500 mb-4">Nice reasoning — ready for another round?</p>
            <button
              type="button"
              onClick={start}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-br from-purple-500 to-violet-600 text-white hover:opacity-90 mx-auto"
            >
              <RotateCcw size={14} /> Play again
            </button>
          </div>
        )}

        {started && !finished && (
          <div>
            <p className="text-center text-2xl font-semibold text-white mb-1 tabular-nums">
              {problem.seq.join(', ')}, <span className="text-purple-400">?</span>
            </p>
            <p className="text-center text-xs text-zinc-600 mb-5">What comes next?</p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {problem.options.map((opt) => {
                const isCorrect = answered && opt === problem.next;
                const isWrongPick = answered && selected === opt && opt !== problem.next;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => choose(opt)}
                    disabled={answered}
                    className={`px-3 py-2.5 rounded-lg text-base font-medium border tabular-nums transition-colors ${
                      isCorrect
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                        : isWrongPick
                        ? 'bg-red-500/10 border-red-500/40 text-red-300'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-200 hover:border-purple-500/40'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {answered && (
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 mb-3">
                <p className="text-xs text-zinc-400">{problem.rule}</p>
              </div>
            )}
            {answered && (
              <button
                type="button"
                onClick={next}
                className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-br from-purple-500 to-violet-600 text-white hover:opacity-90"
              >
                {round + 1 >= LOGIC_ROUNDS_PER_SESSION ? 'See results' : 'Next round'} <ArrowRight size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ---- Simon Says — repeat the growing color sequence ----------------------
const SIMON_PADS = [
  { id: 0, base: 'bg-red-600', active: 'bg-red-400' },
  { id: 1, base: 'bg-blue-600', active: 'bg-blue-400' },
  { id: 2, base: 'bg-emerald-600', active: 'bg-emerald-400' },
  { id: 3, base: 'bg-amber-500', active: 'bg-amber-300' },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function SimonSaysGame() {
  const [sequence, setSequence] = useState([]);
  const [userStep, setUserStep] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | showing | input | gameover
  const [activePad, setActivePad] = useState(null);
  const [best, setBest] = useState(null);
  const runIdRef = useRef(0);

  const level = sequence.length;

  const playSequence = async (seq, runId) => {
    setStatus('showing');
    await sleep(500);
    for (const padId of seq) {
      if (runIdRef.current !== runId) return;
      setActivePad(padId);
      await sleep(420);
      setActivePad(null);
      await sleep(180);
    }
    if (runIdRef.current !== runId) return;
    setStatus('input');
    setUserStep(0);
  };

  const start = () => {
    runIdRef.current += 1;
    const runId = runIdRef.current;
    const firstSeq = [randInt(0, 3)];
    setSequence(firstSeq);
    playSequence(firstSeq, runId);
  };

  const handlePadClick = (padId) => {
    if (status !== 'input') return;
    if (padId === sequence[userStep]) {
      if (userStep + 1 === sequence.length) {
        const newSeq = [...sequence, randInt(0, 3)];
        runIdRef.current += 1;
        const runId = runIdRef.current;
        setSequence(newSeq);
        playSequence(newSeq, runId);
      } else {
        setUserStep((s) => s + 1);
      }
    } else {
      runIdRef.current += 1;
      setStatus('gameover');
      setBest((b) => (b === null ? sequence.length - 1 : Math.max(b, sequence.length - 1)));
    }
  };

  const reset = () => {
    runIdRef.current += 1;
    setSequence([]);
    setUserStep(0);
    setStatus('idle');
    setActivePad(null);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 mb-4 max-w-xs">
        <Card label="Level" value={status === 'idle' ? '—' : level} icon={Zap} />
        <Card label="Best" value={best === null ? '—' : best} icon={Star} />
      </div>

      <div className="bg-zinc-900/60 rounded-xl border border-zinc-800 p-6 max-w-xs">
        {status === 'idle' && (
          <div className="text-center py-2 mb-4">
            <Zap size={28} className="text-purple-400 mx-auto mb-3" />
            <p className="text-sm text-zinc-400">Watch the sequence, then repeat it. It grows by one each round.</p>
          </div>
        )}

        {status === 'gameover' && (
          <div className="text-center py-2 mb-4">
            <Trophy size={28} className="text-amber-400 mx-auto mb-3" />
            <p className="text-base font-semibold text-white">You reached level {sequence.length - 1}</p>
          </div>
        )}

        {status === 'showing' && (
          <p className="text-center text-xs text-zinc-500 mb-4">Watch closely…</p>
        )}
        {status === 'input' && (
          <p className="text-center text-xs text-purple-300 mb-4">Your turn — repeat the sequence</p>
        )}

        <div className="grid grid-cols-2 gap-2.5">
          {SIMON_PADS.map((pad) => (
            <button
              key={pad.id}
              type="button"
              onClick={() => handlePadClick(pad.id)}
              disabled={status !== 'input'}
              aria-label={`Pad ${pad.id + 1}`}
              className={`aspect-square rounded-xl transition-all duration-150 ${
                activePad === pad.id ? pad.active + ' scale-95' : pad.base
              } ${status === 'input' ? 'hover:brightness-110 cursor-pointer' : 'opacity-80 cursor-default'}`}
            />
          ))}
        </div>

        <div className="mt-5 flex justify-center">
          {status === 'idle' || status === 'gameover' ? (
            <button
              type="button"
              onClick={start}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-br from-purple-500 to-violet-600 text-white hover:opacity-90"
            >
              <Play size={14} /> {status === 'gameover' ? 'Play again' : 'Start'}
            </button>
          ) : (
            <button
              type="button"
              onClick={reset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-purple-500/40 hover:text-purple-300"
            >
              <RotateCcw size={13} /> Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- Tower of Hanoi — classic planning / logic puzzle --------------------
function buildHanoiPegs(n) {
  return [Array.from({ length: n }, (_, i) => n - i), [], []];
}

const HANOI_DISK_COLORS = ['from-purple-500 to-violet-600', 'from-blue-500 to-blue-600', 'from-emerald-500 to-emerald-600', 'from-amber-500 to-amber-600', 'from-red-500 to-red-600'];

function TowerOfHanoiGame() {
  const [diskCount, setDiskCount] = useState(3);
  const [pegs, setPegs] = useState(() => buildHanoiPegs(3));
  const [selected, setSelected] = useState(null);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const minMoves = 2 ** diskCount - 1;

  const resetGame = (count = diskCount) => {
    setPegs(buildHanoiPegs(count));
    setSelected(null);
    setMoves(0);
    setWon(false);
  };

  const changeDifficulty = (n) => {
    setDiskCount(n);
    resetGame(n);
  };

  const clickPeg = (i) => {
    if (won) return;
    if (selected === null) {
      if (pegs[i].length === 0) return;
      setSelected(i);
      return;
    }
    if (selected === i) {
      setSelected(null);
      return;
    }
    const fromPeg = [...pegs[selected]];
    const toPeg = [...pegs[i]];
    const disk = fromPeg[fromPeg.length - 1];
    const targetTop = toPeg[toPeg.length - 1];
    if (targetTop !== undefined && targetTop < disk) {
      setSelected(pegs[i].length ? i : null);
      return;
    }
    fromPeg.pop();
    toPeg.push(disk);
    const nextPegs = [...pegs];
    nextPegs[selected] = fromPeg;
    nextPegs[i] = toPeg;
    setPegs(nextPegs);
    setSelected(null);
    setMoves((m) => m + 1);
    if (nextPegs[2].length === diskCount) setWon(true);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="grid grid-cols-2 gap-2 max-w-xs">
          <Card label="Moves" value={moves} icon={RefreshCw} />
          <Card label="Minimum" value={minMoves} icon={Trophy} />
        </div>
        <div className="flex items-center gap-1.5">
          {[3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => changeDifficulty(n)}
              className={`text-xs font-medium px-2.5 py-1.5 rounded-md border transition-colors ${
                diskCount === n
                  ? 'bg-purple-500/20 border-purple-500/50 text-purple-200'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700'
              }`}
            >
              {n} disks
            </button>
          ))}
        </div>
      </div>

      {won && (
        <div className="mb-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 flex items-center justify-between gap-3 max-w-lg">
          <p className="text-sm text-emerald-300 flex items-center gap-2">
            <Trophy size={16} /> Solved in {moves} moves{moves === minMoves ? ' — optimal!' : `  (minimum is ${minMoves})`}
          </p>
          <button
            type="button"
            onClick={() => resetGame()}
            className="text-xs font-medium px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30 transition-colors shrink-0"
          >
            Play again
          </button>
        </div>
      )}

      <div className="flex items-end justify-center gap-6 sm:gap-10 bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 max-w-lg h-56">
        {pegs.map((peg, i) => (
          <button
            key={i}
            type="button"
            onClick={() => clickPeg(i)}
            aria-label={`Peg ${i + 1}`}
            className="relative flex-1 h-full flex flex-col-reverse items-center justify-start gap-1 group"
          >
            <div className="absolute bottom-0 w-1.5 bg-zinc-700 rounded-full" style={{ height: '85%' }} />
            <div className={`relative z-10 h-3 rounded-full mb-0 ${selected === i ? 'bg-purple-400' : 'bg-zinc-700'}`} style={{ width: '90%' }} />
            {peg.map((disk, di) => (
              <div
                key={di}
                className={`relative z-10 h-5 rounded-md bg-gradient-to-r ${HANOI_DISK_COLORS[disk - 1] || HANOI_DISK_COLORS[0]} ${
                  selected === i && di === peg.length - 1 ? 'ring-2 ring-white/60' : ''
                }`}
                style={{ width: `${20 + disk * 14}px` }}
              />
            ))}
          </button>
        ))}
      </div>
      <p className="text-xs text-zinc-500 mt-3">Tap a peg to pick up its top disk, then tap another peg to drop it — you can't stack a bigger disk on a smaller one.</p>
    </div>
  );
}

function GamesPage() {
  const [tab, setTab] = useState('memory');
  return (
    <div>
      <PageHeader title="Mind Sharpening Games" sub="Quick brain warm-ups between study blocks." badge="Games" />
      <PillTabs
        tabs={[
          { id: 'memory', label: 'Memory Match', icon: Brain },
          { id: 'logic', label: 'Logic Sequence', icon: Puzzle },
          { id: 'simon', label: 'Pattern Recall', icon: Zap },
          { id: 'hanoi', label: 'Tower of Hanoi', icon: Layers },
        ]}
        active={tab}
        onChange={setTab}
      />
      {tab === 'memory' && <MemoryMatchGame />}
      {tab === 'logic' && <LogicSequenceGame />}
      {tab === 'simon' && <SimonSaysGame />}
      {tab === 'hanoi' && <TowerOfHanoiGame />}
    </div>
  );
}

// ============================================================================
// PAGE: MINI CODING GAMES (feature 2)
// ============================================================================
const OUTPUT_QUESTIONS = [
  {
    code: `console.log(typeof null);`,
    options: ['"null"', '"object"', '"undefined"', '"boolean"'],
    answer: 1,
    explain: 'typeof null is a long-standing JS quirk — it returns "object".',
  },
  {
    code: `console.log([1, 2, 3] + [4, 5, 6]);`,
    options: ['[1,2,3,4,5,6]', '"1,2,34,5,6"', 'NaN', 'Error'],
    answer: 1,
    explain: 'Arrays are coerced to strings, then concatenated: "1,2,3" + "4,5,6".',
  },
  {
    code: `console.log(0.1 + 0.2 === 0.3);`,
    options: ['true', 'false', 'undefined', 'Error'],
    answer: 1,
    explain: 'Floating point rounding makes 0.1 + 0.2 equal 0.30000000000000004.',
  },
  {
    code: `let a = [1, 2, 3];\nlet b = a;\nb.push(4);\nconsole.log(a.length);`,
    options: ['3', '4', 'Error', 'undefined'],
    answer: 1,
    explain: 'Arrays are reference types — b and a point to the same array.',
  },
  {
    code: `console.log(1 < 2 < 3);\nconsole.log(3 > 2 > 1);`,
    options: ['true true', 'true false', 'false true', 'false false'],
    answer: 1,
    explain: '1<2<3 evaluates left to right: true<3 -> 1<3 -> true. 3>2>1: true>1 -> 1>1 -> false.',
  },
  {
    code: `function foo() {\n  return\n  { bar: 1 };\n}\nconsole.log(foo());`,
    options: ['{bar: 1}', 'undefined', 'Error', 'null'],
    answer: 1,
    explain: 'Automatic semicolon insertion adds a ; right after return, so it returns undefined.',
  },
  {
    code: `console.log([] == false);`,
    options: ['true', 'false', 'Error', 'undefined'],
    answer: 0,
    explain: '[] coerces to "" then to 0; false coerces to 0; 0 == 0 is true.',
  },
  {
    code: `for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}`,
    options: ['0 1 2', '3 3 3', '0 0 0', 'Error'],
    answer: 1,
    explain: 'var is function-scoped, so all three callbacks share the same i, which is 3 once they run.',
  },
];

function OutputQuiz() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const q = OUTPUT_QUESTIONS[idx];
  const isLast = idx === OUTPUT_QUESTIONS.length - 1;

  const choose = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (isLast) return;
    setIdx((i) => i + 1);
    setSelected(null);
    setAnswered(false);
  };

  const reset = () => {
    setIdx(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
  };

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-zinc-500">Question {idx + 1}/{OUTPUT_QUESTIONS.length}</span>
        <span className="text-xs font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full px-2.5 py-1">
          Score: {score}
        </span>
      </div>

      <pre className="bg-black border border-zinc-800 rounded-xl p-4 text-sm text-zinc-200 font-mono overflow-x-auto mb-4 whitespace-pre-wrap">
        {q.code}
      </pre>

      <div className="space-y-2 mb-4">
        {q.options.map((opt, i) => {
          const isCorrect = answered && i === q.answer;
          const isWrongPick = answered && selected === i && i !== q.answer;
          return (
            <button
              key={i}
              type="button"
              onClick={() => choose(i)}
              disabled={answered}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-mono border transition-colors ${
                isCorrect
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                  : isWrongPick
                  ? 'bg-red-500/10 border-red-500/40 text-red-300'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-purple-500/40'
              }`}
            >
              <span className="flex items-center justify-between gap-2">
                {opt}
                {isCorrect && <CheckCircle2 size={14} />}
                {isWrongPick && <XCircle size={14} />}
              </span>
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-3 mb-4">
          <p className="text-xs text-zinc-400">{q.explain}</p>
        </div>
      )}

      <div className="flex items-center gap-2">
        {answered && !isLast && (
          <button
            type="button"
            onClick={next}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium bg-gradient-to-br from-purple-500 to-violet-600 text-white hover:opacity-90"
          >
            Next question <ArrowRight size={14} />
          </button>
        )}
        {answered && isLast && (
          <span className="text-sm text-zinc-400">Quiz complete — {score}/{OUTPUT_QUESTIONS.length} correct.</span>
        )}
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-purple-500/40 hover:text-purple-300"
        >
          <RotateCcw size={13} /> Reset
        </button>
      </div>
    </div>
  );
}

const CSS_ROUNDS = [
  { direction: 'row', justify: 'center', align: 'center' },
  { direction: 'row', justify: 'space-between', align: 'flex-start' },
  { direction: 'column', justify: 'flex-end', align: 'center' },
  { direction: 'row', justify: 'flex-start', align: 'stretch' },
];
const CSS_DIRECTIONS = ['row', 'column'];
const CSS_JUSTIFY = ['flex-start', 'center', 'flex-end', 'space-between'];
const CSS_ALIGN = ['flex-start', 'center', 'flex-end', 'stretch'];

function LayoutBoxes({ direction, justify, align }) {
  return (
    <div
      className="h-36 rounded-lg bg-zinc-950 border border-zinc-800 p-2"
      style={{ display: 'flex', flexDirection: direction, justifyContent: justify, alignItems: align, gap: 8 }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rounded-md bg-gradient-to-br from-purple-500 to-violet-600"
          style={{ width: align === 'stretch' && direction === 'row' ? 32 : 36, height: 36 }}
        />
      ))}
    </div>
  );
}

function PropSelector({ label, options, value, onChange }) {
  return (
    <div className="mb-3">
      <p className="text-[11px] text-zinc-500 mb-1.5 font-mono">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`text-[11px] font-mono px-2.5 py-1 rounded-md border transition-colors ${
              value === opt
                ? 'bg-purple-500/20 border-purple-500/50 text-purple-200'
                : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function CssChallenge() {
  const [round, setRound] = useState(0);
  const [direction, setDirection] = useState('row');
  const [justify, setJustify] = useState('flex-start');
  const [align, setAlign] = useState('flex-start');
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState(null);

  const target = CSS_ROUNDS[round];

  const check = () => {
    const match = direction === target.direction && justify === target.justify && align === target.align;
    setChecked(match);
    if (match) setScore((s) => s + 1);
  };

  const next = () => {
    setRound((r) => (r + 1) % CSS_ROUNDS.length);
    setChecked(null);
  };

  const reset = () => {
    setRound(0);
    setDirection('row');
    setJustify('flex-start');
    setAlign('flex-start');
    setScore(0);
    setChecked(null);
  };

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-zinc-500">Round {round + 1}/{CSS_ROUNDS.length}</span>
        <span className="text-xs font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full px-2.5 py-1">
          Score: {score}
        </span>
      </div>

      <p className="text-sm text-zinc-400 mb-3">Recreate the target layout on the right using the flexbox controls below.</p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-[11px] text-zinc-500 mb-1.5">Target</p>
          <LayoutBoxes {...target} />
        </div>
        <div>
          <p className="text-[11px] text-zinc-500 mb-1.5">Yours</p>
          <LayoutBoxes direction={direction} justify={justify} align={align} />
        </div>
      </div>

      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 mb-4">
        <PropSelector label="flex-direction" options={CSS_DIRECTIONS} value={direction} onChange={setDirection} />
        <PropSelector label="justify-content" options={CSS_JUSTIFY} value={justify} onChange={setJustify} />
        <PropSelector label="align-items" options={CSS_ALIGN} value={align} onChange={setAlign} />
      </div>

      {checked !== null && (
        <div
          className={`rounded-lg p-3 mb-4 text-sm border flex items-center gap-2 ${
            checked ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-300'
          }`}
        >
          {checked ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
          {checked ? 'Match! Nicely done.' : "Not quite a match yet — compare the boxes and try again."}
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={check}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium bg-gradient-to-br from-purple-500 to-violet-600 text-white hover:opacity-90"
        >
          Check layout
        </button>
        {checked && (
          <button
            type="button"
            onClick={next}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-purple-500/40"
          >
            Next round <ArrowRight size={14} />
          </button>
        )}
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-purple-500/40 hover:text-purple-300"
        >
          <RotateCcw size={13} /> Reset
        </button>
      </div>
    </div>
  );
}

// ---- Debug the Code — spot what's wrong -----------------------------------
const DEBUG_QUESTIONS = [
  {
    code: `function sum(arr) {\n  let total;\n  for (let i = 0; i <= arr.length; i++) {\n    total += arr[i];\n  }\n  return total;\n}`,
    options: [
      'Off-by-one loop bound and total is never initialized',
      'Missing a return statement',
      'The function name is invalid',
      'arr should be an object, not an array',
    ],
    answer: 0,
    explain: 'The loop should use i < arr.length, not <=, and total should start at 0 — right now it starts undefined, so the sum becomes NaN.',
  },
  {
    code: `def is_even(n):\n    if n % 2 = 0:\n        return True\n    return False`,
    options: [
      'Uses = instead of == for comparison',
      'Missing a colon after the if',
      'Should use integer division //',
      'The function needs two parameters',
    ],
    answer: 0,
    explain: 'Python needs == for equality comparison — a single = is assignment and causes a SyntaxError here.',
  },
  {
    code: `for (let i = 0; i < 5; i++) {\n  console.log(i);\n}\nconsole.log(i);`,
    options: [
      'i is undefined outside the loop and throws a ReferenceError',
      'This prints 5 twice',
      'This causes an infinite loop',
      'The for statement has a syntax error',
    ],
    answer: 0,
    explain: 'let is block-scoped, so i does not exist outside the for loop — the final console.log throws a ReferenceError.',
  },
  {
    code: `function factorial(n) {\n  if (n === 0) return 1;\n  return n * factorial(n);\n}`,
    options: [
      'The recursive call never decreases n, causing infinite recursion',
      'The base case is wrong',
      'This should use a loop instead of recursion',
      'A semicolon is missing',
    ],
    answer: 0,
    explain: 'The recursive call should be factorial(n - 1) — as written it calls itself with the same n forever, blowing the call stack.',
  },
  {
    code: `const arr = [1, 2, 3];\narr.forEach(function (x) {\n  return x * 2;\n});\nconsole.log(arr);`,
    options: [
      'forEach ignores the callback return value, so arr is unchanged',
      'arr should be declared with let',
      'forEach needs an index parameter to work',
      'This throws a runtime error',
    ],
    answer: 0,
    explain: 'forEach never uses what the callback returns, so arr stays [1, 2, 3]. map() would build and return a new transformed array instead.',
  },
];

function DebugQuiz() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const q = DEBUG_QUESTIONS[idx];
  const isLast = idx === DEBUG_QUESTIONS.length - 1;

  const choose = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === q.answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (isLast) return;
    setIdx((i) => i + 1);
    setSelected(null);
    setAnswered(false);
  };
  const reset = () => {
    setIdx(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
  };

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-zinc-500">Question {idx + 1}/{DEBUG_QUESTIONS.length}</span>
        <span className="text-xs font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full px-2.5 py-1">Score: {score}</span>
      </div>

      <p className="text-sm text-zinc-400 mb-2">What's wrong with this code?</p>
      <pre className="bg-black border border-zinc-800 rounded-xl p-4 text-sm text-zinc-200 font-mono overflow-x-auto mb-4 whitespace-pre-wrap">{q.code}</pre>

      <div className="space-y-2 mb-4">
        {q.options.map((opt, i) => {
          const isCorrect = answered && i === q.answer;
          const isWrongPick = answered && selected === i && i !== q.answer;
          return (
            <button
              key={i}
              type="button"
              onClick={() => choose(i)}
              disabled={answered}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm border transition-colors ${
                isCorrect
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                  : isWrongPick
                  ? 'bg-red-500/10 border-red-500/40 text-red-300'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-purple-500/40'
              }`}
            >
              <span className="flex items-center justify-between gap-2">
                {opt}
                {isCorrect && <CheckCircle2 size={14} />}
                {isWrongPick && <XCircle size={14} />}
              </span>
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-3 mb-4">
          <p className="text-xs text-zinc-400">{q.explain}</p>
        </div>
      )}

      <div className="flex items-center gap-2">
        {answered && !isLast && (
          <button type="button" onClick={next} className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium bg-gradient-to-br from-purple-500 to-violet-600 text-white hover:opacity-90">
            Next question <ArrowRight size={14} />
          </button>
        )}
        {answered && isLast && <span className="text-sm text-zinc-400">Done — {score}/{DEBUG_QUESTIONS.length} correct.</span>}
        <button type="button" onClick={reset} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-purple-500/40 hover:text-purple-300">
          <RotateCcw size={13} /> Reset
        </button>
      </div>
    </div>
  );
}

// ---- Time Complexity Guess -------------------
const BIGO_QUESTIONS = [
  {
    code: `function findMax(arr) {\n  let max = arr[0];\n  for (const x of arr) {\n    if (x > max) max = x;\n  }\n  return max;\n}`,
    options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n^2)'],
    answer: 1,
    explain: 'A single pass through the array — linear time.',
  },
  {
    code: `function hasDuplicate(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = i + 1; j < arr.length; j++) {\n      if (arr[i] === arr[j]) return true;\n    }\n  }\n  return false;\n}`,
    options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(2^n)'],
    answer: 2,
    explain: 'Nested loops both scale with the array size — quadratic time.',
  },
  {
    code: `function binarySearch(arr, target) {\n  let lo = 0, hi = arr.length - 1;\n  while (lo <= hi) {\n    const mid = (lo + hi) >> 1;\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) lo = mid + 1; else hi = mid - 1;\n  }\n  return -1;\n}`,
    options: ['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'],
    answer: 1,
    explain: 'Each step halves the remaining search space — logarithmic time.',
  },
  {
    code: `function getFirst(arr) {\n  return arr[0];\n}`,
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
    answer: 0,
    explain: 'Direct index access — constant time regardless of array size.',
  },
  {
    code: `function permutations(str) {\n  if (str.length <= 1) return [str];\n  let result = [];\n  for (let i = 0; i < str.length; i++) {\n    const rest = str.slice(0, i) + str.slice(i + 1);\n    for (const p of permutations(rest)) result.push(str[i] + p);\n  }\n  return result;\n}`,
    options: ['O(n)', 'O(n^2)', 'O(n!)', 'O(2^n)'],
    answer: 2,
    explain: 'Generating every permutation of a string of length n takes factorial time.',
  },
];

function BigOQuiz() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const q = BIGO_QUESTIONS[idx];
  const isLast = idx === BIGO_QUESTIONS.length - 1;

  const choose = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === q.answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (isLast) return;
    setIdx((i) => i + 1);
    setSelected(null);
    setAnswered(false);
  };
  const reset = () => {
    setIdx(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
  };

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-zinc-500">Question {idx + 1}/{BIGO_QUESTIONS.length}</span>
        <span className="text-xs font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full px-2.5 py-1">Score: {score}</span>
      </div>

      <p className="text-sm text-zinc-400 mb-2">What's the time complexity of this function?</p>
      <pre className="bg-black border border-zinc-800 rounded-xl p-4 text-sm text-zinc-200 font-mono overflow-x-auto mb-4 whitespace-pre-wrap">{q.code}</pre>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {q.options.map((opt, i) => {
          const isCorrect = answered && i === q.answer;
          const isWrongPick = answered && selected === i && i !== q.answer;
          return (
            <button
              key={i}
              type="button"
              onClick={() => choose(i)}
              disabled={answered}
              className={`px-3.5 py-2.5 rounded-lg text-sm font-mono border transition-colors ${
                isCorrect
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                  : isWrongPick
                  ? 'bg-red-500/10 border-red-500/40 text-red-300'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-purple-500/40'
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-3 mb-4">
          <p className="text-xs text-zinc-400">{q.explain}</p>
        </div>
      )}

      <div className="flex items-center gap-2">
        {answered && !isLast && (
          <button type="button" onClick={next} className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium bg-gradient-to-br from-purple-500 to-violet-600 text-white hover:opacity-90">
            Next question <ArrowRight size={14} />
          </button>
        )}
        {answered && isLast && <span className="text-sm text-zinc-400">Done — {score}/{BIGO_QUESTIONS.length} correct.</span>}
        <button type="button" onClick={reset} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-purple-500/40 hover:text-purple-300">
          <RotateCcw size={13} /> Reset
        </button>
      </div>
    </div>
  );
}

// ---- Typing Speed — type the snippet exactly, as fast as you can ---------
const TYPING_SNIPPETS = [
  'const sum = (a, b) => a + b;',
  'for (let i = 0; i < 10; i++) console.log(i);',
  'if (x > 0 && y > 0) return true;',
  'const doubled = [1, 2, 3].map(n => n * 2);',
  'function greet(name) { return `Hi, ${name}`; }',
  'const isEven = n => n % 2 === 0;',
];

function TypingSpeedGame() {
  const pickSnippet = () => TYPING_SNIPPETS[Math.floor(Math.random() * TYPING_SNIPPETS.length)];
  const [snippet, setSnippet] = useState(pickSnippet);
  const [typed, setTyped] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [result, setResult] = useState(null);
  const [best, setBest] = useState(null);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    if (result) return;
    const val = e.target.value;
    const t0 = startTime || (val.length > 0 ? Date.now() : null);
    if (!startTime && val.length > 0) setStartTime(t0);
    setTyped(val);
    if (val === snippet) {
      const elapsedMs = Math.max(Date.now() - (t0 || Date.now()), 200);
      const minutes = elapsedMs / 60000;
      const words = snippet.length / 5;
      const wpm = Math.max(1, Math.round(words / minutes));
      setResult({ wpm, seconds: (elapsedMs / 1000).toFixed(1) });
      setBest((b) => (b === null ? wpm : Math.max(b, wpm)));
    }
  };

  const reset = () => {
    setSnippet(pickSnippet());
    setTyped('');
    setStartTime(null);
    setResult(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div className="max-w-xl">
      <div className="grid grid-cols-2 gap-2 mb-4 max-w-xs">
        <Card label="Best WPM" value={best === null ? '—' : best} icon={Trophy} />
        <Card label="Status" value={result ? 'Done' : startTime ? 'Typing…' : 'Ready'} icon={Keyboard} />
      </div>

      <p className="text-sm text-zinc-400 mb-2">Type this snippet exactly. The timer starts on your first keystroke.</p>

      <pre className="bg-black border border-zinc-800 rounded-xl p-4 text-sm font-mono overflow-x-auto mb-3 whitespace-pre-wrap">
        {snippet.split('').map((ch, i) => {
          let cls = 'text-zinc-600';
          if (i < typed.length) cls = typed[i] === ch ? 'text-emerald-400' : 'text-red-400 bg-red-500/20';
          return <span key={i} className={cls}>{ch}</span>;
        })}
      </pre>

      <textarea
        ref={inputRef}
        value={typed}
        onChange={handleChange}
        disabled={!!result}
        rows={2}
        placeholder="Start typing here…"
        spellCheck={false}
        className="w-full px-3 py-2.5 text-sm font-mono rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
      />

      {result && (
        <div className="mt-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 flex items-center justify-between gap-3">
          <p className="text-sm text-emerald-300">{result.wpm} WPM in {result.seconds}s</p>
          <button type="button" onClick={reset} className="text-xs font-medium px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30">
            Try another
          </button>
        </div>
      )}
      {!result && (
        <button type="button" onClick={reset} className="mt-3 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-purple-500/40 hover:text-purple-300">
          <RotateCcw size={13} /> New snippet
        </button>
      )}
    </div>
  );
}

function CodingGamesPage() {
  const [tab, setTab] = useState('output');
  return (
    <div>
      <PageHeader title="Mini Coding Games" sub="Sharpen the muscles that read code and layouts fast." badge="Code Practice" />
      <PillTabs
        tabs={[
          { id: 'output', label: 'Guess the Output', icon: Code2 },
          { id: 'css', label: 'CSS Layout Challenge', icon: Layers },
          { id: 'debug', label: 'Debug the Code', icon: Bug },
          { id: 'bigo', label: 'Big-O Guess', icon: Activity },
          { id: 'typing', label: 'Typing Speed', icon: Keyboard },
        ]}
        active={tab}
        onChange={setTab}
      />
      {tab === 'output' && <OutputQuiz />}
      {tab === 'css' && <CssChallenge />}
      {tab === 'debug' && <DebugQuiz />}
      {tab === 'bigo' && <BigOQuiz />}
      {tab === 'typing' && <TypingSpeedGame />}
    </div>
  );
}

// ============================================================================
// PAGE: POMODORO TIMER (feature 3)
// ============================================================================
const POMODORO_DURATIONS = { work: 25 * 60, break: 5 * 60 };

function PomodoroPage() {
  const [mode, setMode] = useState('work');
  const [secondsLeft, setSecondsLeft] = useState(POMODORO_DURATIONS.work);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    if (!running) return undefined;
    if (secondsLeft <= 0) {
      setRunning(false);
      const nextMode = mode === 'work' ? 'break' : 'work';
      if (mode === 'work') setCompleted((c) => c + 1);
      setMode(nextMode);
      setSecondsLeft(POMODORO_DURATIONS[nextMode]);
      return undefined;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [running, secondsLeft, mode]);

  const toggleRunning = () => setRunning((r) => !r);
  const resetTimer = () => {
    setRunning(false);
    setSecondsLeft(POMODORO_DURATIONS[mode]);
  };
  const switchMode = (m) => {
    setMode(m);
    setRunning(false);
    setSecondsLeft(POMODORO_DURATIONS[m]);
  };

  const total = POMODORO_DURATIONS[mode];
  const pct = Math.round(((total - secondsLeft) / total) * 100);
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');
  const accent = mode === 'work' ? '#a855f7' : '#34d399';

  return (
    <div>
      <PageHeader title="Pomodoro Timer" sub="25 minutes of focus, 5 minutes to breathe." badge="Focus" />

      <PillTabs
        tabs={[
          { id: 'work', label: 'Work · 25:00', icon: TimerIcon },
          { id: 'break', label: 'Break · 5:00', icon: Coffee },
        ]}
        active={mode}
        onChange={switchMode}
      />

      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center max-w-md">
        <TimerRing pct={pct} label={`${mm}:${ss}`} accent={accent} />

        <div className="flex items-center gap-2 mt-6">
          <button
            type="button"
            onClick={toggleRunning}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-br from-purple-500 to-violet-600 text-white hover:opacity-90"
          >
            {running ? <Pause size={15} /> : <Play size={15} />}
            {running ? 'Pause' : 'Start'}
          </button>
          <button
            type="button"
            onClick={resetTimer}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-purple-500/40 hover:text-purple-300"
          >
            <RotateCcw size={15} /> Reset
          </button>
        </div>

        <p className="text-xs text-zinc-500 mt-4">
          {mode === 'work' ? 'Focus mode — no distractions.' : 'Break mode — step away from the screen.'}
        </p>
      </div>

      <div className="mt-4 max-w-md">
        <Card label="Pomodoros completed today" value={completed} icon={Trophy} />
      </div>
    </div>
  );
}

// ============================================================================
// PAGE: INTEGRATIONS (feature 4)
// ============================================================================
// ---- Configure these with your own profile info ----
const GITHUB_USERNAME = 'octocat';
const LEETCODE_USERNAME = 'leetcode';
const LINKEDIN_NAME = 'Krishna';
const LINKEDIN_HEADLINE = 'Computer Science Student';
const LINKEDIN_URL = 'https://www.linkedin.com/in/your-profile';

const MOCK_REPOS = [
  { name: 'dsa-practice', description: 'Daily data structures & algorithms practice.', language: 'C++', stars: 12, forks: 3 },
  { name: 'dstl-notes', description: 'POSETs, lattices, and set theory notes.', language: 'Markdown', stars: 4, forks: 1 },
  { name: 'coa-simulator', description: 'A small computer organization pipeline simulator.', language: 'Python', stars: 8, forks: 2 },
];

const LANGUAGE_COLORS = {
  JavaScript: '#eab308',
  TypeScript: '#3b82f6',
  Python: '#22c55e',
  'C++': '#a855f7',
  Java: '#f97316',
  Markdown: '#71717a',
};

function GitHubCard() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState(MOCK_REPOS);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=5`),
        ]);
        if (!profileRes.ok || !reposRes.ok) throw new Error('GitHub API request failed');
        const profileData = await profileRes.json();
        const reposData = await reposRes.json();
        if (!cancelled) {
          setProfile(profileData);
          setRepos(
            reposData.map((r) => ({
              name: r.name,
              description: r.description || 'No description provided.',
              language: r.language || 'Unknown',
              stars: r.stargazers_count,
              forks: r.forks_count,
            }))
          );
          setUsingMock(false);
        }
      } catch (err) {
        if (!cancelled) {
          setUsingMock(true);
          setRepos(MOCK_REPOS);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const weeks = 20;
  const grid = Array.from({ length: weeks }, () =>
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
  );
  const shades = ['#18181b', '#3b0764', '#6b21a8', '#a855f7', '#e9d5ff'];

  return (
    <div className="bg-zinc-900/60 rounded-xl border border-zinc-800 p-5 max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.login} className="w-full h-full object-cover" />
            ) : (
              <Github size={18} className="text-zinc-400" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-white">{profile?.login || GITHUB_USERNAME}</p>
            <p className="text-xs text-zinc-500">
              {loading ? 'Loading…' : usingMock ? 'Showing sample data (API unreachable)' : `${profile?.public_repos ?? '—'} public repos`}
            </p>
          </div>
        </div>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-xs font-medium text-purple-300 hover:text-purple-200"
        >
          View profile <ExternalLink size={12} />
        </a>
      </div>

      <p className="text-xs text-zinc-500 mb-2">Contribution activity (stylized preview)</p>
      <div className="flex gap-[3px] overflow-x-auto pb-3 mb-4">
        {grid.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((intensity, di) => (
              <div key={di} className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: shades[intensity] }} />
            ))}
          </div>
        ))}
      </div>

      <p className="text-xs text-zinc-500 mb-2">Recent repositories</p>
      <div className="space-y-2">
        {repos.map((r) => (
          <div key={r.name} className="bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5">
            <div className="flex items-center justify-between gap-2 mb-1">
              <p className="text-sm font-medium text-zinc-200 truncate">{r.name}</p>
              <div className="flex items-center gap-3 text-xs text-zinc-500 shrink-0">
                <span className="flex items-center gap-1"><Star size={11} /> {r.stars}</span>
                <span className="flex items-center gap-1"><GitFork size={11} /> {r.forks}</span>
              </div>
            </div>
            <p className="text-xs text-zinc-500 truncate mb-1.5">{r.description}</p>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-zinc-400">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: LANGUAGE_COLORS[r.language] || '#71717a' }} />
              {r.language}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const MOCK_LEETCODE_STATS = {
  totalSolved: 187,
  easySolved: 92,
  mediumSolved: 78,
  hardSolved: 17,
  ranking: 452301,
  acceptanceRate: 61.4,
};

function LeetCodeCard() {
  const [stats, setStats] = useState(MOCK_LEETCODE_STATS);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`);
        if (!res.ok) throw new Error('LeetCode stats request failed');
        const data = await res.json();
        if (!cancelled && data.status === 'success') {
          setStats({
            totalSolved: data.totalSolved,
            easySolved: data.easySolved,
            mediumSolved: data.mediumSolved,
            hardSolved: data.hardSolved,
            ranking: data.ranking,
            acceptanceRate: data.acceptanceRate,
          });
          setUsingMock(false);
        }
      } catch (err) {
        if (!cancelled) setUsingMock(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const bars = [
    { label: 'Easy', value: stats.easySolved, color: '#34d399' },
    { label: 'Medium', value: stats.mediumSolved, color: '#facc15' },
    { label: 'Hard', value: stats.hardSolved, color: '#f87171' },
  ];
  const maxVal = Math.max(...bars.map((b) => b.value), 1);

  return (
    <div className="bg-zinc-900/60 rounded-xl border border-zinc-800 p-5 max-w-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-white">{LEETCODE_USERNAME}</p>
          <p className="text-xs text-zinc-500">
            {loading ? 'Loading…' : usingMock ? 'Showing sample data (API unreachable)' : `Rank #${stats.ranking?.toLocaleString?.() ?? stats.ranking}`}
          </p>
        </div>
        <a
          href={`https://leetcode.com/${LEETCODE_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-xs font-medium text-purple-300 hover:text-purple-200"
        >
          View profile <ExternalLink size={12} />
        </a>
      </div>

      <div className="flex items-center gap-4 mb-5">
        <RadialProgress value={Math.round((stats.easySolved + stats.mediumSolved + stats.hardSolved) > 0 ? stats.acceptanceRate : 0)} size={72} strokeWidth={7} />
        <div>
          <p className="text-2xl font-semibold text-white">{stats.totalSolved}</p>
          <p className="text-xs text-zinc-500">Problems solved</p>
        </div>
      </div>

      <div className="space-y-2.5">
        {bars.map((b) => (
          <div key={b.label}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-zinc-400">{b.label}</span>
              <span className="text-zinc-500">{b.value}</span>
            </div>
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${(b.value / maxVal) * 100}%`, backgroundColor: b.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LinkedInCard() {
  const initials = LINKEDIN_NAME.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="bg-zinc-900/60 rounded-xl border border-zinc-800 p-6 max-w-sm text-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 text-white flex items-center justify-center text-lg font-semibold mx-auto mb-3">
        {initials || <Users2 size={22} />}
      </div>
      <p className="text-base font-semibold text-white">{LINKEDIN_NAME}</p>
      <p className="text-sm text-zinc-500 mb-4">{LINKEDIN_HEADLINE}</p>
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[#0A66C2] text-white hover:opacity-90 transition-opacity"
      >
        <Linkedin size={15} /> View LinkedIn profile
      </a>
      <p className="text-[11px] text-zinc-600 mt-3">
        LinkedIn has no public read API, so this card links out to your profile rather than embedding live data.
      </p>
    </div>
  );
}

function IntegrationsPage() {
  const [tab, setTab] = useState('github');
  return (
    <div>
      <PageHeader title="Integrations" sub="Your coding activity and professional profile, in one place." badge="Integrations" />
      <PillTabs
        tabs={[
          { id: 'github', label: 'GitHub', icon: Github },
          { id: 'leetcode', label: 'LeetCode', icon: Code2 },
          { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
        ]}
        active={tab}
        onChange={setTab}
      />
      {tab === 'github' && <GitHubCard />}
      {tab === 'leetcode' && <LeetCodeCard />}
      {tab === 'linkedin' && <LinkedInCard />}
    </div>
  );
}

// ============================================================================
// PAGE: SETTINGS
// ============================================================================
function SettingsPage({ theme, onToggleTheme, userSession }) {
  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState(userSession?.email || 'krishna@example.com');
  const [phone, setPhone] = useState('');
  const [savedMsg, setSavedMsg] = useState(null);
  const fileInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    setSavedMsg('Changes saved.');
    setTimeout(() => setSavedMsg(null), 2500);
  };

  const isDark = theme === 'dark';

  return (
    <div>
      <PageHeader title="Settings" sub="Manage your account and appearance preferences." badge="Settings" />

      <div className="max-w-lg space-y-4">
        <div className="bg-zinc-900/60 rounded-xl border border-zinc-800 p-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-zinc-200">Dark mode</p>
            <p className="text-xs text-zinc-500 mt-0.5">
              {isDark ? 'Currently using the dark theme.' : 'Currently using the light theme.'}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={isDark}
            aria-label="Toggle dark mode"
            onClick={onToggleTheme}
            className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${isDark ? 'bg-purple-500' : 'bg-zinc-700'}`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${
                isDark ? 'translate-x-[22px]' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        <div className="bg-zinc-900/60 rounded-xl border border-zinc-800 p-4">
          <p className="text-sm font-medium text-zinc-200 mb-3">Profile picture</p>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden shrink-0">
              {avatar ? (
                <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Users2 size={22} className="text-zinc-500" />
              )}
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-purple-500/40 hover:text-purple-300 transition-colors"
              >
                <Upload size={14} /> Upload photo
              </button>
              {avatar && <p className="text-xs text-emerald-400 mt-1.5">New photo selected.</p>}
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/60 rounded-xl border border-zinc-800 p-4 space-y-3">
          <div>
            <label className="text-xs text-zinc-500 mb-1.5 block">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 text-sm rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="text-xs text-zinc-500 mb-1.5 block">Phone number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-3 py-2 text-sm rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={saveProfile}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium bg-gradient-to-br from-purple-500 to-violet-600 text-white hover:opacity-90"
            >
              <CheckCircle2 size={15} /> Save changes
            </button>
            {savedMsg && <span className="text-xs text-emerald-400">{savedMsg}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PAGE: AI ASSISTANT
// ============================================================================
function AIAssistantPage({ marks, challenges, logs, streak }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi! I can see your weekly assignments, challenges, and study log. Ask me things like \"what should I study tonight\" or \"which subject needs attention\".",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const contextSummary = () => {
    const mk = marks.map((m) => `${m.subject}: ${m.score}/${m.max}`).join(', ');
    const ch = challenges
      .map((c) => `${c.title} (${c.done ? 'done' : `${c.progress}/${c.target}`})`)
      .join(', ');
    const lg = logs.slice(0, 5).map((l) => `${l.subject} ${l.hours}h`).join(', ');
    return `Streak: ${streak} days. Weekly assignments: ${mk}. Challenges: ${ch}. Recent study log: ${lg}.`;
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const nextMessages = [...messages, { role: 'user', text }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: `You are the AI study assistant inside a college student's dashboard app called ABtalks Dash. Be concise, encouraging, and practical. Use this live data about the student when relevant: ${contextSummary()}`,
          messages: nextMessages.map((m) => ({
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content: m.text,
          })),
        }),
      });
      const data = await response.json();
      const reply = data?.content?.find((b) => b.type === 'text')?.text
        || "Sorry, I couldn't generate a response just now.";
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: "Something went wrong reaching the AI service. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    'What should I study tonight?',
    'Which subject needs the most attention?',
    'Summarize my week',
  ];

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="AI Assistant" sub="Grounded in your live assignments, challenges, and study log." badge="Powered by Claude" />

      <div
        ref={scrollRef}
        className="flex-1 min-h-[320px] max-h-[420px] overflow-y-auto bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 space-y-3 mb-3"
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-gradient-to-br from-purple-500 to-violet-600 text-white'
                  : 'bg-zinc-800 text-zinc-200'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 text-zinc-400 rounded-xl px-3.5 py-2.5 text-sm flex items-center gap-2">
              <Loader2 size={14} className="animate-spin" /> Thinking…
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setInput(s)}
            className="text-xs px-3 py-1.5 rounded-full border border-zinc-800 text-zinc-400 hover:border-purple-500/40 hover:text-purple-300"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask about your subjects, marks, or what to study…"
          className="flex-1 px-3 py-2.5 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="button"
          onClick={send}
          disabled={loading}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-br from-purple-500 to-violet-600 text-white hover:opacity-90 disabled:opacity-50"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// APP SHELL
// ============================================================================
export default function Dashboard({ theme, onToggleTheme, userSession, onLogOut }) {
  const [page, setPage] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const streak = 7;
  const bestStreak = 12;

  const [marks] = useState(initialMarks);
  const [challenges, setChallenges] = useState(initialChallenges);
  const [logs, setLogs] = useState(initialLogs);
  const [assignments, setAssignments] = useState(initialAssignments);

  const activeLabel = nav.find((n) => n.id === page)?.label ?? page;

  return (
    <div className="flex h-screen bg-black font-sans relative overflow-hidden">
      <Sidebar
        page={page}
        onNavigate={setPage}
        streak={streak}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        onLogOut={onLogOut}
      />

      <main className="flex-1 flex flex-col min-w-0 bg-black text-white">
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-zinc-800 bg-black">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="p-1.5 rounded-md text-zinc-400 hover:bg-zinc-900"
          >
            <Menu size={20} />
          </button>
          <span className="text-sm font-medium text-zinc-200">{activeLabel}</span>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {page === 'dashboard' && (
            <DashboardPage
              challenges={challenges}
              setChallenges={setChallenges}
              logs={logs}
              streak={streak}
              bestStreak={bestStreak}
              onNavigate={setPage}
            />
          )}
          {page === 'marks' && <MarksPage marks={marks} />}
          {page === 'challenges' && (
            <ChallengesPage challenges={challenges} setChallenges={setChallenges} />
          )}
          {page === 'study' && <StudyLogPage logs={logs} setLogs={setLogs} />}
          {page === 'assignments' && (
            <CodingAssignmentsPage assignments={assignments} setAssignments={setAssignments} />
          )}
          {page === 'games' && <GamesPage />}
          {page === 'coding' && <CodingGamesPage />}
          {page === 'pomodoro' && <PomodoroPage />}
          {page === 'integrations' && <IntegrationsPage />}
          {page === 'ai' && (
            <AIAssistantPage marks={marks} challenges={challenges} logs={logs} streak={streak} />
          )}
          {page === 'settings' && (
            <SettingsPage
              theme={theme}
              onToggleTheme={onToggleTheme}
              userSession={userSession}
            />
          )}
        </div>
      </main>
    </div>
  );
}
