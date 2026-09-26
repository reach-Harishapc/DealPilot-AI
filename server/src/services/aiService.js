const accounts = require("../data/accounts");
const catalog = require("../data/catalog");
const meetings = require("../data/meetings");
const { GoogleGenAI } = require("@google/genai");

/**
 * DealPilot AI Intelligence Engine
 * Dynamically synthesizes account context, buyer psychology, and product value
 * powered by Google Gemini (with autonomous heuristic fallback).
 */

function getGeminiClient() {
  const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

const GEMINI_MODELS = ["gemini-3.6-flash", "gemini-3.5-flash", "gemini-flash-latest"];

async function generateWithGeminiFallback(ai, prompt) {
  let lastError = null;
  for (const model of GEMINI_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt
      });
      return { text: response.text, model };
    } catch (err) {
      lastError = err;
      console.warn(`[Gemini AI] Model ${model} returned error, falling over:`, err.message.substring(0, 100));
    }
  }
  throw lastError;
}

async function generateTextWithFallback(prompt) {
  const ai = getGeminiClient();
  if (ai) {
    try {
      const { text } = await generateWithGeminiFallback(ai, prompt);
      return text;
    } catch (err) {
      console.warn("[Gemini AI] generateTextWithFallback error:", err.message);
    }
  }
  return "";
}

/**
 * Generate a dynamic Battlecard for a scheduled meeting
 */
async function generateBattlecard(meetingId, customInputs = {}) {
  const meeting = meetings.find((m) => m.id === meetingId) || meetings[0];
  const account = accounts.find((a) => a.id === meeting.accountId) || accounts[0];

  const attendee = meeting.attendee;
  const matchedSolutions = matchSolutionsToAccount(account, attendee);

  const ai = getGeminiClient();
  if (ai) {
    try {
      console.log(`[Gemini AI] Generating live intelligence for ${account.name} with model ${GEMINI_MODELS[0]}...`);
      const liveBattlecard = await callGeminiForBattlecard(ai, meeting, account, matchedSolutions, customInputs);
      if (liveBattlecard) return liveBattlecard;
    } catch (err) {
      console.warn("[Gemini AI] Live call failed, falling back to autonomous synthesis engine:", err.message);
    }
  }

  // Autonomous Dynamic Reasoning Engine Fallback
  return synthesizeBattlecard(meeting, account, matchedSolutions, customInputs);
}

/**
 * Match vendor product catalog to account's signals and persona
 */
function matchSolutionsToAccount(account, attendee) {
  return catalog.map((product) => {
    let relevanceScore = 65;
    let matchReasons = [];

    // Match by title
    if (product.targetPersonas.some((p) => attendee.title.toLowerCase().includes(p.toLowerCase()))) {
      relevanceScore += 25;
      matchReasons.push(`Direct alignment with ${attendee.title} KPIs`);
    }

    // Match by account industry & signals
    const signalsText = account.signals.map((s) => s.snippet).join(" ").toLowerCase();
    if (product.category.toLowerCase().includes("supply") && (account.industry.toLowerCase().includes("supply") || signalsText.includes("rerouting"))) {
      relevanceScore += 20;
      matchReasons.push("Solves active port congestion & rerouting bottlenecks identified in recent signals");
    }
    if (product.category.toLowerCase().includes("cyber") && (account.industry.toLowerCase().includes("bank") || signalsText.includes("audit") || signalsText.includes("regulatory"))) {
      relevanceScore += 25;
      matchReasons.push("Direct response to upcoming federal audit deadlines");
    }
    if (product.category.toLowerCase().includes("ai") && signalsText.includes("inventory")) {
      relevanceScore += 20;
      matchReasons.push("Targets margin degradation through predictive inventory balancing");
    }

    // Cap at 98%
    relevanceScore = Math.min(98, relevanceScore);

    return {
      ...product,
      relevanceScore,
      matchReasons
    };
  }).sort((a, b) => b.relevanceScore - a.relevanceScore);
}

/**
 * Call Google Gemini to synthesize strategic intelligence
 */
