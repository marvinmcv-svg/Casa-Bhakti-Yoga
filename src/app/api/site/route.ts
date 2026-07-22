import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ensureDefaultAdmin } from "@/lib/auth";
import { seedDatabase } from "@/lib/default-content";

export const dynamic = "force-dynamic";

// GET /api/site — all public site data in one request
export async function GET() {
  try {
    await ensureDefaultAdmin();
    await seedDatabase();

    const [content, classes, schedule, events, teachers, gallery, testimonials, videos] =
      await Promise.all([
        db.siteContent.findMany(),
        db.classType.findMany({ include: { schedules: true }, orderBy: { order: "asc" } }),
        db.classSchedule.findMany({ include: { classType: true }, orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }] }),
        db.event.findMany({ orderBy: { date: "asc" } }),
        db.teacher.findMany({ orderBy: { order: "asc" } }),
        db.galleryItem.findMany({ orderBy: { order: "asc" } }),
        db.testimonial.findMany({ orderBy: { order: "asc" } }),
        db.video.findMany({ orderBy: { order: "asc" } }),
      ]);

    const contentMap: Record<string, { en: string; es: string }> = {};
    for (const c of content) {
      contentMap[c.key] = { en: c.valueEn, es: c.valueEs };
    }

    return NextResponse.json({
      content: contentMap,
      classes,
      schedule,
      events,
      teachers,
      gallery,
      testimonials,
      videos,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
