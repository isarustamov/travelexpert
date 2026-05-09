import Link from "next/link";
import { PlaneTakeoff } from "lucide-react";

const links = [
  ["Search", "/search"], ["Planner", "/planner"], ["Destinations", "/destinations/istanbul"], ["Blog", "/blog"], ["Pricing", "/pricing"], ["Admin", "/admin"],
];

export function Navbar() {
  return <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <Link href="/" className="flex items-center gap-2 font-bold text-navy"><span className="rounded-2xl bg-navy p-2 text-white"><PlaneTakeoff size={20}/></span>TravelExpert AI</Link>
      <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">{links.map(([label, href]) => <Link key={href} href={href} className="hover:text-ocean">{label}</Link>)}</nav>
      <Link href="/login" className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-navy/20">Sign in</Link>
    </div>
  </header>;
}
