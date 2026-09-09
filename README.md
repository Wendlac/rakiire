# Rakiire — site

Catalogue premium, commande sur WhatsApp. Astro + Tailwind, déploiement Vercel.
Bilingue français / anglais.

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
    fonts.css       Chargement de Satoshi (auto-hébergée)
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
    reseaux.ts      Comptes Facebook et TikTok — vides
  components/ui/    Composants du design system
  components/doc/   Composants de la documentation uniquement
  vues/             Les pages, partagées entre le français et l'anglais
  pages/            Routes minces qui appellent les vues
  layouts/          Base.astro (document) et Page.astro (en-tête, menu, pied)
docs/
  cadrage.md        Décisions de projet
```

## Bloquant avant la mise en ligne

- [ ] **Identité légale.** `src/data/mentions.ts` est vide : raison sociale,
      forme juridique, siège, RCCM, IFU, directeur de la publication. Rien n'a
      été inventé — un numéro d'enregistrement fabriqué serait une fausse
      mention officielle. Tant qu'un champ manque, la page `/mentions` affiche
      un avertissement rouge et signale chaque trou à sa place exacte.
- [ ] **Catalogue réel.** `src/data/produits.ts` contient six articles
      d'exemple. Noms, descriptions, prix et compositions sont à remplacer.
- [ ] **Photos produit.** Renseigner `images` sur chaque article. Les cadrages
      attendus pour la séance photo sont décrits sur `/lookbook`.
- [ ] **Nom de domaine.**

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
- [ ] Mesure d'audience sans cookie. **Attention** : l'installer oblige à
      reprendre le paragraphe « Données personnelles » des mentions légales,
      qui affirme aujourd'hui qu'aucune donnée ne quitte l'appareil du visiteur.
- [ ] Guide des tailles avec mesures en centimètres.
- [ ] Auto-héberger Goudy Bookletter 1911 plutôt que de la servir depuis Google
      Fonts : un aller-retour réseau en moins, et aucune adresse IP de visiteur
      transmise à un tiers.
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
