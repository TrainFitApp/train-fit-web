import { mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Capturas de TrainFit Trainers. Fuentes en images/trainers: ventana de
// escritorio de 1280×800 y pantalla móvil de 390×700, ambas a 2x. Son interfaz
// con texto pequeño: AVIF sin submuestreo de croma para que el texto de color
// no se emborrone.
const root = process.cwd();
const source = path.join(root, 'images', 'trainers');
const output = path.join(root, 'public', 'images', 'trainers');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

// Encuadres de escritorio, en px CSS: «wide» es la ventana completa; «main»
// quita la barra lateral para que el contenido se lea a tamaño casi real.
const frames = { wide: { left: 0, width: 1280 }, main: { left: 268, width: 1012 } };
const captures = {
  today: 'wide',
  client: 'main',
  planner: 'main',
  diets: 'main',
  checkin: 'main',
  automation: 'main',
};

async function write(image, file) {
  await image.clone().avif({ quality: 62, effort: 6, chromaSubsampling: '4:4:4' }).toFile(`${file}.avif`);
  await image.clone().webp({ quality: 82, effort: 6, smartSubsample: true }).toFile(`${file}.webp`);
}

for (const [name, frameName] of Object.entries(captures)) {
  const frame = frames[frameName];
  const desktop = sharp(path.join(source, `${name}-desktop.png`)).extract({ left: frame.left * 2, top: 0, width: frame.width * 2, height: 1600 });
  const desktopBuffer = await desktop.png().toBuffer();
  for (const width of [frame.width, frame.width * 2]) {
    await write(sharp(desktopBuffer).resize({ width }), path.join(output, `${name}-${frameName}-${width}`));
  }
  for (const width of [390, 780]) {
    await write(sharp(path.join(source, `${name}-mobile.png`)).resize({ width }), path.join(output, `${name}-mobile-${width}`));
  }
}

console.log('Capturas de Trainers optimizadas en public/images/trainers.');
