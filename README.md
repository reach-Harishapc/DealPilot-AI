# DealPilot Enterprise 🚀
### Autonomous Pre-Meeting Intelligence & Strategic Pitch Copilot for Complex B2B Sales

> **DealPilot** solves the massive cognitive friction faced by Enterprise Account Executives selling multi-product portfolios across siloed business units. It autonomously harmonizes internal CRM history, external market triggers, and product catalog capabilities to generate an executive-ready **Meeting Battlecard** in seconds.

---

## 🎯 The Core Business Problem

Enterprise sales representatives spend upwards of **35% of their working week** manually gathering context before critical prospect meetings:
- Digging through fragmented Salesforce logs, email threads, and Jira/support tickets.
- Searching 10-K annual reports, executive press announcements, and industry news.
- Struggling to match acute prospect challenges to complex multi-product catalogs (often resulting in generic "catalog dump" pitches that fail).
- Walking into high-stakes discovery meetings without understanding the specific buyer's psychological drivers, KPIs, or internal organizational politics.

**The Business Impact:** Lost deals, prolonged sales cycles, low first-meeting conversion, and missed cross-BU expansion revenue.

---

## 💡 The Solution: DealPilot Intelligence Engine

DealPilot acts as an autonomous sales strategist that runs in the background of your sales workflow:

1. **Pre-Meeting Intelligence (Meeting Feed):** Connects to your enterprise calendar (Google Calendar / Microsoft 365) and CRM (Salesforce / HubSpot).
2. **Buyer Persona Psychology Engine:** Models buyer motivations, career risks, and personal KPIs for the specific stakeholder (e.g., *Chief Risk Officer* vs. *VP of Global Supply Chain*).
3. **Dynamic Solution Alignment:** Maps the exact enterprise product module and calculates projected ROI tailored to the prospect's real bottleneck.
4. **Consultative Discovery Playbook:** Supplies 3 high-impact questions engineered using **MEDDIC** and **The Challenger Sale** frameworks.
5. **Real-time Deal Objection Coach:** Provides verbatim talk tracks, psychological drivers, and discovery pivot questions for tough objections.
6. **Executive Pre-Meeting Primer Email:** Pre-drafts high-touch, consultative outreach messages ready to send in 1 click.

---

## 🏗️ System Architecture

### 1. Current Application Stack (Rapid Cloud Deployment)
- **Frontend (`/client`):** Next.js (React) + Tailwind CSS + Lucide Icons (Deployable on **Vercel**).
- **Backend (`/server`):** Express.js (Node.js) asynchronous REST API (Deployable on **Render**).
- **AI Reasoning Layer:** Dynamic enterprise intelligence engine supporting Google Gemini, Claude, or OpenAI APIs.
- **Continuous Delivery:** GitHub Actions with automatic preview environments.

### 2. Enterprise Master Architecture (AWS Native)
For full-scale enterprise production deployment with SOC2 compliance, multi-tenancy, and vector search over millions of documents:
- **Edge:** Amazon Route 53 + AWS WAF + Amazon CloudFront.
- **Compute:** Amazon ECS on **AWS Fargate** (Serverless microservices for Next.js SSR and Express.js API).
- **Generative AI:** **Amazon Bedrock** (Claude 3.5 Sonnet / Amazon Titan) with Bedrock Guardrails.
- **Knowledge Search:** **Amazon OpenSearch Serverless** (Hybrid Vector & Keyword search).
- **Database:** **Amazon Aurora Serverless v2** (PostgreSQL with pgvector) + **Amazon ElastiCache** (Redis).
- *See full architecture documentation in [`brainstorm/05_master_aws_native_architecture.md`](brainstorm/05_master_aws_native_architecture.md).*

---

## 📂 Project Structure

```
sales_automation/
├── .agents/skills/              # Installed UI/UX and design intelligence skills
├── brainstorm/                  # Strategic documentation, problem analysis & AWS blueprint
│   ├── 01_problem_framing_and_selection.md
│   ├── 02_solution_concept_and_features.md
│   ├── 03_system_architecture_and_tech_stack.md
│   ├── 04_hackathon_pitch_and_timeline.md
│   ├── 05_master_aws_native_architecture.md
│   └── README.md
├── server/                      # Express.js Backend API
│   ├── package.json
│   ├── index.js                 # API server entrypoint (port 5001)
│   └── src/
│       ├── data/                # Enterprise catalog, accounts, and calendar meetings
│       ├── routes/              # REST endpoints (/api/meetings, /api/battlecard, etc.)
│       └── services/            # Dynamic AI synthesis & objection coach engine
├── client/                      # Next.js Frontend Dashboard
│   ├── package.json
│   ├── app/
│   │   ├── layout.js
│   │   ├── page.js              # DealPilot workspace
│   │   ├── globals.css          # Dark OLED + Glassmorphism design tokens
│   │   └── components/
│   │       ├── Navbar.js        # Enterprise header & CRM status
│   │       ├── MeetingFeed.js   # Calendar meetings & pipeline list
│   │       ├── BattlecardView.js# Strategic battlecard with 4 tabs & CRM export
│   │       ├── CustomCompanyModal.js   # On-demand account dossier research
│   │       └── ObjectionSimulatorModal.js # Deal objection coaching studio
└── slide/                       # Executive Presentation Deliverable
    └── index.html               # 16:9 interactive HTML executive pitch deck
```

---

## 🚀 Getting Started Locally

### 1. Run the Express Backend
```bash
cd server
npm install
node index.js
# Backend starts at http://localhost:5001
```

### 2. Run the Next.js Frontend
```bash
cd client
npm install
npm run dev
# Frontend starts at http://localhost:3000
```

---

## 🌐 Deploy to Production (Render & Vercel)

### Backend (Render):
1. Create a **New Web Service** on Render pointing to your GitHub repo.
2. Root directory: `server`.
3. Build command: `npm install`.
4. Start command: `node index.js`.

### Frontend (Vercel):
1. Import the repository into Vercel.
2. Root directory: `client`.
3. Framework preset: `Next.js`.
4. Add environment variable: `NEXT_PUBLIC_API_URL=https://your-render-backend.onrender.com`.
