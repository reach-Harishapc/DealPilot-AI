"use client";

import { useState } from "react";
import { apiFetch } from "../../lib/api";
import { Building2, TrendingUp, Users, DollarSign, ArrowRight, Flame, Layers, RefreshCw, ExternalLink, CheckCircle2, Plus } from "lucide-react";

export default function AccountsView({ accounts, onAccountsUpdated, onOpenNewAccount }) {
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0]?.id || "");
  const [syncing, setSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const selectedAccount = accounts.find((a) => a.id === selectedAccountId) || accounts[0];

  const handleSyncHubSpotAccounts = async () => {
    setSyncing(true);
    try {
      const data = await apiFetch("/api/hubspot/sync-accounts", {
        method: "POST"
      });
      if (data.success && data.data) {
        if (onAccountsUpdated) {
          onAccountsUpdated(data.data);
        }
        if (data.data.length > 0) {
          setSelectedAccountId(data.data[0].id);
        }
        setSyncSuccess(true);
        setTimeout(() => setSyncSuccess(false), 3000);
      }
    } catch (err) {
      console.error("HubSpot accounts sync error:", err);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-600" />
            Enterprise Target Accounts Directory
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Continuous signal intelligence, 10-K filings, executive movements, and multi-BU penetration tracking.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenNewAccount}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition"
            title="Analyze and add a new target enterprise account"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Account</span>
          </button>

          <button
            onClick={handleSyncHubSpotAccounts}
            disabled={syncing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition shadow-2xs"
            title="Sync accounts, companies, and contacts directly from HubSpot CRM"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin text-indigo-600" : "text-orange-500"}`} />
            <span>{syncSuccess ? "HubSpot Synced!" : (syncing ? "Syncing CRM..." : "Sync HubSpot Accounts")}</span>
          </button>

          <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <span className="text-slate-400 mr-1.5">Monitored:</span>
            <strong className="text-[#0f172a] font-mono">{accounts.length} Strategic</strong>
          </div>
        </div>
      </div>

      {/* Account Cards & Details Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Account List */}
        <div className="lg:col-span-5 space-y-3">
          {accounts.map((acc) => {
            const isSelected = acc.id === selectedAccountId;
            return (
              <div
                key={acc.id}
                onClick={() => setSelectedAccountId(acc.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? "bg-indigo-50/70 border-indigo-300 shadow-xs ring-1 ring-indigo-200"
                    : "bg-white hover:bg-slate-50/80 border-[#e2e8f0] shadow-xs"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {acc.industry.split(" ")[0]}
                    </span>
                    {acc.isHubSpotSynced && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-orange-50 text-orange-700 border border-orange-200 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                        HubSpot Live
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    Health: {acc.crmStatus.healthScore}/100
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-[#0f172a] mb-1">{acc.name}</h3>

                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3 font-mono">
                  <span>{acc.revenue} ARR</span>
                  <span>•</span>
                  <span>{acc.headcount}</span>
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px] truncate">
                    Lead AE: <strong>{acc.accountExecutive}</strong>
                  </span>
                  <span className="text-indigo-600 font-semibold flex items-center gap-1 text-[11px]">
                    View Account <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Account Profile */}
        {selectedAccount && (
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {selectedAccount.industry}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{selectedAccount.domain}</span>
                  {selectedAccount.isHubSpotSynced && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-orange-50 text-orange-700 border border-orange-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-orange-600" /> Connected to HubSpot CRM
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-black text-[#0f172a]">{selectedAccount.name}</h2>
                <p className="text-xs text-slate-500 mt-1">Headquarters: {selectedAccount.headquarters}</p>
                {selectedAccount.portalUrl && (
                  <a
                    href={selectedAccount.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 mt-2 bg-orange-50/80 px-2.5 py-1 rounded-lg border border-orange-200 transition"
                  >
                    <span>Open in HubSpot Portal (247526396)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Contract</span>
                <span className="text-sm font-mono font-bold text-emerald-700">
                  {selectedAccount.crmStatus.activeContractValue.split(" ")[0]}
                </span>
                <span className="text-[10px] text-slate-500 block">{selectedAccount.crmStatus.relationshipStage}</span>
              </div>
            </div>

            {/* Live Signals & 10-K Snippets */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-2.5">
                <Flame className="w-3.5 h-3.5 text-amber-500" /> Recent Market Triggers & Filings
              </h4>
              <div className="space-y-2">
                {selectedAccount.signals.map((sig, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-indigo-700">{sig.type}</span>
                      <span className="text-slate-400 font-mono">{sig.date}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed italic">
                      &ldquo;{sig.snippet}&rdquo;
                    </p>
                    <span className="text-[10px] text-slate-400 block">Source: {sig.source}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Internal BU Penetration Map */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-2.5">
                <Layers className="w-3.5 h-3.5 text-indigo-600" /> Multi-BU Penetration & Whitespace
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(selectedAccount.crmStatus.buPenetration || {}).map(([bu, status]) => {
                  const isClient = status.includes("Active");
                  const isOpp = status.includes("Opp") || status.includes("High");
                  return (
                    <div
                      key={bu}
                      className={`p-3 rounded-xl border text-xs ${
                        isClient
                          ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                          : isOpp
                          ? "bg-indigo-50 border-indigo-200 text-indigo-800"
                          : "bg-slate-50 border-slate-200 text-slate-600"
                      }`}
                    >
                      <div className="font-semibold">{bu}</div>
                      <div className="text-[11px] font-bold mt-0.5">{status}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Stakeholders */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-2.5">
                <Users className="w-3.5 h-3.5 text-emerald-600" /> Executive Stakeholder Profiles
              </h4>
              <div className="space-y-2">
                {selectedAccount.stakeholders.map((sh, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-[#0f172a]">{sh.name}</span>
                        <span className="text-[11px] text-slate-500 ml-2">({sh.title})</span>
                      </div>
                      <span className="text-[10px] text-indigo-600 font-semibold">{sh.location}</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      <strong>Psychological Profile:</strong> {sh.personalityType}
                    </p>
                    <div className="text-[11px] text-slate-500">
                      <strong>Key KPIs:</strong> {sh.kpis.join(" • ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
