"use client";

import { Calendar, Clock, DollarSign, UserCheck, ArrowRight, Sparkles } from "lucide-react";

export default function MeetingFeed({ meetings, selectedMeetingId, onSelectMeeting, loading }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e2e8f0]">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-indigo-600" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Upcoming Calendar</h2>
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono font-medium">
          {meetings.length} Calls
        </span>
      </div>

      <div className="space-y-2.5 overflow-y-auto pr-1">
        {meetings.map((meeting) => {
          const isSelected = meeting.id === selectedMeetingId;
          return (
            <div
              key={meeting.id}
              onClick={() => onSelectMeeting(meeting.id)}
              className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                isSelected
                  ? "bg-indigo-50/70 border-indigo-300 shadow-xs ring-1 ring-indigo-200"
                  : "bg-white hover:bg-slate-50/80 border-[#e2e8f0] shadow-xs"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className="text-xs font-semibold text-indigo-700 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-indigo-500" />
                  {meeting.time}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700 flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  <DollarSign className="w-3 h-3" />
                  {meeting.dealValue}
                </span>
              </div>

              <h3 className="font-bold text-[#0f172a] text-sm leading-snug line-clamp-1 mb-1">
                {meeting.accountName}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate font-medium text-slate-700">{meeting.attendee.name}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 truncate text-[11px]">{meeting.attendee.title}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-[10px] text-slate-600 font-medium bg-slate-100 px-2 py-0.5 rounded">
                  {meeting.meetingType}
                </span>

                <div className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600">
                  {isSelected && loading ? (
                    <span className="flex items-center gap-1 text-amber-600 animate-pulse">
                      <Sparkles className="w-3 h-3" /> Synthesizing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      {isSelected ? "Active View" : "Generate Brief"}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
