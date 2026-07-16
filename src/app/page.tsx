"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { SiteShell } from "@/components/site/site-shell";
import { AdminApp } from "@/components/admin/admin-app";

function Router() {
  const params = useSearchParams();
  const isAdmin = params.get("admin") === "1";
  return isAdmin ? <AdminApp /> : <SiteShell />;
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  );
}
