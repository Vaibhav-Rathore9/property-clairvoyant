import { createFileRoute, Link } from "@tanstack/react-router";
import propertyHero from "@/assets/property-hero.jpg";
import { ArrowRight, Bath, Bed, MapPin, Maximize2, Sparkles, TrendingUp, TreePine, GraduationCap, ShieldCheck, Volume2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rental Pricing Dashboard — Pricepoint" },
      { name: "description", content: "AI-recommended rent with confidence score, price range, and neighborhood signals." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-10">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Property #PR-2840</div>
          <h1 className="mt-2 font-display text-5xl leading-none">
            <span className="italic">412 Sterling Pl,</span> Apt 3R
          </h1>
          <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> Prospect Heights, Brooklyn · 11238
          </div>
        </div>
        <div className="flex gap-2">
          <button className="rounded-full border border-border px-4 py-2 text-sm hover:bg-muted">Export</button>
          <Link to="/comparables" className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm text-background hover:opacity-90">
            View comparables <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* Hero image + property facts */}
        <section className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <img src={propertyHero} alt="412 Sterling Pl exterior" width={1280} height={896} className="h-[420px] w-full object-cover" />
            <div className="grid grid-cols-4 divide-x divide-border border-t border-border">
              {[
                { Icon: Bed, label: "Bedrooms", v: "2" },
                { Icon: Bath, label: "Baths", v: "1" },
                { Icon: Maximize2, label: "Sq ft", v: "880" },
                { Icon: TrendingUp, label: "Floor", v: "3 / 4" },
              ].map(({ Icon, label, v }) => (
                <div key={label} className="px-5 py-4">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <div className="mt-2 font-display text-2xl">{v}</div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Neighborhood */}
          <div className="mt-6 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl">Neighborhood signals</h2>
              <span className="text-xs text-muted-foreground">Pulled from 6 data sources</span>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                { Icon: GraduationCap, label: "School quality", v: 8.4, note: "Top-rated PS 9 in zone" },
                { Icon: TreePine, label: "Walk + green", v: 9.1, note: "2 min to Prospect Park" },
                { Icon: ShieldCheck, label: "Safety index", v: 7.6, note: "Low overnight incidents" },
                { Icon: Volume2, label: "Quietness", v: 6.2, note: "Moderate traffic on Vanderbilt" },
              ].map(({ Icon, label, v, note }) => (
                <div key={label} className="rounded-xl border border-border bg-background/40 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium"><Icon className="h-4 w-4 text-primary" /> {label}</div>
                    <div className="font-mono text-sm">{v}<span className="text-muted-foreground">/10</span></div>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${v * 10}%` }} />
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">{note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recommendation panel */}
        <aside className="lg:col-span-5">
          <div className="sticky top-24 space-y-6">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-foreground p-7 text-background">
              <div className="absolute inset-0 grain opacity-30" />
              <div className="relative">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-background/60">
                  <Sparkles className="h-3.5 w-3.5 text-accent" /> Recommended monthly rent
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-7xl leading-none">$3,840</span>
                  <span className="text-sm text-background/60">/ mo</span>
                </div>

                {/* Price range bar */}
                <div className="mt-7">
                  <div className="flex justify-between text-[11px] text-background/60">
                    <span>Low $3,520</span>
                    <span>High $4,150</span>
                  </div>
                  <div className="relative mt-2 h-2 rounded-full bg-background/15">
                    <div className="absolute inset-y-0 left-[18%] right-[18%] rounded-full bg-background/40" />
                    <div className="absolute -top-1 h-4 w-1 rounded-full bg-accent" style={{ left: "51%" }} />
                  </div>
                  <div className="mt-3 text-xs text-background/70">Recommendation sits in the 64th percentile of comparable units.</div>
                </div>

                {/* Confidence */}
                <div className="mt-7 rounded-xl border border-background/15 bg-background/5 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs uppercase tracking-wider text-background/60">Confidence score</div>
                    <div className="font-mono text-sm">High · 92%</div>
                  </div>
                  <div className="mt-3 grid grid-cols-12 gap-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className={`h-1.5 rounded-full ${i < 11 ? "bg-accent" : "bg-background/20"}`} />
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-background/60">Based on 24 close comps, 18 mo of history, and stable neighborhood signals.</div>
                </div>
              </div>
            </div>

            {/* Why this price */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-xl">Why this price</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  ["+ $220", "Renovated kitchen and in-unit laundry"],
                  ["+ $140", "Park-adjacent, top school zone"],
                  ["− $90", "No outdoor space"],
                  ["− $70", "Walk-up, 3rd floor"],
                ].map(([d, t]) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className={`mt-0.5 inline-block w-14 shrink-0 rounded-md px-2 py-0.5 text-center font-mono text-xs ${d.startsWith("+") ? "bg-success/15 text-success" : "bg-destructive/10 text-destructive"}`}>{d}</span>
                    <span className="text-muted-foreground">{t}</span>
                  </li>
                ))}
              </ul>
              <Link to="/assistant" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                Ask the assistant <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
