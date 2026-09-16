# Photos et vidéos de la page Témoignages

La page est accessible à `/testimony`. Ses contenus sont gérés dans `data/testimonials.ts`.

## Portrait d'un élève

1. Ajouter la photo dans ce dossier, par exemple `milka.jpg`.
2. Ajouter `photo: "/testimonials/milka.jpg"` à l'entrée correspondante de `TESTIMONIALS`.
3. Si nécessaire, préciser `photoPosition: "center 25%"` pour ajuster le cadrage.

Sans portrait, les initiales sont affichées. Les noms, rôles et citations existants sont conservés. Ajouter une nouvelle entrée avec un `id` unique pour un autre témoignage.

## Galerie photo

Ajouter une entrée à `TESTIMONIAL_PHOTOS` :

```ts
{
  id: "session-groupe",
  src: "/testimonials/session-groupe.jpg",
  caption: {
    fr: "Votre légende en français",
    en: "Your caption in English",
  },
}
```

Les photos peuvent être agrandies au clic. La galerie est masquée tant que la liste est vide.

## Témoignages vidéo

Ajouter une entrée à `TESTIMONIAL_VIDEOS` :

```ts
{
  id: "student-milka-video",
  youtubeUrl: "COLLER_ICI_LE_LIEN_YOUTUBE",
  title: { fr: "Le témoignage de Milka", en: "Milka's story" },
  description: { fr: "Votre description", en: "Your description" },
}
```

Les liens `youtube.com/watch?v=…`, `youtu.be/…`, `/shorts/…`, `/live/…` et `/embed/…` sont acceptés. Utiliser des identifiants uniques pour les vidéos ; le préfixe `method-` est réservé aux vidéos pédagogiques. Les URL invalides sont ignorées. L'intégration sur d'autres sites doit être autorisée par le propriétaire de la vidéo.

Le lecteur apparaît au clic. Une seule vidéo est lue à la fois sur cette page. La section des témoignages vidéo est masquée tant qu'aucun lien valide n'est renseigné.

Les vidéos pédagogiques de l'accueil, partagées via `data/videos.ts`, sont présentées séparément sous « Découvrez notre méthode en vidéo ». Elles ne sont pas présentées comme des témoignages d'élèves.
