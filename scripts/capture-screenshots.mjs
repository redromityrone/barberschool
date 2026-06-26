import { chromium, devices } from 'playwright';
import { spawn } from 'node:child_process';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const configPath = path.resolve(__dirname, 'screenshots.config.json');

const config = JSON.parse(await readFile(configPath, 'utf-8'));
const outputDir = path.resolve(rootDir, config.outputDir);
const manifestPath = path.resolve(outputDir, 'manifest.json');

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, timeoutMs = 60000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // Server not ready yet.
    }

    await wait(500);
  }

  throw new Error(`Server did not become ready at ${url}`);
}

function startStaticServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('npx', ['serve', 'dist', '-l', '4173', '--no-clipboard'], {
      cwd: rootDir,
      stdio: 'ignore',
      detached: true,
    });

    server.unref();
    server.on('error', reject);

    setTimeout(() => resolve(server), 2000);
  });
}

function stopServer(server) {
  if (!server || server.killed) {
    return;
  }

  try {
    process.kill(-server.pid, 'SIGTERM');
  } catch {
    server.kill('SIGTERM');
  }
}

async function captureScreenshots() {
  await mkdir(outputDir, { recursive: true });

  const server = await startStaticServer();

  try {
    await waitForServer(config.baseUrl);

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      ...devices['iPhone 14'],
      viewport: config.viewport,
      deviceScaleFactor: config.deviceScaleFactor,
    });
    const page = await context.newPage();

    const manifest = {
      generatedAt: new Date().toISOString(),
      viewport: config.viewport,
      deviceScaleFactor: config.deviceScaleFactor,
      screens: [],
    };

    for (const screen of config.screens) {
      const url = `${config.baseUrl}${screen.path}`;
      await page.goto(url, { waitUntil: 'networkidle' });
      await wait(config.waitAfterNavigationMs);

      const filename = `${screen.id}.png`;
      const filePath = path.join(outputDir, filename);

      await page.screenshot({
        path: filePath,
        fullPage: true,
      });

      manifest.screens.push({
        id: screen.id,
        title: screen.title,
        description: screen.description,
        path: screen.path,
        file: `docs/screenshots/${filename}`,
      });

      console.log(`Captured ${screen.id} -> ${filePath}`);
    }

    await browser.close();
    await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf-8');
    console.log(`Manifest written to ${manifestPath}`);
  } finally {
    stopServer(server);
  }
}

captureScreenshots().catch((error) => {
  console.error(error);
  process.exit(1);
});
