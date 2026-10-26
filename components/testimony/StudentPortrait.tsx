import Image from "next/image";
import type { StudentStory } from "@/data/testimonials";

export default function StudentPortrait({ story, priority = false, variant = "avatar" }: { story: StudentStory; priority?: boolean; variant?: "avatar" | "photo" }) {
  return (
    <span className={`student-portrait${variant === "photo" ? " student-portrait-photo" : ""}`}>
      {story.photo ? (
        <Image
          src={story.photo}
          unoptimized={story.photo.startsWith("https://")}
          alt={story.name}
          fill
          priority={priority}
          sizes={variant === "photo" ? "(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px" : "64px"}
          style={{ objectFit: variant === "photo" ? "contain" : "cover", objectPosition: variant === "photo" ? "center" : story.photoPosition || "center" }}
        />
      ) : (
        <span aria-hidden="true">{story.initials}</span>
      )}
    </span>
  );
}
