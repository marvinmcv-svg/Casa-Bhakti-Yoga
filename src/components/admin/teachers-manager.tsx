"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { useSiteData, type Teacher } from "@/hooks/use-site-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { MediaPicker } from "@/components/admin/media-picker";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

type Draft = Omit<Teacher, "id">;

const EMPTY: Draft = {
  nameEn: "", nameEs: "", roleEn: "", roleEs: "", bioEn: "", bioEs: "",
  specialtiesEn: "", specialtiesEs: "", imageUrl: "", order: 0,
};

export function TeachersManager() {
  const { data, invalidate, isLoading } = useSiteData();
  const { lang } = useLanguage();
  const teachers = data?.teachers ?? [];
  const [editing, setEditing] = useState<Teacher | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openNew = () => { setEditing(null); setDraft({ ...EMPTY, order: teachers.length }); setOpen(true); };
  const openEdit = (t: Teacher) => {
    setEditing(t);
    setDraft({ nameEn: t.nameEn, nameEs: t.nameEs, roleEn: t.roleEn, roleEs: t.roleEs, bioEn: t.bioEn, bioEs: t.bioEs, specialtiesEn: t.specialtiesEn, specialtiesEs: t.specialtiesEs, imageUrl: t.imageUrl, order: t.order });
    setOpen(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      const method = editing ? "PUT" : "POST";
      const url = editing ? `/api/admin/teachers/${editing.id}` : "/api/admin/teachers";
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
      const res = await fetch(`/api/admin/teachers/${id}`, { method: "DELETE" });
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
          <h2 className="font-serif text-3xl text-espresso">{lang === "en" ? "Teachers" : "Maestros"}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{teachers.length} {lang === "en" ? "teachers" : "maestros"}</p>
        </div>
        <Button onClick={openNew} className="bg-clay text-cream hover:bg-clay/90">
          <Plus size={16} className="mr-1.5" /> {lang === "en" ? "Add teacher" : "Añadir maestro"}
        </Button>
      </div>

      <div className="grid gap-3">
        {teachers.map((t) => (
          <Card key={t.id} className="flex items-center gap-4 p-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
              {t.imageUrl && <img src={t.imageUrl} alt="" className="h-full w-full object-cover" />}
            </div>
            <div className="flex-1">
              <div className="font-serif text-lg text-espresso">{lang === "en" ? t.nameEn : t.nameEs}</div>
              <div className="text-xs text-clay">{lang === "en" ? t.roleEn : t.roleEs}</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">{lang === "en" ? t.specialtiesEn : t.specialtiesEs}</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => openEdit(t)}><Pencil size={15} /></Button>
              <Button variant="outline" size="icon" onClick={() => setDeleteId(t.id)} className="text-destructive"><Trash2 size={15} /></Button>
            </div>
          </Card>
        ))}
        {teachers.length === 0 && (
          <div className="rounded-lg border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
            {lang === "en" ? "No teachers yet." : "Sin maestros aún."}
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? (lang === "en" ? "Edit teacher" : "Editar maestro") : (lang === "en" ? "New teacher" : "Nuevo maestro")}</DialogTitle>
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
                <Label>{lang === "en" ? "Role (EN)" : "Rol (EN)"}</Label>
                <Input value={draft.roleEn} onChange={(e) => setDraft({ ...draft, roleEn: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>{lang === "en" ? "Role (ES)" : "Rol (ES)"}</Label>
                <Input value={draft.roleEs} onChange={(e) => setDraft({ ...draft, roleEs: e.target.value })} className="mt-1.5" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>{lang === "en" ? "Bio (EN)" : "Bio (EN)"}</Label>
                <Textarea value={draft.bioEn} onChange={(e) => setDraft({ ...draft, bioEn: e.target.value })} rows={4} className="mt-1.5 resize-none" />
              </div>
              <div>
                <Label>{lang === "en" ? "Bio (ES)" : "Bio (ES)"}</Label>
                <Textarea value={draft.bioEs} onChange={(e) => setDraft({ ...draft, bioEs: e.target.value })} rows={4} className="mt-1.5 resize-none" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>{lang === "en" ? "Specialties (EN)" : "Especialidades (EN)"}</Label>
                <Input value={draft.specialtiesEn} onChange={(e) => setDraft({ ...draft, specialtiesEn: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>{lang === "en" ? "Specialties (ES)" : "Especialidades (ES)"}</Label>
                <Input value={draft.specialtiesEs} onChange={(e) => setDraft({ ...draft, specialtiesEs: e.target.value })} className="mt-1.5" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
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
            <AlertDialogTitle>{lang === "en" ? "Delete this teacher?" : "¿Eliminar este maestro?"}</AlertDialogTitle>
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
