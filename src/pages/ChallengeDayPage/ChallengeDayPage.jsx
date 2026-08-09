import React, { useState, useEffect } from "react";
import {
  ArrowLeft, Sun, Moon, Flame, Code2, Trophy, CheckCircle2,
  Circle, Clock, BookOpen, Zap, Target,
  ChevronRight, Star, AlertTriangle, Lock
} from "lucide-react";
import { MOCK_USER } from "../../data/users";

// ============================================================
// CHALLENGE DAY PAGE – v1 scaffold
// Srashti's implementation will replace or extend this file.
// Route: /day/:dayNumber
// ============================================================

const SAMPLE_TASKS = [
  {
    id: 1,
    title: "Read Today's Brief",
    description: "Understand the project requirements and acceptance criteria for today's build.",
    difficulty: "Warm-up",
    xp: 20,
    completed: true,
  },
  {
    id: 2,
    title: "Set Up Project Scaffold",
    description: "Initialize the repo, install dependencies, and create the folder structure.",
    difficulty: "Easy",
    xp: 40,
    completed: true,
  },
  {
    id: 3,
    title: "Build Core Feature",
    description: "Implement the main functionality of today's challenge using the given stack.",
    difficulty: "Medium",
    xp: 80,
    completed: false,
  },
  {
    id: 4,
    title: "Write Tests",
    description: "Add at least 3 unit tests covering your core feature logic.",
    difficulty: "Medium",
    xp: 60,
    completed: false,
  },
  {
    id: 5,
    title: "Push to GitHub & Post on LinkedIn",
    description: "Commit your work with a meaningful message and share your learning on LinkedIn.",
    difficulty: "Streak",
    xp: 100,
    completed: false,
  },
];

const DIFFICULTY_COLORS = {
  "Warm-up": "#10B981",
  "Easy": "#06B6D4",
  "Medium": "#F59E0B",
  "Hard": "#EF4444",
  "Streak": "#8B5CF6",
};

