import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const created = await db.testimonial.create({
      data: {
        quoteEn: String(body.quoteEn ?? ""),
        quoteEs: String(body.quoteEs ?? ""),
        authorName: String(body.authorName ?? ""),
        authorRoleEn: String(body.authorRoleEn ?? ""),
        authorRoleEs: String(body.authorRoleEs ?? ""),
        authorImage: String(body.authorImage ?? ""),
        rating: Number(body.rating ?? 5),
        featured: Boolean(body.featured),
        order: Number(body.order ?? 0),
      },
    });
    return NextResponse.json(created);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    if (msg === "UNAUTHORIZED") return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
