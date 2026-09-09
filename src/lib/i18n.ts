/**
 * Bilingue français / anglais — Rakiire
 *
 * Le français est la langue par défaut et vit à la racine ; l'anglais vit sous
 * `/en/`. Ce choix est celui d'Astro (`prefixDefaultLocale: false`) et il a une
 * conséquence pratique : une adresse partagée sur WhatsApp sans préfixe ouvre
 * en français, ce qui est le cas majoritaire au Burkina et en Côte d'Ivoire.
 *
 * Le dictionnaire est un objet typé plutôt qu'un fichier de traduction chargé à
 * l'exécution : une clé manquante devient une erreur de compilation, pas une
 * chaîne vide découverte en production.
 */
import type { Langue } from "./catalogue";

export const LANGUES: Langue[] = ["fr", "en"];

export const dictionnaire = {
  fr: {
    /* Navigation */
    menu: "Menu",
    fermer: "Fermer",
    accueil: "Accueil",
    boutique: "Boutique",
    collections: "Collections",
    lookbook: "Lookbook",
    histoire: "Notre histoire",
    faq: "Questions fréquentes",
    contact: "Contact",
    mentions: "Mentions légales",
    livraison: "Livraison et paiement",

    /* Panier */
    panier: "Panier",
    panierVide: "Votre panier est vide.",
    panierVideSuite: "Parcourez la boutique pour composer votre commande.",
    articles: "articles",
    article: "article",
    total: "Total",
    retirer: "Retirer",
    retirerArticle: "Retirer cet article du panier",
    viderPanier: "Vider le panier",
    continuer: "Poursuivre mes achats",

    /* Produit */
    ajouterAuPanier: "Ajouter au panier",
    ajoute: "Ajouté au panier",
    choisirTaille: "Choisissez une taille",
    couleur: "Couleur",
    taille: "Taille",
    quantite: "Quantité",
    epuise: "Épuisé",
    nouveau: "Nouveau",
    indisponible: "Indisponible",
    reference: "Référence",
    composition: "Composition",
    detailsLivraison: "Livraison et paiement",

    /* Commande */
    commander: "Commander sur WhatsApp",
    finaliser: "Finaliser la commande",
    vosCoordonnees: "Vos coordonnées",
    nomComplet: "Nom complet",
    ville: "Ville de livraison",
    villeAide: "Ouagadougou, Bobo-Dioulasso, Abidjan…",
    nomRequis: "Merci d’indiquer votre nom pour préparer la commande.",
    villeRequise: "Merci d’indiquer votre ville pour estimer la livraison.",
    apercuMessage: "Aperçu du message",
    commentCaMarche: "Comment se passe la commande",

    /* Repli WhatsApp */
    repliTitre: "Ouvrir la conversation",
    repliTexte:
      "Si WhatsApp ne s’est pas ouvert, utilisez l’une de ces solutions.",
    ouvrirWeb: "Ouvrir WhatsApp Web",
    copierMessage: "Copier le message",
    messageCopie: "Message copié",
    notreNumero: "Notre numéro",

    /* Divers */
    voirTout: "Voir tout",
    voirLaCollection: "Voir la collection",
    decouvrir: "Découvrir",
    filtrerTrier: "Filtrer et trier",
    trier: "Trier",
    nouveautes: "Nouveautés",
    prixCroissant: "Prix croissant",
    prixDecroissant: "Prix décroissant",
    effacerFiltres: "Tout effacer",
    voirResultats: "Voir les résultats",
    tout: "Tout",
    homme: "Homme",
    femme: "Femme",
    aucunProduit: "Aucun article ne correspond à cette sélection.",
    allerAuContenu: "Aller au contenu",
    langueDuSite: "Langue du site",
  },

  en: {
    menu: "Menu",
    fermer: "Close",
    accueil: "Home",
    boutique: "Shop",
    collections: "Collections",
    lookbook: "Lookbook",
    histoire: "Our story",
    faq: "FAQ",
    contact: "Contact",
    mentions: "Legal notice",
    livraison: "Shipping and payment",

    panier: "Cart",
    panierVide: "Your cart is empty.",
    panierVideSuite: "Browse the shop to build your order.",
    articles: "items",
    article: "item",
    total: "Total",
    retirer: "Remove",
    retirerArticle: "Remove this item from the cart",
    viderPanier: "Empty the cart",
    continuer: "Continue shopping",

    ajouterAuPanier: "Add to cart",
    ajoute: "Added to cart",
    choisirTaille: "Choose a size",
    couleur: "Colour",
    taille: "Size",
    quantite: "Quantity",
    epuise: "Sold out",
    nouveau: "New",
    indisponible: "Unavailable",
    reference: "Reference",
    composition: "Composition",
    detailsLivraison: "Shipping and payment",

    commander: "Order on WhatsApp",
    finaliser: "Complete the order",
    vosCoordonnees: "Your details",
    nomComplet: "Full name",
    ville: "Delivery city",
    villeAide: "Ouagadougou, Bobo-Dioulasso, Abidjan…",
    nomRequis: "Please give your name so we can prepare the order.",
    villeRequise: "Please give your city so we can estimate delivery.",
    apercuMessage: "Message preview",
    commentCaMarche: "How ordering works",

    repliTitre: "Open the conversation",
    repliTexte: "If WhatsApp did not open, use one of these options.",
    ouvrirWeb: "Open WhatsApp Web",
    copierMessage: "Copy the message",
    messageCopie: "Message copied",
    notreNumero: "Our number",

    voirTout: "View all",
    voirLaCollection: "View the collection",
    decouvrir: "Discover",
    filtrerTrier: "Filter and sort",
    trier: "Sort",
    nouveautes: "Newest",
    prixCroissant: "Price, low to high",
    prixDecroissant: "Price, high to low",
    effacerFiltres: "Clear all",
    voirResultats: "View results",
    tout: "All",
    homme: "Men",
    femme: "Women",
    aucunProduit: "No item matches this selection.",
    allerAuContenu: "Skip to content",
    langueDuSite: "Site language",
  },
} as const;

