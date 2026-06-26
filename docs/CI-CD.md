# BarberSchool — Pipeline CI/CD

## Resumen

El proyecto usa **GitHub Actions** con tres workflows:

| Workflow | Trigger | Propósito |
|----------|---------|-----------|
| `ci.yml` | Push / PR a cualquier rama | Lint, test, build |
| `cd.yml` | Push a `main` | Deploy a GitHub Pages |
| `scheduled-ci.yml` | Cron cada 6 horas | Validación periódica de `main` |

## Flujo de desarrollo

```
feature branch ──push──► CI ──verde──► PR ──auto-merge──► main ──► CD (deploy)
                              │
                              └──rojo──► ❌ No merge
```

### Reglas de merge

1. **Nunca** push directo a `main` sin CI verde.
2. Las ramas `cursor/*` se mergean automáticamente cuando CI pasa.
3. `main` está protegida: requiere CI verde + status checks.

## Jobs del CI

### 1. Lint (`lint`)
- ESLint sobre `src/`
- Prettier check (formato)
- TypeScript type-check (`tsc --noEmit`)

### 2. Test (`test`)
- Vitest en modo CI
- Cobertura mínima: 60% (MVP), objetivo 80%

### 3. Build (`build`)
- `npm run build`
- Verificar que `dist/` se genera sin errores
- Subir `dist/` como artifact (7 días)

## CD — Deploy

Tras merge a `main`:
1. Re-ejecutar build
2. Deploy a **GitHub Pages** (`gh-pages` o artifact deploy)
3. URL: `https://redromityrone.github.io/barberschool/`

## CI programado

Cada 6 horas (`0 */6 * * *`):
- Checkout `main`
- Ejecutar lint + test + build
- Notificar si falla (issue automático o badge rojo)

## Variables y secretos

| Nombre | Tipo | Uso |
|--------|------|-----|
| `VITE_GOOGLE_CLIENT_ID` | Secret (CD) | OAuth en producción |
| `GITHUB_TOKEN` | Automático | Deploy Pages |

## Comandos locales

```bash
# Desarrollo
npm run dev

# Verificar antes de push (mismo que CI)
npm run lint
npm run test
npm run build

# Todo junto
npm run ci
```

## Badge de estado

Agregar al README:

```markdown
![CI](https://github.com/redromityrone/barberschool/actions/workflows/ci.yml/badge.svg)
```

## Configuración recomendada en GitHub

### Branch protection rules (`main`)
- ✅ Require status checks: `lint`, `test`, `build`
- ✅ Require branches up to date
- ❌ Allow force pushes
- ❌ Allow deletions

### Auto-merge
- Habilitar auto-merge en el repositorio
- El workflow `ci.yml` incluye un job de auto-merge para PRs de agentes
