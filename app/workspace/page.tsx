"use client";

import React, { useState } from "react";
import { INITIAL_ISSUES, USERS, Issue, User } from "@/lib/data";
import {
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreVertical,
  Activity,
  ArrowRight,
  User as UserIcon,
} from "lucide-react";

export default function WorkspacePage() {
  const [issues, setIssues] = useState<Issue[]>(INITIAL_ISSUES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAssignee, setSelectedAssignee] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  React.useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        try {
          const stored = localStorage.getItem("pulse_issues");
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setIssues(parsed);
              return;
            }
          }
          if (data.issues && Array.isArray(data.issues)) {
            setIssues(data.issues);
          }
        } catch (e) {
          if (data.issues) setIssues(data.issues);
        }
      })
      .catch(() => {
        try {
          const stored = localStorage.getItem("pulse_issues");
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) setIssues(parsed);
          }
        } catch (e) {}
      });
  }, []);

  const saveIssues = (updated: Issue[]) => {
    setIssues(updated);
    try {
      localStorage.setItem("pulse_issues", JSON.stringify(updated));
    } catch (e) {}
  };

  // New Issue Form State
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newStatus, setNewStatus] = useState<Issue["status"]>("TODO");
  const [newPriority, setNewPriority] = useState<Issue["priority"]>("Medium");
  const [newPoints, setNewPoints] = useState<number>(3);
  const [newAssigneeId, setNewAssigneeId] = useState<string>(USERS[0].id);

  const columns: { id: Issue["status"]; title: string; color: string }[] = [
    { id: "BACKLOG", title: "Backlog", color: "border-slate-700" },
    { id: "TODO", title: "To Do", color: "border-indigo-500/40" },
    { id: "IN_PROGRESS", title: "In Progress", color: "border-amber-500/40" },
    { id: "IN_REVIEW", title: "Code Review", color: "border-sky-500/40" },
    { id: "DONE", title: "Done", color: "border-emerald-500/40" },
  ];

  const filteredIssues = issues.filter((iss) => {
    if (selectedAssignee !== "all" && iss.assignee.id !== selectedAssignee) return false;
    if (selectedPriority !== "all" && iss.priority !== selectedPriority) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const mTitle = iss.title.toLowerCase().includes(q);
      const mKey = iss.key.toLowerCase().includes(q);
      if (!mTitle && !mKey) return false;
    }
    return true;
  });

  const handleMoveStatus = (issueId: string, nextStatus: Issue["status"]) => {
    const updatedIssues = issues.map((iss) => (iss.id === issueId ? { ...iss, status: nextStatus } : iss));
    saveIssues(updatedIssues);
    const updated = issues.find((i) => i.id === issueId);
    setToastMessage(`Moved ${updated?.key} to ${nextStatus.replace("_", " ")}`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCreateIssue = (e: React.FormEvent) => {
    e.preventDefault();
    const nextKey = `ENG-${100 + issues.length + 1}`;
    const assignee = USERS.find((u) => u.id === newAssigneeId) || USERS[0];

    const created: Issue = {
      id: `iss-${Date.now()}`,
      key: nextKey,
      title: newTitle,
      description: newDesc || "Ticket created via sprint workspace workstation.",
      status: newStatus,
      priority: newPriority,
      points: Number(newPoints),
      assignee,
      labels: ["Core", "Sprint"],
      createdAt: "Just now",
    };

    saveIssues([created, ...issues]);
    setShowCreateModal(false);
    setNewTitle("");
    setNewDesc("");
    setToastMessage(`Created issue ${nextKey} successfully`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const getPriorityBadge = (p: Issue["priority"]) => {
    switch (p) {
      case "Urgent":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "High":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Medium":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "Low":
        return "bg-slate-800 text-slate-400 border-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-medium border border-indigo-400/40 animate-bounce">
          <Activity className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <h3 className="font-bold text-lg text-white mb-4">Create New Issue</h3>
            <form onSubmit={handleCreateIssue} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Issue Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Optimize Redis cache invalidation hooks"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Context, acceptance criteria, reproduction steps..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Initial Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="BACKLOG">Backlog</option>
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="IN_REVIEW">Code Review</option>
                    <option value="DONE">Done</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Story Points</label>
                  <input
                    type="number"
                    min="1"
                    max="21"
                    value={newPoints}
                    onChange={(e) => setNewPoints(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Assignee</label>
                  <select
                    value={newAssigneeId}
                    onChange={(e) => setNewAssigneeId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  >
                    {USERS.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>Acme Corp</span>
              <span>/</span>
              <span className="text-white font-medium">Sprint 46 (Current)</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">Sprint Kanban Workstation</h1>
          </div>

          {/* Actions & Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search issues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-44"
              />
            </div>

            {/* Assignee Filter */}
            <select
              value={selectedAssignee}
              onChange={(e) => setSelectedAssignee(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
            >
              <option value="all">All Assignees</option>
              {USERS.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>

            {/* Priority Filter */}
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
            >
              <option value="all">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            {/* Create Button */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition"
            >
              <Plus className="w-4 h-4" />
              <span>New Issue</span>
            </button>
          </div>
        </div>

        {/* 5-Column Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {columns.map((col) => {
            const colIssues = filteredIssues.filter((i) => i.status === col.id);
            const totalColPoints = colIssues.reduce((a, b) => a + b.points, 0);

            return (
              <div
                key={col.id}
                className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-3 flex flex-col min-h-[650px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-white">{col.title}</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-[10px] font-mono text-slate-400">
                      {colIssues.length}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-400">{totalColPoints} pts</span>
                </div>

                {/* Cards List */}
                <div className="space-y-2.5 flex-1 overflow-y-auto">
                  {colIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition shadow-sm group"
                    >
                      <div className="flex items-center justify-between text-[11px] mb-2">
                        <span className="font-mono text-slate-400 font-semibold">{issue.key}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full font-semibold border ${getPriorityBadge(
                            issue.priority
                          )}`}
                        >
                          {issue.priority}
                        </span>
                      </div>

                      <h4 className="text-xs font-semibold text-white leading-snug line-clamp-2">
                        {issue.title}
                      </h4>

                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {issue.description}
                      </p>

                      {/* Labels */}
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {issue.labels.map((lbl) => (
                          <span
                            key={lbl}
                            className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300 font-mono"
                          >
                            {lbl}
                          </span>
                        ))}
                      </div>

                      {/* Card Footer */}
                      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={issue.assignee.avatar}
                            alt={issue.assignee.name}
                            title={issue.assignee.name}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span className="text-slate-400 truncate max-w-[80px]">{issue.assignee.name}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-mono text-indigo-400 font-bold">{issue.points} pts</span>

                          {/* Quick status cycle button */}
                          <select
                            value={issue.status}
                            onChange={(e) => handleMoveStatus(issue.id, e.target.value as any)}
                            className="bg-slate-800 text-slate-300 rounded px-1 py-0.5 text-[10px] focus:outline-none"
                          >
                            <option value="BACKLOG">Backlog</option>
                            <option value="TODO">To Do</option>
                            <option value="IN_PROGRESS">Progress</option>
                            <option value="IN_REVIEW">Review</option>
                            <option value="DONE">Done</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}

                  {colIssues.length === 0 && (
                    <div className="py-12 text-center text-xs text-slate-600 border border-dashed border-slate-800/60 rounded-xl">
                      Empty column
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

