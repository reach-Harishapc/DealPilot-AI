"use client";

import { useState } from "react";
import { apiFetch } from "../../../lib/api";
import BattlecardView from "./BattlecardView";
import { 
  Calendar, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  Kanban, 
  ListFilter, 
  ArrowRight, 
  Building2, 
  UserCheck, 
  Sparkles,
  Layers,
  ChevronRight,
  RefreshCw
} from "lucide-react";

export default function PipelineMeetingsView({ 
  meetings, 
  selectedMeetingId, 
  onSelectMeeting, 
  battlecard, 
  loading,
  onMeetingsUpdated 
}) {
  const [activeSubTab, setActiveSubTab] = useState("briefing"); // "briefing", "kanban", "matrix"

  // Calculate metrics
  const totalPipeline = meetings.reduce((acc, m) => {
    const val = parseInt(m.dealValue.replace(/[^0-9]/g, ""), 10) || 0;
    return acc + val;
  }, 0);

  // Short display names for clean SaaS scannability
  const getShortName = (name) => {
    if (!name) return "";
    if (name.includes("Infosys") || name.includes("Infy")) return "Infosys (Infy)";
    if (name.includes("HDFC")) return "HDFC Bank";
    if (name.includes("Reliance") || name.includes("Retail")) return "Reliance Retail";
    if (name.includes("IBM")) return "IBM";
    return name;
  };

  const pipelineStages = [
    {
      id: "discovery",
      name: "1. Discovery & Qual",
      color: "border-sky-300 bg-sky-50 text-sky-800",
      deals: meetings.filter(m => m.id === "meet-103")
    },
    {
      id: "solution",
      name: "2. Solution Alignment",
      color: "border-indigo-300 bg-indigo-50 text-indigo-800",
      deals: meetings.filter(m => m.id === "meet-101")
    },
    {
      id: "technical",
      name: "3. Architecture & Review",
      color: "border-purple-300 bg-purple-50 text-purple-800",
      deals: meetings.filter(m => m.id === "meet-102")
    },
    {
      id: "closing",
      name: "4. Contract & Closing",
      color: "border-emerald-300 bg-emerald-50 text-emerald-800",
      deals: []
    }
  ];

  const [syncingCalendar, setSyncingCalendar] = useState(false);
  const [calendarSyncSuccess, setCalendarSyncSuccess] = useState(false);

  const handleSyncHubSpotCalendar = async () => {
    setSyncingCalendar(true);
    try {
      const data = await apiFetch("/api/hubspot/sync-calendar", {
        method: "POST"
      });
      if (data.success && data.data && onMeetingsUpdated) {
        onMeetingsUpdated(data.data);
      }
      setCalendarSyncSuccess(true);
      setTimeout(() => setCalendarSyncSuccess(false), 3000);
    } catch (err) {
      console.error("HubSpot calendar sync error:", err);
    } finally {
      setSyncingCalendar(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* 1. Top Enterprise Pipeline Health Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-white p-3.5 rounded-2xl border border-[#e2e8f0] shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Active Pipeline</span>
            <span className="text-base font-black text-[#0f172a] font-mono leading-none mt-0.5 block">
              ${(totalPipeline / 1000).toFixed(0)}K ARR
            </span>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-[#e2e8f0] shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Next Meeting</span>
            <span className="text-xs font-bold text-[#0f172a] truncate block mt-0.5">
              {meetings[0] ? `${meetings[0].time.split(" (")[0]} (${getShortName(meetings[0].accountName)})` : "No upcoming calls"}
            </span>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-[#e2e8f0] shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Briefings Ready</span>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> {meetings.length} of {meetings.length} Primed
            </span>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-[#e2e8f0] shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Weekly Saved</span>
            <span className="text-base font-black text-[#0f172a] font-mono leading-none mt-0.5 block">
              14.2 Hours
            </span>
          </div>
        </div>
      </div>

      {/* 2. Sub-Navigation View Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="inline-flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-xs">
          <button
            onClick={() => setActiveSubTab("briefing")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === "briefing"
                ? "bg-white text-indigo-700 shadow-xs border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Scheduled Calls & Briefings</span>
          </button>

          <button
            onClick={() => setActiveSubTab("kanban")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === "kanban"
                ? "bg-white text-indigo-700 shadow-xs border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Kanban className="w-3.5 h-3.5" />
            <span>Deal Stage Kanban</span>
          </button>

          <button
            onClick={() => setActiveSubTab("matrix")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === "matrix"
                ? "bg-white text-indigo-700 shadow-xs border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Readiness Matrix</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSyncHubSpotCalendar}
            disabled={syncingCalendar}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 transition shadow-2xs"
            title="Fetch live meetings and calls directly from HubSpot CRM Calendar"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncingCalendar ? "animate-spin text-indigo-600" : "text-orange-500"}`} />
            <span>{calendarSyncSuccess ? "HubSpot Synced!" : (syncingCalendar ? "Syncing Calendar..." : "Sync HubSpot Calendar")}</span>
          </button>
        </div>
      </div>

      {/* 3. Sub-View: Scheduled Calls & Briefings */}
      {activeSubTab === "briefing" && (
        <div className="space-y-5">
          {/* HORIZONTAL CALENDAR ROW: Top row of 3 clean cards */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-600" /> Select Scheduled Meeting
              </span>
              <span className="text-[11px] text-slate-400">Click a card to switch active battlecard</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {meetings.map((meeting) => {
                const isSelected = meeting.id === selectedMeetingId;
                const shortName = getShortName(meeting.accountName);

                return (
                  <div
                    key={meeting.id}
                    onClick={() => onSelectMeeting(meeting.id)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? "bg-white border-indigo-400 shadow-md ring-2 ring-indigo-500/20"
                        : "bg-white/80 hover:bg-white border-[#e2e8f0] shadow-xs"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-indigo-700 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-indigo-500" />
                        {meeting.time.split(" (")[0]}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {meeting.dealValue}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-[#0f172a] text-sm leading-snug mb-1">
                      {shortName}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                      <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium text-slate-700 truncate">{meeting.attendee.name}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500 text-[11px] truncate">{meeting.attendee.title.split(" ")[0]} {meeting.attendee.title.split(" ")[1]}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      {isSelected ? (
                        <span className="text-[11px] font-bold text-indigo-700 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                          Active Briefing
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1 font-medium">
                          Select Briefing <ArrowRight className="w-3 h-3" />
                        </span>
                      )}

                      <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">
                        {meeting.meetingType.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* BELOW THE ROW: Full-Width Strategic Battlecard Workspace */}
          <div className="w-full">
            <BattlecardView battlecard={battlecard} loading={loading} />
          </div>
        </div>
      )}

      {/* B. Deal Stage Kanban Board */}
      {activeSubTab === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pipelineStages.map((stage) => (
            <div key={stage.id} className="bg-slate-50/70 p-3.5 rounded-2xl border border-[#e2e8f0] flex flex-col min-h-[480px]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${stage.color}`}>
                  {stage.name}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">
                  {stage.deals.length}
                </span>
              </div>

              <div className="space-y-3 flex-1">
                {stage.deals.length === 0 ? (
                  <div className="h-32 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-400">
                    No active deals in stage
                  </div>
                ) : (
                  stage.deals.map((deal) => (
                    <div
                      key={deal.id}
                      onClick={() => {
                        onSelectMeeting(deal.id);
                        setActiveSubTab("briefing");
                      }}
                      className="bg-white p-4 rounded-xl border border-[#e2e8f0] shadow-xs hover:border-indigo-300 cursor-pointer transition space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {deal.time.split(" (")[0]}
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          {deal.dealValue}
                        </span>
                      </div>

                      <h4 className="text-sm font-extrabold text-[#0f172a]">{getShortName(deal.accountName)}</h4>

                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">{deal.attendee.name}</span>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-[10px] text-indigo-700 font-semibold bg-indigo-50 px-2 py-0.5 rounded">
                          Briefing Ready
                        </span>
                        <span className="text-indigo-600 font-semibold flex items-center gap-0.5 text-[11px]">
                          Prep Brief <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* C. Readiness Matrix Table */}
      {activeSubTab === "matrix" && (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#e2e8f0] flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0f172a]">Meeting Readiness & Stakeholder Risk Matrix</h3>
            <span className="text-xs text-slate-500">Auto-prioritized by deal ARR and meeting timing</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-[#e2e8f0]">
                <tr>
                  <th className="p-3.5 pl-5">Target Account</th>
                  <th className="p-3.5">Scheduled Call</th>
                  <th className="p-3.5">Economic Buyer</th>
                  <th className="p-3.5">Pipeline ARR</th>
                  <th className="p-3.5">AI Prep Status</th>
                  <th className="p-3.5 pr-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {meetings.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3.5 pl-5 font-bold text-[#0f172a]">{getShortName(m.accountName)}</td>
                    <td className="p-3.5 text-slate-600 font-medium">{m.time}</td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-800">{m.attendee.name}</div>
                      <div className="text-[11px] text-slate-400">{m.attendee.title}</div>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-emerald-700">{m.dealValue}</td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Complete
                      </span>
                    </td>
                    <td className="p-3.5 pr-5 text-right">
                      <button
                        onClick={() => {
                          onSelectMeeting(m.id);
                          setActiveSubTab("briefing");
                        }}
                        className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition"
                      >
                        Open Battlecard
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
