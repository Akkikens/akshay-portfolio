import React from "react";

/**
 * Accessible WAI-ARIA tabs behavior, shared by every tab UI on the site
 * (Experience companies, Certifications, Projects) so all three speak the
 * same a11y dialect.
 *
 * Implements the full tabs pattern the roles promise:
 *   - roving tabindex (only the selected tab is in the page tab sequence)
 *   - Arrow / Home / End keyboard navigation with selection-follows-focus
 *   - generated tab/panel ids wired via aria-controls / aria-labelledby
 *   - tabpanel is focusable (tabIndex 0)
 *   - aria-orientation tracks the responsive layout (lists that switch to a
 *     vertical column at the Tailwind `md` breakpoint report it correctly)
 *
 * Hydration-safe: orientation defaults to "horizontal" during SSR and is
 * reconciled from matchMedia in an effect after mount.
 */

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export type UseTabListOptions = {
  /** Stable, ordered ids (or labels) of the tabs. */
  ids: readonly string[];
  /** Currently selected tab id. */
  activeId: string;
  /** Selection setter — called on click and on keyboard navigation. */
  onChange: (id: string) => void;
  /** Prefix for generated DOM ids, e.g. "experience" → experience-tab-…. */
  idPrefix: string;
  /**
   * True when the tab list renders as a vertical column from the Tailwind
   * `md` breakpoint up (horizontal scroller below it).
   */
  verticalFromMd?: boolean;
};

export function useTabList({
  ids,
  activeId,
  onChange,
  idPrefix,
  verticalFromMd = false,
}: UseTabListOptions) {
  const tabRefs = React.useRef(new Map<string, HTMLButtonElement>());
  const isMdUp = useMediaQuery("(min-width: 768px)");
  const orientation: "horizontal" | "vertical" =
    verticalFromMd && isMdUp ? "vertical" : "horizontal";

  const tabDomId = (id: string) => `${idPrefix}-tab-${slug(id)}`;
  const panelDomId = (id: string) => `${idPrefix}-panel-${slug(id)}`;

  const selectAndFocus = (id: string) => {
    onChange(id);
    tabRefs.current.get(id)?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const currentIndex = ids.indexOf(activeId);
    if (currentIndex === -1 || ids.length === 0) return;

    let nextIndex: number;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (currentIndex + 1) % ids.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (currentIndex - 1 + ids.length) % ids.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = ids.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    selectAndFocus(ids[nextIndex]);
  };

  return {
    /** Spread on the element wrapping the tab buttons. */
    tabListProps: {
      role: "tablist" as const,
      "aria-orientation": orientation,
      onKeyDown,
    },
    /** Spread on each tab <button>. */
    getTabProps: (id: string) => ({
      role: "tab" as const,
      id: tabDomId(id),
      "aria-selected": id === activeId,
      "aria-controls": panelDomId(id),
      tabIndex: id === activeId ? 0 : -1,
      onClick: () => onChange(id),
      ref: (el: HTMLButtonElement | null) => {
        if (el) tabRefs.current.set(id, el);
        else tabRefs.current.delete(id);
      },
    }),
    /** Spread on the panel showing the active tab's content. */
    panelProps: {
      role: "tabpanel" as const,
      id: panelDomId(activeId),
      "aria-labelledby": tabDomId(activeId),
      tabIndex: 0,
    },
  };
}

export type TabListApi = ReturnType<typeof useTabList>;
