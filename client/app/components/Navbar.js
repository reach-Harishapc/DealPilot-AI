"use client";

import { Sparkles, Search, ShieldAlert, Database, RefreshCw, User } from "lucide-react";

export default function Navbar({ onOpenNewAccount, onOpenObjectionCoach }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07090e]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Team Switcher */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">
                  DealPilot
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Enterprise
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:block h-5 w-[1px] bg-white/10"></div>

          {/* CRM Sync Indicator */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>HubSpot CRM & Calendar Synced</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-500">Portal 247526396</span>
          </div>
        </div>

        {/* Global Product Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={onOpenNewAccount}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800/90 hover:bg-slate-700/90 border border-white/10 text-slate-200 transition shadow-sm"
          >
            <Search className="w-3.5 h-3.5 text-indigo-400" />
            <span>Research New Account</span>
          </button>

          <button
            onClick={onOpenObjectionCoach}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 transition shadow-sm"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Objection Coach</span>
          </button>

          {/* Rep User Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-700 to-indigo-900 border border-white/20 flex items-center justify-center text-xs font-bold text-white">
              HK
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-slate-200 leading-none">Harish Kumar</div>
              <div className="text-[10px] text-slate-400 mt-0.5 leading-none">Enterprise AE</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
