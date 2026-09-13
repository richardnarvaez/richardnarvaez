// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

import { diagramLayoutEditor } from './scripts/diagram-layout-plugin.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://rbvn.vercel.app',
  // Casos de estudio en MDX (src/content/work): texto + componentes propios.
  integrations: [mdx()],
  vite: {
    // El plugin de Tailwind v4 se tipa contra otra versión de Vite; el cast
    // evita el falso positivo de ts(2322) sin desactivar @ts-check.
    // El editor de posiciones solo se activa en `serve` (ver el plugin).
    plugins: [/** @type {any} */ (tailwindcss()), /** @type {any} */ (diagramLayoutEditor())]
  }
});
