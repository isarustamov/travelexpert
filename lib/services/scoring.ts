import type { FlightOption, HotelOption, SearchInput, TransferOption, TravelPackage } from "@/lib/types";

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value));

export function calculateCosts(input: SearchInput, flight: FlightOption, hotel: HotelOption, transfer: TransferOption) {
  const nights = Math.max(1, Math.ceil((new Date(input.returnDate).getTime() - new Date(input.departureDate).getTime()) / 86400000));
  const flightTotal = flight.price * input.passengers;
  const hotelTotal = hotel.totalPrice;
  const transferTotal = transfer.price * 2;
  const insurance = Math.round(18 * input.passengers * Math.max(1, Math.ceil(nights / 5)));
  const food = Math.round((input.travelType === "premium" ? 55 : input.travelType === "cheap" || input.travelType === "student" ? 22 : 35) * nights * input.passengers);
  const localTransport = Math.round((input.transferPreference === "rental" ? 42 : 12) * nights);
  const visaFee = input.destination.toLowerCase().includes("tbilisi") ? 0 : 35 * input.passengers;
  const serviceFee = Math.round((flightTotal + hotelTotal + transferTotal) * 0.035);
  const finalTotal = flightTotal + hotelTotal + transferTotal + insurance + food + localTransport + visaFee + serviceFee;
  return { flightTotal, hotelTotal, transferTotal, insurance, food, localTransport, visaFee, serviceFee, finalTotal, perPerson: Math.round(finalTotal / input.passengers), budgetDifference: input.budget - finalTotal };
}

export function scorePackage(input: SearchInput, flight: FlightOption, hotel: HotelOption, transfer: TransferOption, minCost: number, maxDuration: number) {
  const cost = calculateCosts(input, flight, hotel, transfer);
  const priceScore = clamp((minCost / cost.finalTotal) * 100);
  const comfortScore = (flight.comfortScore + transfer.comfortScore + hotel.rating * 10) / 3;
  const durationScore = clamp(100 - (flight.durationMinutes / maxDuration) * 45);
  const hotelQualityScore = clamp((hotel.stars / 5) * 55 + hotel.rating * 4.5);
  const cancellationScore = hotel.cancellationPolicy.toLowerCase().includes("free") || flight.refundable ? 100 : hotel.cancellationPolicy.toLowerCase().includes("flex") ? 90 : 35;
  const transferConvenience = transfer.comfortScore;
  const familyBoost = input.travelType === "family" && hotel.familyFriendly ? 6 : 0;
  return Math.round(clamp(priceScore * .3 + comfortScore * .2 + durationScore * .15 + hotelQualityScore * .15 + cancellationScore * .1 + transferConvenience * .1 + familyBoost));
}

export function buildPackages(input: SearchInput, flights: FlightOption[], hotels: HotelOption[], transfers: TransferOption[]): TravelPackage[] {
  const combinations = flights.flatMap((flight) => hotels.flatMap((hotel) => transfers.map((transfer) => ({ flight, hotel, transfer, cost: calculateCosts(input, flight, hotel, transfer) }))));
  const minCost = Math.min(...combinations.map((c) => c.cost.finalTotal));
  const maxDuration = Math.max(...flights.map((f) => f.durationMinutes));
  const toPackage = (label: string, badge: string, combo: typeof combinations[number]): TravelPackage => {
    const score = scorePackage(input, combo.flight, combo.hotel, combo.transfer, minCost, maxDuration);
    return {
      id: `${badge.toLowerCase().replace(/\s+/g, "-")}-${combo.flight.id}-${combo.hotel.id}-${combo.transfer.id}`,
      label, badge, flight: combo.flight, hotel: combo.hotel, transfer: combo.transfer, cost: combo.cost, score,
      pros: [combo.flight.baggageIncluded ? "Checked baggage included" : "Lowest entry fare", combo.hotel.breakfastIncluded ? "Breakfast included" : "Lower nightly rate", combo.transfer.durationMinutes <= 35 ? "Quick airport arrival" : "Lower transfer price"],
      cons: [combo.flight.refundable ? "Higher upfront fare" : "Limited refund flexibility", combo.hotel.distanceFromCenterKm > 2 ? "Farther from center" : "Central hotels can be busy"],
    };
  };
  const cheapest = combinations.toSorted((a, b) => a.cost.finalTotal - b.cost.finalTotal)[0];
  const fastest = combinations.toSorted((a, b) => (a.flight.durationMinutes + a.transfer.durationMinutes) - (b.flight.durationMinutes + b.transfer.durationMinutes))[0];
  const premium = combinations.toSorted((a, b) => (b.flight.comfortScore + b.hotel.rating * 10 + b.transfer.comfortScore) - (a.flight.comfortScore + a.hotel.rating * 10 + a.transfer.comfortScore))[0];
  const family = combinations.filter((c) => c.hotel.familyFriendly && c.flight.baggageIncluded).toSorted((a, b) => b.hotel.rating - a.hotel.rating)[0] ?? premium;
  const best = combinations.toSorted((a, b) => scorePackage(input, b.flight, b.hotel, b.transfer, minCost, maxDuration) - scorePackage(input, a.flight, a.hotel, a.transfer, minCost, maxDuration))[0];
  return [toPackage("Cheapest Package", "Cheapest", cheapest), toPackage("Best Value Package", "AI pick", best), toPackage("Fastest Package", "Fastest", fastest), toPackage("Premium Package", "Premium", premium), toPackage("Family Package", "Family", family)];
}
