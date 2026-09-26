/**
 * Enterprise Target Accounts (Synthetic B2B Dataset with rich CRM, News, and Stakeholder context)
 */
module.exports = [
  {
    id: "acc-infy",
    name: "Infosys Technologies (Infy)",
    domain: "infosys.com",
    industry: "IT & Cloud Transformation Services",
    revenue: "$18.6 Billion",
    headcount: "320,000+",
    headquarters: "Bangalore, India",
    accountTier: "Tier 1 Strategic Enterprise",
    accountExecutive: "Harish Kumar",
    crmStatus: {
      healthScore: 82,
      activeContractValue: "$420,000 / yr (CloudBridge Base)",
      relationshipStage: "Expansion / Cross-BU Upsell",
      lastTouchpoint: "3 weeks ago - Quarterly Business Review with Delivery Ops",
      openTickets: 1,
      buPenetration: {
        "Cloud Modernization": "Active Client",
        "Data & Enterprise AI": "Evaluating Pilot",
        "Supply Chain Control Tower": "New Opportunity (High Priority)",
        "Cybersecurity": "Not Engaged"
      }
    },
    signals: [
      {
        type: "Earnings Transcript / Investor Day",
        source: "Q3 Global Delivery Outlook",
        date: "2 weeks ago",
        snippet: "Rapid expansion of client GenAI and multi-cloud delivery contracts increased infrastructure latency. Executive board demands automated workload orchestration and proactive bottleneck prevention."
      },
      {
        type: "Executive Leadership Move",
        source: "Industry Press",
        date: "1 month ago",
        snippet: "Appointed new Global Head of Cloud Delivery & AI Infrastructure to spearhead enterprise client modernization across EMEA and Americas hubs."
      }
    ],
    stakeholders: [
      {
        name: "Rajesh Menon",
        title: "VP of Global Cloud Delivery Operations",
        email: "rajesh.menon@infosys.example.com",
        location: "Bangalore, India",
        personalityType: "Analytical & Pragmatic (Metrics-driven)",
        kpis: [
          "Zero service SLA breaches across global delivery pods",
          "Automated cloud infrastructure utilization > 88%",
          "Time-to-deploy for client AI pipelines < 48 hours"
        ],
        likelyObjections: [
          "Our internal tooling team claims they are already building an in-house orchestration layer.",
          "We cannot afford a complex 6-month migration cycle during active client sprint deliveries."
        ]
      },
      {
        name: "Elena Sharma",
        title: "Chief Digital Information Officer",
        email: "elena.sharma@infosys.example.com",
        location: "London / Bangalore",
        personalityType: "Strategic Innovator (Scalability & Architecture)",
        kpis: ["Cloud infrastructure consolidation", "API standardization across regional hubs"],
        likelyObjections: ["Data security and vendor lock-in with proprietary AI models."]
      }
    ]
  },
  {
    id: "acc-hdfc",
    name: "HDFC Bank",
    domain: "hdfcbank.com",
    industry: "Banking & Financial Services (BFSI)",
    revenue: "$24.2 Billion",
    headcount: "175,000+",
    headquarters: "Mumbai, India",
    accountTier: "Tier 1 Enterprise",
    accountExecutive: "Priya Sharma",
    crmStatus: {
      healthScore: 86,
      activeContractValue: "$780,000 / yr (ZeroVault Security Core)",
      relationshipStage: "Cross-BU Upsell to AI Operations",
      lastTouchpoint: "5 days ago - Compliance signoff completed",
      openTickets: 0,
      buPenetration: {
        "Cybersecurity": "Active Client",
        "Data & Enterprise AI": "Opportunity Identified",
        "Cloud Modernization": "Evaluating",
        "Supply Chain Control Tower": "N/A"
      }
    },
    signals: [
      {
        type: "Regulatory Compliance Audit",
        source: "RBI Stress-Test Review",
        date: "10 days ago",
        snippet: "Mandated immediate stress-testing for algorithmic fraud, cross-border payment settlement latency, and real-time AML audit mesh by Q4."
      },
      {
        type: "Strategic Initiative",
        source: "Investor Day Press Release",
        date: "3 weeks ago",
        snippet: "Allocated $150M capital expenditure budget for real-time customer risk scoring and automated transaction anomaly containment."
      }
    ],
    stakeholders: [
      {
        name: "Vikram Malhotra",
        title: "Chief Risk & Compliance Officer",
        email: "vikram.malhotra@hdfcbank.example.com",
        location: "Mumbai, India",
        personalityType: "Risk-Averse, Detail-Oriented, Rigorous",
        kpis: [
          "Zero audit non-compliance findings",
          "Reduction of false-positive transaction blocks by 25%",
          "Sub-100ms real-time AML screening"
        ],
        likelyObjections: [
          "Regulators will not accept a black-box AI model without explainable lineage.",
          "Our compliance committee takes 4 months to vet third-party API dependencies."
        ]
      }
    ]
  },
  {
    id: "acc-reliance",
    name: "Reliance Retail",
    domain: "relianceretail.com",
    industry: "Omnichannel Consumer Retail & Commerce",
    revenue: "$34.8 Billion",
    headcount: "245,000+",
    headquarters: "Mumbai, India",
    accountTier: "Tier 1 Strategic",
    accountExecutive: "Arjun Nair",
    crmStatus: {
      healthScore: 70,
      activeContractValue: "$0 (Net New Pursuit)",
      relationshipStage: "First Discovery Call",
      lastTouchpoint: "Initial outreach via VP of Commerce introduction",
      openTickets: 0,
      buPenetration: {
        "Data & Enterprise AI": "Active Pitch",
        "Supply Chain Control Tower": "Targeted",
        "Cloud Modernization": "Prospecting",
        "Cybersecurity": "Not Engaged"
      }
    },
    signals: [
      {
        type: "Market News",
        source: "Retail Insider Weekly",
        date: "1 week ago",
        snippet: "Reported margin pressure due to regional distribution center bottlenecks and inventory overhang across electronics and apparel categories."
      }
    ],
    stakeholders: [
      {
        name: "Ananya Iyer",
        title: "Chief Commercial & Digital Officer",
        email: "ananya.iyer@relianceretail.example.com",
        location: "Mumbai, India",
        personalityType: "Fast-Paced, Revenue & Margin Focused",
        kpis: [
          "Improving inventory sell-through rate without heavy discounting",
          "Omnichannel checkout conversion rate across 18,000+ stores",
          "Customer Lifetime Value (LTV) increase"
        ],
        likelyObjections: [
          "We just cut discretionary IT spend by 10% after last quarter's earnings.",
          "How does this connect to our existing enterprise ERP and warehouse logistics platforms?"
        ]
      }
    ]
  }
];
