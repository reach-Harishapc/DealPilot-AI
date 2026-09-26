"use client";

import { useState, useEffect } from "react";
import {
  X,
  ShieldCheck,
  FileText,
  Scale,
  Globe,
  Cookie,
  Lock,
  Zap,
  CheckCircle2,
  ExternalLink,
  Mail
} from "lucide-react";

export default function TrustCenterModal({ isOpen, initialTab = "privacy", onClose }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tabs = [
    { id: "privacy", label: "Privacy Policy", icon: FileText },
    { id: "terms", label: "Terms & Conditions", icon: Scale },
    { id: "gdpr", label: "GDPR Compliance", icon: Globe },
    { id: "cookies", label: "Cookies Policy", icon: Cookie }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden z-10 animate-scaleUp">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Trust Centre & Legal Compliance
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Verified
                </span>
              </div>
              <p className="text-xs text-slate-500">Rish AI Labs • DealPilot Enterprise Legal Governance</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer"
            title="Close modal (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigator */}
        <div className="flex items-center border-b border-slate-200 bg-white px-4 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3.5 text-xs font-bold transition border-b-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "border-indigo-600 text-indigo-600 bg-indigo-50/40"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          {/* 1. Privacy Policy */}
          {activeTab === "privacy" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Enterprise Privacy Policy</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Version 2.4 • Effective: September 26, 2026 • Rish AI Labs Inc.</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
                  Zero Data Retention
                </span>
              </div>

              {/* Zero Retention Callout */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <Lock className="w-4 h-4 text-amber-700" />
                  <span>Foundational AI Zero-Retention Guarantee</span>
                </div>
                <p>
                  DealPilot strictly guarantees that customer CRM accounts, deal sizes, call transcripts, attendee names, and generated battlecards are <strong>NEVER used to train or fine-tune public foundation AI models</strong> (Google Gemini, OpenAI, Anthropic). All API inference calls execute with zero-retention flags enabled.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">1. Information We Collect & Scope of Processing</h4>
                  <p className="text-slate-600">
                    DealPilot collects and processes only the minimum data required to deliver real-time consultative sales intelligence:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600 text-xs">
                    <li><strong>HubSpot CRM Records:</strong> Deal titles, amounts, pipeline stage, corporate website domains, and attendee titles authorized through your HubSpot Private App Access Token.</li>
                    <li><strong>Pre-Meeting Prompts:</strong> Custom prospect pain points, competitor names, or situational objectives supplied by the Account Executive during battlecard generation.</li>
                    <li><strong>Account Executive Credentials:</strong> Professional email address, user name, and enterprise sales quota configuration.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">2. Cryptographic Security & Cloud Storage</h4>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600 text-xs">
                    <li><strong>In-Transit Encryption:</strong> All API communication is enforced with TLS 1.3 cryptographic transport security.</li>
                    <li><strong>At-Rest Encryption:</strong> All persistent database records and cache stores are encrypted with AES-256 volume-level keys.</li>
                    <li><strong>Isolated VPC Boundary:</strong> Multi-region isolated VPC clusters with optional EU-only or US-only data residency guarantees.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">3. Certified Sub-Processors</h4>
                  <p className="text-slate-600 text-xs">
                    DealPilot engages exclusively with SOC 2 Type II and ISO 27001 certified cloud infrastructure sub-processors:
                  </p>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-600 text-xs">
                    <li><strong>Google Cloud (Vertex AI):</strong> Stateless LLM inference execution with zero log retention.</li>
                    <li><strong>HubSpot CRM:</strong> Bi-directional CRM synchronization via OAuth 2.0 / Private App tokens.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">4. Data Deletion & Customer Rights</h4>
                  <p className="text-slate-600 text-xs">
                    Customer data is retained exclusively during the active subscription period. Upon contract termination or written request, all associated customer data is cryptographically expunged within thirty (30) calendar days. To request data deletion, contact <span className="font-mono text-indigo-600 font-bold">privacy@rishailabs.com</span>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 2. Terms & Conditions */}
          {activeTab === "terms" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Master Software as a Service (SaaS) Agreement</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Version 3.1 • Updated September 2026 • Governing Law: Delaware, USA</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 self-start sm:self-auto">
                  Enterprise SLA: 99.9%
                </span>
              </div>

              <div className="space-y-4 text-xs text-slate-600">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">1. Subscription License Grant</h4>
                  <p>
                    Subject to compliance with this Agreement, Rish AI Labs Inc. grants Customer a non-exclusive, non-transferable, commercial subscription to access and use the DealPilot Enterprise platform for internal sales planning, consultative meeting preparation, and commercial pipeline acceleration.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">2. Service Level Agreement (SLA) & Uptime</h4>
                  <p>
                    DealPilot commits to a 99.9% monthly platform uptime SLA. In the event of unscheduled service disruption exceeding SLA thresholds, Customer is entitled to financial service credits calculated against monthly license fees.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">3. Customer Data & Intellectual Property Rights</h4>
                  <p>
                    Customer retains sole and exclusive ownership of all Customer Data, pipeline records, proprietary solution catalog entries, and generated custom battlecards. DealPilot retains ownership of the underlying machine learning prompt orchestration framework, software algorithms, and system interfaces.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">4. Acceptable Use Policy</h4>
                  <p>
                    Customer agrees not to: (a) reverse engineer, decompile, or attempt to extract source code from DealPilot API endpoints; (b) launch automated stress tests or vulnerability probes without written authorization; (c) utilize DealPilot for bulk unsolicited spam generation.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">5. Limitation of Liability</h4>
                  <p>
                    To the maximum extent permitted by applicable law, neither party shall be liable for indirect, incidental, special, or consequential damages. DealPilot's total aggregate liability under any cause of action shall not exceed the total subscription fees paid by Customer during the twelve (12) months preceding the incident.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3. GDPR Compliance */}
          {activeTab === "gdpr" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">European Union & UK GDPR Compliance Statement</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Compliant with EU Regulation 2016/679 & UK Data Protection Act 2018</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 self-start sm:self-auto">
                  DPA & SCCs Ready
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-1">
                <div className="font-bold text-blue-900">Processor Governance Framework</div>
                <p>
                  DealPilot operates as a <strong>Data Processor</strong> under Article 28 of the GDPR, with our enterprise customer serving as the <strong>Data Controller</strong>. We process personal data solely in accordance with documented instructions from the Controller and standard Data Processing Addendums (DPAs).
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-600">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2">Guaranteed Data Subject Rights</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-900 block">Right of Access (Art. 15)</span>
                      <span className="text-[11px] text-slate-500">Request full export of all records associated with a contact or company.</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-900 block">Right to Rectification (Art. 16)</span>
                      <span className="text-[11px] text-slate-500">Instant corrections to misaligned CRM executive records or roles.</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-900 block">Right to Erasure (Art. 17)</span>
                      <span className="text-[11px] text-slate-500">Permanent deletion of account dossiers and historical call telemetry.</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-900 block">Right to Data Portability (Art. 20)</span>
                      <span className="text-[11px] text-slate-500">Export structured JSON/CSV records for seamless migration.</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Cross-Border Data Transfers</h4>
                  <p>
                    Where personal data is transferred outside the European Economic Area (EEA), transfers are governed by the European Commission's Standard Contractual Clauses (SCCs) and adherence to the EU-U.S. Data Privacy Framework (DPF).
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Data Protection Officer (DPO)</h4>
                  <p>
                    To execute a DPA or submit data subject requests, contact our Data Protection Officer at: <span className="font-mono text-indigo-600 font-bold">dpo@rishailabs.com</span>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 4. Cookies Policy */}
          {activeTab === "cookies" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Cookies & Tracking Policy</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Strict Privacy-First Architecture • Zero Ad Retargeting Pixels</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 self-start sm:self-auto">
                  Essential Only
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <strong>No Third-Party Ad Trackers:</strong> DealPilot does not use third-party marketing pixels (such as Meta Pixel, TikTok Pixel, or LinkedIn Insight Tag) nor do we sell browsing telemetry to data brokers. We utilize only essential session cookies.
              </div>

              <div className="space-y-4 text-xs text-slate-600">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2">Cookies Deployed on DealPilot</h4>
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="p-3 font-bold text-slate-700">Cookie Name</th>
                          <th className="p-3 font-bold text-slate-700">Category</th>
                          <th className="p-3 font-bold text-slate-700">Purpose</th>
                          <th className="p-3 font-bold text-slate-700">Expiry</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="p-3 font-mono font-bold text-slate-900">dealpilot_user</td>
                          <td className="p-3">Strictly Necessary</td>
                          <td className="p-3">Stores authenticated AE session & workspace quota</td>
                          <td className="p-3">30 Days</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-bold text-slate-900">csrf_token</td>
                          <td className="p-3">Strictly Necessary</td>
                          <td className="p-3">Prevents Cross-Site Request Forgery vulnerabilities</td>
                          <td className="p-3">Session</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-bold text-slate-900">sidebar_state</td>
                          <td className="p-3">Functional</td>
                          <td className="p-3">Remembers sidebar expanded/collapsed user preference</td>
                          <td className="p-3">1 Year</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Managing Cookie Preferences</h4>
                  <p>
                    You can configure your browser to block or alert you about these cookies. However, disabling strictly necessary authentication cookies will prevent you from logging into the DealPilot Cockpit.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <span>Questions? Contact: <a href="mailto:privacy@rishailabs.com" className="font-semibold text-indigo-600 hover:underline">privacy@rishailabs.com</a></span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer w-full sm:w-auto"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
}
