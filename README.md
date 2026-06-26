# BarberSchool

Aplicación móvil para barberos que permite capturar fotos de cortes, seguir flujos guiados paso a paso y consultar imágenes de referencia con tarjetas de decisión.

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

- [Especificaciones técnicas](docs/SPECIFICATIONS.md)
- [Plan de desarrollo](docs/DEVELOPMENT_PLAN.md)

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

Solo se hace merge a `main` cuando todos los checks pasan.

## Fases de desarrollo

| Fase | Estado | Descripción |
|------|--------|-------------|
| 0 | ✅ | Fundación, CI/CD, scaffold |
| 1 | Pendiente | SQLite + servicios de storage |
| 2 | Pendiente | Navegación y pantallas base |
| 3 | Pendiente | Flujo guiado de corte |
| 4 | Pendiente | Cámara y galería |
| 5 | Pendiente | Tarjetas de decisión |
| 6 | Pendiente | Pulido y release |

## Licencia

Privado — BarberSchool © 2026
