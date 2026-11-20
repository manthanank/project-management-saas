"use client";

import React, { useState } from "react";
import { EPICS, Epic } from "@/lib/data";
import {
  Map,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Layers,
} from "lucide-react";

export default function RoadmapPage() {
  const [epics, setEpics] = useState<Epic[]>(EPICS);
  const [selectedQuarter, setSelectedQuarter] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newQuarter, setNewQuarter] = useState<Epic["quarter"]>("Q2 2026");
  const [newLead, setNewLead] = useState("Alex Mercer");
  const [newPoints, setNewPoints] = useState(50);

  const quarters = ["Q1 2026", "Q2 2026", "Q3 2026", "Q4 2026"];

  const filteredEpics = epics.filter((ep) => {
    if (selectedQuarter !== "all" && ep.quarter !== selectedQuarter) return false;
    return true;
  });

  const getStatusBadge = (status: Epic["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "On Track":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "At Risk":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "In Review":
        return "bg-sky-500/10 text-sky-400 border-sky-500/20";
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Epic = {
      id: `ep-${Date.now()}`,
      title: newTitle,
      quarter: newQuarter,
      progress: 0,
      status: "On Track",
      lead: newLead,
      totalPoints: Number(newPoints),
      completedPoints: 0,
      color: "#6366f1",
    };
    setEpics([...epics, created]);
    setShowAddModal(false);
    setNewTitle("");
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10">
      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <h3 className="font-bold text-lg text-white mb-4">Add Strategic Epic</h3>
            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Epic Goal / Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Vector Retrieval Cluster"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Target Quarter</label>
                  <select
                    value={newQuarter}
                    onChange={(e) => setNewQuarter(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  >
                    {quarters.map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Total Estimated Points</label>
                  <input
                    type="number"
                    value={newPoints}
                    onChange={(e) => setNewPoints(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Epic Lead Engineer</label>
                <input
                  type="text"
                  value={newLead}
                  onChange={(e) => setNewLead(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold"
                >
                  Add Epic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-slate-800 gap-4">
          <div>
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
              Quarterly Milestones
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-1">Strategic Roadmap & Epics</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Multi-quarter Gantt execution timelines, risk dependencies, and completion velocities
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="all">All Quarters (Full Year)</option>
              {quarters.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Create Epic</span>
            </button>
          </div>
        </div>

        {/* Visual Gantt Bar Section */}
        <div className="mb-10 p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
          <h3 className="text-sm font-semibold text-white mb-4">Quarterly Timeline Visualizer</h3>

          {/* Quarter Columns Header */}
          <div className="grid grid-cols-4 border-b border-slate-800 pb-3 text-xs font-mono text-slate-400 text-center">
            {quarters.map((q) => (
              <div key={q} className="font-semibold text-slate-300">
                {q}
              </div>
            ))}
          </div>

          {/* Epics Gantt Rows */}
          <div className="space-y-4 pt-4">
            {filteredEpics.map((epic) => {
              const qIndex = quarters.indexOf(epic.quarter);
              return (
                <div key={epic.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-white">{epic.title}</span>
                    <span className="font-mono text-indigo-400">{epic.progress}% Completed</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 h-7 bg-slate-950 rounded-xl p-1 border border-slate-800/80">
                    {quarters.map((q, idx) => {
                      const isActive = idx === qIndex;
                      return (
                        <div key={q} className="relative rounded-lg overflow-hidden bg-slate-900/40">
                          {isActive && (
                            <div
                              className="h-full bg-indigo-600 rounded-md transition-all duration-500 flex items-center px-2 text-[10px] font-mono font-bold text-white shadow-sm"
                              style={{ width: `${epic.progress}%` }}
                            >
                              {epic.progress > 20 && `${epic.progress}%`}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Epics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEpics.map((epic) => (
            <div
              key={epic.id}
              className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider">
                    {epic.quarter}
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">{epic.title}</h3>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(
                    epic.status
                  )}`}
                >
                  {epic.status}
                </span>
              </div>

              {/* Progress Meter */}
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                  <span>Progress Velocity</span>
                  <span className="font-mono text-white">
                    {epic.completedPoints} / {epic.totalPoints} Points
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full transition-all duration-300"
                    style={{ width: `${epic.progress}%` }}
                  />
                </div>
              </div>

              {/* Lead & Scope */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Lead: <strong className="text-slate-200">{epic.lead}</strong></span>
                <span className="font-mono text-indigo-300">{epic.progress}% Burndown</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
