# Rakiiré — Document de cadrage

> Version 1 — 7 septembre 2026. Toute décision ici est réputée validée sauf mention « à arbitrer ».

## 1. Marque

| | |
|---|---|
| Nom | Rakiiré |
| Slogan | *Le choix d'être soi* |
| Origine du nom | Le cousinage à plaisanterie burkinabè — **assumé en interne, jamais explicité sur le site** |
| Promesse | Des vêtements premium pour une clientèle qui veut se distinguer sur le plan identitaire |
| Ton | Vouvoiement, français soutenu |
| Inspirations citées | Zara, BonneGueule, Sézane, Denim Tears, Fear of God |

### Position sur l'origine des produits
Les tee-shirts sont actuellement importés de Chine. **Le site ne fera donc aucune allégation de fabrication locale, de coton burkinabè ou d'artisanat.** On ne ment pas sur l'origine et on ne la met pas non plus en avant : le récit porte sur l'identité et le style, pas sur la chaîne de production. Ce silence est tenable tant qu'aucune promesse contraire n'est faite.

## 2. Marché

- **Vente** : Burkina Faso (le reste de la sous-région suivra — l'architecture doit le permettre sans refonte)
- **Livraison** : Burkina Faso et Côte d'Ivoire
- **Devise** : F CFA uniquement, format `15 000 F CFA` (espace insécable comme séparateur de milliers)
- **Fourchette** : 10 000 à 75 000 F CFA
- **Paiement** : mobile money, réglé hors site pendant la conversation WhatsApp
- **Langues** : bilingue français / anglais. Français par défaut sur `/`, anglais sur `/en/`

## 3. Catalogue

### État actuel
Tee-shirts uniquement. 4 à 5 photos disponibles, de qualité provisoire, à remplacer après le shooting.

### Collections
- Ethnic Rakiiré Classic
- Ethnic Rakiiré Jean

### Attributs produit
- **Couleurs** : noir, blanc
- **Tailles** : S, M, L, XL, XXL, 3XL
- **Coupes** : homme, femme

### Référence produit (SKU)
Format : `RKR-<COLLECTION>-<NUM>-<COULEUR>-<TAILLE>`

| Segment | Valeurs |
|---|---|
| Collection | `CLS` (Classic), `JEA` (Jean) |
| Numéro | 3 chiffres, incrémental dans la collection |
| Couleur | `NR` (noir), `BL` (blanc) |
| Taille | `S`, `M`, `L`, `XL`, `2XL`, `3XL` |

Exemple : `RKR-CLS-001-NR-L`

La référence courte `RKR-CLS-001` désigne le modèle ; la référence longue désigne la variante commandée et c'est elle qui part dans le message WhatsApp.

### Disponibilité
Un indicateur `disponible` par variante. Une variante indisponible reste visible mais non sélectionnable, avec la mention « Épuisé ».

### Mise à jour du catalogue
Le gestionnaire est le propriétaire de la marque, non développeur. Workflow retenu pour la version 1 :

1. Les produits vivent dans des fichiers de données versionnés, avec un schéma validé au build (une erreur de saisie casse le build plutôt que le site en production).
2. Modification via l'éditeur web de GitHub — aucun outil à installer.
3. Vercel redéploie automatiquement à chaque enregistrement.

Un espace d'administration viendra dans un second temps.

## 4. Parcours de commande

Aucun paiement sur le site. Le site est un catalogue avec panier ; la transaction se conclut sur WhatsApp.

### Étapes
1. Le visiteur parcourt le catalogue
2. Il choisit une couleur et une taille, puis ajoute au panier
3. Le panier **persiste à la fermeture du navigateur**
4. Avant de basculer, un formulaire court demande **nom** et **ville** (le téléphone est récupéré nativement par WhatsApp)
5. Le message est pré-rempli et la conversation s'ouvre

### Numéro
`+226 64451251` — lien `https://wa.me/22664451251?text=…`
Compte classique aujourd'hui, à structurer en WhatsApp Business.

### Format du message

```
Bonjour 👋
Je souhaite commander :

2 × Tee-shirt Nasara — Noir — Taille L
Réf. RKR-CLS-001-NR-L
Prix unitaire : 15 000 F CFA

1 × Tee-shirt Wendé — Blanc — Taille M
Réf. RKR-CLS-002-BL-M
Prix unitaire : 12 000 F CFA

Total : 42 000 F CFA

Nom : ...
Ville : ...
```

Le message est traduit selon la langue active du site.

### Repli si WhatsApp est absent
Sur poste fixe sans WhatsApp installé, une fenêtre propose :
- l'ouverture de WhatsApp Web
- un QR code pointant vers la conversation pré-remplie
- la copie du message dans le presse-papiers, avec le numéro affiché en clair

## 5. Pages

| Page | Rôle |
|---|---|
| Accueil | Récit de marque, collections, sélection de produits |
| Boutique | Catalogue filtrable |
| Produit | Photos, prix, sélection couleur/taille, ajout au panier |
| Panier | Récapitulatif, formulaire nom/ville, bascule WhatsApp |
| Notre histoire | Récit de marque |
| Lookbook | Galerie éditoriale |
| FAQ | Livraison, paiement, tailles, échanges |
| Contact | WhatsApp, réseaux, formulaire |
| Mentions légales | Obligations |

Réseaux à connecter : **Facebook** et **TikTok**.

## 6. Contraintes techniques

| Sujet | Décision |
|---|---|
| Framework | Astro + Tailwind |
| Hébergement | Vercel |
| Domaine | Non réservé — à faire |
| Typographies | Google Fonts uniquement |
| Mode sombre | Non |
| Caractères spéciaux | Aucun pour l'instant (pas de ɛ ɔ ŋ) |
| Accessibilité | WCAG AA |
| Animations | Marquées au scroll, avec respect de `prefers-reduced-motion` |
| Analytics | Sans cookie et respectueux de la vie privée |
| Performance | Cible : usage mobile en 3G/4G, images en AVIF/WebP, chargement différé |

## 7. Direction artistique

**Luxe silencieux.** Noir, blanc, ivoire. Pas de couleur d'accent décorative. Typographie à empattements pour l'éditorial, grandes respirations, photographie plein cadre.

Principe directeur retenu face aux collections « Ethnic » : **l'interface se tait pour que le vêtement parle.** Si les produits portent des motifs ou des couleurs, ils sont la seule source de couleur de la page. Le site est le mur blanc de la galerie, jamais le tableau.

La charte de marque existante fait autorité sur cette direction en cas de conflit.

## 8. Calendrier

Échéance annoncée : **12 septembre 2026**. Premières versions attendues avant.

| Jour | Livrable |
|---|---|
| J1 | Design system : tokens, typographie, grille, composants, page de documentation |
| J2–J3 | ~~Écrans clés : accueil, boutique, produit, panier~~ — **fait le 7 septembre**, bilingue FR/EN |
| J4 | ~~Logique de panier, bascule WhatsApp~~ — **fait**. Reste : catalogue réel et photos |
| J5 | ~~Pages éditoriales~~ — **faites le 9 septembre**. Reste : contenus réels, identité légale, mise en ligne |

## 9. En attente

- [x] ~~Charte graphique complète~~ — reçue le 7 septembre, intégrée en tokens
- [x] ~~Logo SVG~~ — reçu, recadré, symbole extrait
- [x] ~~Fichiers Satoshi~~ — installés dans `public/fonts/`, fontes variables 300–900
- [x] ~~Orthographe du nom~~ — **« Rakiire » à l'écrit, sans accent**, conformément au logotype et à la charte. « Rakiiré » n'est que la prononciation et n'apparaît nulle part dans les contenus.
- [ ] Photos produit provisoires
- [ ] Noms et prix des premiers modèles
- [ ] Traduction anglaise des contenus
- [ ] Nom de domaine
