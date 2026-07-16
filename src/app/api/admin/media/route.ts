import { NextRequest, NextResponse } from "next/server";
import { readdir, mkdir, writeFile } from "fs/promises";
import path from "path";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin();
    const mediaDir = path.join(process.cwd(), "public", "media");
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    const files: string[] = [];
    try {
      const media = await readdir(mediaDir);
      for (const f of media) {
        if (/\.(jpg|jpeg|png|webp|gif|mp4|webm)$/i.test(f)) {
          files.push(`/media/${f}`);
        }
      }
    } catch {}
    try {
      const uploads = await readdir(uploadsDir);
      for (const f of uploads) {
        if (/\.(jpg|jpeg|png|webp|gif|mp4|webm)$/i.test(f)) {
          files.push(`/uploads/${f}`);
        }
      }
    } catch {}
    files.sort();
    return NextResponse.json({ files });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    if (msg === "UNAUTHORIZED")
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "NO_FILE" }, { status: 400 });
    }
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });
    const ext = path.extname(file.name) || ".jpg";
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    const buf = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadsDir, name), buf);
    return NextResponse.json({ url: `/uploads/${name}` });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    if (msg === "UNAUTHORIZED")
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
