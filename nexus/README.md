# Nexus — The Operating System for Knowledge

> Knowledge is a graph. Learning is traversal. Mastery is the destination.

**Nexus** is a production-grade Learning Operating System that powers universities,
colleges, online academies, corporate training, and self-directed learners. It is not
an LMS and not a course website. It is the connective tissue where knowledge, AI,
institutions, lecturers, and learners meet.

Where a traditional LMS models *courses you complete*, Nexus models *knowledge you
master*. Every concept is a node in a directed graph of prerequisites and dependents.
A learner's state is a live mastery vector over that graph. An adaptive engine
continuously computes the shortest path to mastery, a spaced-repetition engine keeps
knowledge from decaying, and a curriculum-aware AI tutor teaches strictly in
prerequisite order.

---

## The Core Bet

| Traditional LMS | Nexus |
| --- | --- |
| Courses are the unit of value | **Concepts** are the unit of value |
| Progress = % of content viewed | Progress = **mastery** (0–100) computed from evidence |
| Content is siloed per course | Content is a **reusable knowledge graph** shared across courses & institutions |
| Linear playlists | **Prerequisite-gated traversal** — dependents unlock only on mastery |
| Static, one-size-fits-all | **Adaptive** — the next best concept is recomputed continuously |
| Cram, forget, repeat | **Spaced repetition (FSRS)** fights the forgetting curve |
| Search = keyword match | **Semantic + graph search** across every artifact |
| AI bolted on | AI is **curriculum-aware & prerequisite-aware** by construction |

---

## What Phase 1 Delivers (this branch)

Phase 1 is **architecture and design only — no application code**. It contains:

| Document | Contents |
| --- | --- |
| [`docs/01-architecture-overview.md`](docs/01-architecture-overview.md) | Vision, principles, C4 context/container diagrams, tech stack rationale |
| [`docs/02-domain-model.md`](docs/02-domain-model.md) | DDD bounded contexts, aggregates, ubiquitous language, context map |
| [`docs/03-services.md`](docs/03-services.md) | Service/module catalog, responsibilities, sync vs async, scaling |
| [`docs/04-database-schema.md`](docs/04-database-schema.md) | Every table, ER diagrams, indexes, partitioning, pgvector |
| [`docs/05-api-design.md`](docs/05-api-design.md) | REST + async API surface, conventions, pagination, errors, versioning |
| [`docs/06-authentication.md`](docs/06-authentication.md) | Better Auth, multi-tenant RBAC/ABAC, sessions, security model |
| [`docs/07-learning-engine.md`](docs/07-learning-engine.md) | Mastery model, adaptive path (knowledge tracing), exam-readiness |
| [`docs/08-spaced-repetition.md`](docs/08-spaced-repetition.md) | FSRS + SM-2 scheduler, review queue, decay, auto-card generation |
| [`docs/09-ai-architecture.md`](docs/09-ai-architecture.md) | RAG pipeline, LangGraph tutor, guardrails, cost controls |
| [`docs/10-sequence-diagrams.md`](docs/10-sequence-diagrams.md) | Key end-to-end flows as sequence diagrams |
| [`docs/11-folder-structure.md`](docs/11-folder-structure.md) | Monorepo layout, Clean Architecture layering per module |
| [`docs/12-roadmap.md`](docs/12-roadmap.md) | Phased delivery plan, milestones, definition of done |

Start with [`docs/01-architecture-overview.md`](docs/01-architecture-overview.md).

---

## Technology Stack (summary)

- **Frontend** — Next.js 15 (App Router), React, TypeScript, TailwindCSS, shadcn/ui, TanStack Query, React Flow (graph UI), Framer Motion.
- **Backend** — Python 3.12, FastAPI, SQLAlchemy 2.0, Alembic, Pydantic v2. Modular monolith with clean module boundaries.
- **Data** — PostgreSQL 16 (primary + `pgvector`), Redis (cache, queues, rate limits), Celery (async workers).
- **AI** — Anthropic (Claude) + OpenAI + local models behind a provider abstraction; LangGraph orchestration; LlamaIndex retrieval; RAG over pgvector (Qdrant optional at scale).
- **Auth** — Better Auth (multi-tenant, OAuth, sessions), backend RBAC/ABAC enforcement.
- **Infra** — Docker, GitHub Actions CI/CD, Vercel (web), Railway/containers (API + workers), Cloudflare R2 (object storage).
- **Observability** — Sentry, OpenTelemetry, Prometheus, Grafana.

Rationale for every choice lives in [`docs/01-architecture-overview.md`](docs/01-architecture-overview.md).

---

## Engineering Standards

Clean Architecture · Domain-Driven Design · SOLID · Repository Pattern · Dependency
Injection · CQRS at read-heavy seams · Event-Driven integration between contexts ·
strict typing end to end · comprehensive tests · designed for millions of users.

---

## Status

**Phase 1 — Architecture & Design.** Awaiting review and approval before any
application code, migrations, or endpoints are written.
