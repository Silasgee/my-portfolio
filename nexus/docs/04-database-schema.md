# 04 — Database Schema

PostgreSQL 16 is the system of record, with the `pgvector` extension for embeddings.
Tables are grouped by bounded context (Postgres **schemas**) to keep boundaries explicit:
`iam`, `institution`, `knowledge`, `content`, `assessment`, `learning`, `srs`, `ai`,
`analytics`, `billing`, `platform`.

## 0. Conventions

- **PK:** `id UUID PRIMARY KEY DEFAULT gen_random_uuid()` (UUIDv7 preferred for locality).
- **Tenancy:** every tenant-scoped table has `tenant_id UUID NOT NULL` + Postgres **RLS**
  policy `tenant_id = current_setting('app.tenant_id')::uuid`.
- **Audit:** `created_at`, `updated_at timestamptz NOT NULL DEFAULT now()`;
  `created_by`, `updated_by UUID`; soft delete via `deleted_at timestamptz NULL`.
- **Enums:** Postgres `ENUM` types for stable domains; lookup tables where values evolve.
- **Money:** `numeric(19,4)` + ISO currency; **time:** `timestamptz` (UTC) everywhere.
- **JSON:** `jsonb` for flexible/semi-structured payloads (objectives, snapshots, metadata).
- **Naming:** snake_case, plural tables, FK `<entity>_id`.

## 1. IAM (`iam`)

```mermaid
erDiagram
    tenants ||--o{ memberships : has
    users ||--o{ memberships : has
    tenants ||--o{ roles : defines
    roles ||--o{ role_permissions : grants
    memberships }o--|| roles : assigned
    users ||--o{ sessions : owns
    tenants ||--o{ audit_logs : records

    tenants {
        uuid id PK
        string slug UK
        string name
        enum type "university|academy|corporate|personal"
        enum status
        jsonb settings
        timestamptz created_at
    }
    users {
        uuid id PK
        string email UK
        string full_name
        string avatar_url
        string locale
        string timezone
        boolean email_verified
        timestamptz created_at
    }
    memberships {
        uuid id PK
        uuid tenant_id FK
        uuid user_id FK
        uuid role_id FK
        enum status "active|invited|suspended"
        timestamptz created_at
    }
    roles {
        uuid id PK
        uuid tenant_id FK
        string key "student|lecturer|admin|owner|custom"
        string name
        boolean is_system
    }
    permissions {
        uuid id PK
        string key UK "concept.write, course.manage, ..."
        string description
    }
    role_permissions {
        uuid role_id FK
        uuid permission_id FK
    }
    sessions {
        uuid id PK
        uuid user_id FK
        uuid tenant_id FK
        string token_hash
        string ip
        string user_agent
        timestamptz expires_at
        timestamptz revoked_at
    }
    audit_logs {
        uuid id PK
        uuid tenant_id FK
        uuid actor_id FK
        string action
        string resource_type
        uuid resource_id
        jsonb metadata
        string ip
        timestamptz created_at
    }
```

## 2. Institution (`institution`)

```mermaid
erDiagram
    universities ||--o{ departments : has
    departments ||--o{ programs : offers
    programs ||--o{ program_levels : has
    program_levels ||--o{ semesters : has
    semesters ||--o{ courses : contains
    courses ||--o{ course_concepts : maps
    courses ||--o{ enrollments : has
    courses ||--o{ course_instructors : taught_by

    universities {
        uuid id PK
        uuid tenant_id FK
        string name
        string short_name
        string country
        jsonb metadata
    }
    departments {
        uuid id PK
        uuid tenant_id FK
        uuid university_id FK
        string name
        string code
    }
    programs {
        uuid id PK
        uuid tenant_id FK
        uuid department_id FK
        string name
        enum degree_type "bsc|msc|diploma|cert|track"
        int duration_years
    }
    program_levels {
        uuid id PK
        uuid program_id FK
        int level "100|200|...|corporate tiers"
        string name
    }
    semesters {
        uuid id PK
        uuid program_level_id FK
        string name "First|Second|Q1..."
        int ordinal
    }
    courses {
        uuid id PK
        uuid tenant_id FK
        uuid semester_id FK
        string code "CSC301"
        string title "Data Structures"
        int credit_units
        text description
        enum status "draft|published|archived"
    }
    course_concepts {
        uuid id PK
        uuid course_id FK
        uuid concept_id "FK -> knowledge.concepts"
        int ordinal
        boolean is_core
    }
    enrollments {
        uuid id PK
        uuid tenant_id FK
        uuid course_id FK
        uuid user_id FK
        enum role "student|auditor"
        enum status "active|completed|dropped"
        timestamptz enrolled_at
    }
    course_instructors {
        uuid course_id FK
        uuid user_id FK
        enum role "owner|co_instructor|ta"
    }
```

