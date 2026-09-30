# Témoignages administrables

## Activation

Appliquer `supabase/migrations/008_testimonials.sql` dans le SQL Editor du projet Supabase, après les migrations existantes. Cette migration ajoute la table `testimonials`, ses règles RLS et le bucket `testimonials` (JPG, PNG, WebP, 5 Mo maximum par image).

L’administration est accessible dans **Admin → Témoignages**, à `/admin/testimonials`. Le rôle `admin` du profil est nécessaire pour créer, modifier, publier, masquer ou supprimer. Les visiteurs ne peuvent lire que les lignes publiées ; ils ne peuvent pas modifier les données ou envoyer des fichiers. La clé secrète Supabase n’est pas utilisée par cette fonctionnalité et ne doit jamais être exposée dans le navigateur.

## Utilisation

1. Saisir le nom, le message et choisir la photo de l’élève.
2. Ajouter éventuellement sa profession, son certificat et une traduction anglaise.
3. Vérifier l’aperçu puis enregistrer en brouillon ou cocher « Publier ».
4. La page `/testimony` charge les publications à chaque visite, les plus récentes en premier, suivies des témoignages historiques dans `data/testimonials.ts`.

Les témoignages historiques restent gérés dans le code. Sans traduction anglaise, le texte original est conservé. Le certificat s’ouvre dans une fenêtre agrandie accessible au clavier (Échap pour fermer).

Les images du bucket sont publiques : un brouillon ou un témoignage masqué n’apparaît pas sur la page, mais une personne possédant l’URL d’une photo peut encore l’ouvrir. La suppression efface également les fichiers associés ; un remplacement supprime les anciens fichiers après l’enregistrement. Un échec de nettoyage est signalé dans l’administration. Les caches de médias peuvent conserver temporairement une ancienne image.

En cas d’échec d’enregistrement, le formulaire reste rempli. Les fichiers non référencés sont nettoyés lorsque la base permet de confirmer qu’ils ne sont pas utilisés. En cas d’incertitude réseau, ils sont conservés pour ne pas casser une publication et un message le signale.

Sans migration ou si Supabase est indisponible, la page publique conserve les témoignages historiques ; l’administration signale l’erreur au lieu d’afficher une liste vide trompeuse.
