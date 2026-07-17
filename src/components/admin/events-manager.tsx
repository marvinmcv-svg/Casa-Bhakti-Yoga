"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { useSiteData, type EventItem } from "@/hooks/use-site-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { MediaPicker } from "@/components/admin/media-picker";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Star } from "lucide-react";

type Draft = Omit<EventItem, "id">;

function emptyDraft(): Draft {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  return {
    titleEn: "", titleEs: "", descriptionEn: "", descriptionEs: "",
    date: d.toISOString(), endTime: "", locationEn: "", locationEs: "",
    imageUrl: "", priceEn: "", priceEs: "", featured: false, order: 0,
  };
}

export function EventsManager() {
  const { data, invalidate, isLoading } = useSiteData();
  const { lang } = useLanguage();
  const events = data?.events ?? [];
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft());
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openNew = () => { setEditing(null); setDraft(emptyDraft()); setOpen(true); };
  const openEdit = (e: EventItem) => {
    setEditing(e);
    setDraft({ ...e });
    setOpen(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      const method = editing ? "PUT" : "POST";
      const url = editing ? `/api/admin/events/${editing.id}` : "/api/admin/events";
      const res = await fetch(url, {
        method, headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...draft, date: new Date(draft.date).toISOString() }),
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
      const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success(lang === "en" ? "Deleted" : "Eliminado");
      invalidate();
    } catch {
      toast.error(lang === "en" ? "Delete failed" : "Error");
    }
    setDeleteId(null);
  };

  const dateInput = draft.date ? new Date(draft.date).toISOString().slice(0, 16) : "";

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl text-espresso">{lang === "en" ? "Events" : "Eventos"}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{events.length} {lang === "en" ? "events" : "eventos"}</p>
        </div>
        <Button onClick={openNew} className="bg-clay text-cream hover:bg-clay/90">
          <Plus size={16} className="mr-1.5" /> {lang === "en" ? "Add event" : "Añadir evento"}
        </Button>
      </div>

      <div className="grid gap-3">
        {events.map((e) => {
          const d = new Date(e.date);
          return (
            <Card key={e.id} className="flex items-center gap-4 p-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                {e.imageUrl && <img src={e.imageUrl} alt="" className="h-full w-full object-cover" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-lg text-espresso">{lang === "en" ? e.titleEn : e.titleEs}</span>
                  {e.featured && <Star size={14} className="fill-clay text-clay" />}
                </div>
                <div className="text-xs text-muted-foreground">
                  {d.toLocaleDateString(lang === "en" ? "en-US" : "es-BO", { day: "numeric", month: "short", year: "numeric" })}
                  {" · "}
                  {lang === "en" ? e.locationEn : e.locationEs}
                  {" · "}
                  {lang === "en" ? e.priceEn : e.priceEs}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => openEdit(e)}><Pencil size={15} /></Button>
                <Button variant="outline" size="icon" onClick={() => setDeleteId(e.id)} className="text-destructive"><Trash2 size={15} /></Button>
              </div>
            </Card>
          );
        })}
        {events.length === 0 && (
          <div className="rounded-lg border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
            {lang === "en" ? "No events yet." : "Sin eventos aún."}
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? (lang === "en" ? "Edit event" : "Editar evento") : (lang === "en" ? "New event" : "Nuevo evento")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>{lang === "en" ? "Title (EN)" : "Título (EN)"}</Label>
                <Input value={draft.titleEn} onChange={(e) => setDraft({ ...draft, titleEn: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>{lang === "en" ? "Title (ES)" : "Título (ES)"}</Label>
                <Input value={draft.titleEs} onChange={(e) => setDraft({ ...draft, titleEs: e.target.value })} className="mt-1.5" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>{lang === "en" ? "Description (EN)" : "Descripción (EN)"}</Label>
                <Textarea value={draft.descriptionEn} onChange={(e) => setDraft({ ...draft, descriptionEn: e.target.value })} rows={3} className="mt-1.5 resize-none" />
              </div>
              <div>
                <Label>{lang === "en" ? "Description (ES)" : "Descripción (ES)"}</Label>
                <Textarea value={draft.descriptionEs} onChange={(e) => setDraft({ ...draft, descriptionEs: e.target.value })} rows={3} className="mt-1.5 resize-none" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label>{lang === "en" ? "Date & time" : "Fecha y hora"}</Label>
                <Input type="datetime-local" value={dateInput} onChange={(e) => setDraft({ ...draft, date: new Date(e.target.value).toISOString() })} className="mt-1.5" />
              </div>
              <div>
                <Label>{lang === "en" ? "End time" : "Hora fin"}</Label>
                <Input type="time" value={draft.endTime ?? ""} onChange={(e) => setDraft({ ...draft, endTime: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>Order</Label>
                <Input type="number" value={draft.order} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} className="mt-1.5" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>{lang === "en" ? "Location (EN)" : "Ubicación (EN)"}</Label>
                <Input value={draft.locationEn} onChange={(e) => setDraft({ ...draft, locationEn: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>{lang === "en" ? "Location (ES)" : "Ubicación (ES)"}</Label>
                <Input value={draft.locationEs} onChange={(e) => setDraft({ ...draft, locationEs: e.target.value })} className="mt-1.5" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>{lang === "en" ? "Price (EN)" : "Precio (EN)"}</Label>
                <Input value={draft.priceEn} onChange={(e) => setDraft({ ...draft, priceEn: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>{lang === "en" ? "Price (ES)" : "Precio (ES)"}</Label>
                <Input value={draft.priceEs} onChange={(e) => setDraft({ ...draft, priceEs: e.target.value })} className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label>{lang === "en" ? "Image" : "Imagen"}</Label>
              <div className="mt-1.5">
                <MediaPicker value={draft.imageUrl} onChange={(imageUrl) => setDraft({ ...draft, imageUrl })} />
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-md border border-border p-3">
              <Switch checked={draft.featured} onCheckedChange={(v) => setDraft({ ...draft, featured: v })} id="featured" />
              <Label htmlFor="featured" className="cursor-pointer text-sm">{lang === "en" ? "Featured event" : "Evento destacado"}</Label>
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
            <AlertDialogTitle>{lang === "en" ? "Delete this event?" : "¿Eliminar este evento?"}</AlertDialogTitle>
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
