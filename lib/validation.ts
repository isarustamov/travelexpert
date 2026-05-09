import { z } from "zod";

export const searchSchema = z.object({
  origin: z.string().trim().min(2).max(80),
  destination: z.string().trim().min(2).max(80),
  departureDate: z.string().min(8),
  returnDate: z.string().min(8),
  passengers: z.coerce.number().int().min(1).max(9),
  budget: z.coerce.number().min(100).max(100000),
  travelType: z.enum(["cheap", "balanced", "premium", "family", "business", "romantic", "student"]),
  hotelPreference: z.enum(["budget", "3-star", "4-star", "5-star", "apartment"]),
  transferPreference: z.enum(["public", "taxi", "private", "rental"]),
});