async function callGeminiForBattlecard(ai, meeting, account, matchedSolutions, customInputs = {}) {
  const attendee = meeting.attendee;
  const primarySolution = matchedSolutions[0];

  const prompt = `You are DealPilot AI, an elite enterprise B2B sales strategist for Rish AI Labs.
Generate an executive meeting intelligence brief in strict JSON format.

Meeting details:
- Account: ${account.name} (${account.domain}, Industry: ${account.industry}, ARR: ${account.revenue}, Headcount: ${account.headcount})
- Attendee: ${attendee.name} (${attendee.title}, Role: ${attendee.roleType})
- Account Signals: ${account.signals.map(s => `${s.type}: ${s.snippet}`).join(" | ")}
- Recommended Vendor Product: ${primarySolution.name} (${primarySolution.businessUnit})
- Product Capability: ${primarySolution.description}
- Product Typical ROI: ${primarySolution.typicalROI}

Return ONLY a valid JSON object (no markdown code blocks, raw JSON only) adhering strictly to this schema:
{
  "executiveSummary": "1-2 sentence executive briefing on account dynamics and urgency",
  "tailoredValueProposition": {
    "recommendedProduct": "${primarySolution.name}",
    "businessUnit": "${primarySolution.businessUnit}",
    "fitScore": "${primarySolution.relevanceScore}% Match",
    "whyThisSolution": "Detailed strategic explanation of why this solution fits their immediate signals",
    "executiveElevatorPitch": "A punchy, consultative 2-minute elevator pitch tailored directly to ${attendee.name}",
    "roiProjection": "${primarySolution.typicalROI}"
  },
  "stakeholderIntelligence": {
    "name": "${attendee.name}",
    "title": "${attendee.title}",
    "roleType": "${attendee.roleType}",
    "personalityProfile": "Psychological profile and decision style",
    "whatKeepsThemUpAtNight": ["Concern 1", "Concern 2", "Concern 3"],
    "personalWin": "What personal career success looks like for them"
  },
  "discoveryPlaybook": [
    {
      "theme": "Theme name",
      "question": "Probing consultative question",
      "rationale": "Why asking this question creates consultative leverage"
    }
  ],
  "objectionHandling": [
    {
      "objection": "Likely objection statement from this buyer",
      "psychologicalDriver": "Root psychological fear",
      "counterTactic": "Recommended tactical shift",
      "talkTrack": "Exact consultative verbatim response"
    }
  ],
  "nextStepsEmail": {
    "subject": "Compelling executive subject line",
    "body": "Consultative pre-meeting email draft"
  }
}`;

  const { text, model } = await generateWithGeminiFallback(ai, prompt);

  const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
  const parsed = JSON.parse(cleaned);

  return {
    meetingId: meeting.id,
    generatedAt: new Date().toISOString(),
    aiEngine: `Google Gemini (${model})`,
    accountOverview: {
      accountName: account.name,
      domain: account.domain,
      industry: account.industry,
      revenue: account.revenue,
      headcount: account.headcount,
      accountTier: account.accountTier,
      healthScore: account.crmStatus.healthScore,
      activeContract: account.crmStatus.activeContractValue,
      relationshipStage: account.crmStatus.relationshipStage,
      crossBuStatus: account.crmStatus.buPenetration,
      strategicUrgency: parsed.executiveSummary || `High urgency driven by recent triggers: "${account.signals[0]?.snippet.substring(0, 110)}..."`
    },
    stakeholderIntelligence: {
      ...parsed.stakeholderIntelligence,
      name: attendee.name,
      title: attendee.title,
      roleType: attendee.roleType
    },
    tailoredValueProposition: parsed.tailoredValueProposition,
    discoveryPlaybook: parsed.discoveryPlaybook,
    objectionHandling: parsed.objectionHandling,
    nextStepsEmail: parsed.nextStepsEmail
  };
}

/**
 * Autonomous Strategic Synthesis Engine (Produces rich, structured B2B intelligence fallback)
 */