export type Cle = keyof (typeof dictionnaire)["fr"];

/** Traducteur lié à une langue. `const t = traduire("fr")` puis `t("panier")`. */
export function traduire(langue: Langue) {
  return (cle: Cle): string => dictionnaire[langue][cle];
}

/**
 * Racine de publication, sans barre oblique finale.
 *
 * Vaut `/rakiire` sur GitHub Pages et `` sur un domaine propre. Toute adresse
 * interne du site passe par `lien()` : une adresse ecrite en dur ailleurs
 * fonctionnerait en developpement et tomberait en 404 une fois publiee sous
 * un sous-chemin. C'est le piege classique de GitHub Pages.
 */
const RACINE = import.meta.env.BASE_URL.replace(/\/$/, "");

/**
 * Adresse interne, dans la langue courante et prefixee de la racine.
 * Sur GitHub Pages : `lien("fr", "/boutique")` -> `/rakiire/boutique`
 *                    `lien("en", "/boutique")` -> `/rakiire/en/boutique`
 */
export function lien(langue: Langue, chemin: string): string {
  const propre = chemin.startsWith("/") ? chemin : `/${chemin}`;
  const localise = langue === "fr" ? propre : `/en${propre === "/" ? "" : propre}`;
  return `${RACINE}${localise}` || "/";
}

/**
 * Segments d'adresse traduits. Une adresse anglaise doit se lire en anglais :
 * `/en/shop`, pas `/en/boutique`.
 *
 * Les deux objets ont volontairement les memes cles : le typage refuse alors
 * qu'une page soit ajoutee dans une langue et oubliee dans l'autre.
 */
export const segments = {
  fr: {
    boutique: "boutique",
    produit: "produit",
    panier: "panier",
    histoire: "histoire",
    lookbook: "lookbook",
    faq: "faq",
    contact: "contact",
    mentions: "mentions",
  },
  en: {
    boutique: "shop",
    produit: "product",
    panier: "cart",
    histoire: "story",
    lookbook: "lookbook",
    faq: "faq",
    contact: "contact",
    mentions: "legal",
  },
} as const;

export type ClePage = keyof (typeof segments)["fr"];

/**
 * Adresse d'une page, dans la bonne langue.
 * `lienPage("en", "mentions")` -> `/en/legal`
 * `lienPage("en", "faq", "livraison")` -> `/en/faq#livraison`
 */
export function lienPage(langue: Langue, cle: ClePage, ancre?: string): string {
  const base = lien(langue, `/${segments[langue][cle]}`);
  return ancre ? `${base}#${ancre}` : base;
}

/**
 * Traduit une adresse d'une langue vers l'autre, segment par segment.
 *
 * Indispensable parce que les segments sont traduits : depuis `/en/shop`, se
 * contenter de retirer le prefixe `/en` donnerait `/shop`, qui n'existe pas en
 * francais. Il faut retrouver la cle de page, puis reconstruire l'adresse avec
 * le segment de la langue visee.
 *
 * Le reste du chemin est conserve tel quel : une reference produit reste la
 * meme des deux cotes, seul son segment parent change.
 */
export function traduireChemin(chemin: string, vers: Langue): string {
  const source: Langue = /^\/en(\/|$)/.test(chemin) ? "en" : "fr";
  const sansLangue = chemin.replace(/^\/en(?=\/|$)/, "") || "/";

  const [, premier = "", ...reste] = sansLangue.split("/");
  if (!premier) return lien(vers, "/");

  const cle = (Object.keys(segments[source]) as ClePage[]).find(
    (k) => segments[source][k] === premier,
  );

  // Page sans segment traduit (la documentation du design system, par exemple) :
  // on la sert telle quelle plutot que d'inventer une adresse.
  if (!cle) return lien(vers, sansLangue);

  const suite = reste.length ? `/${reste.join("/")}` : "";
  return lien(vers, `/${segments[vers][cle]}${suite}`);
}

export function lienBoutique(langue: Langue): string {
  return lien(langue, `/${segments[langue].boutique}`);
}

export function lienProduit(langue: Langue, reference: string): string {
  return lien(langue, `/${segments[langue].produit}/${reference.toLowerCase()}`);
}

export function lienPanier(langue: Langue): string {
  return lien(langue, `/${segments[langue].panier}`);
}
