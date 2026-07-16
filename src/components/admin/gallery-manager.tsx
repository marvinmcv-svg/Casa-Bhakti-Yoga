"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { useSiteData, type GalleryItem } from "@/hooks/use-site-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { MediaPicker } from "@/components/admin/media-picker";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

type Draft = Omit<GalleryItem, "id">;

const EMPTY: Draft = {
  imageUrl: "", captionEn: "", captionEs: "", type: "image", videoUrl: "", order: 0,
};

export function GalleryManager() {
  const { data, invalidate, isLoading } = useSiteData();
  const { lang } = useLanguage();
  const gallery = data?.gallery ?? [];
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openNew = () => { setEditing(null); setDraft({ ...EMPTY, order: gallery.length }); setOpen(true); };
  const openEdit = (g: GalleryItem) => {
    setEditing(g);
    setDraft({ imageUrl: g.imageUrl, captionEn: g.captionEn, captionEs: g.captionEs, type: g.type, videoUrl: g.videoUrl, order: g.order });
    setOpen(true);
  };

  const save = async () => {
    if (!draft.imageUrl) {
      toast.error(lang === "en" ? "Select an image" : "Selecciona una imagen");
      return;
    }
    setSaving(true);
    try {
      const method = editing ? "PUT" : "POST";
      const url = editing ? `/api/admin/gallery/${editing.id}` : "/api/admin/gallery";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
      if (!res.ok) throw new Error();
      toast.success(lang === "en" ? "Saved" : "Guardado");
      setOpen(false);
      invalidate();
    } catch {
      toast.error(lang === "en" ? "Save failed" : "Error");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success(lang === "en" ? "Deleted" : "Eliminado");
      invalidate();
    } catch {
      toast.error(lang === "en" ? "Delete failed" : "Error");
    }
    setDeleteId(null);
  };

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl text-espresso">{lang === "en" ? "Gallery" : "Galería"}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{gallery.length} {lang === "en" ? "items" : "elementos"}</p>
        </div>
        <Button onClick={openNew} className="bg-clay text-cream hover:bg-clay/90">
          <Plus size={16} className="mr-1.5" /> {lang === "en" ? "Add image" : "Añadir imagen"}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {gallery.map((g) => (
          <Card key={g.id} className="group relative overflow-hidden">
            <div className="aspect-square overflow-hidden">
              <img src={g.imageUrl} alt={lang === "en" ? g.captionEn : g.captionEs} className="h-full w-full object-cover" />
            </div>
            <div className="p-3">
              <div className="truncate text-xs font-medium text-espresso">
                {lang === "en" ? g.captionEn : g.captionEs}
              </div>
              <div className="text-[10px] text-muted-foreground">#{g.order}</div>
            </div>
            <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <Button variant="secondary" size="icon" className="h-7 w-7" onClick={() => openEdit(g)}><Pencil size={12} /></Button>
              <Button variant="secondary" size="icon" className="h-7 w-7 text-destructive" onClick={() => setDeleteId(g.id)}><Trash2 size={12} /></Button>
            </div>
          </Card>
        ))}
        {gallery.length === 0 && (
          <div className="col-span-full rounded-lg border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
            {lang === "en" ? "No gallery items yet." : "Galería vacía."}
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{editing ? (lang === "en" ? "Edit image" : "Editar imagen") : (lang === "en" ? "Add image" : "Añadir imagen")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{lang === "en" ? "Image" : "Imagen"}</Label>
              <div className="mt-1.5">
                <MediaPicker value={draft.imageUrl} onChange={(imageUrl) => setDraft({ ...draft, imageUrl })} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>{lang === "en" ? "Caption (EN)" : "Descripción (EN)"}</Label>
                <Input value={draft.captionEn} onChange={(e) => setDraft({ ...draft, captionEn: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>{lang === "en" ? "Caption (ES)" : "Descripción (ES)"}</Label>
                <Input value={draft.captionEs} onChange={(e) => setDraft({ ...draft, captionEs: e.target.value })} className="mt-1.5" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>{lang === "en" ? "Order" : "Orden"}</Label>
                <Input type="number" value={draft.order} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} className="mt-1.5" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>{lang === "en" ? "Cancel" : "Cancelar"}</Button>
            <Button onClick={save} disabled={saving} className="bg-clay text-cream hover:bg-clay/90">
              {saving ? <Loader2 size={16} className="animate-spin" /> : null}
              {editing ? (lang === "en" ? "Update" : "Actualizar") : (lang === "en" ? "Create" : "Crear")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{lang === "en" ? "Delete this image?" : "¿Eliminar esta imagen?"}</AlertDialogTitle>
            <AlertDialogDescription>{lang === "en" ? "This cannot be undone." : "No se puede deshacer."}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{lang === "en" ? "Cancel" : "Cancelar"}</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && remove(deleteId)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {lang === "en" ? "Delete" : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
