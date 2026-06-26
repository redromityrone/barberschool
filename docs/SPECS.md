# BarberSchool — Especificaciones de Desarrollo (v1.0)

## 1. Visión del producto

**BarberSchool** es una herramienta móvil (PWA) para barberos en formación y profesionales que les permite:

1. **Capturar fotos** de cortes realizados y guardarlas automáticamente en su Google Drive.
2. **Seguir un flujo guiado** paso a paso al realizar un corte de cabello.
3. **Consultar un deck de referencia** con imágenes y decisiones clave (ángulos, longitudes, técnicas).

El objetivo es reducir errores, estandarizar la calidad del servicio y crear un portafolio visual del trabajo del barbero.

---

## 2. Personas y casos de uso

| Persona | Necesidad | Solución |
|---------|-----------|----------|
| Barbero aprendiz | No recuerda el orden de los pasos | Flujo guiado con checklist interactivo |
| Barbero profesional | Quiere documentar su trabajo | Captura de fotos → Drive automático |
| Instructor | Necesita material de referencia | Deck de imágenes con anotaciones |
| Dueño de barbería | Quiere consistencia en el servicio | Flujos estandarizados por tipo de corte |

### Casos de uso principales

- **UC-01**: Iniciar un corte seleccionando el tipo (fade, taper, buzz, etc.).
- **UC-02**: Ver el flujo paso a paso con imágenes de referencia en cada etapa.
- **UC-03**: Tomar foto en un paso específico y guardarla en Drive con metadata.
- **UC-04**: Consultar el deck de referencia sin iniciar un corte.
- **UC-05**: Revisar historial de cortes y fotos guardadas.

---

## 3. Requisitos funcionales

### 3.1 Autenticación y almacenamiento

| ID | Requisito | Prioridad |
|----|-----------|-----------|
| RF-01 | Login con cuenta Google (OAuth 2.0) | P0 |
| RF-02 | Guardar fotos en carpeta `BarberSchool/` del Drive del usuario | P0 |
| RF-03 | Nombrar archivos: `{fecha}_{tipo-corte}_{paso}_{timestamp}.jpg` | P1 |
| RF-04 | Metadata en JSON junto a cada foto (tipo, paso, notas) | P1 |

### 3.2 Flujo de corte guiado

| ID | Requisito | Prioridad |
|----|-----------|-----------|
| RF-05 | Catálogo de tipos de corte con flujos predefinidos | P0 |
| RF-06 | Cada paso muestra: título, descripción, imagen de referencia, duración estimada | P0 |
| RF-07 | Checklist: marcar paso como completado antes de avanzar | P0 |
| RF-08 | Botón "Tomar foto" en cada paso del flujo | P0 |
| RF-09 | Barra de progreso visual del corte en curso | P1 |
| RF-10 | Pausar y reanudar un corte en progreso | P2 |

### 3.3 Deck de referencia

| ID | Requisito | Prioridad |
|----|-----------|-----------|
| RF-11 | Galería de tarjetas de referencia por categoría (ángulos, guardas, texturas) | P0 |
| RF-12 | Cada tarjeta: imagen, título, descripción, etiquetas | P0 |
| RF-13 | Vista ampliada con zoom y anotaciones | P1 |
| RF-14 | Favoritos y búsqueda por etiqueta | P2 |

### 3.4 Cámara y fotos

| ID | Requisito | Prioridad |
|----|-----------|-----------|
| RF-15 | Acceso a cámara trasera/frontal del dispositivo | P0 |
| RF-16 | Preview antes de confirmar y subir | P0 |
| RF-17 | Compresión de imagen antes de subir (max 2MB) | P1 |
| RF-18 | Modo offline: cola de fotos pendientes de subir | P2 |

---

## 4. Requisitos no funcionales

| ID | Requisito | Métrica |
|----|-----------|---------|
| RNF-01 | Tiempo de carga inicial | < 3s en 4G |
| RNF-02 | Subida de foto | < 10s por imagen |
| RNF-03 | Funcionamiento offline del flujo | 100% de pasos sin red |
| RNF-04 | Responsive | 320px – 1024px |
| RNF-05 | PWA instalable | Lighthouse PWA score > 90 |
| RNF-06 | Accesibilidad | WCAG 2.1 AA |

---

## 5. Arquitectura técnica

