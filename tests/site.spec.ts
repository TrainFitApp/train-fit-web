import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { SITE } from '../src/data/site';

const routes = [
  '/', '/entrenamiento/', '/nutricion/', '/progreso/', '/entrenadores/',
  '/descargar/', '/sobre-trainfit/', '/contacto/', '/terminos/', '/privacidad/',
];

for (const route of routes) {
  test(`${route} renderiza con SEO y sin overflow`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(`trainfit\\.net${route.replaceAll('/', '\\/')}`));
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test('home comunica producto y usa hero requerido', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/entrenamiento/i);
  await expect(page.locator('.hero__product img')).toHaveAttribute('src', '/images/hero-1080.webp');
  await expect(page.getByRole('heading', { name: /Registrar.*Entender.*Progresar/s })).toBeVisible();
});

test('hero: titular, texto y botones no se solapan con la imagen', async ({ page }) => {
  await page.goto('/');
  const image = await page.locator('.hero__product img').boundingBox();
  const viewport = page.viewportSize()!;
  expect(image).not.toBeNull();
  expect(image!.x).toBeGreaterThanOrEqual(0);
  expect(image!.x + image!.width).toBeLessThanOrEqual(viewport.width);
  for (const selector of ['.hero h1', '.hero__copy > p', '.hero__actions']) {
    const box = (await page.locator(selector).boundingBox())!;
    const overlaps = box.x < image!.x + image!.width && image!.x < box.x + box.width
      && box.y < image!.y + image!.height && image!.y < box.y + box.height;
    expect(overlaps, `${selector} se solapa con la imagen`).toBe(false);
  }
});

test('todos los accesos de descarga llevan a /descargar/', async ({ page }) => {
  for (const route of ['/', '/entrenamiento/', '/sobre-trainfit/']) {
    await page.goto(route);
    const links = page.locator('a').filter({ hasText: /^Descargar/ });
    expect(await links.count()).toBeGreaterThan(0);
    for (const href of await links.evaluateAll((items) => items.map((item) => item.getAttribute('href')))) {
      expect(href).toBe('/descargar/');
    }
  }
  await expect(page.locator('dialog')).toHaveCount(0);
});

test('descarga: página propia con las tiendas reales', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Descargar TrainFit', exact: true }).first().click();
  await expect(page).toHaveURL(/\/descargar\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Descarga TrainFit');
  await expect(page.getByRole('link', { name: /App Store/ })).toHaveAttribute('href', SITE.appStore);
  await expect(page.getByRole('link', { name: /Google Play/ })).toHaveAttribute('href', SITE.playStore);
  await page.getByRole('link', { name: 'Conocer TrainFit Trainers' }).click();
  await expect(page).toHaveURL(/\/entrenadores\/$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/descargar\/$/);
});

test('entrenadores: capturas reales con título y siguiente paso', async ({ page }) => {
  await page.goto('/entrenadores/');
  const figures = page.locator('main figure');
  await expect(figures).toHaveCount(6);
  for (const figure of await figures.all()) {
    await expect(figure.locator('figcaption b')).not.toBeEmpty();
    await expect(figure.locator('img')).toHaveAttribute('alt', /.+/);
  }
  await expect(page.getByRole('link', { name: 'Solicitar acceso' }).first()).toHaveAttribute('href', /^mailto:suggestions@trainfit\.net\?subject=/);
  await expect(page.getByRole('link', { name: 'Ver la app de cliente' })).toHaveAttribute('href', '/descargar/');
});

test('menú móvil navega entre secciones', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'desktop', 'El menú compacto solo existe por debajo de 52rem.');
  await page.goto('/');
  const button = page.getByRole('button', { name: 'Abrir navegación' });
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Entrenadores' }).click();
  await expect(page).toHaveURL(/\/entrenadores\/$/);
  await expect(page.locator('.site-nav a[aria-current="page"]')).toHaveText('Entrenadores');
});

for (const route of ['/', '/descargar/', '/entrenadores/']) {
  test(`${route} no tiene infracciones axe graves`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((violation) => ['critical', 'serious'].includes(violation.impact ?? ''))).toEqual([]);
  });
}

test('calculadoras no forman parte del producto nuevo', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body')).not.toContainText(/calculadora de calorías|calculadora de 1RM/i);
  await page.goto('/calculadoras/');
  await expect(page).toHaveURL(/\/calculadoras\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('no existe');
});

test('reduced motion deja contenido visible', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('.reveal').first()).toBeVisible();
  await context.close();
});
