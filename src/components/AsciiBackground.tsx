import { useRef, useEffect } from 'react';

import '../styles/AsciiBackground.css';

type Density = 'sparse' | 'medium' | 'dense';

interface AsciiBackgroundProps {
  density?: Density;
  speed?: number;
}

const MONO_FONT = '"Courier New", monospace';

const CHARS = ['·', '°', '~', '~', '≈', '+', '*', '×'] as const;
const THRESHOLDS = [0.42, 0.5, 0.57, 0.63, 0.7, 0.77, 0.84, 0.9] as const;

const CELL_BY_DENSITY: Record<Density, number> = {
  sparse: 46,
  medium: 30,
  dense: 20,
};

function readAsciiRgb(root: HTMLElement): string {
  const value = getComputedStyle(root).getPropertyValue('--ascii-rgb').trim();
  return value || '215, 215, 215';
}

function AsciiBackground({ density = 'medium', speed = 1 }: AsciiBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const cell = CELL_BY_DENSITY[density];

    const mouse = { x: -9999, y: -9999 };
    let t = 0;
    let scroll = 0;
    let scrollVel = 0;
    let lastScroll = 0;
    let raf = 0;

    let asciiRgb = readAsciiRgb(root);
    const themeObserver = new MutationObserver(() => {
      asciiRgb = readAsciiRgb(root);
      if (prefersReducedMotion) draw();
    });
    themeObserver.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (prefersReducedMotion) draw();
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const scrollOff = scroll * 0.004;
      const sVel = scrollVel;

      ctx.clearRect(0, 0, w, h);

      const fontSize = Math.max(10, Math.round(cell * 0.48));
      ctx.font = `${fontSize}px ${MONO_FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const cols = Math.ceil(w / cell) + 2;
      const rows = Math.ceil(h / cell) + 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cell;
          const y = r * cell;

          const wave =
            Math.sin(c * 0.18 + t * 0.9 + scrollOff) * (0.45 + sVel * 0.3) +
            Math.sin(c * 0.09 - r * 0.14 + t * 0.55 + scrollOff * 0.6) *
              (0.3 + sVel * 0.2) +
            Math.sin(r * 0.22 - t * 0.35 + scrollOff * 0.3) * 0.25;

          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.hypot(dx, dy);
          const fade = Math.max(0, 1 - dist / 290);
          const ripple = Math.sin(dist * 0.025 - t * 8) * fade * 0.55;

          const val = Math.max(0, Math.min(1, (wave + ripple + 1) * 0.5));

          let char: string | null = null;
          for (let i = 0; i < THRESHOLDS.length; i++) {
            if (val >= THRESHOLDS[i]) char = CHARS[i];
          }
          if (!char) continue;

          const alpha = Math.min(
            0.55,
            0.06 + ((val - THRESHOLDS[0]) / (1 - THRESHOLDS[0])) * 0.45,
          );
          ctx.fillStyle = `rgba(${asciiRgb}, ${alpha.toFixed(3)})`;
          ctx.fillText(char, x, y);
        }
      }
    };

    const frame = () => {
      scrollVel *= 0.88;
      t += 0.007 * speed;
      draw();
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onScroll = () => {
      const s = window.scrollY;
      scrollVel = Math.min(1, Math.abs(s - lastScroll) * 0.025);
      lastScroll = s;
      scroll = s;
    };

    window.addEventListener('resize', resize);
    resize();

    if (prefersReducedMotion) {
      draw();
    } else {
      window.addEventListener('mousemove', onMove);
      document.addEventListener('mouseleave', onLeave);
      window.addEventListener('scroll', onScroll, { passive: true });
      frame();
    }

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, [density, speed]);

  return (
    <div className="ascii-background" aria-hidden="true">
      <canvas ref={canvasRef} className="ascii-background__canvas" />
    </div>
  );
}

export default AsciiBackground;
