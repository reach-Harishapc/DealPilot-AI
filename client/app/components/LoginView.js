"use client";

import { useState } from "react";
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  User, 
  Mail, 
  Lock, 
  Briefcase, 
  Building2, 
  DollarSign
} from "lucide-react";

export default function LoginView({ onLogin, onBackToHome }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [email, setEmail] = useState("harish@rishailabs.com");
  const [password, setPassword] = useState("••••••••••••");

  // User Profile fields
  const [name, setName] = useState("Harish Kumar");
  const [title, setTitle] = useState("Lead Enterprise AE • Strategic Accounts");
  const [company, setCompany] = useState("Rish AI Labs");
  const [quota, setQuota] = useState("$1,500,000 ARR");

  const [loading, setLoading] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const user = {
        name: name || "Harish Kumar",
        title: title || "Enterprise Strategic AE",
        email: email || "harish@rishailabs.com",
        company: company || "Rish AI Labs",
        quota: quota || "$1,500,000 ARR",
        pipelineARR: "$1,150,000 ARR",
        avatar: "HK",
        role: "Strategic AE"
      };
      onLogin(user);
      setLoading(false);
    }, 400);
  };

  const handleCreateProfile = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);

      const newUser = {
        name: name.trim(),
        title: title.trim() || "Account Executive",
        email: email.trim() || "harish@rishailabs.com",
        company: company.trim() || "Rish AI Labs",
        quota: quota.trim() || "$1,500,000 ARR",
        pipelineARR: "$1,150,000 ARR",
        avatar: initials || "HK",
        role: "Strategic AE"
      };
      onLogin(newUser);
      setLoading(false);
    }, 450);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative bg-[#faf8f5] text-[#0f172a] selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px]"></div>
        <div className="absolute top-1/2 -right-32 w-[550px] h-[550px] bg-amber-500/4 rounded-full blur-[160px]"></div>
        <div className="absolute -bottom-32 left-1/3 w-[450px] h-[450px] bg-emerald-500/4 rounded-full blur-[130px]"></div>
      </div>

      <div className="w-full max-w-md z-10 space-y-5">
        {/* Back to Home Button */}
        {onBackToHome && (
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <span className="text-[11px] font-semibold text-slate-400">Rish AI Labs</span>
          </div>
        )}

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/25 mb-1">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-[#0f172a]">
              DealPilot
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
              ENTERPRISE
            </span>
          </div>
          <p className="text-xs font-semibold text-indigo-950">
            Rish AI Labs • Autonomous Pre-Meeting Intelligence Platform
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl border border-[#e2e8f0] shadow-sm p-6 sm:p-7 space-y-5">
          {/* Mode Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`py-2 rounded-xl transition ${
                mode === "login"
                  ? "bg-white text-indigo-700 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`py-2 rounded-xl transition ${
                mode === "register"
                  ? "bg-white text-indigo-700 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Setup Profile
            </button>
          </div>

          {/* SIGN IN FORM */}
          {mode === "login" && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Enterprise Work Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="harish@rishailabs.com"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0f172a] placeholder-slate-400 focus:bg-white focus:border-indigo-500 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0f172a] placeholder-slate-400 focus:bg-white focus:border-indigo-500 outline-none transition"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <label className="flex items-center gap-1.5 text-slate-500 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-0" />
                  <span>Remember session</span>
                </label>
                <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">
                  SSO via Okta
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs hover:shadow transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Authenticating Session...</span>
                ) : (
                  <>
                    <span>Sign In to DealPilot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* SETUP PROFILE FORM */}
          {mode === "register" && (
            <form onSubmit={handleCreateProfile} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Harish Kumar"
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0f172a] placeholder-slate-400 focus:bg-white focus:border-indigo-500 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Role / Title
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Lead Enterprise AE • Strategic Accounts"
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0f172a] placeholder-slate-400 focus:bg-white focus:border-indigo-500 outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Company
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Rish AI Labs"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0f172a] placeholder-slate-400 focus:bg-white focus:border-indigo-500 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Annual Quota
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={quota}
                      onChange={(e) => setQuota(e.target.value)}
                      placeholder="$1,500,000 ARR"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0f172a] placeholder-slate-400 focus:bg-white focus:border-indigo-500 outline-none transition"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="harish@rishailabs.com"
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0f172a] placeholder-slate-400 focus:bg-white focus:border-indigo-500 outline-none transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs hover:shadow transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Saving Profile...</span>
                ) : (
                  <>
                    <span>Save Profile & Launch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Security footnote */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>SOC2 Type II Protected</span>
            </span>
            <span>Single User Workspace</span>
          </div>
        </div>
      </div>
    </div>
  );
}
