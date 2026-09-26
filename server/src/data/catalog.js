/**
 * Rish AI Labs - Enterprise B2B Solution Catalog (Multi-BU)
 * Standardized categories and business units with comprehensive enterprise products.
 */
module.exports = [
  {
    id: "bu-sales-01",
    businessUnit: "Sales AI & Revenue Operations",
    category: "Autonomous Sales Agents",
    name: "Agentic Sales Fabric: Autonomous Deal Intelligence",
    targetPersonas: ["Chief Revenue Officer", "VP of Sales Operations", "Enterprise Sales Director"],
    elevatorPitch: "Autonomous multi-agent orchestration layer that ingests CRM and prospect signals to generate personalized executive meeting battlecards and objection playbooks in seconds.",
    capabilities: [
      "Real-time bi-directional CRM data sync (HubSpot, Salesforce, M365)",
      "Automated executive persona profiling and MEDDIC talk-track synthesis",
      "Interactive objection sparring simulator powered by Gemini 3.6 Flash"
    ],
    pricingModel: "Enterprise Annual Subscription ($150K/yr + AE seat tiers)",
    typicalROI: "Saves 6.4 hours per rep weekly and accelerates pipeline deal velocity by 38 days"
  },
  {
    id: "bu-cloud-02",
    businessUnit: "Cloud Engineering & Architecture",
    category: "Multi-Cloud Architecture",
    name: "Cloud Architecture Studio: Automated RFP & Scoping",
    targetPersonas: ["VP of Cloud Delivery", "Chief Technology Officer", "Head of Solution Architecture"],
    elevatorPitch: "Automated solution architecture engine that generates multi-cloud blueprints, bills-of-materials, and RFP responses in 4 hours instead of 2 weeks.",
    capabilities: [
      "Automated target-state blueprinting aligned to AWS Well-Architected & Azure CAF",
      "Bill-of-materials cost estimation with 98% accuracy",
      "Reclaims 70% of senior architect hours back to billable client delivery"
    ],
    pricingModel: "Tier-1 GSI Enterprise License ($280K/yr)",
    typicalROI: "Expands cloud project gross margins by 12–15% and doubles RFP bid capacity"
  },
  {
    id: "bu-cloud-03",
    businessUnit: "Cloud Engineering & Architecture",
    category: "Cloud Infrastructure",
    name: "CloudBridge Hybrid Fabric",
    targetPersonas: ["Chief Information Officer", "Head of Cloud Infrastructure", "VP of Engineering"],
    elevatorPitch: "Unified multi-cloud mesh enabling legacy mainframe workloads to seamlessly interface with modern cloud microservices without disruptive migrations.",
    capabilities: [
      "Zero-downtime database replication across AWS, Azure, and on-prem",
      "FinOps automated cost optimization reducing idle cloud spend by 28%",
      "Automated disaster recovery failover in under 12 seconds"
    ],
    pricingModel: "Consumption-based + Base Cluster Tier ($250K/yr)",
    typicalROI: "38% infrastructure cost reduction and 60% faster application deployment"
  },
  {
    id: "bu-ai-04",
    businessUnit: "Data & Enterprise AI",
    category: "AI Decision Automation",
    name: "Cognitive Flow: Predictive Operations AI",
    targetPersonas: ["Chief Technology Officer", "VP of Operations", "Chief Digital Officer"],
    elevatorPitch: "Autonomous AI engine that models complex operational workflows to forecast bottlenecks 72 hours before they impact revenue.",
    capabilities: [
      "Real-time sensor & telemetry data ingestion",
      "Dynamic lead-time forecasting with 94.8% historical accuracy",
      "Automated root-cause anomaly detection across ERP & WMS systems"
    ],
    pricingModel: "Enterprise Annual License ($180K/yr + volume tiers)",
    typicalROI: "4.2x ROI within 6 months via 31% reduction in operational downtime"
  },
  {
    id: "bu-ai-05",
    businessUnit: "Data & Enterprise AI",
    category: "LLM Governance & GenAI",
    name: "TrustLayer: Enterprise GenAI & Guardrails Studio",
    targetPersonas: ["Chief AI Officer", "Chief Information Security Officer", "Head of Data Science"],
    elevatorPitch: "Enterprise runtime guardrail platform that prevents prompt injection, hallucination, and data leakage across production LLM workflows.",
    capabilities: [
      "Sub-20ms latency semantic firewall inspecting prompt inputs and completions",
      "Automated PII/PHI tokenization before third-party model inference",
      "Regulatory model risk management reporting aligned to EU AI Act & NIST"
    ],
    pricingModel: "Annual Gateway License ($135K/yr + API token tiers)",
    typicalROI: "100% elimination of unvetted AI data leaks and 85% faster compliance sign-offs"
  },
  {
    id: "bu-sec-06",
    businessUnit: "Cybersecurity & Governance",
    category: "Cybersecurity & Risk",
    name: "ZeroVault: Continuous Compliance & Threat Mesh",
    targetPersonas: ["Chief Information Security Officer", "Chief Risk Officer", "Head of Compliance"],
    elevatorPitch: "AI-driven Zero-Trust security mesh that automates continuous regulatory audit readiness (DORA, SOC2, HIPAA, RBI) while intercepting insider threats.",
    capabilities: [
      "Automated evidence collection across 400+ SaaS and IaaS tools",
      "Dynamic identity-based least privilege enforcement",
      "Real-time adversarial simulation and breach containment"
    ],
    pricingModel: "Seat-based + Node monitoring tier ($140K/yr)",
    typicalROI: "Eliminates 90% of manual audit prep hours and mitigates multimillion-dollar regulatory fines"
  },
  {
    id: "bu-finops-07",
    businessUnit: "FinOps & Cloud Economics",
    category: "FinOps & Cost Optimization",
    name: "FinOps Autopilot: Cloud Waste Eliminator",
    targetPersonas: ["Chief Financial Officer", "Head of Cloud Infrastructure", "VP of Engineering"],
    elevatorPitch: "Continuous real-time cloud waste detection and autonomous rightsizing across AWS, GCP, and Azure compute instances.",
    capabilities: [
      "Autonomous idle resource reclamation with zero production disruption",
      "Spot instance arbitrage reducing Kubernetes cluster compute costs by 52%",
      "Unit economics allocation tracking cost per customer transaction"
    ],
    pricingModel: "Gain-share (% of verified cloud savings) or $95K/yr base",
    typicalROI: "Delivers average $340,000 net cloud savings in first 90 days"
  },
  {
    id: "bu-erp-08",
    businessUnit: "Supply Chain & Commerce",
    category: "ERP & Supply Chain",
    name: "OmniSync Supply Chain Control Tower",
    targetPersonas: ["VP of Supply Chain", "Chief Procurement Officer", "Logistics Director"],
    elevatorPitch: "End-to-end supply chain visibility platform providing multi-tier supplier visibility, inventory rebalancing, and dynamic freight optimization.",
    capabilities: [
      "Multi-modal freight tracking with carbon and weather risk scoring",
      "Automated supplier scorecards and contract compliance checks",
      "Dynamic safety stock balancing across global distribution hubs"
    ],
    pricingModel: "Enterprise Subscription ($320K/yr)",
    typicalROI: "18% reduction in buffer stock inventory costs and 45% faster supplier incident resolution"
  },
  {
    id: "bu-cx-09",
    businessUnit: "Customer Data & Intelligence",
    category: "Customer 360 & Analytics",
    name: "Customer 360 Semantic Knowledge Graph",
    targetPersonas: ["Chief Commercial Officer", "Head of Customer Experience", "VP of Marketing"],
    elevatorPitch: "Enterprise entity resolution engine that connects disjointed CRM, billing, and behavioral silos into an actionable real-time customer graph.",
    capabilities: [
      "Deterministic and probabilistic identity resolution across 10M+ records",
      "Natural language graph querying for front-line sales and service reps",
      "Predictive churn detection with early warning alerts 45 days in advance"
    ],
    pricingModel: "Enterprise Tier ($210K/yr)",
    typicalROI: "24% improvement in cross-sell conversion and 19% reduction in customer attrition"
  },
  {
    id: "bu-devops-10",
    businessUnit: "Platform & DevOps Engineering",
    category: "DevOps & SRE Autopilot",
    name: "SRE Copilot: Autonomous Incident Resolution Mesh",
    targetPersonas: ["VP of Infrastructure", "Director of SRE", "Head of Platform Engineering"],
    elevatorPitch: "Autonomous Site Reliability Engineering copilot that correlates distributed logs, traces, and metrics to auto-remediate production outages in minutes.",
    capabilities: [
      "Root cause pinpointing in under 60 seconds across microservices topologies",
      "Automated runbook synthesis with human-in-the-loop approval workflows",
      "Proactive reliability regression testing integrated into CI/CD pipelines"
    ],
    pricingModel: "Enterprise Node License ($115K/yr)",
    typicalROI: "68% reduction in Mean Time to Resolution (MTTR) and 40% reduction in developer on-call fatigue"
  }
];
