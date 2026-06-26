---
id: DOC-000
title: Índice del Kit de Documentación
version: 1.0.0
status: current
phase: all
owner: equipo-barberschool
last_updated: 2026-06-26
last_reviewed: 2026-06-26
next_review: 2026-07-26
sync_with_code: aligned
---

# BarberSchool — Kit de Documentación

> Punto de entrada único para toda la documentación del proyecto.  
> Consulta el [Registro de documentos](REGISTRY.md) para ver el estado detallado de cada archivo.

---

## Panel de estado global

| Métrica | Valor |
|---------|-------|
| **Documentos totales** | 14 |
| **Actualizados** | 6 |
| **En progreso** | 3 |
| **Pendientes** | 5 |
| **Desactualizados** | 0 |
| **Última revisión del kit** | 2026-06-26 |
| **Fase actual del proyecto** | Fase 0 — Fundación ✅ |

### Leyenda de estados

| Icono | Estado | Significado |
|-------|--------|-------------|
| ✅ | `current` | Documento completo y alineado con el código |
| 🔄 | `in_progress` | En redacción o actualización activa |
| 📋 | `planned` | Planificado, aún no redactado |
| ⚠️ | `outdated` | Existe pero no refleja el estado actual |
| 🗄️ | `archived` | Obsoleto, conservado solo como referencia |

---

## Mapa de documentos

### 1. Gobernanza del kit

| ID | Documento | Estado | Versión |
|----|-----------|--------|---------|
| DOC-000 | [Índice del kit](README.md) | ✅ current | 1.0.0 |
| DOC-001 | [Guía del kit de documentación](DOC_KIT.md) | ✅ current | 1.0.0 |
| DOC-002 | [Registro de documentos](REGISTRY.md) | ✅ current | 1.0.0 |
| DOC-003 | [Changelog de documentación](CHANGELOG.md) | ✅ current | 1.0.0 |

### 2. Producto y planificación

| ID | Documento | Estado | Versión |
|----|-----------|--------|---------|
| DOC-010 | [Especificaciones técnicas](SPECIFICATIONS.md) | ✅ current | 1.0.0 |
| DOC-011 | [Plan de desarrollo](DEVELOPMENT_PLAN.md) | 🔄 in_progress | 1.0.0 |
| DOC-012 | [Glosario de términos](GLOSSARY.md) | ✅ current | 1.0.0 |
| DOC-013 | [Requisitos de usuario (user stories)](USER_STORIES.md) | 📋 planned | — |

### 3. Arquitectura y datos

| ID | Documento | Estado | Versión |
|----|-----------|--------|---------|
| DOC-020 | [Arquitectura del sistema](ARCHITECTURE.md) | ✅ current | 1.0.0 |
| DOC-021 | [Modelo de datos](DATA_MODEL.md) | 🔄 in_progress | 1.0.0 |
| DOC-022 | [Decisiones de arquitectura (ADR)](adr/README.md) | 📋 planned | — |

### 4. Desarrollo y operaciones

| ID | Documento | Estado | Versión |
|----|-----------|--------|---------|
| DOC-030 | [Guía de contribución](CONTRIBUTING.md) | ✅ current | 1.0.0 |
| DOC-031 | [Pipeline CI/CD](CI_CD.md) | ✅ current | 1.0.0 |
| DOC-032 | [Guía de setup local](SETUP.md) | 🔄 in_progress | 1.0.0 |
| DOC-033 | [Testing](TESTING.md) | 📋 planned | — |

### 5. Fases de implementación

| ID | Documento | Estado | Versión |
|----|-----------|--------|---------|
| DOC-040 | [Fase 0 — Fundación](phases/PHASE_0.md) | ✅ current | 1.0.0 |
| DOC-041 | [Fase 1 — Datos y storage](phases/PHASE_1.md) | 📋 planned | — |
| DOC-042 | [Fase 2 — Navegación](phases/PHASE_2.md) | 📋 planned | — |
| DOC-043 | [Fase 3 — Flujo guiado](phases/PHASE_3.md) | 📋 planned | — |
| DOC-044 | [Fase 4 — Cámara](phases/PHASE_4.md) | 📋 planned | — |
| DOC-045 | [Fase 5 — Tarjetas](phases/PHASE_5.md) | 📋 planned | — |
| DOC-046 | [Fase 6 — Release](phases/PHASE_6.md) | 📋 planned | — |

### 6. Plantillas

| ID | Documento | Estado |
|----|-----------|--------|
| TPL-001 | [Plantilla — Especificación](templates/TEMPLATE_SPEC.md) | ✅ current |
| TPL-002 | [Plantilla — ADR](templates/TEMPLATE_ADR.md) | ✅ current |
| TPL-003 | [Plantilla — Fase](templates/TEMPLATE_PHASE.md) | ✅ current |

---

## Flujo de mantenimiento

```
Cambio en código o requisito
        │
        ▼
¿Afecta documentación? ──No──► Sin acción
        │
       Sí
        ▼
Actualizar documento(s)
        │
        ▼
Actualizar front-matter (version, last_updated, sync_with_code)
        │
        ▼
Registrar en CHANGELOG.md
        │
        ▼
Actualizar REGISTRY.md
        │
        ▼
Commit: docs(<id>): descripción
```

---

## Enlaces rápidos

- Repositorio: [github.com/redromityrone/barberschool](https://github.com/redromityrone/barberschool)
- README raíz: [../README.md](../README.md)
- Workflow CI: [../.github/workflows/ci.yml](../.github/workflows/ci.yml)
