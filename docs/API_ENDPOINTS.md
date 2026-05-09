# API Endpoint Plan

## MVP
- `POST /api/search` validates search input and returns mock flights, hotels, transfers, packages, risk notes, weather, and visa information.
- `GET /api/saved-trips` returns temporary MVP saved trips.
- `POST /api/saved-trips` stores a temporary MVP saved trip payload.

## Production Roadmap
- `GET /api/packages/:id` package details.
- `POST /api/alerts` create price alert.
- `GET /api/alerts` list alerts.
- `POST /api/ai/recommendation` server-only package recommendation.
- `POST /api/ai/itinerary` itinerary generation.
- `POST /api/booking-clicks` affiliate click tracking.
- `GET /api/destinations/:slug` CMS guide data.
- `POST /api/admin/providers` manage affiliate providers.
- `PATCH /api/admin/prompts/:id` manage AI prompt settings.
