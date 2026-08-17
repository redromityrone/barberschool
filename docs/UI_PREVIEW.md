---
id: DOC-015
title: Vista previa de la interfaz
version: 1.0.0
status: current
phase: 0
owner: equipo-barberschool
last_updated: 2026-08-17
last_reviewed: 2026-08-17
next_review: 2026-09-16
sync_with_code: aligned
---

# Vista previa de la interfaz — BarberSchool

> Documento generado automáticamente por el workflow de capturas de pantalla.

| Campo | Valor |
|-------|-------|
| **Generado** | 2026-08-17T06:39:07.257Z |
| **Viewport** | 390×844 (@2x) |
| **Plataforma** | Web export (Expo) |
| **Workflow** | [.github/workflows/screenshots.yml](../.github/workflows/screenshots.yml) |

---

## Pantallas capturadas

## Inicio

| | |
|---|---|
| **Ruta** | `/` |
| **Descripción** | Selección del tipo de corte a realizar |
| **Archivo** | [`docs/screenshots/home.png`](../docs/screenshots/home.png) |

<img src="../docs/screenshots/home.png" alt="Inicio" width="320" />


## Historial

| | |
|---|---|
| **Ruta** | `/history` |
| **Descripción** | Registro de sesiones de corte anteriores |
| **Archivo** | [`docs/screenshots/history.png`](../docs/screenshots/history.png) |

<img src="../docs/screenshots/history.png" alt="Historial" width="320" />


## Ajustes

| | |
|---|---|
| **Ruta** | `/settings` |
| **Descripción** | Configuración de la aplicación |
| **Archivo** | [`docs/screenshots/settings.png`](../docs/screenshots/settings.png) |

<img src="../docs/screenshots/settings.png" alt="Ajustes" width="320" />


## Nueva sesión

| | |
|---|---|
| **Ruta** | `/session/new` |
| **Descripción** | Inicio de una nueva sesión de corte |
| **Archivo** | [`docs/screenshots/new-session.png`](../docs/screenshots/new-session.png) |

<img src="../docs/screenshots/new-session.png" alt="Nueva sesión" width="320" />



---

## Cómo actualizar estas capturas

```bash
npm run build
npm run screenshots
npm run screenshots:update-readme
```

En CI, el workflow `screenshots.yml` ejecuta estos pasos y actualiza el README en `main` cuando hay cambios visuales.
