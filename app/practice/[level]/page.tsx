// app/practice/[level]/page.tsx

import Link from "next/link";
import { PRACTICE } from "@/data/practice";

export default function LevelPage({
  params,
}: {
  params: {
    level: string;
  };
}) {
  const levelData = PRACTICE[params.level as keyof typeof PRACTICE];

  if (!levelData) {
    return <div>Level not found</div>;
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">{levelData.title}</h1>

        <p className="text-white/60 mb-10">Select a module to continue.</p>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(levelData.modules).map(([slug, module]) => (
            <Link key={slug} href={`/practice/${params.level}/${slug}`}>
              <div className="border border-white/10 rounded-2xl p-6 hover:border-[#e8c96a] transition">
                <h3 className="text-xl font-semibold mb-4">{module.title}</h3>

                <div className="flex items-center gap-3 mb-2">
                  <span>
                    {module.type === "speaking" ? "🎤 Speaking" : "✍️ Writing"}
                  </span>
                </div>

                <div className="text-white/60">
                  ⏱ {module.estimatedMinutes} min
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
