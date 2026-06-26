---
id: TPL-003
title: Plantilla — Documento de Fase
version: 1.0.0
status: current
phase: all
owner: equipo-barberschool
last_updated: 2026-06-26
sync_with_code: n/a
---

# Fase N — [Nombre de la fase]

> Copiar a `docs/phases/PHASE_N.md`. Asignar ID DOC-04N.

```yaml
# Front-matter:
# ---
# id: DOC-04N
# title: Fase N — Nombre
# version: 1.0.0
# status: in_progress
# phase: N
# owner: equipo-barberschool
# last_updated: YYYY-MM-DD
# last_reviewed: YYYY-MM-DD
# next_review: n/a
# sync_with_code: partial
# ---
```

| Campo | Valor |
|-------|-------|
| **Fase** | N |
| **Estado** | 📋 Planificada / 🔄 En progreso / ✅ Completada |
| **Fecha inicio** | — |
| **Fecha cierre** | — |
| **% MVP** | XX% |

---

## Objetivo

[Qué se logra al completar esta fase.]

---

## Entregables

| # | Entregable | Archivo(s) | Estado |
|---|-----------|------------|--------|
| 1 | [Nombre] | `ruta/` | 📋 / 🔄 / ✅ |

---

## Criterio de done

- [ ] [Criterio verificable 1]
- [ ] CI verde
- [ ] Documentación actualizada

---

## Commits planificados

| # | Commit | Descripción |
|---|--------|-------------|
| 1 | `feat(...): ...` | ... |

---

## Decisiones tomadas

| Decisión | Detalle |
|----------|---------|
| ... | ... |

---

## Riesgos

| Riesgo | Mitigación |
|--------|------------|
| ... | ... |

---

## Siguiente fase

→ [Fase N+1](PHASE_N+1.md)

---

## Checklist al cerrar fase

- [ ] Todos los entregables ✅
- [ ] CI verde en main
- [ ] `status` → `current` en este doc
- [ ] DEVELOPMENT_PLAN.md actualizado
- [ ] REGISTRY.md y CHANGELOG.md actualizados
- [ ] sync_with_code → `aligned` en docs afectados
