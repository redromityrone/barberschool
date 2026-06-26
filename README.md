# BarberSchool

![CI](https://github.com/redromityrone/barberschool/actions/workflows/ci.yml/badge.svg)

Herramienta PWA para barberos: flujo guiado de cortes, captura de fotos en Google Drive y deck de referencia visual.

## Características

- **Flujo guiado**: paso a paso con checklist para cada tipo de corte
- **Deck de referencia**: tarjetas visuales por categoría (ángulos, guardas, técnicas)
- **Fotos en Drive**: captura y almacenamiento automático (Fase 2)
- **PWA**: instalable en dispositivos móviles (Fase 3)

## Documentación

| Documento | Descripción |
|-----------|-------------|
| [docs/SPECS.md](docs/SPECS.md) | Especificaciones completas de desarrollo |
| [docs/USER-FLOWS.md](docs/USER-FLOWS.md) | Flujos de usuario y diagramas |
| [docs/CI-CD.md](docs/CI-CD.md) | Pipeline CI/CD |

## Desarrollo local

```bash
npm install
npm run dev
```

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run lint` | ESLint |
| `npm run typecheck` | Verificación de tipos |
| `npm run test` | Tests unitarios |
| `npm run ci` | Pipeline completo (lint + typecheck + test + build) |

## CI/CD

- **CI**: lint, test y build en cada push/PR
- **CD**: deploy automático a GitHub Pages al mergear en `main`
- **Scheduled**: validación cada 6 horas en `main`

## Fases de implementación

- [x] Fase 0: Specs + CI/CD + scaffold
- [ ] Fase 1: MVP Core (flujo, deck, navegación)
- [ ] Fase 2: Cámara + Google Drive
- [ ] Fase 3: PWA + optimización

## Stack

React 19 · TypeScript · Vite 6 · Zustand · Vitest · GitHub Actions
