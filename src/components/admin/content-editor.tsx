"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Save, Loader2, Check } from "lucide-react";
import type { SiteContentMap } from "@/hooks/use-site-data";

interface FieldDef {
  key: string;
  label: { en: string; es: string };
  multiline?: boolean;
}

interface GroupDef {
  id: string;
  title: { en: string; es: string };
  fields: FieldDef[];
}

const GROUPS: GroupDef[] = [
  {
    id: "hero",
    title: { en: "Hero", es: "Portada" },
    fields: [
      { key: "hero.line1", label: { en: "Line 1", es: "Línea 1" } },
      { key: "hero.line2", label: { en: "Line 2", es: "Línea 2" } },
      { key: "hero.line3", label: { en: "Line 3", es: "Línea 3" } },
      { key: "hero.subtitle", label: { en: "Subtitle", es: "Subtítulo" }, multiline: true },
    ],
  },
  {
    id: "about",
    title: { en: "About / Intro", es: "Sobre / Intro" },
    fields: [
      { key: "intro.eyebrow", label: { en: "Eyebrow", es: "Encabezado" } },
      { key: "intro.title", label: { en: "Title", es: "Título" } },
      { key: "intro.body", label: { en: "Body", es: "Cuerpo" }, multiline: true },
      { key: "intro.meetLink", label: { en: "Meet link", es: "Enlace conocer" } },
      { key: "intro.stat1.value", label: { en: "Stat 1 value", es: "Dato 1 valor" } },
      { key: "intro.stat1.label", label: { en: "Stat 1 label", es: "Dato 1 etiqueta" } },
      { key: "intro.stat2.value", label: { en: "Stat 2 value", es: "Dato 2 valor" } },
      { key: "intro.stat2.label", label: { en: "Stat 2 label", es: "Dato 2 etiqueta" } },
      { key: "intro.stat3.value", label: { en: "Stat 3 value", es: "Dato 3 valor" } },
      { key: "intro.stat3.label", label: { en: "Stat 3 label", es: "Dato 3 etiqueta" } },
    ],
  },
  {
    id: "philosophy",
    title: { en: "Philosophy", es: "Filosofía" },
    fields: [
      { key: "philosophy.eyebrow", label: { en: "Eyebrow", es: "Encabezado" } },
      { key: "philosophy.title", label: { en: "Title", es: "Título" } },
      { key: "philosophy.body", label: { en: "Body", es: "Cuerpo" }, multiline: true },
      { key: "philosophy.path1.title", label: { en: "Path 1 title", es: "Camino 1 título" } },
      { key: "philosophy.path1.desc", label: { en: "Path 1 desc", es: "Camino 1 desc" }, multiline: true },
      { key: "philosophy.path2.title", label: { en: "Path 2 title", es: "Camino 2 título" } },
      { key: "philosophy.path2.desc", label: { en: "Path 2 desc", es: "Camino 2 desc" }, multiline: true },
      { key: "philosophy.path3.title", label: { en: "Path 3 title", es: "Camino 3 título" } },
      { key: "philosophy.path3.desc", label: { en: "Path 3 desc", es: "Camino 3 desc" }, multiline: true },
      { key: "philosophy.path4.title", label: { en: "Path 4 title", es: "Camino 4 título" } },
      { key: "philosophy.path4.desc", label: { en: "Path 4 desc", es: "Camino 4 desc" }, multiline: true },
    ],
  },
  {
    id: "quote",
    title: { en: "Quote", es: "Cita" },
    fields: [
      { key: "quote.text", label: { en: "Quote", es: "Cita" }, multiline: true },
      { key: "quote.author", label: { en: "Author", es: "Autor" } },
    ],
  },
  {
    id: "classes",
    title: { en: "Classes section", es: "Sección clases" },
    fields: [
      { key: "classes.eyebrow", label: { en: "Eyebrow", es: "Encabezado" } },
      { key: "classes.title", label: { en: "Title", es: "Título" } },
      { key: "classes.body", label: { en: "Body", es: "Cuerpo" }, multiline: true },
    ],
  },
  {
    id: "schedule",
    title: { en: "Schedule section", es: "Sección horarios" },
    fields: [
      { key: "schedule.eyebrow", label: { en: "Eyebrow", es: "Encabezado" } },
      { key: "schedule.title", label: { en: "Title", es: "Título" } },
      { key: "schedule.body", label: { en: "Body", es: "Cuerpo" }, multiline: true },
    ],
  },
  {
    id: "teachers",
    title: { en: "Teachers section", es: "Sección maestros" },
    fields: [
      { key: "teachers.eyebrow", label: { en: "Eyebrow", es: "Encabezado" } },
      { key: "teachers.title", label: { en: "Title", es: "Título" } },
      { key: "teachers.body", label: { en: "Body", es: "Cuerpo" }, multiline: true },
    ],
  },
  {
    id: "events",
    title: { en: "Events section", es: "Sección eventos" },
    fields: [
      { key: "events.eyebrow", label: { en: "Eyebrow", es: "Encabezado" } },
      { key: "events.title", label: { en: "Title", es: "Título" } },
      { key: "events.body", label: { en: "Body", es: "Cuerpo" }, multiline: true },
    ],
  },
  {
    id: "gallery",
    title: { en: "Gallery section", es: "Sección galería" },
    fields: [
      { key: "gallery.eyebrow", label: { en: "Eyebrow", es: "Encabezado" } },
      { key: "gallery.title", label: { en: "Title", es: "Título" } },
      { key: "gallery.body", label: { en: "Body", es: "Cuerpo" }, multiline: true },
    ],
  },
  {
    id: "contact",
    title: { en: "Contact", es: "Contacto" },
    fields: [
      { key: "contact.eyebrow", label: { en: "Eyebrow", es: "Encabezado" } },
      { key: "contact.title", label: { en: "Title", es: "Título" } },
      { key: "contact.body", label: { en: "Body", es: "Cuerpo" }, multiline: true },
      { key: "contact.address", label: { en: "Address", es: "Dirección" } },
      { key: "contact.phone1", label: { en: "Phone 1", es: "Teléfono 1" } },
      { key: "contact.phone2", label: { en: "Phone 2", es: "Teléfono 2" } },
      { key: "contact.instagram", label: { en: "Instagram handle", es: "Instagram" } },
      { key: "contact.instagramUrl", label: { en: "Instagram URL", es: "URL Instagram" } },
      { key: "contact.facebookUrl", label: { en: "Facebook URL", es: "URL Facebook" } },
    ],
  },
  {
    id: "footer",
    title: { en: "Footer", es: "Pie de página" },
    fields: [
      { key: "footer.tagline", label: { en: "Tagline", es: "Lema" } },
      { key: "footer.newsletterTitle", label: { en: "Newsletter title", es: "Título boletín" } },
      { key: "footer.address", label: { en: "Address", es: "Dirección" } },
    ],
  },
];

