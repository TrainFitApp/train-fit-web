# TrainFit — sistema visual

## Dirección: training journal digital

TrainFit se presenta como un cuaderno de rendimiento digital: preciso, directo y construido alrededor de evidencia real del producto. La interfaz alterna superficies oscuras de producto con capítulos editoriales claros y un único capítulo naranja de progreso. Ese cambio de material crea ritmo sin depender de tarjetas, efectos decorativos o patrones SaaS genéricos.

La narrativa visual sigue el producto:

1. Entrenamiento: planificar y ejecutar.
2. Nutrición: entender el día completo.
3. Progreso: registrar, entender y progresar.
4. Entrenadores: leer el mismo proceso desde una perspectiva profesional.

Los mockups reales son contenido, no decoración. El texto explica el contexto; las pantallas demuestran la funcionalidad.

## Tipografía

| Uso | Familia | Tratamiento |
| --- | --- | --- |
| Interfaz, titulares y texto | Bricolage Grotesque Variable | Peso 300–720, titulares compactos, tracking entre `-0.035em` y `-0.04em` |
| Datos y metadatos | Geist Mono Variable | Solo métricas, leyendas, etiquetas operativas y disponibilidad; nunca como disfraz “tech” |

Escala global:

- Display: `clamp(3.3rem, 7vw, 6rem)`, `0.94` de interlineado.
- Headline: `clamp(2.5rem, 5vw, 5.25rem)`, `0.98` de interlineado.
- Subhead: `clamp(1.5rem, 2.5vw, 2.5rem)`, `1.08` de interlineado.
- Lede: `clamp(1.08rem, 1.6vw, 1.3rem)`, `1.55` de interlineado.
- Texto base: `1rem`, `1.6` de interlineado.

El límite de titulares es `6rem`. La home usa contrastes de peso —no cambios arbitrarios de familia— para separar la afirmación principal de su resolución.

## Tokens

### Color

| Token | Valor | Uso |
| --- | --- | --- |
| `--color-bg` | `#0f0f0f` | Fondo base |
| `--color-surface` | `#141414` | Superficie secundaria |
| `--color-elevated` | `#1a1a1a` | Diálogos y elementos elevados |
| `--color-muted` | `#252525` | Estado hover discreto |
| `--color-text` | `#f7f7f4` | Texto principal |
| `--color-text-soft` | `#c7c7c2` | Texto secundario |
| `--color-text-muted` | `#8b8b87` | Metadatos |
| `--color-border` | `rgba(255,255,255,.13)` | Divisores estructurales |
| `--color-border-strong` | `rgba(255,255,255,.22)` | Controles y límites destacados |
| `--color-accent` | `#fe9000` | CTA, foco y capítulo de progreso |
| `--color-accent-hover` | `#ff9f20` | Hover del CTA principal |
| `--color-protein` | `#6aa9ff` | Proteína |
| `--color-carbs` | `#67d391` | Carbohidratos |
| `--color-fat` | `#ffc455` | Grasas |
| `--color-paper` | `#ebe8df` | Capítulos editoriales claros |
| `--color-paper-muted` | `#cbc7bc` | Texto secundario sobre papel |

El naranja no es un fondo recurrente ni un recurso decorativo. Se reserva para la acción principal, el foco, señales de marca y el capítulo que materializa el progreso. Los colores nutricionales solo aparecen vinculados a datos de macronutrientes.

### Geometría y ritmo

- Contenedor: `73.75rem` / 1180 px.
- Gutter fluido: `clamp(1.25rem, 4vw, 3rem)`.
- Sección: `clamp(6rem, 11vw, 10rem)`.
- Sección compacta: `clamp(4rem, 8vw, 7rem)`.
- Radios: `0.5rem`, `0.875rem`, `1.5rem`.
- Altura del header: `4.75rem`; `4.25rem` en móvil.
- Unidad de espaciado conceptual: 4 px. Los valores fluidos preservan ese ritmo en los tres tamaños.

Los bordes son finos y estructurales. No se usan sombras para separar secciones; la única sombra amplia pertenece al diálogo modal, donde comunica elevación real.

## Layout y ritmo editorial

El sistema parte de una retícula de 12 columnas, pero cada capítulo la interpreta de forma distinta:

- Hero asimétrico: mensaje editorial y `MockUpHeaderHeo` dominante.
- Manifiesto en papel: afirmación amplia + explicación compacta.
- Entrenamiento: encabezado a tres columnas y secuencia de dispositivos escalonada.
- Nutrición: capítulo claro y reel de tres pantallas.
- Progreso: composición binaria sobre naranja, con el producto frente a un titular secuencial.
- Entrenadores: consola lineal B2B, sin simular una aplicación ni inventar datos.
- Cierre: titular amplio y una única acción.

