"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Kanban,
  Zap,
  Activity,
  Layers,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Sparkles,
  Users,
  Shield,
  Clock,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

export default function HomePage() {
  const [teamSize, setTeamSize] = useState<number>(8);
  const [sprintDurationWeeks, setSprintDurationWeeks] = useState<number>(2);
  const [backlogPoints, setBacklogPoints] = useState<number>(140);

  // Velocity math
  // Avg story points delivered per engineer per week is ~3.5
  const estimatedVelocityPerSprint = Math.round(teamSize * sprintDurationWeeks * 3.5);
  const sprintsNeeded = Math.ceil(backlogPoints / Math.max(1, estimatedVelocityPerSprint));
  const estimatedWeeksToShip = sprintsNeeded * sprintDurationWeeks;
  const confidenceScore = Math.min(98, Math.max(72, Math.round(100 - (backlogPoints / (teamSize * 15)) * 10)));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-800 bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.18),rgba(255,255,255,0))]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Next-Gen Enterprise Agile Orchestration</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-none">
              Ship Software at <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-sky-300">
                Unprecedented Velocity.
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Real-time multi-tenant Kanban boards, automated sprint burndown telemetry, and quarterly epics roadmapping. Zero bloat, instant edge WebSockets synchronization, and PostgreSQL multi-tenancy.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/workspace"
                className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 group"
              >
                <span>Launch Sprint Workspace</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#velocity-simulator"
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2"
              >
                <Sliders className="w-4 h-4 text-indigo-400" />
                <span>Sprint Velocity Calculator</span>
              </a>
            </div>

            {/* Simulated Live Cursor Stack */}
            <div className="mt-12 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 max-w-xl mx-auto flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300 font-medium">4 Engineers currently active on ENG-Core</span>
              </div>
              <span className="font-mono text-indigo-400">WebSockets 14ms ping</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Sprint Velocity & Burndown Forecasting Calculator */}
      <section id="velocity-simulator" className="py-16 md:py-24 border-b border-slate-800 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
              Predictive Agile Simulation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Sprint Velocity & Burndown Forecaster
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Calculate projected delivery milestones, risk confidence scores, and sprint throughput based on team capacity.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur">
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-2">
                  <label htmlFor="team-size-slider" className="text-slate-300">Engineering Team Size</label>
                  <span className="font-mono text-indigo-400 text-sm">{teamSize} Engineers</span>
                </div>
                <input
                  id="team-size-slider"
                  type="range"
                  min="2"
                  max="30"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                  <span>2 Devs (Pod)</span>
                  <span>15 Devs (Squad)</span>
                  <span>30 Devs (Org)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Sprint Cadence Duration
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { weeks: 1, label: "1 Week", note: "Continuous Flow" },
                    { weeks: 2, label: "2 Weeks", note: "Scrum Standard" },
                    { weeks: 3, label: "3 Weeks", note: "Milestone Release" },
                  ].map((cad) => (
                    <button
                      key={cad.weeks}
                      onClick={() => setSprintDurationWeeks(cad.weeks)}
                      className={`p-3 rounded-xl border text-left transition ${
                        sprintDurationWeeks === cad.weeks
                          ? "bg-indigo-600/20 border-indigo-500 text-white"
                          : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white"
                      }`}
                    >
                      <p className="text-xs font-semibold">{cad.label}</p>
                      <p className="text-[10px] text-indigo-300 mt-0.5">{cad.note}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-2">
                  <label htmlFor="backlog-slider" className="text-slate-300">Estimated Backlog Scope</label>
                  <span className="font-mono text-indigo-400 text-sm">{backlogPoints} Story Points</span>
                </div>
                <input
                  id="backlog-slider"
                  type="range"
                  min="20"
                  max="300"
                  step="10"
                  value={backlogPoints}
                  onChange={(e) => setBacklogPoints(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                  <span>20 Pts (Sprint Goal)</span>
                  <span>150 Pts (Epic Scope)</span>
                  <span>300 Pts (Quarterly Roadmap)</span>
                </div>
              </div>
            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-5 bg-slate-950 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                  <span className="font-semibold text-slate-300 uppercase tracking-wider">Velocity Forecast</span>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-md font-mono text-[11px]">
                    {confidenceScore}% Confidence
                  </span>
                </div>

                <div className="mt-4 space-y-3 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Expected Velocity</span>
                    <span className="text-white font-mono font-semibold">
                      {estimatedVelocityPerSprint} pts / sprint
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Required Sprints</span>
                    <span className="text-white font-mono font-semibold">{sprintsNeeded} Sprints</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Projected Lead Time</span>
                    <span className="text-indigo-400 font-mono font-semibold">~{estimatedWeeksToShip} Weeks</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <p className="text-xs text-slate-500">Target Delivery Window</p>
                  <p className="text-xl font-bold font-mono text-white mt-0.5">
                    {new Date(Date.now() + estimatedWeeksToShip * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric", year: "numeric" }
                    )}
                  </p>
                </div>
              </div>

              <Link
                href="/workspace"
                className="mt-6 w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold text-center transition shadow-md shadow-indigo-600/20"
              >
                Apply To Sprint Board
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillar Highlights */}
      <section className="py-16 md:py-24 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
              Core Architecture
            </span>
            <h2 className="text-3xl font-bold text-white mt-1">
              Purpose-Built for Modern Tech Teams
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4">
                <Kanban className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-base text-white mb-2">5-Column Real-time Kanban</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Backlog, Todo, In Progress, Review, and Done. Drag and drop with optimistic client state updates and automatic database persistence.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-base text-white mb-2">Epics & Quarterly Gantt</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect daily user stories to multi-quarter company goals. Track risk status, lead assignees, and real-time completion percentages.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-base text-white mb-2">Burndown & Velocity Curves</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ideal vs actual burndown telemetry rendered with Recharts. Spot scope creep and engineering bottlenecks before sprint deadlines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tiered SaaS Pricing */}
      <section className="py-16 md:py-24 border-b border-slate-800 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
              Predictable Pricing
            </span>
            <h2 className="text-3xl font-bold text-white mt-1">Simple Plans for Teams of Any Size</h2>
            <p className="text-xs text-slate-400 mt-2">Zero per-project fees. Scale smoothly from seed to enterprise IPO.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">Starter</h3>
                <p className="text-xs text-slate-400 mt-1">For early stage indie squads</p>
                <p className="text-3xl font-bold text-white font-mono mt-4">$0</p>
                <span className="text-[11px] text-slate-500">Free forever for up to 5 users</span>

                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Up to 5 Active Teammates</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited Kanban Boards</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Community Discord Support</li>
                </ul>
              </div>

              <Link href="/workspace" className="mt-8 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold text-center transition">
                Start Free
              </Link>
            </div>

            {/* Pro Team */}
            <div className="p-6 rounded-2xl bg-slate-900 border-2 border-indigo-500 relative flex flex-col justify-between shadow-xl shadow-indigo-500/10">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                Most Popular
              </span>
              <div>
                <h3 className="text-sm font-semibold text-white">Pro Team</h3>
                <p className="text-xs text-slate-400 mt-1">For fast-moving tech organizations</p>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-3xl font-bold text-white font-mono">$12</span>
                  <span className="text-xs text-slate-400">/ user / mo</span>
                </div>
                <span className="text-[11px] text-indigo-400">Billed annually ($14 billed monthly)</span>

                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Unlimited Team Seats</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Real-time WebSockets Sync</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Automated Sprint Burndown</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Epics & Quarterly Gantt</li>
                </ul>
              </div>

              <Link href="/workspace" className="mt-8 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold text-center transition shadow-md shadow-indigo-600/30">
                Deploy Pro Workspace
              </Link>
            </div>

            {/* Enterprise */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">Enterprise</h3>
                <p className="text-xs text-slate-400 mt-1">For mission-critical security & compliance</p>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-3xl font-bold text-white font-mono">$39</span>
                  <span className="text-xs text-slate-400">/ user / mo</span>
                </div>
                <span className="text-[11px] text-slate-500">Dedicated database isolation</span>

                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> SAML SSO & Okta SCIM</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Custom PostgreSQL Tenancy</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 99.99% Uptime SLA Agreement</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 24/7 Dedicated Architect</li>
                </ul>
              </div>

              <Link href="/settings" className="mt-8 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold text-center transition">
                Contact Enterprise
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 md:py-20 border-b border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
              Direct Inquiries
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How does the real-time multi-cursor collaboration work?",
                a: "Pulse uses low-latency WebSockets with optimistic client state updates. When any team member moves a card, edits story points, or creates an issue, the mutation is broadcasted instantly to all active workspace participants within 15 milliseconds.",
              },
              {
                q: "Can I export sprint metrics and velocity data?",
                a: "Yes. From the Settings tab, you can export all active issues, completed sprint burndown logs, and team velocity history directly into JSON or CSV formats.",
              },
              {
                q: "How does Pulse calculate sprint burndown curves?",
                a: "The Burndown engine calculates remaining story points daily against a linear ideal burndown slope, highlighting whether the team is ahead, on track, or encountering scope creep.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <h4 className="font-semibold text-sm text-white mb-1.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-slate-400 pl-6 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-gradient-to-tr from-indigo-950 via-slate-950 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white">Elevate Your Engineering Cadence</h2>
            <p className="mt-3 text-sm text-slate-400">
              Join thousands of high-velocity engineering pods shipping features faster with Pulse.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/workspace"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition shadow-lg shadow-indigo-600/30"
              >
                Open Sprint Workspace
              </Link>
              <Link
                href="/analytics"
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-sm font-semibold transition"
              >
                Inspect Burndown Telemetry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

