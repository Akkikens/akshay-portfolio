import { status } from "@/lib/content";

/**
 * Thin instrument strip pinned under the hero: a static mono key/value
 * readout of current status. A hairline grid (1 / 2 / 3 columns) so every
 * readout is visible at every width — no clipped overflow, no marquee.
 */
export default function StatusStrip() {
  return (
    <div className="border-y border-line bg-void">
      <dl
        aria-label="Current status"
        className="mx-auto grid max-w-6xl grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3"
      >
        {status.map((item) => (
          <div
            key={item.key}
            className="flex items-baseline gap-2 bg-void px-4 py-4 md:px-8"
          >
            <dt className="shrink-0 font-mono text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-signal">
              {item.key}
              <span aria-hidden>:</span>
            </dt>
            <dd className="m-0 font-mono text-[0.8125rem] tracking-[0.02em] text-ink-dim">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
