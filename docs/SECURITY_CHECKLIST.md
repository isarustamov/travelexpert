# Security Checklist

- Validate all public API inputs with schemas.
- Rate-limit search, AI, auth, and alert endpoints.
- Keep provider and AI keys in server-only environment variables.
- Use Prisma ORM for database access.
- Apply authenticated user ownership checks for saved trips and alerts.
- Protect admin routes with role-based authorization.
- Sanitize CMS/AI-generated HTML or render Markdown safely.
- Use CSRF protection for session-based mutations where needed.
- Never process card details directly; use Stripe/local payment hosted flows.
- Log security-relevant events without storing sensitive payloads.
- Provide GDPR-style data export and deletion workflows.
