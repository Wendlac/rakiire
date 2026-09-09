/**
 * Réseaux sociaux — Rakiire
 *
 * ⚠ ADRESSES À RENSEIGNER
 * Les comptes Facebook et TikTok sont à connecter. Tant qu'une adresse est vide,
 * le lien n'est pas affiché du tout : mieux vaut une rubrique plus courte qu'un
 * lien qui mène à une page inexistante — sur un site de marque, un lien mort
 * coûte plus cher qu'une absence.
 *
 * Pour activer un réseau, coller l'adresse complète du profil dans `url`.
 */
export interface Reseau {
  nom: string;
  /** Adresse complète du profil. Laisser vide tant que le compte n'existe pas. */
  url: string;
  /** Identifiant affiché à côté du nom. */
  poignee: string;
}

export const reseaux: Reseau[] = [
  { nom: "Facebook", url: "", poignee: "" },
  { nom: "TikTok", url: "", poignee: "" },
];

/** Uniquement les réseaux réellement en ligne. */
export const reseauxActifs = (): Reseau[] => reseaux.filter((r) => r.url.trim() !== "");
