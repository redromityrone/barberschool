---
id: DOC-003
title: Changelog de Documentación
version: 1.0.0
status: current
phase: all
owner: equipo-barberschool
last_updated: 2026-06-26
last_reviewed: 2026-06-26
next_review: 2026-07-26
sync_with_code: n/a
---

# Changelog de Documentación

Todos los cambios relevantes en la documentación del proyecto se registran aquí.  
Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).

---

## [1.1.0] — 2026-06-26

### Añadido

- **DOC-015** — `docs/UI_PREVIEW.md`: Vista detallada de interfaz (auto-generado)
- **DOC-034** — `docs/SCREENSHOTS.md`: Documentación del workflow de capturas
- `.github/workflows/screenshots.yml`: Pipeline Playwright para capturas UI
- `scripts/capture-screenshots.mjs`: Script de captura con Playwright
- `scripts/update-readme-screenshots.mjs`: Actualización automática del README
- `docs/screenshots/`: Galería PNG + manifest.json

### Cambiado

- **DOC-900** — README.md: Sección "Interfaz de la app" con galería embebida (v1.0.1)
- **DOC-031** — CI_CD.md: Documentado workflow de screenshots

---

## [1.0.0] — 2026-06-26

### Añadido

- **DOC-000** — `docs/README.md`: Índice maestro del kit con panel de estado global
- **DOC-001** — `docs/DOC_KIT.md`: Guía completa del kit (convenciones, front-matter, ciclo de vida)
- **DOC-002** — `docs/REGISTRY.md`: Registro detallado de los 22 documentos del proyecto
- **DOC-003** — `docs/CHANGELOG.md`: Este archivo
- **DOC-010** — `docs/SPECIFICATIONS.md`: Especificaciones técnicas MVP (creado en commit anterior)
- **DOC-011** — `docs/DEVELOPMENT_PLAN.md`: Plan de 6 fases (creado en commit anterior)
- **DOC-012** — `docs/GLOSSARY.md`: Glosario de términos del dominio barbería
- **DOC-020** — `docs/ARCHITECTURE.md`: Arquitectura del sistema con diagramas
- **DOC-021** — `docs/DATA_MODEL.md`: Modelo de datos TypeScript y SQLite planificado
- **DOC-030** — `docs/CONTRIBUTING.md`: Guía de contribución y convenciones
- **DOC-031** — `docs/CI_CD.md`: Documentación del pipeline GitHub Actions
- **DOC-032** — `docs/SETUP.md`: Guía de instalación y desarrollo local
- **DOC-040** — `docs/phases/PHASE_0.md`: Documento detallado de Fase 0 completada
- **TPL-001** — `docs/templates/TEMPLATE_SPEC.md`: Plantilla para especificaciones
- **TPL-002** — `docs/templates/TEMPLATE_ADR.md`: Plantilla para ADRs
- **TPL-003** — `docs/templates/TEMPLATE_PHASE.md`: Plantilla para documentos de fase
- Front-matter YAML añadido a SPECIFICATIONS.md y DEVELOPMENT_PLAN.md

### Cambiado

- **DOC-011** — DEVELOPMENT_PLAN.md: Fase 0 marcada como completada (v1.0.0 → v1.0.1)
- **DOC-900** — README.md raíz: enlace al kit de documentación

### Planificado (sin contenido aún)

- DOC-013 USER_STORIES.md
- DOC-022 adr/README.md
- DOC-033 TESTING.md
- DOC-041 a DOC-046 phases/PHASE_1–6.md

---

## Formato de entradas futuras

```markdown
## [X.Y.Z] — YYYY-MM-DD

### Añadido
- **DOC-XXX** — descripción del cambio

### Cambiado
- **DOC-XXX** — descripción

### Deprecado
- **DOC-XXX** — descripción

### Eliminado
- **DOC-XXX** — descripción (movido a archived)
```
