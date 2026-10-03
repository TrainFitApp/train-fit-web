export const SITE = {
  name: 'TrainFit',
  origin: 'https://trainfit.net',
  description:
    'Entrenamiento, nutrición y progreso en una sola app. Planifica, registra y entiende tu evolución con TrainFit.',
  email: 'suggestions@trainfit.net',
  appStore:
    'https://apps.apple.com/es/app/trainfit-gym-dieta-y-entreno/id6471257280',
  playStore:
    'https://play.google.com/store/apps/details?id=com.trainfit.trainfit',
  socials: {
    instagram: 'https://www.instagram.com/trainfit.app/',
    tiktok: 'https://www.tiktok.com/@trainfit.app',
    youtube: 'https://www.youtube.com/@trainfit',
  },
} as const;

// TrainFit Trainers es la herramienta de los profesionales (web aparte de la
// app). Su dominio público aún no está configurado, así que el único recorrido
// válido hoy es escribir a TrainFit: no se enlaza ni a registro ni a acceso.
export const TRAINERS = {
  name: 'TrainFit Trainers',
  contactHref: `mailto:${SITE.email}?subject=${encodeURIComponent('Acceso a TrainFit Trainers')}`,
} as const;

// Titular del sitio y del servicio (LSSI art. 10, RGPD art. 13). Un solo sitio para estos datos:
// las páginas legales los leen de aquí. Lo vacío se muestra como pendiente y NO debe publicarse así.
export const LEGAL = {
  holder: 'David Argente',
  holderType: 'persona física',
  nif: '',
  address: '',
  // Soporte, ejercicio de derechos de privacidad y consultas legales.
  supportEmail: 'soporte@trainfit.net',
  // Cobros, facturas y reembolsos de la suscripción de TrainFit Trainers.
  billingEmail: 'facturacion@trainfit.net',
} as const;

// Condiciones de contratación de TrainFit Trainers. Cada versión vive en su propia URL y no se
// edita una vez publicada: la facturación guarda qué URL aceptó cada entrenador (STRIPE_TERMS_URL).
export const TRAINERS_TERMS = {
  current: '2026-10',
  versions: [{ id: '2026-10', path: '/condiciones-trainers/2026-10/', label: 'Octubre de 2026', effective: 'Pendiente de publicación' }],
} as const;
export const TRAINERS_TERMS_PATH = TRAINERS_TERMS.versions.find((version) => version.id === TRAINERS_TERMS.current)!.path;

export const NAV_ITEMS = [
  { href: '/entrenamiento/', label: 'Entrenamiento' },
  { href: '/nutricion/', label: 'Nutrición' },
  { href: '/progreso/', label: 'Progreso' },
  { href: '/entrenadores/', label: 'Entrenadores' },
] as const;
