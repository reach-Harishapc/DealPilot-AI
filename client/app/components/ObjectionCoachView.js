"use client";

import { useState, useRef, useEffect } from "react";
import { apiFetch } from "../../../lib/api";
import { 
  ShieldCheck, 
  Sparkles, 
  CornerDownRight, 
  Lightbulb, 
  BookOpen, 
  Send, 
  Bot, 
  User, 
  Copy, 
  Check, 
  RefreshCw, 
  Trash2, 
  MessageSquare, 
  Swords, 
  Mail,
  Table as TableIcon,
  CheckCircle2
} from "lucide-react";

export default function ObjectionCoachView() {
  const [activeTab, setActiveTab] = useState("chat"); // 'chat' | 'sparring'

  // Chat State
  const [messages, setMessages] = useState([
    {
      id: "m-welcome",
      role: "assistant",
      content: `### 👋 Welcome, Harish! I am Coach AI, your Strategic Sales Copilot.

I have synchronized your active pipeline for **Rish AI Labs** ($1.15M total across Infosys, HDFC Bank, and Reliance Retail).

**How can I assist you right now?**
- 🎯 Ask me how to pitch to **Rajesh Menon (Infosys)** or **Vikram Malhotra (HDFC Bank)**.
- 🥊 Ask me to **spar with you** on tough pricing, security, or "build vs buy" objections.
- ✉️ Ask me to **draft a personalized executive follow-up email** or cold outreach.
- 💡 Ask me to **generate MEDDIC discovery questions** for your next call.`,
      timestamp: "Just now"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  // Structured Sparring Simulator State
  const [objection, setObjection] = useState("");
  const [persona, setPersona] = useState("Chief Risk Officer");
  const [company, setCompany] = useState("Global Enterprise Corp");
  const [simLoading, setSimLoading] = useState(false);
  const [simResult, setSimResult] = useState(null);

  const quickPrompts = [
    { label: "🎯 Pitch to Rajesh (Infosys)", query: "How do I pitch to Rajesh Menon at Infosys? Focus on cloud delivery margins." },
    { label: "🏦 HDFC Bank Security Rebuttal", query: "Act as Vikram Malhotra, CRCO at HDFC Bank. Challenge me on RBI data sovereignty and zero-retention architecture." },
    { label: "✉️ Draft Follow-Up Email", query: "Draft an executive follow-up email to Rajesh Menon at Infosys highlighting our Agentic Sales Fabric." },
    { label: "🥊 Spar on Budget Freeze", query: "The buyer says: 'Our CFO mandated a 100% software budget freeze until Q3'. How do I counter and win?" },
    { label: "⚡ Versus Salesforce & M365", query: "What are our top 3 competitive kill-points when an enterprise buyer says they already have Salesforce and Microsoft?" }
  ];

  const objectionCategories = [
    {
      category: "Budget & Macro Scrutiny",
      items: [
        "Our CFO mandated a 100% freeze on all software procurement until Q3.",
        "Your solution looks great, but we don't have the unallocated budget for this year.",
        "Your license price is 40% higher than the quote we got from Competitor X."
      ]
    },
    {
      category: "In-House Tech & Build vs. Buy",
      items: [
        "Our internal engineering team is already building an in-house tool on open-source.",
        "We want to avoid vendor lock-in and keep all proprietary IP inside our data warehouse."
      ]
    },
    {
      category: "Platform Consolidation",
      items: [
        "We are consolidating our entire stack into Microsoft and Salesforce—why do we need you?",
        "Our IT board will not approve another point solution vendor."
      ]
    },
    {
      category: "Implementation Friction",
      items: [
        "Our team doesn't have the bandwidth to manage another complex 6-month deployment.",
        "We can't take the risk of operational disruption during our peak business quarter."
      ]
    }
  ];

  // Auto-scroll chat to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (activeTab === "chat") {
      scrollToBottom();
    }
  }, [messages, activeTab]);

  // Handle Send Chat
  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || chatLoading) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      role: "user",
      content: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setChatLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content
      }));

      const data = await apiFetch("/api/coach/chat", {
        method: "POST",
        body: JSON.stringify({
          message: query.trim(),
          conversationHistory: historyPayload
        })
      });
      if (data.success && data.data?.reply) {
        const botMsg = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: data.data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error(data.error || "Failed to receive response");
      }
    } catch (err) {
      console.error("Chat error:", err);
      const errorMsg = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "I encountered a temporary connection issue. Please retry your message.",
        timestamp: "Just now"
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setChatLoading(false);
    }
  };

  // Structured Simulator Submit
  const handleSimulate = async (customText) => {
    const textToSubmit = customText || objection;
    if (!textToSubmit) return;

    setSimLoading(true);
    try {
      const data = await apiFetch("/api/simulate-objection", {
        method: "POST",
        body: JSON.stringify({
          objection: textToSubmit,
          personaTitle: persona,
          companyName: company
        })
      });
      if (data.success) {
        setSimResult(data.data);
      }
    } catch (err) {
      console.error("Simulation error:", err);
    } finally {
      setSimLoading(false);
    }
  };

  const copyToClipboard = (text, id) => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  // Inline markdown formatter helper
  const formatInlineMarkdown = (text) => {
    if (!text) return "";
    return text
      .replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-slate-700">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-200/80 font-mono text-[11px] text-indigo-700 font-semibold">$1</code>');
  };

  // Parse structured blocks from markdown
  const parseMarkdownBlocks = (text) => {
    // 1. Separate code blocks from normal text
    const rawChunks = text.split(/(```[\s\S]*?```)/g);
    const blocks = [];

    rawChunks.forEach((chunk) => {
      if (!chunk.trim()) return;

      if (chunk.startsWith("```")) {
        const cleaned = chunk.replace(/^```[a-z]*\n?/, "").replace(/\n?```$/, "").trim();
        const isEmail = cleaned.toLowerCase().includes("subject:") || cleaned.includes("Hi ") || cleaned.includes("Best regards");
        blocks.push({
          type: "code",
          isEmail,
          content: cleaned
        });
        return;
      }

      // Normal text chunk: break down into lines and identify tables, dividers, blockquotes, lists, headers
      const lines = chunk.split("\n");
      let i = 0;

      while (i < lines.length) {
        const line = lines[i];
        const trimmed = line.trim();

        if (!trimmed) {
          i++;
          continue;
        }

        // Horizontal Rule
        if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
          blocks.push({ type: "hr" });
          i++;
          continue;
        }

        // Table Detection (Line starts and ends with |)
        if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
          const tableLines = [];
          while (i < lines.length && lines[i].trim().startsWith("|") && lines[i].trim().endsWith("|")) {
            tableLines.push(lines[i].trim());
            i++;
          }

          if (tableLines.length >= 2) {
            const rawHeader = tableLines[0];
            const headers = rawHeader
              .split("|")
              .slice(1, -1)
              .map((h) => h.trim());

            // Skip index 1 if it's the separator (| :--- |)
            const startIndex = tableLines[1].includes("---") ? 2 : 1;
            const rows = [];

            for (let r = startIndex; r < tableLines.length; r++) {
              const cells = tableLines[r]
                .split("|")
                .slice(1, -1)
                .map((c) => c.trim());
              if (cells.length > 0) {
                rows.push(cells);
              }
            }

            blocks.push({
              type: "table",
              headers,
              rows
            });
            continue;
          }
        }

        // Blockquotes (starts with > or > >)
        if (trimmed.startsWith(">")) {
          const quoteLines = [];
          while (i < lines.length && lines[i].trim().startsWith(">")) {
            quoteLines.push(lines[i].trim().replace(/^>+\s*/, ""));
            i++;
          }
          blocks.push({
            type: "blockquote",
            content: quoteLines.join("\n")
          });
          continue;
        }

        // Headers
        if (trimmed.startsWith("#")) {
          const match = trimmed.match(/^(#{1,6})\s+(.*)$/);
          if (match) {
            blocks.push({
              type: "header",
              level: match[1].length,
              content: match[2]
            });
            i++;
            continue;
          }
        }

        // Numbered Section Header (e.g. "1. Stakeholder Psychology & The Margin Problem")
        if (/^\d+\.\s+[A-Z]/.test(trimmed) && trimmed.length < 80) {
          blocks.push({
            type: "section_title",
            content: trimmed
          });
          i++;
          continue;
        }

        // Bullet Lists (* , - , • )
        if (/^[*•\-]\s+/.test(trimmed)) {
          const listItems = [];
          while (i < lines.length && /^[*•\-]\s+/.test(lines[i].trim())) {
            listItems.push(lines[i].trim().replace(/^[*•\-]\s+/, ""));
            i++;
          }
          blocks.push({
            type: "bullet_list",
            items: listItems
          });
          continue;
        }

        // Regular Paragraph
        const pLines = [];
        while (
          i < lines.length &&
          lines[i].trim() &&
          !lines[i].trim().startsWith("|") &&
          !lines[i].trim().startsWith(">") &&
          !lines[i].trim().startsWith("#") &&
          lines[i].trim() !== "---" &&
          !/^[*•\-]\s+/.test(lines[i].trim()) &&
          !/^\d+\.\s+[A-Z]/.test(lines[i].trim())
        ) {
          pLines.push(lines[i].trim());
          i++;
        }
        if (pLines.length > 0) {
          blocks.push({
            type: "paragraph",
            content: pLines.join(" ")
          });
        }
      }
    });

    return blocks;
  };

  // Render parsed blocks in rich UI
  const renderFormattedMessage = (content, msgId) => {
    const blocks = parseMarkdownBlocks(content);

    return (
      <div className="space-y-3 text-xs sm:text-[13px] leading-relaxed">
        {blocks.map((block, index) => {
          // 1. Code Block / Email Artifact
          if (block.type === "code") {
            const blockId = `${msgId}-code-${index}`;
            const isCopied = copiedId === blockId;

            return (
              <div key={index} className="my-3.5 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xs">
                <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-[11px] uppercase tracking-wider">
                    {block.isEmail ? <Mail className="w-3.5 h-3.5 text-indigo-400" /> : <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{block.isEmail ? "Ready-to-Send Executive Email" : "Generated Sales Asset"}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(block.content, blockId)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[11px] transition shadow-xs"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-300" />
                        <span className="text-emerald-300">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Text</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 text-slate-200 whitespace-pre-wrap leading-relaxed font-sans text-xs">
                  {block.content}
                </div>
              </div>
            );
          }

          // 2. Beautiful Table
          if (block.type === "table") {
            return (
              <div key={index} className="my-3.5 overflow-x-auto rounded-2xl border border-slate-200/90 shadow-2xs bg-white">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-800 text-[11px] font-bold uppercase tracking-wider">
                      {block.headers.map((h, hIdx) => (
                        <th 
                          key={hIdx} 
                          className="px-3.5 py-2.5 font-bold" 
                          dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(h) }} 
                        />
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {block.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50/70 transition">
                        {row.map((cell, cIdx) => (
                          <td 
                            key={cIdx} 
                            className="px-3.5 py-2.5 text-slate-700 align-top leading-relaxed" 
                            dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(cell) }} 
                          />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          // 3. Blockquote
          if (block.type === "blockquote") {
            return (
              <blockquote 
                key={index} 
                className="my-3 p-3.5 bg-indigo-50/70 border-l-4 border-indigo-600 rounded-r-xl text-indigo-950 font-medium text-xs leading-relaxed italic"
                dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(block.content) }}
              />
            );
          }

          // 4. Section Title
          if (block.type === "section_title") {
            return (
              <div key={index} className="pt-2 pb-1 border-b border-slate-200/70 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-indigo-600 rounded-full"></span>
                <h4 
                  className="text-xs sm:text-sm font-bold text-[#0f172a]"
                  dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(block.content) }}
                />
              </div>
            );
          }

          // 5. Header
          if (block.type === "header") {
            const Tag = block.level <= 2 ? "h3" : "h4";
            const classes = block.level <= 2 
              ? "text-sm sm:text-base font-extrabold text-[#0f172a] pt-1" 
              : "text-xs sm:text-sm font-bold text-indigo-950 pt-1";

            return (
              <Tag 
                key={index} 
                className={classes}
                dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(block.content) }}
              />
            );
          }

          // 6. Bullet List
          if (block.type === "bullet_list") {
            return (
              <ul key={index} className="space-y-1.5 pl-3 list-disc marker:text-indigo-600 my-2">
                {block.items.map((item, iIdx) => (
                  <li 
                    key={iIdx} 
                    className="leading-relaxed text-slate-700"
                    dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item) }} 
                  />
                ))}
              </ul>
            );
          }

          // 7. Divider
          if (block.type === "hr") {
            return <hr key={index} className="my-3.5 border-t border-slate-200/80" />;
          }

          // 8. Paragraph
          return (
            <p 
              key={index} 
              className="leading-relaxed text-slate-700"
              dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(block.content) }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              Coach AI • Enterprise Sales Copilot & Sparring Gym
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Agentic Mode
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time sales sparring, objection rehearsal, and tailored executive artifact generation for <strong className="text-slate-800">Rish AI Labs</strong>.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/80 self-start md:self-auto">
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition ${
              activeTab === "chat"
                ? "bg-white text-indigo-700 shadow-xs border border-slate-200/60"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Agentic Chatbot</span>
          </button>
          <button
            onClick={() => setActiveTab("sparring")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition ${
              activeTab === "sparring"
                ? "bg-white text-indigo-700 shadow-xs border border-slate-200/60"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            <span>Objection Sparring Gym</span>
          </button>
        </div>
      </div>

      {/* TAB 1: AGENTIC CHATBOT VIEW */}
      {activeTab === "chat" && (
        <div className="space-y-4">
          {/* Quick Prompts Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 flex-shrink-0">
              <Sparkles className="w-3 h-3 text-indigo-600" /> Prompts:
            </span>
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(qp.query)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-xs text-slate-700 hover:text-indigo-900 transition flex-shrink-0 shadow-2xs font-medium"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Main Chat Window */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-xs flex flex-col h-[680px] overflow-hidden">
            {/* Chat Top Subheader */}
            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between text-xs bg-slate-50/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-bold text-slate-800">Coach AI Online</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500">Account Executive: <strong className="text-indigo-900">Harish Kumar</strong></span>
              </div>
              <button
                onClick={() =>
                  setMessages([
                    {
                      id: "m-welcome",
                      role: "assistant",
                      content: "Chat cleared. What deal or objection would you like to prepare for next?",
                      timestamp: "Just now"
                    }
                  ])
                }
                className="text-slate-400 hover:text-rose-600 transition flex items-center gap-1 text-[11px]"
                title="Clear Chat Conversation"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-xs ${
                        isUser
                          ? "bg-slate-900 text-white"
                          : "bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white shadow-indigo-500/20"
                      }`}
                    >
                      {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`max-w-[88%] sm:max-w-[82%] rounded-2xl p-4 shadow-2xs ${
                        isUser
                          ? "bg-indigo-600 text-white rounded-tr-none text-xs sm:text-sm font-medium leading-relaxed"
                          : "bg-slate-50/90 border border-slate-200/80 text-slate-800 rounded-tl-none"
                      }`}
                    >
                      {isUser ? (
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      ) : (
                        renderFormattedMessage(msg.content, msg.id)
                      )}

                      <div
                        className={`mt-2 flex items-center justify-end text-[10px] ${
                          isUser ? "text-indigo-200" : "text-slate-400"
                        }`}
                      >
                        <span>{msg.timestamp}</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {chatLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl rounded-tl-none p-3.5 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-indigo-600 animate-spin" />
                    <span className="text-xs text-slate-500 font-medium">
                      Coach AI is analyzing and synthesizing playbooks...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Bar */}
            <div className="p-3.5 border-t border-slate-200 bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask Coach AI anything: pitch strategy, roleplay a call, or draft an executive email..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || chatLoading}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-xs flex-shrink-0"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STRUCTURED OBJECTION SPARRING GYM */}
      {activeTab === "sparring" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
          {/* Left Column: Preset Library (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-3">
                <BookOpen className="w-4 h-4 text-indigo-600" /> Enterprise Objection Playbook Library
              </h3>

              <div className="space-y-3.5">
                {objectionCategories.map((cat, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-600 block">
                      {cat.category}
                    </span>
                    <div className="space-y-1">
                      {cat.items.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setObjection(item);
                            handleSimulate(item);
                          }}
                          className="w-full text-left p-2.5 rounded-xl text-xs bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 border border-slate-200/80 text-slate-700 transition"
                        >
                          &ldquo;{item}&rdquo;
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Coach Simulator (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-5">
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-1">
                  Buyer Persona Role
                </label>
                <input
                  type="text"
                  value={persona}
                  onChange={(e) => setPersona(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-1">
                  Target Account Name
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-1">
                Active Buyer Pushback
              </label>
              <textarea
                rows={3}
                value={objection}
                onChange={(e) => setObjection(e.target.value)}
                placeholder="Type any pushback or objection raised by the customer..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            <button
              disabled={simLoading || !objection}
              onClick={() => handleSimulate()}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition shadow-xs"
            >
              {simLoading ? <Sparkles className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              Generate Consultative Rebuttal & Strategy
            </button>

            {/* Results Output */}
            {simResult && (
              <div className="space-y-3.5 pt-4 border-t border-slate-100 animate-in fade-in duration-300">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                    Strategic Framework: {simResult.recommendedFramework}
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>Root Psychological Driver:</strong> {simResult.strategicAnalysis}
                  </p>
                </div>

                <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-indigo-700 block">
                    Verbatim Talking Track for Account Executive:
                  </span>
                  <p className="text-xs sm:text-sm text-indigo-950 font-medium leading-relaxed italic">
                    {simResult.recommendedTalkTrack}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-start gap-2.5">
                  <CornerDownRight className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                      Discovery Pivot Question:
                    </span>
                    <p className="text-xs font-semibold text-slate-800 mt-0.5">
                      {simResult.followUpPivotQuestion}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center gap-2 text-xs text-slate-600">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  <span><strong>Delivery Advice:</strong> {simResult.coachTip}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
