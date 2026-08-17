const PLATFORM_KEYS = /^(speaking-progress|translation-progress|placement-test-passed)-/;

export function persistProgress(storageKey: string, serializedValue: string) {
  localStorage.setItem(storageKey, serializedValue);
  let payload: unknown = serializedValue;
  try {
    payload = JSON.parse(serializedValue);
  } catch {}

  void fetch("/api/progress", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ storageKey, payload }),
  });
}

export function localProgressEntries() {
  return Object.keys(localStorage)
    .filter((key) => PLATFORM_KEYS.test(key))
    .map((key) => [key, localStorage.getItem(key)] as const)
    .filter((entry): entry is readonly [string, string] => entry[1] !== null);
}
