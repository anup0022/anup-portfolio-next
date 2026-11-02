// Edge refinement for the portrait cutout.
//
// Vision's mask is accurate but its edge pixels still carry colour from the
// original background (the garden behind the subject), which reads as a bright
// halo once the cutout sits on a dark gradient. This does two things:
//
//   1. Colour decontamination — interior colours are pushed outward by a
//      grassfire fill, so edge pixels take their colour from the subject
//      instead of from the background they were photographed against.
//   2. Alpha refinement — the matte is eroded slightly to pull the boundary
//      inside the contaminated band, then feathered so it stays anti-aliased.
//
// usage: node scripts/defringe.mjs <in.png> <out.png> [erodePx] [featherPx]
import sharp from 'sharp';

const [, , inPath, outPath, erodeArg, featherArg] = process.argv;
if (!inPath || !outPath) {
  console.error('usage: node scripts/defringe.mjs <in.png> <out.png> [erodePx] [featherPx]');
  process.exit(64);
}
const ERODE = Number(erodeArg ?? 1);
const FEATHER = Number(featherArg ?? 0.7);
const CORE = 0.97;   // alpha at or above this is treated as solid subject
const BLEED = 8;     // how far interior colour is pushed outward, in px

const { data, info } = await sharp(inPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;
const N = W * H;

const alpha = new Float32Array(N);
for (let i = 0; i < N; i++) alpha[i] = data[i * C + 3] / 255;

// --- 1. grassfire colour bleed -------------------------------------------
// Seed with core pixels, then repeatedly average known neighbours into
// unknown ones. Interior colour therefore grows outward across the band.
const r = new Float32Array(N), g = new Float32Array(N), b = new Float32Array(N);
const known = new Uint8Array(N);
for (let i = 0; i < N; i++) {
  if (alpha[i] >= CORE) {
    r[i] = data[i * C]; g[i] = data[i * C + 1]; b[i] = data[i * C + 2];
    known[i] = 1;
  }
}

const nr = new Float32Array(N), ng = new Float32Array(N), nb = new Float32Array(N);
for (let pass = 0; pass < BLEED; pass++) {
  const next = known.slice();
  nr.set(r); ng.set(g); nb.set(b);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      if (known[i]) continue;
      let sr = 0, sg = 0, sb = 0, n = 0;
      for (let dy = -1; dy <= 1; dy++) {
        const yy = y + dy;
        if (yy < 0 || yy >= H) continue;
        for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx;
          if (xx < 0 || xx >= W) continue;
          const j = yy * W + xx;
          if (!known[j]) continue;
          sr += r[j]; sg += g[j]; sb += b[j]; n++;
        }
      }
      if (n) { nr[i] = sr / n; ng[i] = sg / n; nb[i] = sb / n; next[i] = 1; }
    }
  }
  r.set(nr); g.set(ng); b.set(nb); known.set(next);
}

// --- 2. alpha erode + feather --------------------------------------------
let work = alpha;
for (let pass = 0; pass < ERODE; pass++) {
  const out = new Float32Array(N);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let m = 1;
      for (let dy = -1; dy <= 1; dy++) {
        const yy = y + dy; if (yy < 0 || yy >= H) { m = 0; break; }
        for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx; if (xx < 0 || xx >= W) { m = 0; break; }
          const v = work[yy * W + xx]; if (v < m) m = v;
        }
      }
      out[y * W + x] = m;
    }
  }
  work = out;
}

// --- 3. recombine ---------------------------------------------------------
// Inside the core keep the real pixels; across the band use the bled colour.
const out = Buffer.alloc(N * 4);
for (let i = 0; i < N; i++) {
  const inCore = alpha[i] >= CORE;
  out[i * 4]     = Math.round(inCore ? data[i * C]     : r[i]);
  out[i * 4 + 1] = Math.round(inCore ? data[i * C + 1] : g[i]);
  out[i * 4 + 2] = Math.round(inCore ? data[i * C + 2] : b[i]);
  out[i * 4 + 3] = Math.round(Math.max(0, Math.min(1, work[i])) * 255);
}

let img = sharp(out, { raw: { width: W, height: H, channels: 4 } });
if (FEATHER > 0) {
  // Blur the alpha only; the RGB is already clean and must stay sharp.
  const a = await sharp(out, { raw: { width: W, height: H, channels: 4 } })
    .extractChannel(3).blur(FEATHER).raw().toBuffer();
  const rgb = Buffer.alloc(N * 4);
  for (let i = 0; i < N; i++) {
    rgb[i * 4] = out[i * 4]; rgb[i * 4 + 1] = out[i * 4 + 1];
    rgb[i * 4 + 2] = out[i * 4 + 2]; rgb[i * 4 + 3] = a[i];
  }
  img = sharp(rgb, { raw: { width: W, height: H, channels: 4 } });
}

await img.png({ compressionLevel: 9 }).toFile(outPath);
console.log(`defringed ${W}x${H}  erode=${ERODE}px feather=${FEATHER}px bleed=${BLEED}px -> ${outPath}`);
