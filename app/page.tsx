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
              Save your <RecordClasses /> on your favourite web3 name
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
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2"
            >
              <div className="w-1 h-2 bg-white/60 rounded-full" />
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <Section variant="secondary" id="features" delay={0.1}>
          <AnimatedHeading className="text-4xl md:text-5xl font-medium mb-8" delay={0}>
            The only name you need
          </AnimatedHeading>
          
          <AnimatedText className="max-w-3xl mx-auto" delay={0.1}>
            Register your domain and subdomains effortlessly with{" "}
            <b>Meta Names</b>, the cutting-edge web3 domain name system for{" "}
            <Link
              href="https://partisiablockchain.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium px-1 hover:text-primary transition-colors"
            >
              Partisia Blockchain.
            </Link>
          </AnimatedText>

          <AnimatedText className="max-w-3xl mx-auto" delay={0.2}>
            Create your unique Meta Names profile using your personal domain,
            allowing you to store and manage a wide array of information all in
            one place.
          </AnimatedText>

          <AnimatedText className="max-w-3xl mx-auto" delay={0.3}>
            With Meta Names, you can effortlessly organize your wallet addresses,
            social media handles (including Discord and Twitter), website links,
            and much more under your unique domain.
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
          <AnimatedHeading className="text-4xl md:text-5xl font-medium mb-4" delay={0}>
            Recently registered domains
          </AnimatedHeading>
          <AnimatedText className="mb-8" delay={0.1}>
            Check out the freshest domains just claimed on Meta Names!
          </AnimatedText>
          <AnimatedText className="mb-8" delay={0.2}>
            Did you just register a domain? Brag about your new Meta Name in our{" "}
            <Link
              href="https://t.me/mpc_metanames"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium px-1 hover:text-primary-foreground transition-colors"
            >
              community channel
            </Link>
          </AnimatedText>
          <RecentDomains />
        </Section>

        {/* Name Generator Section */}
        <Section variant="secondary" id="generator" delay={0.3}>
          <AnimatedHeading className="text-4xl md:text-5xl font-medium mb-4" delay={0}>
            Generate your Meta Name
          </AnimatedHeading>
          <AnimatedText className="mb-4" delay={0.1}>
            {"Running low on ideas? No worries, we've got your back!"}
            <br />
            {"How about snagging the following domain?"}
          </AnimatedText>
          <NamesGenerator />
        </Section>

        {/* SDK Section */}
        <Section variant="primary" id="sdk" delay={0.4}>
          <AnimatedHeading className="text-4xl md:text-5xl font-medium mb-8" delay={0}>
            Integrate with Meta Names SDK
          </AnimatedHeading>
          
          <AnimatedText className="max-w-3xl mx-auto" delay={0.1}>
            Discover the ease of web3 domain management with <b>Meta Names SDK</b>{" "}
            for Partisia Blockchain.
          </AnimatedText>
          
          <AnimatedText className="max-w-3xl mx-auto" delay={0.2}>
            Our platform offers simple domain and subdomain registration,
            versatile information embedding, and a developer-friendly toolkit.
          </AnimatedText>
          
          <AnimatedText className="max-w-3xl mx-auto" delay={0.3}>
            <Link
              href="https://t.me/mpc_metanames"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium px-1 hover:text-primary-foreground transition-colors"
            >
              Join our supportive community
            </Link>
            , access detailed documentation, and transform your applications with
            the power of Meta Names.
          </AnimatedText>
          
          <AnimatedText className="max-w-3xl mx-auto" delay={0.4}>
            Your journey into the future of web3 starts here.
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
