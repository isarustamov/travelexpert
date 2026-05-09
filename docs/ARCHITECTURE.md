# System Architecture

## Stack
- Frontend: Next.js App Router, TypeScript, Tailwind CSS.
- Backend: Next.js API routes for MVP, with a future NestJS service boundary if provider orchestration grows.
- Database: PostgreSQL via Prisma.
- AI: OpenAI-compatible LLM integration through a server-only advisor layer.
- Cache: Redis for provider search cache, rate limits, and user alert snapshots.
- Jobs: BullMQ for price alerts, affiliate refreshes, PDF exports, and content generation workflows.
- Auth: NextAuth or Clerk with role-based admin protection.
- Payments: Stripe plus optional local payment provider.

## Provider Adapter Pattern
Each provider category uses a replaceable service interface:
- Flight providers: Amadeus, Duffel, Kiwi, Skyscanner Partner API, Travelpayouts.
- Hotel providers: Booking affiliate, Expedia Rapid, Agoda, Travelpayouts hotels.
- Transfer providers: GetTransfer, KiwiTaxi, local taxi APIs, manual providers.
- Weather providers: OpenWeather.
- Visa providers: Sherpa, iVisa, or admin-managed database.
- Currency providers: exchangerate.host or equivalent.

## Security Architecture
- Validate inputs with Zod before business logic.
- Keep API keys server-side in environment variables.
- Use Prisma parameterized queries to avoid SQL injection.
- Enforce auth and admin role checks at route/layout boundaries.
- Add Redis-backed rate limits for search and AI endpoints.
- Store only necessary personal data and support deletion/export workflows.
