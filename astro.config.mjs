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
    // Tailwind v4's plugin types against another Vite version; the cast avoids
    // the false ts(2322) without turning off @ts-check.
    // The position editor only runs on `serve` (see the plugin).
    plugins: [/** @type {any} */ (tailwindcss()), /** @type {any} */ (diagramLayoutEditor())],
    build: {
      // Vite 8 minifies CSS with Lightning CSS, which folds animation-timeline
      // into the `animation` shorthand. That syntax was dropped from the spec,
      // so browsers reject the whole declaration and every scroll-driven
      // animation dies in the build. esbuild leaves the longhand alone.
      cssMinify: 'esbuild'
    }
  }
});
