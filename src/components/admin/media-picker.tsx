"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, Check, Search } from "lucide-react";
import { toast } from "sonner";

interface MediaPickerProps {
  value: string;
  onChange: (url: string) => void;
}

export function MediaPicker({ value, onChange }: MediaPickerProps) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch("/api/admin/media")
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((d) => setFiles(d.files ?? []))
      .catch(() => toast.error("Failed to load media"))
      .finally(() => setLoading(false));
  }, [open]);

  const filtered = files.filter((f) =>
    f.toLowerCase().includes(query.toLowerCase())
  );

  const upload = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/media", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      const { url } = await res.json();
      setFiles((p) => [url, ...p]);
      onChange(url);
      toast.success("Uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : null}
        </div>
        <div className="flex-1">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/media/…"
            className="font-mono text-xs"
          />
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => setOpen(true)}>
          <Upload size={14} className="mr-1.5" /> Browse
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Media Library</DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search files…"
                className="pl-9"
              />
            </div>
            <label>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) upload(f);
                }}
              />
              <Button type="button" variant="default" size="sm" asChild disabled={uploading}>
                <span>{uploading ? "Uploading…" : "Upload"}</span>
              </Button>
            </label>
          </div>
          <ScrollArea className="h-[50vh]">
            {loading ? (
              <div className="py-20 text-center text-sm text-muted-foreground">Loading…</div>
            ) : filtered.length === 0 ? (
              <div className="py-20 text-center text-sm text-muted-foreground">No media found</div>
            ) : (
              <div className="grid grid-cols-3 gap-3 p-1 sm:grid-cols-4">
                {filtered.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => {
                      onChange(f);
                      setOpen(false);
                    }}
                    className={`group relative aspect-square overflow-hidden rounded-md border-2 transition-colors ${
                      value === f ? "border-clay" : "border-transparent hover:border-border"
                    }`}
                  >
                    <img src={f} alt="" className="h-full w-full object-cover" />
                    {value === f && (
                      <div className="absolute inset-0 flex items-center justify-center bg-clay/30">
                        <Check size={20} className="text-white" />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 truncate bg-espresso/70 px-1 py-0.5 text-[8px] text-cream">
                      {f.split("/").pop()}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
