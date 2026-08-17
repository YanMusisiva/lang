# LangListening

Plateforme bilingue d'apprentissage de l'anglais avec tests de placement, exercices oraux et écrits, progression synchronisée, blog et espace d'administration.

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

Renseignez les variables de `.env.local`, puis exécutez `supabase/migrations/001_platform.sql` dans le SQL Editor de Supabase.

## Premier administrateur

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

## Déploiement

Le projet est adapté à Vercel. Ajoutez les variables de `.env.example` dans les paramètres du projet. Ne publiez jamais `.env.local` ni la clé `service_role` de Supabase.
