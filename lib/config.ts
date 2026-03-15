// Environment configuration
// Use process.env.NEXT_PUBLIC_* for client-side accessible variables

export const config = {
  // API
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "",
  
  // Analytics
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID || "",
  
  // Features
  enableDevTools: process.env.NODE_ENV === "development",
  
  // Meta
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://metanames.app",
  siteName: "MetaNames",
  siteDescription: "DNS for Partisia Blockchain - Your web3 identity solution",
} as const;

export type Config = typeof config;
