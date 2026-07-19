// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://rbvn.vercel.app',
  vite: {
    // El plugin de Tailwind v4 se tipa contra otra versión de Vite; el cast
    // evita el falso positivo de ts(2322) sin desactivar @ts-check.
    plugins: [/** @type {any} */ (tailwindcss())]
  }
});
