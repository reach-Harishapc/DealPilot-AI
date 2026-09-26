"use client";

import { useState } from "react";
import { 
  Briefcase, 
  Sparkles, 
  Target, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Layers, 
  ShieldCheck, 
  Copy, 
  Check, 
  Users, 
  BrainCircuit, 
  ArrowRight,
  Flame,
  Award
} from "lucide-react";

export default function BusinessPitchView() {
  const [copied, setCopied] = useState(false);

  const handleCopyPitch = () => {
    const pitchText = `DealPilot Enterprise by Rish AI Labs — Executive Product Brief & Pitch

Autonomous Pre-Meeting Intelligence & Multi-BU Deal Strategy Engine
Transforming fragmented account signals into winning, executive-ready sales conversations.

1. THE WHY (The Core Enterprise Problem):
- Enterprise Account Executives spend 4–6 hours per meeting manually cobbling together notes from 10-K filings, LinkedIn profiles, and disparate CRM records.
- Pitches remain generic and single-threaded: AEs pitch whatever product they know best, missing multi-million dollar cross-sell opportunities.
- Meetings stall on predictable objections without psychological counter-strategies.

2. THE WHAT (Product Definition):
- Autonomous pre-meeting intelligence platform delivering a 4-part strategic meeting brief:
  1. Strategic Value Proposition & Pitch Track (2-min elevator pitch + ROI)
  2. Consultative Discovery Playbook (High-leverage probing questions)
  3. Objection Battlecards (Psychological root causes & verbatim counters)
  4. Executive Email Drafts (1-click personalized follow-up)

3. TARGET USERS & BUYERS:
- Enterprise AEs: Cuts prep time from 4 hours to 5 minutes.
- Strategic Deal Teams: Connects multi-BU solutions into board-level proposals.
- CROs: Accelerates pipeline velocity and increases average deal ARR.
- Sales Enablement Leaders: Operationalizes MEDDIC and Challenger sales automatically.

4. KEY METRICS & ROI:
- 85% Reduction in Meeting Prep Time
- 35% Increase in Multi-BU Cross-Sell Penetration
- +28% Win Rate Velocity on Tier-1 Enterprise Accounts`;

    navigator.clipboard.writeText(pitchText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#e2e8f0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5" />
              Business Knowledge Base
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              DealPilot Enterprise • Rish AI Labs
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] tracking-tight">
            Executive Product Brief & Pitch Strategy
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Strategic positioning, buyer persona mapping, core value metrics, and board-level narrative for enterprise sales leaders.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleCopyPitch}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied Pitch Memo!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Executive Summary</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Prep Time Reduction</span>
          <span className="text-xl font-black text-indigo-700 font-mono mt-0.5 block">85% Faster</span>
          <span className="text-[11px] text-slate-500">From 4 hrs down to 5 mins</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Cross-Sell Penetration</span>
          <span className="text-xl font-black text-emerald-700 font-mono mt-0.5 block">+35% ARR</span>
          <span className="text-[11px] text-slate-500">Multi-BU Whitespace mapping</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Win Rate Velocity</span>
          <span className="text-xl font-black text-purple-700 font-mono mt-0.5 block">+28%</span>
          <span className="text-[11px] text-slate-500">Psychology-backed objection defense</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">CRM Uptime & SLA</span>
          <span className="text-xl font-black text-amber-700 font-mono mt-0.5 block">99.9%</span>
          <span className="text-[11px] text-slate-500">HubSpot Single Hub Architecture</span>
        </div>
      </div>

      {/* 1. The WHY (The Enterprise Problem) */}
      <div className="bg-white p-6 rounded-3xl border border-[#e2e8f0] shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-rose-50 text-rose-700 font-bold text-xs flex items-center justify-center">1</span>
          <h3 className="text-base font-extrabold text-[#0f172a]">The &ldquo;WHY&rdquo; — The Core Enterprise Sales Problem</h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          In large multi-product B2B enterprises selling across Cloud, AI, Cybersecurity, and Digital Transformation:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
            <span className="text-xs font-bold text-rose-700 block">4–6 Hours Wasted Prep</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enterprise AEs spend hours manually cobbling fragmented notes from 10-K filings, LinkedIn profiles, and stale CRM records.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
            <span className="text-xs font-bold text-amber-700 block">Single-Threaded Pitches</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Reps default to pitching the 1 product they know best, missing multi-million dollar cross-sell opportunities across other BUs.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
            <span className="text-xs font-bold text-indigo-700 block">Deal Slippage on Objections</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Meetings stall when CFOs raise in-house build or budget freeze objections because reps lack psychological counter-strategies.
            </p>
          </div>
        </div>
      </div>

      {/* 2. The WHAT (Product Definition) */}
      <div className="bg-white p-6 rounded-3xl border border-[#e2e8f0] shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center">2</span>
          <h3 className="text-base font-extrabold text-[#0f172a]">The &ldquo;WHAT&rdquo; — Autonomous 4-Part Strategic Brief</h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          DealPilot Enterprise continuously scans upcoming executive calendar calls, matches target accounts against your enterprise catalog, and synthesizes 4 mission-critical assets:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-1">
            <span className="text-xs font-bold text-indigo-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              1. Tailored Value Proposition & Pitch Track
            </span>
            <p className="text-xs text-slate-600">
              Crisp 2-minute elevator pitch with projected economic payback and margin impact tailored to C-suite priorities.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-1">
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-emerald-500" />
              2. Consultative Discovery Playbook
            </span>
            <p className="text-xs text-slate-600">
              High-leverage probing questions mapped to current company regulatory filings, investor day transcripts, and tech stack triggers.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-1">
            <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              3. Anticipated Objection Battlecards
            </span>
            <p className="text-xs text-slate-600">
              Root-cause psychological driver analysis paired with verbatim talk tracks to neutralize budget and in-house build hesitations.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-1">
            <span className="text-xs font-bold text-purple-700 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-purple-500" />
              4. Executive Email Drafts
            </span>
            <p className="text-xs text-slate-600">
              1-click tailored pre-meeting primers and post-call executive summaries ready to send directly to economic buyers.
            </p>
          </div>
        </div>
      </div>

      {/* 3. The FOR WHOM (Target Buyer Persona Table) */}
      <div className="bg-white p-6 rounded-3xl border border-[#e2e8f0] shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center">3</span>
          <h3 className="text-base font-extrabold text-[#0f172a]">The &ldquo;FOR WHOM&rdquo; — Stakeholder Value Matrix</h3>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3 pl-4">Persona</th>
                <th className="p-3">Role</th>
                <th className="p-3 pr-4">Measurable Business Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 pl-4 font-bold text-slate-800">Enterprise Account Executives (AEs)</td>
                <td className="p-3 text-slate-500 font-medium">End User</td>
                <td className="p-3 pr-4 text-slate-700 font-semibold">Cuts prep time from 4 hours to 5 minutes; walks into every C-suite pitch fully prepared.</td>
              </tr>
              <tr>
                <td className="p-3 pl-4 font-bold text-slate-800">Strategic Deal & Pursuit Teams</td>
                <td className="p-3 text-slate-500 font-medium">End User</td>
                <td className="p-3 pr-4 text-slate-700 font-semibold">Connects multi-BU capabilities into unified, high-margin transformational proposals.</td>
              </tr>
              <tr>
                <td className="p-3 pl-4 font-bold text-slate-800">Chief Revenue Officers (CROs)</td>
                <td className="p-3 text-slate-500 font-medium">Economic Buyer</td>
                <td className="p-3 pr-4 text-slate-700 font-semibold">Accelerates sales velocity, expands average deal size via cross-selling, and lowers quota slippage.</td>
              </tr>
              <tr>
                <td className="p-3 pl-4 font-bold text-slate-800">Sales Enablement & Ops Leaders</td>
                <td className="p-3 text-slate-500 font-medium">Platform Buyer</td>
                <td className="p-3 pr-4 text-slate-700 font-semibold">Operationalizes MEDDIC and Challenger methodology across the entire sales team automatically.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. The HOW (Autonomous 5-Pillar Architecture) */}
      <div className="bg-white p-6 rounded-3xl border border-[#e2e8f0] shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-purple-50 text-purple-700 font-bold text-xs flex items-center justify-center">4</span>
          <h3 className="text-base font-extrabold text-[#0f172a]">The &ldquo;HOW&rdquo; — 5-Pillar Intelligence Architecture</h3>
        </div>

        <div className="space-y-2.5">
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
            <div>
              <strong className="text-xs text-slate-800">Single Unified Hub (HubSpot CRM & Calendar):</strong>
              <p className="text-xs text-slate-600 mt-0.5">Streams scheduled meetings, opportunity ARR, and buyer attendee profiles directly from HubSpot without external Google Meet or calendar fragmentation.</p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
            <div>
              <strong className="text-xs text-slate-800">Autonomous Signal Ingestion:</strong>
              <p className="text-xs text-slate-600 mt-0.5">Contextualizes account revenue, current active contracts, and live market signals (regulatory audits, supply chain bottlenecks, leadership shakeups).</p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
            <div>
              <strong className="text-xs text-slate-800">Deterministic Cross-BU Alignment:</strong>
              <p className="text-xs text-slate-600 mt-0.5">Evaluates your entire enterprise catalog to pinpoint which solution module has the highest margin fit for that specific executive's KPIs.</p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
            <div>
              <strong className="text-xs text-slate-800">Generative Strategic Reasoning (Gemini Live):</strong>
              <p className="text-xs text-slate-600 mt-0.5">Formulates verbatim executive talking tracks, replacing vague corporate buzzwords with economic ROI reframes.</p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">5</span>
            <div>
              <strong className="text-xs text-slate-800">Interactive Objection Simulator (Coach AI):</strong>
              <p className="text-xs text-slate-600 mt-0.5">Enables sales reps to roleplay against pushbacks in an interactive chatbot to build unshakeable confidence before dialing in.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