```
┌─────────────────────────────────────────────────────────┐
│                    PWA (React + Vite)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │  Flujo   │  │  Cámara  │  │  Deck    │  │  Auth   │ │
│  │  Corte   │  │  Module  │  │  Ref.    │  │ Google  │ │
│  └────┬─────┘  └────┬─────┘  └──────────┘  └────┬────┘ │
│       │              │                            │      │
│  ┌────┴──────────────┴────────────────────────────┴────┐ │
│  │              Service Layer (hooks + services)        │ │
│  └────┬──────────────────────────────┬───────────────┘ │
│       │                              │                   │
│  ┌────┴─────┐                   ┌────┴─────┐            │
│  │ IndexedDB│                   │  Cache   │            │
│  │ (offline)│                   │  (SW)    │            │
│  └──────────┘                   └──────────┘            │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTPS
                    ┌──────┴──────┐
                    │ Google APIs │
                    │ Drive v3    │
                    │ OAuth 2.0   │
                    └─────────────┘
```

### Stack tecnológico

| Capa | Tecnología | Justificación |
|------|------------|---------------|
| Frontend | React 19 + TypeScript | Ecosistema maduro, tipado fuerte |
| Build | Vite 6 | HMR rápido, optimizado para PWA |
| Estilos | Tailwind CSS 4 | Desarrollo rápido, mobile-first |
| Estado | Zustand | Ligero, sin boilerplate |
| PWA | vite-plugin-pwa + Workbox | Offline, instalable |
| Cámara | MediaDevices API | Nativo, sin dependencias |
| Storage local | idb (IndexedDB) | Cola offline de fotos |
| Drive | Google Drive API v3 | Almacenamiento del usuario |
| Auth | @react-oauth/google | OAuth simplificado |
| Tests | Vitest + Testing Library | Rápido, compatible con Vite |
| Lint | ESLint + Prettier | Consistencia de código |
| CI/CD | GitHub Actions | Integrado con el repo |

---

## 6. Modelo de datos

### 6.1 Tipo de corte (HaircutType)

```typescript
interface HaircutType {
  id: string;
  name: string;           // "Fade Medio"
  description: string;
  thumbnailUrl: string;
  estimatedMinutes: number;
  steps: HaircutStep[];
  tags: string[];
}
```

### 6.2 Paso del flujo (HaircutStep)

```typescript
interface HaircutStep {
  id: string;
  order: number;
  title: string;          // "Degradado con guarda #2"
  description: string;
  referenceImageUrl: string;
  tips: string[];
  requiresPhoto: boolean;
}
```

### 6.3 Sesión de corte (HaircutSession)

```typescript
interface HaircutSession {
  id: string;
  haircutTypeId: string;
  startedAt: string;      // ISO 8601
  completedAt?: string;
  currentStepIndex: number;
  completedSteps: string[];
  photos: SessionPhoto[];
  status: 'in_progress' | 'completed' | 'paused';
}
```

### 6.4 Foto de sesión (SessionPhoto)

```typescript
interface SessionPhoto {
  id: string;
  stepId: string;
  localUrl: string;
  driveFileId?: string;
  uploadedAt?: string;
  uploadStatus: 'pending' | 'uploading' | 'done' | 'error';
}
```

### 6.5 Tarjeta de referencia (ReferenceCard)

```typescript
interface ReferenceCard {
  id: string;
  title: string;
  category: 'angle' | 'guard' | 'texture' | 'technique' | 'finish';
  imageUrl: string;
  description: string;
  tags: string[];
  isFavorite: boolean;
}
```

---

## 7. Estructura del proyecto

