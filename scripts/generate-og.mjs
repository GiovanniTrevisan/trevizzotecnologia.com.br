#!/usr/bin/env node
/**
 * Generates the site's raster image assets from the existing vector logos
 * and commits-ready output goes straight into public/images/ (and
 * public/favicon.ico).
 *
 * WHY THIS IS A ONE-OFF SCRIPT, NOT PART OF THE BUILD:
 * it depends on `sharp`, which is only present because Astro carries it as
 * an *optional* dependency (for `astro:assets`). Wiring image generation
 * into `npm run build` would make CI depend on sharp/libvips being
 * available and working on the GitHub Actions runner — a real, avoidable
 * failure mode for a build that otherwise has none. Instead: run this
 * script locally whenever a source SVG changes, and commit the resulting
 * PNG/ICO files like any other static asset.
 *
 * HOW TO RE-RUN:
 *   npm install            # ensures sharp is present (devDependency)
 *   node scripts/generate-og.mjs
 *   git status              # review the regenerated files before committing
 *
 * Outputs (all written under public/):
 *   images/og-default.png          1200x630  — default Open Graph / Twitter card
 *   images/apple-touch-icon-180.png 180x180  — apple-touch-icon
 *   images/icon-512.png             512x512  — Organization.logo (JSON-LD)
 *   favicon.ico                     32x32    — legacy fallback (Bing; Google accepts SVG favicons)
 */

import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = path.join(root, 'public');

const LOGO_DARK_SVG = path.join(pub, 'images/logo-dark.svg'); // viewBox 0 0 1831 560, white paths
const FAVICON_SVG = path.join(pub, 'favicon.svg'); // viewBox 0 0 1024 1024, filled square icon (bg + mark)

const BG = '#060B17'; // matches <meta name="theme-color"> in Layout.astro
const ACCENT = '#E85A25';

/** Wraps a PNG buffer in a minimal single-image ICO container ("PNG-in-ICO"),
 * which every modern OS/browser that reads .ico accepts. Avoids needing an
 * extra dependency just to emit a 32x32 legacy favicon. */
function pngToIco(pngBuffer, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(1, 4); // number of images

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256)
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height (0 = 256)
  entry.writeUInt8(0, 2); // color palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8); // image data size
  entry.writeUInt32LE(header.length + entry.length, 12); // offset of image data

  return Buffer.concat([header, entry, pngBuffer]);
}

async function generateOgDefault() {
  const targetLogoWidth = 640;
  const logoBuffer = await sharp(LOGO_DARK_SVG).resize({ width: targetLogoWidth }).png().toBuffer();
  const logoMeta = await sharp(logoBuffer).metadata();
  const logoW = logoMeta.width;
  const logoH = logoMeta.height;

  const CANVAS_W = 1200;
  const CANVAS_H = 630;

  // Thin accent rule under the logo, in the brand accent color.
  const ruleW = 120;
  const ruleH = 4;
  const ruleBuffer = await sharp({
    create: { width: ruleW, height: ruleH, channels: 4, background: ACCENT },
  })
    .png()
    .toBuffer();

  const gap = 36;
  const blockH = logoH + gap + ruleH;
  const top = Math.round((CANVAS_H - blockH) / 2);

  const logoLeft = Math.round((CANVAS_W - logoW) / 2);
  const ruleLeft = Math.round((CANVAS_W - ruleW) / 2);

  await sharp({
    create: { width: CANVAS_W, height: CANVAS_H, channels: 4, background: BG },
  })
    .composite([
      { input: logoBuffer, left: logoLeft, top },
      { input: ruleBuffer, left: ruleLeft, top: top + logoH + gap },
    ])
    .png()
    .toFile(path.join(pub, 'images/og-default.png'));

  console.log('✓ images/og-default.png (1200x630)');
}

async function generateAppleTouchIcon() {
  await sharp(FAVICON_SVG).resize(180, 180).png().toFile(path.join(pub, 'images/apple-touch-icon-180.png'));
  console.log('✓ images/apple-touch-icon-180.png (180x180)');
}

async function generateIcon512() {
  await sharp(FAVICON_SVG).resize(512, 512).png().toFile(path.join(pub, 'images/icon-512.png'));
  console.log('✓ images/icon-512.png (512x512)');
}

async function generateFaviconIco() {
  const pngBuffer = await sharp(FAVICON_SVG).resize(32, 32).png().toBuffer();
  const ico = pngToIco(pngBuffer, 32);
  writeFileSync(path.join(pub, 'favicon.ico'), ico);
  console.log('✓ favicon.ico (32x32)');
}

async function main() {
  // Sanity check: both source SVGs must be pure vector (no embedded raster),
  // otherwise upscaling would produce blurry output.
  for (const svgPath of [LOGO_DARK_SVG, FAVICON_SVG]) {
    const content = readFileSync(svgPath, 'utf8');
    if (content.includes('base64')) {
      throw new Error(`${svgPath} contains an embedded raster (base64) — refusing to generate from it.`);
    }
  }

  await generateOgDefault();
  await generateAppleTouchIcon();
  await generateIcon512();
  await generateFaviconIco();
}

main().catch((err) => {
  console.error('generate-og.mjs failed:', err);
  process.exitCode = 1;
});
