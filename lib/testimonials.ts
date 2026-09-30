import type { StudentStory } from "@/data/testimonials";

export const TESTIMONIAL_BUCKET = "testimonials";
export const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
export const PHOTO_TYPES: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
export type TestimonialRow = {
  id: string; name: string; role: string; role_en: string;
  message: string; message_en: string; photo_path: string;
  certificate_path: string | null; published: boolean; created_at: string;
};

export function testimonialMediaUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${TESTIMONIAL_BUCKET}/${path}`;
}

export function toStudentStory(row: TestimonialRow): StudentStory {
  return {
    id: row.id, name: row.name,
    initials: row.name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join(""),
    role: { fr: row.role || "Apprenant", en: row.role_en || row.role || "Learner" },
    quote: { fr: row.message, en: row.message_en || row.message },
    photo: testimonialMediaUrl(row.photo_path),
    certificate: row.certificate_path ? testimonialMediaUrl(row.certificate_path) : undefined,
  };
}
