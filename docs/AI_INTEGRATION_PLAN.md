# AI Integration Plan

## Guardrails
The AI must use only supplied provider data. If live API data is missing, every recommendation must state that prices are mock estimates. The AI must not invent real prices, visa rules, availability, cancellation terms, or weather forecasts.

## Prompt Types
1. Package recommendation.
2. Travel risk analysis.
3. Budget optimization.
4. Alternative destination suggestion.
5. SEO destination content generation.
6. Itinerary generation.

## Implementation Phases
- Phase 1: deterministic mock recommendation text and risk notes.
- Phase 2: server-side OpenAI-compatible call with JSON input, structured output, timeout, and retry policy.
- Phase 3: admin prompt settings, evaluation traces, A/B prompt tests, and content review workflow.
