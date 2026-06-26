import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const readmePath = path.resolve(rootDir, 'README.md');
const uiPreviewPath = path.resolve(rootDir, 'docs/UI_PREVIEW.md');
const manifestPath = path.resolve(rootDir, 'docs/screenshots/manifest.json');

const START_MARKER = '<!-- SCREENSHOTS:START -->';
const END_MARKER = '<!-- SCREENSHOTS:END -->';

function buildReadmeSection(manifest) {
  const generatedAt = new Date(manifest.generatedAt).toISOString().slice(0, 10);

  const gallery = manifest.screens
    .map(
      (screen) => `### ${screen.title}

${screen.description}

<img src="${screen.file}" alt="${screen.title} — BarberSchool" width="280" />

`,
    )
    .join('');

  return `${START_MARKER}
> Capturas generadas automáticamente el **${generatedAt}** desde la build web (viewport ${manifest.viewport.width}×${manifest.viewport.height}).

| Pantalla | Ruta | Descripción |
|----------|------|-------------|
${manifest.screens.map((screen) => `| ${screen.title} | \`${screen.path}\` | ${screen.description} |`).join('\n')}

## Galería de interfaz

${gallery}📎 Vista detallada: [docs/UI_PREVIEW.md](docs/UI_PREVIEW.md)

${END_MARKER}`;
}

function buildUiPreviewDoc(manifest) {
  const generatedAt = new Date(manifest.generatedAt).toISOString();

  return `---
id: DOC-015
title: Vista previa de la interfaz
version: 1.0.0
status: current
phase: 0
owner: equipo-barberschool
last_updated: ${generatedAt.slice(0, 10)}
last_reviewed: ${generatedAt.slice(0, 10)}
next_review: ${new Date(new Date(manifest.generatedAt).getTime() + 30 * 86400000).toISOString().slice(0, 10)}
sync_with_code: aligned
---

# Vista previa de la interfaz — BarberSchool

> Documento generado automáticamente por el workflow de capturas de pantalla.

| Campo | Valor |
|-------|-------|
| **Generado** | ${generatedAt} |
| **Viewport** | ${manifest.viewport.width}×${manifest.viewport.height} (@${manifest.deviceScaleFactor}x) |
| **Plataforma** | Web export (Expo) |
| **Workflow** | [.github/workflows/screenshots.yml](../.github/workflows/screenshots.yml) |

---

## Pantallas capturadas

${manifest.screens
  .map(
    (screen) => `## ${screen.title}

| | |
|---|---|
| **Ruta** | \`${screen.path}\` |
| **Descripción** | ${screen.description} |
| **Archivo** | [\`${screen.file}\`](${screen.file.replace('docs/', '../docs/')}) |

<img src="${screen.file.replace('docs/', '../docs/')}" alt="${screen.title}" width="320" />

`,
  )
  .join('\n')}

---

## Cómo actualizar estas capturas

\`\`\`bash
npm run build
npm run screenshots
npm run screenshots:update-readme
\`\`\`

En CI, el workflow \`screenshots.yml\` ejecuta estos pasos y actualiza el README en \`main\` cuando hay cambios visuales.
`;
}

async function updateReadme() {
  const manifest = JSON.parse(await readFile(manifestPath, 'utf-8'));
  const readme = await readFile(readmePath, 'utf-8');
  const section = buildReadmeSection(manifest);

  if (!readme.includes(START_MARKER) || !readme.includes(END_MARKER)) {
    throw new Error('README is missing screenshot markers');
  }

  const pattern = new RegExp(`${START_MARKER}[\\s\\S]*?${END_MARKER}`);
  const updatedReadme = readme.replace(pattern, section);
  const uiPreview = buildUiPreviewDoc(manifest);

  await writeFile(readmePath, updatedReadme, 'utf-8');
  await writeFile(uiPreviewPath, uiPreview, 'utf-8');

  console.log('README and docs/UI_PREVIEW.md updated with latest screenshots');
}

updateReadme().catch((error) => {
  console.error(error);
  process.exit(1);
});
