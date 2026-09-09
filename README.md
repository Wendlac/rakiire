# Rakiire — site

Catalogue premium, commande sur WhatsApp. Astro + Tailwind, bilingue
français / anglais.

**En ligne :** https://wendlac.github.io/rakiire/

Publié par GitHub Pages à chaque envoi sur `main`, via
`.github/workflows/deploiement.yml`. Le dossier `dist/` n'est pas versionné :
c'est le workflow qui construit.

## Démarrer

```bash
npm install
npm run dev
```

```bash
npm run build     # construit dans dist/
npm run preview   # sert le build
npm run check     # vérification des types
```

## Pages

| Adresse | Écran |
|---|---|
| `/` · `/en/` | Accueil |
| `/boutique` · `/en/shop` | Catalogue filtrable |
| `/produit/<réf>` · `/en/product/<réf>` | Fiche produit |
| `/panier` · `/en/cart` | Panier et bascule WhatsApp |
| `/histoire` · `/en/story` | Notre histoire |
| `/lookbook` · `/en/lookbook` | Lookbook et brief photo |
| `/faq` · `/en/faq` | Questions fréquentes |
| `/contact` · `/en/contact` | Contact |
| `/mentions` · `/en/legal` | Mentions légales |
| `/design-system` | Documentation du système |

29 pages statiques. Environ 8 Ko de CSS et 25 Ko de JavaScript.

## Organisation

```
src/
  styles/
    tokens.css      Tous les tokens de design. Le seul fichier à modifier
                    pour faire évoluer la charte.
    fonts.css       Chargement des deux fontes, auto-hébergées : aucune
                    requête vers un tiers, aucune adresse IP transmise
  fonts/            Fichiers .woff2 et leurs licences (LICENCES.md)
    base.css        Socle : éléments, focus, mouvement, prose, utilitaires
    global.css      Point d'entrée unique
  lib/
    catalogue.ts    Contrat de données produit, collections, tailles, couleurs
    i18n.ts         Dictionnaire bilingue et adresses traduites
    prix.ts         Formatage en francs CFA
    whatsapp.ts     Composition du message de commande
    panier.ts       Panier persistant, côté navigateur uniquement
  data/
    produits.ts     LE CATALOGUE — contenu d'exemple à remplacer
    mentions.ts     Identité légale — VIDE, à compléter
    audience.ts     Mesure d'audience — ÉTEINTE, prête à activer
    reseaux.ts      Comptes Facebook et TikTok — vides
  components/ui/    Composants du design system
  components/doc/   Composants de la documentation uniquement
  vues/             Les pages, partagées entre le français et l'anglais
  pages/            Routes minces qui appellent les vues
  layouts/          Base.astro (document) et Page.astro (en-tête, menu, pied)
docs/
  cadrage.md            Décisions de projet
  apercu-prototype.html Aperçu autonome des neuf écrans, à ouvrir d'un
                        double-clic. Fonte et visuels intégrés : aucune
                        connexion requise. Instantané, pas une source —
                        en cas de divergence, le site fait foi.
```

## Bloquant avant la mise en ligne

- [ ] **Identité légale.** `src/data/mentions.ts` est vide : raison sociale,
      forme juridique, siège, RCCM, IFU, directeur de la publication. Rien n'a
      été inventé — un numéro d'enregistrement fabriqué serait une fausse
      mention officielle. Tant qu'un champ manque, la page `/mentions` affiche
      un avertissement rouge et signale chaque trou à sa place exacte.
- [ ] **Catalogue réel.** `src/data/produits.ts` contient six articles
      d'exemple. Noms, descriptions, prix et compositions sont à remplacer.
- [ ] **Photos produit.** `src/images/` contient douze photographies de banque,
      versées pour que le prototype se présente avec de vraies images. **Aucun
      vêtement montré n'est un produit Rakiire**, et l'une d'elles porte un
      monogramme de marque reconnaissable. À remplacer intégralement.

      Après la séance photo :

      1. `node scripts/preparer-images.mjs <dossier-des-photos>` — réduit à
         1800 px et renomme selon l'orientation.
      2. Mettre à jour les visuels et leurs textes alternatifs dans
         `src/data/produits.ts`. Les `alt` décrivent ce que la photo montre,
         jamais un article du catalogue : un lecteur d'écran ne doit pas
         entendre « tee-shirt Nasara » devant une image qui montre autre chose.

      Les cadrages attendus pour la séance sont décrits sur `/lookbook`.
- [ ] **Nom de domaine.** Le site est aujourd'hui servi sous le sous-chemin
      `/rakiire`, déclaré par `base` dans `astro.config.mjs`. Sur un domaine
      propre, cette ligne devient `base: "/"` et l'hébergeur doit être corrigé
      dans `src/data/mentions.ts` — une mention légale qui nomme le mauvais
      hébergeur est fausse.

## Informations commerciales à arrêter

La FAQ renvoie aujourd'hui ces trois points à la conversation WhatsApp. C'est
honnête tant que les règles n'existent pas, et à remplacer par des réponses
fermes dès qu'elles existeront.

- [ ] Délais de livraison par ville
- [ ] Frais de livraison
- [ ] Conditions d'échange et de retour

## Optionnel

- [ ] Comptes Facebook et TikTok dans `src/data/reseaux.ts`. Un réseau sans
      adresse n'est pas affiché du tout : aucun lien mort n'est publié.
- [ ] Activer la mesure d'audience — tout est câblé, il manque un compte.
      Ouvrir `src/data/audience.ts`, choisir un fournisseur et coller
      l'identifiant. Trois options y sont documentées : GoatCounter (gratuit),
      Plausible (payant), Umami (gratuit ou auto-hébergé). Toutes mesurent sans
      cookie.

      Les mentions légales suivent automatiquement : la section « Mesure
      d'audience » apparaît et la phrase affirmant qu'aucune donnée ne quitte
      l'appareil se corrige d'elle-même. Rien à réécrire à la main.
- [ ] Guide des tailles avec mesures en centimètres.
- [ ] Relire la traduction anglaise des textes de marque.

## Faire évoluer la charte

Tout part de `src/styles/tokens.css`.

1. Les couleurs de marque sont dans le bloc 1. Elles viennent de la charte et ne
   se modifient qu'avec elle.
2. Les rôles sémantiques sont dans le bloc 4. **Le code applicatif n'utilise que
   ces noms** : `--color-texte-secondaire`, jamais `--color-encre-70`. Changer
   l'affectation d'un rôle se fait donc à un seul endroit.
3. Avant d'introduire une couleur, mesurer son contraste. Seuils retenus : 3.0
   pour une bordure ou une icône, 4.5 pour un texte.

## Ajouter une page

1. Créer la vue dans `src/vues/`.
2. Déclarer son segment dans les deux langues dans `segments`, sur
   `src/lib/i18n.ts`. Les deux objets ont les mêmes clés : oublier une langue
   devient une erreur de compilation.
3. Créer les deux routes dans `src/pages/` et `src/pages/en/`.
4. Ajouter le lien dans `src/layouts/Page.astro` — seul endroit où la navigation
   est déclarée.

## Contraintes non négociables

- **Cible tactile de 44 px** sur tout élément interactif.
- **Anneau de focus encre**, jamais supprimé, jamais orange.
- **Aucun sens porté par la seule couleur.**
- **Mouvement désactivable** sous `prefers-reduced-motion`.
- **Aucune allégation d'origine de fabrication** dans les contenus. La ligne de
  composition décrit la matière et le grammage, jamais la provenance.
