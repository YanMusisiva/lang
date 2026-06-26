import { PRACTICE, DATASETS } from "@/data/practice";
import SpeakingExercise from "@/components/practice/SpeakingExercise";
import WritingExercise from "@/components/practice/WritingExercise";
import Link from "next/link";

type ModulePageProps = {
  params: Promise<{
    level: string;
    module: string;
  }>;
};

export default async function ModulePage({ params }: ModulePageProps) {
  // 1. Résolution de la Promise des paramètres (Requis pour Next.js moderne)
  const resolvedParams = await params;

  // 2. Nettoyage et correction automatique du niveau (ex: business1 -> business-1)
  let levelInput = resolvedParams.level.trim().toLowerCase();
  if (/^(level|business)\d+$/.test(levelInput)) {
    levelInput = levelInput.replace(/^([a-z]+)(\d+)$/, "$1-$2");
  }

  // 3. Récupération sécurisée du niveau
  const levelKey = levelInput as keyof typeof PRACTICE;
  const levelData = PRACTICE[levelKey];

  if (!levelData) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/5 border border-red-500/30 rounded-xl p-6 text-center">
          <h2 className="text-red-400 text-xl font-semibold mb-2">
            Niveau introuvable
          </h2>
          <p className="text-white/70 mb-4">
            L'exercice n'a pas pu charger car le niveau{" "}
            <code className="bg-white/10 px-2 py-1 rounded text-yellow-400">
              "{resolvedParams.level}"
            </code>{" "}
            n'existe pas.
          </p>
          <Link
            href="/practice"
            className="text-[#c9a84c] hover:underline text-sm"
          >
            ← Retourner aux exercices
          </Link>
        </div>
      </div>
    );
  }

  // 4. Récupération du module
  const moduleKey = resolvedParams.module as keyof typeof levelData.modules;
  const moduleData = levelData.modules[moduleKey] as
    | { dataset: keyof typeof DATASETS; type: "speaking" | "writing" }
    | undefined;

  if (
    !moduleData ||
    typeof moduleData !== "object" ||
    !("dataset" in moduleData)
  ) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/5 border border-red-500/30 rounded-xl p-6 text-center">
          <h2 className="text-red-400 text-xl font-semibold mb-2">
            Module introuvable
          </h2>
          <p className="text-white/70 mb-4">
            Le module{" "}
            <code className="bg-white/10 px-2 py-1 rounded text-yellow-400">
              "{resolvedParams.module}"
            </code>{" "}
            n'existe pas pour le niveau {levelData.title}.
          </p>
          <Link
            href={`/practice/${levelKey}`}
            className="text-[#c9a84c] hover:underline text-sm"
          >
            ← Retourner au niveau {levelData.title}
          </Link>
        </div>
      </div>
    );
  }

  // 5. Récupération des phrases associées au dataset du module
  const datasetKey = moduleData.dataset;
  const phrases = DATASETS[datasetKey] || [];

  // 6. Routage vers le bon composant (Oral ou Écrit)
  if (moduleData.type === "speaking") {
    return (
      <SpeakingExercise
        level={levelKey}
        module={resolvedParams.module}
        phrases={phrases}
      />
    );
  }

  return (
    <WritingExercise
      level={levelKey}
      module={resolvedParams.module}
      questions={phrases}
    />
  );
}
