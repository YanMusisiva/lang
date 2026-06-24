// app/practice/[level]/[module]/page.tsx

import { PRACTICE, DATASETS } from "@/data/practice";
import SpeakingExercise from "@/components/practice/SpeakingExercise";
import WritingExercise from "@/components/practice/WritingExercise";

type Props = {
  params: {
    level: string;
    module: string;
  };
};

export default function ModulePage({ params }: Props) {
  const levelData = PRACTICE[params.level as keyof typeof PRACTICE];

  if (!levelData) {
    return <div className="p-10 text-center">Level not found</div>;
  }

  const moduleData =
    levelData.modules[params.module as keyof typeof levelData.modules];

  if (!moduleData) {
    return <div className="p-10 text-center">Module not found</div>;
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
