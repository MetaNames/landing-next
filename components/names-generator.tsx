"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Copy, ExternalLink, Loader2, RefreshCw, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import routes from "@/constants/routes";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useDomainCheck, type DomainCheckStatus } from "@/hooks/useDomainCheck";
import {
  CATEGORY_LABELS,
  Category,
  WORD_COUNTS,
  WordCount,
  generateMetaName,
} from "@/lib/generator";

const categories = Object.entries(CATEGORY_LABELS).map(([id, label]) => ({
  id: id as Category,
  label,
}));

export function NamesGenerator() {
  const [generatedName, setGeneratedName] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [wordCount, setWordCount] = useState<WordCount>(2);
  const { copied, copy } = useCopyToClipboard();
  // The name is generated locally, so there is nothing to debounce — check it
  // as soon as it changes.
  const { status } = useDomainCheck(generatedName ?? "", { immediate: true });

  const generateName = useCallback(() => {
    setGeneratedName(generateMetaName(selectedCategory, wordCount));
  }, [selectedCategory, wordCount]);

  // Seeded on the client only: the name is random, so generating it during
  // render (or in a useState initializer) would produce a server/client
  // hydration mismatch. This is the one effect that has to write state.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => generateName(), [generateName]);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 text-left">
      <fieldset className="flex flex-col gap-2">
        <legend className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
          Category
        </legend>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedCategory(cat.id)}
                className={`focus-ring inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[var(--chip-registered-bg)] text-[var(--chip-registered-fg)]"
                    : "glass-panel text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {active && <Check className="h-3 w-3" aria-hidden="true" />}
                {cat.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
          Number of words
        </legend>
        <div className="flex gap-2">
          {WORD_COUNTS.map((count) => {
            const active = wordCount === count;
            return (
              <button
                key={count}
                type="button"
                aria-pressed={active}
                onClick={() => setWordCount(count)}
                className={`focus-ring h-10 w-10 rounded-xl font-heading text-base font-bold transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "glass-panel text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {count}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div
        className="glass-panel rounded-2xl px-6 py-8 text-center"
        aria-live="polite"
      >
        <span
          key={generatedName}
          className="animate-fade-up block font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-primary-glow text-glow break-all"
        >
          {generatedName}
        </span>

        <div className="mt-4 flex items-center justify-center gap-3 text-sm">
          <AvailabilityTag status={status} />
          <button
            type="button"
            onClick={() => generatedName && copy(generatedName)}
            className="focus-ring inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={`Copy ${generatedName ?? "name"}`}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          size="lg"
          disabled={!generatedName || status === "taken"}
          render={
            <a
              href={`${routes.register.path}/${(generatedName ?? "").replace(".mpc", "")}`}
            >
              Register now
              <ExternalLink data-icon="inline-end" />
            </a>
          }
        />
        <Button size="lg" variant="outline" onClick={generateName}>
          <RefreshCw data-icon="inline-start" />
          Regenerate
        </Button>
      </div>
    </div>
  );
}

function AvailabilityTag({ status }: { status: DomainCheckStatus }) {
  if (status === "checking" || status === "idle") {
    return (
      <span
        className="inline-flex items-center gap-1.5 text-muted-foreground"
        role="status"
      >
        <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
        Checking availability
      </span>
    );
  }

  if (status === "taken") {
    return (
      <span className="inline-flex items-center gap-1.5 text-destructive">
        <X className="h-3.5 w-3.5" aria-hidden="true" />
        Already taken
      </span>
    );
  }

  if (status === "available") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--chip-registered-bg)] px-2.5 py-0.5 text-[var(--chip-registered-fg)]">
        <Check className="h-3.5 w-3.5" aria-hidden="true" />
        Available
      </span>
    );
  }

  return null;
}
