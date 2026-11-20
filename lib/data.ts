export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "Owner" | "Admin" | "Member" | "Guest";
}

export interface Issue {
  id: string;
  key: string;
  title: string;
  description: string;
  status: "BACKLOG" | "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
  priority: "Urgent" | "High" | "Medium" | "Low";
  points: number;
  assignee: User;
  labels: string[];
  createdAt: string;
}

export interface Epic {
  id: string;
  title: string;
  quarter: "Q1 2026" | "Q2 2026" | "Q3 2026" | "Q4 2026";
  progress: number;
  status: "On Track" | "At Risk" | "In Review" | "Completed";
  lead: string;
  totalPoints: number;
  completedPoints: number;
  color: string;
}

export const USERS: User[] = [
  {
    id: "usr-1",
    name: "Alex Mercer",
    email: "alex@acme.dev",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    role: "Owner",
  },
  {
    id: "usr-2",
    name: "Sarah Chen",
    email: "sarah.c@acme.dev",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80",
    role: "Admin",
  },
  {
    id: "usr-3",
    name: "Devon Reed",
    email: "devon.r@acme.dev",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    role: "Member",
  },
  {
    id: "usr-4",
    name: "Elena Rostova",
    email: "elena@acme.dev",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    role: "Member",
  },
];

export const INITIAL_ISSUES: Issue[] = [
  {
    id: "iss-101",
    key: "ENG-101",
    title: "Implement distributed Redis lock for checkout concurrency",
    description: "Prevent double-spending during flash sales by instrumenting Redlock algorithm across Redis edge nodes.",
    status: "DONE",
    priority: "Urgent",
    points: 8,
    assignee: USERS[0],
    labels: ["Backend", "Performance"],
    createdAt: "3 days ago",
  },
  {
    id: "iss-102",
    key: "ENG-102",
    title: "Upgrade to Next.js 15 Turbopack production compiler",
    description: "Benchmark CI/CD cold build times and resolve font optimization deprecations.",
    status: "DONE",
    priority: "High",
    points: 5,
    assignee: USERS[1],
    labels: ["DevOps", "Next.js"],
    createdAt: "2 days ago",
  },
  {
    id: "iss-103",
    key: "ENG-103",
    title: "Add WebSockets multi-cursor presence awareness",
    description: "Stream pointer coordinates and user avatar tags across shared Kanban columns.",
    status: "IN_REVIEW",
    priority: "Urgent",
    points: 8,
    assignee: USERS[2],
    labels: ["WebSockets", "UI/UX"],
    createdAt: "Yesterday",
  },
  {
    id: "iss-104",
    key: "ENG-104",
    title: "Integrate Stripe billing webhooks with automatic retries",
    description: "Handle customer.subscription.updated and failed invoice fallback grace periods.",
    status: "IN_PROGRESS",
    priority: "High",
    points: 5,
    assignee: USERS[0],
    labels: ["Billing", "Stripe"],
    createdAt: "Yesterday",
  },
  {
    id: "iss-105",
    key: "ENG-105",
    title: "Refactor database connection pooler to Supabase PgBouncer",
    description: "Alleviate connection spikes during automated cron synchronization jobs.",
    status: "IN_PROGRESS",
    priority: "Medium",
    points: 3,
    assignee: USERS[3],
    labels: ["PostgreSQL", "Database"],
    createdAt: "Today",
  },
  {
    id: "iss-106",
    key: "ENG-106",
    title: "Build CSV & JSON sprint velocity telemetry exporter",
    description: "Allow engineering directors to export raw burndown telemetry into BigQuery/Sheets.",
    status: "TODO",
    priority: "Medium",
    points: 3,
    assignee: USERS[1],
    labels: ["Analytics", "Export"],
    createdAt: "Today",
  },
  {
    id: "iss-107",
    key: "ENG-107",
    title: "Implement zero-trust RBAC permissions middleware",
    description: "Enforce strict tenant scoping on API routes with signed JWT claims.",
    status: "TODO",
    priority: "High",
    points: 5,
    assignee: USERS[2],
    labels: ["Security", "Auth"],
    createdAt: "Today",
  },
  {
    id: "iss-108",
    key: "ENG-108",
    title: "Support dark mode CSS variables across all email templates",
    description: "Ensure transactional notification emails render crisply in Outlook and Apple Mail.",
    status: "BACKLOG",
    priority: "Low",
    points: 2,
    assignee: USERS[3],
    labels: ["Design", "Email"],
    createdAt: "4 days ago",
  },
  {
    id: "iss-109",
    key: "ENG-109",
    title: "Add offline IndexedDB synchronization for mobile PWA",
    description: "Queue optimistic issue mutations when offline and replay on reconnection.",
    status: "BACKLOG",
    priority: "Medium",
    points: 8,
    assignee: USERS[0],
    labels: ["PWA", "Mobile"],
    createdAt: "5 days ago",
  },
];

export const EPICS: Epic[] = [
  {
    id: "ep-1",
    title: "Real-time Multi-tenant Sync Engine",
    quarter: "Q1 2026",
    progress: 88,
    status: "Completed",
    lead: "Alex Mercer",
    totalPoints: 64,
    completedPoints: 56,
    color: "#6366f1",
  },
  {
    id: "ep-2",
    title: "Enterprise RBAC & SSO SAML Integration",
    quarter: "Q2 2026",
    progress: 65,
    status: "On Track",
    lead: "Sarah Chen",
    totalPoints: 80,
    completedPoints: 52,
    color: "#10b981",
  },
  {
    id: "ep-3",
    title: "AI-Powered Sprint Burndown & Copilot",
    quarter: "Q3 2026",
    progress: 35,
    status: "At Risk",
    lead: "Devon Reed",
    totalPoints: 95,
    completedPoints: 33,
    color: "#f59e0b",
  },
  {
    id: "ep-4",
    title: "Native iOS & Android Collaboration Clients",
    quarter: "Q4 2026",
    progress: 12,
    status: "On Track",
    lead: "Elena Rostova",
    totalPoints: 120,
    completedPoints: 14,
    color: "#8b5cf6",
  },
];

export const BURNDOWN_DATA = [
  { day: "Day 1", ideal: 45, actual: 45 },
  { day: "Day 2", ideal: 40, actual: 44 },
  { day: "Day 3", ideal: 36, actual: 39 },
  { day: "Day 4", ideal: 31, actual: 33 },
  { day: "Day 5", ideal: 27, actual: 30 },
  { day: "Day 6", ideal: 22, actual: 24 },
  { day: "Day 7", ideal: 18, actual: 19 },
  { day: "Day 8", ideal: 13, actual: 15 },
  { day: "Day 9", ideal: 9, actual: 8 },
  { day: "Day 10", ideal: 0, actual: 2 },
];

export const VELOCITY_HISTORY = [
  { sprint: "Sprint 41", committed: 42, completed: 38 },
  { sprint: "Sprint 42", committed: 45, completed: 44 },
  { sprint: "Sprint 43", committed: 48, completed: 46 },
  { sprint: "Sprint 44", committed: 50, completed: 49 },
  { sprint: "Sprint 45", committed: 52, completed: 51 },
  { sprint: "Sprint 46", committed: 55, completed: 54 },
];

export const ISSUE_DISTRIBUTION = [
  { name: "Features", value: 45, fill: "#6366f1" },
  { name: "Bugs", value: 20, fill: "#ef4444" },
  { name: "DevOps & Inf", value: 20, fill: "#10b981" },
  { name: "Tech Debt", value: 15, fill: "#f59e0b" },
];
