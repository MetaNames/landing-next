"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { MdOpenInNew } from "react-icons/md";

import { Button } from "@/components/Button";
import { NamesGenerator } from "@/components/NamesGenerator";
import { RecentDomains } from "@/components/RecentDomains";
import { RecordClasses } from "@/components/RecordClasses";
import { Section } from "@/components/Section";
import { Stats } from "@/components/Stats";
import routes from "@/constants/routes";

// Skip link component for accessibility
const SkipLink = () => (
  <a
    href="#main-content"
    className="skip-link"
  >
    Skip to main content
  </a>
);

// Animated heading component
const AnimatedHeading = ({ 
  children, 
  className,
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.h2
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.h2>
  );
};

// Animated paragraph
const AnimatedText = ({ 
  children, 
  className,
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.p
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.p>
  );
};

export default function Home() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <SkipLink />
      <main id="main-content" className="min-h-screen">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-center overflow-hidden"
          aria-labelledby="hero-title"
        >
          {/* Animated background gradient */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-primary via-purple-700 to-indigo-900 animate-gradient"
            style={{
              backgroundSize: "200% 200%",
            }}
          />
          
          {/* Floating shapes for visual interest */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <motion.div
              className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
              animate={{ 
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl"
              animate={{ 
                x: [0, -30, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-1/2 right-1/4 w-24 h-24 bg-purple-400/20 rounded-full blur-lg"
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.h1
              id="hero-title"
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              META NAMES
            </motion.h1>
            
            <motion.p
              className="text-sm md:text-base text-white/80 mb-8"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Powered by{" "}
              <Link
                className="font-semibold text-white hover:text-white/80 underline underline-offset-4 transition-colors"
                href="https://partisiablockchain.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Partisia Blockchain
              </Link>
            </motion.p>

            <motion.div
              className="text-xl md:text-2xl lg:text-3xl font-light text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Your <RecordClasses /> — on one web3 name
            </motion.div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Button
                href={routes.app.path}
                variant="secondary"
                size="lg"
                icon={<MdOpenInNew />}
              >
                Launch App
              </Button>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            aria-hidden="true"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <Section variant="secondary" id="features" delay={0.1}>
          <AnimatedHeading className="text-4xl md:text-5xl font-medium mb-8 tracking-wide uppercase" delay={0}>
            One name. All you need.
          </AnimatedHeading>
          
          <AnimatedText className="max-w-3xl mx-auto" delay={0.1}>
            Your digital identity, simplified. One <b>Meta Name</b> to rule your web3 life — no more copying and pasting long wallet addresses.
          </AnimatedText>

          <AnimatedText className="max-w-3xl mx-auto" delay={0.2}>
            Store wallets, socials, websites, bios, avatars — everything that makes you, you. All behind one sleek .meta domain.
          </AnimatedText>

          <AnimatedText className="max-w-3xl mx-auto" delay={0.3}>
            Built on <b>Partisia Blockchain</b> — fast, private, and built for real-world use. No gas wars. No stress.
          </AnimatedText>

          <div className="mt-8">
            <Stats />
          </div>
        </Section>

        {/* Recent Domains Section */}
        <Section 
          variant="primary" 
          id="recent" 
          contentClassName="px-0 md:px-0 max-w-full"
          delay={0.2}
        >
          <AnimatedHeading className="text-4xl md:text-5xl font-medium mb-4 tracking-wide uppercase" delay={0}>
            Fresh domains
          </AnimatedHeading>
          <AnimatedText className="mb-8" delay={0.1}>
            See what's trending. Names are going fast.
          </AnimatedText>
          <RecentDomains />
        </Section>

        {/* Name Generator Section */}
        <Section variant="secondary" id="generator" delay={0.3}>
          <AnimatedHeading className="text-4xl md:text-5xl font-medium mb-4 tracking-wide uppercase" delay={0}>
            Find yours
          </AnimatedHeading>
          <AnimatedText className="mb-4" delay={0.1}>
            Can't decide? Let's spark some inspiration.
          </AnimatedText>
          <NamesGenerator />
        </Section>

        {/* SDK Section */}
        <Section variant="primary" id="sdk" delay={0.4}>
          <AnimatedHeading className="text-4xl md:text-5xl font-medium mb-8 tracking-wide uppercase" delay={0}>
            Build with us
          </AnimatedHeading>
          
          <AnimatedText className="max-w-3xl mx-auto" delay={0.1}>
            Plug into the Meta Names SDK. Simple APIs, powerful possibilities.
          </AnimatedText>
          
          <AnimatedText className="max-w-3xl mx-auto" delay={0.2}>
            Register domains, embed data, manage subdomains — all programmatically. 
            Built for devs who ship.
          </AnimatedText>
          
          <AnimatedText className="max-w-3xl mx-auto" delay={0.3}>
            Docs → Community → Ship. {" "}
            <Link
              href="https://t.me/mpc_metanames"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium px-1 hover:text-primary-foreground transition-colors"
            >
              Join the builders
            </Link>.
          </AnimatedText>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              icon={<MdOpenInNew />}
              variant="secondary"
              href={"https://docs.metanames.app"}
              size="lg"
            >
              Learn More
            </Button>
          </motion.div>
        </Section>
      </main>
    </>
  );
}
