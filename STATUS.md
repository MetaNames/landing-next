# MetaNames Landing (metanames-landing-next) — STATUS.md

> Single source of truth for project state, open items, and decisions.

---

## Current State

- **Status:** 🟡 Live / Modernization in progress
- **URL:** https://metanames.app
- **Branch:** `modernize-landing-v2` (PR #2 open)

---

## What Works

- ✅ Next.js 14 app with Tailwind CSS
- ✅ Landing page for Partisia Blockchain DNS service
- ✅ Dark mode UI with proper contrast
- ✅ Footer (fixed 2026-03-12 — was gray-on-gray)
- ✅ Sentry error tracking configured

---

## Pending / Next Steps

- [ ] **Merge PR #2** — Review and merge `modernize-landing-v2` to main
- [ ] **New features** — What's next for metanames.app? (roadmap with Bruce)
- [ ] **SEO optimization** — Meta tags, Open Graph, sitemap
- [ ] **Analytics** — Add Vercel Analytics or alternative

---

## Hourly Dev Session Tracker

**Run:** Every hour (cron: `0 * * * *`)

### Session Log
| # | Date | Time (UTC) | Work Done | Blockers |
|---|------|------------|-----------|----------|
| 1 | 2026-03-14 | 00:19 UTC | Added sitemap.ts, robots.ts, enhanced metadata (OG, Twitter Cards, keywords) | None |
| 2 | 2026-03-14 | 10:22 UTC | Modernize landing page: Fixed build errors, pushed to `modernize-landing-v2` branch (animations, accessibility, mobile responsive) | None |
| 3 | 2026-03-14 | 12:04 UTC | Verified build passes, PR #2 open and mergeable — awaiting review | None |
| 4 | 2026-03-14 | 13:04 UTC | Build passes, committed STATUS.md update, PR #2 still open | None |
| 5 | 2026-03-14 | 14:04 UTC | Build passes (Next.js 16.1.6), verified on modernize-landing-v2 branch, PR #2 still open awaiting merge | None |
| 6 | 2026-03-14 | 15:04 UTC | Build passes, working tree clean, PR #2 (feat: Modernize landing page v2) still open awaiting Marco review | None |
| 7 | 2026-03-14 | 16:04 UTC | Build passes (Next.js 16.1.6), working tree clean, PR #2 still open awaiting merge | None |
| 8 | 2026-03-14 | 17:04 UTC | Build passes, committed & pushed, PR #2 still open awaiting merge | None |
| 9 | 2026-03-14 | 18:04 UTC | Build passes (Next.js 16.1.6), working tree clean, PR #2 still open awaiting merge | None |
| 10 | 2026-03-14 | 20:04 UTC | Build passes, working tree clean, PR #2 still open awaiting merge | None |
| 11 | 2026-03-14 | 21:04 UTC | Build passes (Next.js 16.1.6), working tree clean, PR #2 still open awaiting merge | None |
| 12 | 2026-03-14 | 22:04 UTC | Build passes (Next.js 16.1.6), working tree clean, PR #2 (feat: Modernize landing page v2) still open awaiting merge | None |
| 13 | 2026-03-14 | 23:04 UTC | Build passes (Next.js 16.1.6), committed & pushed to modernize-landing-v2, PR #2 still open awaiting merge | None |
| 15 | 2026-03-15 | 08:04 UTC | Build passes ✅. Vercel deploy step failing - infrastructure issue (not code). | ⚠️ Vercel credentials |
| 16 | 2026-03-15 | 09:04 UTC | Build passes ✅. Vercel deploy still failing - infrastructure issue. | ⚠️ Vercel credentials |
| 17 | 2026-03-15 | 10:30 UTC | CI/Vercel issue resolved. Focus shifted to visual improvements. | None |
| 18 | 2026-03-15 | 11:04 UTC | Added hover glow effect to CTA buttons. | None |
| 19 | 2026-03-15 | 22:24 UTC | Removed deploy from CI, build-only workflow. | None |
| 20 | 2026-03-15 | 22:26 UTC | Fixed headline flashing — record type cycles sequentially, 3s interval, better styling. | None |
| 21 | 2026-03-15 | 22:27 UTC | Added min-width to prevent layout shift in record type. | None |
| 22 | 2026-03-15 | 22:29 UTC | Changed scroll icon to down arrow. | None |
| 23 | 2026-03-15 | 22:31 UTC | Updated font to Plus Jakarta Sans (modern, geometric). | None |
| 24 | 2026-03-15 | 22:32 UTC | Modernized recent domains carousel with accessibility + hover effects. | None |
| 25 | 2026-03-15 | 22:36 UTC | Added animated stats counters, button hover scale effects, modern stats cards. | None |
| 26 | 2026-03-15 | 22:38 UTC | Added name generator with category selection (Mixed/Adjectives/Names/Star Wars/Colors) + word count (1-3). | None |
| 27 | 2026-03-15 | 22:41 UTC | Made section titles uppercase + shorter: "One name. All you need.", "Fresh domains", "Find yours", "Build with us". | None |
| 28 | 2026-03-15 | 22:42 UTC | Modernized all copy on the page for better engagement. | None |
| 29 | 2026-03-15 | 22:46 UTC | Fixed generator error: word count vs dictionary length. | None |
| 30 | 2026-03-15 | 22:47 UTC | Fixed generator: multiple dictionaries per word count. | None |
| 31 | 2026-03-15 | 22:49 UTC | Removed Telegram CTA from Fresh domains section. | None |
| 32 | 2026-03-15 | 22:52 UTC | Fixed auto-regenerate name on category/word count change. | None |
| 33 | 2026-03-15 | 22:53 UTC | Added text outline to navbar for better readability. | None |
| 34 | 2026-03-15 | 22:55 UTC | Changed hover badge from .meta to .mpc. | None |
| 35 | 2026-03-15 | 22:56 UTC | Cleaned Star Wars names to keep only first word (no spaces). | None |

---

## Current Task

**Task:** Visual improvements — enhance the landing page visual appeal

**Completed Today:**
- ✅ Font: Plus Jakarta Sans
- ✅ Headline: Fixed record type cycling (sequential, 3s, min-width)
- ✅ Scroll indicator: Down arrow
- ✅ Recent domains: Modern carousel with accessibility + hover effects
- ✅ Stats: Animated counters + glassmorphism cards
- ✅ Name generator: Categories + word count + auto-regenerate
- ✅ Section titles: Uppercase + shorter
- ✅ Copy: Modernized all text
- ✅ Navbar: Text outline for readability
- ✅ Hover badge: .mpc instead of .meta
- ✅ Star Wars: Cleaned names (first word only)

**Next session:** Merge PR #2 or continue visual polish

- Side project with Bruce (MetaNames)
- Deployed on Vercel, auto-deploys from main
- Focus: Keep it simple, support only (4h/week max per 4to1)
