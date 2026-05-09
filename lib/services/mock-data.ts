import type { FlightOption, HotelOption, SearchInput, TransferOption } from "@/lib/types";

const destinationMultipliers: Record<string, number> = { istanbul: 1, dubai: 1.35, paris: 1.7, antalya: 1.1, rome: 1.55, tbilisi: .75 };
const multiplierFor = (destination: string) => destinationMultipliers[destination.toLowerCase()] ?? 1.25;

export function getMockFlights(input: SearchInput): FlightOption[] {
  const m = multiplierFor(input.destination);
  const base = Math.round(145 * m);
  return [
    { id: "fl-cheap", airline: "AzerSky Connect", origin: input.origin, destination: input.destination, departureTime: "06:20", arrivalTime: "09:10", durationMinutes: 170, stops: 1, baggageIncluded: false, refundable: false, price: base, comfortScore: 62 },
    { id: "fl-value", airline: "Caspian Airways", origin: input.origin, destination: input.destination, departureTime: "10:45", arrivalTime: "13:05", durationMinutes: 140, stops: 0, baggageIncluded: true, refundable: true, price: Math.round(base * 1.22), comfortScore: 82 },
    { id: "fl-fast", airline: "Silk Road Air", origin: input.origin, destination: input.destination, departureTime: "15:30", arrivalTime: "17:35", durationMinutes: 125, stops: 0, baggageIncluded: true, refundable: false, price: Math.round(base * 1.34), comfortScore: 78 },
    { id: "fl-premium", airline: "PremiumJet", origin: input.origin, destination: input.destination, departureTime: "20:10", arrivalTime: "22:20", durationMinutes: 130, stops: 0, baggageIncluded: true, refundable: true, price: Math.round(base * 1.85), comfortScore: 94 },
  ];
}

export function getMockHotels(input: SearchInput): HotelOption[] {
  const nights = Math.max(1, Math.ceil((new Date(input.returnDate).getTime() - new Date(input.departureDate).getTime()) / 86400000));
  const m = multiplierFor(input.destination);
  const hotel = (id: string, name: string, stars: number, rating: number, price: number, familyFriendly: boolean, amenities: string[], distance: number, breakfastIncluded: boolean, cancellationPolicy: string): HotelOption => ({
    id, name, stars, rating, location: `${input.destination} central district`, distanceFromCenterKm: distance, amenities, cancellationPolicy, breakfastIncluded, pricePerNight: Math.round(price * m), totalPrice: Math.round(price * m) * nights, familyFriendly,
  });
  return [
    hotel("ht-budget", "Urban Nest Budget Stay", 3, 8.1, 52, false, ["Wi-Fi", "Metro nearby"], 2.8, false, "Non-refundable"),
    hotel("ht-value", "Blue Harbor Suites", 4, 8.8, 86, true, ["Breakfast", "Free cancellation", "Family rooms"], 1.1, true, "Free cancellation until 48h before check-in"),
    hotel("ht-family", "Garden Family Aparthotel", 4, 9.0, 104, true, ["Kitchen", "Kids club", "Airport desk"], 1.9, true, "Flexible cancellation"),
    hotel("ht-premium", "The Meridian Grand", 5, 9.4, 172, true, ["Spa", "Concierge", "Breakfast", "Executive lounge"], .4, true, "Free cancellation until 24h before check-in"),
  ];
}

export function getMockTransfers(input: SearchInput): TransferOption[] {
  const m = multiplierFor(input.destination);
  return [
    { id: "tr-public", type: "public", name: "Airport metro + city card", price: Math.round(8 * m), durationMinutes: 55, comfortScore: 45, availability: "Every 15 minutes", luggageSuitability: "Light luggage only" },
    { id: "tr-taxi", type: "taxi", name: "Licensed airport taxi", price: Math.round(33 * m), durationMinutes: 35, comfortScore: 70, availability: "24/7", luggageSuitability: "2 checked bags" },
    { id: "tr-private", type: "private", name: "Meet-and-greet private transfer", price: Math.round(58 * m), durationMinutes: 30, comfortScore: 88, availability: "Pre-booked", luggageSuitability: "Family luggage" },
    { id: "tr-rental", type: "rental", name: "Compact rental car package", price: Math.round(74 * m), durationMinutes: 40, comfortScore: 76, availability: "Subject to stock", luggageSuitability: "Flexible" },
  ];
}