function synthesizeBattlecard(meeting, account, matchedSolutions, customInputs = {}) {
  const attendee = meeting.attendee;
  const primarySolution = matchedSolutions[0];

  const activeContract = account.crmStatus.activeContractValue;
  const healthScore = account.crmStatus.healthScore;

  return {
    meetingId: meeting.id,
    generatedAt: new Date().toISOString(),
    aiEngine: "Autonomous Strategic Engine",
    accountOverview: {
      accountName: account.name,
      domain: account.domain,
      industry: account.industry,
      revenue: account.revenue,
      headcount: account.headcount,
      accountTier: account.accountTier,
      healthScore: healthScore,
      activeContract: activeContract,
      relationshipStage: account.crmStatus.relationshipStage,
      crossBuStatus: account.crmStatus.buPenetration,
      strategicUrgency: `High urgency driven by recent triggers: "${account.signals[0]?.snippet.substring(0, 110)}..."`
    },
    stakeholderIntelligence: {
      name: attendee.name,
      title: attendee.title,
      roleType: attendee.roleType,
      personalityProfile: "Pragmatic Driver: Prioritizes operational predictability, verifiable ROI, and rapid time-to-value over visionary hype.",
      whatKeepsThemUpAtNight: [
        `Risk of missed operational benchmarks impacting quarterly board reports.`,
        `Friction and delays caused by legacy internal tools failing under peak volatility.`,
        `Balancing strict budget constraints against executive pressure to modernize.`
      ],
      personalWin: `Being recognized by the Board for reducing operational friction while cutting baseline costs by double digits.`
    },
    tailoredValueProposition: {
      recommendedProduct: primarySolution.name,
      businessUnit: primarySolution.businessUnit,
      fitScore: `${primarySolution.relevanceScore}% Match`,
      whyThisSolution: primarySolution.matchReasons.join("; ") || "Strong synergy with core infrastructure priorities.",
      executiveElevatorPitch: `"${attendee.name.split(" ")[0]}, we know that current market pressures around ${account.industry} have put direct pressure on your team's margins. While your current systems handle steady-state operations, ${primarySolution.name} gives your executive team the exact real-time intelligence needed to eliminate costly blindspots within 48 hours—delivering a projected ${primarySolution.typicalROI} without ripping and replacing your core architecture."`,
      roiProjection: primarySolution.typicalROI
    },
    discoveryPlaybook: [
      {
        theme: "Quantifying Current Friction",
        question: `"When volatility strikes your regional hubs, how many hours does your team typically lose before identifying the exact root cause across disparate systems?"`,
        rationale: "Provokes the prospect to calculate the cost of latency and manual spreadsheet reconciliation."
      },
      {
        theme: "Internal Build vs. Purpose-Built Speed",
        question: `"Given your strategic timeline for Q4, how is your internal tech roadmap balancing custom tooling development against immediate revenue protection?"`,
        rationale: "Tactfully challenges the 'we can build this in-house' objection by emphasizing delivery time and maintenance overhead."
      },
      {
        theme: "Executive Decision Criteria",
        question: `"If we could prove a 25% improvement in operational throughput in a 30-day sandboxed pilot, who besides yourself would need to review the telemetry before greenlighting rollout?"`,
        rationale: "Maps the economic buying committee (MEDDIC criteria) without sounding intrusive."
      }
    ],
    objectionHandling: [
      {
        objection: `"Our internal tech team is already building a solution for this."`,
        psychologicalDriver: "Pride of ownership and fear of redundant IT expenditure.",
        counterTactic: "Reframe from 'replacement' to 'accelerator'. Emphasize that our engine integrates via open APIs to supercharge their existing tech, saving them 9 months of engineering backlog.",
        talkTrack: `"That’s exactly what we see in leading enterprises like yours. Most teams don't want to replace their core systems; they want an acceleration layer. By plugging our pre-trained models into your existing stack, your internal engineers get immediate results without spending 12 months building data pipelines from scratch."`
      },
      {
        objection: `"We have a freeze on new vendor onboarding until next fiscal year."`,
        psychologicalDriver: "Risk aversion and capital expenditure scrutiny.",
        counterTactic: "Pivot to Cost of Inaction (COI) and self-funding pilot models.",
        talkTrack: `"We completely understand fiscal discipline. In fact, most of our clients engage us precisely because the cost of operational blindspots during this quarter alone exceeds the entire annual software license. Would it make sense to structure a zero-risk 30-day proof-of-value that demonstrates measurable cost savings before any capital commitment?"`
      }
    ],
    nextStepsEmail: {
      subject: `Briefing & Value Framework for ${account.name} | Discussion with ${attendee.name.split(" ")[0]}`,
      body: `Hi ${attendee.name.split(" ")[0]},\n\nLooking forward to our conversation at ${meeting.time.split(" (")[0]}. \n\nI’ve put together a tailored brief on how peer enterprises in ${account.industry} are actively addressing recent margin and operational volatility—specifically focusing on:\n• Reducing operational downtime without disrupting current legacy workflows\n• Realizing tangible ROI within 60 days via pre-built connectors\n\nNo pitch decks or generic demos—just a focused working session on what matters most to your team right now.\n\nBest regards,\n${account.accountExecutive}\nRish AI Labs`
    }
  };
}

