"use client";

import { useState } from "react";
import { apiFetch } from "../../lib/api";
import { X, Sparkles, ShieldCheck, MessageSquare, CornerDownRight, Lightbulb } from "lucide-react";

export default function ObjectionSimulatorModal({ isOpen, onClose }) {
  const [objection, setObjection] = useState("");
  const [persona, setPersona] = useState("Chief Risk Officer");
  const [company, setCompany] = useState("Global Enterprise Corp");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const presets = [
    "Our executive committee froze all new software onboarding until next fiscal year.",
    "Our internal engineering team is building this in-house to avoid vendor lock-in.",
    "Your pricing is significantly higher than alternative market solutions.",
    "We already run Salesforce and Microsoft and our leadership wants to consolidate."
  ];

  const handleSimulate = async (customText) => {
    const textToSubmit = customText || objection;
    if (!textToSubmit) return;

    setLoading(true);
    try {
      const data = await apiFetch("/api/simulate-objection", {
        method: "POST",
        body: JSON.stringify({
          objection: textToSubmit,
          personaTitle: persona,
          companyName: company
        })
      });
      if (data.success) {
        setResult(data.data);
      }
    } catch (err) {
      console.error("Simulation error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white border border-[#e2e8f0] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-4 px-6 border-b border-[#e2e8f0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0f172a]">Deal Objection Coach & Rebuttal Studio</h3>
              <p className="text-xs text-slate-500">Consultative frameworks and live talk tracks for executive pushbacks</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Inputs */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-1">
                Buyer Persona Role
              </label>
              <input
                type="text"
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-1">
                Account Name
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Quick Common Scenarios */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-1.5">
              Common Enterprise Objections
            </label>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setObjection(p);
                    handleSimulate(p);
                  }}
                  className="text-[11px] bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 border border-slate-200/80 text-slate-700 px-3 py-1.5 rounded-xl transition text-left"
                >
                  &ldquo;{p}&rdquo;
                </button>
              ))}
            </div>
          </div>

          {/* Custom Objection Input */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-1">
              Live Buyer Pushback
            </label>
            <div className="flex gap-2">
              <textarea
                rows={2}
                value={objection}
                onChange={(e) => setObjection(e.target.value)}
                placeholder="Enter the exact pushback raised by the client..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
              <button
                disabled={loading || !objection}
                onClick={() => handleSimulate()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 flex-shrink-0 transition shadow-xs"
              >
                {loading ? <Sparkles className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                Analyze
              </button>
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className="space-y-3 pt-3 border-t border-slate-100 animate-in fade-in duration-300">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                  Recommended Strategy: {result.recommendedFramework}
                </span>
                <p className="text-xs text-slate-700 mt-1">
                  <strong>Buyer Mindset & Root Concern:</strong> {result.strategicAnalysis}
                </p>
              </div>

              {/* Talk Track */}
              <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-xl space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wide text-indigo-700 block">
                  Verbatim Talking Track for Account Executive:
                </span>
                <p className="text-xs sm:text-sm text-indigo-950 font-medium leading-relaxed italic">
                  {result.recommendedTalkTrack}
                </p>
              </div>

              {/* Pivot Question */}
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-start gap-2.5">
                <CornerDownRight className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                    Discovery Pivot Question:
                  </span>
                  <p className="text-xs font-semibold text-slate-800 mt-0.5">
                    {result.followUpPivotQuestion}
                  </p>
                </div>
              </div>

              {/* Coaching Tip */}
              <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center gap-2 text-xs text-slate-600">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                <span><strong>Delivery Note:</strong> {result.coachTip}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
