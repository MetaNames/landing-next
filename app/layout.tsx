import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";

import Providers from "./providers";

const font = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
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
    ".meta",
  ],
  authors: [{ name: "MetaNames Team" }],
  creator: "MetaNames",
  metadataBase: new URL("https://metanames.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://metanames.app",
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
  // themeColor: "var(--primary)",
  themeColor: "#6849fe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          font.variable
        )}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
