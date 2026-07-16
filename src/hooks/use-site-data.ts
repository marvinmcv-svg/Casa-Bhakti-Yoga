"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

export interface SiteContentMap {
  [key: string]: { en: string; es: string };
}

export interface ClassType {
  id: string;
  nameEn: string;
  nameEs: string;
  descriptionEn: string;
  descriptionEs: string;
  level: string;
  durationMin: number;
  imageUrl: string;
  order: number;
  schedules?: ClassSchedule[];
}

export interface ClassSchedule {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  classTypeId: string;
  classType?: ClassType;
  instructorEn: string;
  instructorEs: string;
  online: boolean;
  order: number;
}

export interface EventItem {
  id: string;
  titleEn: string;
  titleEs: string;
  descriptionEn: string;
  descriptionEs: string;
  date: string;
  endTime: string | null;
  locationEn: string;
  locationEs: string;
  imageUrl: string;
  priceEn: string;
  priceEs: string;
  featured: boolean;
  order: number;
}

export interface Teacher {
  id: string;
  nameEn: string;
  nameEs: string;
  roleEn: string;
  roleEs: string;
  bioEn: string;
  bioEs: string;
  specialtiesEn: string;
  specialtiesEs: string;
  imageUrl: string;
  order: number;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  captionEn: string;
  captionEs: string;
  type: string;
  videoUrl: string;
  order: number;
}

export interface SiteData {
  content: SiteContentMap;
  classes: ClassType[];
  schedule: ClassSchedule[];
  events: EventItem[];
  teachers: Teacher[];
  gallery: GalleryItem[];
}

export function useSiteData() {
  const qc = useQueryClient();
  const query = useQuery<SiteData>({
    queryKey: ["site-data"],
    queryFn: async () => {
      const res = await fetch("/api/site", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load site data");
      return res.json();
    },
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["site-data"] });

  return { ...query, invalidate };
}
