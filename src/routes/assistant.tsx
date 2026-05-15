import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUp, Sparkles, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant — Pricepoint" },
      { name: "description", content: "Ask the pricing copilot why a recommendation is what it is." },
    ],
  }),
  component: Assistant,
});

function Assistant() {
  return (
    <div className="mx-auto max-w-[1100px] px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Step 03</div>
          <h1 className="mt-2 font-display text-5xl leading-none"><span className="italic">Ask</span> the copilot</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Natural language queries about the recommendation, comparables, or neighborhood signals.
          </p>
        </div>
        <Link to="/updated" className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm text-background hover:opacity-90">
          See update <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
        {/* Conversation */}
        <div className="space-y-6 px-6 py-8">
          {/* User */}
          <div className="flex justify-end">
            <div className="max-w-[78%] rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-primary-foreground">
              <p className="text-sm leading-relaxed">Why is 412 Sterling priced higher than the average comp on the block?</p>
            </div>
          </div>

          {/* Assistant */}
          <div className="flex gap-3">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex-1 space-y-3">
              <p className="text-sm leading-relaxed">
                Good question. The recommendation of <span className="font-medium">$3,840/mo</span> sits about <span className="font-medium">$110 above</span> the local median because three signals push it up:
              </p>

              <div className="rounded-xl border border-border bg-background/40 p-4">
                <ol className="space-y-3 text-sm">
                  {[
                    ["1", "Renovated kitchen + in-unit laundry", "+ $220 vs comps without these features. Strongest single driver."],
                    ["2", "Top school zone (PS 9, rated 8.4)", "+ $140 — units inside this zone rent ~4% above adjacent blocks."],
                    ["3", "Park adjacency (2 min to Prospect Park)", "+ $90 — historical premium across 18 months of leases."],
                  ].map(([n, h, b]) => (
                    <li key={n} className="flex gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-foreground font-mono text-[11px] text-background">{n}</span>
                      <div>
                        <div className="font-medium">{h}</div>
                        <div className="text-xs text-muted-foreground">{b}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Two factors pull it back down: no outdoor space (− $90) and a 3rd-floor walk-up (− $70). Net result: above-average for the block but firmly inside the 0.6 mi comp range.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {["Show comps without renovations", "Why so confident?", "Adjust for walk-up"].map((s) => (
                  <button key={s} className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground hover:border-foreground/30 hover:text-foreground">
                    <Lightbulb className="h-3 w-3" /> {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Follow-up user */}
          <div className="flex justify-end">
            <div className="max-w-[78%] rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-primary-foreground">
              <p className="text-sm">Remove the highway-facing comps and recalculate.</p>
            </div>
          </div>

          {/* Assistant typing */}
          <div className="flex gap-3">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1.5 rounded-2xl bg-muted px-4 py-3">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/60 [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/60 [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/60" />
            </div>
          </div>
        </div>

        {/* Composer */}
        <div className="border-t border-border bg-background/40 p-3">
          <div className="flex items-end gap-2 rounded-xl border border-border bg-card p-2 pl-4">
            <input
              placeholder="Ask anything about this recommendation…"
              className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button className="grid h-9 w-9 place-items-center rounded-lg bg-foreground text-background hover:opacity-90">
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-2 px-1 text-[11px] text-muted-foreground">
            The assistant can reference property data, comps, and neighborhood signals.
          </div>
        </div>
      </div>
    </div>
  );
}