```
barberschool/
├── .github/
│   └── workflows/
│       ├── ci.yml              # Lint, test, build en cada push/PR
│       ├── cd.yml              # Deploy a producción tras merge a main
│       └── scheduled-ci.yml    # CI programado cada 6 horas
├── docs/
│   ├── SPECS.md                # Este documento
│   ├── USER-FLOWS.md           # Flujos de usuario detallados
│   └── CI-CD.md                # Documentación del pipeline
├── public/
│   ├── icons/                  # Iconos PWA
│   └── reference/              # Imágenes de referencia estáticas
├── src/
│   ├── components/
│   │   ├── camera/             # Captura de fotos
│   │   ├── flow/               # Flujo de corte guiado
│   │   ├── deck/               # Deck de referencia
│   │   ├── layout/             # Header, nav, shell
│   │   └── ui/                 # Botones, cards, modals
│   ├── hooks/
│   │   ├── useCamera.ts
│   │   ├── useDriveUpload.ts
│   │   └── useHaircutFlow.ts
│   ├── services/
│   │   ├── drive.service.ts    # Google Drive API
│   │   ├── auth.service.ts     # OAuth
│   │   └── storage.service.ts  # IndexedDB
│   ├── stores/
│   │   ├── session.store.ts
│   │   └── auth.store.ts
│   ├── data/
│   │   ├── haircut-types.json  # Catálogo de cortes
│   │   └── reference-deck.json # Deck de referencia
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── tests/
│   ├── unit/
│   └── e2e/
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 8. Pantallas (wireframes lógicos)

### 8.1 Home
- Botón "Iniciar corte" → selección de tipo
- Acceso rápido al deck de referencia
- Últimas sesiones

### 8.2 Selección de corte
- Grid de tipos de corte con thumbnail
- Filtro por etiquetas
- Detalle con pasos previos al inicio

### 8.3 Flujo de corte (pantalla principal)
```
┌─────────────────────────────┐
│  Fade Medio    Paso 3 de 7  │
│  ████████░░░░░░░  43%       │
├─────────────────────────────┤
│  [Imagen de referencia]     │
│                             │
│  Degradado con guarda #2    │
│  Usar movimiento ascendente │
│  con la máquina...          │
├─────────────────────────────┤
│  [📷 Tomar foto]            │
│  [✓ Completar paso]         │
│  [← Anterior]  [Siguiente →]│
└─────────────────────────────┘
```

### 8.4 Deck de referencia
- Tabs por categoría
- Grid de tarjetas
- Vista detalle con zoom

### 8.5 Cámara
- Preview en vivo
- Botón captura
- Confirmar / Retomar
- Indicador de subida a Drive

---

## 9. Integración Google Drive

### Flujo de autenticación
1. Usuario pulsa "Conectar con Google"
2. OAuth 2.0 popup → scopes: `drive.file`, `openid`, `email`
3. Token almacenado en memoria (no localStorage por seguridad)
4. Refresh automático antes de expiración

### Flujo de subida
1. Foto capturada → comprimir a JPEG 85%, max 1920px
2. Crear carpeta `BarberSchool` si no existe (query Drive API)
3. Subir con `multipart/related` a Drive API v3
4. Guardar `driveFileId` en SessionPhoto
5. Si offline → encolar en IndexedDB, subir al reconectar

### Estructura en Drive
```
BarberSchool/
├── 2026-06-26_fade-medio/
│   ├── paso-01_consulta.jpg
│   ├── paso-01_consulta.json
│   ├── paso-03_degradado.jpg
│   └── paso-03_degradado.json
└── 2026-06-25_taper/
    └── ...
```

---

## 10. Plan de implementación por fases

### Fase 0 — Fundación (actual)
- [x] Especificaciones de desarrollo
- [x] Pipeline CI/CD
- [ ] Scaffold del proyecto (Vite + React + TS)
- [ ] Configuración ESLint, Prettier, Vitest

### Fase 1 — MVP Core (Sprint 1-2)
- [ ] Layout y navegación mobile-first
- [ ] Catálogo de tipos de corte (JSON estático)
- [ ] Flujo guiado con checklist
- [ ] Deck de referencia con imágenes estáticas
- [ ] Tests unitarios de componentes clave

### Fase 2 — Cámara y Drive (Sprint 3-4)
- [ ] Módulo de cámara con MediaDevices API
- [ ] OAuth Google + Drive upload
- [ ] Cola offline con IndexedDB
- [ ] Historial de sesiones

### Fase 3 — PWA y pulido (Sprint 5)
- [ ] Service Worker y cache de assets
- [ ] Instalable como PWA
- [ ] Optimización de rendimiento
- [ ] Tests e2e

### Fase 4 — Mejoras (backlog)
- [ ] Favoritos en deck
- [ ] Notas por paso
- [ ] Compartir sesión con instructor
- [ ] Modo oscuro

---

## 11. Criterios de aceptación (MVP)

1. Un barbero puede seleccionar "Fade Medio" y ver 7 pasos guiados.
2. Cada paso muestra imagen de referencia y descripción.
3. Puede tomar una foto en cualquier paso.
4. Tras login Google, la foto se guarda en su Drive.
5. Puede navegar el deck de referencia sin iniciar corte.
6. La app funciona offline para consultar flujos y deck.
7. CI pasa: lint + tests + build en cada push.
8. Merge a `main` solo si CI está verde.

---

## 12. Variables de entorno

```env
VITE_GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
VITE_APP_NAME=BarberSchool
VITE_DRIVE_FOLDER_NAME=BarberSchool
```

> Las credenciales de OAuth se configuran en Google Cloud Console.
> Redirect URI: `https://<dominio>/` y `http://localhost:5173/` para dev.

---

## 13. Riesgos y mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Permisos de cámara denegados | Alto | Mensaje claro + guía para habilitar |
| Token OAuth expira mid-session | Medio | Refresh silencioso + re-login graceful |
| Drive API rate limits | Bajo | Cola con retry exponencial |
| Imágenes de referencia pesadas | Medio | WebP optimizado, lazy loading |
| Dispositivos antiguos sin MediaDevices | Bajo | Fallback a input file type="file" capture |

---

*Documento v1.0 — Junio 2026*
*Próxima revisión: al completar Fase 1*
