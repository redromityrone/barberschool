---
id: DOC-040
title: Fase 0 — Fundación
version: 1.0.0
status: current
phase: 0
owner: equipo-barberschool
last_updated: 2026-06-26
last_reviewed: 2026-06-26
next_review: n/a
sync_with_code: aligned
---

# Fase 0 — Fundación

| Campo | Valor |
|-------|-------|
| **Fase** | 0 |
| **Estado** | ✅ Completada |
| **Fecha inicio** | 2026-06-26 |
| **Fecha cierre** | 2026-06-26 |
| **% MVP** | 10% |

---

## Objetivo

Repositorio listo con CI/CD, scaffold Expo, documentación completa y pipeline verde.

---

## Entregables

| # | Entregable | Archivo(s) | Estado |
|---|-----------|------------|--------|
| 1 | Especificaciones técnicas | `docs/SPECIFICATIONS.md` | ✅ |
| 2 | Plan de desarrollo | `docs/DEVELOPMENT_PLAN.md` | ✅ |
| 3 | Kit de documentación | `docs/README.md`, `DOC_KIT.md`, `REGISTRY.md` | ✅ |
| 4 | Scaffold Expo + TypeScript | `package.json`, `app/`, `src/` | ✅ |
| 5 | Pipeline CI/CD | `.github/workflows/ci.yml` | ✅ |
| 6 | README actualizado | `README.md` | ✅ |
| 7 | Config lint/test | `.eslintrc.js`, `jest.config.js` | ✅ |
| 8 | Datos predefinidos | `src/data/haircutTypes.ts` | ✅ |
| 9 | Tests iniciales | `src/data/__tests__/` | ✅ |
| 10 | Pantallas base | Home, History, Settings, New Session | ✅ |

---

## Criterio de done

- [x] `npm run lint` pasa
- [x] `npm run typecheck` pasa
- [x] `npm run test -- --ci` pasa (4 tests)
- [x] `npm run build` pasa
- [x] CI verde en GitHub Actions
- [x] Documentación del kit creada y registrada

---

## Commits realizados

| # | Commit | Descripción |
|---|--------|-------------|
| 1 | `docs: add specifications and development plan` | Specs + plan |
| 2 | `chore: scaffold expo project with typescript` | Proyecto Expo |
| 3 | `ci: add github actions pipeline` | CI/CD |
| 4 | `docs: update README with setup and CI instructions` | README |

---

## Pantallas implementadas

| Pantalla | Ruta | Funcionalidad |
|----------|------|---------------|
| Home | `/(tabs)/index` | Lista 5 tipos de corte, botón iniciar |
| Historial | `/(tabs)/history` | Empty state (sesiones en Fase 1) |
| Ajustes | `/(tabs)/settings` | Toggle modo oscuro, versión |
| Nueva sesión | `/session/new` | Placeholder para flujo completo |

---

## Decisiones tomadas

| Decisión | Detalle |
|----------|---------|
| Expo SDK 52 | Última versión estable al inicio del proyecto |
| Offline-first | Sin backend en MVP |
| React Native Paper | UI Material Design |
| GitHub Actions | CI en cada push/PR |

---

## Riesgos y lecciones

| Item | Detalle |
|------|---------|
| Peer deps | `react-test-renderer@18.3.1` necesario para Jest |
| expo-asset | Requerido para build; instalado con `npx expo install` |
| Fase 0 scope | Docs kit añadido como extensión natural de la fase |

---

## Siguiente fase

→ [Fase 1 — Datos y storage](PHASE_1.md) (planificado)

- SQLite schema + migraciones
- StorageService + PhotoService
- Datos seed en DB
- Tests de persistencia

---

## Referencias

- [Plan de desarrollo](../DEVELOPMENT_PLAN.md)
- [Arquitectura](../ARCHITECTURE.md)
- [Registro de documentos](../REGISTRY.md)
