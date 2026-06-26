# BarberSchool — Flujos de Usuario

## Flujo 1: Realizar un corte con fotos

```mermaid
flowchart TD
    A[Abrir app] --> B{¿Autenticado?}
    B -->|No| C[Login con Google]
    C --> D[Home]
    B -->|Sí| D
    D --> E[Seleccionar tipo de corte]
    E --> F[Ver resumen de pasos]
    F --> G[Iniciar corte]
    G --> H[Paso N del flujo]
    H --> I[Ver imagen de referencia]
    I --> J{¿Tomar foto?}
    J -->|Sí| K[Abrir cámara]
    K --> L[Capturar]
    L --> M[Confirmar foto]
    M --> N[Subir a Drive]
    N --> O[Marcar paso completado]
    J -->|No| O
    O --> P{¿Último paso?}
    P -->|No| H
    P -->|Sí| Q[Corte completado]
    Q --> R[Resumen con fotos]
```

## Flujo 2: Consultar deck de referencia

```mermaid
flowchart TD
    A[Home] --> B[Deck de referencia]
    B --> C[Filtrar por categoría]
    C --> D[Ver grid de tarjetas]
    D --> E[Seleccionar tarjeta]
    E --> F[Vista detalle con zoom]
    F --> G{¿Acción?}
    G -->|Volver| D
    G -->|Iniciar corte relacionado| H[Seleccionar tipo de corte]
```

## Flujo 3: Subida offline → online

```mermaid
flowchart TD
    A[Capturar foto sin red] --> B[Guardar en IndexedDB]
    B --> C[Mostrar badge 'pendiente']
    C --> D{¿Conexión restaurada?}
    D -->|Sí| E[Procesar cola]
    E --> F[Subir a Drive]
    F --> G{¿Éxito?}
    G -->|Sí| H[Actualizar estado 'done']
    G -->|No| I[Reintentar con backoff]
    I --> E
    D -->|No| C
```

## Flujo 4: CI/CD (desarrollo)

```mermaid
flowchart TD
    A[Push a rama feature] --> B[GitHub Actions CI]
    B --> C{Lint}
    C -->|Fail| D[❌ Bloquear merge]
    C -->|Pass| E{Tests}
    E -->|Fail| D
    E -->|Pass| F{Build}
    F -->|Fail| D
    F -->|Pass| G[✅ CI verde]
    G --> H[Auto-merge a main]
    H --> I[CD: Deploy a producción]
```

## Estados de una sesión de corte

| Estado | Descripción | Acciones disponibles |
|--------|-------------|---------------------|
| `in_progress` | Corte activo | Avanzar, retroceder, foto, pausar |
| `paused` | Pausado temporalmente | Reanudar, cancelar |
| `completed` | Finalizado | Ver resumen, compartir |

## Navegación principal

```
┌─────────────────────────────────────┐
│  🏠 Home  │  ✂️ Cortes  │  📚 Deck  │
└─────────────────────────────────────┘
```

- **Home**: Dashboard, sesión activa, accesos rápidos
- **Cortes**: Catálogo y flujo guiado
- **Deck**: Galería de referencia
