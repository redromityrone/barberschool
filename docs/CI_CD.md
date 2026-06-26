---
id: DOC-031
title: Pipeline CI/CD
version: 1.0.0
status: current
phase: 0
owner: equipo-barberschool
last_updated: 2026-06-26
last_reviewed: 2026-06-26
next_review: 2026-07-26
sync_with_code: aligned
---

# Pipeline CI/CD — BarberSchool

## 1. Resumen

Pipeline automatizado en **GitHub Actions** que valida cada push y PR antes de permitir merge a `main`.

**Archivo:** `.github/workflows/ci.yml`

---

## 2. Diagrama del pipeline

```
         ┌─────────┐
         │ Trigger │
         │push / PR│
         └────┬────┘
              │
    ┌─────────┼─────────┬──────────┐
    ▼         ▼         ▼          │
┌───────┐ ┌─────────┐ ┌──────┐    │
│ Lint  │ │TypeCheck│ │ Test │    │  (paralelo)
└───┬───┘ └────┬────┘ └──┬───┘    │
    │          │         │        │
    └──────────┼─────────┘        │
               ▼                  │
          ┌────────┐              │
          │ Build  │◄─────────────┘
          └────┬───┘
               ▼
        ┌────────────┐
        │ CI Success │ → ✅ listo para merge
        └────────────┘
```

---

## 3. Jobs

| Job | Comando | Node | Bloquea merge |
|-----|---------|------|---------------|
| **Lint** | `npm run lint` | 20 | Sí |
| **TypeCheck** | `npm run typecheck` | 20 | Sí |
| **Tests** | `npm run test -- --ci --coverage` | 20 | Sí |
| **Build** | `npm run build` | 20 | Sí (requiere lint+test) |
| **CI Success** | Verifica todos los anteriores | 20 | Gate final |

---

## 4. Triggers

```yaml
on:
  push:
    branches: [main, 'cursor/**']
  pull_request:
    branches: [main]
```

- Se ejecuta en **cada push** a `main` o ramas `cursor/**`
- Se ejecuta en **cada PR** hacia `main`
- `concurrency` cancela runs anteriores del mismo ref

---

## 5. Política de merge

| Regla | Detalle |
|-------|---------|
| CI obligatorio | Todos los jobs deben pasar |
| Rama protegida | `main` solo recibe merges con CI verde |
| Sin force push | No hacer force push a `main` |
| Commits incrementales | Preferir commits atómicos por funcionalidad |

---

## 6. Ejecución local (replica CI)

```bash
npm ci
npm run lint
npm run typecheck
npm run test -- --ci --coverage
npm run build
```

---

## 7. Evolución planificada

| Fase | Mejora CI |
|------|-----------|
| 1 | Añadir test de schema SQLite |
| 4 | Mock de expo-camera en tests |
| 6 | EAS Build en pipeline para APK/IPA |
| Futuro | Deploy web automático a preview |

---

## 8. Troubleshooting

| Error | Solución |
|-------|----------|
| `lint` falla | `npm run lint` local, corregir y re-push |
| `typecheck` falla | `npm run typecheck`, revisar tipos |
| `test` falla | `npm run test`, revisar tests rotos |
| `build` falla | `npm run build`, verificar deps Expo |
| `npm ci` falla | Verificar `package-lock.json` commiteado |

---

## 9. Referencias

- Workflow: `.github/workflows/ci.yml`
- [Contribución](CONTRIBUTING.md)
- [Setup](SETUP.md)
