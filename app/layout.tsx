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
  title: "Meta Names",
  description:
    "Meta Names offers a cutting-edge DNS solution on the Partisia blockchain, specifically designed for the Web3 environment. It simplifies the process of blockchain integration for developers through a user-friendly SDK, enabling easy access and management of decentralized domain names. This service streamlines the development of Web3 applications by providing seamless domain management and enhanced user experience, making blockchain technology more accessible and efficient for developers.",
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
