/**
 * Catalogue — Rakiire
 *
 * CE QUI EST REEL, AU 13 OCTOBRE 2026
 *   - Les photographies.
 *   - Les noms de modèles, lus dans les noms de fichiers du dossier
 *     `src/images/boutique`. Une seule exception, signalée sur place.
 *   - Le prix : 10 000 F CFA, le même pour tous les tee-shirts aujourd'hui.
 *
 * ⚠ CE QUI RESTE PROVISOIRE
 *   - Les descriptions et les compositions : inventées pour éprouver les
 *     écrans, et à remplacer avant la mise en ligne. Les grammages notamment
 *     ne viennent de nulle part.
 *   - La répartition en deux collections et les tailles épuisées.
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

/* -- Visuels ----------------------------------------------------------------
 * Photographies de la marque, livrées le 13 octobre 2026. Les vêtements
 * montrés sont bien des pièces Rakiire — ce qui reste provisoire dans ce
 * fichier, ce sont les noms, les prix, les descriptions et les compositions.
 *
 * Le nom de fichier porte le nom du modèle photographié. Seule la forme a été
 * normalisée — espaces en traits d'union, extension en minuscules — parce
 * qu'un espace dans un nom de fichier devient %20 dans une adresse. Les mots
 * eux-mêmes sont ceux du dossier livré et ne doivent pas être « corrigés » :
 * ce sont des noms propres.
 *
 * Les textes alternatifs décrivent ce que la photographie montre, jamais le
 * nom d'un article. Un lecteur d'écran annonce donc « tee-shirt noir à
 * panneaux de jean » : utile pour qui ne voit pas l'image, là où répéter le
 * nom du modèle ne dirait rien de plus que le titre déjà lu juste avant.
 * ------------------------------------------------------------------------- */
import bissaGurunsiFusion from "../images/boutique/bissa-gurunsi-fusion.jpg";
import bissaGurunsi from "../images/boutique/bissa-gurunsi.jpg";
import gulmancheYadce from "../images/boutique/gulmanche-yadce.jpg";
import mossiSamoBlack from "../images/boutique/mossi-samo-black.jpg";
import mossiSamoClassic from "../images/boutique/mossi-samo-classic.jpg";
import mossiSamoFusion from "../images/boutique/mossi-samo-fusion.jpg";
import peulBobo from "../images/boutique/peul-bobo.jpg";
import lookbook01 from "../images/lookbook/lookbook-01.jpg";
import lookbook02 from "../images/lookbook/lookbook-02.jpg";
import lookbook03 from "../images/lookbook/lookbook-03.jpg";
import lookbook05 from "../images/lookbook/lookbook-05.jpg";
import lookbook06 from "../images/lookbook/lookbook-06.jpg";

/** Raccourci de declaration d'un visuel bilingue. */
const visuel = (fichier: ImageMetadata, fr: string, en: string): VisuelProduit => ({
  fichier,
  alt: { fr, en },
});

