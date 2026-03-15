"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOpenInNew, MdMenu, MdClose } from "react-icons/md";
import Link from "next/link";

import { Button } from "@/components/Button";
import Logo from "@/components/Logo";
import routes from "@/constants/routes";

export interface HeaderProps {}

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#recent", label: "Recent" },
  { href: "#generator", label: "Generator" },
  { href: "#sdk", label: "SDK" },
];

const Header = (props: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-primary/95 backdrop-blur-sm px-4 lg:px-6 sticky top-0 w-full z-50 border-b border-white/10">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl py-3">
        <Link 
          href="/" 
          className="flex items-center gap-2"
          aria-label="MetaNames Home"
        >
          <Logo />
          <span className="text-white self-center text-lg md:text-xl font-semibold whitespace-nowrap [-webkit-text-stroke:0.5px_rgba(255,255,255,0.8)]">
            MetaNames
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-white transition-colors text-sm font-medium [-webkit-text-stroke:0.3px_rgba(255,255,255,0.8)]"
            >
              {link.label}
            </Link>
          ))}
          <Button
            icon={<MdOpenInNew />}
            variant="secondary"
            href={routes.app.path}
            className="ml-2"
          >
            Launch App
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-primary border-t border-white/10"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col py-4 px-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white transition-colors py-2 text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                icon={<MdOpenInNew />}
                variant="secondary"
                href={routes.app.path}
                className="mt-2"
              >
                Launch App
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export { Header };
