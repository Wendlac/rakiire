/**
 * Catalogue — Rakiire
 *
 * ⚠ CONTENU PROVISOIRE À REMPLACER
 * Les noms, les descriptions, les prix et les compositions ci-dessous sont des
 * exemples destinés à monter et à éprouver les écrans. Rien ici ne vient du
 * client. À remplacer avant toute mise en ligne.
 *
 * Ce que ce fichier respecte en revanche, et qui doit le rester :
 *   - Aucune allégation d'origine de fabrication. La composition décrit la
 *     matière et le grammage, jamais la provenance.
 *   - Les prix sont des entiers en francs CFA, sans décimale.
 *   - Les références suivent RKR-<COLLECTION>-<NUM> et ne changent jamais une
 *     fois publiées : elles circulent dans les conversations WhatsApp.
 *
 * MISE À JOUR DU CATALOGUE
 * Ce fichier est le catalogue. Pour ajouter un article, copier un bloc, changer
 * la référence et les valeurs. Le typage refuse une taille inconnue ou une
 * collection non déclarée : une faute de saisie casse la construction du site
 * plutôt que la boutique en production.
 */
import type { Produit, Variante, VisuelProduit } from "../lib/catalogue";
import { TAILLES } from "../lib/catalogue";

/* -- Visuels d'exemple ------------------------------------------------------
 * ⚠ CES PHOTOGRAPHIES NE SONT PAS CELLES DE LA MARQUE.
 * Ce sont des images de banque, versees pour que le prototype se presente avec
 * de vrais visuels plutot qu'avec des rectangles gris. Aucun vetement montre
 * n'est un produit Rakiire. A remplacer integralement apres la seance photo.
 *
 * Les textes alternatifs decrivent donc ce que l'image montre reellement, et
 * non un produit du catalogue : ecrire « tee-shirt Nasara en noir » sur une
 * photo qui montre autre chose serait faux pour qui navigue au lecteur d'ecran.
 * ------------------------------------------------------------------------- */
import portrait01 from "../images/portrait-01.jpg";
import portrait02 from "../images/portrait-02.jpg";
import portrait03 from "../images/portrait-03.jpg";
import portrait04 from "../images/portrait-04.jpg";
import portrait05 from "../images/portrait-05.jpg";
import portrait06 from "../images/portrait-06.jpg";

/** Raccourci de declaration d'un visuel bilingue. */
const visuel = (fichier: ImageMetadata, fr: string, en: string): VisuelProduit => ({
  fichier,
  alt: { fr, en },
});

/* Descriptions honnetes de ce que chaque photographie montre. Elles seront
   remplacees en meme temps que les images. */
const V = {
  fauteuil: (): VisuelProduit =>
    visuel(portrait01, "Mannequin assise dans un fauteuil, portrait en noir et blanc", "Model seated in an armchair, black and white portrait"),
  rue: (): VisuelProduit =>
    visuel(portrait02, "Mannequin en veste a motifs geometriques, dans la rue", "Model in a geometric-patterned jacket, in the street"),
  ankara: (): VisuelProduit =>
    visuel(portrait03, "Mannequin en ensemble a motifs, sur fond orange", "Model in a patterned outfit against an orange background"),
  costume: (): VisuelProduit =>
    visuel(portrait04, "Mannequin en costume, en exterieur", "Model in a suit, outdoors"),
  denim: (): VisuelProduit =>
    visuel(portrait05, "Mannequin en veste en jean, assise", "Model in a denim jacket, seated"),
  miroir: (): VisuelProduit =>
    visuel(portrait06, "Mannequin en ensemble blanc, devant un miroir pose sur des galets", "Model in a white outfit, before a mirror set on pebbles"),
};

/** Raccourci : toutes les tailles disponibles dans une couleur donnée. */
function toutesTailles(couleur: "NR" | "BL", sauf: string[] = []): Variante[] {
  return TAILLES.map((taille) => ({
    couleur,
    taille,
    disponible: !sauf.includes(taille),
  }));
}

