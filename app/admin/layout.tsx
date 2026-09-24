import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) redirect("/auth?next=/admin");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth?next=/admin");
  const { data: profile } = await supabase.from("profiles").select("role, display_name").eq("id", user.id).single();
  if (profile?.role !== "admin") redirect("/dashboard");
  return <AdminShell email={user.email || ""} name={profile.display_name}>{children}</AdminShell>;
}
