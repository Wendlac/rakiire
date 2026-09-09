/**
 * Formatage monetaire — Rakiire
 *
 * Une seule devise : le franc CFA. Aucune conversion, aucun arrondi implicite.
 *
 * Le separateur de milliers est une espace fine insecable (U+202F). Elle evite
 * qu'un prix se coupe en fin de ligne — « 15 » sur une ligne et « 000 F CFA »
 * sur la suivante ruinerait la lecture d'un prix premium. Le groupement est
 * fait a la main plutot que par Intl : la sortie doit etre identique quelle que
 * soit la version d'ICU du navigateur, y compris sur les Android anciens
 * repandus dans la sous-region.
 */

const FINE_INSECABLE = " ";
const INSECABLE = " ";

/** Groupe les milliers par espace fine insecable. */
function grouper(montant: number): string {
  const entier = Math.round(Math.abs(montant)).toString();
  let sortie = "";
  for (let i = 0; i < entier.length; i++) {
    if (i > 0 && (entier.length - i) % 3 === 0) sortie += FINE_INSECABLE;
    sortie += entier[i];
  }
  return montant < 0 ? `-${sortie}` : sortie;
}

/**
 * Prix affiche sur le site : « 15 000 F CFA ».
 * L'espace avant l'unite est insecable, l'unite ne se detache jamais du nombre.
 */
export function formaterPrix(montant: number): string {
  return `${grouper(montant)}${INSECABLE}F${INSECABLE}CFA`;
}

/**
 * Variante compacte pour les contextes contraints (pastilles, recapitulatif
 * dense) : « 15 000 F ».
 */
export function formaterPrixCourt(montant: number): string {
  return `${grouper(montant)}${INSECABLE}F`;
}

/**
 * Variante pour le message WhatsApp. WhatsApp rend correctement l'espace fine
 * insecable, mais certains claviers et copies la transforment : on retombe donc
 * sur une espace ordinaire pour un message toujours lisible et copiable.
 */
export function formaterPrixTexte(montant: number): string {
  return `${grouper(montant).replace(new RegExp(FINE_INSECABLE, "g"), " ")} F CFA`;
}
