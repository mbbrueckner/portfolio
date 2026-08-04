import { useCallback, useEffect, useRef, useState } from 'react';

// Expanding a card resizes the list, so a freshly activated item can be pushed
// past the viewport center right after it wins. The lock gives the layout time
// to settle, the margin keeps a near-tie from flipping the selection.
const SETTLE_MS = 520;
const SWITCH_MARGIN_PX = 56;

// Tracks which `[data-scroll-id]` element inside the container sits closest to
// the vertical center of the viewport. Clicking pins an id so it stays open
// while being read; the pin is dropped once its row is scrolled out of view.
export function useActiveOnScroll<T extends HTMLElement>(
  defaultId: string | null,
) {
  const containerRef = useRef<T>(null);
  const [activeId, setActiveId] = useState<string | null>(defaultId);
  const [pinnedId, setPinnedId] = useState<string | null>(null);

  const activeRef = useRef<string | null>(defaultId);
  const pinnedRef = useRef<string | null>(null);
  const settleUntilRef = useRef(0);

  const activate = useCallback((id: string | null) => {
    activeRef.current = id;
    setActiveId(id);
  }, []);

  const togglePinned = useCallback(
    (id: string) => {
      const next = pinnedRef.current === id ? null : id;
      pinnedRef.current = next;
      setPinnedId(next);
      settleUntilRef.current = performance.now() + SETTLE_MS;
      if (next) activate(next);
    },
    [activate],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame = 0;

    const releasePinIfScrolledAway = () => {
      const pinned = pinnedRef.current;
      if (!pinned) return;

      const row = container.querySelector<HTMLElement>(
        `[data-scroll-id="${pinned}"]`,
      );
      if (row) {
        const box = row.getBoundingClientRect();
        const isOffScreen = box.bottom < 0 || box.top > window.innerHeight;
        if (!isOffScreen) return;
      }

      pinnedRef.current = null;
      setPinnedId(null);
    };

    const measure = () => {
      frame = 0;
      releasePinIfScrolledAway();
      if (pinnedRef.current) return;
      if (performance.now() < settleUntilRef.current) return;

      const rows = Array.from(
        container.querySelectorAll<HTMLElement>('[data-scroll-id]'),
      );
      if (rows.length === 0) return;

      const center = window.innerHeight / 2;
      let bestId: string | null = null;
      let bestDistance = Number.POSITIVE_INFINITY;
      let activeDistance = Number.POSITIVE_INFINITY;

      for (const row of rows) {
        const id = row.dataset.scrollId;
        if (!id) continue;
        const box = row.getBoundingClientRect();
        const distance = Math.abs(box.top + box.height / 2 - center);
        if (id === activeRef.current) activeDistance = distance;
        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = id;
        }
      }

      if (!bestId || bestId === activeRef.current) return;
      if (bestDistance > activeDistance - SWITCH_MARGIN_PX) return;

      settleUntilRef.current = performance.now() + SETTLE_MS;
      activate(bestId);
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [activate]);

  return { containerRef, activeId, pinnedId, togglePinned };
}
