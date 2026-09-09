/**
 * Passage de commande WhatsApp — Rakiire
 *
 * Le site ne prend aucun paiement. Il compose un message, l'encode, et remet
 * la main a la conversation. Ce fichier est donc la piece la plus critique du
 * parcours : un message mal forme est une commande perdue.
 *
 * Trois exigences ont guide le format :
 *   1. La reference de variante figure sur sa propre ligne, pour etre copiable
 *      d'un appui long sans emporter le reste.
 *   2. Aucun caractere de mise en forme WhatsApp (* _ ~ ```) n'est employe :
 *      un nom de produit contenant une astérisque casserait le rendu.
 *   3. Le total est repete en clair, seul sur sa ligne, pour lever toute
 *      ambiguite au moment de la confirmation.
 */

import { formaterPrixTexte } from "./prix";
import { COULEURS, type CodeCouleur, type Langue, type Taille } from "./catalogue";

/** Numero de commande. Format international, sans espace ni signe plus. */
export const NUMERO_WHATSAPP = "22664451251";

/** Version affichable du numero. */
export const NUMERO_AFFICHE = "+226 64 45 12 51";

export interface LignePanier {
  reference: string;
  nom: string;
  couleur: CodeCouleur;
  taille: Taille;
  prixUnitaire: number;
  quantite: number;
}

export interface Coordonnees {
  nom: string;
  ville: string;
}

/**
 * Espace avant le deux-points : obligatoire en francais, faute en anglais.
 * Une insecable en francais, pour que « Total » ne se detache jamais de son
 * montant en fin de ligne.
 */
const DEUX_POINTS = { fr: " :", en: ":" } as const;

const TEXTES = {
  fr: {
    salutation: "Bonjour \u{1F44B}",
    intro: "Je souhaite commander :",
    reference: "Réf.",
    prixUnitaire: "Prix unitaire",
    taille: "Taille",
    total: "Total",
    nom: "Nom",
    ville: "Ville",
  },
  en: {
    salutation: "Hello \u{1F44B}",
    intro: "I would like to order:",
    reference: "Ref.",
    prixUnitaire: "Unit price",
    taille: "Size",
    total: "Total",
    nom: "Name",
    ville: "City",
  },
} as const;

/** Somme des lignes, en francs CFA. */
export function totalPanier(lignes: LignePanier[]): number {
  return lignes.reduce((somme, l) => somme + l.prixUnitaire * l.quantite, 0);
}

/**
 * Compose le message de commande.
 * Retourne du texte brut : c'est l'appelant qui encode pour l'URL.
 */
export function composerMessage(
  lignes: LignePanier[],
  coordonnees: Coordonnees,
  langue: Langue = "fr",
): string {
  const t = TEXTES[langue];
  const dp = DEUX_POINTS[langue];
  const blocs: string[] = [`${t.salutation}\n${t.intro}`];

  for (const ligne of lignes) {
    const couleur = COULEURS[ligne.couleur].nom[langue];
    blocs.push(
      [
        `${ligne.quantite} × ${ligne.nom} — ${couleur} — ${t.taille} ${ligne.taille}`,
        `${t.reference} ${ligne.reference}`,
        `${t.prixUnitaire}${dp} ${formaterPrixTexte(ligne.prixUnitaire)}`,
      ].join("\n"),
    );
  }

  blocs.push(`${t.total}${dp} ${formaterPrixTexte(totalPanier(lignes))}`);

  const identite = [
    coordonnees.nom.trim() && `${t.nom}${dp} ${coordonnees.nom.trim()}`,
    coordonnees.ville.trim() && `${t.ville}${dp} ${coordonnees.ville.trim()}`,
  ].filter(Boolean);

  if (identite.length) blocs.push(identite.join("\n"));

  return blocs.join("\n\n");
}

/**
 * Lien de conversation pre-remplie.
 *
 * `wa.me` est le point d'entree universel : il ouvre l'application native si
 * elle est installee, et bascule sur WhatsApp Web sinon. C'est ce comportement
 * de repli natif qui evite d'avoir a detecter la plateforme cote client.
 */
export function lienWhatsApp(message: string): string {
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

/**
 * Longueur de securite du message.
 *
 * L'URL complete doit rester sous la limite pratique des navigateurs. Le texte
 * encode gonfle fortement (un saut de ligne devient %0A, un emoji quatre
 * groupes). Au-dela du seuil, l'interface doit proposer la copie manuelle
 * plutot qu'un lien qui echouerait silencieusement.
 */
export const LONGUEUR_URL_MAX = 7000;

export function urlTropLongue(message: string): boolean {
  return lienWhatsApp(message).length > LONGUEUR_URL_MAX;
}
