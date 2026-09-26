"use client";

import { X, ExternalLink, Maximize2 } from "lucide-react";

export default function PitchSlideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#0b0f19] border border-white/10 rounded-2xl w-full max-w-6xl h-[88vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-3.5 px-5 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <h3 className="text-sm font-bold text-slate-100">
              Mandatory Deliverable: 1-Slide Pitch (DAY-1 Builders Pitch Fest)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.open("/slide/index.html", "_blank")}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs flex items-center gap-1 font-medium transition"
              title="Open standalone slide in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Full Tab</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slide Frame */}
        <div className="flex-1 bg-black overflow-hidden flex items-center justify-center p-2">
          <iframe
            src="/slide/index.html"
            className="w-full h-full rounded-xl border border-white/10"
            title="DealPilot 1-Slide Presentation"
          />
        </div>
      </div>
    </div>
  );
}
