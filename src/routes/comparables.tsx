import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import comp1 from "@/assets/comp-1.jpg";
import comp2 from "@/assets/comp-2.jpg";
import comp3 from "@/assets/comp-3.jpg";
import mapBg from "@/assets/map-bg.jpg";
import { ArrowRight, Bath, Bed, Maximize2, MapPin, X, Filter } from "lucide-react";

export const Route = createFileRoute("/comparables")({
  head: () => ({
    meta: [
      { title: "Comparable Properties — Pricepoint" },
      { name: "description", content: "Context-aware comparable rental units with similarity scoring and map view." },
    ],
  }),
  component: Comparables,
});

type Comp = {
  id: string;
  img: string;
  address: string;
  rent: number;
  beds: number;
  baths: number;
  sqft: number;
  similarity: number;
  distance: string;
  tag: string;
};

const INITIAL: Comp[] = [
  { id: "c1", img: comp1, address: "338 Vanderbilt Ave · 4B", rent: 3950, beds: 2, baths: 1, sqft: 910, similarity: 96, distance: "0.2 mi", tag: "Renovated · Elevator" },
  { id: "c2", img: comp2, address: "121 St Marks Ave · 2F", rent: 3780, beds: 2, baths: 1, sqft: 860, similarity: 91, distance: "0.3 mi", tag: "Loft · Corner unit" },
  { id: "c3", img: comp3, address: "604 Carlton Ave · 3R", rent: 3690, beds: 2, baths: 1, sqft: 870, similarity: 88, distance: "0.4 mi", tag: "Pre-war · Tree-lined" },
  { id: "c4", img: comp1, address: "188 Lincoln Pl · 5A", rent: 4100, beds: 2, baths: 1.5, sqft: 940, similarity: 84, distance: "0.5 mi", tag: "Doorman · Top floor" },
];

function Comparables() {
  const [comps, setComps] = useState(INITIAL);
  const remove = (id: string) => setComps((c) => c.filter((x) => x.id !== id));

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Step 02</div>
          <h1 className="mt-2 font-display text-5xl leading-none"><span className="italic">Comparable</span> properties</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Ranked by lifestyle similarity — not just distance. Remove any comp that doesn't fit and the recommendation will recalculate.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm hover:bg-muted">
            <Filter className="h-3.5 w-3.5" /> Filters · 3
          </button>
          <Link to="/updated" className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm text-background hover:opacity-90">
            Recalculate <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* Comp list */}
        <section className="lg:col-span-7 space-y-4">
          {comps.map((c) => (
            <article key={c.id} className="group flex gap-4 rounded-2xl border border-border bg-card p-3 transition-colors hover:border-foreground/30">
              <img src={c.img} alt={c.address} width={800} height={640} loading="lazy" className="h-32 w-44 shrink-0 rounded-xl object-cover" />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium">{c.address}</div>
                    <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {c.distance}</span>
                      <span>{c.tag}</span>
                    </div>
                  </div>
                  <button onClick={() => remove(c.id)} className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground opacity-0 transition-opacity hover:border-destructive hover:text-destructive group-hover:opacity-100">
                    <X className="h-3 w-3" /> Remove comp
                  </button>
                </div>

                <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Bed className="h-3 w-3" /> {c.beds}</span>
                    <span className="flex items-center gap-1"><Bath className="h-3 w-3" /> {c.baths}</span>
                    <span className="flex items-center gap-1"><Maximize2 className="h-3 w-3" /> {c.sqft} ft²</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Rented</div>
                      <div className="font-mono text-sm font-medium">${c.rent.toLocaleString()}</div>
                    </div>
                    <SimilarityRing pct={c.similarity} />
                  </div>
                </div>
              </div>
            </article>
          ))}
          {comps.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              All comparables removed. The model needs at least 3 comps to recalculate.
            </div>
          )}
        </section>

        {/* Map */}
        <aside className="lg:col-span-5">
          <div className="sticky top-24 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="relative aspect-square">
              <img src={mapBg} alt="Neighborhood map" width={1024} height={1024} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              {/* Subject pin */}
              <div className="absolute left-[42%] top-[38%] -translate-x-1/2 -translate-y-1/2">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-[10px] font-bold text-background ring-4 ring-background">YOU</div>
              </div>
              {/* Comp pins */}
              {[
                { l: "28%", t: "55%", n: 96 },
                { l: "60%", t: "32%", n: 91 },
                { l: "55%", t: "62%", n: 88 },
                { l: "72%", t: "50%", n: 84 },
              ].slice(0, comps.length).map((p, i) => (
                <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: p.l, top: p.t }}>
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground ring-2 ring-background">{p.n}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-border p-4">
              <div className="text-xs font-medium">Map panel</div>
              <div className="mt-1 text-xs text-muted-foreground">{comps.length} comparables shown · radius 0.6 mi · weighted by lifestyle fit</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SimilarityRing({ pct }: { pct: number }) {
  const r = 18;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid h-12 w-12 place-items-center">
      <svg viewBox="0 0 44 44" className="absolute inset-0 -rotate-90">
        <circle cx="22" cy="22" r={r} stroke="currentColor" className="text-muted" strokeWidth="3" fill="none" />
        <circle cx="22" cy="22" r={r} stroke="currentColor" className="text-primary" strokeWidth="3" fill="none" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} strokeLinecap="round" />
      </svg>
      <span className="font-mono text-[11px] font-semibold">{pct}%</span>
    </div>
  );
}
