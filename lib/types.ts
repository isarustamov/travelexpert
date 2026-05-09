export type TravelType = "cheap" | "balanced" | "premium" | "family" | "business" | "romantic" | "student";
export type HotelPreference = "budget" | "3-star" | "4-star" | "5-star" | "apartment";
export type TransferPreference = "public" | "taxi" | "private" | "rental";

export interface SearchInput {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
  budget: number;
  travelType: TravelType;
  hotelPreference: HotelPreference;
  transferPreference: TransferPreference;
}

export interface FlightOption {
  id: string; airline: string; origin: string; destination: string; departureTime: string; arrivalTime: string; durationMinutes: number; stops: number; baggageIncluded: boolean; refundable: boolean; price: number; comfortScore: number;
}
export interface HotelOption {
  id: string; name: string; stars: number; rating: number; location: string; distanceFromCenterKm: number; amenities: string[]; cancellationPolicy: string; breakfastIncluded: boolean; pricePerNight: number; totalPrice: number; familyFriendly: boolean;
}
export interface TransferOption {
  id: string; type: TransferPreference; name: string; price: number; durationMinutes: number; comfortScore: number; availability: string; luggageSuitability: string;
}
export interface CostBreakdown {
  flightTotal: number; hotelTotal: number; transferTotal: number; insurance: number; food: number; localTransport: number; visaFee: number; serviceFee: number; finalTotal: number; perPerson: number; budgetDifference: number;
}
export interface TravelPackage {
  id: string; label: string; flight: FlightOption; hotel: HotelOption; transfer: TransferOption; cost: CostBreakdown; pros: string[]; cons: string[]; score: number; badge: string;
}
export interface SearchResult {
  input: SearchInput; flights: FlightOption[]; hotels: HotelOption[]; transfers: TransferOption[]; packages: TravelPackage[]; aiRecommendation: string; riskNotes: string[]; weatherSummary: string; visaInfo: string;
}
