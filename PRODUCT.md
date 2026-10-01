# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: Vite + React + TypeScript, static build deployed on Vercel (Hobby). Supabase (Postgres + REST, anon key with RLS insert-only policies) stores A/B hero impressions/conversions and newsletter/contact leads. Chosen because the owner targets front-end and full-stack recruiters, who read React fluently, and the page must stay a fast static deploy.

## Users

Primary: a recruiter or client reviewing Daniel Yataco's front-end portfolio, who must judge design and engineering skill in under a minute. In-fiction: urban shoppers in Lima and abroad (25-40) who buy considered, slow-fashion pieces online from a phone.

## Product Purpose

A fully working storefront landing for QAYTU, a fictional Peruvian contemporary label (assumption: name and brand invented for the demo; Quechua "q'aytu" = thread). It must convert visitors (add to bag, join the drop list) and prove the author can ship production-grade UI. Success: visitor understands the collection in one viewport, interacts with the signature mechanism, and adds a piece or leaves an email.

## Positioning

Every piece is traced to the thread: fiber, dye plant, community and hours of work are visible per garment. A generic fashion store cannot copy that per-piece traceability.

## Operating Context

Visitors arrive mostly on mobile from social links. Recruiters open it on desktop from GitHub or a CV. Demo data only: no real checkout.

## Capabilities and Constraints

Working: catalog with filters, product detail with size guide, bag drawer with totals, drop-list form, A/B hero test persisted in Supabase, author badge linking to the portfolio. Checkout is intentionally disabled (demo). No image generation available: imagery is authored in code (SVG/CSS) or sourced from verified free photography. Spanish copy.

## Brand Commitments

Author badge "Hecho por Daniel Yataco" on every demo, linking to the portfolio. Commits authored only by danielyatacoblas.

## Evidence on Hand

None real. All products, prices (PEN), communities and figures are synthetic and must be labeled as a demo. No testimonials, press or customer counts may be invented as fact.

## Product Principles

- Prove the craft, not claim it: every section must do something.
- Traceability is the story: thread, place, hands.
- Mobile first; desktop is the recruiter's lens.
- Fast and accessible beats ornamental.

## Accessibility & Inclusion

WCAG 2.2 AA: contrast, keyboard paths, focus visible, prefers-reduced-motion respected.