export default function ChallengeDayPage({ dayNumber = 12, theme = "dark", setTheme, user, onNavigate }) {
  const [tasks, setTasks] = useState(SAMPLE_TASKS);
  const [timeLeft, setTimeLeft] = useState(null);

  const userData = user || MOCK_USER;
  const completedCount = tasks.filter(t => t.completed).length;
  const totalXP = tasks.filter(t => t.completed).reduce((sum, t) => sum + t.xp, 0);

  // Countdown to midnight
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(23, 59, 59, 999);
      const diff = midnight - now;
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Apply theme class
  useEffect(() => {
    if (theme === "light") document.body.classList.add("light-mode");
    else document.body.classList.remove("light-mode");
  }, [theme]);

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="app-container" style={{ minHeight: "100vh" }}>

      {/* HEADER */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1.5px solid var(--border-color)",
        padding: "12px 0",
        background: "rgba(var(--bg-main-rgb), 0.85)"
      }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Back button */}
            <button
              onClick={() => onNavigate ? onNavigate("/dashboard") : window.history.back()}
              style={{
                background: "var(--bg-input)", border: "1.5px solid var(--border-color)",
                borderRadius: "8px", padding: "6px 12px", color: "var(--text-secondary)",
                cursor: "pointer", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "6px"
              }}
            >
              <ArrowLeft size={14} /> Back
            </button>

            {/* Logo */}
            <div style={{
              fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "1.1rem",
              fontStyle: "italic", letterSpacing: "-0.03em", cursor: "pointer"
            }} onClick={() => onNavigate && onNavigate("/")}>
              <span style={{ color: "#BE123C" }}>#</span>
              <span style={{ color: "var(--text-primary)" }}>ABtalks</span>
            </div>

            <span style={{
              background: "var(--primary-glow)", border: "1px solid var(--primary)",
              borderRadius: "6px", padding: "2px 10px", fontSize: "0.72rem",
              fontWeight: 700, color: "var(--primary)"
            }}>
              Day {dayNumber}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Time to midnight */}
            {timeLeft && (
              <div style={{
                display: "flex", alignItems: "center", gap: "6px",
                background: "var(--bg-input)", border: "1.5px solid var(--border-color)",
                borderRadius: "8px", padding: "5px 12px", fontSize: "0.8rem",
                color: "var(--text-secondary)", fontFamily: "monospace"
              }}>
                <Clock size={13} />
                {timeLeft} left
              </div>
            )}

            {/* Theme toggle */}
            <button
              onClick={() => setTheme && setTheme(theme === "dark" ? "light" : "dark")}
              style={{
                background: "var(--bg-input)", border: "1.5px solid var(--border-color)",
                borderRadius: "8px", width: "36px", height: "36px",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--text-primary)", cursor: "pointer"
              }}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: "32px 0 60px" }}>

        {/* Day title */}
        <div style={{ marginBottom: "28px" }} className="reveal reveal-up">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <Flame size={20} style={{ color: "var(--primary)" }} />
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>
              🔥 {userData.streakDays} Day Streak
            </span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700,
            background: "linear-gradient(135deg, var(--text-primary) 50%, var(--primary) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            marginBottom: "8px"
          }}>
            Day {dayNumber}: Build & Ship
          </h1>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", maxWidth: "600px" }}>
            Today's challenge is to design, build, and deploy a feature end-to-end.
            Complete all tasks before midnight to protect your streak.
          </p>
        </div>

        <div className="rpi-grid">

          {/* LEFT: Task list */}
          <div className="col-8">
            <div className="glass-card" style={{ padding: "24px", border: "1.5px solid var(--border-color)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <BookOpen size={18} style={{ color: "var(--primary)" }} /> Today's Tasks
                </h2>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  {completedCount}/{tasks.length} done · {totalXP} XP earned
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    style={{
                      display: "flex", gap: "14px", alignItems: "flex-start",
                      background: task.completed ? "rgba(16,185,129,0.05)" : "var(--bg-input)",
                      border: `1.5px solid ${task.completed ? "rgba(16,185,129,0.3)" : "var(--border-color)"}`,
                      borderRadius: "10px", padding: "14px 16px",
                      cursor: "pointer", transition: "all 0.2s ease",
                    }}
                  >
                    <div style={{ marginTop: "2px", color: task.completed ? "#10B981" : "var(--text-muted)", flexShrink: 0 }}>
                      {task.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                        <h4 style={{
                          fontSize: "0.88rem", fontWeight: 700,
                          color: task.completed ? "var(--text-muted)" : "var(--text-primary)",
                          textDecoration: task.completed ? "line-through" : "none"
                        }}>
                          {task.title}
                        </h4>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{
                            fontSize: "0.64rem", fontWeight: 700,
                            background: `${DIFFICULTY_COLORS[task.difficulty]}20`,
                            color: DIFFICULTY_COLORS[task.difficulty],
                            border: `1px solid ${DIFFICULTY_COLORS[task.difficulty]}40`,
                            borderRadius: "4px", padding: "2px 8px"
                          }}>
                            {task.difficulty}
                          </span>
                          <span style={{ fontSize: "0.7rem", color: "var(--primary)", fontWeight: 600 }}>
                            +{task.xp} XP
                          </span>
                        </div>
                      </div>
                      <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: "1.4" }}>
                        {task.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Progress sidebar */}
          <div className="col-4" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Progress */}
            <div className="rpi-card" style={{ padding: "20px" }}>
              <span className="rpi-card-tag">Today's Progress</span>
              <div style={{
                fontSize: "2.5rem", fontWeight: 800, fontFamily: "var(--font-display)",
                color: "var(--text-primary)", margin: "10px 0 4px"
              }}>
                {Math.round((completedCount / tasks.length) * 100)}%
              </div>
              <div style={{ width: "100%", height: "6px", background: "var(--bg-main)", borderRadius: "4px", marginBottom: "12px" }}>
                <div style={{
                  width: `${(completedCount / tasks.length) * 100}%`,
                  height: "100%", borderRadius: "4px",
                  background: "linear-gradient(90deg, var(--primary), var(--secondary))",
                  transition: "width 0.4s ease"
                }} />
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                {tasks.length - completedCount} tasks remaining · {totalXP} XP earned
              </p>
            </div>

            {/* XP Card */}
            <div className="rpi-card" style={{ padding: "20px" }}>
              <span className="rpi-card-tag" style={{ color: "var(--secondary)" }}>Streak</span>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px 0" }}>
                <Flame size={28} style={{ color: "var(--primary)" }} />
                <div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--text-primary)", lineHeight: 1 }}>
                    {userData.streakDays}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>days on fire</div>
                </div>
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                Complete today to reach Day {userData.streakDays + 1}!
              </div>
            </div>

            {/* Submit CTA */}
            <button
              className="btn-primary"
              style={{ width: "100%", opacity: completedCount === tasks.length ? 1 : 0.5, cursor: completedCount === tasks.length ? "pointer" : "not-allowed" }}
              disabled={completedCount !== tasks.length}
            >
              <Zap size={16} />
              {completedCount === tasks.length ? "Submit Day & Lock Streak" : `Complete All ${tasks.length} Tasks First`}
            </button>

            {/* Link back to dashboard */}
            <button
              onClick={() => onNavigate ? onNavigate("/dashboard") : window.history.back()}
              className="btn-secondary"
              style={{ width: "100%", justifyContent: "center", fontSize: "0.8rem" }}
            >
              <ArrowLeft size={14} /> Back to Dashboard
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
