# BarberSchool

Aplicación móvil para barberos que permite capturar fotos de cortes, seguir flujos guiados paso a paso y consultar imágenes de referencia con tarjetas de decisión.

## Interfaz de la app

<!-- SCREENSHOTS:START -->
> Capturas generadas automáticamente el **2026-07-06** desde la build web (viewport 390×844).

| Pantalla | Ruta | Descripción |
|----------|------|-------------|
| Inicio | `/` | Selección del tipo de corte a realizar |
| Historial | `/history` | Registro de sesiones de corte anteriores |
| Ajustes | `/settings` | Configuración de la aplicación |
| Nueva sesión | `/session/new` | Inicio de una nueva sesión de corte |

## Galería de interfaz

### Inicio

Selección del tipo de corte a realizar

<img src="docs/screenshots/home.png" alt="Inicio — BarberSchool" width="280" />

### Historial

Registro de sesiones de corte anteriores

<img src="docs/screenshots/history.png" alt="Historial — BarberSchool" width="280" />

### Ajustes

Configuración de la aplicación

<img src="docs/screenshots/settings.png" alt="Ajustes — BarberSchool" width="280" />

### Nueva sesión

Inicio de una nueva sesión de corte

<img src="docs/screenshots/new-session.png" alt="Nueva sesión — BarberSchool" width="280" />

📎 Vista detallada: [docs/UI_PREVIEW.md](docs/UI_PREVIEW.md)

<!-- SCREENSHOTS:END -->

## Características (MVP)

- **Flujos guiados** — Pasos ordenados para cada tipo de corte (fade, taper, buzz cut, etc.)
- **Captura de fotos** — Guardado local en el dispositivo (offline-first)
- **Imágenes de referencia** — Consulta visual del corte objetivo
- **Tarjetas de decisión** — Autoevaluación con criterios antes de finalizar
- **Historial** — Registro de sesiones pasadas

## Stack

| Tecnología | Uso |
|------------|-----|
| Expo SDK 52 | Framework móvil |
| TypeScript | Tipado estático |
| Expo Router | Navegación file-based |
| Zustand | Estado global |
| SQLite + FileSystem | Persistencia local |
| React Native Paper | UI components |
| GitHub Actions | CI/CD |

## Documentación

- **[Kit de documentación](docs/README.md)** — Índice maestro con estado de cada documento
- [Registro de documentos](docs/REGISTRY.md) — Estado detallado: actualizado / en progreso / pendiente
- [Especificaciones técnicas](docs/SPECIFICATIONS.md)
- [Plan de desarrollo](docs/DEVELOPMENT_PLAN.md)
- [Arquitectura](docs/ARCHITECTURE.md) | [Modelo de datos](docs/DATA_MODEL.md) | [CI/CD](docs/CI_CD.md)

## Requisitos

- Node.js 20+
- npm 10+
- Expo Go (para desarrollo en dispositivo)

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm start          # Iniciar Expo dev server
npm run android    # Abrir en Android
npm run ios        # Abrir en iOS
npm run web        # Abrir en navegador
```

## Calidad de código

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run test       # Jest
npm run build      # Export web build
```

## CI/CD

Cada push y PR ejecuta el pipeline en `.github/workflows/ci.yml`:

```
Lint → TypeCheck → Tests → Build
```

### Capturas de pantalla automáticas

El workflow `screenshots.yml` genera capturas de la UI y actualiza el README en `main`:

```
Build web → Playwright → README + docs/UI_PREVIEW.md
```

- **Manual:** Actions → Screenshots → Run workflow
- **Automático:** push a `main` con cambios UI, o cada lunes
- **PRs:** sube artifact descargable sin commit

Ver [docs/SCREENSHOTS.md](docs/SCREENSHOTS.md) para detalles.

Solo se hace merge a `main` cuando todos los checks pasan.

## Fases de desarrollo

| Fase | Estado | Descripción |
|------|--------|-------------|
| 0 | ✅ | Fundación, CI/CD, scaffold, kit de documentación |
| 1 | Pendiente | SQLite + servicios de storage |
| 2 | Pendiente | Navegación y pantallas base |
| 3 | Pendiente | Flujo guiado de corte |
| 4 | Pendiente | Cámara y galería |
| 5 | Pendiente | Tarjetas de decisión |
| 6 | Pendiente | Pulido y release |

## Licencia

Privado — BarberSchool © 2026
