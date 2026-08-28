"use client";

import { Suspense, lazy } from "react";
import { ExternalLink } from "lucide-react";

import { HowItWorks } from "@/components/how-it-works";
import { RecordClasses } from "@/components/record-classes";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import {
  GeneratorSkeleton,
  RecentDomainsSkeleton,
  StatsSkeleton,
} from "@/components/ui/loading-skeleton";
import routes from "@/constants/routes";
import { EXTERNAL_LINKS } from "@/lib/constants";

// Below-the-fold panels are client-fetched; keeping them out of the first
// bundle shortens the hero's time to interactive.
const NamesGenerator = lazy(() =>
  import("@/components/names-generator").then((m) => ({
    default: m.NamesGenerator,
  })),
);
const RecentDomains = lazy(() =>
  import("@/components/recent-domains").then((m) => ({
    default: m.RecentDomains,
  })),
);
const Stats = lazy(() =>
  import("@/components/stats").then((m) => ({ default: m.Stats })),
);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        className="spotlight-beam flex flex-col items-center gap-8 py-16 sm:py-24 w-full"
        aria-labelledby="hero-title"
      >
        <div className="relative z-10 flex flex-col items-center gap-4 text-center max-w-3xl mx-auto px-4 animate-fade-up">
          <a
            href={EXTERNAL_LINKS.PARTISIA}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring glass-panel rounded-full px-3 py-1 text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Powered by Partisia Blockchain
          </a>
          <h1
            id="hero-title"
            className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-balance leading-[1.05]"
          >
            Own your name on the{" "}
            <span className="text-primary-glow text-glow">Partisia</span>{" "}
            Blockchain
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground text-balance">
            Your <RecordClasses /> — on one web3 name
          </p>
          <div className="mt-2">
            <Button
              size="lg"
              render={
                <a href={routes.app.path}>
                  Launch App
                  <ExternalLink data-icon="inline-end" />
                </a>
              }
            />
          </div>
        </div>

        <div className="relative z-10 w-full px-4">
          <HowItWorks />
        </div>
      </section>

      {/* Features + stats */}
      <Section
        id="features"
        variant="muted"
        eyebrow="One name. All you need."
        title="Your digital identity, simplified"
      >
        <div className="max-w-3xl mx-auto flex flex-col gap-4 text-muted-foreground text-balance">
          <p>
            One <strong className="text-foreground">Meta Name</strong> to rule
            your web3 life — no more copying and pasting long wallet addresses.
          </p>
          <p>
            Store wallets, socials, websites, bios, avatars — everything that
            makes you, you. All behind one sleek .mpc domain.
          </p>
          <p>
            Built on{" "}
            <strong className="text-foreground">Partisia Blockchain</strong> —
            fast, private, and built for real-world use. No gas wars. No stress.
          </p>
        </div>

        <Suspense fallback={<StatsSkeleton />}>
          <Stats />
        </Suspense>
      </Section>

      {/* Recent domains */}
      <Section id="recent" title="Fresh domains" contentClassName="px-0">
        <p className="text-muted-foreground px-4">
          See what&apos;s trending. Names are going fast.
        </p>
        <Suspense fallback={<RecentDomainsSkeleton />}>
          <RecentDomains />
        </Suspense>
      </Section>

      {/* Generator */}
      <Section id="generator" variant="muted" title="Find yours">
        <p className="text-muted-foreground">
          Can&apos;t decide? Let&apos;s spark some inspiration.
        </p>
        <Suspense fallback={<GeneratorSkeleton />}>
          <NamesGenerator />
        </Suspense>
      </Section>

      {/* SDK */}
      <Section id="sdk" title="Build with us">
        <div className="max-w-3xl mx-auto flex flex-col gap-4 text-muted-foreground text-balance">
          <p>
            Plug into the Meta Names SDK. Simple APIs, powerful possibilities.
          </p>
          <p>
            Register domains, embed data, manage subdomains — all
            programmatically. Built for devs who ship.
          </p>
          <p>
            Docs, community, ship.{" "}
            <a
              href={EXTERNAL_LINKS.TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring underline underline-offset-4"
            >
              Join the builders
            </a>
            .
          </p>
        </div>
        <Button
          size="lg"
          variant="outline"
          render={
            <a
              href={EXTERNAL_LINKS.DOCS}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the docs
              <ExternalLink data-icon="inline-end" />
            </a>
          }
        />
      </Section>
    </>
  );
}
