# Test de niveau

- Page publique : `/test` (20 questions existantes, barème conservé).
- Composant : `components/practice/level-test/LevelTest.tsx` ; styles : `app/test/test.css`.
- Questions et points : `data/level-test.ts`. Le barème côté SQL doit rester identique ; créer une nouvelle version en cas de changement.
- Progression : clé `langlistening:level-test:v1` dans le localStorage, expiration 24 heures après la dernière réponse ou navigation. Une session expirée est supprimée à la prochaine visite, ou à l’expiration si la page reste ouverte. Le navigateur ne permet pas de supprimer les données pendant qu’il est fermé.
- Aucun compte requis. Si le stockage local est bloqué, le test reste utilisable dans la page ouverte.

## Activer les statistiques

Après les migrations 001 à 003, exécuter **`supabase/migrations/004_level_test.sql`** dans le SQL Editor du projet Supabase (ou avec votre processus habituel de migrations). Les variables Supabase publiques existantes suffisent ; aucune clé service-role ni connexion anonyme Supabase Auth n’est nécessaire.

L’administration **`/admin/tests`**, réservée au rôle `admin`, affiche le nombre de tests terminés, la moyenne sur 100, le nombre de tests sur 30 jours et les quatre niveaux. Le lien se trouve dans `/admin`.

La base recalcule le score à partir des 20 réponses puis conserve uniquement l’identifiant aléatoire de la tentative, la version du test, le score, le niveau et la date. Les réponses détaillées ne sont pas conservées en base. Les visiteurs ne peuvent ni lire les résultats, ni insérer/modifier directement une ligne : la fonction publique contrôle le format et le barème. Le même identifiant ne peut être compté deux fois. Une nouvelle tentative est un nouveau test, pas nécessairement une nouvelle personne.

Les résultats non transmis sont réessayés toutes les 60 secondes pendant que la page est ouverte, au retour du réseau et lors d’une nouvelle visite, tant que la session locale n’a pas expiré ou été remplacée par un nouveau test. Sans migration appliquée, le test et sa reprise locale fonctionnent mais les statistiques ne sont pas enregistrées.

Ces statistiques décrivent les tests soumis, pas une mesure certifiée de visiteurs uniques : un test public peut être repassé ou automatisé. Le test ne mesure pas directement l’expression orale.

## Vérifications

`pnpm typecheck`, `pnpm lint`, `pnpm build`.
Vérifier aussi : sélection au clavier, retour à la question précédente, pause/reprise après rechargement, expiration, stockage bloqué, résultat hors ligne puis envoi, dédoublonnage, accès administrateur et refus d’accès anonyme aux résultats.
