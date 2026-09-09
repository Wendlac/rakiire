/**
 * Vérificateur de liens internes — Rakiire
 *
 * Parcourt le site construit et signale toute adresse interne qui ne correspond
 * à aucune page générée.
 *
 * Pourquoi ce script existe : le site est publié sous un sous-chemin
 * (`/rakiire` sur GitHub Pages). Une adresse écrite en dur quelque part
 * fonctionne parfaitement en développement, puis renvoie une 404 une fois en
 * ligne. C'est invisible à la relecture et évident pour le visiteur. Le script
 * a d'ailleurs été écrit après avoir trouvé exactement ce défaut.
 *
 * Sort en code 1 si un lien est mort, ce qui arrête la publication : mieux vaut
 * ne rien publier qu'un site aux liens cassés.
 *
 * Usage : npm run verifier:liens   (après npm run build)
 */
import fs from "node:fs";
import path from "node:path";

const RACINE = "dist";

/**
 * Racine de publication, lue dans la configuration Astro.
 *
 * Les adresses du HTML la portent (`/rakiire/boutique`) alors que les fichiers
 * produits ne la connaissent pas (`dist/boutique/index.html`) : il faut la
 * retirer avant de comparer, sinon tout est signalé mort à tort.
 *
 * L'ancre de début de ligne est indispensable — sans elle, la première
 * occurrence trouvée était celle citée dans un commentaire de la configuration.
 */
const BASE = (
  fs.readFileSync("astro.config.mjs", "utf8").match(/^\s*base:\s*["']([^"']+)["']/m)?.[1] ?? ""
).replace(/\/$/, "");

function fichiersHtml(dossier) {
  return fs.readdirSync(dossier, { withFileTypes: true }).flatMap((entree) => {
    const p = path.join(dossier, entree.name);
    if (entree.isDirectory()) return fichiersHtml(p);
    return entree.name.endsWith(".html") ? [p] : [];
  });
}

if (!fs.existsSync(RACINE)) {
  console.error(`Dossier « ${RACINE} » introuvable. Lancez d'abord : npm run build`);
  process.exit(1);
}

const normaliser = (u) => u.replace(/\/$/, "") || "/";

const pages = fichiersHtml(RACINE);
const adresses = new Set(
  pages.map((p) => {
    const rel = path.relative(RACINE, p).split(path.sep).join("/");
    return normaliser("/" + rel.replace(/index\.html$/, ""));
  }),
);

const morts = [];
const externes = new Set();
const ancres = [];
let total = 0;

for (const page of pages) {
  const html = fs.readFileSync(page, "utf8");
  const rel = path.relative(RACINE, page).split(path.sep).join("/");
  const depuis = normaliser("/" + rel.replace(/index\.html$/, ""));

  const idsDePage = new Set([...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1]));

  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const href = m[1];
    total++;

    if (/^https?:/.test(href)) {
      externes.add(href.split("?")[0]);
      continue;
    }
    if (/^(mailto:|tel:|data:)/.test(href)) continue;

    // Ancre pure : la cible doit exister dans la page courante.
    if (href.startsWith("#")) {
      const id = href.slice(1);
      if (id && !idsDePage.has(id)) ancres.push({ depuis, vers: href });
      continue;
    }

    if (!href.startsWith("/")) continue;
    const [chemin] = href.split("#");

    // Une adresse interne DOIT porter la racine de publication : sans elle,
    // elle fonctionne en local et tombe en 404 une fois publiée.
    if (BASE && !chemin.startsWith(`${BASE}/`) && chemin !== BASE) {
      morts.push({ depuis, vers: `${href}   (racine ${BASE} manquante)` });
      continue;
    }

    const cible = normaliser(BASE ? chemin.slice(BASE.length) || "/" : chemin);
    if (/^\/(_astro|fonts|brand|favicon)/.test(cible)) continue;
    if (!adresses.has(cible)) morts.push({ depuis, vers: href });
  }
}

console.log(`racine de publication : ${BASE || "(aucune)"}`);
console.log(`pages construites     : ${pages.length}`);
console.log(`liens analyses        : ${total}`);
console.log("");

if (morts.length === 0) {
  console.log("OK — aucun lien interne mort");
} else {
  console.log(`ECHEC — ${morts.length} lien(s) mort(s) :`);
  for (const m of morts.slice(0, 25)) console.log(`   ${m.depuis}  ->  ${m.vers}`);
  if (morts.length > 25) console.log(`   … et ${morts.length - 25} autres`);
}

if (ancres.length) {
  console.log("");
  console.log(`Avertissement — ${ancres.length} ancre(s) sans cible dans leur page :`);
  const vus = new Set();
  for (const a of ancres) {
    if (vus.has(a.vers)) continue;
    vus.add(a.vers);
    console.log(`   ${a.depuis}  ->  ${a.vers}`);
  }
}

console.log("");
console.log("destinations externes :");
for (const e of [...externes].sort()) console.log(`   ${e}`);

// Un lien mort arrête la publication. Une ancre orpheline est un avertissement :
// elle peut être consommée par un script plutôt que par le défilement, comme
// les filtres de la boutique.
process.exit(morts.length === 0 ? 0 : 1);
