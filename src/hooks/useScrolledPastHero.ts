import { useEffect, useState } from 'react';

// Separate thresholds so scrolling around the hero edge cannot flicker the bar.
const SHOW_AT = 0.72;
const HIDE_AT = 0.55;

export function useScrolledPastHero() {
  const [hasPassed, setHasPassed] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const progress = window.scrollY / window.innerHeight;
      setHasPassed((passed) => (passed ? progress > HIDE_AT : progress > SHOW_AT));
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return hasPassed;
}
