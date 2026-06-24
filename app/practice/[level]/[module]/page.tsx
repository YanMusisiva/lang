import { PRACTICE, DATASETS } from "@/data/practice";

import SpeakingExercise from "@/components/practice/SpeakingExercise";
import WritingExercise from "@/components/practice/WritingExercise";

export default function ModulePage({
  params,
}: {
  params: {
    level: string;
    module: string;
  };
}) {
  const levelData = PRACTICE[params.level as keyof typeof PRACTICE];

  if (!levelData) {
    return <div>Level not found</div>;
  }

  const moduleData =
    levelData.modules[params.module as keyof typeof levelData.modules];

  if (!moduleData) {
    return <div>Module not found</div>;
  }

  const phrases = DATASETS[moduleData.dataset as keyof typeof DATASETS];

  if (moduleData.type === "speaking") {
    return (
      <SpeakingExercise
        level={params.level}
        module={params.module}
        phrases={phrases}
      />
    );
  }

  return (
    <WritingExercise
      level={params.level}
      module={params.module}
      questions={phrases}
    />
  );
}
