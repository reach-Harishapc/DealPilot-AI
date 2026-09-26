"use client";

import { 
  Calendar, 
  Building2, 
  ShieldAlert, 
  Layers, 
  Link2, 
  Sparkles, 
  TrendingUp,
  PanelLeftClose,
  X,
  LogOut,
  User,
  Briefcase,
  Code2
} from "lucide-react";

export default function Sidebar({ 
  isOpen, 
  onClose, 
  currentView, 
  onViewChange, 
  meetingCount, 
  accountCount,
  user,
  onOpenProfile,
  onLogout,
  onViewLandingPage
}) {
  const navItems = [
    {
      id: "meetings",
      label: "Pre-Meeting Intelligence",
      icon: Calendar
    },
    {
      id: "accounts",
      label: "Account Intelligence",
      icon: Building2
    },
    {
      id: "objections",
      label: "Coach AI",
      icon: ShieldAlert
    },
    {
      id: "catalog",
      label: "Solution Catalog",
      icon: Layers
    },
    {
      id: "integrations",
      label: "CRM & Integrations",
      icon: Link2
    }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar */}
      <aside 
        className={`
          fixed lg:sticky top-0 h-screen bg-white 
          flex flex-col justify-between z-50 select-none shadow-[1px_0_4px_rgba(0,0,0,0.02)]
          transition-all duration-300 ease-in-out
          ${isOpen 
            ? "w-64 translate-x-0 opacity-100 border-r border-[#e2e8f0]" 
            : "-translate-x-full lg:translate-x-0 lg:w-0 lg:opacity-0 lg:overflow-hidden lg:pointer-events-none border-r-0"
          }
        `}
      >
        {/* Top Header & Navigation Container */}
        <div className="w-64 flex-1 flex flex-col min-h-0">
          <div className="p-4 border-b border-[#e2e8f0] flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center shadow-md shadow-indigo-500/25 flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm tracking-tight text-[#0f172a] truncate">
                    DealPilot
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold tracking-wider uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
                    ENTERPRISE
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 truncate font-semibold text-indigo-950">Rish AI Labs</p>
              </div>
            </div>

            {/* Close Sidebar Button inside Header */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition flex-shrink-0"
              title="Close Sidebar"
            >
              <PanelLeftClose className="w-4 h-4 hidden lg:block" />
              <X className="w-4 h-4 lg:hidden" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="px-3 py-4 flex-1 overflow-y-auto flex flex-col justify-between">
            {/* Sales Intelligence Core */}
            <div className="space-y-1">
              <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Sales Intelligence
              </div>

              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onViewChange(item.id);
                      // On mobile, auto close sidebar on select
                      if (typeof window !== "undefined" && window.innerWidth < 1024) {
                        onClose();
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-indigo-50/80 text-indigo-900 border border-indigo-200 shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent"
                    }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                    <span className="truncate flex-1 text-left">{item.label}</span>
                    {item.isLive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" title="Live HubSpot Connection"></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Knowledge Base Section - Pinned down just above profile */}
            <div className="pt-3 mt-auto border-t border-slate-100 space-y-1">
              <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Knowledge Base
              </div>

              <button
                onClick={() => {
                  onViewChange("business");
                  if (typeof window !== "undefined" && window.innerWidth < 1024) {
                    onClose();
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === "business"
                    ? "bg-indigo-50/80 text-indigo-900 border border-indigo-200 shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent"
                }`}
              >
                <Briefcase className={`w-4 h-4 flex-shrink-0 ${currentView === "business" ? "text-indigo-600" : "text-slate-400"}`} />
                <span className="truncate flex-1 text-left">Business & Product Pitch</span>
              </button>

              <button
                onClick={() => {
                  onViewChange("developer");
                  if (typeof window !== "undefined" && window.innerWidth < 1024) {
                    onClose();
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === "developer"
                    ? "bg-indigo-50/80 text-indigo-900 border border-indigo-200 shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent"
                }`}
              >
                <Code2 className={`w-4 h-4 flex-shrink-0 ${currentView === "developer" ? "text-indigo-600" : "text-slate-400"}`} />
                <span className="truncate flex-1 text-left">Developer & API Docs</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom User & Workspace Profile */}
        <div className="w-64 p-3 border-t border-[#e2e8f0] space-y-2">
          <div 
            onClick={onOpenProfile}
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/60 border border-slate-200/80 hover:border-indigo-200 flex items-center justify-between cursor-pointer transition group"
            title="Click to view & edit your User Profile"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-xs font-bold text-indigo-800 flex-shrink-0 group-hover:scale-105 transition">
                {user?.avatar || "HK"}
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-slate-800 truncate leading-none group-hover:text-indigo-700">
                  {user?.name || "Harish Kumar"}
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-1 leading-none">
                  {user?.title || "Enterprise AE • Strategic Accounts"}
                </div>
              </div>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onLogout) onLogout();
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition flex-shrink-0 ml-1"
              title="Log Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <strong className="text-slate-800 font-mono">{user?.pipelineARR || "$1.15M"}</strong> pipeline
            </span>
            <span 
              onClick={onOpenProfile}
              className="text-[10px] text-indigo-600 font-bold hover:underline cursor-pointer"
            >
              Edit Profile
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
