"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { useSiteData, type Testimonial } from "@/hooks/use-site-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { MediaPicker } from "@/components/admin/media-picker";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

type Draft = Omit<Testimonial, "id">;
const EMPTY: Draft = { quoteEn: "", quoteEs: "", authorName: "", authorRoleEn: "", authorRoleEs: "", authorImage: "", rating: 5, featured: false, order: 0 };

export function TestimonialsManager() {
  const { data, invalidate, isLoading } = useSiteData();
  const { lang } = useLanguage();
  const testimonials = data?.testimonials ?? [];
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openNew = () => { setEditing(null); setDraft({ ...EMPTY, order: testimonials.length }); setOpen(true); };
  const openEdit = (t: Testimonial) => { setEditing(t); setDraft({ quoteEn: t.quoteEn, quoteEs: t.quoteEs, authorName: t.authorName, authorRoleEn: t.authorRoleEn, authorRoleEs: t.authorRoleEs, authorImage: t.authorImage, rating: t.rating, featured: t.featured, order: t.order }); setOpen(true); };

  const save = async () => {
    if (!draft.quoteEn && !draft.quoteEs) { toast.error(lang === "en" ? "Add at least one quote" : "Añade al menos una cita"); return; }
    setSaving(true);
    try {
      const method = editing ? "PUT" : "POST";
      const url = editing ? `/api/admin/testimonials/${editing.id}` : "/api/admin/testimonials";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
      if (!res.ok) throw new Error();
      toast.success(lang === "en" ? "Saved" : "Guardado"); setOpen(false); invalidate();
    } catch { toast.error(lang === "en" ? "Save failed" : "Error"); } finally { setSaving(false); }
  };

  const remove = async (id: string) => {
    try { const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" }); if (!res.ok) throw new Error(); toast.success(lang === "en" ? "Deleted" : "Eliminado"); invalidate(); } catch { toast.error(lang === "en" ? "Delete failed" : "Error"); }
    setDeleteId(null);
  };

  if (isLoading) return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="font-serif text-3xl text-espresso">{lang === "en" ? "Testimonials" : "Testimonios"}</h2><p className="mt-1 text-sm text-muted-foreground">{testimonials.length} {lang === "en" ? "testimonials" : "testimonios"}</p></div>
        <Button onClick={openNew} className="bg-clay text-cream hover:bg-clay/90"><Plus size={16} className="mr-1.5" /> {lang === "en" ? "Add testimonial" : "Añadir testimonio"}</Button>
      </div>
      <div className="grid gap-3">
        {testimonials.map((t) => (
          <Card key={t.id} className="p-5">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted">{t.authorImage && <img src={t.authorImage} alt={t.authorName} className="h-full w-full object-cover" />}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2"><span className="font-serif text-lg text-espresso">{t.authorName}</span>{t.featured && <Star size={14} className="fill-clay text-clay" />}</div>
                <div className="text-xs text-clay">{lang === "en" ? t.authorRoleEn : t.authorRoleEs}</div>
                <div className="mt-2 flex items-center gap-1">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={12} className={i < t.rating ? "fill-clay text-clay" : "text-muted-foreground/30"} />))}</div>
                <p className="mt-2 text-sm italic leading-relaxed text-muted-foreground line-clamp-2">&ldquo;{lang === "en" ? t.quoteEn : t.quoteEs}&rdquo;</p>
              </div>
              <div className="flex gap-2"><Button variant="outline" size="icon" onClick={() => openEdit(t)}><Pencil size={15} /></Button><Button variant="outline" size="icon" onClick={() => setDeleteId(t.id)} className="text-destructive"><Trash2 size={15} /></Button></div>
            </div>
          </Card>
        ))}
        {testimonials.length === 0 && <div className="rounded-lg border border-dashed border-border py-16 text-center text-sm text-muted-foreground">{lang === "en" ? "No testimonials yet." : "Sin testimonios aún."}</div>}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? (lang === "en" ? "Edit testimonial" : "Editar testimonio") : (lang === "en" ? "New testimonial" : "Nuevo testimonio")}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>{lang === "en" ? "Quote (EN)" : "Cita (EN)"}</Label><Textarea value={draft.quoteEn} onChange={(e) => setDraft({ ...draft, quoteEn: e.target.value })} rows={3} className="mt-1.5 resize-none" /></div>
            <div><Label>{lang === "en" ? "Quote (ES)" : "Cita (ES)"}</Label><Textarea value={draft.quoteEs} onChange={(e) => setDraft({ ...draft, quoteEs: e.target.value })} rows={3} className="mt-1.5 resize-none" /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><Label>{lang === "en" ? "Author name" : "Nombre del autor"}</Label><Input value={draft.authorName} onChange={(e) => setDraft({ ...draft, authorName: e.target.value })} className="mt-1.5" /></div>
              <div><Label>{lang === "en" ? "Rating" : "Calificación"}</Label><div className="mt-2 flex gap-1">{Array.from({ length: 5 }).map((_, i) => (<button key={i} type="button" onClick={() => setDraft({ ...draft, rating: i + 1 })}><Star size={22} className={i < draft.rating ? "fill-clay text-clay" : "text-muted-foreground/40"} /></button>))}</div></div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2"><div><Label>{lang === "en" ? "Role (EN)" : "Rol (EN)"}</Label><Input value={draft.authorRoleEn} onChange={(e) => setDraft({ ...draft, authorRoleEn: e.target.value })} className="mt-1.5" /></div><div><Label>{lang === "en" ? "Role (ES)" : "Rol (ES)"}</Label><Input value={draft.authorRoleEs} onChange={(e) => setDraft({ ...draft, authorRoleEs: e.target.value })} className="mt-1.5" /></div></div>
            <div><Label>{lang === "en" ? "Author image" : "Imagen del autor"}</Label><div className="mt-1.5"><MediaPicker value={draft.authorImage} onChange={(authorImage) => setDraft({ ...draft, authorImage })} /></div></div>
            <div className="grid gap-4 sm:grid-cols-2"><div className="flex items-center gap-3 rounded-md border border-border p-3"><Switch checked={draft.featured} onCheckedChange={(v) => setDraft({ ...draft, featured: v })} id="feat" /><Label htmlFor="feat" className="cursor-pointer text-sm">{lang === "en" ? "Featured" : "Destacado"}</Label></div><div><Label>Order</Label><Input type="number" value={draft.order} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} className="mt-1.5" /></div></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>{lang === "en" ? "Cancel" : "Cancelar"}</Button><Button onClick={save} disabled={saving} className="bg-clay text-cream hover:bg-clay/90">{saving ? <Loader2 size={16} className="animate-spin" /> : null}{editing ? (lang === "en" ? "Update" : "Actualizar") : (lang === "en" ? "Create" : "Crear")}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>{lang === "en" ? "Delete this testimonial?" : "¿Eliminar este testimonio?"}</AlertDialogTitle><AlertDialogDescription>{lang === "en" ? "This cannot be undone." : "No se puede deshacer."}</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>{lang === "en" ? "Cancel" : "Cancelar"}</AlertDialogCancel><AlertDialogAction onClick={() => deleteId && remove(deleteId)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">{lang === "en" ? "Delete" : "Eliminar"}</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
