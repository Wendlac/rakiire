/**
 * Préparation des visuels — Rakiire
 *
 * Réduit des photographies sources avant de les verser dans `src/images/`.
 *
 * Pourquoi cette étape existe : les fichiers sortis d'un appareil font
 * couramment 5 à 25 Mo. Les versionner tels quels alourdit le dépôt de façon
 * permanente — un fichier commité ne s'efface jamais vraiment de l'historique —
 * et oblige la construction à les retraiter à chaque publication.
 *
 * 1800 px sur le grand côté suffit très largement : Astro produit ensuite
 * lui-même les tailles réellement servies, en AVIF et WebP.
 *
 * Usage :
 *   node scripts/preparer-images.mjs <dossier-source> [prefixe]
 *
 * Les fichiers sont renommés d'après leur orientation, ce qui évite de placer
 * un portrait dans un héros panoramique.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const LARGEUR_MAX = 1800;
const QUALITE = 82;
const CIBLE = "src/images";

const source = process.argv[2];
const prefixe = process.argv[3] ?? "";

if (!source || !fs.existsSync(source)) {
  console.error("Usage : node scripts/preparer-images.mjs <dossier-source> [prefixe]");
  process.exit(1);
}

const fichiers = fs
  .readdirSync(source)
  .filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f))
  .sort();

if (fichiers.length === 0) {
  console.error(`Aucune image trouvée dans ${source}`);
  process.exit(1);
}

fs.mkdirSync(CIBLE, { recursive: true });

let avant = 0;
let apres = 0;
let paysages = 0;
let portraits = 0;

for (const fichier of fichiers) {
  const entree = path.join(source, fichier);
  avant += fs.statSync(entree).size;

  // `rotate()` sans argument applique l'orientation EXIF. Sans lui, une photo
  // prise à la verticale ressort couchée après redimensionnement.
  const image = sharp(entree).rotate();
  const meta = await image.metadata();
  const paysage = (meta.width ?? 0) >= (meta.height ?? 0);
  const rang = paysage ? ++paysages : ++portraits;
  const nom = `${prefixe}${paysage ? "paysage" : "portrait"}-${String(rang).padStart(2, "0")}.jpg`;
  const sortie = path.join(CIBLE, nom);

  await image
    .resize({ width: LARGEUR_MAX, height: LARGEUR_MAX, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: QUALITE, mozjpeg: true })
    .toFile(sortie);

  const finale = await sharp(sortie).metadata();
  const ko = Math.round(fs.statSync(sortie).size / 1024);
  apres += fs.statSync(sortie).size;

  console.log(
    `${nom.padEnd(20)} ${String(`${finale.width}x${finale.height}`).padEnd(10)} ${String(`${ko} Ko`).padStart(8)}   <- ${fichier.slice(0, 40)}`,
  );
}

const mo = (o) => (o / 1024 / 1024).toFixed(1);
console.log("");
console.log(`${fichiers.length} image(s) : ${mo(avant)} Mo -> ${mo(apres)} Mo`);
