/**
 * Identité légale — Rakiire
 *
 * ⛔ CETTE PAGE NE DOIT PAS ÊTRE MISE EN LIGNE TANT QUE CES CHAMPS SONT VIDES.
 *
 * Aucune de ces valeurs n'a été inventée. Un numéro RCCM ou IFU fabriqué serait
 * une fausse mention officielle : cela expose la marque, et cela induit en
 * erreur un client qui voudrait vérifier à qui il achète.
 *
 * Tant qu'un champ est vide, la page affiche « à compléter » en rouge, à
 * l'endroit exact où l'information manque. C'est volontairement impossible à
 * rater en relecture.
 *
 * À demander au comptable ou au greffe si vous ne les avez pas sous la main :
 * la raison sociale exacte, la forme juridique, le numéro RCCM, le numéro IFU
 * et le nom du représentant légal.
 */
export interface IdentiteLegale {
  /** Raison sociale exacte, telle qu'enregistrée. */
  raisonSociale: string;
  /** SARL, entreprise individuelle, association… */
  formeJuridique: string;
  /** Adresse du siège. */
  siege: string;
  /** Registre du commerce et du crédit mobilier. */
  rccm: string;
  /** Identifiant financier unique. */
  ifu: string;
  /** Personne responsable du contenu publié. */
  directeurPublication: string;
  /** Adresse de contact publiée. Le numéro WhatsApp fait foi à défaut. */
  contact: string;
}

export const identite: IdentiteLegale = {
  raisonSociale: "",
  formeJuridique: "",
  siege: "",
  rccm: "",
  ifu: "",
  directeurPublication: "",
  contact: "",
};

/** Vrai si au moins un champ obligatoire manque. */
export function identiteIncomplete(): boolean {
  return Object.values(identite).some((valeur) => valeur.trim() === "");
}

/**
 * Hébergeur. Décision de projet, donc renseigné.
 * L'adresse postale complète de Vercel est à ajouter si le conseil juridique
 * l'exige — je ne l'ai pas vérifiée et je ne la cite donc pas de mémoire.
 */
export const hebergeur = {
  nom: "Vercel Inc.",
  site: "https://vercel.com",
  adresse: "",
};

/** Date de dernière révision du texte légal. À mettre à jour à chaque modification. */
export const derniereRevision = "";
