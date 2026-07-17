import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();
    const date = new Date(body.date);
    const updated = await db.event.update({
      where: { id },
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
    return NextResponse.json(updated);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    if (msg === "UNAUTHORIZED")
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    await db.event.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    if (msg === "UNAUTHORIZED")
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
