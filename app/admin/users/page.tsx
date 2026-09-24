"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Search, Trash2, UserPlus, Users } from "lucide-react";

type Role = "student" | "coach" | "admin";
type ManagedUser = { id: string; email: string; displayName: string; role: Role; emailConfirmed: boolean; createdAt: string; lastSignInAt: string | null };
const roleLabels: Record<Role, string> = { student: "Client", coach: "Coach", admin: "Administrateur" };

export default function AdminUsersPage() {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ displayName: "", email: "", password: "", role: "student" as Role });

  const loadUsers = useCallback(async () => {
    setLoading(true); setError("");
    const response = await fetch("/api/admin/users", { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) setError(data.error || "Impossible de charger les utilisateurs.");
    else { setUsers(data.users); setCurrentUserId(data.currentUserId); }
    setLoading(false);
  }, []);
  useEffect(() => { void loadUsers(); }, [loadUsers]);

  const filtered = useMemo(() => users.filter((user) => `${user.displayName} ${user.email} ${roleLabels[user.role]}`.toLowerCase().includes(query.toLowerCase())), [query, users]);

  async function createUser(event: React.FormEvent) {
    event.preventDefault(); setBusy("create"); setError(""); setNotice("");
    const response = await fetch("/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await response.json(); setBusy("");
    if (!response.ok) { setError(data.error || "Création impossible."); return; }
    setForm({ displayName: "", email: "", password: "", role: "student" }); setShowCreate(false); setNotice("Le compte a été créé et son adresse e-mail est confirmée."); await loadUsers();
  }

  async function changeRole(user: ManagedUser, role: Role) {
    const previous = users; setBusy(user.id); setError(""); setUsers((items) => items.map((item) => item.id === user.id ? { ...item, role } : item));
    const response = await fetch("/api/admin/users", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: user.id, role }) });
    const data = await response.json(); setBusy("");
    if (!response.ok) { setUsers(previous); setError(data.error || "Modification impossible."); }
  }

  async function removeUser(user: ManagedUser) {
    if (!window.confirm(`Supprimer définitivement le compte de ${user.email} ? Sa progression et ses données associées seront également supprimées.`)) return;
    setBusy(user.id); setError("");
    const response = await fetch("/api/admin/users", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: user.id }) });
    const data = await response.json(); setBusy("");
    if (!response.ok) { setError(data.error || "Suppression impossible."); return; }
    setUsers((items) => items.filter((item) => item.id !== user.id)); setNotice("Le compte a été supprimé.");
  }

  const input = "w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#a8811f] focus:ring-2 focus:ring-[#c9a84c]/15";
  return <main className="mx-auto max-w-[1500px] px-5 py-8 md:px-9 md:py-10">
    <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9b7921]">Comptes</p><h1 className="mt-2 font-serif text-3xl md:text-5xl">Utilisateurs</h1><p className="mt-3 text-sm text-black/50">Gérez les clients, les coachs et les administrateurs.</p></div><button onClick={() => setShowCreate((value) => !value)} className="inline-flex items-center gap-2 rounded-lg bg-[#11120f] px-5 py-3 text-sm font-semibold text-[#e2c66d]"><UserPlus size={18} /> Ajouter un utilisateur</button></div>
    {error && <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}{notice && <p role="status" className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">{notice}</p>}
    {showCreate && <form onSubmit={createUser} className="mt-7 rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm"><h2 className="font-serif text-2xl">Créer un compte</h2><p className="mt-1 text-xs text-black/45">Le compte est créé comme confirmé. Communiquez le mot de passe temporaire à la personne de manière sécurisée.</p><div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4"><input className={input} required minLength={2} placeholder="Nom complet" value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} /><input className={input} required type="email" placeholder="Adresse e-mail" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><input className={input} required minLength={8} type="password" placeholder="Mot de passe temporaire" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /><select className={input} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })}>{Object.entries(roleLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div><div className="mt-5 flex gap-3"><button disabled={busy === "create"} className="rounded-lg bg-[#c9a84c] px-5 py-2.5 text-sm font-semibold text-black disabled:opacity-50">{busy === "create" ? "Création…" : "Créer le compte"}</button><button type="button" onClick={() => setShowCreate(false)} className="px-4 py-2 text-sm text-black/50">Annuler</button></div></form>}
    <section className="mt-7 overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.07] p-5"><div className="flex items-center gap-3"><span className="rounded-xl bg-[#f4edd7] p-2.5 text-[#967316]"><Users size={19} /></span><strong>{users.length} utilisateur{users.length === 1 ? "" : "s"}</strong></div><label className="relative w-full sm:w-80"><Search className="absolute left-4 top-3.5 text-black/30" size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher…" className={`${input} pl-11`} /></label></div>
      {loading ? <p className="p-10 text-center text-sm text-black/40">Chargement des comptes…</p> : <div className="overflow-x-auto"><table className="w-full min-w-[800px] text-left"><thead className="bg-[#f7f5ee] text-xs uppercase tracking-wide text-black/45"><tr><th className="px-5 py-4">Utilisateur</th><th className="px-5 py-4">Rôle</th><th className="px-5 py-4">E-mail</th><th className="px-5 py-4">Inscription</th><th className="px-5 py-4 text-right">Action</th></tr></thead><tbody className="divide-y divide-black/[0.06]">{filtered.map((user) => <tr key={user.id} className="hover:bg-[#faf9f5]"><td className="px-5 py-4"><p className="font-medium">{user.displayName || "Sans nom"}{user.id === currentUserId && <span className="ml-2 rounded-full bg-[#f4edd7] px-2 py-0.5 text-[10px] text-[#806316]">Vous</span>}</p><p className="mt-1 text-xs text-black/40">{user.email}</p></td><td className="px-5 py-4"><select disabled={busy === user.id || user.id === currentUserId} value={user.role} onChange={(e) => void changeRole(user, e.target.value as Role)} className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm disabled:opacity-50">{Object.entries(roleLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs ${user.emailConfirmed ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>{user.emailConfirmed ? "Confirmé" : "En attente"}</span></td><td className="px-5 py-4 text-sm text-black/45">{new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(new Date(user.createdAt))}</td><td className="px-5 py-4 text-right"><button disabled={busy === user.id || user.id === currentUserId} onClick={() => void removeUser(user)} aria-label={`Supprimer ${user.email}`} className="rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-25"><Trash2 size={18} /></button></td></tr>)}</tbody></table>{!filtered.length && <p className="p-10 text-center text-sm text-black/40">Aucun utilisateur trouvé.</p>}</div>}
    </section>
  </main>;
}
