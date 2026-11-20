"use client";

import React, { useState } from "react";
import { USERS, INITIAL_ISSUES, User } from "@/lib/data";
import {
  Settings,
  Users,
  Shield,
  Activity,
  Database,
  Download,
  Plus,
  Check,
  RefreshCw,
} from "lucide-react";

export default function SettingsPage() {
  const [team, setTeam] = useState<User[]>(USERS);
  const [activeSchemaTab, setActiveSchemaTab] = useState<"Workspace" | "Issue" | "Sprint">("Issue");
  const [wsLatency, setWsLatency] = useState<number>(14);
  const [isPinging, setIsPinging] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<User["role"]>("Member");

  const handleRoleChange = (userId: string, nextRole: User["role"]) => {
    setTeam((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: nextRole } : u))
    );
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    const namePart = inviteEmail.split("@")[0];
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: namePart.charAt(0).toUpperCase() + namePart.slice(1),
      email: inviteEmail,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
      role: inviteRole,
    };
    setTeam([...team, newUser]);
    setInviteEmail("");
  };

  const pingWebSockets = () => {
    setIsPinging(true);
    setTimeout(() => {
      setWsLatency(Math.floor(12 + Math.random() * 8));
      setIsPinging(false);
    }, 600);
  };

  const handleExportJSON = () => {
    const data = {
      workspace: "Acme Corp Core",
      exportedAt: new Date().toISOString(),
      team,
      issues: INITIAL_ISSUES,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pulse-workspace-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-8 mb-8">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
            Administration & Governance
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Workspace Settings</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage team members, RBAC security roles, real-time edge telemetry, and Prisma schemas
          </p>
        </div>

        <div className="space-y-8">
          {/* Workspace Details */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-sm font-semibold text-white">General Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Organization Name</label>
                <input
                  type="text"
                  readOnly
                  value="Acme Corp Global"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Workspace Slug</label>
                <input
                  type="text"
                  readOnly
                  value="acme-engineering-core"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Active Subscription Plan</label>
                <div className="px-3 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400 font-semibold font-mono flex items-center justify-between">
                  <span>Pro Team ($12/user)</span>
                  <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members & RBAC */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span>Team Directory & RBAC Roles ({team.length})</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Role-based access control enforced via signed JWT claims
                </p>
              </div>

              {/* Invite Form */}
              <form onSubmit={handleInvite} className="flex gap-2">
                <input
                  type="email"
                  placeholder="colleague@acme.dev"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Invite</span>
                </button>
              </form>
            </div>

            <div className="divide-y divide-slate-800/80 rounded-2xl border border-slate-800 overflow-hidden bg-slate-950">
              {team.map((user) => (
                <div key={user.id} className="p-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover bg-slate-800" />
                    <div>
                      <p className="font-semibold text-white">{user.name}</p>
                      <p className="text-slate-400 font-mono text-[11px]">{user.email}</p>
                    </div>
                  </div>

                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                    className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none"
                  >
                    <option value="Owner">Owner</option>
                    <option value="Admin">Admin</option>
                    <option value="Member">Member</option>
                    <option value="Guest">Guest</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* WebSockets Edge Telemetry */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Live WebSockets Edge Health</h3>
                <p className="text-xs text-slate-400">
                  Global edge transport with SSE fallback (Frankfurt Node #04)
                </p>
                <div className="mt-1 flex items-center gap-3 text-xs font-mono">
                  <span className="text-emerald-400 font-bold">{wsLatency} ms ping</span>
                  <span className="text-slate-500">• 4 peers connected</span>
                </div>
              </div>
            </div>

            <button
              onClick={pingWebSockets}
              disabled={isPinging}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-2 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? "animate-spin" : ""}`} />
              <span>Ping Edge Cluster</span>
            </button>
          </div>

          {/* Prisma PostgreSQL Schema Viewer */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Prisma PostgreSQL Schema</h3>
                  <p className="text-xs text-slate-400">Multi-tenant relational architecture</p>
                </div>
              </div>

              <div className="flex gap-2">
                {(["Issue", "Sprint", "Workspace"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveSchemaTab(tab)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition ${
                      activeSchemaTab === tab
                        ? "bg-purple-600 text-white"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
              {activeSchemaTab === "Issue" && (
                <pre>{`model Issue {
  id          String   @id @default(uuid())
  identifier  String   @unique // e.g. ENG-104
  title       String
  description String?
  status      String   @default("TODO") // BACKLOG, TODO, IN_PROGRESS, IN_REVIEW, DONE
  priority    String   @default("MEDIUM") // URGENT, HIGH, MEDIUM, LOW
  points      Int      @default(3)
  projectId   String
  project     Project  @relation(fields: [projectId], references: [id])
  sprintId    String?
  sprint      Sprint?  @relation(fields: [sprintId], references: [id])
  assigneeId  String?
  assignee    User?    @relation(fields: [assigneeId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}`}</pre>
              )}
              {activeSchemaTab === "Sprint" && (
                <pre>{`model Sprint {
  id        String    @id @default(uuid())
  name      String
  goal      String?
  status    String    @default("ACTIVE") // PLANNED, ACTIVE, COMPLETED
  startDate DateTime
  endDate   DateTime
  projectId String
  project   Project   @relation(fields: [projectId], references: [id])
  issues    Issue[]
  createdAt DateTime  @default(now())
}`}</pre>
              )}
              {activeSchemaTab === "Workspace" && (
                <pre>{`model Workspace {
  id        String    @id @default(uuid())
  name      String
  slug      String    @unique
  plan      String    @default("PRO")
  users     User[]
  projects  Project[]
  createdAt DateTime  @default(now())
}`}</pre>
              )}
            </div>
          </div>

          {/* Export JSON */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Telemetry & Issue Export</h3>
              <p className="text-xs text-slate-400">Download active tickets, team roster, and burndown history in JSON</p>
            </div>

            <button
              onClick={handleExportJSON}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition shadow-md shadow-indigo-600/20"
            >
              <Download className="w-4 h-4" />
              <span>Export Workspace JSON</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