## 3. Knowledge Graph (`knowledge`)

```mermaid
erDiagram
    concepts ||--o{ concept_edges : from
    concepts ||--o{ concept_versions : versioned
    concepts ||--o{ concept_tags : tagged
    tags ||--o{ concept_tags : on
    taxonomies ||--o{ tags : groups

    concepts {
        uuid id PK
        uuid tenant_id FK "null = shared library"
        string title
        text description
        jsonb learning_objectives
        enum difficulty "intro|easy|medium|hard|expert"
        int estimated_minutes
        enum bloom_level "remember|understand|apply|analyze|evaluate|create"
        int mastery_threshold "default 80"
        enum status "draft|published|deprecated"
        uuid current_version_id FK
        tsvector search_vector
        timestamptz created_at
    }
    concept_edges {
        uuid id PK
        uuid tenant_id FK
        uuid from_concept_id FK
        uuid to_concept_id FK
        enum type "prerequisite|related|part_of|leads_to"
        float weight "0..1 strength"
        UK from_to_type
    }
    concept_versions {
        uuid id PK
        uuid concept_id FK
        int version
        jsonb snapshot
        uuid published_by
        timestamptz published_at
    }
    tags {
        uuid id PK
        uuid tenant_id FK
        uuid taxonomy_id FK
        string key
        string label
    }
    taxonomies {
        uuid id PK
        uuid tenant_id FK
        string name "Marble Open Taxonomy aligned"
        string external_ref
    }
    concept_tags {
        uuid concept_id FK
        uuid tag_id FK
    }
```

**Cycle prevention:** `prerequisite`/`leads_to` edges are validated against the transitive
closure before insert (recursive CTE); a materialized `concept_closure(ancestor_id,
descendant_id, depth)` table (refreshed on edge change) accelerates gating and path queries.

## 4. Content & Resources (`content`)

```mermaid
erDiagram
    resources ||--o| video_assets : may_be
    resources ||--o| media_objects : may_reference
    video_assets ||--o{ transcripts : has
    video_assets ||--o{ video_progress : watched
    resources ||--o{ ai_artifacts : generated_from
    resources }o--|| concept_ref : attached_to

    resources {
        uuid id PK
        uuid tenant_id FK
        uuid concept_id "FK -> knowledge.concepts"
        enum type "note|pdf|video|example|misconception|reference|link"
        string title
        jsonb body "markdown / structured"
        uuid author_id
        enum visibility "private|course|tenant|public"
        enum status "draft|published"
        tsvector search_vector
        timestamptz created_at
    }
    media_objects {
        uuid id PK
        uuid tenant_id FK
        string r2_key
        string content_type
        bigint size_bytes
        string checksum
        enum status "uploading|ready|failed"
    }
    video_assets {
        uuid id PK
        uuid tenant_id FK
        uuid resource_id FK
        string youtube_id
        int duration_seconds
        jsonb chapters
    }
    transcripts {
        uuid id PK
        uuid video_asset_id FK
        string language
        jsonb segments "[{start,end,text}]"
        enum source "youtube|whisper|manual"
    }
    video_progress {
        uuid id PK
        uuid tenant_id FK
        uuid user_id FK
        uuid video_asset_id FK
        int last_position_seconds
        float watched_percent
        boolean completed
        timestamptz updated_at
    }
    ai_artifacts {
        uuid id PK
        uuid tenant_id FK
        uuid concept_id
        uuid source_resource_id FK
        enum kind "explanation|summary|mindmap|flashcards|quiz|plan"
        jsonb content
        string model
        uuid generated_by
        timestamptz created_at
    }
```

## 5. Assessment (`assessment`)

