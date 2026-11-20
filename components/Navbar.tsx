"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { USERS } from "@/lib/data";
import {
  Kanban,
  Map,
  BarChart3,
  Settings,
  ChevronDown,
  Menu,
  X,
  Zap,
  Activity,
  Layers,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { label: "Overview", href: "/" },
    { label: "Sprint Board", href: "/workspace", icon: Kanban },
    { label: "Roadmap Epics", href: "/roadmap", icon: Map },
    { label: "Velocity & Analytics", href: "/analytics", icon: BarChart3 },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand & Workspace */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Kanban className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                PULSE<span className="text-indigo-400 font-mono">.pm</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                SaaS v2.4
              </span>
            </div>
          </Link>

          {/* Workspace Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">Acme Corp</span>
            <span className="text-slate-500 font-mono">/ ENG-Core</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 ml-2">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? "text-white bg-slate-800/90 shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right side: Live Sync & User Avatars */}
        <div className="flex items-center gap-3">
          {/* Live WebSockets indicator */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Sync: 14ms</span>
          </div>

          {/* User Avatars Stack */}
          <div className="flex items-center -space-x-2">
            {USERS.slice(0, 3).map((u) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={u.id}
                src={u.avatar}
                alt={u.name}
                title={`${u.name} (${u.role})`}
                className="w-7 h-7 rounded-full border-2 border-slate-950 object-cover ring-1 ring-slate-800"
              />
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-4 space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                  isActive ? "bg-indigo-600/10 text-indigo-400 font-semibold" : "text-slate-300 hover:bg-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
