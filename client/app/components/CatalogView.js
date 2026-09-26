"use client";

import { useState, useMemo } from "react";
import { 
  Layers, 
  CheckCircle2, 
  Plus, 
  Search, 
  Filter, 
  Sparkles, 
  Cpu, 
  Cloud, 
  ShieldCheck, 
  Database, 
  DollarSign, 
  Truck, 
  Users, 
  Terminal 
} from "lucide-react";
import AddSolutionModal from "./AddSolutionModal";

export default function CatalogView({ catalog = [], onSolutionAdded }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState("bu"); // 'bu' | 'category'
  const [selectedFilter, setSelectedFilter] = useState("ALL");

  // Dynamically compute unique Business Units and their counts
  const businessUnits = useMemo(() => {
    const counts = {};
    catalog.forEach((item) => {
      const bu = item.businessUnit || "Other";
      counts[bu] = (counts[bu] || 0) + 1;
    });

    const list = Object.keys(counts).map((bu) => ({
      name: bu,
      count: counts[bu]
    }));

    return [{ name: "ALL", label: "All Business Units", count: catalog.length }, ...list];
  }, [catalog]);

  // Dynamically compute unique Categories and their counts
  const categories = useMemo(() => {
    const counts = {};
    catalog.forEach((item) => {
      const cat = item.category || "General";
      counts[cat] = (counts[cat] || 0) + 1;
    });

    const list = Object.keys(counts).map((cat) => ({
      name: cat,
      count: counts[cat]
    }));

    return [{ name: "ALL", label: "All Categories", count: catalog.length }, ...list];
  }, [catalog]);

  // Filter items based on active filter and search query
  const filteredCatalog = useMemo(() => {
    return catalog.filter((prod) => {
      let matchesFilter = true;
      if (selectedFilter !== "ALL") {
        if (filterMode === "bu") {
          matchesFilter = prod.businessUnit === selectedFilter;
        } else {
          matchesFilter = prod.category === selectedFilter;
        }
      }

      const matchesSearch =
        !searchTerm ||
        prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prod.elevatorPitch.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (prod.category && prod.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (prod.businessUnit && prod.businessUnit.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (prod.targetPersonas && prod.targetPersonas.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase())));

      return matchesFilter && matchesSearch;
    });
  }, [catalog, selectedFilter, filterMode, searchTerm]);

  // Quick icon helper for categories
  const getCategoryIcon = (buName) => {
    const lower = (buName || "").toLowerCase();
    if (lower.includes("sales") || lower.includes("agentic")) return Cpu;
    if (lower.includes("cloud")) return Cloud;
    if (lower.includes("security") || lower.includes("cyber")) return ShieldCheck;
    if (lower.includes("data") || lower.includes("ai")) return Database;
    if (lower.includes("finops") || lower.includes("cost") || lower.includes("dollar")) return DollarSign;
    if (lower.includes("supply") || lower.includes("logistics")) return Truck;
    if (lower.includes("customer") || lower.includes("cx")) return Users;
    return Terminal;
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              Enterprise Solutions & Product Portfolio
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Rish AI Labs
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Standardized multi-BU catalog with auto-matched customer pain points, pricing tiers, and verified ROI benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-mono">
            {catalog.length} Enterprise Modules Active
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-xs flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Solution Module</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-3.5">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search solutions by name, persona, pain point, or category..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
            />
          </div>

          {/* Filter Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold flex-shrink-0">
            <button
              onClick={() => {
                setFilterMode("bu");
                setSelectedFilter("ALL");
              }}
              className={`px-3 py-1 rounded-lg transition ${
                filterMode === "bu"
                  ? "bg-white text-indigo-700 shadow-2xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Business Units
            </button>
            <button
              onClick={() => {
                setFilterMode("category");
                setSelectedFilter("ALL");
              }}
              className={`px-3 py-1 rounded-lg transition ${
                filterMode === "category"
                  ? "bg-white text-indigo-700 shadow-2xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Technical Categories
            </button>
          </div>

          <div className="text-xs text-slate-500 flex-shrink-0">
            Showing <strong>{filteredCatalog.length}</strong> of {catalog.length}
          </div>
        </div>

        {/* Dynamic Category / BU Chips with Exact Counts */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {(filterMode === "bu" ? businessUnits : categories).map((item, idx) => {
            const isSelected = selectedFilter === item.name;
            const Icon = getCategoryIcon(item.name);

            return (
              <button
                key={idx}
                onClick={() => setSelectedFilter(item.name)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex-shrink-0 ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80"
                }`}
              >
                {item.name !== "ALL" && <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-indigo-200" : "text-slate-400"}`} />}
                <span>{item.label || item.name}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isSelected ? "bg-indigo-500 text-white" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {filteredCatalog.length === 0 && (
        <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-300 text-center space-y-3">
          <Layers className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-sm font-bold text-slate-700">No solutions matched your search</p>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query or add a brand-new solution module to your enterprise catalog.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition inline-flex items-center gap-1.5 mt-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Solution Module</span>
          </button>
        </div>
      )}

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCatalog.map((prod) => {
          const Icon = getCategoryIcon(prod.businessUnit);

          return (
            <div
              key={prod.id}
              className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs hover:border-indigo-300 hover:shadow-sm transition-all space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                    <Icon className="w-3 h-3 text-indigo-600" />
                    {prod.businessUnit}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{prod.category}</span>
                </div>

                <h3 className="text-base font-extrabold text-[#0f172a] mb-2">{prod.name}</h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-3 italic">
                  &ldquo;{prod.elevatorPitch}&rdquo;
                </p>

                {/* Target Personas */}
                <div className="mb-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Target Economic Personas:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {prod.targetPersonas && prod.targetPersonas.map((persona, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                        {persona}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Core Capabilities */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Core Enterprise Capabilities:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {prod.capabilities && prod.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Pricing & ROI */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Pricing Model:</span>
                  <span className="font-mono text-slate-800 font-semibold">{prod.pricingModel}</span>
                </div>
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                  <strong>Benchmark ROI:</strong> {prod.typicalROI}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Solution Modal */}
      <AddSolutionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSolutionAdded={(newSolution) => {
          if (onSolutionAdded) {
            onSolutionAdded(newSolution);
          }
        }}
      />
    </div>
  );
}
