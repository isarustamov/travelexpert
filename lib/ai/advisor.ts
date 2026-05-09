import type { SearchInput, TravelPackage } from "@/lib/types";

export function generateMockRecommendation(input: SearchInput, packages: TravelPackage[]) {
  const best = [...packages].sort((a, b) => b.score - a.score)[0];
  const cheapest = [...packages].sort((a, b) => a.cost.finalTotal - b.cost.finalTotal)[0];
  const premiumDifference = Math.round(((best.cost.finalTotal - cheapest.cost.finalTotal) / cheapest.cost.finalTotal) * 100);
  return `Estimated AI recommendation: ${best.label} is the strongest match for a ${input.travelType} trip from ${input.origin} to ${input.destination}. It scores ${best.score}/100 and is ${premiumDifference}% different from the cheapest option while balancing baggage, hotel quality, cancellation flexibility, and transfer convenience. Prices are mock estimates until live provider APIs are connected.`;
}

export function generateRiskNotes(input: SearchInput, packages: TravelPackage[]) {
  const notes = ["Mock prices exclude provider-specific card fees and live fare changes.", "Visa guidance should be verified against official sources before booking."];
  if (packages.some((p) => !p.flight.baggageIncluded)) notes.push("Some cheap fares do not include checked baggage.");
  if (input.budget && packages[0]?.cost.budgetDifference < 0) notes.push("At least one package exceeds the entered budget; review hotel class or transfer choice.");
  return notes;
}
