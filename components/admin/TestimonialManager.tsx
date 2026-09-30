"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { MAX_PHOTO_BYTES, PHOTO_TYPES, TESTIMONIAL_BUCKET, testimonialMediaUrl, type TestimonialRow } from "@/lib/testimonials";

const empty = { name: "", role: "", role_en: "", message: "", message_en: "", published: false };
const field = "mt-2 w-full rounded-xl border border-black/15 bg-white px-3 py-2.5 text-sm focus:border-[#9b7921]";
const button = "rounded-full border border-black/15 px-4 py-2 text-sm disabled:opacity-40";

function usePhotoPreview(file: File | null, stored: string | null) {
  const [local, setLocal] = useState<string>();
  useEffect(() => {
    if (!file) { setLocal(undefined); return; }
    const url = URL.createObjectURL(file);
    setLocal(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  return file ? local : stored ? testimonialMediaUrl(stored) : undefined;
}

export default function TestimonialManager() {
  const [rows, setRows] = useState<TestimonialRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<TestimonialRow | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [certificate, setCertificate] = useState<File | null>(null);
  const [removeCertificate, setRemoveCertificate] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [failed, setFailed] = useState(false);
  const [inputKey, setInputKey] = useState(0);
  const lock = useRef(false);
  const draftId = useRef<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const portraitUrl = usePhotoPreview(photo, editing?.photo_path || null);
  const certificateUrl = usePhotoPreview(certificate, removeCertificate ? null : editing?.certificate_path || null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const client = createClient();
      if (!client) throw new Error();
      const { data, error } = await client.from("testimonials").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      setRows(data as TestimonialRow[]);
      setLoadError(false);
    } catch { setLoadError(true); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  function reset() {
    draftId.current = null;
    setForm(empty); setEditing(null); setPhoto(null); setCertificate(null);
    setRemoveCertificate(false); setInputKey(key => key + 1);
  }

  function edit(row: TestimonialRow) {
    setEditing(row);
    setForm({ name: row.name, role: row.role, role_en: row.role_en, message: row.message, message_en: row.message_en, published: row.published });
    setPhoto(null); setCertificate(null); setRemoveCertificate(false); setNotice("");
    setInputKey(key => key + 1);
    formRef.current?.scrollIntoView({ behavior: "instant", block: "start" });
    formRef.current?.querySelector<HTMLInputElement>("input[name=name]")?.focus({ preventScroll: true });
  }

  function chooseFile(file: File | undefined, kind: "photo" | "certificate") {
    if (!file) return;
    if (!PHOTO_TYPES[file.type] || file.size > MAX_PHOTO_BYTES || file.size === 0) {
      setFailed(true); setNotice("Choisissez une image JPG, PNG ou WebP de 5 Mo maximum.");
      setInputKey(key => key + 1); return;
    }
    if (kind === "photo") setPhoto(file);
    else { setCertificate(file); setRemoveCertificate(false); }
    setNotice("");
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (lock.current) return;
    if (!form.name.trim() || form.message.trim().length < 10 || (!photo && !editing?.photo_path)) {
      setFailed(true); setNotice("Ajoutez le nom, une photo et un message d’au moins 10 caractères."); return;
    }
    const client = createClient();
    if (!client) { setFailed(true); setNotice("Connexion à Supabase indisponible."); return; }
    lock.current = true; setBusy(true); setNotice("");
    const uploaded: string[] = [];
    const id = editing?.id || (draftId.current ??= crypto.randomUUID());
    let committed = false;
    try {
      async function upload(file: File) {
        const path = `${id}/${crypto.randomUUID()}.${PHOTO_TYPES[file.type]}`;
        const { error } = await client!.storage.from(TESTIMONIAL_BUCKET).upload(path, file, { contentType: file.type, upsert: false });
        if (error) throw new Error("Impossible d’envoyer la photo. Vérifiez la connexion et la configuration du stockage.");
        uploaded.push(path);
        return path;
      }
      const photoPath = photo ? await upload(photo) : editing!.photo_path;
      const certificatePath = certificate ? await upload(certificate) : removeCertificate ? null : editing?.certificate_path || null;
      const values = {
        ...form, name: form.name.trim(), role: form.role.trim(), role_en: form.role_en.trim(),
        message: form.message.trim(), message_en: form.message_en.trim(),
        photo_path: photoPath, certificate_path: certificatePath,
      };
      const query = editing ? client.from("testimonials").update(values).eq("id", id) : client.from("testimonials").upsert({ id, ...values });
      const { error } = await query.select("id").single();
      if (error) throw new Error("Enregistrement impossible. Vérifiez votre accès administrateur et la migration 008_testimonials.sql.");
      committed = true;
      const obsolete = [editing?.photo_path !== photoPath ? editing?.photo_path : null, editing?.certificate_path !== certificatePath ? editing?.certificate_path : null].filter((path): path is string => Boolean(path));
      let cleanupFailed = false;
      if (obsolete.length) {
        try { cleanupFailed = Boolean((await client.storage.from(TESTIMONIAL_BUCKET).remove(obsolete)).error); }
        catch { cleanupFailed = true; }
      }
      reset(); setFailed(false);
      setNotice(`${values.published ? "Témoignage publié sur la page Témoignages." : "Brouillon enregistré."}${cleanupFailed ? " Les anciennes images n’ont pas pu être supprimées du stockage." : ""}`);
      await load();
    } catch (error) {
      // A network failure can occur after a successful write. Never remove referenced media.
      let cleanupFailed = false;
      if (!committed && uploaded.length) {
        try {
          const { data: stored, error: lookupError } = await client.from("testimonials").select("photo_path,certificate_path").eq("id", id).maybeSingle();
          if (lookupError) cleanupFailed = true;
          else {
            const unused = uploaded.filter(path => path !== stored?.photo_path && path !== stored?.certificate_path);
            if (unused.length) cleanupFailed = Boolean((await client.storage.from(TESTIMONIAL_BUCKET).remove(unused)).error);
          }
        }
        catch { cleanupFailed = true; }
      }
      setFailed(true);
      setNotice(`${error instanceof Error ? error.message : "Une erreur est survenue. Réessayez."}${cleanupFailed ? " Des images envoyées restent dans le bucket testimonials." : ""}`);
    } finally { lock.current = false; setBusy(false); }
  }

  async function change(row: TestimonialRow, action: "toggle" | "delete") {
    if (lock.current) return;
    if (action === "delete" && !window.confirm(`Supprimer définitivement le témoignage de ${row.name} et ses photos ?`)) return;
    const client = createClient();
    if (!client) return;
    lock.current = true; setBusy(true); setNotice("");
    try {
      const query = action === "delete" ? client.from("testimonials").delete().eq("id", row.id) : client.from("testimonials").update({ published: !row.published }).eq("id", row.id);
      const { error } = await query.select("id").single();
      if (error) throw new Error("Modification impossible. Vérifiez votre connexion et vos droits.");
      let cleanupFailed = false;
      if (action === "delete") {
        try { cleanupFailed = Boolean((await client.storage.from(TESTIMONIAL_BUCKET).remove([row.photo_path, row.certificate_path].filter((p): p is string => Boolean(p)))).error); }
        catch { cleanupFailed = true; }
      }
      if (editing?.id === row.id) {
        if (action === "delete") reset();
        else { setEditing({ ...row, published: !row.published }); setForm(current => ({ ...current, published: !row.published })); }
      }
      setFailed(false); setNotice(action === "delete" ? `Témoignage supprimé.${cleanupFailed ? " Certaines photos restent dans le stockage." : ""}` : row.published ? "Témoignage masqué." : "Témoignage publié.");
      await load();
    } catch (error) { setFailed(true); setNotice(error instanceof Error ? error.message : "Opération impossible."); }
    finally { lock.current = false; setBusy(false); }
  }

  return <main className="mx-auto max-w-[1450px] px-5 py-8 md:px-9">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs uppercase tracking-widest text-[#9b7921]">La parole aux élèves</p><h1 className="mt-2 font-serif text-4xl">Témoignages</h1><p className="mt-3 text-sm text-black/60">Portrait, expérience et certificat : préparez un brouillon ou publiez directement.</p></div><Link href="/testimony" target="_blank" className={button}>Voir la page publique ↗</Link></div>
    {notice && <p role={failed ? "alert" : "status"} className={`mt-5 rounded-xl border p-4 text-sm ${failed ? "border-red-200 bg-red-50 text-red-800" : "border-green-200 bg-green-50 text-green-900"}`}>{notice}</p>}
    {loadError && <div role="alert" className="mt-5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm">Chargement impossible. Vérifiez Supabase et appliquez la migration <code>008_testimonials.sql</code> si nécessaire. <button type="button" onClick={() => void load()} disabled={busy || loading} className="underline">Réessayer</button></div>}
    <div className="mt-7 grid items-start gap-7 xl:grid-cols-[1.15fr_1fr]">
      <form ref={formRef} onSubmit={save} className="scroll-mt-24 rounded-2xl border border-black/10 bg-white p-5 md:p-7">
        <h2 className="mb-5 font-serif text-2xl">{editing ? "Modifier le témoignage" : "Nouveau témoignage"}</h2>
        <fieldset disabled={busy || loading || loadError} className="space-y-5 disabled:opacity-60">
          <label className="block text-sm font-medium">Nom de l’élève *<input name="name" className={field} maxLength={100} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></label>
          <label className="block text-sm font-medium">Profession ou parcours (facultatif)<input className={field} maxLength={150} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="Ex. Entrepreneur · Programme Business" /></label>
          <label className="block text-sm font-medium">Message de l’élève *<textarea className={field} rows={5} minLength={10} maxLength={2000} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required /></label>
          <div className="grid gap-4 sm:grid-cols-2" key={inputKey}>
            <label className="block min-w-0 text-sm font-medium">Photo de l’élève *<input className="mt-2 w-full text-xs" type="file" accept="image/jpeg,image/png,image/webp" onChange={e => chooseFile(e.target.files?.[0], "photo")} /><span className="mt-2 block text-xs font-normal text-black/50">{photo?.name || (editing ? "Photo existante conservée" : "JPG, PNG, WebP · 5 Mo max.")}</span></label>
            <div className="min-w-0"><label className="block text-sm font-medium">Certificat (facultatif)<input className="mt-2 w-full text-xs" type="file" accept="image/jpeg,image/png,image/webp" onChange={e => chooseFile(e.target.files?.[0], "certificate")} /><span className="mt-2 block text-xs font-normal text-black/50">{certificate?.name || "JPG, PNG, WebP · 5 Mo max."}</span></label>{certificateUrl && <button type="button" className="mt-2 text-xs text-red-700 underline" onClick={() => { setCertificate(null); setRemoveCertificate(true); setInputKey(key => key + 1); }}>Retirer le certificat</button>}</div>
          </div>
          <details className="rounded-xl border border-black/10 p-4"><summary className="cursor-pointer text-sm">Version anglaise (facultative)</summary><p className="mt-2 text-xs text-black/50">Sans traduction, le texte original reste affiché.</p><label className="mt-3 block text-sm">Profession en anglais<input className={field} maxLength={150} value={form.role_en} onChange={e => setForm({ ...form, role_en: e.target.value })} /></label><label className="mt-3 block text-sm">Message en anglais<textarea className={field} rows={4} maxLength={2000} value={form.message_en} onChange={e => setForm({ ...form, message_en: e.target.value })} /></label></details>
          <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} />Publier sur la page Témoignages</label>
          <div className="flex flex-wrap gap-3"><button className="rounded-full bg-[#171812] px-6 py-3 text-sm font-semibold text-[#e8c96a]">{busy ? "Enregistrement…" : form.published ? "Enregistrer et publier" : "Enregistrer le brouillon"}</button><button type="button" className={button} onClick={reset}>{editing ? "Annuler la modification" : "Réinitialiser"}</button></div>
        </fieldset>
      </form>
      <div className="space-y-6">
        <section aria-label="Aperçu du témoignage" className="rounded-3xl bg-[#10110e] p-6 text-white">
          <p className="mb-5 text-xs uppercase tracking-widest text-[#e8c96a]">Aperçu</p>
          <div className="flex items-center gap-4">{portraitUrl ? <Image unoptimized src={portraitUrl} alt={form.name || "Portrait"} width={76} height={76} className="h-[76px] w-[76px] rounded-full border border-[#c9a84c]/40 object-cover" /> : <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#c9a84c]/40 text-2xl text-[#e8c96a]">{form.name.trim()[0] || "?"}</span>}<div><h3 className="break-words font-semibold">{form.name || "Nom de l’élève"}</h3><p className="text-sm text-white/60">{form.role || "Apprenant"}</p></div></div>
          <blockquote className="mt-5 whitespace-pre-wrap break-words text-lg leading-relaxed">“{form.message || "Son expérience avec LangListening apparaîtra ici."}”</blockquote>
          {certificateUrl && <div className="mt-5 border-t border-white/10 pt-4"><p className="mb-3 text-xs text-[#e8c96a]">Certificat joint</p><Image unoptimized src={certificateUrl} alt="Aperçu du certificat" width={280} height={180} className="max-h-44 w-auto max-w-full rounded-lg object-contain" /></div>}
        </section>
        <section className="rounded-2xl border border-black/10 bg-white p-5">
          <h2 className="font-serif text-2xl">Vos témoignages {!loading && `(${rows.length})`}</h2>
          {loading ? <p className="mt-4 text-sm" role="status">Chargement…</p> : !loadError && !rows.length ? <p className="mt-4 text-sm text-black/60">Ajoutez votre premier témoignage. Les témoignages historiques du site restent affichés.</p> : null}
          <div className="mt-4 space-y-4">{rows.map(row => <article key={row.id} className="rounded-xl border border-black/10 p-4">
            <div className="flex items-center gap-3"><Image unoptimized src={testimonialMediaUrl(row.photo_path)} alt={row.name} width={48} height={48} className="h-12 w-12 rounded-full object-cover" /><div className="min-w-0"><h3 className="break-words font-semibold">{row.name}</h3><span className={`text-xs ${row.published ? "text-green-800" : "text-black/50"}`}>{row.published ? "Publié" : "Brouillon / masqué"}{row.certificate_path ? " · Certificat joint" : ""}</span></div></div>
            <p className="mt-3 line-clamp-3 break-words text-sm text-black/60">{row.message}</p>
            <div className="mt-4 flex flex-wrap gap-2"><button type="button" className={button} disabled={busy} onClick={() => edit(row)}>Modifier</button><button type="button" className={button} disabled={busy} onClick={() => void change(row, "toggle")}>{row.published ? "Masquer" : "Publier"}</button><button type="button" className={`${button} text-red-700`} disabled={busy} onClick={() => void change(row, "delete")}>Supprimer</button></div>
          </article>)}</div>
        </section>
      </div>
    </div>
  </main>;
}
