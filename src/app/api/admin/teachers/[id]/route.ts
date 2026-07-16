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
    const updated = await db.teacher.update({
      where: { id },
      data: {
        nameEn: String(body.nameEn ?? ""),
        nameEs: String(body.nameEs ?? ""),
        roleEn: String(body.roleEn ?? ""),
        roleEs: String(body.roleEs ?? ""),
        bioEn: String(body.bioEn ?? ""),
        bioEs: String(body.bioEs ?? ""),
        specialtiesEn: String(body.specialtiesEn ?? ""),
        specialtiesEs: String(body.specialtiesEs ?? ""),
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
    await db.teacher.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    if (msg === "UNAUTHORIZED")
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
