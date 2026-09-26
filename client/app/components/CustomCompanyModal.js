"use client";

import { useState } from "react";
import { apiFetch } from "../../../lib/api";
import { X, Sparkles, Building2, Search, HelpCircle } from "lucide-react";

export default function CustomCompanyModal({ isOpen, onClose }) {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("Financial Technology");
  const [targetPersona, setTargetPersona] = useState("Chief Information Officer");
  const [meetingGoal, setMeetingGoal] = useState("Explore Cloud & AI Infrastructure Modernization");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async () => {
    if (!companyName) return;
    setLoading(true);
    try {
      const data = await apiFetch("/api/analyze-custom", {
        method: "POST",
        body: JSON.stringify({
          companyName,
          industry,
          targetPersona,
          meetingGoal
        })
      });
      if (data.success) {
        setAnalysis(data.data);
      }
    } catch (err) {
      console.error("Custom analysis error:", err);
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
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0f172a]">Add Target Account</h3>
              <p className="text-xs text-slate-500">Generate executive research and value positioning for a new enterprise prospect</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-1">
                Company / Prospect Name
              </label>
              <input
                type="text"
                placeholder="e.g. Stripe, Siemens, Delta Airlines"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-1">
                Industry / Sector
              </label>
              <input
                type="text"
                placeholder="e.g. FinTech, Global Logistics, Healthcare"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-1">
                Key Decision Maker Title
              </label>
              <input
                type="text"
                value={targetPersona}
                onChange={(e) => setTargetPersona(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-1">
                Strategic Deal Objective
              </label>
              <input
                type="text"
                value={meetingGoal}
                onChange={(e) => setMeetingGoal(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            disabled={loading || !companyName}
            onClick={handleAnalyze}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition shadow-xs"
          >
            {loading ? <Sparkles className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Generate Account Intelligence
          </button>

          {/* Analysis Result */}
          {analysis && (
            <div className="space-y-3 pt-3 border-t border-slate-100 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-700">
                  Account Summary: {analysis.company}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                  Strategic Urgency: {analysis.urgencyScore}/100
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                <strong className="text-slate-900">Executive Summary:</strong> {analysis.executiveSummary}
              </div>

              <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wide text-indigo-700">
                  Tailored Pitch for {analysis.targetPersona}:
                </span>
                <p className="text-xs text-indigo-950 italic leading-relaxed font-medium">
                  {analysis.tailoredPitch}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-1.5 flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-indigo-600" /> Consultative Discovery Questions:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {analysis.recommendedDiscoveryQuestions.map((q, idx) => (
                    <li key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                      {q}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                <strong>Recommended Next Action:</strong> {analysis.closingAction}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
