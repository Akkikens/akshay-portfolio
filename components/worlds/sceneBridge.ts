/**
 * Same-origin helpers for the ThreeUI landing-page frames when they are reused
 * as scene-only backgrounds (`LandingPageFrame` background presentation).
 *
 * Both packaged pages (kage.html, inner-green-3d.html) run their own
 * requestAnimationFrame loops and read their own `window.scrollY`. The frame's
 * `contentWindow` is reachable (URL frames are sandboxed with
 * allow-same-origin), so the parent page can gate those loops and drive the
 * scroll position without rewriting the byte-exact documents.
 */

export type FrameGate = {
  /** Pause or resume every requestAnimationFrame loop inside the frame. */
  setPaused: (paused: boolean) => void;
  readonly paused: boolean;
};

type GatedWindow = Window & { __portfolioFrameGate?: FrameGate };

/**
 * Wraps the frame window's requestAnimationFrame so that, while paused,
 * callbacks are parked instead of scheduled. On resume every parked callback
 * is handed to the real rAF, so loops that were mid-flight simply continue.
 * The page's own `document.hidden` handling stays untouched.
 */
export function gateFrameAnimation(frame: HTMLIFrameElement): FrameGate | null {
  const win = frame.contentWindow as GatedWindow | null;
  if (!win) return null;
  if (win.__portfolioFrameGate) return win.__portfolioFrameGate;

  const nativeRaf = win.requestAnimationFrame.bind(win);
  const nativeCancel = win.cancelAnimationFrame.bind(win);
  const parked = new Map<number, FrameRequestCallback>();
  let paused = false;
  let nextParkedId = -1;

  win.requestAnimationFrame = (callback: FrameRequestCallback) => {
    if (!paused) return nativeRaf(callback);
    const id = nextParkedId--;
    parked.set(id, callback);
    return id;
  };
  win.cancelAnimationFrame = (id: number) => {
    if (id < 0) {
      parked.delete(id);
      return;
    }
    nativeCancel(id);
  };

  const gate: FrameGate = {
    get paused() {
      return paused;
    },
    setPaused(next: boolean) {
      if (next === paused) return;
      paused = next;
      if (paused) return;
      const resumed = Array.from(parked.values());
      parked.clear();
      resumed.forEach((callback) => nativeRaf(callback));
    },
  };
  win.__portfolioFrameGate = gate;
  return gate;
}

/**
 * Scrolls the frame's own document to `progress` (0..1) of its scrollable
 * height. The background presentation sets `overflow: hidden` on the frame
 * body, which blocks the user's wheel but not programmatic scrolling, so the
 * page's scroll-linked camera (Kage reads `scrollY` every frame and its
 * chapter foregrounds use an IntersectionObserver) follows the parent page.
 */
export function driveFrameScroll(frame: HTMLIFrameElement, progress: number) {
  const win = frame.contentWindow;
  const doc = frame.contentDocument;
  if (!win || !doc?.documentElement || !doc.body) return;
  const max = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight) - win.innerHeight;
  if (!(max > 0)) return;
  const clamped = Math.min(1, Math.max(0, progress));
  win.scrollTo(0, clamped * max);
}

/**
 * Appends (or refreshes) a stylesheet of our own in the frame's head, after
 * ThreeUI's presentation and typography sheets so it wins at equal
 * specificity. The packaged document on disk is never touched.
 */
export function injectFrameStyle(frame: HTMLIFrameElement, id: string, css: string) {
  const doc = frame.contentDocument;
  if (!doc?.head) return;
  let style = doc.getElementById(id) as HTMLStyleElement | null;
  if (!style) {
    style = doc.createElement("style");
    style.id = id;
  }
  if (style.textContent !== css) style.textContent = css;
  // Re-append so it stays last even if ThreeUI re-installs its own sheets.
  doc.head.appendChild(style);
}

/**
 * ThreeUI's background presentation pins `html` and `body` to 100% height
 * with `overflow: hidden`, which turns the body into the clipped box and
 * leaves the window with nothing to scroll (documentElement.scrollHeight
 * collapses to one viewport, so Kage's `measure()` sees no chapters). Letting
 * the body flow to its natural height keeps `overflow: hidden` on the root
 * only: the user still cannot scroll the frame, but `window.scrollTo` works,
 * the window's `scrollY` is real, and the page's own anchors, camera rig and
 * chapter observers behave exactly as they do on the authored page.
 */
export const FRAME_SCROLL_UNLOCK_CSS = `
html[data-threeui-presentation="background"] body {
  height: auto !important;
  min-height: 0 !important;
  overflow: visible !important;
}
`;

export function unlockFrameScroll(frame: HTMLIFrameElement) {
  injectFrameStyle(frame, "portfolio-frame-scroll-unlock", FRAME_SCROLL_UNLOCK_CSS);
  // The page measures its chapter anchors on resize.
  frame.contentWindow?.requestAnimationFrame(() => {
    frame.contentWindow?.dispatchEvent(new Event("resize"));
  });
}