export const produits: Produit[] = [
  {
    reference: "RKR-CLS-001",
    collection: "CLS",
    coupe: "H",
    nom: { fr: "Tee-shirt Nasara", en: "Nasara T-shirt" },
    description: {
      fr: "Une coupe droite, des épaules nettes, un col côtelé qui tient sa forme au lavage. La pièce de départ du vestiaire Rakiire.",
      en: "A straight cut, clean shoulders, a ribbed collar that holds its shape through washing. The starting piece of the Rakiire wardrobe.",
    },
    composition: {
      fr: "Jersey de coton peigné, 220 g/m²",
      en: "Combed cotton jersey, 220 gsm",
    },
    prix: 15000,
    images: [V.ankara(), V.fauteuil()],
    variantes: [...toutesTailles("NR"), ...toutesTailles("BL", ["3XL"])],
  },
  {
    reference: "RKR-CLS-002",
    collection: "CLS",
    coupe: "F",
    nom: { fr: "Tee-shirt Wendé", en: "Wendé T-shirt" },
    description: {
      fr: "Une manche courte montée haut et une longueur légèrement raccourcie. Se porte seul ou sous une chemise ouverte.",
      en: "A high-set short sleeve and a slightly cropped length. Worn alone or under an open shirt.",
    },
    composition: {
      fr: "Jersey de coton peigné, 180 g/m²",
      en: "Combed cotton jersey, 180 gsm",
    },
    prix: 12000,
    images: [V.rue(), V.miroir()],
    variantes: [...toutesTailles("NR", ["3XL"]), ...toutesTailles("BL")],
  },
  {
    reference: "RKR-CLS-003",
    collection: "CLS",
    coupe: "H",
    nom: { fr: "Tee-shirt Kadi", en: "Kadi T-shirt" },
    description: {
      fr: "Un tombé plus lourd, une coupe boîte assumée. Le volume vient du tissu, pas de la taille au-dessus.",
      en: "A heavier drape, a deliberate boxy cut. The volume comes from the fabric, not from sizing up.",
    },
    composition: {
      fr: "Jersey de coton peigné, 240 g/m²",
      en: "Combed cotton jersey, 240 gsm",
    },
    prix: 18000,
    images: [V.costume(), V.denim()],
    variantes: [...toutesTailles("NR"), ...toutesTailles("BL", ["S", "3XL"])],
  },
  {
    reference: "RKR-CLS-004",
    collection: "CLS",
    coupe: "F",
    nom: { fr: "Tee-shirt Salam", en: "Salam T-shirt" },
    description: {
      fr: "Manches longues, poignets côtelés. La pièce des saisons intermédiaires et des soirées d’harmattan.",
      en: "Long sleeves, ribbed cuffs. The piece for in-between seasons and harmattan evenings.",
    },
    composition: {
      fr: "Jersey de coton peigné, 200 g/m²",
      en: "Combed cotton jersey, 200 gsm",
    },
    prix: 21000,
    images: [V.fauteuil(), V.ankara()],
    variantes: [...toutesTailles("NR", ["2XL", "3XL"]), ...toutesTailles("BL", ["2XL", "3XL"])],
  },
  {
    reference: "RKR-JEA-001",
    collection: "JEA",
    coupe: "H",
    nom: { fr: "Tee-shirt Sida", en: "Sida T-shirt" },
    description: {
      fr: "Le tee-shirt pensé pour vivre sous une veste en jean : épaules un peu plus larges, corps plus long.",
      en: "The T-shirt made to live under a denim jacket: slightly wider shoulders, a longer body.",
    },
    composition: {
      fr: "Jersey de coton peigné, 240 g/m²",
      en: "Combed cotton jersey, 240 gsm",
    },
    prix: 19000,
    images: [V.denim(), V.costume()],
    variantes: [
      ...toutesTailles("NR", TAILLES.slice()), // épuisé partout
      ...toutesTailles("BL", TAILLES.slice()),
    ],
  },
  {
    reference: "RKR-JEA-002",
    collection: "JEA",
    coupe: "F",
    nom: { fr: "Tee-shirt Awa", en: "Awa T-shirt" },
    description: {
      fr: "Une encolure dégagée et une taille marquée sans être ajustée. Pensée pour se porter dans un pantalon.",
      en: "An open neckline and a defined waist without being fitted. Made to be tucked in.",
    },
    composition: {
      fr: "Jersey de coton peigné, 190 g/m²",
      en: "Combed cotton jersey, 190 gsm",
    },
    prix: 14000,
    images: [V.miroir(), V.rue()],
    variantes: [...toutesTailles("NR"), ...toutesTailles("BL", ["XL", "2XL", "3XL"])],
  },
];

/** Recherche par référence, insensible à la casse (les adresses sont en minuscules). */
export function produitParReference(reference: string): Produit | undefined {
  const cible = reference.toUpperCase();
  return produits.find((p) => p.reference === cible);
}

/** Les articles mis en avant sur l'accueil. Ordre volontaire, pas alphabétique. */
export const misEnAvant = ["RKR-CLS-001", "RKR-CLS-003", "RKR-CLS-002", "RKR-JEA-002"];
