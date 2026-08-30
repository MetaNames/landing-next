"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Check,
  Loader2,
  Search,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import routes from "@/constants/routes";
import { useDomainCheck } from "@/hooks/useDomainCheck";
import { useRegistrationFee } from "@/hooks/useRegistrationFee";
import { MAX_LABEL_LENGTH, stripTld } from "@/lib/domain-validator";
import { SEARCH } from "@/lib/constants";

const STATUS_STYLES = {
  available: "text-[var(--chip-registered-fg)]",
  taken: "text-destructive",
  invalid: "text-destructive",
  error: "text-muted-foreground",
  checking: "text-muted-foreground",
  idle: "text-muted-foreground",
} as const;

export function DomainSearch() {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { status, name, fullName, error } = useDomainCheck(value);
  // Only quote a price for a name someone can actually mint.
  const { data: fee } = useRegistrationFee(name, status === "available");

  // A checked name is worth sharing, and someone who reloads should not have to
  // type it again. `history.replaceState` rather than the router: this keeps the
  // page statically rendered (no useSearchParams bail-out) and leaves the back
  // button meaning "the page before", not "the last keystroke".
  useEffect(() => {
    const seeded = new URLSearchParams(window.location.search).get(
      SEARCH.QUERY_PARAM,
    );
    // Seeding from the URL is a one-shot read of a browser-only source on
    // mount, which is what the server render deliberately cannot see; the rule
    // is aimed at effects that mirror props into state on every render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (seeded) setValue(stripTld(seeded.trim().toLowerCase()));
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (name) url.searchParams.set(SEARCH.QUERY_PARAM, name);
    else url.searchParams.delete(SEARCH.QUERY_PARAM);
    if (url.href !== window.location.href)
      window.history.replaceState(null, "", url);
  }, [name]);

  // "/" focuses the field from anywhere, unless the visitor is already typing
  // into some other control.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== SEARCH.FOCUS_KEY || event.metaKey || event.ctrlKey)
        return;

      const active = document.activeElement;
      const typing =
        active instanceof HTMLElement &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.isContentEditable);
      if (typing) return;

      event.preventDefault();
      inputRef.current?.focus();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const registerHref = `${routes.register.path}/${name}`;

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-3">
      <form
        className="glass-panel focus-within:border-primary/50 flex items-center gap-2 rounded-2xl px-3 py-2 transition-colors"
        onSubmit={(event) => {
          event.preventDefault();
          if (status === "available") window.location.href = registerHref;
        }}
        role="search"
      >
        <Search
          className="h-4 w-4 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <label htmlFor="domain-search" className="sr-only">
          Search for a .mpc name
        </label>
        <Input
          id="domain-search"
          ref={inputRef}
          value={value}
          onChange={(event) => setValue(stripTld(event.target.value))}
          placeholder="search your name"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          maxLength={MAX_LABEL_LENGTH}
          aria-invalid={status === "invalid" || status === "taken"}
          aria-describedby="domain-search-status"
          className="h-9 border-0 bg-transparent px-0 font-mono text-base focus-visible:ring-0 dark:bg-transparent"
        />
        <span
          className="shrink-0 font-mono text-sm text-muted-foreground"
          aria-hidden="true"
        >
          .mpc
        </span>
        {value && (
          <button
            type="button"
            onClick={() => {
              setValue("");
              inputRef.current?.focus();
            }}
            className="focus-ring rounded-md p-1 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {/* A real link once there is somewhere to go: middle-click, "open in
            new tab" and copy-link all work, and the browser can prefetch it.
            The form's submit handler covers the Enter key. */}
        {status === "available" ? (
          <Button
            size="lg"
            className="shrink-0"
            render={
              <a href={registerHref}>
                Register
                <ArrowRight data-icon="inline-end" />
              </a>
            }
          />
        ) : (
          <Button size="lg" type="submit" disabled className="shrink-0">
            Register
            <ArrowRight data-icon="inline-end" />
          </Button>
        )}
      </form>

      <p
        id="domain-search-status"
        role="status"
        aria-live="polite"
        className={`min-h-5 text-sm ${STATUS_STYLES[status]}`}
      >
        {status === "idle" && (
          <span className="text-muted-foreground">
            Press{" "}
            <kbd className="glass-panel rounded px-1.5 py-0.5 font-mono text-[11px]">
              /
            </kbd>{" "}
            to search — 1 to {MAX_LABEL_LENGTH} characters.
          </span>
        )}
        {status === "checking" && (
          <span className="inline-flex items-center gap-1.5">
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
            Checking {fullName}…
          </span>
        )}
        {status === "available" && (
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            <strong className="font-mono">{fullName}</strong> is available
            {fee
              ? ` for ${fee.feesLabel} ${fee.symbol.split("_").at(-1)}.`
              : "."}
          </span>
        )}
        {status === "taken" && (
          <span className="inline-flex items-center gap-1.5">
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            <strong className="font-mono">{fullName}</strong> is taken —{" "}
            <a
              href={`${routes.domains.path}/${fullName}`}
              className="focus-ring underline underline-offset-4"
            >
              view it
            </a>
            {"."}
          </span>
        )}
        {status === "invalid" && (
          <span className="inline-flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
            {error}
          </span>
        )}
        {status === "error" && (
          <span className="inline-flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
            Couldn&apos;t reach the network. Try again.
          </span>
        )}
      </p>
    </div>
  );
}
