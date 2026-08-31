import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

import { config } from "@/lib/config";

import Providers from "./providers";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "MetaNames | DNS for Partisia Blockchain",
    template: "%s | MetaNames",
  },
  description:
    "Register a .mpc domain on the Partisia Blockchain and replace long wallet addresses with one readable name. Store wallets, socials, websites and avatars on-chain, issue subdomains, and resolve it all from your own app with the open-source Meta Names SDK.",
  keywords: [
    ".mpc domain",
    "Meta Names",
    "Partisia Blockchain",
    "Partisia domain name",
    "web3 domains",
    "web3 identity",
    "decentralized DNS",
    "blockchain domain names",
    "crypto wallet name",
    "blockchain subdomains",
  ],
  authors: [{ name: "MetaNames Team" }],
  creator: "MetaNames",
  publisher: "MetaNames",
  applicationName: "MetaNames",
  category: "technology",
  metadataBase: new URL(config.siteUrl),
  // Every marketing link lands on "/" with a ?q= search seed; the canonical
  // keeps those variants from being indexed as separate pages.
  alternates: { canonical: "/" },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MetaNames",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: config.siteUrl,
    siteName: "MetaNames",
    title: "MetaNames | DNS for Partisia Blockchain",
    description:
      "Register a .mpc domain on the Partisia Blockchain. One readable name for your wallets, socials, website and avatar.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MetaNames | DNS for Partisia Blockchain",
    description:
      "Register a .mpc domain on the Partisia Blockchain. One readable name for your wallets, socials, website and avatar.",
    creator: "@metanames",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#06060a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable}`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen flex flex-col bg-background font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
        >
          Skip to main content
        </a>
        <Providers>
          <Header />
          <main id="main-content" className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
