@AGENTS.md

# Marketing & SEO review

Every change to a page, section, copy, metadata or route must be reviewed by two subagents before the work is reported as done:

- **Marketing agent** — checks copy, claims and CTAs against what the rest of the site says (no unverifiable or contradictory claims, e.g. support hours, security, products that are still "Coming Soon"), tone consistency, and where each CTA links.
- **SEO agent** — checks `metadata` (title, description, canonical, Open Graph/Twitter), one H1 and a clean heading hierarchy, `aria-labelledby` section pattern, JSON-LD where relevant, internal links/anchors, and `app/sitemap.ts`.

Run both in parallel, read-only. Claude has the final say: apply what improves the page, keep the user's design and copy unless a recommendation fixes a real problem, and list any skipped or user-facing decisions (claims, prices, links) in the final message.
