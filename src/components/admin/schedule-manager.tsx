"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { useSiteData, type ClassSchedule } from "@/hooks/use-site-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

type Draft = Omit<ClassSchedule, "id" | "classType">;

const DAY_OPTIONS = [
  { v: "0", es: "Domingo", en: "Sunday" },
  { v: "1", es: "Lunes", en: "Monday" },
  { v: "2", es: "Martes", en: "Tuesday" },
  { v: "3", es: "Miércoles", en: "Wednesday" },
  { v: "4", es: "Jueves", en: "Thursday" },
  { v: "5", es: "Viernes", en: "Friday" },
  { v: "6", es: "Sábado", en: "Saturday" },
];

export function ScheduleManager() {
  const { data, invalidate, isLoading } = useSiteData();
  const { lang } = useLanguage();
  const schedule = data?.schedule ?? [];
  const classes = data?.classes ?? [];
  const [editing, setEditing] = useState<ClassSchedule | null>(null);
  const [draft, setDraft] = useState<Draft>({
    dayOfWeek: 0, startTime: "09:00", endTime: "10:30",
    classTypeId: classes[0]?.id ?? "", instructorEn: "", instructorEs: "", online: false, order: 0,
  });
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openNew = () => {
    setEditing(null);
    setDraft({
      dayOfWeek: 0, startTime: "09:00", endTime: "10:30",
      classTypeId: classes[0]?.id ?? "", instructorEn: "", instructorEs: "", online: false, order: schedule.length,
    });
    setOpen(true);
  };
  const openEdit = (s: ClassSchedule) => {
    setEditing(s);
    setDraft({
      dayOfWeek: s.dayOfWeek, startTime: s.startTime, endTime: s.endTime,
      classTypeId: s.classTypeId, instructorEn: s.instructorEn, instructorEs: s.instructorEs,
      online: s.online, order: s.order,
    });
    setOpen(true);
  };

  const save = async () => {
    if (!draft.classTypeId) {
      toast.error(lang === "en" ? "Select a class type first" : "Selecciona un tipo de clase");
      return;
    }
    setSaving(true);
    try {
      const method = editing ? "PUT" : "POST";
      const url = editing ? `/api/admin/schedule/${editing.id}` : "/api/admin/schedule";
      const res = await fetch(url, {
        method, headers: { "Content-Type": "application/json" },
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
      const res = await fetch(`/api/admin/schedule/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success(lang === "en" ? "Deleted" : "Eliminado");
      invalidate();
    } catch {
      toast.error(lang === "en" ? "Delete failed" : "Error");
    }
    setDeleteId(null);
  };

  const grouped = DAY_OPTIONS.map((d) => ({
    ...d,
    items: schedule.filter((s) => s.dayOfWeek === Number(d.v)).sort((a, b) => a.startTime.localeCompare(b.startTime)),
  }));

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl text-espresso">{lang === "en" ? "Weekly Schedule" : "Horario Semanal"}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{schedule.length} {lang === "en" ? "sessions" : "sesiones"}</p>
        </div>
        <Button onClick={openNew} className="bg-clay text-cream hover:bg-clay/90" disabled={classes.length === 0}>
          <Plus size={16} className="mr-1.5" /> {lang === "en" ? "Add session" : "Añadir sesión"}
        </Button>
      </div>

      {classes.length === 0 && (
        <div className="rounded-lg border border-clay/40 bg-clay/5 p-4 text-sm text-clay">
          {lang === "en" ? "Add class types first before scheduling." : "Añade tipos de clase antes de programar."}
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        {grouped.map((day) => (
          <Card key={day.v} className="overflow-hidden">
            <div className="border-b border-border bg-secondary/40 px-5 py-3">
              <h3 className="font-serif text-lg text-espresso">{lang === "en" ? day.en : day.es}</h3>
            </div>
            <div className="divide-y divide-border">
              {day.items.length === 0 ? (
                <div className="px-5 py-8 text-center text-xs text-muted-foreground">
                  {lang === "en" ? "No sessions" : "Sin sesiones"}
                </div>
              ) : (
                day.items.map((s) => {
                  const cls = classes.find((c) => c.id === s.classTypeId);
                  const name = cls ? (lang === "en" ? cls.nameEn : cls.nameEs) : "—";
                  return (
                    <div key={s.id} className="flex items-center gap-3 px-5 py-3">
                      <div className="w-24 shrink-0">
                        <div className="font-serif text-sm text-clay">{s.startTime}</div>
                        <div className="text-[10px] text-muted-foreground">{s.endTime}</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-espresso">{name}</div>
                        <div className="text-[11px] text-muted-foreground">
                          {lang === "en" ? s.instructorEn : s.instructorEs}
                          {s.online && <span className="ml-1.5 text-sage">· online</span>}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => openEdit(s)}><Pencil size={14} /></Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(s.id)} className="text-destructive"><Trash2 size={14} /></Button>
                    </div>
                  );
                })
              )}
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{editing ? (lang === "en" ? "Edit session" : "Editar sesión") : (lang === "en" ? "New session" : "Nueva sesión")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>{lang === "en" ? "Day" : "Día"}</Label>
                <Select value={String(draft.dayOfWeek)} onValueChange={(v) => setDraft({ ...draft, dayOfWeek: Number(v) })}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {DAY_OPTIONS.map((d) => (
                      <SelectItem key={d.v} value={d.v}>{lang === "en" ? d.en : d.es}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{lang === "en" ? "Class type" : "Tipo de clase"}</Label>
                <Select value={draft.classTypeId} onValueChange={(v) => setDraft({ ...draft, classTypeId: v })}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select…" /></SelectTrigger>
                  <SelectContent>
                    {classes.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{lang === "en" ? c.nameEn : c.nameEs}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>{lang === "en" ? "Start time" : "Hora inicio"}</Label>
                <Input type="time" value={draft.startTime} onChange={(e) => setDraft({ ...draft, startTime: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>{lang === "en" ? "End time" : "Hora fin"}</Label>
                <Input type="time" value={draft.endTime} onChange={(e) => setDraft({ ...draft, endTime: e.target.value })} className="mt-1.5" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>{lang === "en" ? "Instructor (EN)" : "Instructor (EN)"}</Label>
                <Input value={draft.instructorEn} onChange={(e) => setDraft({ ...draft, instructorEn: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>{lang === "en" ? "Instructor (ES)" : "Instructor (ES)"}</Label>
                <Input value={draft.instructorEs} onChange={(e) => setDraft({ ...draft, instructorEs: e.target.value })} className="mt-1.5" />
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-md border border-border p-3">
              <Switch checked={draft.online} onCheckedChange={(v) => setDraft({ ...draft, online: v })} id="online" />
              <Label htmlFor="online" className="cursor-pointer text-sm">{lang === "en" ? "Available online" : "Disponible en línea"}</Label>
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
            <AlertDialogTitle>{lang === "en" ? "Delete this session?" : "¿Eliminar esta sesión?"}</AlertDialogTitle>
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