/**
 * Handle dynamic objection simulation (rebuttal engine) powered by Gemini
 */
async function simulateObjectionResponse({ objection, personaTitle, companyName, context }) {
  const company = companyName || "the client enterprise";
  const title = personaTitle || "the Executive Buyer";

  const ai = getGeminiClient();
  if (ai) {
    try {
      console.log(`[Gemini AI] Simulating objection rebuttal with ${GEMINI_MODELS[0]}...`);
      const prompt = `You are DealPilot Coach AI, an elite enterprise sales coach specializing in the Challenger Sale and MEDDIC methodology.
Analyze this buyer objection: "${objection}"
Buyer persona: ${title} at ${company}
Context: ${context || "Enterprise B2B software sales"}

Return ONLY a valid JSON object (no markdown fences, raw JSON only):
{
  "strategicAnalysis": "Deep breakdown of the buyer's psychological driver and root hesitation",
  "recommendedFramework": "Name of consultative framework (e.g., Cost of Inaction Reframe, Complementary Acceleration, Risk-Reversal)",
  "recommendedTalkTrack": "Verbatim, consultative, executive-level response script for the Account Executive",
  "followUpPivotQuestion": "A powerful question that shifts control back to value discovery",
  "coachTip": "Tactical delivery or body language/vocal inflection coaching tip"
}`;

      const { text, model } = await generateWithGeminiFallback(ai, prompt);

      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      return {
        objectionProvided: objection,
        personaTargeted: title,
        companyTargeted: company,
        strategicAnalysis: parsed.strategicAnalysis,
        recommendedFramework: parsed.recommendedFramework,
        recommendedTalkTrack: parsed.recommendedTalkTrack,
        followUpPivotQuestion: parsed.followUpPivotQuestion,
        coachTip: parsed.coachTip,
        aiEngine: `Google Gemini (${model})`
      };
    } catch (err) {
      console.warn("[Gemini AI] Live objection simulation failed, using heuristic engine:", err.message);
    }
  }

  // Heuristic rule engine fallback
  const lower = (objection || "").toLowerCase();
  let framework = "Acknowledge -> Reframe -> Quantify -> Pivot";
  let analysis = `The objection targets risk, timing, or budget priorities common for a ${title}.`;
  let talkTrack = "";
  let pivotQuestion = "";

  if (lower.includes("price") || lower.includes("expensive") || lower.includes("cost") || lower.includes("budget") || lower.includes("money")) {
    framework = "Cost of Inaction (COI) Reframe";
    analysis = "The buyer is weighing upfront software expenditure against short-term balance sheet scrutiny.";
    talkTrack = `"${title.split(" ")[0]}, we completely appreciate the scrutiny on software spend. When our partners look at the line item in isolation, it's an investment; but when compared against the operational losses caused by blindspots in ${company}, the platform typically pays for itself within the first 90 days. We don't ask clients to take that on faith—our agreements are tied to verifiable performance milestones."`;
    pivotQuestion = `"If we could structure this so the software is fully self-funding from realized cost reductions, would that warrant an exploratory pilot?"`;
  } else if (lower.includes("competitor") || lower.includes("alternative") || lower.includes("salesforce") || lower.includes("sap") || lower.includes("microsoft")) {
    framework = "Complementary Acceleration Reframe";
    analysis = "The buyer fears vendor sprawl or duplication with existing enterprise suites.";
    talkTrack = `"Those platforms are fantastic systems of record, and in fact, more than 80% of our enterprise clients run them alongside us. While they store your historical data, our engine acts as the predictive intelligence layer that sits on top—making your existing tools 3x more actionable without requiring data migration."`;
    pivotQuestion = `"How satisfied is your executive team with the predictive capabilities of your current system during unexpected market shifts?"`;
  } else if (lower.includes("time") || lower.includes("busy") || lower.includes("later") || lower.includes("next quarter") || lower.includes("next year")) {
    framework = "Urgency & Low-Lift Onboarding";
    analysis = "The buyer anticipates a long, painful deployment cycle that drains their team's bandwidth.";
    talkTrack = `"We hear that often—enterprise deployments usually sound daunting. That’s why we engineered our deployment to be zero-touch: no software installation, just lightweight API handshakes that our solution engineers configure in under 48 hours with less than 2 hours required from your internal team."`;
    pivotQuestion = `"If we handled 95% of the lift and delivered first telemetry in two days, would you be open to a low-touch preview?"`;
  } else {
    talkTrack = `"I completely understand why that's a key consideration for you at ${company}. In fact, that exact nuance came up when we collaborated with peers in your industry. Rather than asking you to alter your current operating rhythm, we integrate directly with your current constraints to provide immediate relief."`;
    pivotQuestion = `"What would success need to look like for your leadership team to feel 100% confident taking the next step?"`;
  }

  return {
    objectionProvided: objection,
    personaTargeted: title,
    companyTargeted: company,
    strategicAnalysis: analysis,
    recommendedFramework: framework,
    recommendedTalkTrack: talkTrack,
    followUpPivotQuestion: pivotQuestion,
    coachTip: "Keep your vocal tone slow, measured, and inquisitive. Never argue—validate their concern before introducing the reframe.",
    aiEngine: "Autonomous Heuristic Engine"
  };
}

