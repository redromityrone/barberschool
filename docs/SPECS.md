# BarberSchool — Especificaciones de Desarrollo (SPECS)

## 1. Visión del producto

**BarberSchool** es una aplicación web progresiva (PWA) diseñada para barberos y estudiantes de barbería. Permite documentar cortes de cabello mediante fotografías guardadas en Google Drive, guiar al barbero paso a paso durante el flujo de trabajo, y superponer imágenes y marcas de referencia sobre la cámara en tiempo real.

### Problema que resuelve

| Problema | Solución |
|----------|----------|
| Los barberos olvidan el orden de pasos en cortes complejos | Flujos de trabajo configurables con checklist interactivo |
| No hay registro visual del progreso del corte | Captura de fotos por etapa, guardadas automáticamente en Drive |
| Difícil replicar un estilo de referencia | Overlay de imagen de referencia + marcas guía sobre la cámara |
| Herramientas genéricas no adaptadas al taller | UI optimizada para uso con una mano en el móvil |

---

## 2. Personas de usuario

### Barbero profesional
- Usa la app durante el servicio con el cliente sentado.
- Necesita acceso rápido a la cámara y al flujo del corte.
- Quiere que las fotos se organicen solas en su Drive.

### Estudiante de barbería
- Sigue flujos predefinidos por su instructor.
- Compara su trabajo con imágenes de referencia.
- Revisa su historial de cortes para aprender.

### Instructor / dueño del taller
- Crea y comparte plantillas de flujo de corte.
- Define imágenes de referencia estándar por estilo.
- Revisa el progreso de estudiantes vía carpetas compartidas en Drive.

---

## 3. Requisitos funcionales

### RF-01 — Autenticación con Google
- Login OAuth 2.0 con cuenta de Google.
- Permisos mínimos: `drive.file` (solo archivos creados por la app).
- Sesión persistente con refresh token en `localStorage` cifrado.

### RF-02 — Captura de fotografías
- Acceso a cámara trasera del dispositivo (preferida).
- Botón de captura grande (≥ 64 px) para uso con una mano.
- Vista previa inmediata con opción de retomar o confirmar.
- Metadatos automáticos: fecha, hora, paso del flujo, nombre del cliente (opcional).

### RF-03 — Almacenamiento en Google Drive
- Estructura de carpetas automática:
  ```
  BarberSchool/
  └── {año}/{mes}/
      └── {cliente-o-sesión}/
          ├── 01-inicio.jpg
          ├── 02-lados.jpg
          └── ...
  ```
- Subida en segundo plano con indicador de progreso.
- Reintento automático ante fallos de red (máx. 3 intentos).

### RF-04 — Flujos de trabajo (Workflow)
- Plantillas predefinidas: Fade, Taper, Buzz Cut, Diseño libre.
- Cada plantilla define una secuencia ordenada de pasos:
  ```json
  {
    "id": "fade-clasico",
    "nombre": "Fade Clásico",
    "pasos": [
      { "orden": 1, "titulo": "Consulta y referencia", "descripcion": "...", "requiereFoto": true },
      { "orden": 2, "titulo": "Degradado bajo", "descripcion": "...", "requiereFoto": true },
      { "orden": 3, "titulo": "Degradado medio", "descripcion": "...", "requiereFoto": false }
    ]
  }
  ```
- Barra de progreso visual (paso actual / total).
- Notificación al completar todos los pasos.

### RF-05 — Imagen de referencia
- Cargar imagen desde galería o desde plantilla del flujo.
- Modo overlay: imagen semitransparente superpuesta sobre la cámara.
- Control de opacidad (0–100 %).
- Modo lado a lado: referencia | cámara en vivo.

### RF-06 — Marcas de referencia
- Marcadores arrastrables sobre la vista de cámara:
  - Línea de degradado (horizontal ajustable).
  - Punto de referencia (círculo).
  - Zona de longitud (rectángulo).
- Las marcas se guardan por plantilla de flujo.
- Color y grosor configurables.

### RF-07 — Historial de sesiones
- Lista de sesiones recientes (almacenadas en IndexedDB local).
- Enlace directo a la carpeta de Drive de cada sesión.
- Estado: en progreso / completada / subida pendiente.

### RF-08 — Modo offline
- Service Worker para caché de assets estáticos.
- Cola de fotos pendientes de subida cuando no hay conexión.
- Sincronización automática al recuperar conexión.

---

## 4. Requisitos no funcionales

| ID | Requisito | Métrica |
|----|-----------|---------|
| RNF-01 | Tiempo de carga inicial | < 3 s en 4G |
| RNF-02 | Latencia cámara → vista previa | < 200 ms |
| RNF-03 | Compatibilidad | Chrome/Safari móvil iOS 16+, Android 10+ |
| RNF-04 | Accesibilidad | WCAG 2.1 AA en controles principales |
| RNF-05 | Seguridad | Tokens OAuth nunca en URL; HTTPS obligatorio |
| RNF-06 | PWA | Instalable en pantalla de inicio |

