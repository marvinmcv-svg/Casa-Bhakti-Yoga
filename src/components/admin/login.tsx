"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageToggle } from "@/components/language-toggle";
import { toast } from "sonner";
import { ArrowLeft, Lock } from "lucide-react";

export function AdminLogin() {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Login failed");
      }
      toast.success(lang === "en" ? "Welcome back ✦" : "Bienvenido ✦");
      router.refresh();
      // Force a reload to re-mount admin app with session
      setTimeout(() => window.location.reload(), 400);
    } catch (err) {
      toast.error(t("admin.login.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-espresso px-5">
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/media/hero-yoga-meditation.jpg"
          alt=""
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-espresso/60" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cream/60 transition-colors hover:text-cream"
          >
            <ArrowLeft size={14} /> {t("admin.login.back")}
          </Link>
          <LanguageToggle compact />
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-cream/10 bg-cream/5 p-8 backdrop-blur-xl"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-clay/20 text-clay">
              <Lock size={22} />
            </div>
            <h1 className="font-serif text-3xl text-cream">{t("admin.login.title")}</h1>
            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-cream/50">
              {t("admin.login.subtitle")}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-cream/70">{t("admin.login.username")}</Label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
                className="mt-1.5 border-cream/20 bg-cream/5 text-cream placeholder:text-cream/30"
                placeholder="admin"
              />
            </div>
            <div>
              <Label className="text-cream/70">{t("admin.login.password")}</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1.5 border-cream/20 bg-cream/5 text-cream placeholder:text-cream/30"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-clay text-cream hover:bg-clay/90"
          >
            {loading ? "…" : t("admin.login.submit")}
          </Button>

          <p className="mt-6 text-center text-[10px] text-cream/40">
            {lang === "en" ? "Demo: admin / casabhakti2024" : "Demo: admin / casabhakti2024"}
          </p>
        </form>
      </div>
    </div>
  );
}
