import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const date = new Date(body.date);
    const created = await db.event.create({
      data: {
        titleEn: String(body.titleEn ?? ""),
        titleEs: String(body.titleEs ?? ""),
        descriptionEn: String(body.descriptionEn ?? ""),
        descriptionEs: String(body.descriptionEs ?? ""),
        date,
        endTime: body.endTime ? String(body.endTime) : null,
        locationEn: String(body.locationEn ?? ""),
        locationEs: String(body.locationEs ?? ""),
        imageUrl: String(body.imageUrl ?? ""),
        priceEn: String(body.priceEn ?? ""),
        priceEs: String(body.priceEs ?? ""),
        featured: Boolean(body.featured),
        order: Number(body.order ?? 0),
      },
    });
    return NextResponse.json(created);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    if (msg === "UNAUTHORIZED")
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
