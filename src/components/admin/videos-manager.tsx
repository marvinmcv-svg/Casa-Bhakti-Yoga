"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { useSiteData, type Video } from "@/hooks/use-site-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { MediaPicker } from "@/components/admin/media-picker";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Star, Play, Upload } from "lucide-react";

type Draft = Omit<Video, "id">;
const EMPTY: Draft = { titleEn: "", titleEs: "", descriptionEn: "", descriptionEs: "", videoUrl: "", posterUrl: "", sourceEn: "", sourceEs: "", featured: false, order: 0 };

export function VideosManager() {
  const { data, invalidate, isLoading } = useSiteData();
  const { lang } = useLanguage();
  const videos = data?.videos ?? [];
  const [editing, setEditing] = useState<Video | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openNew = () => { setEditing(null); setDraft({ ...EMPTY, order: videos.length }); setOpen(true); };
  const openEdit = (v: Video) => { setEditing(v); setDraft({ titleEn: v.titleEn, titleEs: v.titleEs, descriptionEn: v.descriptionEn, descriptionEs: v.descriptionEs, videoUrl: v.videoUrl, posterUrl: v.posterUrl, sourceEn: v.sourceEn, sourceEs: v.sourceEs, featured: v.featured, order: v.order }); setOpen(true); };

  const uploadVideo = async (file: File) => {
    setUploading(true);
    const fd = new FormData(); fd.append("file", file);
    try { const res = await fetch("/api/admin/media", { method: "POST", body: fd }); if (!res.ok) throw new Error(); const { url } = await res.json(); setDraft((p) => ({ ...p, videoUrl: url })); toast.success(lang === "en" ? "Video uploaded" : "Video subido"); } catch { toast.error(lang === "en" ? "Upload failed" : "Error al subir"); } finally { setUploading(false); }
  };

  const save = async () => {
    if (!draft.videoUrl) { toast.error(lang === "en" ? "Add a video file or URL" : "Añade un archivo o URL de video"); return; }
    if (!draft.titleEn && !draft.titleEs) { toast.error(lang === "en" ? "Add at least one title" : "Añade al menos un título"); return; }
    setSaving(true);
    try { const method = editing ? "PUT" : "POST"; const url = editing ? `/api/admin/videos/${editing.id}` : "/api/admin/videos"; const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) }); if (!res.ok) throw new Error(); toast.success(lang === "en" ? "Saved" : "Guardado"); setOpen(false); invalidate(); } catch { toast.error(lang === "en" ? "Save failed" : "Error"); } finally { setSaving(false); }
  };

  const remove = async (id: string) => { try { const res = await fetch(`/api/admin/videos/${id}`, { method: "DELETE" }); if (!res.ok) throw new Error(); toast.success(lang === "en" ? "Deleted" : "Eliminado"); invalidate(); } catch { toast.error(lang === "en" ? "Delete failed" : "Error"); } setDeleteId(null); };

  if (isLoading) return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="font-serif text-3xl text-espresso">{lang === "en" ? "Videos" : "Videos"}</h2><p className="mt-1 text-sm text-muted-foreground">{videos.length} {lang === "en" ? "videos" : "videos"}</p></div>
        <Button onClick={openNew} className="bg-clay text-cream hover:bg-clay/90"><Plus size={16} className="mr-1.5" /> {lang === "en" ? "Add video" : "Añadir video"}</Button>
      </div>
      <div className="grid gap-3">
        {videos.map((v) => {
          const title = lang === "en" ? v.titleEn : v.titleEs;
          const external = /^https?:\/\//.test(v.videoUrl);
          return (
            <Card key={v.id} className="flex items-center gap-4 p-4">
              <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-md bg-espresso">{v.posterUrl && <img src={v.posterUrl} alt={title} className="h-full w-full object-cover opacity-80" />}<div className="absolute inset-0 flex items-center justify-center"><Play size={20} className="fill-cream text-cream" /></div></div>
              <div className="flex-1"><div className="flex items-center gap-2"><span className="font-serif text-lg text-espresso">{title}</span>{v.featured && <Star size={14} className="fill-clay text-clay" />}</div><div className="mt-0.5 text-xs text-muted-foreground">{external ? "🔗 " : "📁 "}{v.videoUrl}</div></div>
              <div className="flex gap-2"><Button variant="outline" size="icon" onClick={() => openEdit(v)}><Pencil size={15} /></Button><Button variant="outline" size="icon" onClick={() => setDeleteId(v.id)} className="text-destructive"><Trash2 size={15} /></Button></div>
            </Card>
          );
        })}
        {videos.length === 0 && <div className="rounded-lg border border-dashed border-border py-16 text-center text-sm text-muted-foreground">{lang === "en" ? "No videos yet." : "Sin videos aún."}</div>}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? (lang === "en" ? "Edit video" : "Editar video") : (lang === "en" ? "New video" : "Nuevo video")}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2"><div><Label>{lang === "en" ? "Title (EN)" : "Título (EN)"}</Label><Input value={draft.titleEn} onChange={(e) => setDraft({ ...draft, titleEn: e.target.value })} className="mt-1.5" /></div><div><Label>{lang === "en" ? "Title (ES)" : "Título (ES)"}</Label><Input value={draft.titleEs} onChange={(e) => setDraft({ ...draft, titleEs: e.target.value })} className="mt-1.5" /></div></div>
            <div className="grid gap-4 sm:grid-cols-2"><div><Label>{lang === "en" ? "Description (EN)" : "Descripción (EN)"}</Label><Textarea value={draft.descriptionEn} onChange={(e) => setDraft({ ...draft, descriptionEn: e.target.value })} rows={2} className="mt-1.5 resize-none" /></div><div><Label>{lang === "en" ? "Description (ES)" : "Descripción (ES)"}</Label><Textarea value={draft.descriptionEs} onChange={(e) => setDraft({ ...draft, descriptionEs: e.target.value })} rows={2} className="mt-1.5 resize-none" /></div></div>
            <div className="space-y-2">
              <Label>{lang === "en" ? "Video file or URL" : "Archivo de video o URL"}</Label>
              <div className="flex items-center gap-3"><div className="h-14 w-24 shrink-0 overflow-hidden rounded-md border border-border bg-espresso">{draft.videoUrl && <video src={draft.videoUrl} className="h-full w-full object-cover" muted />}</div><Input value={draft.videoUrl} onChange={(e) => setDraft({ ...draft, videoUrl: e.target.value })} placeholder="/media/video.mp4 or https://…" className="flex-1 font-mono text-xs" /></div>
              <label><input type="file" accept="video/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadVideo(f); }} /><Button type="button" variant="outline" size="sm" asChild disabled={uploading}><span><Upload size={14} className="mr-1.5" />{uploading ? (lang === "en" ? "Uploading…" : "Subiendo…") : (lang === "en" ? "Upload video file" : "Subir archivo de video")}</span></Button></label>
              <p className="text-[11px] text-muted-foreground">{lang === "en" ? "Paste a URL (YouTube, Vimeo, .mp4) or upload a local file." : "Pega una URL (YouTube, Vimeo, .mp4) o sube un archivo local."}</p>
            </div>
            <div><Label>{lang === "en" ? "Poster image (shown before play)" : "Imagen de portada (antes de reproducir)"}</Label><div className="mt-1.5"><MediaPicker value={draft.posterUrl} onChange={(posterUrl) => setDraft({ ...draft, posterUrl })} /></div></div>
            <div className="grid gap-4 sm:grid-cols-3"><div><Label>{lang === "en" ? "Source (EN)" : "Fuente (EN)"}</Label><Input value={draft.sourceEn} onChange={(e) => setDraft({ ...draft, sourceEn: e.target.value })} className="mt-1.5" placeholder="Instagram" /></div><div><Label>{lang === "en" ? "Source (ES)" : "Fuente (ES)"}</Label><Input value={draft.sourceEs} onChange={(e) => setDraft({ ...draft, sourceEs: e.target.value })} className="mt-1.5" placeholder="Instagram" /></div><div><Label>Order</Label><Input type="number" value={draft.order} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} className="mt-1.5" /></div></div>
            <div className="flex items-center gap-3 rounded-md border border-border p-3"><Switch checked={draft.featured} onCheckedChange={(v) => setDraft({ ...draft, featured: v })} id="vfeat" /><Label htmlFor="vfeat" className="cursor-pointer text-sm">{lang === "en" ? "Featured" : "Destacado"}</Label></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>{lang === "en" ? "Cancel" : "Cancelar"}</Button><Button onClick={save} disabled={saving} className="bg-clay text-cream hover:bg-clay/90">{saving ? <Loader2 size={16} className="animate-spin" /> : null}{editing ? (lang === "en" ? "Update" : "Actualizar") : (lang === "en" ? "Create" : "Crear")}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>{lang === "en" ? "Delete this video?" : "¿Eliminar este video?"}</AlertDialogTitle><AlertDialogDescription>{lang === "en" ? "This cannot be undone." : "No se puede deshacer."}</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>{lang === "en" ? "Cancel" : "Cancelar"}</AlertDialogCancel><AlertDialogAction onClick={() => deleteId && remove(deleteId)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">{lang === "en" ? "Delete" : "Eliminar"}</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
