/**
 * Panier — Rakiire
 *
 * Le panier vit entièrement dans le navigateur du visiteur. Aucun serveur, aucun
 * compte, aucune donnée personnelle stockée ailleurs que sur son téléphone : la
 * seule information qui quitte l'appareil est le message qu'il envoie lui-même
 * sur WhatsApp.
 *
 * Trois exigences ont façonné ce module :
 *
 * 1. Il survit à la fermeture du navigateur — `localStorage`, pas `session`.
 *    Au Burkina, une commande se prépare souvent en plusieurs fois, entre deux
 *    connexions.
 *
 * 2. Tout accès au stockage est protégé. En navigation privée, ou quand le
 *    navigateur bloque les données de site, la lecture et l'écriture lèvent une
 *    exception. Un panier qui plante emporte toute la page avec lui ; ici il se
 *    contente d'être vide.
 *
 * 3. Le contenu relu est validé, pas accordé de confiance. Une clé de stockage
 *    est modifiable à la main, et une version antérieure du site a pu y écrire
 *    une autre forme. Tout ce qui ne correspond pas au schéma est écarté.
 */
import type { CodeCouleur, Taille } from "./catalogue";
import { COULEURS, TAILLES } from "./catalogue";

const CLE = "rakiire.panier.v1";

/** Événement émis à chaque changement. L'en-tête et le panier s'y abonnent. */
export const EVENEMENT_PANIER = "rakiire:panier";

export interface ArticlePanier {
  /** Référence longue de la variante : RKR-CLS-001-NR-L */
  reference: string;
  /** Référence courte du modèle, pour reconstruire le lien vers la fiche. */
  modele: string;
  nom: string;
  couleur: CodeCouleur;
  taille: Taille;
  prixUnitaire: number;
  quantite: number;
}

const QUANTITE_MAX = 20;

/** Vrai si l'objet relu a bien la forme attendue. */
function estArticleValide(valeur: unknown): valeur is ArticlePanier {
  if (typeof valeur !== "object" || valeur === null) return false;
  const a = valeur as Record<string, unknown>;
  return (
    typeof a.reference === "string" &&
    typeof a.modele === "string" &&
    typeof a.nom === "string" &&
    typeof a.couleur === "string" &&
    Object.hasOwn(COULEURS, a.couleur) &&
    typeof a.taille === "string" &&
    (TAILLES as readonly string[]).includes(a.taille) &&
    typeof a.prixUnitaire === "number" &&
    Number.isFinite(a.prixUnitaire) &&
    a.prixUnitaire >= 0 &&
    typeof a.quantite === "number" &&
    Number.isInteger(a.quantite) &&
    a.quantite > 0
  );
}

export function lirePanier(): ArticlePanier[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const brut = localStorage.getItem(CLE);
    if (!brut) return [];
    const analyse: unknown = JSON.parse(brut);
    if (!Array.isArray(analyse)) return [];
    return analyse.filter(estArticleValide).map((a) => ({
      ...a,
      quantite: Math.min(QUANTITE_MAX, a.quantite),
    }));
  } catch {
    // Stockage bloqué, quota dépassé ou contenu illisible : panier vide.
    return [];
  }
}

function ecrirePanier(articles: ArticlePanier[]): void {
  try {
    localStorage.setItem(CLE, JSON.stringify(articles));
  } catch {
    // Rien à faire : la commande reste possible dans l'onglet courant.
  }
  diffuser(articles);
}

function diffuser(articles: ArticlePanier[]): void {
  document.dispatchEvent(
    new CustomEvent<ArticlePanier[]>(EVENEMENT_PANIER, { detail: articles }),
  );
}

export function ajouterAuPanier(article: Omit<ArticlePanier, "quantite">, quantite = 1): ArticlePanier[] {
  const articles = lirePanier();
  const existant = articles.find((a) => a.reference === article.reference);

  if (existant) {
    existant.quantite = Math.min(QUANTITE_MAX, existant.quantite + quantite);
  } else {
    articles.push({ ...article, quantite: Math.min(QUANTITE_MAX, quantite) });
  }

  ecrirePanier(articles);
  return articles;
}

export function changerQuantite(reference: string, quantite: number): ArticlePanier[] {
  const articles = lirePanier();
  const article = articles.find((a) => a.reference === reference);
  if (!article) return articles;

  const suivante = Math.min(QUANTITE_MAX, Math.max(0, Math.round(quantite)));
  const restants = suivante === 0 ? articles.filter((a) => a.reference !== reference) : articles;
  if (suivante > 0) article.quantite = suivante;

  ecrirePanier(restants);
  return restants;
}

export function retirerDuPanier(reference: string): ArticlePanier[] {
  const articles = lirePanier().filter((a) => a.reference !== reference);
  ecrirePanier(articles);
  return articles;
}

export function viderPanier(): ArticlePanier[] {
  ecrirePanier([]);
  return [];
}

export function nombreArticles(articles: ArticlePanier[] = lirePanier()): number {
  return articles.reduce((somme, a) => somme + a.quantite, 0);
}

export function totalPanier(articles: ArticlePanier[] = lirePanier()): number {
  return articles.reduce((somme, a) => somme + a.prixUnitaire * a.quantite, 0);
}

/**
 * Abonnement aux changements, y compris ceux d'un autre onglet.
 * Un visiteur qui garde la boutique ouverte dans un onglet et le panier dans un
 * autre doit voir le même panier des deux côtés.
 */
export function surChangementPanier(rappel: (articles: ArticlePanier[]) => void): () => void {
  const local = (evenement: Event) => rappel((evenement as CustomEvent<ArticlePanier[]>).detail);
  const distant = (evenement: StorageEvent) => {
    if (evenement.key === CLE) rappel(lirePanier());
  };

  document.addEventListener(EVENEMENT_PANIER, local);
  window.addEventListener("storage", distant);

  return () => {
    document.removeEventListener(EVENEMENT_PANIER, local);
    window.removeEventListener("storage", distant);
  };
}
