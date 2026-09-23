import { createClient } from "@/lib/supabase/server";
import AdminMessages, { type AdminMessage } from "@/components/admin/AdminMessages";

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const [{ data: registrations }, { data: contacts }, { data: chatMessages }] = await Promise.all([
    supabase.from("programme_registrations").select("id,name,email,phone,level,programme,selected_offer,motivation,status,created_at").order("created_at", { ascending: false }).limit(200),
    supabase.from("contact_submissions").select("id,name,email,phone,level,message,status,created_at").order("created_at", { ascending: false }).limit(200),
    supabase.from("messages").select("id,conversation_id,sender_id,body,lesson_id,context,created_at").order("created_at", { ascending: false }).limit(200),
  ]);

  const items: AdminMessage[] = [
    ...(registrations || []).map((item) => ({
      id: item.id, source: "registration" as const, title: item.name, email: item.email, phone: item.phone,
      message: item.motivation, status: item.status, createdAt: item.created_at,
      details: [item.selected_offer === "group" ? "Programme en groupe — 49 $ / mois" : item.selected_offer === "coaching" ? "Coaching individuel — 149 $ / mois" : null, item.programme, item.level].filter(Boolean).join(" · "),
    })),
    ...(contacts || []).map((item) => ({
      id: item.id, source: "contact" as const, title: item.name, email: item.email, phone: item.phone,
      message: item.message, status: item.status, createdAt: item.created_at, details: item.level || "",
    })),
    ...(chatMessages || []).map((item) => ({
      id: item.id, source: "exercise" as const, title: item.lesson_id || item.context ? "Question après un exercice" : "Message d’un élève",
      message: item.body, status: "conversation", createdAt: item.created_at,
      details: item.context ? item.context.replace("lesson:", "Leçon ") : item.lesson_id ? `Leçon ${item.lesson_id.slice(0, 8)}` : `Élève ${item.sender_id.slice(0, 8)}`,
      href: `/chat?conversation=${item.conversation_id}`,
    })),
  ].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  return <AdminMessages initialMessages={items} />;
}