/**
 * Live Custom Company Analyzer powered by Gemini
 */
async function analyzeCustomCompany({ companyName, industry, targetPersona, meetingGoal }) {
  const comp = companyName || "Target Enterprise";
  const ind = industry || "Technology & Services";
  const persona = targetPersona || "VP of Operations";
  const goal = meetingGoal || "Executive Discovery & Value Mapping";

  const ai = getGeminiClient();
  if (ai) {
    try {
      console.log(`[Gemini AI] Analyzing custom company ${comp} with ${GEMINI_MODELS[0]}...`);
      const prompt = `You are DealPilot AI, an autonomous strategic pre-meeting intelligence engine.
Analyze this prospective enterprise account:
- Company: ${comp}
- Industry: ${ind}
- Target Persona: ${persona}
- Meeting Objective: ${goal}

Return ONLY a valid JSON object (no markdown fences, pure JSON):
{
  "executiveSummary": "1-2 sentence assessment of ${comp}'s market position, strategic challenges, and immediate pain points in ${ind}",
  "urgencyScore": 88,
  "buyerMindset": {
    "persona": "${persona}",
    "primaryMotivator": "Core professional driver for this executive",
    "biggestVulnerability": "Key risk or blindspot they are guarding against"
  },
  "tailoredPitch": "Concise, compelling 2-minute elevator pitch connecting Rish AI Labs' autonomous AI capabilities to their goals",
  "recommendedDiscoveryQuestions": [
    "High-impact consultative question 1",
    "High-impact consultative question 2",
    "High-impact consultative question 3"
  ],
  "closingAction": "Next concrete consultative commitment to propose at the end of the meeting"
}`;

      const { text, model } = await generateWithGeminiFallback(ai, prompt);

      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      return {
        company: comp,
        industry: ind,
        targetPersona: persona,
        goal: goal,
        aiAnalysisTimestamp: new Date().toISOString(),
        aiEngine: `Google Gemini (${model})`,
        executiveSummary: parsed.executiveSummary,
        urgencyScore: parsed.urgencyScore || 88,
        buyerMindset: parsed.buyerMindset,
        tailoredPitch: parsed.tailoredPitch,
        recommendedDiscoveryQuestions: parsed.recommendedDiscoveryQuestions,
        closingAction: parsed.closingAction
      };
    } catch (err) {
      console.warn("[Gemini AI] Custom company analysis failed, using heuristic engine:", err.message);
    }
  }

  // Heuristic fallback
  return {
    company: comp,
    industry: ind,
    targetPersona: persona,
    goal: goal,
    aiAnalysisTimestamp: new Date().toISOString(),
    aiEngine: "Autonomous Heuristic Engine",
    executiveSummary: `${comp} is navigating rapid modernization in ${ind}. Executive priorities center on protecting margin efficiency, eliminating operational latency, and accelerating digital capabilities without excessive capex.`,
    urgencyScore: 89,
    buyerMindset: {
      persona: persona,
      primaryMotivator: "Scalable performance and risk containment that guarantees career advancement.",
      biggestVulnerability: "Fear of public deployment failures or vendor lock-in with rigid software architectures."
    },
    tailoredPitch: `"${persona.split(" ")[0]}, we know that staying ahead in ${ind} requires ${comp} to move faster than ever. Our enterprise platform provides an autonomous intelligence layer that connects directly into your existing infrastructure—delivering actionable insights within 48 hours and an average 3.8x ROI in the first 6 months."`,
    recommendedDiscoveryQuestions: [
      `"How is ${comp} currently bridging the gap between high-level executive strategic goals and daily front-line operational execution?"`,
      `"What is the single biggest bottleneck that slows down your cross-functional teams when an unexpected market fluctuation occurs?"`,
      `"When evaluating external enterprise software partners, what are the non-negotiable security and architectural criteria your committee requires?"`
    ],
    closingAction: `Offer a bespoke 14-day value audit benchmarking ${comp}'s operational metrics against top-quartile industry competitors.`
  };
}

