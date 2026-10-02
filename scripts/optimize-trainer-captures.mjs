import { mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Capturas de TrainFit Trainers, siempre en vista de ordenador. Fuentes en
// images/trainers: ventana de escritorio de 1280×800 a 2x. Son interfaz con
// texto pequeño: AVIF sin submuestreo de croma para que el texto de color no se
// emborrone.
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
// En móvil la ventana entera no se lee: se sirve un recorte de la misma vista
// de ordenador centrado en el componente que explica cada función (px CSS).
const crops = {
  today: { left: 284, top: 62 },
  client: { left: 284, top: 56 },
  planner: { left: 284, top: 76 },
  diets: { left: 284, top: 80 },
  checkin: { left: 300, top: 30 },
  automation: { left: 284, top: 80 },
};
const crop = { width: 560, height: 600 };

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
  const { left, top } = crops[name];
  const detail = await sharp(path.join(source, `${name}-desktop.png`)).extract({ left: left * 2, top: top * 2, width: crop.width * 2, height: crop.height * 2 }).png().toBuffer();
  for (const width of [420, 840]) {
    await write(sharp(detail).resize({ width }), path.join(output, `${name}-crop-${width}`));
  }
}

console.log('Capturas de Trainers optimizadas en public/images/trainers.');
