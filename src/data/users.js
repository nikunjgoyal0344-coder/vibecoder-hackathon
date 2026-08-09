// Shared mock user data consumed by Dashboard and Challenge Day pages

export const MOCK_USER = {
  id: "user_001",
  name: "Nikunj Goyal",
  email: "nikunj@college.edu",
  avatar: "NG",
  track: "60-Day Challenge",
  streakDays: 18,
  totalDays: 60,
  vibePasses: 2,
  githubUrl: "https://github.com/nikunjgoyal0344-coder",
  linkedinUrl: "https://linkedin.com",
  joinedAt: "2026-07-22",
  milestones: [
    { id: 1, title: "Day 15 Review", completed: true, reward: "Streak Starter Badge" },
    { id: 2, title: "Day 30 Review", completed: false, reward: "Mid-Way Champion" },
    { id: 3, title: "Day 60 Review", completed: false, reward: "Proof-of-Work Certificate" },
  ],
  commitHistory: [
    { day: "Day 13", commits: 2 },
    { day: "Day 14", commits: 1 },
    { day: "Day 15", commits: 3 },
    { day: "Day 16", commits: 2 },
    { day: "Day 17", commits: 4 },
    { day: "Day 18", commits: 1 },
    { day: "Today", commits: 0 },
  ],
};

export const LEADERBOARD = [
  { rank: 1, name: "Aarav Sharma", streak: 60, city: "Bengaluru", avatar: "AS" },
  { rank: 2, name: "Tanvi Rao", streak: 58, city: "Pune", avatar: "TR" },
  { rank: 3, name: "Kabir Mehta", streak: 54, city: "Delhi NCR", avatar: "KM" },
  { rank: 4, name: "Riya Singh", streak: 51, city: "Mumbai", avatar: "RS" },
  { rank: 5, name: "Nikunj Goyal", streak: 18, city: "Jaipur", avatar: "NG", isCurrentUser: true },
];