/**
 * Agentic Conversational Chat with Coach AI
 */
async function chatWithCoachAI({ message, conversationHistory = [] }) {
  const ai = getGeminiClient();

  const formattedHistory = conversationHistory
    .slice(-8)
    .map((msg) => `${msg.role === "user" ? "AE (Harish Kumar)" : "Coach AI"}: ${msg.content}`)
    .join("\n\n");

  const prompt = `
You are Coach AI, the elite Enterprise Sales Sparring & Intelligence Copilot for "DealPilot Enterprise by Rish AI Labs".
You are conversing with an Account Executive (AE), Harish Kumar, or a sales leadership member.

Enterprise Context & Knowledge Base:
1. Target Enterprise Accounts in Pipeline:
   - Infosys Technologies (Infy) (IT Services / Cloud Engineering): Key stakeholder Rajesh Menon (VP Cloud Delivery). Pain: Delivery margin compression, automating complex cloud proposal turnaround. Deal size: $380,000.
   - HDFC Bank (BFSI / Banking): Key stakeholder Vikram Malhotra (Chief Risk & Compliance Officer). Pain: Strict RBI data residency, zero tolerance for public cloud leaks, automating risk audits. Deal size: $520,000.
   - Reliance Retail (Retail / Supply Chain): Key stakeholder Ananya Iyer (CCO & Head of Digital Strategy). Pain: Omnichannel stock-outs, multi-store distribution friction, inventory sync latency. Deal size: $250,000.
2. Rish AI Labs Solution Offerings:
   - "Agentic Sales Fabric": Autonomous multi-agent pipeline orchestration and deal intelligence layer.
   - "Cloud Architecture Studio": Enterprise multi-cloud governance, migration velocity, and security.
   - "Enterprise Risk & Compliance Shield": Zero-retention AES-256 boundary with on-prem/private VPC isolation for banks and regulated enterprises.
3. Connected CRM:
   - HubSpot CRM (Portal 247526396 - Rish AI Labs) live connected with real deals and contacts.

Role & Capabilities:
- Answer strategic questions about any account, stakeholder psychology, or value proposition.
- Generate live sales assets on demand (e.g. customized executive follow-up emails, MEDDIC qualification questions, competitive kill-points against Salesforce/Microsoft/In-house builds).
- Roleplay as a buyer or sparring partner when requested (e.g. "Act as Vikram Malhotra from HDFC Bank and test me on data security").
- Always be concise, actionable, and consultatively sharp. Use markdown formatting with bold points, bullets, and clean email draft blocks.

Recent Conversation History:
${formattedHistory || "No prior messages."}

Current AE Message:
"${message}"

Coach AI Response:
`;

  if (ai) {
    try {
      const { text } = await generateWithGeminiFallback(ai, prompt);
      return {
        reply: text.trim(),
        timestamp: new Date().toISOString()
      };
    } catch (err) {
      console.warn("[Gemini AI] Coach AI chat fallback:", err.message);
    }
  }

  // Heuristic / Contextual Fallback Response
  let fallbackReply = "";
  const lower = message.toLowerCase();

  if (lower.includes("email") || lower.includes("draft") || lower.includes("follow up") || lower.includes("outreach")) {
    fallbackReply = `Here is a high-converting executive email draft tailored for your opportunity:

**Subject:** Streamlining enterprise velocity for your Q4 roadmap — Rish AI Labs

**Hi Rajesh / Team,**

Great speaking with your team earlier this week regarding your multi-cloud delivery milestones. We observed that enterprise margin compression and RFP response velocity remain key bottlenecks across your delivery pods.

At **Rish AI Labs**, DealPilot connects directly on top of your existing CRM to automate pre-meeting intelligence, reducing manual preparation cycles by over 6.4 hours per team weekly while safeguarding IP.

Would you be open to a brief 15-minute briefing this Thursday at 3:00 PM to review our architecture benchmark?

Best regards,  
**Harish Kumar**  
Enterprise Strategic Accounts | Rish AI Labs`;
  } else if (lower.includes("objection") || lower.includes("price") || lower.includes("budget") || lower.includes("cost")) {
    fallbackReply = `### 🥊 How to Handle the Budget & Procurement Freeze Objection

When an executive like the CFO or VP says: *"We have a procurement freeze until next fiscal year"*:

1. **Acknowledge & Validate (Disarm):**  
   *"Completely understand, Rajesh. Given current macro scrutiny, every rupee of capex requires rigorous board justification."*

2. **Reframe from Cost to Margin Leakage:**  
   *"Most of our enterprise clients at Infosys and HDFC initially had similar constraints. What made them move forward wasn't buying new software—it was stopping the $45K monthly leakage in manual preparation latency and stalled enterprise proposals."*

3. **Low-Risk Commitment Pivot:**  
   *"We don't need a procurement commitment today. Let's do a zero-cost 14-day value audit on one delivery unit. If we don't prove 3x velocity, we part as friends. Does Thursday work to review scope?"*`;
  } else if (lower.includes("hdfc") || lower.includes("bank") || lower.includes("security") || lower.includes("rbi")) {
    fallbackReply = `### 🏦 HDFC Bank Deal Briefing: Vikram Malhotra (CRCO)

- **Core Sensitivity:** RBI data sovereignty and cyber risk containment.
- **Top Vulnerability:** Fear of non-compliance audit penalties or vendor cloud leaks.
- **Winning Pitch Track:**  
  *"Vikram, our Enterprise Risk & Compliance Shield operates with a zero-retention architecture. Your client telemetry is encrypted with AES-256 at rest and in transit, with full private VPC deployment options. We never train public models on your transaction records."*
- **Recommended Action:** Offer their CISO team our 28-point SOC2 and RBI regulatory compliance packet.`;
  } else if (lower.includes("infosys") || lower.includes("infy") || lower.includes("rajesh")) {
    fallbackReply = `### 🏢 Infosys Technologies (Infy) Briefing: Rajesh Menon (VP Cloud Delivery)

- **Deal Value:** $380,000 | **Stage:** Pre-Contract Architecture Review
- **Key Pain Point:** Delivery margin compression and slow RFP turnaround across multi-cloud accounts.
- **Strategic Angle:** Highlight how DealPilot's Agentic Sales Fabric gives Infosys delivery teams automated stakeholder battlecards in 30 seconds instead of 4 hours of manual research.
- **Next Best Action:** Schedule a 20-minute sandbox walkthrough focusing on their top AWS/Azure delivery pods.`;
  } else {
    fallbackReply = `### 🎯 Coach AI Analysis & Recommendation

I've analyzed your query regarding **"${message}"** against your active pipeline in Rish AI Labs:

- **Strategic Objective:** Maintain high deal velocity and ensure alignment with economic decision makers.
- **Key Action Item:** Focus on proving tangible ROI (e.g. 6.4 hrs saved per rep weekly, 38-day pipeline cycle reduction) rather than generic software features.
- **Next Step:** Would you like me to:
  1. **Draft an executive follow-up email** for this stakeholder?
  2. **Roleplay a tough C-level objection** so you can test your talk track?
  3. **Generate a customized 1-page business case**?`;
  }

  return {
    reply: fallbackReply,
    model: "Autonomous Heuristic Reasoning Engine",
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  generateBattlecard,
  simulateObjectionResponse,
  analyzeCustomCompany,
  chatWithCoachAI,
  generateTextWithFallback
};
