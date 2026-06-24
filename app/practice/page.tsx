// app/practice/page.tsx

import Link from "next/link";

const LEVELS = [
  {
    slug: "level1",
    title: "Foundation",
    color: "from-green-500/20 to-green-700/20",
  },

  {
    slug: "level2",
    title: "Beginner",
    color: "from-blue-500/20 to-blue-700/20",
  },

  {
    slug: "level3",
    title: "Intermediate",
    color: "from-purple-500/20 to-purple-700/20",
  },

  {
    slug: "level4",
    title: "Advanced",
    color: "from-orange-500/20 to-orange-700/20",
  },

  {
    slug: "level5",
    title: "Fluent",
    color: "from-red-500/20 to-red-700/20",
  },

  {
    slug: "businesslevel1",
    title: "Business English 1",
    color: "from-yellow-500/20 to-yellow-700/20",
  },

  {
    slug: "business2",
    title: "Business English 2",
    color: "from-cyan-500/20 to-cyan-700/20",
  },
];

export default function PracticePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">Practice</h1>

        <p className="text-white/60 mb-10">
          Choose your level and continue your learning journey.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEVELS.map((level) => (
            <Link key={level.slug} href={`/practice/${level.slug}`}>
              <div
                className={`
                  rounded-3xl
                  border
                  border-white/10
                  p-8
                  bg-linear-to-br
                  ${level.color}
                  hover:scale-105
                  transition-all
                  cursor-pointer
                `}
              >
                <div className="text-sm text-white/50 mb-2">LEVEL</div>

                <h2 className="text-2xl font-bold">{level.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
