# 05 — API Design

The API is REST over HTTPS/JSON, described by an auto-generated **OpenAPI 3.1** spec
(FastAPI). Real-time surfaces (AI streaming, live progress) use **SSE**. Heavy operations
return **202 + job resource**.

## 1. Conventions

- **Base:** `https://api.nexus.app/v1`. Version in the path; breaking changes bump the major.
- **Tenancy:** resolved from the session/JWT tenant claim; also assertable via
  `X-Tenant-Id`. All data is implicitly tenant-scoped — no cross-tenant reads.
- **Auth:** `Authorization: Bearer <session token>` (Better Auth). See doc 06.
- **Content type:** `application/json`; `snake_case` fields.
- **IDs:** UUID strings.
- **Pagination:** cursor-based — `?limit=50&cursor=<opaque>`; response
  `{ data: [...], page: { next_cursor, has_more } }`. Offset pagination is not offered on
  large collections.
- **Filtering/sort:** `?filter[status]=published&sort=-created_at`.
- **Sparse fields / expansion:** `?fields=id,title&expand=concepts`.
- **Idempotency:** `Idempotency-Key` header required on POST that create side effects
  (attempt submit, payments, AI generation).
- **Concurrency:** `ETag` + `If-Match` on mutable resources for optimistic concurrency.
- **Rate limits:** `X-RateLimit-*` headers; `429` with `Retry-After`.
- **Tracing:** `X-Request-Id` echoed; propagated as OTel trace id.

## 2. Error Model (RFC 9457 problem+json)

```json
{
  "type": "https://errors.nexus.app/validation",
  "title": "Validation failed",
  "status": 422,
  "detail": "mastery_threshold must be between 0 and 100",
  "instance": "/v1/concepts",
  "errors": [{ "field": "mastery_threshold", "code": "out_of_range" }],
  "trace_id": "8f1c..."
}
```

Standard statuses: `400/401/403/404/409/422/429` and `5xx`. Domain rule violations map to
`409 Conflict` (e.g. `prerequisite_cycle`, `concept_locked`) or `422`.

## 3. Resource Map (by module)

### Identity & Tenancy (`iam`)
```
POST   /auth/register                 POST /auth/login            POST /auth/logout
POST   /auth/refresh                  GET  /auth/session          POST /auth/oauth/{provider}
GET    /me                            PATCH /me
GET    /tenants                       POST /tenants               GET /tenants/{id}
GET    /tenants/{id}/members          POST /tenants/{id}/invites  PATCH /members/{id}/role
GET    /roles                         POST /roles                 GET /audit-logs
```

### Institution
```
GET/POST   /universities            GET/PATCH/DELETE /universities/{id}
GET/POST   /universities/{id}/departments
GET/POST   /departments/{id}/programs
GET/POST   /programs/{id}/levels     GET/POST /levels/{id}/semesters
GET/POST   /courses                  GET/PATCH /courses/{id}
GET        /courses/{id}/concepts    PUT      /courses/{id}/concepts     # set course↔concept map
POST       /courses/{id}/enroll      GET      /courses/{id}/enrollments
POST       /courses/{id}/import      # bulk curriculum import (async → job)
```

### Knowledge Graph
```
GET/POST   /concepts                 GET/PATCH/DELETE /concepts/{id}
POST       /concepts/{id}/publish    GET  /concepts/{id}/versions
GET        /concepts/{id}/graph?depth=2&direction=both    # neighborhood for React Flow
POST       /concepts/{id}/edges      DELETE /edges/{id}    # 409 on prerequisite cycle
GET        /graph?course_id=...&root=... # subgraph export (nodes + edges)
GET/POST   /tags                     GET /taxonomies
```

### Content
```
GET/POST   /concepts/{id}/resources  GET/PATCH/DELETE /resources/{id}
POST       /media/upload-url         # returns R2 signed PUT
POST       /videos                   # register YouTube id → async transcript job
POST       /videos/{id}/progress     # {position_seconds, watched_percent}
GET        /videos/{id}/transcript   POST /videos/{id}/summary   # async
```

### Assessment
```
GET/POST   /quizzes                  GET/PATCH /quizzes/{id}   POST /quizzes/{id}/publish
GET/POST   /item-banks               GET/POST /item-banks/{id}/items
POST       /quizzes/{id}/attempts    # start attempt
POST       /attempts/{id}/responses  POST /attempts/{id}/submit   # Idempotency-Key
GET        /attempts/{id}            # graded result
GET/POST   /courses/{id}/past-questions
```