/* Description honnête de ce que chaque photographie montre. */
const V = {
  bissaNoir: (): VisuelProduit =>
    visuel(bissaGurunsiFusion, "Tee-shirt noir à panneaux de jean, illustration de deux femmes, porté par un mannequin homme sur fond orange", "Black T-shirt with denim panels and an illustration of two women, worn by a male model against an orange background"),
  bissaBlanc: (): VisuelProduit =>
    visuel(bissaGurunsi, "Tee-shirt blanc à l’illustration de deux femmes, porté par une mannequin tenant une calebasse, devant des vanneries murales", "White T-shirt with an illustration of two women, worn by a female model holding a calabash, against woven wall baskets"),
  gulmance: (): VisuelProduit =>
    visuel(gulmancheYadce, "Tee-shirt noir à poches de jean rapportées, mannequin homme assis sur une chaise, fond orange", "Black T-shirt with applied denim pockets, male model seated on a chair, orange background"),
  mossiNoir: (): VisuelProduit =>
    visuel(mossiSamoBlack, "Tee-shirt noir à panneaux de jean, mannequin femme en jean évasé, fond orange", "Black T-shirt with denim panels, female model in flared jeans, orange background"),
  mossiBlanc: (): VisuelProduit =>
    visuel(mossiSamoClassic, "Tee-shirt blanc à l’empiècement de jean peint, mannequin femme assise en tailleur, fond gris", "White T-shirt with a painted denim yoke, female model sitting cross-legged, grey background"),
  mossiFusion: (): VisuelProduit =>
    visuel(mossiSamoFusion, "Tee-shirt noir portant l’inscription « Fusion moderne, tradition fun », mannequin femme, fond orange", "Black T-shirt lettered “Fusion moderne, tradition fun”, female model, orange background"),
  peulBobo: (): VisuelProduit =>
    visuel(peulBobo, "Tee-shirt bleu clair à l’empiècement de salopette peint, mannequin femme assise en tailleur, fond orange", "Light blue T-shirt with a painted dungaree yoke, female model sitting cross-legged, orange background"),
  solClair: (): VisuelProduit =>
    visuel(lookbook01, "Mannequin femme assise au sol, en tee-shirt blanc à empiècement de jean et jean large, fond blanc", "Female model seated on the floor in a white T-shirt with a denim yoke and wide jeans, white background"),
  pocheJean: (): VisuelProduit =>
    visuel(lookbook02, "Mannequin homme en tee-shirt noir à poches de jean, une main dans la poche, fond orange", "Male model in a black T-shirt with denim pockets, one hand in his pocket, orange background"),
  faceNoir: (): VisuelProduit =>
    visuel(lookbook03, "Mannequin homme de face en tee-shirt noir à panneaux de jean, fond orange", "Male model facing the camera in a black T-shirt with denim panels, orange background"),
  femmeNoir: (): VisuelProduit =>
    visuel(lookbook05, "Mannequin femme en tee-shirt noir à panneaux de jean et jean déchiré, fond orange", "Female model in a black T-shirt with denim panels and ripped jeans, orange background"),
  duo: (): VisuelProduit =>
    visuel(lookbook06, "Deux mannequins, femme et homme, en tee-shirts noirs de la collection, fond orange", "Two models, a woman and a man, in black T-shirts from the collection, orange background"),
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
    nom: { fr: "Bissa Gurunsi", en: "Bissa Gurunsi" },
    description: {
      fr: "Une coupe droite, des épaules nettes, un col côtelé qui tient sa forme au lavage. La pièce de départ du vestiaire Rakiire.",
      en: "A straight cut, clean shoulders, a ribbed collar that holds its shape through washing. The starting piece of the Rakiire wardrobe.",
    },
    composition: {
      fr: "Jersey de coton peigné, 220 g/m²",
      en: "Combed cotton jersey, 220 gsm",
    },
    prix: 10000,
    images: [V.bissaNoir(), V.bissaBlanc()],
    variantes: [...toutesTailles("NR"), ...toutesTailles("BL", ["3XL"])],
  },
  {
    reference: "RKR-CLS-002",
    collection: "CLS",
    coupe: "F",
    nom: { fr: "Mossi Samo", en: "Mossi Samo" },
    description: {
      fr: "Une manche courte montée haut et une longueur légèrement raccourcie. Se porte seul ou sous une chemise ouverte.",
      en: "A high-set short sleeve and a slightly cropped length. Worn alone or under an open shirt.",
    },
    composition: {
      fr: "Jersey de coton peigné, 180 g/m²",
      en: "Combed cotton jersey, 180 gsm",
    },
    prix: 10000,
    images: [V.mossiBlanc(), V.mossiNoir()],
    variantes: [...toutesTailles("NR", ["3XL"]), ...toutesTailles("BL")],
  },
  {
    reference: "RKR-CLS-003",
    collection: "CLS",
    coupe: "H",
    nom: { fr: "Gulmanche Yadce", en: "Gulmanche Yadce" },
    description: {
      fr: "Un tombé plus lourd, une coupe boîte assumée. Le volume vient du tissu, pas de la taille au-dessus.",
      en: "A heavier drape, a deliberate boxy cut. The volume comes from the fabric, not from sizing up.",
    },
    composition: {
      fr: "Jersey de coton peigné, 240 g/m²",
      en: "Combed cotton jersey, 240 gsm",
    },
    prix: 10000,
    images: [V.gulmance(), V.faceNoir()],
    variantes: [...toutesTailles("NR"), ...toutesTailles("BL", ["S", "3XL"])],
  },
  {
    reference: "RKR-CLS-004",
    collection: "CLS",
    coupe: "F",
    nom: { fr: "Peul Bobo", en: "Peul Bobo" },
    description: {
      fr: "Un empiècement de jean peint sur fond clair, et l’illustration posée au centre. La version la plus douce de la série.",
      en: "A painted denim yoke on a light ground, with the illustration set at the centre. The softest version in the series.",
    },
    composition: {
      fr: "Jersey de coton peigné, 200 g/m²",
      en: "Combed cotton jersey, 200 gsm",
    },
    prix: 10000,
    images: [V.peulBobo(), V.solClair()],
    variantes: [...toutesTailles("NR", ["2XL", "3XL"]), ...toutesTailles("BL", ["2XL", "3XL"])],
  },
  {
    reference: "RKR-JEA-001",
    collection: "JEA",
    coupe: "H",
    /* ⚠ Seul nom que je n'ai pas lu dans un nom de fichier : il est tire du
       lettrage peint sur le tee-shirt central de la photographie de groupe.
       A confirmer. */
    nom: { fr: "Gourounsi Bissa", en: "Gourounsi Bissa" },
    description: {
      fr: "Le tee-shirt pensé pour vivre sous une veste en jean : épaules un peu plus larges, corps plus long.",
      en: "The T-shirt made to live under a denim jacket: slightly wider shoulders, a longer body.",
    },
    composition: {
      fr: "Jersey de coton peigné, 240 g/m²",
      en: "Combed cotton jersey, 240 gsm",
    },
    prix: 10000,
    images: [V.pocheJean(), V.duo()],
    variantes: [...toutesTailles("NR"), ...toutesTailles("BL", ["3XL"])],
  },
  {
    reference: "RKR-JEA-002",
    collection: "JEA",
    coupe: "F",
    nom: { fr: "Mossi Samo Fusion", en: "Mossi Samo Fusion" },
    description: {
      fr: "Une encolure dégagée et une taille marquée sans être ajustée. Pensée pour se porter dans un pantalon.",
      en: "An open neckline and a defined waist without being fitted. Made to be tucked in.",
    },
    composition: {
      fr: "Jersey de coton peigné, 190 g/m²",
      en: "Combed cotton jersey, 190 gsm",
    },
    prix: 10000,
    images: [V.mossiFusion(), V.femmeNoir()],
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
