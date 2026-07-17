"use client";

import { useEffect, useState } from "react";
import { AdminLogin } from "@/components/admin/login";
import { AdminDashboard } from "@/components/admin/dashboard";
import { Loader2 } from "lucide-react";

export function AdminApp() {
  const [state, setState] = useState<"loading" | "authed" | "guest">("loading");
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch("/api/admin/session", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.authenticated) {
          setUsername(d.username);
          setState("authed");
        } else {
          setState("guest");
        }
      })
      .catch(() => setState("guest"));
  }, []);

  if (state === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-espresso text-cream">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  if (state === "guest") return <AdminLogin />;
  return <AdminDashboard username={username} />;
}
