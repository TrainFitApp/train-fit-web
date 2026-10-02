import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

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

test('selector de tiendas es accesible', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Desktop abre selector; móvil enlaza a tienda.');
  await page.goto('/');
  await page.getByRole('link', { name: 'Descargar TrainFit', exact: true }).first().click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('link', { name: /App Store/ })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('home no tiene infracciones axe graves', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((violation) => ['critical', 'serious'].includes(violation.impact ?? ''))).toEqual([]);
});

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
