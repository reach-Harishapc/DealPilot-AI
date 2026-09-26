"use client";

import { useState } from "react";
import { apiFetch } from "../../../lib/api";
import { X, Sparkles, Plus, CheckCircle2, RefreshCw } from "lucide-react";

export default function AddSolutionModal({ isOpen, onClose, onSolutionAdded }) {
  const [name, setName] = useState("");
  const [businessUnit, setBusinessUnit] = useState("Sales AI & Revenue Operations");
  const [category, setCategory] = useState("");
  const [elevatorPitch, setElevatorPitch] = useState("");
  const [targetPersonas, setTargetPersonas] = useState("");
  const [capabilities, setCapabilities] = useState("");
  const [pricingModel, setPricingModel] = useState("");
  const [typicalROI, setTypicalROI] = useState("");

  const [aiLoading, setAiLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const defaultBUs = [
    "Sales AI & Revenue Operations",
    "Cloud Engineering & Architecture",
    "Data & Enterprise AI",
    "Cybersecurity & Governance",
    "FinOps & Cloud Economics",
    "Supply Chain & Commerce",
    "Customer Data & Intelligence",
    "Platform & DevOps Engineering"
  ];

  // Auto-fill using Gemini AI
  const handleAiAutoFill = async () => {
    if (!name.trim()) {
      setErrorMsg("Please enter a Solution / Product Name first to use AI Auto-Fill.");
      return;
    }
    setErrorMsg("");
    setAiLoading(true);

    try {
      const data = await apiFetch("/api/catalog/ai-generate", {
        method: "POST",
        body: JSON.stringify({ name: name.trim(), businessUnit })
      });
      if (data.success && data.data) {
        const spec = data.data;
        if (spec.category) setCategory(spec.category);
        if (spec.elevatorPitch) setElevatorPitch(spec.elevatorPitch);
        if (spec.targetPersonas) {
          setTargetPersonas(Array.isArray(spec.targetPersonas) ? spec.targetPersonas.join(", ") : spec.targetPersonas);
        }
        if (spec.capabilities) {
          setCapabilities(Array.isArray(spec.capabilities) ? spec.capabilities.join("\n") : spec.capabilities);
        }
        if (spec.pricingModel) setPricingModel(spec.pricingModel);
        if (spec.typicalROI) setTypicalROI(spec.typicalROI);
      }
    } catch (err) {
      console.error("AI auto-fill failed:", err);
      setErrorMsg("Failed to auto-generate details. Please fill manually.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Product Name is required.");
      return;
    }
    setErrorMsg("");
    setSaveLoading(true);

    try {
      const payload = {
        name: name.trim(),
        businessUnit,
        category: category.trim() || "Enterprise Software",
        elevatorPitch: elevatorPitch.trim() || "Autonomous enterprise solution delivering measurable operational velocity.",
        targetPersonas: targetPersonas ? targetPersonas.split(",").map((p) => p.trim()).filter(Boolean) : ["Chief Technology Officer", "VP of Engineering"],
        capabilities: capabilities ? capabilities.split("\n").map((c) => c.trim()).filter(Boolean) : ["Real-time data ingestion", "Automated anomaly mitigation"],
        pricingModel: pricingModel.trim() || "Enterprise Annual Subscription ($150K/yr)",
        typicalROI: typicalROI.trim() || "3.5x ROI within 6 months"
      };

      const data = await apiFetch("/api/catalog", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      if (data.success) {
        if (onSolutionAdded) {
          onSolutionAdded(data.data);
        }
        // Reset form & close
        setName("");
        setCategory("");
        setElevatorPitch("");
        setTargetPersonas("");
        setCapabilities("");
        setPricingModel("");
        setTypicalROI("");
        onClose();
      } else {
        setErrorMsg(data.error || "Failed to save solution");
      }
    } catch (err) {
      console.error("Error creating product:", err);
      setErrorMsg("Failed to connect to server. Please try again.");
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl border border-[#e2e8f0] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                <Plus className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-bold text-[#0f172a]">
                Add Enterprise Solution Module
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Expand the Rish AI Labs catalog so DealPilot can auto-match it to customer pain points and meeting battlecards.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {errorMsg}
            </div>
          )}

          {/* Solution Name & Auto-Fill */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                Solution / Product Name *
              </label>
              <button
                type="button"
                onClick={handleAiAutoFill}
                disabled={aiLoading}
                className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 transition"
              >
                <Sparkles className={`w-3.5 h-3.5 ${aiLoading ? "animate-spin text-amber-500" : "text-amber-500"}`} />
                <span>{aiLoading ? "Generating with AI..." : "✨ Auto-Complete with AI"}</span>
              </button>
            </div>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Agentic Customer 360 or FinOps Autopilot"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
            />
          </div>

          {/* Business Unit & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Business Unit *
              </label>
              <select
                value={businessUnit}
                onChange={(e) => setBusinessUnit(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
              >
                {defaultBUs.map((bu, idx) => (
                  <option key={idx} value={bu}>{bu}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Cloud Infrastructure, AI & Decision Automation"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Elevator Pitch */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
              Elevator Pitch / Value Proposition
            </label>
            <textarea
              rows={2}
              value={elevatorPitch}
              onChange={(e) => setElevatorPitch(e.target.value)}
              placeholder="1-2 sentences explaining why an enterprise executive must purchase this solution..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition leading-relaxed"
            />
          </div>

          {/* Target Personas */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
              Target Economic Personas (Comma-separated)
            </label>
            <input
              type="text"
              value={targetPersonas}
              onChange={(e) => setTargetPersonas(e.target.value)}
              placeholder="e.g. Chief Technology Officer, VP of Engineering, Chief Information Officer"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
            />
          </div>

          {/* Key Capabilities */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
              Core Enterprise Capabilities (One per line)
            </label>
            <textarea
              rows={3}
              value={capabilities}
              onChange={(e) => setCapabilities(e.target.value)}
              placeholder="• Real-time data pipeline orchestration&#10;• Sub-second anomaly mitigation&#10;• Zero-retention AES-256 boundary"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition leading-relaxed font-mono"
            />
          </div>

          {/* Pricing & Typical ROI */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Pricing Model / Tier
              </label>
              <input
                type="text"
                value={pricingModel}
                onChange={(e) => setPricingModel(e.target.value)}
                placeholder="e.g. Enterprise Annual License ($180K/yr)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Typical ROI Benchmark
              </label>
              <input
                type="text"
                value={typicalROI}
                onChange={(e) => setTypicalROI(e.target.value)}
                placeholder="e.g. 4.2x ROI within 6 months"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-end gap-2.5 bg-slate-50/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saveLoading || !name.trim()}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition shadow-xs"
          >
            {saveLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
            <span>Save to Catalog</span>
          </button>
        </div>
      </div>
    </div>
  );
}
