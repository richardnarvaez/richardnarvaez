// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://rbvn.vercel.app',
  // Casos de estudio en MDX (src/content/work): texto + componentes propios.
  integrations: [mdx()],
  vite: {
    // El plugin de Tailwind v4 se tipa contra otra versión de Vite; el cast
    // evita el falso positivo de ts(2322) sin desactivar @ts-check.
    plugins: [/** @type {any} */ (tailwindcss())]
  }
});