```mermaid
erDiagram
    quizzes ||--o{ quiz_items : contains
    item_banks ||--o{ items : holds
    items ||--o{ item_concepts : assesses
    quiz_items }o--|| items : references
    quizzes ||--o{ attempts : taken
    attempts ||--o{ responses : has
    exams ||--o{ exam_sections : has

    quizzes {
        uuid id PK
        uuid tenant_id FK
        uuid course_id
        string title
        enum type "practice|graded|diagnostic|exam"
        int time_limit_seconds
        jsonb settings
        enum status "draft|published"
    }
    items {
        uuid id PK
        uuid tenant_id FK
        uuid item_bank_id FK
        enum kind "mcq|multi|short|numeric|cloze|code"
        jsonb prompt
        jsonb choices
        jsonb answer_key
        enum difficulty
        jsonb rubric
        text explanation
    }
    item_concepts {
        uuid item_id FK
        uuid concept_id
        float weight
    }
    item_banks {
        uuid id PK
        uuid tenant_id FK
        string name
        uuid course_id
    }
    quiz_items {
        uuid quiz_id FK
        uuid item_id FK
        int ordinal
        float points
    }
    attempts {
        uuid id PK
        uuid tenant_id FK
        uuid quiz_id FK
        uuid user_id FK
        enum status "in_progress|submitted|graded"
        float score
        float max_score
        timestamptz started_at
        timestamptz submitted_at
    }
    responses {
        uuid id PK
        uuid attempt_id FK
        uuid item_id FK
        jsonb answer
        boolean is_correct
        float awarded_points
        int time_spent_seconds
    }
    exams {
        uuid id PK
        uuid tenant_id FK
        uuid course_id
        string title
        timestamptz scheduled_at
    }
    past_questions {
        uuid id PK
        uuid tenant_id FK
        uuid course_id
        int year
        jsonb content
        uuid concept_id
    }
```

## 6. Learning Engine (`learning`)

```mermaid
erDiagram
    learner_concept_state }o--|| concept_ref : for
    study_sessions ||--o{ evidence_events : contains
    learning_paths ||--o{ learning_path_nodes : ordered

    learner_concept_state {
        uuid id PK
        uuid tenant_id FK
        uuid user_id FK
        uuid concept_id
        float mastery "0..100"
        float confidence "0..1"
        enum status "locked|available|in_progress|mastered"
        float retention_estimate
        int evidence_count
        timestamptz last_evidence_at
        timestamptz mastered_at
        UK user_concept
    }
    study_sessions {
        uuid id PK
        uuid tenant_id FK
        uuid user_id FK
        uuid course_id
        enum kind "study|review|quiz|ai|video"
        int duration_seconds
        timestamptz started_at
        timestamptz ended_at
    }
    evidence_events {
        uuid id PK
        uuid tenant_id FK
        uuid user_id FK
        uuid concept_id
        uuid session_id FK
        enum source "quiz|review|video|ai|reading|self_report"
        uuid source_ref_id
        float signal "normalized 0..1"
        float weight
        timestamptz occurred_at
    }
    learning_paths {
        uuid id PK
        uuid tenant_id FK
        uuid user_id FK
        uuid course_id
        enum goal "course_master|exam_ready|custom"
        timestamptz computed_at
    }
    learning_path_nodes {
        uuid id PK
        uuid path_id FK
        uuid concept_id
        int ordinal
        enum reason "weak|forgotten|next_unlock|prereq_gap"
        float priority
    }
```

`evidence_events` is **append-only** and the source of truth; `learner_concept_state` is a
derived projection updated on each event (and reconcilable by replay).

## 7. Spaced Repetition (`srs`)

```mermaid
erDiagram
    decks ||--o{ cards : contains
    cards ||--|| card_states : has
    cards ||--o{ review_logs : reviewed

    cards {
        uuid id PK
        uuid tenant_id FK
        uuid user_id FK
        uuid concept_id
        uuid source_resource_id
        enum origin "manual|ai_note|ai_video|imported"
        jsonb front
        jsonb back
        enum status "new|learning|review|suspended"
        timestamptz created_at
    }
    card_states {
        uuid card_id PK, FK
        float stability
        float difficulty
        float retrievability
        int reps
        int lapses
        enum algo "fsrs|sm2"
        timestamptz due_at
        timestamptz last_reviewed_at
    }
    review_logs {
        uuid id PK
        uuid tenant_id FK
        uuid card_id FK
        uuid user_id FK
        enum rating "again|hard|good|easy"
        float pre_stability
        float post_stability
        int elapsed_seconds
        int scheduled_days
        timestamptz reviewed_at
    }
    decks {
        uuid id PK
        uuid tenant_id FK
        uuid user_id FK
        uuid course_id
        string name
    }
    review_queues {
        uuid id PK
        uuid tenant_id FK
        uuid user_id FK
        date queue_date
        jsonb card_ids "ordered, precomputed"
        int target_count
    }
```

## 8. AI (`ai`)

