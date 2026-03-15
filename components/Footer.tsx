import Link from "next/link";
import { FaGithub, FaTelegram, FaXTwitter } from "react-icons/fa6";

const footerLinks = [
  { href: "https://docs.metanames.app", label: "Docs", external: true },
  { href: "https://t.me/mpc_metanames", label: "Telegram", external: true },
  { href: "https://github.com/MetaNames", label: "GitHub", external: true },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-secondary/50 backdrop-blur-sm border-t border-white/10 py-12 px-4"
      role="contentinfo"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link 
              href="/" 
              className="text-xl font-semibold text-white hover:text-purple-200 transition-colors [-webkit-text-stroke:0.3px_rgba(255,255,255,0.8)]"
              aria-label="MetaNames Home"
            >
              MetaNames
            </Link>
            <p className="text-sm text-white/50">
              © {currentYear} MetaNames. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <nav 
            className="flex flex-wrap justify-center gap-6"
            aria-label="Footer navigation"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-white/60 hover:text-white text-sm font-medium transition-colors flex items-center gap-1"
              >
                {link.label}
                {link.external && (
                  <span className="sr-only">(opens in new tab)</span>
                )}
              </Link>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-4" aria-label="Social media">
            <a
              href="https://github.com/MetaNames"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="GitHub (opens in new tab)"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://t.me/mpc_metanames"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Telegram (opens in new tab)"
            >
              <FaTelegram size={20} />
            </a>
            <a
              href="https://x.com/metanames"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="X/Twitter (opens in new tab)"
            >
              <FaXTwitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
