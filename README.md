# LangListening

Plateforme bilingue d'apprentissage de l'anglais avec tests de placement, exercices oraux et écrits, progression synchronisée, blog et espace d'administration.

## Structure du projet

- `app/` : pages, routes API et styles globaux Next.js.
- `components/` : composants regroupés par fonctionnalité ; voir le [guide d'organisation](components/README.md).
- `context/` : contextes React pour la langue et le blog.
- `data/` : contenus statiques, parcours, exercices et données de l'accueil.
- `lib/` : clients Supabase et fonctions de synchronisation.
- `types/` : types partagés.
- `public/` : images et fichiers audio.
- `supabase/migrations/` : migrations de la base de données.

## Prérequis

- Node.js 20+
- pnpm
- un projet Supabase
- un compte SMTP Gmail avec mot de passe d'application

## Installation

```bash
pnpm install
copy .env.example .env.local
pnpm dev
```

Renseignez les variables de `.env.local`, puis exécutez dans l'ordre `supabase/migrations/001_platform.sql` et `supabase/migrations/002_learning_ecosystem.sql` dans le SQL Editor de Supabase.

## Premier administrateur

### Test de niveau et statistiques anonymes

Le test `/test` conserve la progression pendant 24 heures sur l’appareil. Pour activer l’enregistrement des scores et la moyenne dans `/admin/tests`, appliquer aussi les migrations `003_chat_notifications.sql` et `004_level_test.sql` après les deux premières. Voir [le fonctionnement du test](docs/level-test.md).

### Créer le compte administrateur

1. Créez un compte depuis `/auth`.
2. Dans Supabase, ouvrez la table `profiles`.
3. Passez la colonne `role` du compte de `student` à `admin`.

L'accès à `/admin` est vérifié côté serveur. Les règles RLS empêchent un utilisateur non administrateur de modifier les articles en appelant directement l'API.

## Commandes

```bash
pnpm dev
pnpm typecheck
pnpm lint
pnpm build
```

La progression reste aussi en cache dans le navigateur. Elle est importée dans le compte lors de la première connexion.

## Prototype IA gratuit

Les corrections premium utilisent le Free Tier Gemini. Créez une clé dans Google AI Studio et renseignez :

```env
GEMINI_API_KEY=votre-cle
GEMINI_MODEL=gemini-2.5-flash-lite
```

La clé reste côté serveur. Sans clé ou lorsque le quota gratuit est épuisé, une correction locale moins précise prend automatiquement le relais. Le niveau gratuit de Gemini peut utiliser les requêtes pour améliorer les produits Google : n'envoyez pas d'informations professionnelles confidentielles pendant le prototype.

Pour donner un accès à `/practicepremium`, ajoutez une ligne dans `enrollments` depuis Supabase :

```sql
insert into public.enrollments (user_id, track, plan, status)
values ('UUID_DE_L_UTILISATEUR', 'developer', 'test', 'active');
```

Les parcours possibles sont `developer`, `business` et `professional`. Pour assigner un coach, passez d'abord son rôle à `coach`, puis renseignez son UUID dans `assigned_coach_id`.

## Déploiement

Le projet est adapté à Vercel. Ajoutez les variables de `.env.example` dans les paramètres du projet. Ne publiez jamais `.env.local` ni la clé `service_role` de Supabase.
