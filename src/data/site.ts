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

export const NAV_ITEMS = [
  { href: '/entrenamiento/', label: 'Entrenamiento' },
  { href: '/nutricion/', label: 'Nutrición' },
  { href: '/progreso/', label: 'Progreso' },
  { href: '/entrenadores/', label: 'Entrenadores' },
] as const;
