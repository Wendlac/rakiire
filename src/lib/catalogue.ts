/**
 * Contrat de donnees du catalogue — Rakiire
 *
 * Ces types sont la reference unique pour tout ce qui touche au produit :
 * fiches, cartes, panier, message WhatsApp. Une modification ici se propage
 * partout par le typage.
 */

/** Collections ouvertes. Ajouter une entree ici avant de creer les produits. */
export const COLLECTIONS = {
  CLS: "Ethnic Rakiire Classic",
  JEA: "Ethnic Rakiire Jean",
} as const;

export type CodeCollection = keyof typeof COLLECTIONS;

/** Couleurs disponibles au catalogue, avec leur rendu en pastille. */
export const COULEURS = {
  NR: { nom: { fr: "Noir", en: "Black" }, valeur: "#080F0F" },
  BL: { nom: { fr: "Blanc", en: "White" }, valeur: "#FFFFFF" },
} as const;

export type CodeCouleur = keyof typeof COULEURS;

/** Tailles, dans l'ordre d'affichage. Cet ordre fait autorite. */
export const TAILLES = ["S", "M", "L", "XL", "2XL", "3XL"] as const;
export type Taille = (typeof TAILLES)[number];

export const COUPES = {
  H: { fr: "Homme", en: "Men" },
  F: { fr: "Femme", en: "Women" },
} as const;

export type CodeCoupe = keyof typeof COUPES;

export type Langue = "fr" | "en";

/** Texte servi dans les deux langues du site. */
export type Traduit = Record<Langue, string>;

/**
 * Variante commandable : un couple couleur/taille d'un modele.
 * C'est l'unite de stock et l'unite qui part dans le message WhatsApp.
 */
export interface Variante {
  couleur: CodeCouleur;
  taille: Taille;
  /** Faux : la variante reste visible mais non selectionnable, mention Epuise. */
  disponible: boolean;
}

/**
 * Modele au catalogue.
 *
 * `reference` suit le format RKR-<COLLECTION>-<NUM> et ne change jamais une
 * fois publiee : elle circule dans les conversations WhatsApp et sert de
 * preuve de commande.
 */
export interface Produit {
  reference: string;
  collection: CodeCollection;
  coupe: CodeCoupe;
  nom: Traduit;
  description: Traduit;
  /**
   * Matiere et grammage. JAMAIS l'origine de fabrication : le site ne fait
   * aucune allegation de provenance tant que la chaine n'est pas maitrisee.
   */
  composition: Traduit;
  /** En francs CFA, entier. Aucun centime : le CFA n'a pas de subdivision usuelle. */
  prix: number;
  images: { src: string; alt: Traduit }[];
  variantes: Variante[];
}

/** Reference longue d'une variante : RKR-CLS-001-NR-L */
export function referenceVariante(
  produit: Pick<Produit, "reference">,
  couleur: CodeCouleur,
  taille: Taille,
): string {
  return `${produit.reference}-${couleur}-${taille}`;
}

/** Vrai si au moins une variante du modele est commandable. */
export function estDisponible(produit: Pick<Produit, "variantes">): boolean {
  return produit.variantes.some((v) => v.disponible);
}

/** Tailles commandables pour une couleur donnee, dans l'ordre du catalogue. */
export function taillesDisponibles(
  produit: Pick<Produit, "variantes">,
  couleur: CodeCouleur,
): Taille[] {
  const ouvertes = new Set(
    produit.variantes.filter((v) => v.couleur === couleur && v.disponible).map((v) => v.taille),
  );
  return TAILLES.filter((t) => ouvertes.has(t));
}
