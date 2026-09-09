// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  /**
   * Publication sur GitHub Pages, depot de projet.
   *
   * Le site est servi sous https://wendlac.github.io/rakiire/ et non a la
   * racine du domaine. `base` prefixe donc tout ce qu'Astro genere, et le
   * code applicatif doit passer par `lien()` (src/lib/i18n.ts) plutot que
   * d'ecrire une adresse absolue en dur — sans quoi elle pointerait a cote.
   *
   * Le jour d'une mise en ligne sur un domaine propre, ces deux lignes
   * deviennent `site: 'https://…'` et `base: '/'`, et rien d'autre ne bouge.
   */
  site: "https://wendlac.github.io",
  base: "/rakiire",

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
