"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { HotelPreference, TransferPreference, TravelType } from "@/lib/types";

export function SearchForm({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [form, setForm] = useState({ origin: "Baku", destination: "Istanbul", departureDate: "2026-06-15", returnDate: "2026-06-21", passengers: 2, budget: 1800, travelType: "balanced" as TravelType, hotelPreference: "4-star" as HotelPreference, transferPreference: "taxi" as TransferPreference });
  const update = (key: string, value: string | number) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: React.FormEvent) => { event.preventDefault(); router.push(`/search?${new URLSearchParams(Object.entries(form).map(([k,v]) => [k, String(v)])).toString()}`); };
  const inputClass = "focus-ring rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm";
  return <form onSubmit={submit} className={`glass-card grid gap-3 rounded-[2rem] p-4 ${compact ? "lg:grid-cols-6" : "lg:grid-cols-4"}`}>
    <input className={inputClass} value={form.origin} onChange={(e)=>update("origin", e.target.value)} placeholder="Departure city" />
    <input className={inputClass} value={form.destination} onChange={(e)=>update("destination", e.target.value)} placeholder="Destination" />
    <input className={inputClass} type="date" value={form.departureDate} onChange={(e)=>update("departureDate", e.target.value)} />
    <input className={inputClass} type="date" value={form.returnDate} onChange={(e)=>update("returnDate", e.target.value)} />
    <input className={inputClass} type="number" min={1} max={9} value={form.passengers} onChange={(e)=>update("passengers", Number(e.target.value))} />
    <input className={inputClass} type="number" min={100} value={form.budget} onChange={(e)=>update("budget", Number(e.target.value))} placeholder="Budget" />
    <select className={inputClass} value={form.travelType} onChange={(e)=>update("travelType", e.target.value)}>{["cheap","balanced","premium","family","business","romantic","student"].map(x=><option key={x}>{x}</option>)}</select>
    <select className={inputClass} value={form.hotelPreference} onChange={(e)=>update("hotelPreference", e.target.value)}>{["budget","3-star","4-star","5-star","apartment"].map(x=><option key={x}>{x}</option>)}</select>
    <select className={inputClass} value={form.transferPreference} onChange={(e)=>update("transferPreference", e.target.value)}>{["public","taxi","private","rental"].map(x=><option key={x}>{x}</option>)}</select>
    <button className="rounded-2xl bg-ocean px-6 py-3 font-bold text-white shadow-lg shadow-ocean/25 lg:col-span-1">Compare trip</button>
  </form>;
}
