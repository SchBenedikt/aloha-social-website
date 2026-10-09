"use client";

import { useSyncExternalStore } from "react";
import { Check, RotateCcw } from "lucide-react";

export type ProgressStep = {
  label: string;
  description?: string;
  href?: string;
};

const PROGRESS_EVENT = "aloha-guide-progress";
const memoryProgress = new Map<string, string>();

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(PROGRESS_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(PROGRESS_EVENT, onStoreChange);
  };
}

function getProgress(storageKey: string, stepCount: number) {
  const memoryValue = memoryProgress.get(storageKey);
  if (memoryValue !== undefined) return memoryValue;
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return "[]";
    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) return "[]";
    return JSON.stringify(
      [...new Set(parsed.filter(
        (index): index is number =>
          Number.isInteger(index) && index >= 0 && index < stepCount,
      ))].sort((a, b) => a - b),
    );
  } catch {
    return "[]";
  }
}

export function ProgressChecklist({
  id,
  title,
  steps,
}: {
  id: string;
  title: string;
  steps: readonly ProgressStep[];
}) {
  const storageKey = `aloha-social-guide:${id}`;
  const savedProgress = useSyncExternalStore(
    subscribe,
    () => getProgress(storageKey, steps.length),
    () => "[]",
  );
  const checked: number[] = JSON.parse(savedProgress);

  function toggle(index: number) {
    const next = checked.includes(index)
      ? checked.filter((item) => item !== index)
      : [...checked, index].sort((a, b) => a - b);
    const serialized = JSON.stringify(next);
    try {
      window.localStorage.setItem(storageKey, serialized);
      memoryProgress.delete(storageKey);
    } catch {
      // Keep the checklist interactive for this visit when storage is unavailable.
      memoryProgress.set(storageKey, serialized);
    }
    window.dispatchEvent(new Event(PROGRESS_EVENT));
  }

  function reset() {
    try {
      window.localStorage.removeItem(storageKey);
      memoryProgress.delete(storageKey);
    } catch {
      // An empty memory value hides stale progress if storage is unavailable.
      memoryProgress.set(storageKey, "[]");
    }
    window.dispatchEvent(new Event(PROGRESS_EVENT));
  }

  const complete = checked.length;
  const percent = steps.length ? Math.round((complete / steps.length) * 100) : 0;

  return (
    <section
      aria-labelledby={`${id}-title`}
      className="rounded-2xl border border-line bg-surface p-5 sm:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 id={`${id}-title`} className="text-xl font-semibold text-ink-strong">
            {title}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {complete} of {steps.length} steps complete
            {" · "}Saved on this device, without an account.
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          disabled={complete === 0}
          className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-coral disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Reset
        </button>
      </div>

      <div
        className="mt-4 h-2 overflow-hidden rounded-full bg-surface-2"
        role="progressbar"
        aria-label="Progress"
        aria-valuemin={0}
        aria-valuemax={steps.length}
        aria-valuenow={complete}
      >
        <div
          className="h-full rounded-full bg-coral transition-[width]"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ol className="mt-4 divide-y divide-line">
        {steps.map((step, index) => {
          const isChecked = checked.includes(index);
          return (
            <li key={step.label} className="py-3 first:pt-1 last:pb-1">
              <div className="flex items-start gap-3">
                <input
                  id={`${id}-step-${index}`}
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(index)}
                  className="mt-1 size-4 shrink-0 accent-[var(--coral)]"
                />
                <div>
                  <label
                    htmlFor={`${id}-step-${index}`}
                    className={`flex cursor-pointer items-center gap-2 text-[15px] font-medium ${isChecked ? "text-muted line-through" : "text-ink-strong"}`}
                  >
                    {isChecked ? <Check className="size-4 text-coral" aria-hidden="true" /> : null}
                    {step.label}
                  </label>
                  {step.description ? (
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                  ) : null}
                  {step.href ? (
                    <a href={step.href} className="mt-1 inline-flex text-sm font-medium text-coral hover:underline">
                      Open guide <span aria-hidden="true">→</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
