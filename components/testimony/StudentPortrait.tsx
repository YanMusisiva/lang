import Image from "next/image";
import type { StudentStory } from "@/data/testimonials";

export default function StudentPortrait({ story, priority = false }: { story: StudentStory; priority?: boolean }) {
  return (
    <span className="student-portrait">
      {story.photo ? (
        <Image
          src={story.photo}
          alt={story.name}
          fill
          priority={priority}
          sizes="(max-width: 767px) 100px, 160px"
          style={{ objectFit: "cover", objectPosition: story.photoPosition || "center" }}
        />
      ) : (
        <span aria-hidden="true">{story.initials}</span>
      )}
    </span>
  );
}
