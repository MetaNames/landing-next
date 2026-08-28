// Animation durations
export const ANIMATION = {
  DURATION: {
    FAST: 0.2,
    NORMAL: 0.3,
    SLOW: 0.5,
    SLOWER: 0.6,
  },
  DELAY: {
    SMALL: 0.1,
    MEDIUM: 0.2,
    LARGE: 0.3,
  },
  MARQUEE_DURATION: 25,
  RECORD_CHANGE_INTERVAL: 3000,
  RECORD_FADE_DURATION: 300,
} as const;

// UI breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
} as const;

// Spacing
export const SPACING = {
  SECTION_PADDING: {
    Y: "py-12 md:py-20",
    X: "px-4 md:px-8 lg:px-20",
  },
} as const;

// Class name constants
export const CLASSES = {
  FOCUS_VISIBLE: "focus-ring",
  GLASS_PANEL: "glass-panel",
  HOVER_BORDER: "transition-colors hover:border-primary/40",
  TOUCH_MANIPULATION: "touch-manipulation",
} as const;

// Domain configuration
export const DOMAIN_CONFIG = {
  TLD: ".mpc",
  CARD_WIDTH: "w-[20rem]",
} as const;

// Route paths
export const ROUTES = {
  APP: "/app",
  REGISTER: "/register",
  DOMAINS: "/domains",
} as const;

// API endpoints
export const API = {
  STATS: "/api/stats",
} as const;

// External links
export const EXTERNAL_LINKS = {
  PARTISIA: "https://partisiablockchain.com/",
  DOCS: "https://docs.metanames.app",
  TELEGRAM: "https://t.me/mpc_metanames",
  GITHUB: "https://github.com/MetaNames",
  TWITTER: "https://x.com/metanames",
} as const;
