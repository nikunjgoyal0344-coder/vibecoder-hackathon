import React, { useState, useEffect } from "react";

// ============================================================
// CHALLENGE DAY PAGE – Srashti's Implementation
// Converted from HTML to React. Route: /day/:dayNumber
// ============================================================

const DAY_TASKS = [
  "Implement a responsive navbar with logo and user info",
  "Build an interactive progress tracker with animated bar",
  "Create stat cards showing streak, XP, and completion %",
  "Build the \"Today's Brief\" card with full project description",
  "Implement the Build Requirements checklist",
  "Create the Proof of Work submission form with validation",
  "Add GitHub commit URL and LinkedIn post URL inputs",
  "Wire up the Next Day card and footer",
];

const CSS = `
  .cdp-root {
    --bg: #030303;
    --surface: #080808;
    --surface-2: #0d0d0f;
    --surface-3: #111113;
    --border: #24242a;
    --border-soft: #19191e;
    --text: #f5f5f7;
    --muted: #94949d;
    --muted-2: #666670;
    --purple: #9b5cff;
    --purple-2: #7b3ff2;
    --purple-soft: rgba(155, 92, 255, 0.12);
    --purple-border: rgba(155, 92, 255, 0.32);
    --red: #ff3038;
    --green: #23d69b;
    min-height: 100vh;
    overflow-x: hidden;
    background:
      radial-gradient(circle at 78% 8%, rgba(113, 52, 255, 0.09), transparent 28%),
      radial-gradient(circle at 10% 42%, rgba(77, 37, 170, 0.055), transparent 24%),
      #030303;
    color: #f5f5f7;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  .cdp-root::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
    background-size: 52px 52px;
    mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
  }
  .cdp-navbar {
    width: min(1140px, calc(100% - 36px));
    height: 70px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255,255,255,0.045);
  }
  .cdp-brand { display: flex; align-items: center; text-decoration: none; cursor: pointer; }
  .cdp-brand-logo {
    font-family: Inter, sans-serif; font-weight: 800; font-size: 1.25rem;
    font-style: italic; letter-spacing: -0.03em;
    display: flex; align-items: center; gap: 0;
  }
  .cdp-brand-hash { color: #BE123C; }
  .cdp-brand-name { color: #f5f5f7; }
  .cdp-nav-right { display: flex; align-items: center; gap: 9px; }
  .cdp-dashboard-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 13px; border: 1px solid #24242a; border-radius: 9px;
    background: rgba(12,12,14,0.8); color: #e8e8ec; text-decoration: none;
    font-size: 12px; font-weight: 650; cursor: pointer; transition: .2s ease;
  }
  .cdp-dashboard-btn:hover { border-color: rgba(155,92,255,0.32); background: rgba(155,92,255,0.12); color: white; }
  .cdp-dashboard-btn span { color: #9b5cff; }
  .cdp-streak {
    padding: 9px 12px; border: 1px solid #24242a; border-radius: 999px;
    color: #cfcfd6; font-size: 12px; background: rgba(255,255,255,0.018);
  }
  .cdp-avatar {
    width: 34px; height: 34px; display: grid; place-items: center;
    border-radius: 50%; border: 1px solid rgba(155,92,255,0.32);
    background: linear-gradient(145deg, #1c1230, #0f0f12);
    color: #ddd2ff; font-size: 10px; font-weight: 750;
  }
  .cdp-page {
    width: min(920px, calc(100% - 36px));
    margin: auto; padding: 46px 0 70px;
  }
  .cdp-eyebrow {
    width: fit-content; display: inline-flex; align-items: center; gap: 8px;
    margin-bottom: 14px; padding: 7px 11px;
    border: 1px solid rgba(155,92,255,0.20); border-radius: 999px;
    background: rgba(94,39,179,0.09); color: #c5a5ff;
    font-size: 10px; font-weight: 700; letter-spacing: .7px;
  }
  .cdp-eyebrow::before { content: "✦"; color: #9b5cff; font-size: 10px; }
  .cdp-title-row {
    display: flex; align-items: flex-end; justify-content: space-between; gap: 20px;
  }
  .cdp-h1 {
    font-size: clamp(48px, 8vw, 76px); line-height: .92;
    letter-spacing: -4px; font-weight: 780; margin: 0;
  }
  .cdp-h1 span { color: #9b5cff; text-shadow: 0 0 35px rgba(155,92,255,.18); }
  .cdp-status {
    padding: 7px 11px; border: 1px solid rgba(155,92,255,.35); border-radius: 999px;
    background: rgba(155,92,255,.07); color: #c8a9ff;
    font-size: 9px; font-weight: 750; letter-spacing: .7px; white-space: nowrap;
  }
  .cdp-progress { margin-top: 25px; margin-bottom: 24px; }
  .cdp-progress-info {
    display: flex; justify-content: space-between; margin-bottom: 9px;
    color: #666670; font-size: 9px; font-weight: 700; letter-spacing: .9px;
  }
  .cdp-progress-track {
    width: 100%; height: 6px; overflow: hidden; border-radius: 999px;
    background: #17171b; border: 1px solid #1f1f24;
  }
  .cdp-progress-value {
    height: 100%; border-radius: inherit;
    background: linear-gradient(90deg, #7136df, #b16bff);
    box-shadow: 0 0 18px rgba(155,92,255,.25);
    transition: width 0.6s ease;
  }
  .cdp-stats {
    display: grid; grid-template-columns: repeat(3,1fr);
    gap: 10px; margin-bottom: 18px;
  }
  .cdp-stat {
    padding: 15px 16px; border: 1px solid #24242a; border-radius: 12px;
    background: linear-gradient(145deg, rgba(15,15,17,.96), rgba(7,7,8,.96));
  }
  .cdp-stat-number { font-size: 20px; font-weight: 750; letter-spacing: -.4px; }
  .cdp-stat-label { margin-top: 5px; color: #666670; font-size: 9px; text-transform: uppercase; letter-spacing: .9px; }
  .cdp-card {
    margin-bottom: 15px; padding: 23px;
    border: 1px solid #24242a; border-radius: 15px;
    background: radial-gradient(circle at 100% 0%, rgba(155,92,255,.035), transparent 28%), rgba(10,10,11,.96);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.018);
  }
  .cdp-card-label { margin-bottom: 12px; color: #a775ff; font-size: 9px; font-weight: 750; letter-spacing: 1.4px; }
  .cdp-card-title {
    margin-bottom: 11px; font-size: clamp(24px,5vw,33px);
    line-height: 1.13; letter-spacing: -.8px; margin-top: 0;
  }
  .cdp-description { color: #94949d; font-size: 13px; line-height: 1.7; max-width: 720px; }
  .cdp-requirements { display: grid; gap: 8px; }
  .cdp-req {
    display: flex; align-items: center; gap: 11px; padding: 12px;
    border: 1px solid #1d1d22; border-radius: 9px;
    background: #080809; color: #d0d0d6; font-size: 12px;
    cursor: pointer; transition: .18s ease; user-select: none;
  }
  .cdp-req:hover { border-color: rgba(155,92,255,0.32); transform: translateX(2px); }
  .cdp-req.done { opacity: 0.6; text-decoration: line-through; }
  .cdp-check {
    width: 21px; height: 21px; flex-shrink: 0; display: grid; place-items: center;
    border-radius: 50%; font-size: 10px;
  }
  .cdp-check.unchecked {
    background: rgba(155,92,255,.10); border: 1px solid rgba(155,92,255,.28); color: #b98bff;
  }
  .cdp-check.checked {
    background: rgba(35,214,155,.15); border: 1px solid rgba(35,214,155,.4); color: #23d69b;
  }
  .cdp-proof-card {
    border-color: rgba(155,92,255,.28) !important;
    background: radial-gradient(circle at 90% 0%, rgba(155,92,255,.11), transparent 34%),
      linear-gradient(145deg, rgba(39,17,74,.22), rgba(9,9,10,.98) 46%) !important;
  }
  .cdp-proof-text { margin-bottom: 20px; color: #94949d; font-size: 12px; line-height: 1.65; }
  .cdp-field { margin-bottom: 15px; }
  .cdp-field label {
    display: flex; align-items: center; gap: 8px; margin-bottom: 7px;
    color: #dedee4; font-size: 11px; font-weight: 650;
  }
  .cdp-icon {
    width: 21px; height: 21px; display: grid; place-items: center;
    border-radius: 6px; background: #17131e; border: 1px solid #28202f;
    color: #b58aff; font-family: monospace; font-size: 8px; font-weight: bold;
  }
  .cdp-input {
    width: 100%; padding: 13px; outline: none; border: 1px solid #26262c;
    border-radius: 9px; background: #060607; color: white; font-size: 12px;
    transition: .2s; box-sizing: border-box;
  }
  .cdp-input::placeholder { color: #575761; }
  .cdp-input:focus { border-color: rgba(155,92,255,.7); box-shadow: 0 0 0 3px rgba(155,92,255,.08); }
  .cdp-submit-btn {
    width: 100%; padding: 14px; border: 1px solid rgba(190,150,255,.45);
    border-radius: 9px; background: linear-gradient(135deg, #a363ff, #7d43e7);
    color: white; font-size: 13px; font-weight: 800; cursor: pointer;
    box-shadow: 0 8px 25px rgba(104,46,196,.16); transition: .2s;
  }
  .cdp-submit-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
  .cdp-note { margin-top: 9px; text-align: center; color: #606069; font-size: 9px; }
  .cdp-success {
    display: none; margin-top: 16px; padding: 15px;
    border: 1px solid rgba(35,214,155,.25); border-radius: 10px;
    background: rgba(35,214,155,.055);
  }
  .cdp-success.active { display: block; }
  .cdp-success-title { margin-bottom: 6px; color: #23d69b; font-size: 11px; font-weight: 750; }
  .cdp-success-text { color: #94949d; font-size: 11px; }
  .cdp-next-day {
    display: flex; align-items: center; justify-content: space-between; padding: 18px;
    border: 1px solid #24242a; border-radius: 12px; background: rgba(10,10,11,.9);
    cursor: pointer; transition: .18s ease;
  }
  .cdp-next-day:hover { border-color: rgba(155,92,255,0.28); }
  .cdp-next-label { margin-bottom: 5px; color: #666670; font-size: 8px; font-weight: 700; letter-spacing: 1.2px; }
  .cdp-next-title { font-size: 14px; font-weight: 700; margin: 0; }
  .cdp-next-arrow {
    width: 36px; height: 36px; display: grid; place-items: center;
    border: 1px solid #2b2634; border-radius: 8px; color: #c09aff; background: #0e0b13;
  }
  .cdp-footer { padding-top: 27px; text-align: center; color: #4d4d55; font-size: 8px; font-weight: 650; letter-spacing: 1px; }
  @media (max-width: 600px) {
    .cdp-navbar { width: calc(100% - 28px); height: 64px; }
    .cdp-page { width: calc(100% - 28px); padding-top: 30px; }
    .cdp-h1 { font-size: 51px; letter-spacing: -3px; }
    .cdp-title-row { align-items: flex-start; flex-direction: column; gap: 11px; }
    .cdp-stats { gap: 7px; }
    .cdp-card { padding: 18px; }
  }
`;

