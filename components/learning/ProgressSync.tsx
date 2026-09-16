"use client";

import { useEffect } from "react";
import { localProgressEntries } from "@/lib/progress-client";

type CloudProgress = { storage_key: string; payload: unknown };

export default function ProgressSync() {
  useEffect(() => {
    async function sync() {
      const response = await fetch("/api/progress");
      if (!response.ok) return;
      const { progress = [] } = (await response.json()) as { progress: CloudProgress[] };
      const remoteKeys = new Set(progress.map((item) => item.storage_key));

      progress.forEach((item) => {
        localStorage.setItem(
          item.storage_key,
          typeof item.payload === "string" ? item.payload : JSON.stringify(item.payload),
        );
      });

      await Promise.all(
        localProgressEntries()
          .filter(([key]) => !remoteKeys.has(key))
          .map(async ([storageKey, value]) => {
            let payload: unknown = value;
            try { payload = JSON.parse(value); } catch {}
            await fetch("/api/progress", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ storageKey, payload }),
            });
          }),
      );
    }
    void sync();
  }, []);
  return null;
}
