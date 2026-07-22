"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { useSiteData } from "@/hooks/use-site-data";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ContentEditor } from "@/components/admin/content-editor";
import { ClassesManager } from "@/components/admin/classes-manager";
import { ScheduleManager } from "@/components/admin/schedule-manager";
import { EventsManager } from "@/components/admin/events-manager";
import { TeachersManager } from "@/components/admin/teachers-manager";
import { GalleryManager } from "@/components/admin/gallery-manager";
import { TestimonialsManager } from "@/components/admin/testimonials-manager";
import { VideosManager } from "@/components/admin/videos-manager";
import { toast } from "sonner";
import {
  LayoutDashboard, FileText, Calendar, Clock, Sparkles, Users, Images,
  LogOut, ExternalLink, Menu, X, Flower2, Quote, Video,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type View = "dashboard" | "content" | "classes" | "schedule" | "events" | "teachers" | "gallery" | "testimonials" | "videos";

export function AdminDashboard({ username }: { username: string }) {
  const { t, lang } = useLanguage();
  const { data } = useSiteData();
  const [view, setView] = useState<View>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    toast.success(lang === "en" ? "Logged out" : "Sesión cerrada");
    setTimeout(() => window.location.reload(), 400);
  };

  const nav: { id: View; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: t("admin.nav.dashboard"), icon: <LayoutDashboard size={17} /> },
    { id: "content", label: t("admin.nav.content"), icon: <FileText size={17} /> },
    { id: "classes", label: t("admin.nav.classes"), icon: <Flower2 size={17} /> },
    { id: "schedule", label: t("admin.nav.schedule"), icon: <Clock size={17} /> },
    { id: "events", label: t("admin.nav.events"), icon: <Sparkles size={17} /> },
    { id: "teachers", label: t("admin.nav.teachers"), icon: <Users size={17} /> },
    { id: "gallery", label: t("admin.nav.gallery"), icon: <Images size={17} /> },
    { id: "testimonials", label: t("admin.nav.testimonials"), icon: <Quote size={17} /> },
    { id: "videos", label: t("admin.nav.videos"), icon: <Video size={17} /> },
  ];

  const stats = [
    { label: t("admin.nav.classes"), value: data?.classes.length ?? 0, icon: <Flower2 size={18} /> },
    { label: t("admin.nav.schedule"), value: data?.schedule.length ?? 0, icon: <Clock size={18} /> },
    { label: t("admin.nav.events"), value: data?.events.length ?? 0, icon: <Sparkles size={18} /> },
    { label: t("admin.nav.teachers"), value: data?.teachers.length ?? 0, icon: <Users size={18} /> },
    { label: t("admin.nav.gallery"), value: data?.gallery.length ?? 0, icon: <Images size={18} /> },
    { label: t("admin.nav.testimonials"), value: data?.testimonials.length ?? 0, icon: <Quote size={18} /> },
    { label: t("admin.nav.videos"), value: data?.videos.length ?? 0, icon: <Video size={18} /> },
    { label: lang === "en" ? "Content fields" : "Campos de contenido", value: Object.keys(data?.content ?? {}).length, icon: <FileText size={18} /> },
  ];

  const SidebarContent = (
    <>
      <div className="px-5 py-6">
        <div className="font-serif text-2xl text-espresso">Casa Bhakti</div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{t("admin.login.subtitle")}</div>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {nav.map((item) => (
          <button
            key={item.id}
            onClick={() => { setView(item.id); setSidebarOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
              view === item.id
                ? "bg-clay text-cream"
                : "text-muted-foreground hover:bg-secondary hover:text-espresso"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="space-y-1 border-t border-border p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-espresso"
        >
          <ExternalLink size={17} /> {t("admin.nav.viewSite")}
        </Link>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut size={17} /> {t("admin.nav.logout")}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-sidebar lg:flex">
        {SidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-espresso/40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
              className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar lg:hidden"
            >
              <button onClick={() => setSidebarOpen(false)} className="absolute right-3 top-5"><X size={20} /></button>
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-background/80 px-5 py-3 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden"><Menu size={20} /></button>
            <div className="text-sm text-muted-foreground">
              <span className="hidden sm:inline">{username} · </span>
              <span className="text-espresso">{nav.find((n) => n.id === view)?.label}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggle />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-5 sm:p-8 lg:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
            >
              {view === "dashboard" && (
                <div className="space-y-8">
                  <div>
                    <h1 className="font-serif text-4xl text-espresso">
                      {lang === "en" ? "Welcome back" : "Bienvenido de nuevo"} ✦
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                      {lang === "en"
                        ? "Manage every part of your website from here."
                        : "Administra cada parte de tu sitio desde aquí."}
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {stats.map((s) => (
                      <Card key={s.label} className="flex items-center gap-4 p-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-clay/10 text-clay">
                          {s.icon}
                        </div>
                        <div>
                          <div className="font-serif text-3xl text-espresso">{s.value}</div>
                          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{s.label}</div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <Card className="p-6">
                      <h3 className="font-serif text-xl text-espresso">{lang === "en" ? "Quick actions" : "Acciones rápidas"}</h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button onClick={() => setView("content")} variant="outline" size="sm"><FileText size={14} className="mr-1.5" /> {t("admin.nav.content")}</Button>
                        <Button onClick={() => setView("schedule")} variant="outline" size="sm"><Clock size={14} className="mr-1.5" /> {t("admin.nav.schedule")}</Button>
                        <Button onClick={() => setView("events")} variant="outline" size="sm"><Sparkles size={14} className="mr-1.5" /> {t("admin.nav.events")}</Button>
                        <Button onClick={() => setView("gallery")} variant="outline" size="sm"><Images size={14} className="mr-1.5" /> {t("admin.nav.gallery")}</Button>
                      </div>
                    </Card>
                    <Card className="p-6">
                      <h3 className="font-serif text-xl text-espresso">{lang === "en" ? "Tip" : "Consejo"}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {lang === "en"
                          ? "Every text on the site is editable in two languages. Use the Content editor to refine your message, then publish instantly."
                          : "Cada texto del sitio es editable en dos idiomas. Usa el editor de Contenido para afinar tu mensaje y publicar al instante."}
                      </p>
                    </Card>
                  </div>
                </div>
              )}
              {view === "content" && <ContentEditor />}
              {view === "classes" && <ClassesManager />}
              {view === "schedule" && <ScheduleManager />}
              {view === "events" && <EventsManager />}
              {view === "teachers" && <TeachersManager />}
              {view === "gallery" && <GalleryManager />}
              {view === "testimonials" && <TestimonialsManager />}
              {view === "videos" && <VideosManager />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
