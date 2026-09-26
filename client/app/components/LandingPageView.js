"use client";

import { useState } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Users, 
  Building2, 
  Layers, 
  Clock, 
  Target, 
  BrainCircuit, 
  Calendar,
  Lock,
  ChevronRight,
  ExternalLink,
  Award,
  Flame,
  Check,
  FileText,
  Scale,
  Globe,
  Cookie
} from "lucide-react";

import TrustCenterModal from "./TrustCenterModal";

export default function LandingPageView({ onGoToLogin, onLaunchApp, isLoggedIn }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const [isTrustModalOpen, setIsTrustModalOpen] = useState(false);
  const [trustModalTab, setTrustModalTab] = useState("privacy");

  const scrollTo = (id) => {
    if (typeof window !== "undefined") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const openPolicyModal = (tab = "privacy") => {
    setTrustModalTab(tab);
    setIsTrustModalOpen(true);
  };

  const handleGoToLogin = () => {
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname);
    }
    onGoToLogin();
  };

  const handleLaunchApp = () => {
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname);
    }
    onLaunchApp();
  };

  const comparisonRows = [
    {
      feature: "Turnaround Time for Pre-Meeting Prep",
      dealPilot: "5 Minutes (Autonomous AI Synthesis)",
      manualPrep: "3.5 to 4 Hours per Account",
      legacyCrm: "1.5 Hours (Fragmented fields)",
      genericAi: "30-45 Mins (Manual prompt drafting)",
      highlight: true
    },
    {
      feature: "Context Depth & Data Ingestion",
      dealPilot: "Live 10-K Filings + Earnings Calls + News Signals + Live CRM ARR",
      manualPrep: "Surface-level Google & LinkedIn browsing",
      legacyCrm: "Stale custom fields & text notes",
      genericAi: "No enterprise CRM or real-time filing data"
    },
    {
      feature: "Stakeholder Psychology & KPI Mapping",
      dealPilot: "Algorithmic personality profiling, likely objections & talk tracks",
      manualPrep: "Guesswork based on job titles",
      legacyCrm: "Basic contact record & email address",
      genericAi: "Generic persona summaries without sales context"
    },
    {
      feature: "Multi-BU Whitespace & Cross-Selling",
      dealPilot: "Deterministic matching across entire enterprise solution catalog",
      manualPrep: "Reps stick only to the 1 product they know",
      legacyCrm: "Manual product lines on opportunity",
      genericAi: "Hallucinates product capabilities"
    },
    {
      feature: "Interactive Rehearsal (Coach AI)",
      dealPilot: "Live psychological objection coaching & talk track formulation",
      manualPrep: "No practice or internal peer roleplay",
      legacyCrm: "Static battlecards in PDF or SharePoint",
      genericAi: "Generic responses without objection framework"
    },
    {
      feature: "CRM & Calendar Integration Hub",
      dealPilot: "Single Hub: Native HubSpot CRM Deals, Contacts & Scheduled Meetings",
      manualPrep: "Disconnected calendar invites & copy-pasting",
      legacyCrm: "Requires separate calendar integration tools",
      genericAi: "Zero CRM or Calendar connectivity"
    },
    {
      feature: "Executive Email Primer Drafting",
      dealPilot: "Instant 1-Click tailored executive follow-up & discovery primers",
      manualPrep: "Manual copywriting with corporate boilerplate",
      legacyCrm: "Standard templates that buyers ignore",
      genericAi: "Generic email drafts lacking deal context"
    },
    {
      feature: "Data Privacy & Enterprise Security",
      dealPilot: "SOC2 Type II, AES-256 encrypted, Zero model training on tenant data",
      manualPrep: "Rep notes scattered on local laptops",
      legacyCrm: "Standard CRM security",
      genericAi: "Risk of confidential deal data leaking into public models"
    }
  ];

  const features = [
    {
      icon: Calendar,
      title: "Pre-Meeting Intelligence Feed",
      desc: "Streams upcoming executive calls directly from HubSpot Calendar. Automatically primes 4-tier strategic battlecards with executive value propositions before you dial in."
    },
    {
      icon: Building2,
      title: "Target Account Intelligence",
      desc: "Ingests 10-K annual reports, quarterly investor calls, and market news to detect strategic urgency and cross-BU whitespace across tier-1 enterprises."
    },
    {
      icon: Target,
      title: "Coach AI Strategic Chatbot",
      desc: "Rehearse against real buyer pushbacks (budget freeze, in-house build, competitor SIs) and formulate persuasive, data-backed counter-tactics in real time."
    },
    {
      icon: Layers,
      title: "Dynamic Enterprise Catalog",
      desc: "Maps multi-BU solutions directly to buyer KPIs. Add custom product offerings on the fly with generative AI auto-complete."
    },
    {
      icon: Zap,
      title: "Single-Hub CRM & Calendar Integration",
      desc: "Connects bi-directionally to your enterprise CRM and calendar. Pulls active deals, contacts, and scheduled meetings without requiring third-party plugins."
    },
    {
      icon: ShieldCheck,
      title: "Enterprise Boundary Security",
      desc: "Built for enterprise pursuit teams. Ingested client intelligence and internal CRM deal pipelines are strictly isolated and never leaked."
    }
  ];

  const faqs = [
    {
      q: "How does DealPilot differ from tools like Gong, Chorus, or HubSpot alone?",
      a: "Gong and Chorus analyze calls after they happen (post-meeting intelligence). DealPilot operates BEFORE the meeting (pre-meeting intelligence), giving your AE the exact executive strategy, stakeholder psychological drivers, and objection handling talk tracks needed to win the deal upfront."
    },
    {
      q: "Why do we use HubSpot as the Single Hub instead of Google Meet or external calendars?",
      a: "HubSpot CRM Meetings natively associate scheduled executive calls with company records, contact titles, and deal ARR under one secure portal. This eliminates fragmented Google Cloud OAuth setups and gives reps a single source of truth."
    },
    {
      q: "Can sales reps practice and roleplay before high-stakes executive calls?",
      a: "Yes! Coach AI features an interactive agentic simulator where reps can test objections (such as budget freezes, competitor SIs, or timeline pushbacks) and receive verbatim consultative scripts."
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#0f172a] selection:bg-indigo-100 selection:text-indigo-900">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-indigo-500/4 rounded-full blur-[140px]"></div>
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-amber-500/3 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-emerald-500/3 rounded-full blur-[130px]"></div>
      </div>

      {/* 1. Global Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#faf8f5]/85 backdrop-blur-xl border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center shadow-md shadow-indigo-500/25 text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-[#0f172a]">
                  DealPilot
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold tracking-wider uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
                  ENTERPRISE
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold leading-none">Rish AI Labs</p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <button onClick={() => scrollTo("features")} className="hover:text-indigo-600 transition cursor-pointer">Capabilities</button>
            <button onClick={() => scrollTo("comparison")} className="hover:text-indigo-600 transition cursor-pointer">Why DealPilot</button>
            <button onClick={() => scrollTo("pipeline")} className="hover:text-indigo-600 transition cursor-pointer">How It Works</button>
            <button onClick={() => openPolicyModal("privacy")} className="hover:text-indigo-600 transition cursor-pointer flex items-center gap-1 text-emerald-700 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Trust Centre</span>
            </button>
            <button onClick={() => scrollTo("faqs")} className="hover:text-indigo-600 transition cursor-pointer">FAQ</button>
          </nav>

          {/* Right Action: Sign In Button */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <button
                onClick={handleLaunchApp}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs hover:shadow transition flex items-center gap-1.5"
              >
                <span>Launch Cockpit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleGoToLogin}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs hover:shadow transition flex items-center gap-1.5"
              >
                <span>Sign In / Enter Cockpit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative z-10 pt-16 pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-200 shadow-xs text-xs font-semibold text-indigo-800">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Autonomous Pre-Meeting Intelligence & Pitch Strategy Engine</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.12]">
          Never Walk into a Strategic Meeting <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900">
            Unprepared Again.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          DealPilot connects your enterprise calendar & HubSpot CRM, ingests live 10-Ks and market signals, and synthesizes 
          <strong> board-level battlecards, stakeholder psychology, and real-time objection talk tracks in under 5 minutes</strong>.
        </p>

        {/* CTA Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={isLoggedIn ? handleLaunchApp : handleGoToLogin}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
          >
            <span>{isLoggedIn ? "Open AE Cockpit" : "Sign In & Launch DealPilot"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollTo("comparison")}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>See Platform Comparison</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Live Metrics Row */}
        <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
          <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Prep Time</span>
            <span className="text-xl font-black text-indigo-700 font-mono mt-0.5 block">5 Mins</span>
            <span className="text-[11px] text-slate-500">Down from 4 hours</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Win Rate Velocity</span>
            <span className="text-xl font-black text-emerald-700 font-mono mt-0.5 block">+28%</span>
            <span className="text-[11px] text-slate-500">Across tier-1 accounts</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Whitespace Capture</span>
            <span className="text-xl font-black text-purple-700 font-mono mt-0.5 block">3.4x</span>
            <span className="text-[11px] text-slate-500">Multi-BU cross-sell</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">CRM Integration</span>
            <span className="text-xl font-black text-slate-800 font-mono mt-0.5 block">Single Hub</span>
            <span className="text-[11px] text-slate-500">HubSpot Live Calendar</span>
          </div>
        </div>
      </section>

      {/* 3. Comprehensive Comparison Table ("Why Choose DealPilot") */}
      <section id="comparison" className="relative z-10 py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" /> Platform Evaluation Matrix
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0f172a] tracking-tight">
            Why Enterprise Sales Teams Choose DealPilot
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            See how DealPilot’s autonomous pre-meeting intelligence stacks up against traditional manual prep, standalone CRMs, and generic AI tools.
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="bg-white rounded-3xl border border-[#e2e8f0] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#e2e8f0]">
                  <th className="p-4 pl-6 text-slate-500 font-bold uppercase tracking-wider w-1/4">
                    Capability & Dimension
                  </th>
                  <th className="p-4 bg-indigo-600 text-white font-extrabold text-sm w-1/4 shadow-inner">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-200" />
                      <span>DealPilot Enterprise</span>
                    </div>
                    <span className="text-[10px] text-indigo-200 font-normal block mt-0.5">By Rish AI Labs</span>
                  </th>
                  <th className="p-4 bg-slate-50 text-slate-700 font-bold text-xs w-1/6">
                    Manual Sales Prep
                    <span className="text-[10px] text-slate-400 font-normal block mt-0.5">Reps doing Google research</span>
                  </th>
                  <th className="p-4 bg-slate-50 text-slate-700 font-bold text-xs w-1/6">
                    Legacy CRM Alone
                    <span className="text-[10px] text-slate-400 font-normal block mt-0.5">Salesforce / HubSpot native</span>
                  </th>
                  <th className="p-4 bg-slate-50 text-slate-700 font-bold text-xs w-1/6 pr-6">
                    Generic AI (ChatGPT)
                    <span className="text-[10px] text-slate-400 font-normal block mt-0.5">Prompting general bots</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition">
                    <td className="p-4 pl-6 font-bold text-[#0f172a] align-top">
                      {row.feature}
                    </td>

                    {/* DealPilot Highlight Column */}
                    <td className="p-4 bg-indigo-50/60 text-indigo-950 font-semibold border-x border-indigo-100 align-top">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{row.dealPilot}</span>
                      </div>
                    </td>

                    {/* Manual Prep */}
                    <td className="p-4 text-slate-600 align-top">
                      <div className="flex items-start gap-1.5">
                        <XCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{row.manualPrep}</span>
                      </div>
                    </td>

                    {/* Legacy CRM */}
                    <td className="p-4 text-slate-600 align-top">
                      <div className="flex items-start gap-1.5">
                        <XCircle className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{row.legacyCrm}</span>
                      </div>
                    </td>

                    {/* Generic AI */}
                    <td className="p-4 pr-6 text-slate-600 align-top">
                      <div className="flex items-start gap-1.5">
                        <XCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{row.genericAi}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Core Features Grid */}
      <section id="features" className="relative z-10 py-16 px-4 sm:px-6 max-w-7xl mx-auto border-t border-[#e2e8f0]">
        <div className="text-center space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-emerald-600" /> Platform Architecture
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0f172a] tracking-tight">
            Engineered for Modern Enterprise Pursuit Teams
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Everything Account Executives and Sales Directors need to close strategic 6- and 7-figure enterprise contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-3 hover:border-indigo-300 transition">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0f172a]">{f.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. How It Works Pipeline */}
      <section id="pipeline" className="relative z-10 py-16 px-4 sm:px-6 max-w-7xl mx-auto border-t border-[#e2e8f0]">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-2xl sm:text-4xl font-black text-[#0f172a] tracking-tight">
            The Autonomous 4-Stage Intelligence Loop
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            From calendar invite detection to live post-meeting CRM writeback in one continuous flow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-2.5">
            <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center">
              1
            </span>
            <h4 className="text-sm font-extrabold text-[#0f172a]">Calendar & Deal Sync</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Detects incoming meeting invites, buyer attendee titles, and historical CRM deal notes automatically.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-2.5">
            <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center">
              2
            </span>
            <h4 className="text-sm font-extrabold text-[#0f172a]">Signal & 10-K Ingestion</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Extracts operational pain points from earnings transcripts, active vendor contracts, and regulatory stress tests.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-2.5">
            <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center">
              3
            </span>
            <h4 className="text-sm font-extrabold text-[#0f172a]">Deterministic Catalog Matching</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Scores all solution modules to identify the single highest-margin pitch for the economic buyer's stated KPIs.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-2.5">
            <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center">
              4
            </span>
            <h4 className="text-sm font-extrabold text-[#0f172a]">Interactive Rehearsal</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              AE rehearses with Coach AI, copies ready-to-send executive primers, and walks into the meeting with total conviction.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Enterprise Security & Trust Centre Highlights */}
      <section id="trust-center" className="relative z-10 py-16 px-4 sm:px-6 max-w-7xl mx-auto border-t border-[#e2e8f0]">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Enterprise Trust & Compliance
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0f172a] tracking-tight">
            Security, Privacy & Regulatory Governance
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Engineered from day one for Fortune 500 security audits. Zero customer AI training, isolated VPC execution, comprehensive GDPR rights, and strict privacy safeguards.
          </p>
        </div>

        {/* Trust Badges Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div 
            onClick={() => openPolicyModal("privacy")}
            className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs flex items-center gap-3.5 cursor-pointer hover:border-emerald-300 hover:shadow-sm transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">SOC 2 Type II</div>
              <div className="text-[11px] text-slate-500">Security & Availability Ready</div>
            </div>
          </div>

          <div 
            onClick={() => openPolicyModal("gdpr")}
            className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs flex items-center gap-3.5 cursor-pointer hover:border-indigo-300 hover:shadow-sm transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">GDPR & CCPA</div>
              <div className="text-[11px] text-slate-500">EU Data Residency Supported</div>
            </div>
          </div>

          <div 
            onClick={() => openPolicyModal("privacy")}
            className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs flex items-center gap-3.5 cursor-pointer hover:border-amber-300 hover:shadow-sm transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700">Zero Model Retention</div>
              <div className="text-[11px] text-slate-500">Never Trained on AI Weights</div>
            </div>
          </div>

          <div 
            onClick={() => openPolicyModal("terms")}
            className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs flex items-center gap-3.5 cursor-pointer hover:border-blue-300 hover:shadow-sm transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">AES-256 & TLS 1.3</div>
              <div className="text-[11px] text-slate-500">Bank-Grade Encryption</div>
            </div>
          </div>
        </div>

        {/* Action Button to Open Trust Centre Documents */}
        <div className="text-center pt-2">
          <button
            onClick={() => openPolicyModal("privacy")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Open Trust Centre & Legal Documentation</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section id="faqs" className="relative z-10 py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#e2e8f0]">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-xs space-y-2">
              <h4 className="text-sm font-bold text-[#0f172a]">{faq.q}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Bottom CTA Banner */}
      <section className="relative z-10 py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="bg-gradient-to-tr from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>Built by Rish AI Labs for High-Velocity Enterprise AEs</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Ready to Accelerate Your Enterprise Pipeline?
          </h2>

          <p className="text-xs sm:text-sm text-indigo-200 max-w-lg mx-auto leading-relaxed">
            Eliminate non-billable prep hours, standardize consultative pitch excellence across your team, and win board-level deals.
          </p>

          <div className="pt-2">
            <button
              onClick={isLoggedIn ? handleLaunchApp : handleGoToLogin}
              className="px-7 py-3 rounded-2xl bg-white hover:bg-slate-100 text-indigo-950 font-black text-sm shadow-lg transition inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{isLoggedIn ? "Open DealPilot Cockpit" : "Sign In to Your Workspace"}</span>
              <ArrowRight className="w-4 h-4 text-indigo-600" />
            </button>
          </div>
        </div>
      </section>

      {/* 9. Clean Unified Enterprise Footer */}
      <footer className="relative z-10 border-t border-[#e2e8f0] py-8 text-xs text-slate-500 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0f172a]">DealPilot Enterprise</span>
            <span>•</span>
            <span>Rish AI Labs</span>
            <span className="hidden sm:inline text-slate-400">| Autonomous Pre-Meeting Intelligence</span>
          </div>

          {/* Clean Policy Links (Opens each page on click) */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-slate-600 font-medium">
            <button onClick={() => openPolicyModal("privacy")} className="hover:text-indigo-600 transition cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => openPolicyModal("terms")} className="hover:text-indigo-600 transition cursor-pointer">
              Terms & Conditions
            </button>
            <button onClick={() => openPolicyModal("gdpr")} className="hover:text-indigo-600 transition cursor-pointer">
              GDPR
            </button>
            <button onClick={() => openPolicyModal("cookies")} className="hover:text-indigo-600 transition cursor-pointer">
              Cookies
            </button>
            <button onClick={() => openPolicyModal("privacy")} className="hover:text-indigo-600 transition cursor-pointer text-emerald-700 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Trust Centre</span>
            </button>
          </div>

          <div className="text-slate-400">
            © 2026 DealPilot. All rights reserved.
          </div>
        </div>
      </footer>

      {/* On-Demand Trust Centre Modal */}
      <TrustCenterModal
        isOpen={isTrustModalOpen}
        initialTab={trustModalTab}
        onClose={() => setIsTrustModalOpen(false)}
      />
    </div>
  );
}
