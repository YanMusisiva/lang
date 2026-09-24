import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const roleSchema = z.enum(["student", "coach", "admin"]);
const createSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(72),
  displayName: z.string().trim().min(2).max(80),
  role: roleSchema,
});
const updateSchema = z.object({ id: z.string().uuid(), role: roleSchema });
const deleteSchema = z.object({ id: z.string().uuid() });

async function authorize() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: NextResponse.json({ error: "Connexion requise." }, { status: 401 }) };
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (profile?.role !== "admin") return { error: NextResponse.json({ error: "Accès administrateur requis." }, { status: 403 }) };
  const admin = createAdminClient();
  if (!admin) return { error: NextResponse.json({ error: "Ajoutez SUPABASE_SECRET_KEY aux variables serveur pour gérer les utilisateurs." }, { status: 503 }) };
  return { user, admin };
}

export async function GET() {
  const auth = await authorize();
  if ("error" in auth) return auth.error;
  const { data, error } = await auth.admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  const ids = data.users.map((user) => user.id);
  const { data: profiles } = ids.length
    ? await auth.admin.from("profiles").select("id,display_name,role,created_at").in("id", ids)
    : { data: [] };
  const profileMap = new Map((profiles || []).map((profile) => [profile.id, profile]));
  return NextResponse.json({
    currentUserId: auth.user.id,
    users: data.users.map((user) => ({
      id: user.id,
      email: user.email || "",
      emailConfirmed: Boolean(user.email_confirmed_at),
      lastSignInAt: user.last_sign_in_at,
      createdAt: user.created_at,
      displayName: profileMap.get(user.id)?.display_name || user.user_metadata?.display_name || "",
      role: profileMap.get(user.id)?.role || "student",
    })),
  });
}

export async function POST(request: Request) {
  const auth = await authorize();
  if ("error" in auth) return auth.error;
  const parsed = createSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Informations utilisateur invalides." }, { status: 400 });
  const { email, password, displayName, role } = parsed.data;
  const { data, error } = await auth.admin.auth.admin.createUser({
    email: email.toLowerCase(), password, email_confirm: true,
    user_metadata: { display_name: displayName },
  });
  if (error || !data.user) return NextResponse.json({ error: error?.message || "Création impossible." }, { status: 400 });
  const { error: profileError } = await auth.admin.from("profiles").upsert({ id: data.user.id, display_name: displayName, role });
  if (profileError) {
    await auth.admin.auth.admin.deleteUser(data.user.id);
    return NextResponse.json({ error: profileError.message }, { status: 400 });
  }
  return NextResponse.json({ success: true }, { status: 201 });
}

export async function PATCH(request: Request) {
  const auth = await authorize();
  if ("error" in auth) return auth.error;
  const parsed = updateSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Modification invalide." }, { status: 400 });
  if (parsed.data.id === auth.user.id && parsed.data.role !== "admin") return NextResponse.json({ error: "Vous ne pouvez pas retirer votre propre rôle administrateur." }, { status: 400 });
  const { error } = await auth.admin.from("profiles").update({ role: parsed.data.role }).eq("id", parsed.data.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const auth = await authorize();
  if ("error" in auth) return auth.error;
  const parsed = deleteSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Utilisateur invalide." }, { status: 400 });
  if (parsed.data.id === auth.user.id) return NextResponse.json({ error: "Vous ne pouvez pas supprimer votre propre compte." }, { status: 400 });
  const { error } = await auth.admin.auth.admin.deleteUser(parsed.data.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
