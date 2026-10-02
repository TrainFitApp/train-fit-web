import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Pantallas reales de la app de usuario ya enmarcadas en el teléfono
// (images/app/*.png, 1080×1920, 9:16). Salida para PhoneImage: 360w, 540w y
// 720w (2x en los huecos de ~20rem), en AVIF y WebP.
const root = process.cwd();
const source = path.join(root, 'images', 'app');
const output = path.join(root, 'public', 'images');
await mkdir(output, { recursive: true });

const names = (await readdir(source)).filter((file) => file.endsWith('.png')).map((file) => file.replace(/\.png$/, ''));
for (const name of names) {
  for (const width of [360, 540, 720]) {
    const image = sharp(path.join(source, `${name}.png`)).resize({ width, withoutEnlargement: true });
    const file = path.join(output, `${name}-${width}`);
    await image.clone().avif({ quality: 62, effort: 6, chromaSubsampling: '4:4:4' }).toFile(`${file}.avif`);
    await image.clone().webp({ quality: 82, effort: 6, smartSubsample: true }).toFile(`${file}.webp`);
  }
}

console.log(`Pantallas de la app optimizadas: ${names.join(', ')}.`);