---

## 5. Arquitectura técnica

```
┌─────────────────────────────────────────────────────────┐
│                    PWA (Next.js 15)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │  Cámara  │  │ Workflow │  │ Overlay  │  │ Drive  │ │
│  │  Module  │  │  Engine  │  │  Module  │  │ Client │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───┬────┘ │
│       └─────────────┴─────────────┴────────────┘       │
│                         │                               │
│              ┌──────────▼──────────┐                   │
│              │   Zustand Store       │                   │
│              │  (estado global)      │                   │
│              └──────────┬──────────┘                   │
│         ┌─────────────────┼─────────────────┐          │
│         ▼                 ▼                 ▼          │
│   IndexedDB          localStorage      Service Worker  │
│   (fotos offline)    (sesión OAuth)    (caché + sync)   │
└─────────────────────────┬───────────────────────────────┘
                          │ HTTPS
                          ▼
              ┌───────────────────────┐
              │   Google Drive API v3  │
              │   (OAuth 2.0)          │
              └───────────────────────┘
```

### Stack tecnológico

| Capa | Tecnología | Justificación |
|------|-----------|---------------|
| Framework | Next.js 15 (App Router) | SSR/SSG, PWA, API routes para OAuth |
| Lenguaje | TypeScript 5 | Tipado fuerte en flujos y modelos |
| Estilos | Tailwind CSS 4 | UI rápida, mobile-first |
| Estado | Zustand | Ligero, sin boilerplate |
| Cámara | MediaDevices API + canvas | Nativo, sin dependencias pesadas |
| Almacenamiento local | IndexedDB (idb) | Fotos offline de gran tamaño |
| Drive | googleapis (cliente) | API oficial de Google |
| Tests | Vitest + Playwright | Unit + E2E cámara mock |
| CI/CD | GitHub Actions | Lint, test, build, deploy |

---

## 6. Modelo de datos

### Sesión de corte
```typescript
interface SesionCorte {
  id: string;                    // UUID
  plantillaId: string;
  nombreCliente?: string;
  pasoActual: number;
  pasosCompletados: number[];
  fotos: Foto[];
  marcas: MarcaReferencia[];
  imagenReferencia?: string;     // base64 o URL blob
  estado: 'en_progreso' | 'completada' | 'pendiente_subida';
  carpetaDriveId?: string;
  creadoEn: string;              // ISO 8601
  actualizadoEn: string;
}
```

### Foto
```typescript
interface Foto {
  id: string;
  sesionId: string;
  pasoOrden: number;
  blob: Blob;
  nombreArchivo: string;
  driveFileId?: string;
  estadoSubida: 'pendiente' | 'subiendo' | 'completada' | 'error';
  capturadoEn: string;
}
```

### Marca de referencia
```typescript
interface MarcaReferencia {
  id: string;
  tipo: 'linea' | 'punto' | 'zona';
  x: number;          // % relativo al viewport
  y: number;
  ancho?: number;
  alto?: number;
  color: string;
  grosor: number;
}
```

### Plantilla de flujo
```typescript
interface PlantillaFlujo {
  id: string;
  nombre: string;
  descripcion: string;
  pasos: PasoFlujo[];
  imagenReferenciaUrl?: string;
  marcasDefecto?: MarcaReferencia[];
  esPredefinida: boolean;
}
```

---

## 7. Flujos de pantalla (UX)

```
[Login Google]
      │
      ▼
[Home — Seleccionar plantilla]
      │
      ├──► [Nueva sesión]
      │         │
      │         ▼
      │    [Cámara + Workflow]
      │    ┌─────────────────────────────┐
      │    │  Overlay referencia (toggle) │
      │    │  Marcas guía (toggle)        │
      │    │  Paso 2/5: Degradado bajo    │
      │    │  [📷 Capturar]  [⏭ Siguiente]│
      │    └─────────────────────────────┘
      │         │
      │         ▼
      │    [Resumen sesión → Drive]
      │
      └──► [Historial sesiones]
```

---

## 8. Integración Google Drive

### OAuth Flow
1. Usuario pulsa "Iniciar con Google".
2. Redirect a `/api/auth/google` → Google consent screen.
3. Callback en `/api/auth/callback` → intercambio code por tokens.
4. Tokens guardados en cookie httpOnly + refresh en localStorage cifrado.

### Subida de archivos
```
POST https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart
Authorization: Bearer {access_token}
```
- Crear carpeta si no existe (`mimeType: application/vnd.google-apps.folder`).
- Subir JPEG con metadata (`name`, `parents`).