### Learning Engine
```
GET        /me/mastery?course_id=...            # mastery map (concept → score/status)
GET        /concepts/{id}/mastery               # single concept state
GET        /me/next?course_id=...&limit=5       # next best concepts (adaptive)
GET        /me/study-plan?course_id=...&horizon=7d
GET        /me/weak-concepts    GET /me/forgotten-concepts
GET        /me/readiness?exam_id=...            # exam readiness + failure risk
POST       /sessions             POST /sessions/{id}/end
POST       /evidence             # explicit signal (self-report, external)
```

### Spaced Repetition
```
GET        /me/reviews/due?limit=50   # today's queue
POST       /reviews                   # {card_id, rating} → schedules next
GET/POST   /decks                     GET/POST /cards      PATCH /cards/{id}/suspend
POST       /cards/generate            # from resource/video/note → async job
GET        /me/reviews/forecast?days=30
```

### AI Tutor
```
POST       /ai/conversations                    GET /ai/conversations/{id}
POST       /ai/conversations/{id}/messages      # SSE stream of grounded answer
POST       /ai/explain      {concept_id}        # prerequisite-aware explanation
POST       /ai/generate/quiz   {concept_id|resource_id, count}
POST       /ai/generate/flashcards
POST       /ai/generate/summary | /mindmap | /plan
GET        /ai/jobs/{id}                         # async generation status/result
```

### Search
```
GET /search?q=...&types=concept,course,video,card,quiz,pastq,note,lecturer,university
           &course_id=...&mode=hybrid   # keyword+semantic+graph-ranked
```

### Analytics / Dashboards
```
GET /me/dashboard            # streak, due, weak, countdown, heatmap, achievements
GET /me/heatmap?range=90d    GET /me/streak     GET /me/achievements
GET /courses/{id}/analytics  # lecturer: cohort mastery, at-risk students, item stats
GET /admin/analytics         # platform: usage, storage, active users
```

### Admin & Billing
```
GET /admin/tenants   GET /admin/audit-logs   GET/PATCH /admin/feature-flags
GET /billing/subscription  POST /billing/checkout  GET /billing/usage  GET /billing/invoices
```

## 4. Representative Payloads

**Get concept graph neighborhood** (`GET /concepts/{id}/graph?depth=2`)
```json
{
  "nodes": [
    { "id": "c_recursion", "title": "Recursion", "mastery": 42, "status": "in_progress", "bloom_level": "apply" },
    { "id": "c_dp", "title": "Dynamic Programming", "mastery": 0, "status": "locked" }
  ],
  "edges": [
    { "from": "c_recursion", "to": "c_dp", "type": "prerequisite", "weight": 0.9 }
  ]
}
```

**Next best concepts** (`GET /me/next?course_id=...`)
```json
{
  "data": [
    { "concept_id": "c_recursion", "reason": "prereq_gap", "priority": 0.94,
      "why": "Blocks Dynamic Programming; current mastery 42 < threshold 80." },
    { "concept_id": "c_stacks", "reason": "forgotten", "priority": 0.71,
      "why": "Retention dropped to 0.6; review recommended." }
  ]
}
```

**Submit review** (`POST /reviews`)
```json
// request
{ "card_id": "card_123", "rating": "good", "elapsed_seconds": 8 }
// response
{ "card_id": "card_123", "next_due_at": "2026-07-13T00:00:00Z",
  "stability": 12.4, "difficulty": 5.1, "retrievability": 0.9 }
```

## 5. Streaming (AI)

`POST /ai/conversations/{id}/messages` returns `text/event-stream`:
```
event: token      data: {"delta":"Let's"}
event: citation   data: {"source_type":"resource","source_id":"r_88","snippet":"..."}
event: prerequisite_gate data: {"blocked_concept":"c_dp","suggest":"c_recursion"}
event: done       data: {"message_id":"m_9","tokens":812}
```

## 6. Versioning & Deprecation

- Additive changes (new fields/endpoints) are non-breaking and shipped continuously.
- Breaking changes → new major (`/v2`); overlap window with `Deprecation`/`Sunset` headers.
- OpenAPI spec published per version; typed clients generated for the web app.

## 7. Security Notes (see doc 06 for depth)

- Every endpoint declares required permission(s); enforced by a dependency in the interface
  layer before reaching application services.
- Mutations validated by Pydantic DTOs; domain invariants enforced in aggregates.
- No endpoint trusts client-supplied `tenant_id`, `user_id`, mastery, or scores.

Next: [`06-authentication.md`](06-authentication.md).
