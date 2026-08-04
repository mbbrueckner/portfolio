import { ease } from './animations';

const DURATION_MS = 1600;
// Matches `scroll-margin-top` on `.section` so the heading clears the pill.
const OFFSET_PX = 96;

export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const start = window.scrollY;
  const limit = document.documentElement.scrollHeight - window.innerHeight;
  const end = Math.max(
    0,
    Math.min(start + target.getBoundingClientRect().top - OFFSET_PX, limit),
  );
  const distance = end - start;
  if (distance === 0) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo(0, end);
    return;
  }

  let frame = 0;
  const startedAt = performance.now();

  const cancel = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('wheel', cancel);
    window.removeEventListener('touchstart', cancel);
    window.removeEventListener('keydown', cancel);
  };

  const step = (now: number) => {
    const progress = Math.min((now - startedAt) / DURATION_MS, 1);
    window.scrollTo(0, start + distance * ease(progress));
    if (progress < 1) {
      frame = requestAnimationFrame(step);
      return;
    }
    cancel();
  };

  window.addEventListener('wheel', cancel, { passive: true });
  window.addEventListener('touchstart', cancel, { passive: true });
  window.addEventListener('keydown', cancel);
  frame = requestAnimationFrame(step);
}