### Variables de entorno requeridas
```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=https://tu-dominio.com/api/auth/callback
NEXTAUTH_SECRET=
```

---

## 9. Pipeline CI/CD

### Triggers
| Evento | Acción |
|--------|--------|
| Push a `cursor/*` | Lint + Test + Build |
| PR abierto/actualizado | Lint + Test + Build + Preview deploy |
| CI exitoso en PR | Auto-merge a `main` |
| Push a `main` | Build + Deploy producción (Vercel) |
| Cron cada 6 h | Verificación de dependencias + commit automático si hay actualizaciones menores |

### Jobs del pipeline

```yaml
jobs:
  lint:       # ESLint + Prettier check
  typecheck:  # tsc --noEmit
  test:       # Vitest unit tests
  build:      # next build
  e2e:        # Playwright (solo en main)
  deploy:     # Vercel production (solo en main)
  auto-merge: # merge PR → main si todos los jobs pasan
```

### Política de ramas
- Desarrollo en ramas `cursor/<feature>-95fb`.
- CI debe pasar al 100 % antes de merge.
- `main` siempre desplegable (trunk-based development).
- Commits automáticos de mantenimiento (dependabot, formato) vía workflow programado.

---

## 10. Estructura de carpetas del proyecto

```
barberschool/
├── .github/
│   └── workflows/
│       ├── ci.yml              # Lint, test, build en cada push/PR
│       ├── auto-merge.yml      # Merge automático a main si CI pasa
│       └── scheduled.yml       # Commits de mantenimiento cada 6 h
├── docs/
│   ├── SPECS.md                # Este documento
│   └── PLAN.md                 # Plan de fases
├── public/
│   ├── manifest.json           # PWA manifest
│   └── icons/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Home
│   │   ├── sesion/[id]/
│   │   │   └── page.tsx        # Cámara + workflow
│   │   └── api/
│   │       └── auth/
│   │           ├── google/route.ts
│   │           └── callback/route.ts
│   ├── components/
│   │   ├── CameraView.tsx
│   │   ├── WorkflowStepper.tsx
│   │   ├── ReferenceOverlay.tsx
│   │   ├── ReferenceMarks.tsx
│   │   └── PhotoCapture.tsx
│   ├── lib/
│   │   ├── drive.ts            # Cliente Google Drive
│   │   ├── camera.ts           # Utilidades MediaDevices
│   │   └── db.ts               # IndexedDB wrapper
│   ├── stores/
│   │   └── sesionStore.ts      # Zustand store
│   └── types/
│       └── index.ts            # Interfaces TypeScript
├── tests/
│   ├── unit/
│   └── e2e/
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 11. Criterios de aceptación por épica

### Épica 1 — Fundación
- [ ] Proyecto Next.js compila sin errores
- [ ] PWA instalable en móvil
- [ ] CI pasa en cada push
- [ ] Auto-merge a main funcional

### Épica 2 — Cámara y fotos
- [ ] Cámara trasera accesible en Chrome móvil
- [ ] Captura guarda JPEG en IndexedDB
- [ ] Vista previa con retomar/confirmar

### Épica 3 — Google Drive
- [ ] Login OAuth funcional
- [ ] Fotos suben a carpeta estructurada en Drive
- [ ] Reintento automático ante error de red

### Épica 4 — Workflow
- [ ] 3 plantillas predefinidas cargadas
- [ ] Navegación paso a paso con progreso visual
- [ ] Foto obligatoria en pasos marcados

### Épica 5 — Referencia y marcas
- [ ] Overlay de imagen con control de opacidad
- [ ] Marcas arrastrables persisten en sesión
- [ ] Modo lado a lado funcional

---

## 12. Riesgos y mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Permisos de cámara denegados | Alto | Pantalla de instrucciones + fallback galería |
| Cuota API Drive excedida | Medio | Cola offline + retry exponencial |
| Safari iOS limita PWA cámara | Alto | Detectar navegador, mostrar aviso, fallback |
| Tokens OAuth expiran en sesión larga | Medio | Refresh automático silencioso |
| Fotos grandes en IndexedDB | Bajo | Comprimir JPEG a 85 % calidad, máx 2 MB |

---

## 13. Glosario

| Término | Definición |
|---------|------------|
| **Flujo (Workflow)** | Secuencia ordenada de pasos para realizar un corte |
| **Plantilla** | Flujo predefinido reutilizable |
| **Sesión** | Instancia activa de un corte en progreso |
| **Marca de referencia** | Elemento visual guía superpuesto en la cámara |
| **Overlay** | Imagen de referencia semitransparente sobre la cámara |
| **PWA** | Progressive Web App — app web instalable |
