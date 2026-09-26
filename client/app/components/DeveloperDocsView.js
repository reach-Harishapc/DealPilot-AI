"use client";

import { useState } from "react";
import {
  Code2,
  Terminal,
  Server,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Zap,
  ArrowRight,
  Database,
  Radio,
  FileCode2,
  Box
} from "lucide-react";

export default function DeveloperDocsView() {
  const [copiedSnippet, setCopiedSnippet] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("endpoints"); // "endpoints" | "architecture" | "gemini" | "hubspot"

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const endpoints = [
    {
      id: "ep-battlecard",
      method: "POST",
      path: "/api/battlecard",
      category: "intelligence",
      title: "Generate Pre-Meeting Battlecard",
      description: "Generates an autonomous, hyper-personalized pre-meeting battlecard synthesizing prospect 10-K filings, executive priorities, solution catalog matching, and persona-specific objection mitigations.",
      headers: { "Content-Type": "application/json" },
      requestBody: JSON.stringify({
        meetingId: "meet-101",
        customInputs: {
          focusArea: "Legacy mainframe migration and API modernization",
          primaryCompetitor: "Datadog / Dynatrace"
        }
      }, null, 2),
      responseBody: JSON.stringify({
        success: true,
        data: {
          meetingId: "meet-101",
          companyName: "Global Logistics Corp",
          executiveSummary: "GLC is facing 34% surge in intermodal transit tracking latency...",
          matchedSolution: {
            name: "Enterprise Observability Fabric",
            businessUnit: "Cloud Infrastructure",
            valueProposition: "Autonomous end-to-end trace correlation with 40% TCO reduction"
          },
          threeTierPitch: {
            safe: "Automate core shipment telemetry pipelines",
            bold: "Replace legacy monolith with distributed event mesh",
            transformative: "AI-governed autonomous supply chain routing"
          },
          anticipatedObjections: [
            {
              objection: "We already have an active contract with Datadog.",
              rebuttal: "Our Fabric does not require agent replacement; it operates as an ingest aggregator...",
              confidence: 0.94
            }
          ]
        }
      }, null, 2),
      curl: `curl -X POST http://localhost:5001/api/battlecard \\
  -H "Content-Type: application/json" \\
  -d '{"meetingId": "meet-101"}'`
    },
    {
      id: "ep-coach",
      method: "POST",
      path: "/api/coach/chat",
      category: "coach",
      title: "Coach AI Multi-Turn Sales Dialog",
      description: "Conversational agentic sparring partner for Enterprise Account Executives. Simulates real-time boardroom pushback and provides tactical deal coaching.",
      headers: { "Content-Type": "application/json" },
      requestBody: JSON.stringify({
        message: "The prospect's CFO says our $180k price tag is 3x higher than their open-source alternative.",
        conversationHistory: [
          { role: "user", text: "How should I structure the opening 5 minutes for GLC?" },
          { role: "assistant", text: "Anchor immediately on their Q3 earnings disclosure of $4.2M demurrage penalties..." }
        ]
      }, null, 2),
      responseBody: JSON.stringify({
        success: true,
        data: {
          reply: "Anchor on Total Cost of Inaction (TCOI). An open-source stack requires an estimated 2.5 dedicated DevOps engineers ($380K/yr overhead), whereas DealPilot's managed engine pays for itself in 90 days.",
          suggestedFramework: "Chris Voss Mirroring + Value-Anchor Pivot",
          recommendedAction: "Offer a milestone-gated POC tied directly to a $50K proof-of-value benchmark."
        }
      }, null, 2),
      curl: `curl -X POST http://localhost:5001/api/coach/chat \\
  -H "Content-Type: application/json" \\
  -d '{"message": "How do I counter the budget freeze objection?"}'`
    },
    {
      id: "ep-simulate",
      method: "POST",
      path: "/api/simulate-objection",
      category: "coach",
      title: "Single-Turn Objection Simulator",
      description: "Instantly stress-tests an objection against target executive persona psychology, delivering 3 structured counter-strategies.",
      headers: { "Content-Type": "application/json" },
      requestBody: JSON.stringify({
        objection: "Security team flagged your multi-tenant cloud as a compliance risk.",
        personaTitle: "Chief Information Security Officer (CISO)",
        companyName: "FinTech Securities Ltd",
        context: "SOC2 Type II in progress; customer requires strict tenant isolation"
      }, null, 2),
      responseBody: JSON.stringify({
        success: true,
        data: {
          psychologicalDriver: "Fear of regulatory audit breach and personal career liability.",
          strategies: [
            {
              technique: "Acknowledge & Reframe",
              talkTrack: "We fully respect strict posture. That's why we support Customer-Managed Encryption Keys (CMEK) and dedicated VPC peering."
            },
            {
              technique: "Evidence-Based Validation",
              talkTrack: "We are trusted by 4 Tier-1 financial institutions under similar FINRA regulatory audits."
            }
          ]
        }
      }, null, 2),
      curl: `curl -X POST http://localhost:5001/api/simulate-objection \\
  -H "Content-Type: application/json" \\
  -d '{"objection": "No budget this quarter", "personaTitle": "VP Procurement"}'`
    },
    {
      id: "ep-analyze",
      method: "POST",
      path: "/api/analyze-custom",
      category: "intelligence",
      title: "On-Demand Company Intelligence Dossier",
      description: "Generates an instant 360-degree account intelligence dossier for any custom enterprise domain, including competitive moats, current pain points, and strategic entry points.",
      headers: { "Content-Type": "application/json" },
      requestBody: JSON.stringify({
        companyName: "Stripe",
        industry: "Financial Infrastructure / Developer APIs",
        targetPersona: "VP of Developer Experience",
        meetingGoal: "Present API latency reduction and automated schema migration"
      }, null, 2),
      responseBody: JSON.stringify({
        success: true,
        data: {
          dossier: {
            strategicPriorities: ["Global agentic commerce payments", "Cryptocurrency onramp latency reduction"],
            likelyObstacles: ["Extreme bias towards in-house developer tool building"],
            recommendedEntryHook: "Showcase automated sub-millisecond trace stitching without runtime overhead."
          }
        }
      }, null, 2),
      curl: `curl -X POST http://localhost:5001/api/analyze-custom \\
  -H "Content-Type: application/json" \\
  -d '{"companyName": "Palantir Technologies", "industry": "Enterprise AI"}'`
    },
    {
      id: "ep-hubspot-calendar",
      method: "POST",
      path: "/api/hubspot/sync-calendar",
      category: "crm",
      title: "HubSpot Single Hub Calendar Bi-directional Sync",
      description: "Synchronizes scheduled calendar meetings directly from the authenticated HubSpot CRM portal into DealPilot's active meeting intelligence queue.",
      headers: { "Content-Type": "application/json" },
      requestBody: "{}",
      responseBody: JSON.stringify({
        success: true,
        count: 5,
        message: "HubSpot Calendar synchronized successfully",
        data: [
          {
            id: "hub-meet-001",
            title: "Q3 Modernization Review - Global Logistics Corp",
            time: "Today at 2:00 PM",
            hubspotDealId: "12849102",
            portalId: "247526396"
          }
        ]
      }, null, 2),
      curl: `curl -X POST http://localhost:5001/api/hubspot/sync-calendar`
    },
    {
      id: "ep-catalog-ai",
      method: "POST",
      path: "/api/catalog/ai-generate",
      category: "catalog",
      title: "AI Product Solution Specification Generator",
      description: "Accepts raw product concepts and formats enterprise-grade B2B solutions with quantified ROI metrics, target buying personas, and competitive positioning.",
      headers: { "Content-Type": "application/json" },
      requestBody: JSON.stringify({
        name: "Agentic FinOps Safeguard",
        businessUnit: "Autonomous Cloud Governance"
      }, null, 2),
      responseBody: JSON.stringify({
        success: true,
        data: {
          category: "Cloud Economics & Automation",
          targetPersonas: ["Chief Financial Officer", "VP Cloud Architecture"],
          elevatorPitch: "Autonomous cloud spending governance that halts runaway LLM token burns in real time.",
          typicalROI: "4.2x ROI within 90 days by eradicating orphaned cluster spend"
        }
      }, null, 2),
      curl: `curl -X POST http://localhost:5001/api/catalog/ai-generate \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Neural Data Mesh", "businessUnit": "Data Platform"}'`
    }
  ];

  const filteredEndpoints = selectedCategory === "all"
    ? endpoints
    : endpoints.filter(ep => ep.category === selectedCategory);

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Hero / Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
              <Code2 className="w-3.5 h-3.5" />
              <span>DealPilot Developer Documentation & Core Architecture</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Enterprise AI Engine & API Reference
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Explore the REST API endpoints, the multi-tier Gemini generative AI fallback cascading logic, 
              HubSpot CRM Single Hub Private App bi-directional connectors, and enterprise security architecture.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-xs flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <div className="text-left">
                <div className="text-[11px] font-bold text-slate-200">Local API Core</div>
                <div className="text-[10px] font-mono text-emerald-400">http://localhost:5001/api</div>
              </div>
            </div>
            <div className="px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-xs flex items-center gap-3">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <div className="text-left">
                <div className="text-[11px] font-bold text-slate-200">AI Reasoning Engine</div>
                <div className="text-[10px] font-mono text-indigo-300">Gemini 3.6 Flash Multi-Tier</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigators */}
        <div className="flex items-center gap-2 mt-8 pt-4 border-t border-slate-800 overflow-x-auto">
          {[
            { id: "endpoints", label: "REST Endpoints", icon: Terminal },
            { id: "architecture", label: "System Architecture", icon: Server },
            { id: "gemini", label: "Gemini AI Fallback Cascade", icon: Cpu },
            { id: "hubspot", label: "HubSpot Single Hub Connector", icon: Database }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: REST Endpoints */}
      {activeTab === "endpoints" && (
        <div className="space-y-6">
          {/* Category Filter */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-1.5 p-1 bg-white border border-[#e2e8f0] rounded-xl shadow-xs">
              {[
                { id: "all", label: "All Endpoints" },
                { id: "intelligence", label: "Account & Battlecards" },
                { id: "coach", label: "Coach AI & Objections" },
                { id: "crm", label: "HubSpot CRM" },
                { id: "catalog", label: "Solution Catalog" }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    selectedCategory === cat.id
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-500 font-mono">
              Showing {filteredEndpoints.length} registered API routes
            </div>
          </div>

          {/* Endpoints List */}
          <div className="space-y-6">
            {filteredEndpoints.map((ep) => (
              <div 
                key={ep.id} 
                className="bg-white rounded-2xl border border-[#e2e8f0] p-5 sm:p-6 shadow-xs hover:shadow-md transition space-y-4"
              >
                {/* Method & Path Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-extrabold ${
                      ep.method === "POST" 
                        ? "bg-indigo-100 text-indigo-800 border border-indigo-200" 
                        : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    }`}>
                      {ep.method}
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-slate-900">
                      {ep.path}
                    </span>
                  </div>

                  <button
                    onClick={() => copyToClipboard(ep.curl, ep.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition self-start sm:self-auto"
                  >
                    {copiedSnippet === ep.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">cURL Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy cURL</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{ep.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{ep.description}</p>
                </div>

                {/* Request & Response Grids */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Request */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <span>Request Payload (JSON)</span>
                      <span className="font-mono text-slate-400">Content-Type: application/json</span>
                    </div>
                    <pre className="p-3.5 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono overflow-x-auto max-h-56 leading-relaxed">
                      {ep.requestBody}
                    </pre>
                  </div>

                  {/* Response */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <span>Response Payload (JSON)</span>
                      <span className="font-mono text-emerald-500">200 OK</span>
                    </div>
                    <pre className="p-3.5 bg-slate-900 text-emerald-300 rounded-xl text-xs font-mono overflow-x-auto max-h-56 leading-relaxed">
                      {ep.responseBody}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: System Architecture */}
      {activeTab === "architecture" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">End-to-End System Topology</h2>
              <p className="text-xs text-slate-600 mt-1">
                DealPilot is built as a micro-service hybrid architecture pairing a high-performance Next.js 16 frontend with an Express API intelligence proxy and live HubSpot CRM endpoints.
              </p>
            </div>

            {/* Architecture Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/20">
                  <Box className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">1. Client Layer (Next.js 16)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  React 19 single-page application utilizing Turbopack, Tailwind CSS utility styling, dynamic state synchronizers, and zero-flicker URL state reconciliation.
                </p>
                <div className="text-[10px] font-mono text-indigo-700 bg-white p-2 rounded-lg border border-indigo-200">
                  Port: 3000 • Client-side router
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-600/20">
                  <Server className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">2. Intelligence Core (Node/Express)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fast RESTful API middleware executing prompt orchestration, proprietary persona scoring algorithms, real-time catalog mapping, and multi-model failover chains.
                </p>
                <div className="text-[10px] font-mono text-emerald-700 bg-white p-2 rounded-lg border border-emerald-200">
                  Port: 5001 • Express + CORS + Helmet
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-md shadow-amber-600/20">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">3. HubSpot CRM Single Hub</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Live bi-directional synchronization via HubSpot Private App Access Tokens. Syncs calendar events, enterprise deals, contacts, and companies directly into memory.
                </p>
                <div className="text-[10px] font-mono text-amber-700 bg-white p-2 rounded-lg border border-amber-200">
                  HubSpot Portal ID: 247526396
                </div>
              </div>
            </div>

            {/* Security & Data Governance */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-800">Enterprise Data Governance & Privacy</h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  All AI inference requests are dispatched with strict zero-retention parameters. Customer CRM records, call transcripts, and meeting metadata are never stored on public foundation model training sets.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Gemini Fallback Cascade */}
      {activeTab === "gemini" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Gemini Multi-Model Cascading Fallback</h2>
              <p className="text-xs text-slate-600 mt-1">
                To guarantee 99.9% uptime during live executive boardroom pitches, DealPilot implements a 4-tier cascading retry and fallback protocol.
              </p>
            </div>

            {/* Cascade Steps */}
            <div className="space-y-3">
              {[
                {
                  tier: "Tier 1 (Primary)",
                  model: "gemini-3.6-flash",
                  desc: "Ultra-low latency reasoning model optimized for real-time B2B conversation steering and strategic synthesis.",
                  badge: "Default AI Model",
                  color: "border-indigo-200 bg-indigo-50/40 text-indigo-900"
                },
                {
                  tier: "Tier 2 (Fallback A)",
                  model: "gemini-3.5-flash",
                  desc: "High-throughput fallback invoked automatically on any rate limit (429) or transient network timeout.",
                  badge: "Automated Failover",
                  color: "border-slate-200 bg-slate-50 text-slate-800"
                },
                {
                  tier: "Tier 3 (Fallback B)",
                  model: "gemini-flash-latest",
                  desc: "Global production alias endpoint ensuring maximum regional redundancy across Google Cloud availability zones.",
                  badge: "Zone Redundancy",
                  color: "border-slate-200 bg-slate-50 text-slate-800"
                },
                {
                  tier: "Tier 4 (Guaranteed Offline)",
                  model: "Heuristic Strategic Rules Engine",
                  desc: "Local in-memory deterministic engine analyzing account size, executive titles, and catalog mapping to deliver battlecards even without an internet connection.",
                  badge: "100% Offline SLA",
                  color: "border-amber-200 bg-amber-50/40 text-amber-900"
                }
              ].map((step, idx) => (
                <div key={idx} className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${step.color}`}>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono">{step.tier}:</span>
                      <span className="text-xs font-mono font-extrabold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-900">
                        {step.model}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed">{step.desc}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white border border-slate-200 self-start sm:self-auto">
                    {step.badge}
                  </span>
                </div>
              ))}
            </div>

            {/* Implementation Code Snippet */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-700">Fallback Implementation in aiService.js</div>
              <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
{`async function generateTextWithFallback(prompt) {
  const models = ["gemini-3.6-flash", "gemini-3.5-flash", "gemini-flash-latest"];
  for (const model of models) {
    try {
      return await callGeminiAPI(model, prompt);
    } catch (err) {
      console.warn(\`Model \${model} failed, falling back to next tier...\`);
    }
  }
  // Deterministic Offline Heuristic Fallback
  return generateDeterministicOfflineStrategy(prompt);
}`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: HubSpot CRM Integration */}
      {activeTab === "hubspot" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">HubSpot CRM Single Hub Specification</h2>
              <p className="text-xs text-slate-600 mt-1">
                DealPilot communicates with HubSpot via Private App Access Tokens, enabling granular OAuth scopes without user credential leakage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <h4 className="text-xs font-bold text-slate-900">Configured Scopes</h4>
                <ul className="space-y-1.5 text-xs text-slate-600 font-mono">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>crm.objects.deals.read</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>crm.objects.contacts.read</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>crm.objects.companies.read</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>sales-email-read / calendar-read</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <h4 className="text-xs font-bold text-slate-900">Environment Variables</h4>
                <div className="space-y-1.5 text-xs font-mono text-slate-700">
                  <div className="p-2 bg-white rounded border border-slate-200">
                    HUBSPOT_ACCESS_TOKEN=pat-na2-***
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    GEMINI_API_KEY=AIzaSy***
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    PORT=5001
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
