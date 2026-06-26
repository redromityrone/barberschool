---
id: DOC-030
title: Guía de Contribución
version: 1.0.0
status: current
phase: 0
owner: equipo-barberschool
last_updated: 2026-06-26
last_reviewed: 2026-06-26
next_review: 2026-07-26
sync_with_code: aligned
---

# Guía de Contribución — BarberSchool

## 1. Flujo de trabajo

```
main (protegida)
  └── cursor/<descripcion>-d2f6   ← ramas de feature
        └── commits incrementales
              └── PR → CI verde → merge a main
```

### Pasos

1. Crear rama desde `main`:
   ```bash
   git checkout main && git pull
   git checkout -b cursor/mi-feature-d2f6
   ```

2. Desarrollar con commits atómicos y descriptivos.

3. Si el cambio afecta documentación, actualizar docs en el mismo PR (ver [DOC_KIT.md](DOC_KIT.md)).

4. Verificar localmente:
   ```bash
   npm run lint && npm run typecheck && npm run test -- --ci && npm run build
   ```

5. Push y crear PR:
   ```bash
   git push -u origin cursor/mi-feature-d2f6
   ```

6. Esperar CI verde → merge a `main`.

---

## 2. Convenciones de commits

Formato: `tipo(scope): descripción`

| Tipo | Uso |
|------|-----|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Solo documentación |
| `chore` | Mantenimiento, deps, config |
| `test` | Tests |
| `ci` | Cambios en CI/CD |
| `refactor` | Refactorización sin cambio funcional |

Ejemplos:
```
feat(camera): add photo compression before save
docs(DOC-021): update sqlite schema for phase 1
ci: add coverage report to pipeline
```

---

## 3. Convenciones de código

- **TypeScript** estricto (`strict: true`)
- **ESLint** + **Prettier** — ejecutar antes de commit
- Componentes funcionales con hooks
- Nombres en inglés para código, español para UI visible al usuario
- Imports con alias `@/` para `src/`
- Sin `any` salvo justificación documentada

---

## 4. Documentación

Todo cambio que afecte comportamiento, arquitectura o datos **debe** incluir actualización de docs:

| Si cambias… | Actualiza… |
|-------------|-----------|
| Feature nueva | SPECIFICATIONS, fase actual, REGISTRY |
| Schema / tipos | DATA_MODEL, ARCHITECTURE |
| Pipeline CI | CI_CD, SETUP |
| Nueva fase completada | DEVELOPMENT_PLAN, phases/PHASE_X, CHANGELOG |

Ver [DOC_KIT.md](DOC_KIT.md) para el proceso completo.

---

## 5. Tests

- Tests unitarios en `src/**/__tests__/`
- Ejecutar: `npm run test`
- Añadir tests para lógica de negocio nueva
- No se requieren tests para componentes UI triviales en MVP

---

## 6. Ramas

| Patrón | Uso |
|--------|-----|
| `main` | Rama principal, protegida |
| `cursor/<descripcion>-d2f6` | Features y fixes |

---

## 7. Referencias

- [Setup local](SETUP.md)
- [CI/CD](CI_CD.md)
- [Kit de documentación](DOC_KIT.md)
- [Plan de desarrollo](DEVELOPMENT_PLAN.md)
