---
id: DOC-020
title: Arquitectura del Sistema
version: 1.0.0
status: current
phase: 0
owner: equipo-barberschool
last_updated: 2026-06-26
last_reviewed: 2026-06-26
next_review: 2026-07-26
sync_with_code: aligned
---

# Arquitectura del Sistema — BarberSchool

## 1. Visión general

BarberSchool es una aplicación móvil **offline-first** construida con Expo (React Native). Toda la lógica corre en el dispositivo del barbero; no hay backend en el MVP.

---

## 2. Diagrama de capas

```
┌──────────────────────────────────────────────────────────┐
│                     PRESENTACIÓN                          │
│  Expo Router screens + React Native Paper components      │
│  ┌────────┐ ┌─────────┐ ┌──────┐ ┌─────────┐ ┌────────┐│
│  │  Home  │ │ History │ │ Flow │ │ Camera  │ │ Cards  ││
│  └───┬────┘ └────┬────┘ └──┬───┘ └────┬────┘ └───┬────┘│
├──────┴──────────┴─────────┴──────────┴──────────┴───────┤
│                     ESTADO (Zustand)                      │
│  sessionStore │ flowStore │ photoStore │ settingsStore    │
├──────────────────────────────────────────────────────────┤
│                     SERVICIOS                             │
│  StorageService │ PhotoService │ FlowService              │
├──────────────────────────────────────────────────────────┤
│                     DATOS                                 │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   SQLite    │  │  FileSystem  │  │  Bundled Assets  │  │
│  │ (metadatos) │  │   (fotos/)   │  │ (refs, flujos)   │  │
│  └─────────────┘  └──────────────┘  └──────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

---

## 3. Stack tecnológico

| Capa | Tecnología | Versión | Estado |
|------|------------|---------|--------|
| Runtime | React Native | 0.76.3 | ✅ Implementado |
| Framework | Expo SDK | 52 | ✅ Implementado |
| Lenguaje | TypeScript | 5.3 | ✅ Implementado |
| Navegación | Expo Router | 4 | ✅ Implementado |
| UI | React Native Paper | 5.12 | ✅ Implementado |
| Estado | Zustand | 5 | 📋 Fase 2 |
| DB | expo-sqlite | 15 | 📋 Fase 1 |
| Archivos | expo-file-system | 18 | 📋 Fase 1 |
| Cámara | expo-camera | 16 | 📋 Fase 4 |
| Tests | Jest + Testing Library | 29 / 12 | ✅ Implementado |
| CI | GitHub Actions | — | ✅ Implementado |

---

## 4. Estructura de directorios (actual)

```
barberschool/
├── app/                      # Pantallas (Expo Router)
│   ├── (tabs)/               # Tab navigation
│   │   ├── index.tsx         # Home — selección de corte
│   │   ├── history.tsx       # Historial de sesiones
│   │   └── settings.tsx      # Ajustes
│   ├── session/
│   │   └── new.tsx           # Nueva sesión
│   └── _layout.tsx           # Root layout
├── src/
│   ├── types/                # Interfaces TypeScript
│   ├── data/                 # Datos predefinidos (flujos, tarjetas)
│   ├── components/           # (Fase 2+) Componentes reutilizables
│   ├── stores/               # (Fase 2+) Zustand stores
│   ├── services/             # (Fase 1+) Lógica de negocio
│   └── db/                   # (Fase 1+) SQLite schema
├── assets/                   # Iconos, splash, imágenes referencia
├── docs/                     # Kit de documentación
└── .github/workflows/ci.yml  # Pipeline CI/CD
```

---

## 5. Flujo de datos

### 5.1 Crear sesión (planificado — Fase 1-2)

```
Usuario selecciona corte → sessionStore.create()
  → StorageService.insert(session)
  → SQLite: INSERT INTO sessions
  → Navega a /session/[id]/flow
```

### 5.2 Capturar foto (planificado — Fase 4)

```
Usuario pulsa captura → expo-camera.takePicture()
  → PhotoService.compress(image)
  → FileSystem: write to photos/{sessionId}/{photoId}.jpg
  → StorageService.insert(photo)
  → SQLite: INSERT INTO photos
  → photoStore.add(photo)
  → UI actualiza galería
```

### 5.3 Flujo guiado (planificado — Fase 3)

```
FlowService.getSteps(flowId) → datos bundled
  → flowStore.setSteps(steps)
  → UI renderiza paso actual
  → Usuario completa paso → flowStore.completeStep(id)
  → (opcional) StorageService persiste progreso
```

---

## 6. Decisiones de arquitectura

| Decisión | Elección | Alternativa descartada | Razón |
|----------|----------|------------------------|-------|
| Offline-first | SQLite + FileSystem | Firebase/Supabase | Barberos no siempre tienen red en el salón |
| Framework móvil | Expo | React Native CLI | DX rápida, cámara integrada, OTA updates |
| Estado | Zustand | Redux Toolkit | Menos boilerplate para app pequeña |
| Navegación | Expo Router | React Navigation manual | File-based, convención Expo moderna |
| UI | React Native Paper | NativeWind/Tamagui | Material Design, componentes listos |
| Sin backend MVP | Solo local | API REST | Reduce complejidad, entrega más rápida |

> Las decisiones formales se documentarán como ADRs en `docs/adr/` a partir de Fase 1.

---

## 7. Seguridad y privacidad

| Aspecto | Implementación |
|---------|----------------|
| Datos | Solo en dispositivo, sin transmisión |
| Permisos | Cámara solicitada en runtime con mensaje claro |
| Almacenamiento | Directorio sandbox de la app (no galería pública por defecto) |
| Autenticación | No aplica en MVP |

---

## 8. Evolución planificada

| Fase | Cambio arquitectónico |
|------|----------------------|
| 1 | Capa de datos: SQLite + FileSystem + servicios |
| 2 | Capa de estado: Zustand stores |
| 3 | Pantallas de flujo y referencia |
| 4 | Integración cámara y compresión |
| 5 | Tarjetas de decisión y resumen |
| 6 | EAS Build, iconos, optimización |

---

## 9. Referencias

- [Especificaciones](SPECIFICATIONS.md)
- [Modelo de datos](DATA_MODEL.md)
- [CI/CD](CI_CD.md)
- [Fase 0](phases/PHASE_0.md)
