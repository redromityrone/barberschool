---
id: DOC-032
title: Guía de Setup Local
version: 1.0.0
status: in_progress
phase: 0
owner: equipo-barberschool
last_updated: 2026-06-26
last_reviewed: 2026-06-26
next_review: 2026-07-10
sync_with_code: aligned
---

# Guía de Setup Local — BarberSchool

## 1. Requisitos previos

| Herramienta | Versión mínima | Verificar |
|-------------|----------------|-----------|
| Node.js | 20.x | `node --version` |
| npm | 10.x | `npm --version` |
| Git | 2.x | `git --version` |

### Para dispositivo físico (opcional)

| Herramienta | Uso |
|-------------|-----|
| Expo Go (iOS/Android) | Probar en dispositivo sin build nativo |
| Android Studio | Emulador Android |
| Xcode | Simulador iOS (solo macOS) |

---

## 2. Clonar e instalar

```bash
git clone https://github.com/redromityrone/barberschool.git
cd barberschool
npm install
```

---

## 3. Desarrollo

```bash
# Iniciar servidor de desarrollo
npm start

# Opciones directas
npm run web       # Navegador (más rápido para UI)
npm run android   # Emulador/dispositivo Android
npm run ios       # Simulador iOS (macOS)
```

### Expo Go en dispositivo

1. Instalar **Expo Go** desde App Store / Play Store
2. Ejecutar `npm start`
3. Escanear QR con la app Expo Go
4. La app se carga en el dispositivo

> **Pendiente:** Documentar troubleshooting de red (misma WiFi, tunnel mode).  
> **Estado doc:** `in_progress` — sección dispositivo físico por completar.

---

## 4. Calidad de código

```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript compiler
npm run test        # Jest (watch mode)
npm run test -- --ci  # Jest (modo CI, sin watch)
npm run build       # Expo export web
```

---

## 5. Estructura relevante

```
barberschool/
├── app/           # Pantallas (Expo Router) — editar aquí para UI
├── src/           # Lógica, tipos, datos, servicios
├── assets/        # Imágenes e iconos
├── docs/          # Kit de documentación
└── package.json   # Scripts y dependencias
```

---

## 6. Variables de entorno

No se requieren variables de entorno en el MVP (offline-first, sin backend).

---

## 7. Problemas comunes

| Problema | Solución |
|----------|----------|
| `npm install` falla por peer deps | Verificar `react-test-renderer@18.3.1` en devDependencies |
| Metro bundler no inicia | `npx expo start --clear` |
| Puerto 8081 ocupado | `kill $(lsof -t -i:8081)` o cambiar puerto |
| Tests fallan | `npm run test -- --clearCache` |

---

## 8. Referencias

- [Contribución](CONTRIBUTING.md)
- [CI/CD](CI_CD.md)
- [Arquitectura](ARCHITECTURE.md)
- [Expo docs](https://docs.expo.dev/)
