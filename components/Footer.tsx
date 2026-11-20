import React from "react";
import Link from "next/link";
import { Kanban, ShieldCheck, Zap, Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Kanban className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">
              PULSE<span className="text-indigo-400 font-mono">.pm</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-4">
            High-velocity project orchestration engineered for high-performance software engineering teams. Real-time multi-cursor collaboration, automated burndown velocity, and Prisma multi-tenant scoping.
          </p>
          <div className="text-xs text-slate-500 font-mono">
            PULSE Enterprise Engine • SOC2 Certified & ISO 27001
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Platform</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/workspace" className="hover:text-indigo-400 transition">Sprint Kanban</Link></li>
            <li><Link href="/roadmap" className="hover:text-indigo-400 transition">Roadmap Epics</Link></li>
            <li><Link href="/analytics" className="hover:text-indigo-400 transition">Burndown Telemetry</Link></li>
            <li><Link href="/settings" className="hover:text-indigo-400 transition">Team Directory</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Integrations</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>GitHub PR Sync</li>
            <li>GitLab Webhooks</li>
            <li>Slack Standups</li>
            <li>Figma Live Embed</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Compliance</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>SOC2 Type II Certified</li>
            <li>GDPR & HIPAA Ready</li>
            <li>PostgreSQL PgBouncer</li>
            <li>99.99% Edge SLA</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800/80 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>© 2026 PULSE PM Technologies. Engineered by Manthan Ankolekar.</div>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="hover:text-slate-400 transition">Privacy</Link>
          <Link href="/terms" className="hover:text-slate-400 transition">Terms</Link>
          <Link href="/sitemap.xml" className="hover:text-slate-400 transition">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}

