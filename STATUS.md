# MetaNames Landing (metanames-landing-next) — STATUS.md

> Single source of truth for project state, open items, and decisions.

---

## Current State

- **Status:** 🟡 Live / Minor fixes
- **URL:** https://metanames.app
- **Branch:** `main` (deployed via Vercel)

---

## What Works

- ✅ Next.js 14 app with Tailwind CSS
- ✅ Landing page for Partisia Blockchain DNS service
- ✅ Dark mode UI with proper contrast
- ✅ Footer (fixed 2026-03-12 — was gray-on-gray)
- ✅ Sentry error tracking configured

---

## Pending / Next Steps

- [ ] **New features** — What's next for metanames.app? (roadmap with Bruce)
- [ ] **SEO optimization** — Meta tags, Open Graph, sitemap
- [ ] **Analytics** — Add Vercel Analytics or alternative
- [ ] **Blog/Docs** — Content for the domain system

---

## Hourly Dev Session Tracker

**Run:** Every hour (cron: `0 * * * *`)

### Session Log
| # | Date | Time (UTC) | Work Done | Blockers |
|---|------|------------|-----------|----------|
| 1 | 2026-03-14 | 00:19 UTC | Added sitemap.ts, robots.ts, enhanced metadata (OG, Twitter Cards, keywords) | None |
| 2 | 2026-03-14 | 10:22 UTC | Modernize landing page: Fixed build errors, pushed to `modernize-landing-v2` branch (animations, accessibility, mobile responsive) | None |
| 3 | 2026-03-14 | 12:04 UTC | Verified build passes, PR #2 open and mergeable — awaiting review | None |

---

## Current Task (Edit this each session)

**Task:** Modernize landing page - layout, animations, accessibility

**Goal:**
1. Install framer-motion (if not present)
2. Update globals.css: add animation utilities + accessibility (skip link, focus states, reduced motion)
3. Update components:
   - Header.tsx: Mobile responsive with animated hamburger menu
   - Section.tsx: Scroll-triggered fade-in animations with framer-motion
   - Footer.tsx: Accessibility improvements (aria-labels, roles)
   - page.tsx: Hero section with gradient background + floating shapes, add section IDs for anchor links
4. Build: `npm run build`
5. Test: Verify mobile responsive + animations work
6. Push: Commit to new branch `modernize-landing-v2`

**Last session notes:** Completed: Fixed build errors, animations working, accessibility features added (skip link, focus states, reduced motion), mobile responsive header. Pushed to `modernize-landing-v2` branch. Build passes.

**Next session:** Open PR and merge to main (after Marco review)

- Side project with Bruce (MetaNames)
- Deployed on Vercel, auto-deploys from main
- Focus: Keep it simple, support only (4h/week max per 4to1)
