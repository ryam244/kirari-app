/**
 * Kirari - App Icon & Splash Screen Generator
 * Requires: sharp (already in project)
 *
 * Output:
 *   resources/icon-only.png       1024×1024  App Store / Play Store icon
 *   resources/icon-background.png 1024×1024  Android adaptive icon background
 *   resources/splash.png          2732×2732  Capacitor splash screen
 */

import sharp from "sharp";
import { mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dir = dirname(fileURLToPath(import.meta.url));
const root = join(__dir, "..");
mkdirSync(join(root, "resources"), { recursive: true });

// ── Design tokens ────────────────────────────────────────────────────────────
const PINK       = "#FFB5C8";
const PURPLE     = "#C8B5FF";
const PINK_LIGHT = "#FFE4EF";
const PURPLE_LIGHT = "#EEE4FF";
const BLUE_LIGHT   = "#E4EDFF";

// ── 4-pointed star (✨ sparkle shape) path generator ─────────────────────────
// rOuter = arm length, rInner = waist half-width (very narrow → like ✨)
function star4(cx, cy, rOuter, rInner) {
  const d = rInner / Math.SQRT2;
  return [
    `M ${cx},${cy - rOuter}`,          // N
    `L ${cx + d},${cy - d}`,           // NE inner
    `L ${cx + rOuter},${cy}`,          // E
    `L ${cx + d},${cy + d}`,           // SE inner
    `L ${cx},${cy + rOuter}`,          // S
    `L ${cx - d},${cy + d}`,           // SW inner
    `L ${cx - rOuter},${cy}`,          // W
    `L ${cx - d},${cy - d}`,           // NW inner
    "Z",
  ]
    .map((p) => p.replace(/\d+\.\d+/g, (n) => Math.round(n)))
    .join(" ");
}

// ── Icon SVG (1024×1024) ─────────────────────────────────────────────────────
const ICON_SIZE = 1024;
const IC = ICON_SIZE / 2; // 512

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg"
     width="${ICON_SIZE}" height="${ICON_SIZE}" viewBox="0 0 ${ICON_SIZE} ${ICON_SIZE}">
  <defs>
    <!-- Main background gradient: pink → purple -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="${PINK}"/>
      <stop offset="100%" stop-color="${PURPLE}"/>
    </linearGradient>
    <!-- Subtle shine on top half -->
    <linearGradient id="shine" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%"   stop-color="white" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </linearGradient>
    <!-- Soft glow behind the main star -->
    <radialGradient id="glow" cx="50%" cy="50%" r="45%">
      <stop offset="0%"   stop-color="white" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="${ICON_SIZE}" height="${ICON_SIZE}" fill="url(#bgGrad)"/>

  <!-- Shine overlay (top half) -->
  <rect width="${ICON_SIZE}" height="${ICON_SIZE / 2}" fill="url(#shine)"/>

  <!-- Glow halo behind main star -->
  <circle cx="${IC}" cy="${IC}" r="320" fill="url(#glow)"/>

  <!-- ✨ Main sparkle star (large, white) -->
  <path d="${star4(IC, IC, 280, 24)}" fill="white" opacity="0.95"/>

  <!-- ✨ Medium sparkle (top-right) -->
  <path d="${star4(740, 258, 65, 7)}" fill="white" opacity="0.80"/>

  <!-- ✨ Small sparkle (bottom-left) -->
  <path d="${star4(290, 730, 44, 5)}" fill="white" opacity="0.70"/>

  <!-- Tiny sparkle (bottom-right) -->
  <path d="${star4(780, 740, 28, 3)}" fill="white" opacity="0.55"/>

  <!-- Accent dots -->
  <circle cx="268" cy="290" r="15" fill="white" opacity="0.45"/>
  <circle cx="756" cy="738" r="10" fill="white" opacity="0.35"/>
  <circle cx="755" cy="270" r="8"  fill="white" opacity="0.40"/>
  <circle cx="270" cy="750" r="8"  fill="white" opacity="0.35"/>
</svg>`;

// ── Icon background (solid for Android adaptive icon) ────────────────────────
const iconBgSvg = `<svg xmlns="http://www.w3.org/2000/svg"
     width="${ICON_SIZE}" height="${ICON_SIZE}" viewBox="0 0 ${ICON_SIZE} ${ICON_SIZE}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="${PINK}"/>
      <stop offset="100%" stop-color="${PURPLE}"/>
    </linearGradient>
  </defs>
  <rect width="${ICON_SIZE}" height="${ICON_SIZE}" fill="url(#bg)"/>
</svg>`;

// ── Splash SVG (2732×2732) ────────────────────────────────────────────────────
// Safe zone = center 1366×1366 area (always visible on all devices)
const SPLASH = 2732;
const SC = SPLASH / 2; // 1366

const splashSvg = `<svg xmlns="http://www.w3.org/2000/svg"
     width="${SPLASH}" height="${SPLASH}" viewBox="0 0 ${SPLASH} ${SPLASH}">
  <defs>
    <!-- Light app background gradient -->
    <linearGradient id="splashBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="${PINK_LIGHT}"/>
      <stop offset="50%"  stop-color="${PURPLE_LIGHT}"/>
      <stop offset="100%" stop-color="${BLUE_LIGHT}"/>
    </linearGradient>
    <!-- Soft radial glow in center (subtle depth) -->
    <radialGradient id="centerGlow" cx="50%" cy="50%" r="35%">
      <stop offset="0%"   stop-color="white" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient>
    <!-- Star color: pink-to-purple gradient matching icon -->
    <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="${PINK}"/>
      <stop offset="100%" stop-color="${PURPLE}"/>
    </linearGradient>
    <!-- White inner glow on star -->
    <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%"   stop-color="white" stop-opacity="0.50"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="${SPLASH}" height="${SPLASH}" fill="url(#splashBg)"/>

  <!-- Center glow (stronger) -->
  <circle cx="${SC}" cy="${SC}" r="700" fill="url(#centerGlow)"/>

  <!-- Badge circle behind the star (gives contrast) -->
  <circle cx="${SC}" cy="${SC}" r="480" fill="url(#starGrad)" opacity="0.85"/>

  <!-- ✨ Main star — white, high contrast on colored badge -->
  <path d="${star4(SC, SC, 380, 34)}" fill="white" opacity="0.95"/>

  <!-- Medium sparkles at 45° around the main star -->
  <path d="${star4(SC + 420, SC - 420, 80, 9)}"  fill="${PINK}"   opacity="0.70"/>
  <path d="${star4(SC - 420, SC - 420, 60, 7)}"  fill="${PURPLE}" opacity="0.65"/>
  <path d="${star4(SC + 400, SC + 420, 55, 6)}"  fill="${PURPLE}" opacity="0.62"/>
  <path d="${star4(SC - 380, SC + 400, 65, 7)}"  fill="${PINK}"   opacity="0.68"/>

  <!-- Tiny outer sparkles -->
  <path d="${star4(SC + 570, SC,       35, 4)}"  fill="${PINK}"   opacity="0.55"/>
  <path d="${star4(SC - 560, SC,       30, 3)}"  fill="${PURPLE}" opacity="0.52"/>
  <path d="${star4(SC, SC - 570,       28, 3)}"  fill="${PINK}"   opacity="0.50"/>
  <path d="${star4(SC, SC + 560,       32, 4)}"  fill="${PURPLE}" opacity="0.55"/>

  <!-- Accent circles -->
  <circle cx="${SC + 500}" cy="${SC - 180}" r="22" fill="${PINK}"   opacity="0.45"/>
  <circle cx="${SC - 500}" cy="${SC + 200}" r="18" fill="${PURPLE}" opacity="0.42"/>
  <circle cx="${SC + 200}" cy="${SC + 510}" r="16" fill="${PINK}"   opacity="0.40"/>
  <circle cx="${SC - 200}" cy="${SC - 500}" r="20" fill="${PURPLE}" opacity="0.42"/>
</svg>`;

// ── Generate files ────────────────────────────────────────────────────────────
const tasks = [
  {
    svg: iconSvg,
    out: join(root, "resources/icon-only.png"),
    label: "resources/icon-only.png (1024×1024)",
  },
  {
    svg: iconBgSvg,
    out: join(root, "resources/icon-background.png"),
    label: "resources/icon-background.png (1024×1024)",
  },
  {
    svg: splashSvg,
    out: join(root, "resources/splash.png"),
    label: "resources/splash.png (2732×2732)",
  },
];

for (const { svg, out, label } of tasks) {
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
  console.log(`✓ Generated: ${label}`);
}

console.log("\nDone! Run the following to generate all platform sizes:");
console.log("  npx @capacitor/assets generate --ios --android\n");
