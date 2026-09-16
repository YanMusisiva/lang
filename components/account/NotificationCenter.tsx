"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  href: string | null;
  read_at: string | null;
  created_at: string;
};

export default function NotificationCenter({ userId, initialNotifications }: { userId: string; initialNotifications: NotificationItem[] }) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unread = notifications.filter((notification) => !notification.read_at).length;

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;

    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notifications", filter: `user_id=eq.${userId}` },
        (payload: { eventType: string; new: Record<string, unknown> }) => {
          if (payload.eventType === "INSERT") {
            const notification = payload.new as NotificationItem;
            setNotifications((current) => current.some((item) => item.id === notification.id) ? current : [notification, ...current].slice(0, 20));
          }
          if (payload.eventType === "UPDATE") {
            const notification = payload.new as NotificationItem;
            setNotifications((current) => current.map((item) => item.id === notification.id ? notification : item));
          }
        },
      )
      .subscribe();

    return () => { void supabase.removeChannel(channel); };
  }, [userId]);

  async function markAsRead(id: string) {
    const supabase = createClient();
    if (!supabase) return;
    const readAt = new Date().toISOString();
    const { error } = await supabase.from("notifications").update({ read_at: readAt }).eq("id", id).eq("user_id", userId);
    if (!error) setNotifications((current) => current.map((item) => item.id === id ? { ...item, read_at: readAt } : item));
  }

  return (
    <section className="mt-10 border-t border-white/10 pt-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-3 font-serif text-3xl"><Bell className="text-[#c9a84c]" size={22} />Notifications</h2>
        <span className="text-sm text-white/45">{unread} non lue(s)</span>
      </div>
      <div className="mt-5 space-y-2">
        {notifications.length === 0 && <p className="text-sm text-white/40">Aucune notification pour le moment.</p>}
        {notifications.map((notification) => (
          <div key={notification.id} className={`flex items-start gap-3 rounded border p-4 ${notification.read_at ? "border-white/10 text-white/50" : "border-[#c9a84c]/35 bg-[#c9a84c]/[0.04]"}`}>
            <Link href={notification.href || "/dashboard"} onClick={() => void markAsRead(notification.id)} className="min-w-0 flex-1">
              <p className="font-medium text-white">{notification.title}</p>
              <p className="mt-1 truncate text-sm">{notification.body}</p>
              <p className="mt-2 text-xs text-white/30">{new Date(notification.created_at).toLocaleString("fr-FR")}</p>
            </Link>
            {!notification.read_at && <button type="button" onClick={() => void markAsRead(notification.id)} title="Marquer comme lue" aria-label="Marquer la notification comme lue" className="grid h-9 w-9 shrink-0 place-items-center rounded border border-white/15 text-white/55 hover:text-[#e8c96a]"><Check size={16} /></button>}
          </div>
        ))}
      </div>
    </section>
  );
}
