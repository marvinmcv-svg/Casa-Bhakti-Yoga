"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { useSiteData, type ClassType } from "@/hooks/use-site-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { MediaPicker } from "@/components/admin/media-picker";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, GripVertical } from "lucide-react";

type Draft = Omit<ClassType, "id" | "schedules">;

const EMPTY: Draft = {
  nameEn: "",
  nameEs: "",
  descriptionEn: "",
  descriptionEs: "",
  level: "all",
  durationMin: 90,
  imageUrl: "",
  order: 0,
};

export function ClassesManager() {
  const { data, invalidate, isLoading } = useSiteData();
  const { lang } = useLanguage();
  const classes = data?.classes ?? [];
  const [editing, setEditing] = useState<ClassType | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openNew = () => {
    setEditing(null);
    setDraft({ ...EMPTY, order: classes.length });
    setOpen(true);
  };
  const openEdit = (c: ClassType) => {
    setEditing(c);
    setDraft({
      nameEn: c.nameEn, nameEs: c.nameEs, descriptionEn: c.descriptionEn,
      descriptionEs: c.descriptionEs, level: c.level, durationMin: c.durationMin,
      imageUrl: c.imageUrl, order: c.order,
    });
    setOpen(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      const method = editing ? "PUT" : "POST";
      const url = editing ? `/api/admin/classes/${editing.id}` : "/api/admin/classes";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
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
      const res = await fetch(`/api/admin/classes/${id}`, { method: "DELETE" });
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
          <h2 className="font-serif text-3xl text-espresso">{lang === "en" ? "Class Types" : "Tipos de Clase"}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{classes.length} {lang === "en" ? "classes" : "clases"}</p>
        </div>
        <Button onClick={openNew} className="bg-clay text-cream hover:bg-clay/90">
          <Plus size={16} className="mr-1.5" /> {lang === "en" ? "Add class" : "Añadir clase"}
        </Button>
      </div>

      <div className="grid gap-3">
        {classes.map((c, i) => (
          <Card key={c.id} className="flex items-center gap-4 p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <GripVertical size={16} />
              <span className="text-xs">{i + 1}</span>
            </div>
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
              {c.imageUrl && <img src={c.imageUrl} alt="" className="h-full w-full object-cover" />}
            </div>
            <div className="flex-1">
              <div className="font-serif text-lg text-espresso">{lang === "en" ? c.nameEn : c.nameEs}</div>
              <div className="text-xs text-muted-foreground">
                {c.level} · {c.durationMin} min
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => openEdit(c)}>
                <Pencil size={15} />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setDeleteId(c.id)} className="text-destructive">
                <Trash2 size={15} />
              </Button>
            </div>
          </Card>
        ))}
        {classes.length === 0 && (
          <div className="rounded-lg border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
            {lang === "en" ? "No classes yet. Add your first one." : "Sin clases aún. Añade la primera."}
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? (lang === "en" ? "Edit class" : "Editar clase") : (lang === "en" ? "New class" : "Nueva clase")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>{lang === "en" ? "Name (EN)" : "Nombre (EN)"}</Label>
                <Input value={draft.nameEn} onChange={(e) => setDraft({ ...draft, nameEn: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>{lang === "en" ? "Name (ES)" : "Nombre (ES)"}</Label>
                <Input value={draft.nameEs} onChange={(e) => setDraft({ ...draft, nameEs: e.target.value })} className="mt-1.5" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>{lang === "en" ? "Description (EN)" : "Descripción (EN)"}</Label>
                <Textarea value={draft.descriptionEn} onChange={(e) => setDraft({ ...draft, descriptionEn: e.target.value })} rows={2} className="mt-1.5 resize-none" />
              </div>
              <div>
                <Label>{lang === "en" ? "Description (ES)" : "Descripción (ES)"}</Label>
                <Textarea value={draft.descriptionEs} onChange={(e) => setDraft({ ...draft, descriptionEs: e.target.value })} rows={2} className="mt-1.5 resize-none" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label>Level</Label>
                <Select value={draft.level} onValueChange={(v) => setDraft({ ...draft, level: v })}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{lang === "en" ? "Duration (min)" : "Duración (min)"}</Label>
                <Input type="number" value={draft.durationMin} onChange={(e) => setDraft({ ...draft, durationMin: Number(e.target.value) })} className="mt-1.5" />
              </div>
              <div>
                <Label>Order</Label>
                <Input type="number" value={draft.order} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label>{lang === "en" ? "Image" : "Imagen"}</Label>
              <div className="mt-1.5">
                <MediaPicker value={draft.imageUrl} onChange={(imageUrl) => setDraft({ ...draft, imageUrl })} />
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
            <AlertDialogTitle>{lang === "en" ? "Delete this class?" : "¿Eliminar esta clase?"}</AlertDialogTitle>
            <AlertDialogDescription>{lang === "en" ? "This also removes its schedule entries. This cannot be undone." : "Esto también elimina sus horarios. No se puede deshacer."}</AlertDialogDescription>
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
