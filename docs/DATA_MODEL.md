---
id: DOC-021
title: Modelo de Datos
version: 1.0.0
status: in_progress
phase: 0
owner: equipo-barberschool
last_updated: 2026-06-26
last_reviewed: 2026-06-26
next_review: 2026-07-10
sync_with_code: partial
---

# Modelo de Datos — BarberSchool

> **Sync:** `partial` — Tipos TypeScript implementados en `src/types/`; schema SQLite planificado para Fase 1.

---

## 1. Diagrama entidad-relación

```
┌─────────────────┐       ┌─────────────────┐
│  HaircutType    │       │    FlowStep     │
│─────────────────│       │─────────────────│
│ id (PK)         │──1:N──│ flowId (FK)     │
│ name            │       │ id (PK)         │
│ description     │       │ order           │
│ referenceImage  │       │ title           │
│ flowId          │       │ description     │
└────────┬────────┘       └─────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐       ┌─────────────────┐
│ DecisionCard    │       │ HaircutSession  │
│─────────────────│       │─────────────────│
│ id (PK)         │       │ id (PK)         │
│ haircutTypeId   │──┐    │ haircutTypeId   │
│ question        │  │    │ startedAt       │
│ hint            │  │    │ completedAt     │
│ order           │  │    │ status          │
└────────┬────────┘  │    │ notes           │
         │             │    └────────┬────────┘
         │             │             │
         │             └──────1:N──────┤
         │                           │
         │              ┌────────────┼────────────┐
         │              │            │            │
         │              ▼            ▼            ▼
         │     ┌────────────┐ ┌───────────┐ ┌────────────┐
         └────►│CardResponse│ │   Photo   │ │ (progress) │
               │────────────│ │───────────│ │            │
               │ id (PK)    │ │ id (PK)   │ └────────────┘
               │ sessionId  │ │ sessionId │
               │ cardId     │ │ filePath  │
               │ answer     │ │ takenAt   │
               │ answeredAt │ │ label     │
               └────────────┘ └───────────┘
```

---

## 2. Tipos TypeScript (implementados)

Ubicación: `src/types/index.ts`

| Tipo | Campos | Estado |
|------|--------|--------|
| `HaircutSession` | id, haircutTypeId, startedAt, completedAt?, notes?, status | ✅ Definido |
| `Photo` | id, sessionId, filePath, takenAt, label? | ✅ Definido |
| `HaircutType` | id, name, description, referenceImagePath, flowId | ✅ Definido |
| `FlowStep` | id, flowId, order, title, description, estimatedMinutes? | ✅ Definido |
| `DecisionCard` | id, haircutTypeId, question, hint?, order | ✅ Definido |
| `CardResponse` | id, sessionId, cardId, answer, answeredAt | ✅ Definido |

### Enums

| Tipo | Valores |
|------|---------|
| `SessionStatus` | `in_progress`, `completed`, `cancelled` |
| `PhotoLabel` | `before`, `during`, `after` |
| `CardAnswer` | `yes`, `no`, `partial` |

---

## 3. Datos predefinidos (implementados)

Ubicación: `src/data/haircutTypes.ts`

| Dataset | Cantidad | Estado |
|---------|----------|--------|
| Tipos de corte | 5 | ✅ |
| Pasos (fade-low completo) | 8 | ✅ |
| Tarjetas (fade-low completo) | 5 | ✅ |
| Pasos (otros tipos) | 8 c/u (generados) | ✅ |
| Tarjetas (otros tipos) | 5 c/u (generadas) | ✅ |

---

## 4. Schema SQLite (planificado — Fase 1)

```sql
-- Versión 1
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  haircut_type_id TEXT NOT NULL,
  started_at TEXT NOT NULL,
  completed_at TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'in_progress'
);

CREATE TABLE IF NOT EXISTS photos (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  file_path TEXT NOT NULL,
  taken_at TEXT NOT NULL,
  label TEXT,
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS card_responses (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  card_id TEXT NOT NULL,
  answer TEXT NOT NULL,
  answered_at TEXT NOT NULL,
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS flow_progress (
  session_id TEXT NOT NULL,
  step_id TEXT NOT NULL,
  completed_at TEXT NOT NULL,
  PRIMARY KEY (session_id, step_id),
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS schema_version (
  version INTEGER PRIMARY KEY
);
```

**Nota:** `HaircutType`, `FlowStep` y `DecisionCard` son datos estáticos bundled en `src/data/` (no en SQLite) porque no cambian en runtime en el MVP.

---

## 5. Almacenamiento de archivos

| Tipo | Ruta | Formato |
|------|------|---------|
| Fotos de sesión | `{documentDirectory}/photos/{sessionId}/{photoId}.jpg` | JPEG 80%, max 1920px |
| Imágenes referencia | `assets/images/{haircutTypeId}.png` | PNG bundled |
| Iconos app | `assets/icon.png`, etc. | PNG |

---

## 6. Estado de implementación

| Componente | Código | Documentación | Fase |
|------------|--------|---------------|------|
| TypeScript types | ✅ `src/types/index.ts` | ✅ Este doc | 0 |
| Datos bundled | ✅ `src/data/haircutTypes.ts` | ✅ Este doc | 0 |
| SQLite schema | ❌ Pendiente | ✅ Definido aquí | 1 |
| Migraciones | ❌ Pendiente | ✅ Definido aquí | 1 |
| StorageService | ❌ Pendiente | 📋 Fase 1 | 1 |
| PhotoService | ❌ Pendiente | 📋 Fase 1 | 1 |

---

## 7. Referencias

- Código tipos: `src/types/index.ts`
- Código datos: `src/data/haircutTypes.ts`
- [Arquitectura](ARCHITECTURE.md)
- [Fase 1](phases/PHASE_1.md) (planificado)
