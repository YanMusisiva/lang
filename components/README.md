# Organisation des composants

Les composants sont regroupés par fonctionnalité. Les pages et les routes restent dans `app/` ; les données statiques se trouvent dans `data/`.

| Dossier | Contenu |
| --- | --- |
| `home/` | Sections de l'accueil : introduction, méthode, communauté, tarifs, garanties. |
| `layout/` | Navigation principale, pied de page et navigation de l'espace personnel. |
| `motion/` | Animations réutilisables : apparition au défilement et repère circulaire. |
| `account/` | Déconnexion et centre de notifications. |
| `learning/` | Fonctions partagées de l'apprentissage : synchronisation de progression et mini-leçons. |
| `practice/` | Exercices oraux et écrits, fenêtre de test de placement. |
| `practice/level-test/` | Test de niveau public, reprise temporaire et résultat. |
| `premium/` | Interface de pratique premium. |
| `chat/` | Interface de conversation. |
| `testimony/` | Page des témoignages, portraits, galerie photo et vidéos YouTube. |
| `ui/` | Éléments réutilisables : bouton de démarrage et lecteur vidéo. |

## Ajouter un composant

- Placer un composant spécifique dans le dossier de sa fonctionnalité.
- Réserver `ui/` aux éléments partagés entre plusieurs écrans, sans créer un dossier par fichier.
- Utiliser les imports directs avec l'alias `@/`, par exemple `@/components/layout/Navbar` ou `@/components/motion/RevealWrapper`.
- Conserver les noms de fichiers en PascalCase et les noms de dossiers en minuscules.
- Garder `"use client"` uniquement lorsque le composant utilise des hooks ou des interactions côté navigateur.

Les contenus de l'accueil sont dans `data/home.ts`. Les styles communs de la refonte sont dans `app/design.css`, importé par `app/globals.css`.
