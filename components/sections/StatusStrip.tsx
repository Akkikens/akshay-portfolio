import { status } from "@/lib/content";

/**
 * A glass readout under the hero: current status as small key/value pairs.
 * A grid (1 / 2 / 3 columns) so every readout is visible at every width —
 * no clipped overflow, no marquee.
 */
export default function StatusStrip() {
  return (
    <div className="relative mx-auto max-w-6xl px-6 md:px-10">
      <dl
        aria-label="Current status"
        className="glass-panel grid grid-cols-1 gap-x-8 gap-y-4 px-6 py-5 sm:grid-cols-2 md:px-8 lg:grid-cols-3"
      >
        {status.map((item) => (
          <div key={item.key} className="flex flex-col gap-0.5">
            <dt className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-ink-faint">
              {item.key}
            </dt>
            <dd className="m-0 text-[0.9375rem] font-medium text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
