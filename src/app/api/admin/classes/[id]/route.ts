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
    const updated = await db.classType.update({
      where: { id },
      data: {
        nameEn: String(body.nameEn ?? ""),
        nameEs: String(body.nameEs ?? ""),
        descriptionEn: String(body.descriptionEn ?? ""),
        descriptionEs: String(body.descriptionEs ?? ""),
        level: String(body.level ?? "all"),
        durationMin: Number(body.durationMin ?? 90),
        imageUrl: String(body.imageUrl ?? ""),
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
    await db.classType.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    if (msg === "UNAUTHORIZED")
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
