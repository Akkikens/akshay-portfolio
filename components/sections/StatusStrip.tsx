import { status } from "@/lib/content";

/**
 * Thin instrument strip pinned under the hero: a static mono key/value
 * readout of current status. Horizontally scrollable on overflow — no
 * marquee, no auto-scroll, per spec §5.4.
 */
export default function StatusStrip() {
  return (
    <div className="border-y border-line bg-void">
      <dl
        aria-label="Current status"
        className="mx-auto flex max-w-6xl items-stretch overflow-x-auto px-6 md:px-10"
      >
        {status.map((item, i) => (
          <div
            key={item.key}
            className={`flex shrink-0 items-baseline gap-2 whitespace-nowrap py-4 pr-8 ${
              i === 0 ? "" : "border-l border-line pl-8"
            }`}
          >
            <dt className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-signal">
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
