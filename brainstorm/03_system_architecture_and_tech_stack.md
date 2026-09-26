# 03. System Architecture & Technical Choices (MVP & Deployment)

## 1. Hackathon MVP Architecture

For rapid, robust deployment before the 5:30 PM deadline, we leverage a battle-tested decoupled stack with instant hosting:

```
┌────────────────────────────────────────────────────────────────────────┐
│               Frontend: Next.js (React) on Vercel                      │
│   - Modern Dark-mode Glassmorphic Dashboard                            │
│   - Live Meeting Command Center, Battlecard Viewer, Objection Sim     │
│   - Responsive, Tailwind/Vanilla CSS, Export to Markdown/PDF           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTPS REST / Server-Sent Events (SSE)
                                    │ (CORS Enabled)
┌───────────────────────────────────▼────────────────────────────────────┐
│               Backend: Express.js (Node.js) on Render                  │
│   - REST API & Streaming Endpoints                                     │
│   - Dynamic AI Orchestrator (Google Gemini / Vertex / Bedrock API)     │
│   - Context Synthesis Engine (CRM Vault + Product Catalog)             │
│   - Live In-Memory / File Cache                                        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   GitHub Repository & CI/CD Pipeline                   │
│   - Mono-repo or dual-repo structure (`/client` and `/server`)         │
│   - Auto-deploy triggers on `main` push:                               │
│     * Vercel: Auto-builds & deploys Next.js frontend                  │
│     * Render: Auto-builds & deploys Express.js backend                 │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Technical Stack Choices & Justifications

| Component | Choice | Justification for Judges |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js (React) on Vercel** | Industry standard, blazing fast SSR/SSG, seamless deployment on Vercel, optimized component rendering. |
| **Backend Framework** | **Express.js (Node.js) on Render** | High agility, non-blocking I/O ideal for streaming LLM tokens, lightweight containerized deployment on Render with zero DevOps friction. |
| **Code Pipeline** | **GitHub Actions / GitHub Auto-Deploy** | Clean Git flow, automated linting/tests, automatic instant rebuilds to Vercel & Render upon push. |
| **AI / LLM Engine** | **Gemini API / Vertex AI / Bedrock** | Fast inference latency (<1.5s), large token context window to ingest rich enterprise CRM histories and product sheets. |
| **Target Master Architecture** | **AWS Native (ECS, Bedrock, Aurora, OpenSearch)** | Complete enterprise-grade scalability roadmap presented to judges as the production-ready target architecture. *(See [05_master_aws_native_architecture.md](05_master_aws_native_architecture.md))* |

---

## 3. Strict Compliance with Hackathon Anti-Hardcoding Rule

The prompt brief strictly states:
> *"Your prototype must demonstrate a genuinely dynamic, AI-driven solution. Limited hardcoding is acceptable for setup, workflow, or supporting functions, but hardcoded responses or logic must not be used to artificially improve apparent quality."*

### How DealPilot Ensures Compliance:
1. **Dynamic Generation On-Demand:** Every battlecard is generated live by calling the LLM with company name, attendee role, meeting objective, and vendor catalog.
2. **Judge Live Test Case:** The UI features an **"Analyze Any Custom Company"** modal where a judge can input their own company or an arbitrary prompt to verify live LLM generation.
3. **Interactive Simulator:** The objection handling simulation runs interactive multi-turn LLM reasoning, allowing any unexpected objection to be handled live.
