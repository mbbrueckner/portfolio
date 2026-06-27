import { useEffect, useRef, useState } from 'react';

// Tracks which `[data-scroll-id]` element inside the container is crossing the
// vertical center of the viewport, exposing it as the active id.
export function useActiveOnScroll<T extends HTMLElement>(
  defaultId: string | null,
) {
  const containerRef = useRef<T>(null);
  const [activeId, setActiveId] = useState<string | null>(defaultId);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(
      container.querySelectorAll<HTMLElement>('[data-scroll-id]'),
    );
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            const id = entry.target.dataset.scrollId;
            if (id) setActiveId(id);
          }
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );

    for (const item of items) observer.observe(item);
    return () => observer.disconnect();
  }, []);

  return { containerRef, activeId };
}
