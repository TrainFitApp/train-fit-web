import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const source = path.join(root, 'images');
const output = path.join(root, 'public', 'images');
const brand = path.join(root, 'public', 'brand');
await mkdir(output, { recursive: true });
await mkdir(brand, { recursive: true });

const mockups = {
  'MockUpCurrentWorkout.png': 'workout-detail',
  'MockUpCurrentWorkout2.png': 'workout-session',
  'MockUpSummary.png': 'workout-summary',
  'MockUpMesocicle.png': 'mesocycle',
  'MockUpconfigExercise.png': 'exercise-config',
  'MockUpSearchExercise.png': 'exercise-search',
  'MockUpObjetivosNutri.png': 'nutrition-goals',
  'MockUpDietsl.png': 'nutrition-diary',
  'MockUpSearchFoods.png': 'food-search',
  'MockUpPerfil.png': 'profile-progress',
};

for (const [file, name] of Object.entries(mockups)) {
  for (const width of [360, 540]) {
    const image = sharp(path.join(source, file)).resize({ width, withoutEnlargement: true });
    await image.clone().avif({ quality: 65, effort: 6 }).toFile(path.join(output, `${name}-${width}.avif`));
    await image.clone().webp({ quality: 78, effort: 6 }).toFile(path.join(output, `${name}-${width}.webp`));
  }
}

const heroSource = path.join(source, 'MockUpHeaderHeo.png');
for (const width of [480, 760, 1080]) {
  const image = sharp(heroSource).resize({ width, withoutEnlargement: true });
  await image.clone().avif({ quality: 68, effort: 6 }).toFile(path.join(output, `hero-${width}.avif`));
  await image.clone().webp({ quality: 80, effort: 6 }).toFile(path.join(output, `hero-${width}.webp`));
}

await sharp(path.join(source, 'getApple.png')).resize({ width: 396 }).webp({ quality: 88 }).toFile(path.join(output, 'store-apple.webp'));
await sharp(path.join(source, 'getGoogle.png')).resize({ width: 400 }).webp({ quality: 88 }).toFile(path.join(output, 'store-google.webp'));

const logo = path.join(root, '..', 'train-fit-front', 'apps', 'train-fit-front', 'src', 'assets', 'Solo_Logo_dark.png');
await sharp(logo).resize(256, 256, { fit: 'contain' }).png().toFile(path.join(brand, 'logo-mark.png'));
await sharp(logo).resize(32, 32, { fit: 'contain' }).png().toFile(path.join(brand, 'favicon-32.png'));
await sharp(logo).resize(180, 180, { fit: 'contain' }).png().toFile(path.join(brand, 'apple-touch-icon.png'));

const heroForOg = await sharp(heroSource).resize({ width: 620 }).png().toBuffer();
const logoForOg = await sharp(logo).resize({ width: 72, height: 72, fit: 'contain' }).png().toBuffer();
const overlay = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#0f0f0f"/>
    <path d="M64 64h64" stroke="#fe9000" stroke-width="5"/>
    <text x="64" y="210" fill="#f7f7f4" font-family="Arial, sans-serif" font-size="70" font-weight="700">Entrenamiento,</text>
    <text x="64" y="290" fill="#f7f7f4" font-family="Arial, sans-serif" font-size="70" font-weight="700">nutrición y progreso.</text>
    <text x="64" y="370" fill="#fe9000" font-family="Arial, sans-serif" font-size="70" font-weight="700">Conectados.</text>
    <text x="64" y="500" fill="#c7c7c2" font-family="Arial, sans-serif" font-size="28">TrainFit</text>
  </svg>`);
await sharp(overlay)
  .composite([
    { input: heroForOg, left: 650, top: 5 },
    { input: logoForOg, left: 64, top: 510 },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(path.join(output, 'og-trainfit.jpg'));

console.log('Assets optimizados en public/images y public/brand.');