Breakpoints implementados:

- Escritorio: por encima de `62rem`; composiciones completas.
- Tablet: hasta `62rem`; layouts principales pasan a una columna.
- Navegación compacta: hasta `52rem`.
- Móvil: hasta `48rem`; tipografía, spacing, footer y composición de mockups específicos.

En móvil, los grupos de pantallas pasan a reels horizontales con `scroll-snap`. El desplazamiento pertenece al componente y no produce overflow de página.

## Tratamiento de mockups

- Formato canónico de teléfono: `9 / 16`.
- Dimensiones explícitas: `540 × 960`.
- Render: `width: 100%`, `height: auto`, `object-fit: contain`.
- Nunca se fuerza el ancho y el alto simultáneamente ni se recorta una pantalla informativa.
- AVIF y WebP responsivos a `360w` y `540w` para pantallas individuales.
- Carga diferida fuera del hero y `decoding="async"`.
- El hero usa variantes responsivas `480w`, `760w` y `1080w`, con prioridad alta.
- Los textos alternativos describen la función mostrada; logos y decoración usan alt vacío.

El escalonado vertical crea una lectura secuencial sin inclinar ni deformar dispositivos. En móvil se elimina el escalonado y cada mockup conserva su relación de aspecto completa.

## Componentes y estados

### Botones

- Altura táctil mínima: 48 px; 52 px en móvil.
- Primario: naranja sólido y texto oscuro.
- Secundario: fondo casi transparente y borde visible.
- Hover: cambio de color/borde y desplazamiento máximo de 1 px en dispositivos con puntero preciso.
- Active: `scale(.97)`.
- Focus-visible: contorno naranja de 2 px con offset de 4 px.
- Disabled: opacidad `.45`, cursor bloqueado y sin transformación.

### Enlaces

Los enlaces editoriales usan subrayado fino o una flecha diagonal. El movimiento de la flecha es de 2 px y no sustituye el indicador visual del enlace.

### Navegación

Header sticky, contraste oscuro y estado actual mediante una línea naranja. En móvil, el botón de menú mantiene `aria-expanded`, controla el panel por `aria-controls` y ofrece objetivos de 48 px.

### Descarga

En móvil se abre directamente la tienda correcta. En escritorio se usa un `<dialog>` nativo con cierre explícito, Escape, backdrop, restauración de foco y enlaces reales a App Store y Google Play.

## Motion

El movimiento explica entrada, jerarquía y continuidad; no mantiene elementos flotando.

- Easing de entrada: `cubic-bezier(.22, 1, .36, 1)`.
- Easing de interacción: `cubic-bezier(.4, 0, .2, 1)`.
- Controles: 140 ms.
- Reveal: 520 ms, combinando opacidad, transformación corta y desenfoque de 4 px.
- Momento principal: los mockups aparecen por scroll con `view-timeline`, `clip-path`, opacidad y traslación vertical.
- Las animaciones de hover se reservan a `(hover: hover) and (pointer: fine)` cuando forman parte del sistema global.

Con `prefers-reduced-motion: reduce`, el scroll suave se desactiva, los reveals quedan visibles inmediatamente y las animaciones de dispositivos pierden `clip-path` y transformaciones.

## Accesibilidad

- HTML semántico y un H1 por página.
- Skip link visible al recibir foco.
- `:focus-visible` global de alto contraste.
- Jerarquía de headings preservada.
- Regiones y reels informativos etiquetados mediante `aria-label`.
- Objetivos táctiles mínimos de 48 px.
- Contraste WCAG AA sobre fondos oscuros, papel y naranja.
- Navegación por teclado en menú y diálogo.
- Contenido legible y funcional sin motion.
- Imágenes informativas con alt descriptivo; decoración ignorada por tecnologías asistivas.

## Guardrails anti-slop

Antes de añadir un elemento, debe demostrar una función de comprensión, orientación, confianza o conversión.

- No repetir el patrón “eyebrow + titular + tres cards”.
- No usar tarjetas como contenedor por defecto.
- No usar gradientes, glassmorphism o blur ornamental.
- No usar fondos de retícula genéricos, halos o blobs.
- No usar mono para titulares o para simular tecnología.
- No añadir iconos, pills, badges o métricas sin información real.
- No inventar testimonios, cifras, precios, demos ni funciones.
- No repetir el mismo layout entre capítulos.
- No convertir el naranja en color de superficie habitual.
- No recortar, inclinar ni deformar pantallas del producto.
- No aplicar animación constante; cada movimiento debe tener inicio y final.
- No mostrar calculadoras ni enlaces relacionados con ellas.

La prueba final es simple: si una decisión no ayuda a ver el producto, entender el proceso o avanzar hacia la descarga, se elimina.
