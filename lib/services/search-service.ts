import type { SearchInput, SearchResult } from "@/lib/types";
import { generateMockRecommendation, generateRiskNotes } from "@/lib/ai/advisor";
import { buildPackages } from "@/lib/services/scoring";
import { getMockFlights, getMockHotels, getMockTransfers } from "@/lib/services/mock-data";

export function runMockSearch(input: SearchInput): SearchResult {
  const flights = getMockFlights(input);
  const hotels = getMockHotels(input);
  const transfers = getMockTransfers(input);
  const packages = buildPackages(input, flights, hotels, transfers);
  return {
    input,
    flights,
    hotels,
    transfers,
    packages,
    aiRecommendation: generateMockRecommendation(input, packages),
    riskNotes: generateRiskNotes(input, packages),
    weatherSummary: `Estimated seasonal weather for ${input.destination}: mild to warm conditions. Connect OpenWeather for live forecast before launch.`,
    visaInfo: `Estimated visa guidance for ${input.destination}. Connect Sherpa/iVisa or managed visa database for production accuracy.`,
  };
}
