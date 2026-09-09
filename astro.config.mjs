// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    // Astro embarque sa propre copie de Vite : le greffon Tailwind est typé
    // contre l'autre. Les deux types sont structurellement identiques, seul le
    // chemin d'import diffère, d'où cette assertion. À retirer le jour où les
    // deux paquets convergent sur la même version de Vite.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
