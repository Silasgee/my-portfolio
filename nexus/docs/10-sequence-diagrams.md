# 10 — Sequence Diagrams (Key Flows)

End-to-end flows across contexts. Each shows the synchronous request path and the async
event/task fan-out.

## 1. Lecturer publishes a concept & auto-generates learning assets

```mermaid
sequenceDiagram
    actor L as Lecturer
    participant API
    participant KG as knowledge
    participant OUT as Outbox/Bus
    participant AIW as ai worker
    participant SRS as srs
    participant SRCH as search

    L->>API: POST /concepts (title, objectives, prereqs...)
    API->>KG: create Concept (draft)
    KG-->>API: 201 concept
    L->>API: POST /concepts/{id}/edges (prerequisite)
    API->>KG: validate no cycle → add edge
    L->>API: POST /concepts/{id}/publish
    API->>KG: publish version (immutable snapshot)
    KG->>OUT: ConceptPublished, ConceptEdgeAdded
    OUT-->>AIW: (async) embed concept + resources
    OUT-->>SRCH: (async) index concept
    L->>API: POST /ai/generate/flashcards {concept_id}
    API->>AIW: enqueue job (ai queue)
    AIW->>AIW: retrieve grounded content → cards (deduped)
    AIW->>SRS: create candidate cards
    AIW-->>API: job done → cards ready for curation
```

## 2. Student asks the AI tutor a question (prerequisite gate fires)

```mermaid
sequenceDiagram
    actor S as Student
    participant API
    participant AI as ai (LangGraph)
    participant LRN as learning
    participant RAG as retrieval (pgvector+FTS)

    S->>API: POST /ai/conversations/{id}/messages "Explain Dynamic Programming"
    API->>AI: ask(conversation, message)
    AI->>AI: DetectConcept → c_dynamic_programming
    AI->>LRN: get_state(user, prerequisites(c_dp))
    LRN-->>AI: mastery(recursion)=42 (< 80)
    AI-->>S: SSE prerequisite_gate {blocked: c_dp, suggest: c_recursion}
    AI->>RAG: retrieve approved content for recursion
    RAG-->>AI: chunks + citations
    AI-->>S: SSE tokens "You still struggle with recursion... let's review it first"
    AI-->>S: SSE citation(s)
    AI->>AI: ComprehensionCheck question
    S->>API: answers check
    AI->>LRN: record_evidence(source=ai, concept=recursion, signal)
    AI-->>S: SSE done
```

## 3. Daily review session (SRS → mastery decay loop)

```mermaid
sequenceDiagram
    participant BEAT as beat
    participant SRSW as srs worker
    participant DB as Postgres
    actor S as Student
    participant API
    participant SRS as srs
    participant LRN as learning

    BEAT->>SRSW: 04:00 build_daily_queue(tenant)
    SRSW->>DB: select due cards, order overdue-first, cap
    SRSW->>DB: write review_queues
    S->>API: GET /me/reviews/due
    API->>SRS: due(user)
    SRS-->>S: ordered cards
    loop each card
        S->>API: POST /reviews {card_id, rating}
        API->>SRS: FSRS update → new stability/difficulty/due
        SRS->>DB: append review_log, update card_state
        SRS->>LRN: ReviewLogged (evidence)
        LRN->>LRN: update mastery + retention; re-gate dependents
    end
    API-->>S: session summary + next due forecast
```

## 4. Quiz attempt → mastery update → unlock dependents

```mermaid
sequenceDiagram
    actor S as Student
    participant API
    participant ASM as assessment
    participant LRN as learning
    participant OUT as Bus
    participant NOT as notifications

    S->>API: POST /quizzes/{id}/attempts
    API->>ASM: start attempt
    loop each item
        S->>API: POST /attempts/{id}/responses
    end
    S->>API: POST /attempts/{id}/submit (Idempotency-Key)
    API->>ASM: grade attempt (deterministic)
    ASM->>OUT: AttemptGraded (per-item concept signals)
    OUT-->>LRN: evidence per concept
    LRN->>LRN: update mastery; concept crosses threshold?
    LRN->>OUT: MasteryChanged, ConceptUnlocked(c_next)
    OUT-->>NOT: notify "You unlocked Dynamic Programming"
    API-->>S: graded result + newly available concepts
```

## 5. Video ingestion → transcript → summary → cards/quiz

```mermaid
sequenceDiagram
    actor L as Lecturer
    participant API
    participant CNT as content
    participant ING as ingest worker
    participant AIW as ai worker
    participant SRS as srs

    L->>API: POST /videos {youtube_id, concept_id}
    API->>CNT: register VideoAsset
    CNT->>ING: enqueue transcript job (ingest queue)
    ING->>ING: fetch transcript (YouTube/Whisper) → segments
    ING->>CNT: store Transcript → TranscriptReady
    CNT->>AIW: enqueue embed + summary + cards + quiz
    AIW->>AIW: chunk+embed (pgvector); summary; grounded cards; quiz items
    AIW->>SRS: candidate cards (deduped)
    AIW->>CNT: ai_artifacts (summary, mindmap)
    AIW-->>API: jobs done
    L-->>API: review & publish generated assets
```

## 6. Adaptive "what next" / study plan

```mermaid
sequenceDiagram
    actor S as Student
    participant API
    participant LRN as learning
    participant KG as knowledge
    participant SRS as srs

    S->>API: GET /me/study-plan?course_id&horizon=7d
    API->>LRN: build(user, course, horizon, daily_minutes)
    LRN->>KG: course subgraph + closure (blocking power)
    LRN->>LRN: mastery vector + forgetting urgency
    LRN->>SRS: due reviews (capped)
    LRN->>LRN: score priorities, redirect to unmet prereqs, de-thrash
    LRN-->>S: interleaved plan (reviews + weak/new concepts) with reasons
```

## 7. Sign-in with tenant resolution & authorization

```mermaid
sequenceDiagram
    actor U as User
    participant BA as Better Auth
    participant API
    participant PDP as PolicyEngine
    participant DB

    U->>BA: login (email/OAuth)
    BA-->>U: session token
    U->>API: GET /courses/{id}/analytics + Bearer + X-Tenant-Id
    API->>BA: validate session
    API->>DB: load membership+role+permissions; SET app.tenant_id (RLS)
    API->>PDP: permit(analytics.course.read, resource=course)
    PDP-->>API: Permit (owns course) | Deny+audit
    API->>DB: query (RLS-scoped)
    API-->>U: analytics
```

Next: [`11-folder-structure.md`](11-folder-structure.md).