export default function ChallengeDayPage({ dayNumber = 12, theme, setTheme, user, onNavigate }) {
  const [checkedTasks, setCheckedTasks] = useState({});
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const userInitials = user ? user.name.split(" ").map(n => n[0]).join("").substring(0,2) : "NG";
  const streakDays = user ? (user.streakDays || 18) : 18;

  const completedCount = Object.values(checkedTasks).filter(Boolean).length;
  const totalTasks = DAY_TASKS.length;
  const progressPct = Math.round((completedCount / totalTasks) * 100);

  const toggleTask = (i) => {
    setCheckedTasks(prev => ({ ...prev, [i]: !prev[i] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!githubUrl.trim() || !linkedinUrl.trim()) return;
    setSubmitted(true);
  };

  const goToDashboard = () => {
    if (onNavigate) onNavigate("/dashboard");
    else window.history.back();
  };

  const goHome = () => {
    if (onNavigate) onNavigate("/");
    else window.location.href = "/";
  };

  // Apply theme class to body
  useEffect(() => {
    if (theme === "light") document.body.classList.add("light-mode");
    else document.body.classList.remove("light-mode");
  }, [theme]);

  return (
    <>
      <style>{CSS}</style>
      <div className="cdp-root">

        {/* NAVBAR */}
        <nav className="cdp-navbar">
          <div className="cdp-brand" onClick={goHome}>
            <span className="cdp-brand-logo">
              <span className="cdp-brand-hash">#</span>
              <span className="cdp-brand-name">ABtalks</span>
            </span>
          </div>

          <div className="cdp-nav-right">
            <button className="cdp-dashboard-btn" onClick={goToDashboard}>
              <span>⬡</span> Dashboard
            </button>
            <div className="cdp-streak">
              🔥 <strong style={{ color: "#ff8a2b" }}>{streakDays} days</strong>
            </div>
            <div className="cdp-avatar">{userInitials}</div>
          </div>
        </nav>

        {/* PAGE */}
        <div className="cdp-page">

          {/* EYEBROW */}
          <div className="cdp-eyebrow">DAY {dayNumber} OF 60</div>

          {/* TITLE ROW */}
          <div className="cdp-title-row">
            <h1 className="cdp-h1">
              Day <span>{dayNumber}</span>
            </h1>
            <div className="cdp-status">● IN PROGRESS</div>
          </div>

          {/* PROGRESS */}
          <div className="cdp-progress">
            <div className="cdp-progress-info">
              <span>TODAY'S PROGRESS</span>
              <span>{completedCount} / {totalTasks} TASKS</span>
            </div>
            <div className="cdp-progress-track">
              <div className="cdp-progress-value" style={{ width: `${progressPct}%` }} />
            </div>
          </div>

          {/* STATS */}
          <div className="cdp-stats">
            <div className="cdp-stat">
              <div className="cdp-stat-number" style={{ color: "#9b5cff" }}>{streakDays}</div>
              <div className="cdp-stat-label">Day Streak 🔥</div>
            </div>
            <div className="cdp-stat">
              <div className="cdp-stat-number" style={{ color: "#23d69b" }}>{progressPct}%</div>
              <div className="cdp-stat-label">Complete Today</div>
            </div>
            <div className="cdp-stat">
              <div className="cdp-stat-number" style={{ color: "#ff8a2b" }}>{completedCount * 50}</div>
              <div className="cdp-stat-label">XP Earned</div>
            </div>
          </div>

          {/* CARD: TODAY'S BRIEF */}
          <div className="cdp-card">
            <div className="cdp-card-label">TODAY'S BUILD</div>
            <h2 className="cdp-card-title">ABTalks Challenge Day {dayNumber}: Dashboard Integration</h2>
            <p className="cdp-description">
              Today you will integrate the student dashboard with live data, connect the routing system, and build a responsive proof-of-work submission form. This full-stack challenge tests your ability to wire up React components, manage state, and create a production-ready UI that looks stunning in both dark and light modes.
            </p>
            <p className="cdp-description" style={{ marginTop: "12px" }}>
              Your build must include: authenticated routing, a working theme toggle, dynamic user data display, and a validated submission form with GitHub and LinkedIn URL inputs. Commit your changes and post on LinkedIn before midnight to protect your streak.
            </p>
          </div>

          {/* CARD: BUILD REQUIREMENTS */}
          <div className="cdp-card">
            <div className="cdp-card-label">BUILD REQUIREMENTS</div>
            <h2 className="cdp-card-title">Tasks for Day {dayNumber}</h2>
            <div className="cdp-requirements">
              {DAY_TASKS.map((task, i) => (
                <div
                  key={i}
                  className={`cdp-req${checkedTasks[i] ? " done" : ""}`}
                  onClick={() => toggleTask(i)}
                >
                  <div className={`cdp-check ${checkedTasks[i] ? "checked" : "unchecked"}`}>
                    {checkedTasks[i] ? "✓" : "○"}
                  </div>
                  {task}
                </div>
              ))}
            </div>
          </div>

          {/* CARD: PROOF OF WORK */}
          <div className="cdp-card cdp-proof-card">
            <div className="cdp-card-label">PROOF OF WORK</div>
            <h2 className="cdp-card-title">Submit Your Build</h2>
            <p className="cdp-proof-text">
              Drop your GitHub commit link and LinkedIn post URL below to lock in your Day {dayNumber} streak. Both submissions are required before midnight. Make sure your repository is public and your LinkedIn post is set to "Anyone".
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className="cdp-field">
                  <label>
                    <span className="cdp-icon">GH</span>
                    GitHub Commit URL
                  </label>
                  <input
                    className="cdp-input"
                    type="url"
                    placeholder="https://github.com/yourusername/repo/commit/abc123"
                    value={githubUrl}
                    onChange={e => setGithubUrl(e.target.value)}
                    required
                  />
                </div>
                <div className="cdp-field">
                  <label>
                    <span className="cdp-icon">Li</span>
                    LinkedIn Post URL
                  </label>
                  <input
                    className="cdp-input"
                    type="url"
                    placeholder="https://linkedin.com/posts/yourpost"
                    value={linkedinUrl}
                    onChange={e => setLinkedinUrl(e.target.value)}
                    required
                  />
                </div>
                <button className="cdp-submit-btn" type="submit">
                  ⚡ Submit Day {dayNumber} & Lock Streak
                </button>
                <p className="cdp-note">Both links must be public • Streak locks at 11:59 PM</p>
              </form>
            ) : (
              <div className="cdp-success active">
                <div className="cdp-success-title">✓ Day {dayNumber} Streak Locked!</div>
                <div className="cdp-success-text">
                  Amazing work! Your GitHub commit and LinkedIn post have been verified.
                  Your {streakDays}-day streak is safe. See you tomorrow for Day {dayNumber + 1}!
                </div>
              </div>
            )}
          </div>

          {/* NEXT DAY */}
          <div className="cdp-next-day" onClick={() => onNavigate && onNavigate(`/day/${dayNumber + 1}`)}>
            <div>
              <div className="cdp-next-label">COMING UP NEXT</div>
              <p className="cdp-next-title">Day {dayNumber + 1}: Advanced State Management & API Integration</p>
            </div>
            <div className="cdp-next-arrow">→</div>
          </div>

          {/* FOOTER */}
          <footer className="cdp-footer" style={{ marginTop: "27px" }}>
            #ABTALKS • 60-DAY CODING CHALLENGE • BUILD IN PUBLIC
          </footer>
        </div>
      </div>
    </>
  );
}