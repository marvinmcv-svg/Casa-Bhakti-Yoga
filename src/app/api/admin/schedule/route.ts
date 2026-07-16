import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const created = await db.classSchedule.create({
      data: {
        dayOfWeek: Number(body.dayOfWeek ?? 0),
        startTime: String(body.startTime ?? "09:00"),
        endTime: String(body.endTime ?? "10:30"),
        classTypeId: String(body.classTypeId),
        instructorEn: String(body.instructorEn ?? ""),
        instructorEs: String(body.instructorEs ?? ""),
        online: Boolean(body.online),
        order: Number(body.order ?? 0),
      },
      include: { classType: true },
    });
    return NextResponse.json(created);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    if (msg === "UNAUTHORIZED")
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
