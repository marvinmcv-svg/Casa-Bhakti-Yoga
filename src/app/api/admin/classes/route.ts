import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const created = await db.classType.create({
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
    return NextResponse.json(created);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    if (msg === "UNAUTHORIZED")
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
