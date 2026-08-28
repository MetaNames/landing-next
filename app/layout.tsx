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
    "Meta Names offers a cutting-edge DNS solution on the Partisia blockchain. Simplify blockchain integration for Web3 developers with our user-friendly SDK. Manage decentralized domain names seamlessly.",
  keywords: [
    "DNS",
    "Partisia Blockchain",
    "Web3",
    "Blockchain域名",
    "Decentralized DNS",
    "Web3 domains",
    "Crypto domain",
    ".mpc",
    "Partisia",
  ],
  authors: [{ name: "MetaNames Team" }],
  creator: "MetaNames",
  metadataBase: new URL(config.siteUrl),
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
      "Cutting-edge DNS solution on Partisia Blockchain. Simplify Web3 domain management with our developer-friendly SDK.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MetaNames - DNS for Partisia Blockchain",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MetaNames | DNS for Partisia Blockchain",
    description:
      "Cutting-edge DNS solution on Partisia Blockchain. Simplify Web3 domain management.",
    images: ["/og-image.png"],
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
