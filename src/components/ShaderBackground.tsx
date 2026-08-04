import { useRef, useEffect } from 'react';

import '../styles/ShaderBackground.css';

interface ShaderBackgroundProps {
  speed?: number;
}

const VERTEX_SHADER = `#version 300 es
void main() {
  vec2 corner = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(corner * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;
uniform vec3 uBackground;
uniform vec3 uAccent;
uniform vec3 uAccentAlt;
uniform float uIntensity;
uniform float uCoreBoost;

out vec4 fragColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 cell = floor(p);
  vec2 f = fract(p);
  vec2 w = f * f * (3.0 - 2.0 * f);
  float a = hash(cell);
  float b = hash(cell + vec2(1.0, 0.0));
  float c = hash(cell + vec2(0.0, 1.0));
  float d = hash(cell + vec2(1.0, 1.0));
  return mix(mix(a, b, w.x), mix(c, d, w.x), w.y);
}

float swirl(vec2 p) {
  return noise(p) * 0.68 + noise(p * 2.1 + 3.7) * 0.32;
}

// x: accumulated field, y: field weighted by each blob's tint
vec2 blobs(vec2 p, float t) {
  vec2 sum = vec2(0.0);
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    float phase = fi * 2.399;
    vec2 center = vec2(
      sin(t * (0.13 + fi * 0.021) + phase) * 0.86,
      cos(t * (0.11 + fi * 0.017) + phase * 1.37) * 0.54
    );
    float radius = 0.7 + 0.13 * sin(t * (0.07 + fi * 0.013) + phase);
    vec2 d = (p - center) / radius;
    float weight = exp(-dot(d, d) * 2.2);
    float tint = 0.5 + 0.5 * sin(t * 0.045 + fi * 2.1);
    sum += vec2(weight, weight * tint);
  }
  return sum;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  uv *= 1.12;
  uv += uMouse * 0.12;
  uv.y += uScroll * 0.7;

  float t = uTime;
  float tw = t * 0.075;

  vec2 warp = vec2(
    swirl(uv * 0.8 + vec2(0.0, tw)),
    swirl(uv * 0.8 + vec2(5.2, -tw * 0.85))
  );
  vec2 p = uv + (warp - 0.5) * 0.5;

  vec2 blob = blobs(p, t);
  float field = blob.x;

  const float level = 0.62;
  float aa = max(fwidth(field) * 1.2, 0.001);

  float shape = smoothstep(level - aa, level + aa, field);
  float glow = smoothstep(level - 0.5, level, field);
  float depth = smoothstep(level, level + 0.85, field);
  float rim = shape - smoothstep(level + 0.09, level + 0.24, field);

  float blend = clamp(blob.y / max(field, 0.0001), 0.0, 1.0);
  vec3 accent = mix(uAccent, uAccentAlt, blend);
  vec3 core = clamp(accent * uCoreBoost, 0.0, 1.0);

  vec3 color = uBackground;
  color = mix(color, accent, glow * 0.22 * uIntensity);
  color = mix(color, accent, shape * uIntensity);
  color = mix(color, core, shape * depth * 0.5 * uIntensity);
  color = mix(color, core, rim * 0.2 * uIntensity);

  float falloff = mix(0.7, 1.0, smoothstep(1.55, 0.2, length(uv)));
  color = mix(uBackground, color, falloff);

  float dither = (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) / 255.0;

  fragColor = vec4(color + dither, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGL2RenderingContext) {
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vertex || !fragment) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function readChannels(root: HTMLElement, name: string, fallback: number[]) {
  const raw = getComputedStyle(root).getPropertyValue(name).trim();
  const parts = raw.split(',').map((part) => Number.parseFloat(part));
  if (parts.length !== 3 || parts.some(Number.isNaN)) return fallback;
  return parts.map((channel) => channel / 255);
}

function readNumber(root: HTMLElement, name: string, fallback: number) {
  const value = Number.parseFloat(
    getComputedStyle(root).getPropertyValue(name),
  );
  return Number.isNaN(value) ? fallback : value;
}

function ShaderBackground({ speed = 1 }: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const markFallback = () => {
      rootRef.current?.setAttribute('data-fallback', 'true');
    };

    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    });
    if (!gl) {
      markFallback();
      return;
    }

    const program = createProgram(gl);
    if (!program) {
      markFallback();
      return;
    }
    rootRef.current?.removeAttribute('data-fallback');

    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const uniforms = {
      resolution: gl.getUniformLocation(program, 'uResolution'),
      time: gl.getUniformLocation(program, 'uTime'),
      mouse: gl.getUniformLocation(program, 'uMouse'),
      scroll: gl.getUniformLocation(program, 'uScroll'),
      background: gl.getUniformLocation(program, 'uBackground'),
      accent: gl.getUniformLocation(program, 'uAccent'),
      accentAlt: gl.getUniformLocation(program, 'uAccentAlt'),
      intensity: gl.getUniformLocation(program, 'uIntensity'),
      coreBoost: gl.getUniformLocation(program, 'uCoreBoost'),
    };

    let background = readChannels(root, '--bg-rgb', [0.04, 0.04, 0.04]);
    let accent = readChannels(root, '--shader-accent-rgb', [0.25, 0.42, 0.5]);
    let accentAlt = readChannels(root, '--shader-accent-alt-rgb', [0.45, 0.28, 0.48]);
    let intensity = readNumber(root, '--shader-intensity', 0.55);
    let coreBoost = readNumber(root, '--shader-core-boost', 1.35);

    const mouse = { x: 0, y: 0 };
    const smoothMouse = { x: 0, y: 0 };
    let scrollTarget = 0;
    let smoothScroll = 0;
    let elapsed = 0;
    let last = performance.now();
    let raf = 0;

    const draw = () => {
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.time, elapsed);
      gl.uniform2f(uniforms.mouse, smoothMouse.x, smoothMouse.y);
      gl.uniform1f(uniforms.scroll, smoothScroll);
      gl.uniform3f(
        uniforms.background,
        background[0],
        background[1],
        background[2],
      );
      gl.uniform3f(uniforms.accent, accent[0], accent[1], accent[2]);
      gl.uniform3f(
        uniforms.accentAlt,
        accentAlt[0],
        accentAlt[1],
        accentAlt[2],
      );
      gl.uniform1f(uniforms.intensity, intensity);
      gl.uniform1f(uniforms.coreBoost, coreBoost);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.round(window.innerWidth * dpr);
      const height = Math.round(window.innerHeight * dpr);
      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      if (prefersReducedMotion) draw();
    };

    const frame = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      elapsed += delta * speed;

      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.015;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.015;
      smoothScroll += (scrollTarget - smoothScroll) * 0.04;

      draw();
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf || prefersReducedMotion) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = 1 - (event.clientY / window.innerHeight) * 2;
    };

    const onScroll = () => {
      const range = document.body.scrollHeight - window.innerHeight;
      scrollTarget = range > 0 ? window.scrollY / range : 0;
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const onContextLost = (event: Event) => {
      event.preventDefault();
      stop();
    };

    const themeObserver = new MutationObserver(() => {
      background = readChannels(root, '--bg-rgb', background);
      accent = readChannels(root, '--shader-accent-rgb', accent);
      accentAlt = readChannels(root, '--shader-accent-alt-rgb', accentAlt);
      intensity = readNumber(root, '--shader-intensity', intensity);
      coreBoost = readNumber(root, '--shader-core-boost', coreBoost);
      if (prefersReducedMotion) draw();
    });
    themeObserver.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    gl.useProgram(program);
    resize();
    onScroll();
    smoothScroll = scrollTarget;

    canvas.addEventListener('webglcontextlost', onContextLost);
    window.addEventListener('resize', resize);

    if (prefersReducedMotion) {
      draw();
    } else {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('scroll', onScroll, { passive: true });
      document.addEventListener('visibilitychange', onVisibility);
      start();
    }

    return () => {
      stop();
      themeObserver.disconnect();
      canvas.removeEventListener('webglcontextlost', onContextLost);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteProgram(program);
    };
  }, [speed]);

  return (
    <div className="shader-background" ref={rootRef} aria-hidden="true">
      <canvas ref={canvasRef} className="shader-background__canvas" />
    </div>
  );
}

export default ShaderBackground;
