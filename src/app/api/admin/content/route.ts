import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

// PUT /api/admin/content — bulk update site content
// Body: { items: [{ key, valueEn, valueEs }] }
export async function PUT(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const items: Array<{ key: string; valueEn: string; valueEs: string }> =
      body.items;

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "INVALID_BODY" }, { status: 400 });
    }

    await db.$transaction(
      items.map((it) =>
        db.siteContent.upsert({
          where: { key: it.key },
          create: {
            key: it.key,
            valueEn: String(it.valueEn ?? ""),
            valueEs: String(it.valueEs ?? ""),
          },
          update: {
            valueEn: String(it.valueEn ?? ""),
            valueEs: String(it.valueEs ?? ""),
          },
        })
      )
    );

    return NextResponse.json({ ok: true, count: items.length });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    if (msg === "UNAUTHORIZED") {
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    }
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
