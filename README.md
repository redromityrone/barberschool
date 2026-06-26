# BarberSchool

PWA para barberos que documenta cortes de cabello, guía el flujo de trabajo paso a paso y guarda fotografías en Google Drive.

## Características planificadas

- Captura de fotos por etapa del corte
- Flujos de trabajo configurables (Fade, Taper, Buzz Cut)
- Imagen de referencia con overlay y marcas guía
- Almacenamiento automático en Google Drive
- Modo offline con sincronización

## Documentación

- [Especificaciones técnicas (SPECS)](docs/SPECS.md)
- [Plan de desarrollo (PLAN)](docs/PLAN.md)

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run lint` | ESLint |
| `npm run typecheck` | Verificación TypeScript |
| `npm run test` | Tests unitarios (Vitest) |

## CI/CD

| Workflow | Trigger | Acción |
|----------|---------|--------|
| `ci.yml` | Push / PR | Lint, typecheck, test, build |
| `auto-merge.yml` | PR desde `cursor/*` | Merge automático a `main` si CI pasa |
| `scheduled.yml` | Cada 6 h | Mantenimiento de dependencias |

## Fases de desarrollo

- **Fase 0** (actual): Fundación, specs, CI/CD
- **Fase 1**: Cámara y captura de fotos
- **Fase 2**: Google Drive OAuth y subida
- **Fase 3**: Motor de flujos de trabajo
- **Fase 4**: Imagen de referencia y marcas guía
- **Fase 5**: Offline, historial y deploy

## Variables de entorno (Fase 2+)

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
NEXTAUTH_SECRET=
```
