"use client";

import { useState } from "react";
import { 
  Building2, 
  BrainCircuit, 
  Target, 
  HelpCircle, 
  ShieldAlert, 
  Mail, 
  Copy, 
  Check, 
  TrendingUp, 
  Sparkles, 
  Layers, 
  Flame, 
  Award, 
  Download, 
  Share2 
} from "lucide-react";

export default function BattlecardView({ battlecard, loading }) {
  const [activeTab, setActiveTab] = useState("strategy");
  const [copiedKey, setCopiedKey] = useState(null);
  const [synced, setSynced] = useState(false);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSyncToCrm = () => {
    setSynced(true);
    setTimeout(() => setSynced(false), 2500);
  };

  const handleExportBrief = () => {
    if (!battlecard) return;
    const { accountOverview, stakeholderIntelligence, tailoredValueProposition, discoveryPlaybook, objectionHandling } = battlecard;
    
    const markdown = `# DealPilot Meeting Brief: ${accountOverview.accountName}
**Industry:** ${accountOverview.industry} | **Revenue:** ${accountOverview.revenue} | **Health Score:** ${accountOverview.healthScore}/100
**Executive Stakeholder:** ${stakeholderIntelligence.name} (${stakeholderIntelligence.title})
**Strategic Urgency:** ${accountOverview.strategicUrgency}

---
## Recommended Product Alignment
- **Module:** ${tailoredValueProposition.recommendedProduct} (${tailoredValueProposition.businessUnit})
- **Fit Score:** ${tailoredValueProposition.fitScore}
- **Why It Fits:** ${tailoredValueProposition.whyThisSolution}
- **Projected ROI:** ${tailoredValueProposition.roiProjection}

## 2-Minute Executive Pitch Track
${tailoredValueProposition.executiveElevatorPitch}

---
## Consultative Discovery Playbook
${discoveryPlaybook.map((d, i) => `${i + 1}. **${d.theme}**\n   ${d.question}\n   *Rationale:* ${d.rationale}`).join("\n\n")}

---
## Anticipated Objections & Counter-Tactics
${objectionHandling.map((o, i) => `### ${i + 1}. "${o.objection}"\n- **Driver:** ${o.psychologicalDriver}\n- **Counter-Tactic:** ${o.counterTactic}\n- **Talk Track:** ${o.talkTrack}`).join("\n\n")}
`;
    handleCopy(markdown, "export-all");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[380px] p-8 bg-white border border-[#e2e8f0] rounded-2xl shadow-xs">
        <div className="relative w-12 h-12 mb-3">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-100 animate-ping"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-indigo-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          <div className="absolute inset-2 rounded-full bg-indigo-50 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-indigo-600" />
          </div>
        </div>
        <h3 className="text-sm font-bold text-[#0f172a] mb-1">Synthesizing Strategic Battlecard</h3>
        <p className="text-xs text-slate-500 max-w-sm text-center">
          Synthesizing CRM records, market triggers, stakeholder psychology, and multi-BU catalog capabilities...
        </p>
      </div>
    );
  }

  if (!battlecard) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[380px] p-8 bg-white border border-[#e2e8f0] rounded-2xl text-center shadow-xs">
        <Building2 className="w-10 h-10 text-slate-300 mb-2" />
        <h3 className="text-sm font-semibold text-slate-800 mb-1">No Meeting Selected</h3>
        <p className="text-xs text-slate-500 max-w-xs">
          Select an upcoming scheduled meeting from the top row to view the AI battlecard.
        </p>
      </div>
    );
  }

  const { accountOverview, stakeholderIntelligence, tailoredValueProposition, discoveryPlaybook, objectionHandling, nextStepsEmail } = battlecard;

  // Short display title
  const getCleanAccountName = (name) => {
    if (!name) return "";
    if (name.includes("Infosys") || name.includes("Infy")) return "Infosys (Infy)";
    if (name.includes("HDFC")) return "HDFC Bank";
    if (name.includes("Reliance") || name.includes("Retail")) return "Reliance Retail";
    if (name.includes("IBM")) return "IBM";
    return name;
  };

  const cleanName = getCleanAccountName(accountOverview.accountName);

  return (
    <div className="space-y-4">
      {/* 1. Account Header Banner (Clean, scannable, no paragraph clutter) */}
      <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                {accountOverview.industry.split(" ")[0]}
              </span>
              <span className="text-xs text-slate-500 font-mono font-medium">
                {accountOverview.revenue} ARR • {accountOverview.headcount}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                Health: {accountOverview.healthScore}/100
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] tracking-tight">
              {cleanName}
            </h2>

            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-600">
              <Flame className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              <span className="font-medium italic truncate max-w-2xl">
                {accountOverview.strategicUrgency}
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
              <div className="px-3 py-1 text-center border-r border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Spend</span>
                <span className="text-xs font-mono font-bold text-slate-800 mt-0.5 block">
                  {accountOverview.activeContract.split(" ")[0]}
                </span>
              </div>
              <div className="px-3 py-1 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Deal Stage</span>
                <span className="text-xs font-bold text-indigo-700 mt-0.5 block">
                  {accountOverview.relationshipStage.split("/")[0]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BU Footprint Pills */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1">
            <Layers className="w-3 h-3 text-slate-400" /> Internal BU Footprint:
          </span>
          {Object.entries(accountOverview.crossBuStatus || {}).map(([bu, status]) => {
            const isClient = status.includes("Active");
            const isOpp = status.includes("Opp") || status.includes("High");
            return (
              <span
                key={bu}
                className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                  isClient
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : isOpp
                    ? "bg-indigo-50 border-indigo-200 text-indigo-800 font-bold"
                    : "bg-slate-100 border-slate-200 text-slate-600"
                }`}
              >
                {bu}: <strong>{status}</strong>
              </span>
            );
          })}
        </div>
      </div>

      {/* 2. DEDICATED BUTTON TOOLBAR DIV (The 4 UI Tabs aligned as clear buttons) */}
      <div className="bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-inner">
        {/* The 4 Tab Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveTab("strategy")}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === "strategy"
                ? "bg-white text-indigo-700 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            <Target className="w-4 h-4 text-indigo-600" />
            <span>1. Strategy & Pitch</span>
          </button>

          <button
            onClick={() => setActiveTab("discovery")}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === "discovery"
                ? "bg-white text-indigo-700 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span>2. Discovery Playbook</span>
          </button>

          <button
            onClick={() => setActiveTab("objections")}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === "objections"
                ? "bg-white text-indigo-700 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-indigo-600" />
            <span>3. Objection Battlecards</span>
          </button>

          <button
            onClick={() => setActiveTab("email")}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === "email"
                ? "bg-white text-indigo-700 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            <Mail className="w-4 h-4 text-indigo-600" />
            <span>4. Executive Email</span>
          </button>
        </div>

        {/* Action Buttons Aligned on the Right */}
        <div className="flex items-center gap-2 px-1">
          <button
            onClick={handleSyncToCrm}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs transition"
          >
            {synced ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
            <span>{synced ? "Synced to CRM!" : "Log to CRM"}</span>
          </button>

          <button
            onClick={handleExportBrief}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition"
          >
            {copiedKey === "export-all" ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : <Download className="w-3.5 h-3.5 text-white" />}
            <span>{copiedKey === "export-all" ? "Copied!" : "Export Brief"}</span>
          </button>
        </div>
      </div>

      {/* 3. TAB CONTENT WORKSPACE (Clean, Structured Columns) */}

      {/* Tab 1: Strategy & Pitch */}
      {activeTab === "strategy" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Stakeholder Psychology Card */}
            <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                  <BrainCircuit className="w-4 h-4 text-indigo-600" /> Stakeholder Psychology
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {stakeholderIntelligence.roleType.split(" ")[0]}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#0f172a]">{stakeholderIntelligence.name}</h4>
                <p className="text-xs text-slate-500">{stakeholderIntelligence.title}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  &ldquo;{stakeholderIntelligence.personalityProfile}&rdquo;
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400 block mb-1">
                  Key Executive Concerns:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {stakeholderIntelligence.whatKeepsThemUpAtNight.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs">
                <Award className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span className="text-slate-700">
                  <strong>Career Win:</strong> {stakeholderIntelligence.personalWin}
                </span>
              </div>
            </div>

            {/* Recommended Product Fit Card */}
            <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600" /> Solution Fit
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {tailoredValueProposition.fitScore}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-[#0f172a]">
                  {tailoredValueProposition.recommendedProduct}
                </h3>
                <span className="text-xs text-slate-500 block mb-2 font-medium">
                  BU: {tailoredValueProposition.businessUnit}
                </span>

                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 mb-3">
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    <strong>Why this fits:</strong> {tailoredValueProposition.whyThisSolution}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Projected Impact</span>
                <span className="text-xs font-bold text-slate-800 mt-1 block">
                  {tailoredValueProposition.roiProjection}
                </span>
              </div>
            </div>
          </div>

          {/* 2-Minute Executive Pitch Script Card */}
          <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" /> 2-Minute Executive Pitch Track
              </span>
              <button
                onClick={() => handleCopy(tailoredValueProposition.executiveElevatorPitch, "pitch")}
                className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
              >
                {copiedKey === "pitch" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                {copiedKey === "pitch" ? "Copied!" : "Copy Pitch"}
              </button>
            </div>
            <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-200/80">
              <p className="text-xs sm:text-sm text-indigo-950 leading-relaxed font-sans font-medium">
                {tailoredValueProposition.executiveElevatorPitch}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Discovery Playbook */}
      {activeTab === "discovery" && (
        <div className="space-y-3">
          <div className="text-xs text-slate-500 mb-1">
            Consultative discovery questions engineered using MEDDIC frameworks to uncover acute operational friction:
          </div>
          {discoveryPlaybook.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-700 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-mono text-[11px]">
                    {idx + 1}
                  </span>
                  {item.theme}
                </span>
                <button
                  onClick={() => handleCopy(item.question, `q-${idx}`)}
                  className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  {copiedKey === `q-${idx}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  Copy
                </button>
              </div>
              <p className="text-sm font-semibold text-[#0f172a] bg-slate-50 p-3 rounded-xl border border-slate-200">
                {item.question}
              </p>
              <p className="text-xs text-slate-500">
                <strong>Strategic Rationale:</strong> {item.rationale}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Objection Battlecards */}
      {activeTab === "objections" && (
        <div className="space-y-3">
          {objectionHandling.map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 flex-shrink-0 mt-0.5">
                    Pushback
                  </span>
                  <h4 className="text-sm font-bold text-[#0f172a]">{item.objection}</h4>
                </div>
                <button
                  onClick={() => handleCopy(item.talkTrack, `obj-${idx}`)}
                  className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 flex-shrink-0"
                >
                  {copiedKey === `obj-${idx}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  Copy Talk Track
                </button>
              </div>

              <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <strong>Psychological Driver:</strong> {item.psychologicalDriver}
                <br />
                <strong>Counter-Tactic:</strong> {item.counterTactic}
              </div>

              <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-200/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 block mb-1">
                  Verbatim Talking Track for Rep:
                </span>
                <p className="text-xs sm:text-sm text-indigo-950 leading-relaxed italic">
                  {item.talkTrack}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Executive Email */}
      {activeTab === "email" && (
        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
              <Mail className="w-4 h-4" /> Pre-Meeting Executive Primer / Follow-Up
            </span>
            <button
              onClick={() => handleCopy(`${nextStepsEmail.subject}\n\n${nextStepsEmail.body}`, "email")}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-xs transition"
            >
              {copiedKey === "email" ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedKey === "email" ? "Copied Email!" : "Copy Full Email"}
            </button>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
            <p><strong>To:</strong> {stakeholderIntelligence.name} ({accountOverview.domain})</p>
            <p><strong>Subject:</strong> {nextStepsEmail.subject}</p>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-slate-100 whitespace-pre-wrap leading-relaxed shadow-inner">
            {nextStepsEmail.body}
          </div>
        </div>
      )}
    </div>
  );
}
