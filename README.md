# TravelExpert AI

Premium AI-powered travel comparison foundation for flights, hotels, airport transfers, visa notes, insurance estimates, local costs, and complete package recommendations.

## What is included
- Next.js + TypeScript + Tailwind CSS application scaffold.
- Premium responsive home page and search results experience.
- Mock provider services for flights, hotels, and transfers.
- Package builder for cheapest, best-value, fastest, premium, and family packages.
- Weighted scoring algorithm: price 30%, comfort 20%, duration 15%, hotel quality 15%, cancellation flexibility 10%, transfer convenience 10%.
- Total trip cost calculator with final total, per-person cost, and budget delta.
- AI advisor placeholder with prompt library and strict mock-data disclosure guardrails.
- Prisma PostgreSQL schema for users, searches, options, packages, saved trips, alerts, destinations, affiliates, booking clicks, blog posts, admins, and subscriptions.
- Product, architecture, API, UI, AI, security, monetization, and MVP planning documentation.

## Local setup

```bash
npm install
npm run dev
```

> The current implementation uses mock services. Production provider credentials should be configured only as server-side environment variables.

## Environment variables planned

```bash
DATABASE_URL="postgresql://..."
OPENAI_API_KEY="..."
NEXTAUTH_SECRET="..."
STRIPE_SECRET_KEY="..."
REDIS_URL="..."
```

## Production integration path
1. Replace mock provider functions in `lib/services/mock-data.ts` with adapter implementations.
2. Persist searches and packages using Prisma models in `prisma/schema.prisma`.
3. Add authentication and role checks for dashboard and admin pages.
4. Add Redis-backed caching and rate limiting.
5. Connect OpenAI-compatible AI endpoint using prompts from `lib/ai/prompts.ts`.
6. Add affiliate click tracking and provider redirect safeguards.
7. Add Stripe or local provider subscription checkout.