export function ContentEditor() {
  const { lang } = useLanguage();
  const [draft, setDraft] = useState<SiteContentMap>({});
  const [original, setOriginal] = useState<SiteContentMap>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/site", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        setDraft(d.content ?? {});
        setOriginal(d.content ?? {});
      })
      .finally(() => setLoading(false));
  }, []);

  const dirtyCount = Object.keys(draft).filter((k) => {
    const a = draft[k];
    const b = original[k];
    if (!b) return true;
    return a.en !== b.en || a.es !== b.es;
  }).length;

  const update = (key: string, langKey: "en" | "es", val: string) => {
    setDraft((p) => ({
      ...p,
      [key]: { en: langKey === "en" ? val : p[key]?.en ?? "", es: langKey === "es" ? val : p[key]?.es ?? "" },
    }));
  };

  const save = async () => {
    setSaving(true);
    const items = Object.entries(draft).map(([key, v]) => ({
      key,
      valueEn: v.en,
      valueEs: v.es,
    }));
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      if (!res.ok) throw new Error();
      setOriginal(draft);
      toast.success(lang === "en" ? "All content saved ✦" : "Todo el contenido guardado ✦");
    } catch {
      toast.error(lang === "en" ? "Save failed" : "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-3xl text-espresso">
            {lang === "en" ? "Content Editor" : "Editor de Contenido"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {lang === "en"
              ? "Edit every word on your site, in English and Spanish."
              : "Edita cada palabra de tu sitio, en inglés y español."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {dirtyCount > 0 && (
            <Badge variant="secondary" className="gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-clay" />
              {dirtyCount} {lang === "en" ? "unsaved" : "sin guardar"}
            </Badge>
          )}
          <Button onClick={save} disabled={saving || dirtyCount === 0} className="bg-clay text-cream hover:bg-clay/90">
            {saving ? <Loader2 size={16} className="animate-spin" /> : dirtyCount > 0 ? <Save size={16} /> : <Check size={16} />}
            {saving ? "" : dirtyCount > 0 ? (lang === "en" ? "Save all" : "Guardar todo") : (lang === "en" ? "Saved" : "Guardado")}
          </Button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {GROUPS.map((group) => (
          <Card key={group.id} className="overflow-hidden">
            <CardHeader className="bg-secondary/50 pb-3">
              <CardTitle className="text-base">
                {lang === "en" ? group.title.en : group.title.es}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-5">
              {group.fields.map((field) => {
                const val = draft[field.key] ?? { en: "", es: "" };
                const isDirty =
                  !original[field.key] ||
                  original[field.key].en !== val.en ||
                  original[field.key].es !== val.es;
                return (
                  <div key={field.key} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-muted-foreground">
                        {lang === "en" ? field.label.en : field.label.es}
                      </label>
                      {isDirty && (
                        <span className="h-1.5 w-1.5 rounded-full bg-clay" title="Unsaved" />
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="mb-1 block text-[9px] uppercase tracking-wider text-clay">EN</span>
                        {field.multiline ? (
                          <Textarea
                            value={val.en}
                            onChange={(e) => update(field.key, "en", e.target.value)}
                            rows={2}
                            className="resize-none text-sm"
                          />
                        ) : (
                          <Input
                            value={val.en}
                            onChange={(e) => update(field.key, "en", e.target.value)}
                            className="text-sm"
                          />
                        )}
                      </div>
                      <div>
                        <span className="mb-1 block text-[9px] uppercase tracking-wider text-clay">ES</span>
                        {field.multiline ? (
                          <Textarea
                            value={val.es}
                            onChange={(e) => update(field.key, "es", e.target.value)}
                            rows={2}
                            className="resize-none text-sm"
                          />
                        ) : (
                          <Input
                            value={val.es}
                            onChange={(e) => update(field.key, "es", e.target.value)}
                            className="text-sm"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
