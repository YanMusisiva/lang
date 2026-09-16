import { QUESTIONS, TEST_VERSION } from "@/data/level-test";

export const TEST_STORAGE_KEY = "langlistening:level-test:v1";
export const TEST_TTL = 24 * 60 * 60 * 1000;
export type TestSession = {
  id: string;
  version: string;
  answers: (number | null)[];
  step: number;
  completed: boolean;
  submitted: boolean;
  expiresAt: number;
};

export function validAnswers(value: unknown, complete = true): value is (number | null)[] {
  return Array.isArray(value) && value.length === QUESTIONS.length &&
    value.every((answer, index) => (!complete && answer === null) ||
      (Number.isInteger(answer) && answer >= 0 && answer < QUESTIONS[index].options.length));
}

export function scoreTest(answers: (number | null)[]) {
  return answers.reduce<number>((sum, answer, index) => sum +
    (answer === null ? 0 : QUESTIONS[index]?.points[answer] ?? 0), 0);
}

export function testLevel(score: number): 1 | 2 | 3 | 4 {
  return score <= 25 ? 1 : score <= 50 ? 2 : score <= 75 ? 3 : 4;
}

export function newTestSession(): TestSession {
  return {
    id: crypto.randomUUID(), version: TEST_VERSION,
    answers: Array(QUESTIONS.length).fill(null), step: 0,
    completed: false, submitted: false, expiresAt: Date.now() + TEST_TTL,
  };
}

export function parseTestSession(raw: string | null, now = Date.now()): TestSession | null {
  if (!raw) return null;
  try {
    const s = JSON.parse(raw);
    if (!s || s.version !== TEST_VERSION || typeof s.id !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s.id) ||
      typeof s.completed !== "boolean" || typeof s.submitted !== "boolean" ||
      !validAnswers(s.answers, s.completed) ||
      !Number.isInteger(s.step) || s.step < 0 || s.step >= QUESTIONS.length ||
      !Number.isFinite(s.expiresAt) || s.expiresAt <= now || s.expiresAt > now + TEST_TTL ||
      (s.submitted && !s.completed) ||
      s.answers.slice(0, s.step).some((answer: number | null) => answer === null)) return null;
    return s;
  } catch { return null; }
}
