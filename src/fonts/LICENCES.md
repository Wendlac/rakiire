# Licences des fontes

Les deux familles sont auto-hébergées : les fichiers de ce dossier sont
redistribués avec le site. Leurs licences l'autorisent, à condition d'en
conserver la trace — c'est l'objet de ce fichier.

## Goudy Bookletter 1911

- **Fichier** : `GoudyBookletter1911-Regular.woff2` (26 Ko)
- **Auteur** : Barry Schwartz
- **Licence** : SIL Open Font License, version 1.1
- **Source** : Google Fonts — <https://fonts.google.com/specimen/Goudy+Bookletter+1911>

La licence OFL autorise l'usage, la modification et la redistribution, y compris
commerciale, y compris intégrée à un site. Elle interdit en revanche de vendre
la fonte seule, et impose que toute version modifiée change de nom.

> **À faire si un conseil juridique l'exige** : joindre le texte intégral de la
> licence OFL 1.1 à côté de ce fichier. Je ne l'ai pas recopié de mémoire —
> reproduire un texte légal de tête est le meilleur moyen d'en publier une
> version fausse. Il se récupère sur
> <https://openfontlicense.org> ou dans le dépôt Google Fonts.

Cette famille n'existe **qu'en un seul style** : 400 romain. Ni graisse, ni
italique. Toute hiérarchie typographique doit donc se jouer sur la taille,
l'interlettrage et le blanc — jamais sur le gras, qui produirait une fausse
graisse synthétique et abîmerait le dessin des lettres.

## Satoshi

- **Fichiers** : `Satoshi-Variable.woff2` et `Satoshi-VariableItalic.woff2`
  (42 et 43 Ko), fontes variables couvrant les graisses 300 à 900
- **Éditeur** : Indian Type Foundry
- **Licence** : ITF Free Font Licence
- **Source** : Fontshare — <https://www.fontshare.com/fonts/satoshi>

La licence Fontshare autorise l'usage personnel et commercial, l'intégration
dans un site et la redistribution du fichier au sein d'un projet. Elle interdit
la revente de la fonte elle-même.

## Pourquoi ces fichiers vivent dans `src/` et non `public/`

Placés dans `src/fonts/`, ils passent par la chaîne de construction : celle-ci
applique la racine de publication (`/rakiire` sur GitHub Pages) et une empreinte
de contenu dans le nom du fichier. Dans `public/`, ils auraient été servis tels
quels depuis une adresse absolue — qui aurait fonctionné en développement puis
renvoyé une erreur 404 une fois le site publié sous un sous-chemin.
