/**
 * Mesure d'audience — Rakiire
 *
 * ⚠ DÉSACTIVÉE PAR DÉFAUT. Rien n'est envoyé nulle part tant que
 * `fournisseur` vaut « aucun ».
 *
 * Trois exigences ont guidé ce choix :
 *
 * 1. **Aucun cookie.** Les trois fournisseurs proposés ci-dessous mesurent sans
 *    déposer de cookie ni identifier le visiteur. C'est ce qui permet au site
 *    de n'afficher aucune bannière de consentement : il n'y a rien à consentir.
 *
 * 2. **Rien n'est activé sans identifiant réel.** Je n'ai pas de compte chez
 *    ces fournisseurs. Inventer un identifiant aurait produit un script qui
 *    échoue en silence — pire que pas de mesure, parce qu'on croirait mesurer.
 *
 * 3. **La page des mentions légales suit automatiquement.** Elle affirme
 *    aujourd'hui qu'aucune donnée ne quitte l'appareil du visiteur. Activer la
 *    mesure sans corriger ce paragraphe le rendrait faux — c'est la première
 *    chose que vérifie une autorité de contrôle. La page lit donc ce fichier et
 *    s'adapte toute seule.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * COMMENT L'ACTIVER
 *
 * GoatCounter — gratuit, libre, sans cookie. Le plus simple pour commencer.
 *   1. Créer un compte sur https://www.goatcounter.com
 *   2. Il fournit un code, par exemple « rakiire »
 *   3. Ici : fournisseur: "goatcounter", identifiant: "rakiire"
 *
 * Plausible — payant (environ 9 $ par mois), hébergé en Europe.
 *   1. Créer un compte sur https://plausible.io
 *   2. Déclarer le domaine du site
 *   3. Ici : fournisseur: "plausible", identifiant: "<le domaine déclaré>"
 *
 * Umami — libre, offre gratuite en ligne ou auto-hébergement.
 *   1. Créer un site sur https://cloud.umami.is
 *   2. Il fournit un identifiant de site
 *   3. Ici : fournisseur: "umami", identifiant: "<identifiant de site>"
 *      et `hote` si vous l'auto-hébergez.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Fournisseur = "aucun" | "goatcounter" | "plausible" | "umami";

export interface Audience {
  fournisseur: Fournisseur;
  /** Code du site chez le fournisseur. Vide tant que la mesure est éteinte. */
  identifiant: string;
  /** Uniquement pour une instance Umami auto-hébergée. */
  hote?: string;
}

export const audience: Audience = {
  fournisseur: "aucun",
  identifiant: "",
};

/** Vrai seulement si un fournisseur ET un identifiant sont renseignés. */
export function audienceActive(): boolean {
  return audience.fournisseur !== "aucun" && audience.identifiant.trim() !== "";
}

/**
 * Adresse du script de mesure et attributs à lui passer.
 * Retourne `null` quand la mesure est éteinte : aucune balise n'est alors
 * écrite dans la page.
 */
export function scriptAudience(): { src: string; attributs: Record<string, string> } | null {
  if (!audienceActive()) return null;

  const id = audience.identifiant.trim();

  switch (audience.fournisseur) {
    case "goatcounter":
      return {
        src: "https://gc.zgo.at/count.js",
        attributs: { "data-goatcounter": `https://${id}.goatcounter.com/count` },
      };

    case "plausible":
      return {
        src: "https://plausible.io/js/script.js",
        attributs: { "data-domain": id },
      };

    case "umami":
      return {
        src: `${audience.hote?.replace(/\/$/, "") ?? "https://cloud.umami.is"}/script.js`,
        attributs: { "data-website-id": id },
      };

    default:
      return null;
  }
}

/** Nom lisible du fournisseur, pour les mentions légales. */
export function nomFournisseur(): string {
  return {
    aucun: "",
    goatcounter: "GoatCounter",
    plausible: "Plausible",
    umami: "Umami",
  }[audience.fournisseur];
}
