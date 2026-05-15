import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles, TrendingDown, X } from "lucide-react";

export const Route = createFileRoute("/updated")({
  head: () => ({
    meta: [
      { title: "Updated Recommendation — Pricepoint" },
      { name: "description", content: "Recalculated rental price after analyst feedback." },
    ],
  }),
  component: Updated,
});

function Updated() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Step 04</div>
          <h1 className="mt-2 font-display text-5xl leading-none"><span className="italic">Recommendation</span> recalculated</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Updated based on your removed comps and adjustments. The model has logged your feedback to improve future recommendations.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/" className="rounded-full border border-border px-4 py-2 text-sm hover:bg-muted">Back to dashboard</Link>
          <button className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm text-background hover:opacity-90">
            Accept & finalize <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Status banner */}
      <div className="mt-8 flex items-center gap-3 rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-success text-success-foreground">
          <Check className="h-3.5 w-3.5" />
        </span>
        <div>
          <span className="font-medium">Recommendation recalculated</span>
          <span className="ml-2 text-muted-foreground">12 seconds ago · learned from 4 analyst signals</span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Old vs new */}
        <section className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="grid grid-cols-2 divide-x divide-border">
              {/* Old */}
              <div className="p-7">
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Previous</div>
                <div className="mt-3 flex items-baseline gap-2 opacity-60">
                  <span className="font-display text-5xl leading-none line-through decoration-2">$3,840</span>
                  <span className="text-xs text-muted-foreground">/ mo</span>
                </div>
                <div className="mt-5 space-y-1.5 text-xs text-muted-foreground">
                  <div>Range $3,520 — $4,150</div>
                  <div>Confidence 92%</div>
                  <div>24 comps</div>
                </div>
              </div>
              {/* New */}
              <div className="relative bg-foreground p-7 text-background">
                <div className="absolute inset-0 grain opacity-30" />
                <div className="relative">
                  <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-background/60">
                    <Sparkles className="h-3 w-3 text-accent" /> Updated
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-6xl leading-none">$3,720</span>
                    <span className="text-xs text-background/60">/ mo</span>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-xs text-accent">
                    <TrendingDown className="h-3 w-3" /> − $120 vs previous
                  </div>
                  <div className="mt-5 space-y-1.5 text-xs text-background/60">
                    <div>Range $3,440 — $3,980</div>
                    <div>Confidence 94%</div>
                    <div>20 comps · 4 removed</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Delta chart */}
            <div className="border-t border-border p-6">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Adjustment trail</div>
              <div className="mt-4 flex items-end gap-2 h-24">
                {[
                  { v: 80, l: "Start", c: "bg-muted" },
                  { v: 60, l: "− Highway comps", c: "bg-accent" },
                  { v: 50, l: "− Doorman bldgs", c: "bg-accent" },
                  { v: 65, l: "+ Quietness wt.", c: "bg-primary" },
                  { v: 72, l: "Final", c: "bg-foreground" },
                ].map((s) => (
                  <div key={s.l} className="flex flex-1 flex-col items-center gap-2">
                    <div className={`w-full rounded-t-md ${s.c}`} style={{ height: `${s.v}%` }} />
                    <div className="text-[10px] text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Feedback summary */}
        <aside className="lg:col-span-5">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-2xl">Feedback summary</h3>
            <p className="mt-1 text-xs text-muted-foreground">What you taught the model in this session</p>

            <ul className="mt-5 space-y-3 text-sm">
              {[
                { type: "removed", t: "Removed 2 highway-facing comps", n: "Noise weighting increased for this neighborhood" },
                { type: "removed", t: "Removed 2 doorman-building comps", n: "Amenity tier mismatch flagged" },
                { type: "added", t: "Asked about quietness", n: "Quietness signal upweighted by 8%" },
                { type: "added", t: "Confirmed park-adjacency premium", n: "Locked into baseline for Prospect Heights" },
              ].map((s) => (
                <li key={s.t} className="flex gap-3 rounded-xl border border-border bg-background/40 p-3">
                  <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${s.type === "removed" ? "bg-destructive/10 text-destructive" : "bg-success/15 text-success"}`}>
                    {s.type === "removed" ? <X className="h-3 w-3" /> : <Check className="h-3 w-3" />}
                  </span>
                  <div>
                    <div className="font-medium">{s.t}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{s.n}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-xl border border-dashed border-border p-4 text-xs text-muted-foreground">
              Your feedback is anonymized and applied across the Prospect Heights model. Future units in this zone will inherit your quietness and amenity-tier preferences.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
