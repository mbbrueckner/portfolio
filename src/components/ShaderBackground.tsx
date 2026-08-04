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
uniform float uIntensity;

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

float fbm(vec2 p) {
  const mat2 turn = mat2(0.8, 0.6, -0.6, 0.8);
  float sum = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    sum += amplitude * noise(p);
    p = turn * p * 2.02;
    amplitude *= 0.5;
  }
  return sum;
}

float blobs(vec2 p, float t) {
  float sum = 0.0;
  for (int i = 0; i < 5; i++) {
    float fi = float(i);
    float phase = fi * 2.399;
    vec2 center = vec2(
      sin(t * (0.13 + fi * 0.021) + phase) * 0.95,
      cos(t * (0.11 + fi * 0.017) + phase * 1.37) * 0.62
    );
    float radius = 0.46 + 0.16 * sin(t * (0.07 + fi * 0.013) + phase);
    vec2 d = (p - center) / radius;
    sum += exp(-dot(d, d) * 1.5);
  }
  return sum;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  uv *= 1.35;
  uv += uMouse * 0.12;
  uv.y += uScroll * 0.7;

  float t = uTime;
  float tw = t * 0.075;

  vec2 warp = vec2(
    fbm(uv * 1.7 + vec2(0.0, tw)),
    fbm(uv * 1.7 + vec2(5.2, -tw * 0.8))
  );
  vec2 p = uv + (warp - 0.5) * 0.75;

  float field = blobs(p, t);
  float halo = smoothstep(0.12, 0.9, field);
  float core = smoothstep(0.6, 1.7, field);
  float grain = fbm(p * 2.4 + vec2(tw * 1.6, -tw * 1.1));

  float mask = clamp(halo * 0.8 + core * 0.5, 0.0, 1.0);
  mask *= 0.72 + 0.56 * grain;
  mask *= mix(0.55, 1.0, smoothstep(1.7, 0.25, length(uv)));

  vec3 color = mix(uBackground, uAccent, clamp(mask * uIntensity, 0.0, 1.0));
  color = mix(color, clamp(uAccent * 1.3, 0.0, 1.0), core * 0.28 * uIntensity);

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
      intensity: gl.getUniformLocation(program, 'uIntensity'),
    };

    let background = readChannels(root, '--bg-rgb', [0.04, 0.04, 0.04]);
    let accent = readChannels(root, '--shader-accent-rgb', [0.25, 0.42, 0.5]);
    let intensity = readNumber(root, '--shader-intensity', 0.55);

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
      gl.uniform1f(uniforms.intensity, intensity);
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
      intensity = readNumber(root, '--shader-intensity', intensity);
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
