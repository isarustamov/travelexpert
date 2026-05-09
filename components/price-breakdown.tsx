import { money } from "@/lib/format";
import type { TravelPackage } from "@/lib/types";
export function PriceBreakdown({ travelPackage }: { travelPackage: TravelPackage }) {
  const rows = Object.entries(travelPackage.cost).filter(([k]) => !["finalTotal", "perPerson", "budgetDifference"].includes(k));
  return <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-premium"><h3 className="text-xl font-bold text-navy">Total trip cost</h3><div className="mt-4 space-y-3">{rows.map(([key, value])=><div key={key} className="flex justify-between text-sm"><span className="capitalize text-slate-500">{key.replace(/([A-Z])/g," $1")}</span><span className="font-semibold">{money(Number(value))}</span></div>)}</div><div className="mt-5 border-t pt-4"><div className="flex justify-between text-lg font-black text-navy"><span>Final total</span><span>{money(travelPackage.cost.finalTotal)}</span></div><p className={travelPackage.cost.budgetDifference >= 0 ? "text-emerald-600" : "text-rose-600"}>{travelPackage.cost.budgetDifference >= 0 ? "Under" : "Over"} budget by {money(Math.abs(travelPackage.cost.budgetDifference))}</p></div></div>;
}
