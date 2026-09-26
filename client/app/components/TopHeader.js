"use client";

import { Search, PanelLeftOpen } from "lucide-react";

export default function TopHeader({ title, isSidebarOpen, onToggleSidebar, user, onOpenProfile, onViewLandingPage }) {
  return (
    <header className="h-16 border-b border-[#e2e8f0] bg-[#faf8f5]/90 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Sidebar Open Button (only when closed) + Breadcrumbs & Title */}
      <div className="flex items-center gap-3">
        {/* Show Open Button only when sidebar is closed */}
        {!isSidebarOpen && (
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/70 border border-slate-200/90 shadow-xs transition flex items-center justify-center"
            title="Open Sidebar"
            aria-label="Open Navigation Sidebar"
          >
            <PanelLeftOpen className="w-4 h-4 text-indigo-600" />
          </button>
        )}

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">DealPilot</span>
          <span className="text-slate-300 text-xs">/</span>
          <h1 className="text-sm sm:text-base font-extrabold text-[#0f172a] tracking-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* Center Global Search */}
      <div className="hidden md:flex items-center gap-2 bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-1.5 w-72 lg:w-80 text-xs text-slate-500 focus-within:border-indigo-500 focus-within:text-slate-800 shadow-xs transition">
        <Search className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search accounts, stakeholders, signals..."
          className="bg-transparent border-none outline-none w-full text-xs text-slate-800 placeholder-slate-400"
        />
        <kbd className="hidden lg:inline px-1.5 py-0.5 text-[10px] font-mono bg-slate-100 text-slate-500 rounded border border-slate-200">
          ⌘K
        </kbd>
      </div>

      {/* Right Actions & Sync Status */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Product Home Link */}
        {onViewLandingPage && (
          <button
            onClick={onViewLandingPage}
            className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition"
            title="View Product Homepage & Feature Comparison"
          >
            <span>Product Home</span>
          </button>
        )}

        {/* CRM Status */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>HubSpot CRM Live</span>
        </div>

        {/* User Profile Avatar Trigger */}
        {user && (
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition text-xs font-semibold text-slate-700"
            title="View & Edit User Profile"
          >
            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center">
              {user.avatar || "HK"}
            </div>
            <span className="text-xs font-bold text-slate-800">
              {user.name.split(" ")[0]}
            </span>
          </button>
        )}
      </div>
    </header>
  );
}