```mermaid
erDiagram
    conversations ||--o{ messages : has
    messages ||--o{ retrieval_contexts : grounded_by
    embeddings }o--|| source_ref : indexes

    conversations {
        uuid id PK
        uuid tenant_id FK
        uuid user_id FK
        uuid course_id
        uuid focus_concept_id
        string title
        timestamptz created_at
    }
    messages {
        uuid id PK
        uuid conversation_id FK
        enum role "user|assistant|system|tool"
        text content
        jsonb tool_calls
        string model
        int prompt_tokens
        int completion_tokens
        timestamptz created_at
    }
    retrieval_contexts {
        uuid id PK
        uuid message_id FK
        uuid source_type "resource|transcript|concept"
        uuid source_id
        float score
        text snippet
    }
    embeddings {
        uuid id PK
        uuid tenant_id FK
        enum source_type "resource|transcript_segment|concept|item"
        uuid source_id
        string model
        int dim
        vector embedding "pgvector"
        jsonb metadata
    }
    ai_jobs {
        uuid id PK
        uuid tenant_id FK
        enum kind "explain|quiz|cards|summary|mindmap|plan|embed"
        enum status "queued|running|done|failed"
        jsonb input
        jsonb output
        string model
        int tokens
        timestamptz created_at
    }
```

`embeddings.embedding` uses `vector(1536)` (model-dependent) with an **HNSW** index:
`CREATE INDEX ON ai.embeddings USING hnsw (embedding vector_cosine_ops)`. Partitioned by
`tenant_id` at scale; Qdrant is the escape hatch when vector QPS dominates.

## 9. Analytics (`analytics`), Notifications, Billing (`billing`)

```mermaid
erDiagram
    events ||--o{ predictions : feeds
    users ||--o{ achievements : earns
    tenants ||--o{ subscriptions : has
    subscriptions ||--o{ usage_records : meters

    events {
        uuid id PK
        uuid tenant_id FK
        uuid user_id
        string type
        jsonb payload
        string trace_id
        timestamptz occurred_at
    }
    predictions {
        uuid id PK
        uuid tenant_id FK
        uuid user_id
        uuid course_id
        enum kind "exam_readiness|failure_risk|churn|time_to_master"
        float value
        jsonb features
        timestamptz computed_at
    }
    achievements {
        uuid id PK
        uuid tenant_id FK
        uuid user_id
        string key
        jsonb metadata
        timestamptz earned_at
    }
    notifications {
        uuid id PK
        uuid tenant_id FK
        uuid user_id
        enum channel "email|push|in_app"
        string template
        jsonb data
        enum status "pending|sent|read|failed"
        timestamptz created_at
    }
    subscriptions {
        uuid id PK
        uuid tenant_id FK
        uuid plan_id
        enum status "trialing|active|past_due|canceled"
        timestamptz current_period_end
    }
    plans {
        uuid id PK
        string key
        numeric price
        jsonb entitlements
        jsonb feature_flags
    }
    usage_records {
        uuid id PK
        uuid tenant_id FK
        enum metric "ai_tokens|storage_bytes|seats"
        numeric quantity
        timestamptz window_start
    }
    feature_flags {
        uuid id PK
        uuid tenant_id FK
        string key
        boolean enabled
        jsonb conditions
    }
```

`analytics.events` and `learning.evidence_events` are **time-partitioned** (monthly) with a
BRIN index on `occurred_at`; cold partitions are compressed/archived.

## 10. Indexing & Performance Summary

| Concern | Strategy |
| --- | --- |
| Tenant isolation | RLS on every scoped table; composite indexes lead with `tenant_id` |
| Graph traversal | `concept_closure` materialized table; recursive CTE fallback |
| Mastery lookups | Unique `(user_id, concept_id)` on `learner_concept_state`; covering index for status |
| Review queue | `(user_id, due_at)` partial index `WHERE status IN ('review','learning')` |
| Search | `tsvector` GIN indexes + pgvector HNSW; hybrid rank in `search` module |
| Hot append tables | Monthly partitions + BRIN on `events`, `evidence_events`, `review_logs` |
| Connection scale | PgBouncer (transaction pooling); read replicas for analytics/search |
| Large media | Never in DB — R2 with `media_objects` metadata + signed URLs |

## 11. Migrations

Alembic, forward-only, one migration per PR, reviewed. Destructive changes are two-phase
(expand → migrate data → contract). Every migration is tested against a seeded database in CI.

Next: [`05-api-design.md`](05-api-design.md).
