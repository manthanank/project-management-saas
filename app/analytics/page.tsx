"use client";

import React from "react";
import { BURNDOWN_DATA, VELOCITY_HISTORY, ISSUE_DISTRIBUTION } from "@/lib/data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  TrendingUp,
  Activity,
  CheckCircle2,
  Clock,
  Zap,
  BarChart3,
  Layers,
  ArrowUpRight,
} from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-8 mb-8">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
            Sprint Telemetry & Health
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Velocity & Burndown Analytics</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time story point burn curves, historical throughput trends, and team cycle time metrics
          </p>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Sprint Completion Rate</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-white">96.4%</p>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
              <ArrowUpRight className="w-3 h-3" />
              <span>+3.2% vs Sprint 45</span>
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Avg Team Velocity</span>
              <TrendingUp className="w-4 h-4 text-indigo-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-white">51.2 pts</p>
            <span className="text-[11px] text-indigo-400 font-mono mt-1 block">
              Per 2-week sprint cycle
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Mean Issue Cycle Time</span>
              <Clock className="w-4 h-4 text-sky-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-white">2.4 days</p>
            <span className="text-[11px] text-sky-400 font-mono mt-1 block">
              From &quot;To Do&quot; to merged PR
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Scope Creep Index</span>
              <Activity className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-amber-400">4.2%</p>
            <span className="text-[11px] text-slate-500 font-mono mt-1 block">
              Within healthy tolerance (&lt;10%)
            </span>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          {/* Sprint Burndown Line Chart */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-semibold text-white">Sprint 46 Burndown Curve</h3>
                <p className="text-xs text-slate-400">Remaining story points (Ideal vs Actual)</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-indigo-400">
                  <span className="w-2.5 h-0.5 bg-indigo-500 inline-block" /> Actual Burn
                </span>
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className="w-2.5 h-0.5 bg-slate-600 inline-block" /> Ideal Slope
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={BURNDOWN_DATA}>
                  <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} domain={[0, 50]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <Line type="linear" dataKey="ideal" stroke="#475569" strokeDasharray="4 4" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: "#6366f1" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Historical Velocity Bar Chart */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-semibold text-white">Velocity Track Record</h3>
                <p className="text-xs text-slate-400">Committed vs Completed story points</p>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 px-2 py-0.5 bg-emerald-500/10 rounded-md">
                6 Sprints
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={VELOCITY_HISTORY}>
                  <XAxis dataKey="sprint" stroke="#64748b" fontSize={10} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="committed" fill="#334155" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Category Split & Health Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Donut Chart */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">Issue Category Allocation</h3>
              <p className="text-xs text-slate-400 mb-4">Engineering effort distribution across domains</p>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ISSUE_DISTRIBUTION}
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {ISSUE_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderColor: "#334155",
                        borderRadius: "12px",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-4 border-t border-slate-800">
              {ISSUE_DISTRIBUTION.map((c) => (
                <div key={c.name} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.fill }} />
                  <span className="text-slate-400 truncate">{c.name} ({c.value}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow Speed Benchmarks */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
            <h3 className="text-sm font-semibold text-white mb-2">Stage Latency Benchmarks</h3>
            <p className="text-xs text-slate-400 mb-6">Median time spent by tickets across workflow states</p>

            <div className="space-y-4 text-xs">
              {[
                { stage: "Triage to In Progress", median: "8.5 Hours", health: "Optimal", color: "text-emerald-400" },
                { stage: "In Progress to Code Review", median: "1.8 Days", health: "Optimal", color: "text-emerald-400" },
                { stage: "Code Review to Production Merge", median: "14.2 Hours", health: "Optimal", color: "text-emerald-400" },
                { stage: "Bug Resolution SLA", median: "3.2 Hours", health: "Superior", color: "text-sky-400" },
              ].map((bench, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="font-medium text-slate-300">{bench.stage}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-white font-semibold">{bench.median}</span>
                    <span className={`text-[11px] font-mono ${bench.color}`}>{bench.health}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

