import { Clock, Hotel, Plane, ShieldCheck, Sparkles } from "lucide-react";
import { money, minutes } from "@/lib/format";
import type { TravelPackage } from "@/lib/types";

export function PackageCard({ travelPackage }: { travelPackage: TravelPackage }) {
  return <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-premium">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><span className="rounded-full bg-skysoft px-3 py-1 text-xs font-bold uppercase text-ocean">{travelPackage.badge}</span><h3 className="mt-3 text-2xl font-bold text-navy">{travelPackage.label}</h3></div><div className="text-right"><p className="text-3xl font-black text-navy">{money(travelPackage.cost.finalTotal)}</p><p className="text-sm text-slate-500">{money(travelPackage.cost.perPerson)} per person</p></div></div>
    <div className="mt-5 grid gap-3 text-sm text-slate-700 md:grid-cols-3">
      <p className="flex gap-2"><Plane className="text-ocean" size={18}/>{travelPackage.flight.airline} · {minutes(travelPackage.flight.durationMinutes)} · {travelPackage.flight.stops} stops</p>
      <p className="flex gap-2"><Hotel className="text-ocean" size={18}/>{travelPackage.hotel.name} · {travelPackage.hotel.stars}★ · {travelPackage.hotel.rating}</p>
      <p className="flex gap-2"><Clock className="text-ocean" size={18}/>{travelPackage.transfer.name} · {minutes(travelPackage.transfer.durationMinutes)}</p>
    </div>
    <div className="mt-5 grid gap-4 md:grid-cols-2"><div><p className="font-semibold text-emerald-700">Pros</p><ul className="mt-2 space-y-1 text-sm text-slate-600">{travelPackage.pros.map(p=><li key={p}>• {p}</li>)}</ul></div><div><p className="font-semibold text-amber-700">Watch-outs</p><ul className="mt-2 space-y-1 text-sm text-slate-600">{travelPackage.cons.map(c=><li key={c}>• {c}</li>)}</ul></div></div>
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5"><p className="flex items-center gap-2 font-bold text-navy"><Sparkles className="text-gold"/>AI score {travelPackage.score}/100</p><button className="rounded-full bg-navy px-5 py-2 text-sm font-bold text-white">Save trip</button></div>
    <p className="mt-3 flex gap-2 text-xs text-slate-500"><ShieldCheck size={16}/>Estimated mock package. Live affiliate availability and final provider prices will be verified before checkout.</p>
  </article>;
}
