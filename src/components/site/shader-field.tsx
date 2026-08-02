"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * ShaderField — a dependency-free WebGL ambient light field for the hero.
 *
 * A single fullscreen quad runs a fragment shader that layers a few very soft,
 * slowly drifting blobs of brand-blue, warm amber and faint cyan over a
 * transparent base. fbm (3 octaves of 2D simplex noise) animated by u_time
 * gives a gentle, dreamy "soft northern-light over warm paper" flow. The canvas
 * uses a premultiplied-alpha context so it composites cleanly over the cream
 * stage behind it.
 *
 * Hardened for production: DPR-capped, ResizeObserver-sized, paused when
 * offscreen (IntersectionObserver) or when the tab is hidden, fully cleaned up
 * on unmount, and resilient to WebGL context loss. Honors prefers-reduced-motion
 * by drawing a single static frame and never starting the rAF loop. Every
 * browser global is guarded so SSR cannot crash.
 */

const VERT_SRC = /* glsl */ `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG_SRC = /* glsl */ `
precision highp float;

uniform vec2  u_resolution;
uniform float u_time;
uniform vec2  u_mouse;      // smoothed, range roughly -1..1
uniform float u_intensity;  // overall strength multiplier
uniform float u_ink;        // 0..1 ink-bleed progress (0 = ambient only)
uniform vec2  u_inkOrigin;  // bleed origin, same centred/aspect UV space as uv

// ---- 2D simplex noise (Ashima / Stefan Gustavson, public domain) ----
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                          + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                          dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x  = 2.0 * fract(p * C.www) - 1.0;
  vec3 h  = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// 3-octave fbm
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * snoise(p);
    p = p * 2.02 + 11.7;
    a *= 0.5;
  }
  return v;
}

// soft, falloff-shaped blob centred at c
float blob(vec2 uv, vec2 c, float r, float soft) {
  float d = length(uv - c);
  return 1.0 - smoothstep(r * (1.0 - soft), r, d);
}

void main() {
  // aspect-correct coords centred at 0, y up
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;

  float t = u_time * 0.05;          // very slow
  vec2  par = u_mouse * 0.06;       // gentle parallax

  // domain-warp the field so blobs breathe rather than slide rigidly
  vec2 warp = vec2(
    fbm(uv * 1.1 + vec2(t, -t * 0.7)),
    fbm(uv * 1.1 + vec2(-t * 0.8, t) + 5.2)
  );
  vec2 fuv = uv + warp * 0.16 - par;

  // ---- blob centres drift on slow circular paths ----
  vec2 cBlue = vec2(-0.34 + 0.05 * sin(t * 0.9),
                     0.10 + 0.05 * cos(t * 0.7));
  vec2 cWarm = vec2( 0.30 + 0.06 * cos(t * 0.6),
                    -0.16 + 0.04 * sin(t * 1.1));
  vec2 cCyan = vec2( 0.06 + 0.07 * sin(t * 0.5 + 1.7),
                     0.26 + 0.05 * cos(t * 0.8 + 0.4));

  float bBlue = blob(fuv, cBlue, 0.62, 0.95);
  float bWarm = blob(fuv, cWarm, 0.58, 0.95);
  float bCyan = blob(fuv, cCyan, 0.50, 0.96);

  // a faint global field modulation so it never looks like 3 hard discs
  float field = fbm(uv * 1.4 - vec2(t * 0.6, t * 0.4)) * 0.5 + 0.5;
  bBlue *= 0.55 + 0.45 * field;
  bWarm *= 0.55 + 0.45 * (1.0 - field);
  bCyan *= 0.5  + 0.5  * fbm(uv * 1.9 + vec2(t, t));

  // ---- premium, low-chroma palette tuned to the brand ----
  vec3 colBlue = vec3(0.40, 0.49, 0.86); // brand blue, softened
  vec3 colWarm = vec3(0.93, 0.83, 0.66); // warm amber/paper
  vec3 colCyan = vec3(0.66, 0.84, 0.88); // faint cyan

  // ink palette for the bleed (sRGB of --blue / --blue-deep)
  vec3 inkBlue = vec3(0.00, 0.388, 0.884); // == --blue
  vec3 inkDeep = vec3(0.00, 0.305, 0.714); // == --blue-deep

  // weighted accumulation; weights stay low for a dreamy, restrained look
  float wBlue = bBlue * 0.42;
  float wWarm = bWarm * 0.34;
  float wCyan = bCyan * 0.22;

  vec3  color = colBlue * wBlue + colWarm * wWarm + colCyan * wCyan;
  float alpha = wBlue + wWarm + wCyan;

  // soft vignette so edges fade into the cream stage
  float vig = 1.0 - smoothstep(0.55, 1.15, length(uv));
  alpha *= vig;

  // global intensity + a final gentle ceiling so it never gets loud
  alpha *= u_intensity;
  alpha = clamp(alpha, 0.0, 0.55);

  // normalise color by its accumulated weight so hues stay true (straight alpha)
  float wsum = wBlue + wWarm + wCyan;
  if (wsum > 0.0001) color /= wsum;

  // ---- INK BLEED: organic, noise-masked front from u_inkOrigin ----
  // distance from the origin, warped by the SAME fbm field so the leading
  // edge is irregular and alive rather than a clean circular iris.
  vec2  d2      = uv - u_inkOrigin;
  float dist    = length(d2);
  float grain   = fbm(uv * 2.3 + vec2(t * 0.5, -t * 0.4));
  float front   = dist + grain * 0.34;
  float reach   = u_ink * 1.85;               // covers the stage by u_ink ~1
  float feather = mix(0.10, 0.26, u_ink);     // edge softens as it spreads
  float ink     = smoothstep(reach + feather, reach - feather, front);
  ink          *= step(0.0005, u_ink);        // exactly 0 before the bleed starts

  // wet -> dry: deepen chroma toward the filled interior of the front
  float wet     = smoothstep(reach, reach - 0.5, front);
  vec3  inkCol  = mix(inkBlue, inkDeep, wet * 0.55);

  // composite ink OVER the ambient color (straight-alpha space)
  color = mix(color, inkCol, ink);
  alpha = max(alpha, ink);                    // opaque where the ink has reached
  alpha = mix(clamp(alpha, 0.0, 0.55), alpha, ink); // lift the ceiling under ink

  color *= alpha;                             // PREMULTIPLIED output (once)
  gl_FragColor = vec4(color, alpha);
}
`;

function compile(
  gl: WebGLRenderingContext,
  type: number,
  src: string
): WebGLShader | null {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("ShaderField shader compile error:", gl.getShaderInfoLog(sh));
    }
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function link(
  gl: WebGLRenderingContext,
  vs: WebGLShader,
  fs: WebGLShader
): WebGLProgram | null {
  const p = gl.createProgram();
  if (!p) return null;
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("ShaderField program link error:", gl.getProgramInfoLog(p));
    }
    gl.deleteProgram(p);
    return null;
  }
  return p;
}

export type ShaderDrive = {
  ink: number;
  ambient: number;
  originX: number;
  originY: number;
};

export function ShaderField({
  className,
  intensity = 1,
  drive,
}: {
  className?: string;
  intensity?: number;
  /** Optional live bridge written by a parent rAF (e.g. ScrollHero). Read once
   *  per render frame; never triggers React re-renders. */
  drive?: { current: ShaderDrive | null };
}) {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intensityRef = useRef(intensity);
  intensityRef.current = intensity;
  const driveRef = drive;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl", {
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false,
        powerPreference: "low-power",
      }) as WebGLRenderingContext | null) ||
      (canvas.getContext(
        "experimental-webgl"
      ) as WebGLRenderingContext | null);

    if (!gl) return; // no WebGL: the cream stage simply shows through

    // ---- GL resources (recreated on context restore) ----
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let uRes: WebGLUniformLocation | null = null;
    let uTime: WebGLUniformLocation | null = null;
    let uMouse: WebGLUniformLocation | null = null;
    let uIntensity: WebGLUniformLocation | null = null;
    let uInk: WebGLUniformLocation | null = null;
    let uInkOrigin: WebGLUniformLocation | null = null;
    let ready = false;

    const buildGL = (): boolean => {
      const vs = compile(gl, gl.VERTEX_SHADER, VERT_SRC);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
      if (!vs || !fs) return false;
      program = link(gl, vs, fs);
      // shaders can be deleted once linked
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      if (!program) return false;

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      // a single big triangle covering the clip space
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW
      );
      const loc = gl.getAttribLocation(program, "a_pos");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      uRes = gl.getUniformLocation(program, "u_resolution");
      uTime = gl.getUniformLocation(program, "u_time");
      uMouse = gl.getUniformLocation(program, "u_mouse");
      uIntensity = gl.getUniformLocation(program, "u_intensity");
      uInk = gl.getUniformLocation(program, "u_ink");
      uInkOrigin = gl.getUniformLocation(program, "u_inkOrigin");

      gl.useProgram(program);
      // premultiplied-alpha blend over the page
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
      return true;
    };

    ready = buildGL();
    if (!ready) return;

    // ---- sizing (DPR-capped) ----
    let cssW = 0;
    let cssH = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      cssW = w;
      cssH = h;
      const pw = Math.round(w * dpr);
      const ph = Math.round(h * dpr);
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    // ---- mouse parallax (internal, smoothed in the loop) ----
    const target = { x: 0, y: 0 };
    let mx = 0;
    let my = 0;
    const onMouse = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    // ---- render ----
    const start =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    const now = () =>
      typeof performance !== "undefined" ? performance.now() : Date.now();

    const renderFrame = (timeSec: number) => {
      if (!ready || !program) return;
      if (canvas.width === 0 || canvas.height === 0) return;
      mx += (target.x - mx) * 0.05;
      my += (target.y - my) * 0.05;
      // read the optional scroll-driven bridge (no React state, no re-render)
      let inkVal = 0;
      let ambient = intensityRef.current;
      let originX = 0.34; // spine point in centred UV (matches the diary panel)
      let originY = 0.04;
      const dv = driveRef && driveRef.current;
      if (dv) {
        inkVal = dv.ink;
        ambient = dv.ambient;
        originX = dv.originX;
        originY = dv.originY;
      }
      gl.useProgram(program);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, timeSec);
      if (uMouse) gl.uniform2f(uMouse, mx, my);
      if (uIntensity) gl.uniform1f(uIntensity, ambient);
      if (uInk) gl.uniform1f(uInk, inkVal);
      if (uInkOrigin) gl.uniform2f(uInkOrigin, originX, originY);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    // ---- loop control: pause offscreen / hidden ----
    let raf = 0;
    let running = false;
    let visibleOnScreen = true;

    const loop = () => {
      renderFrame((now() - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    const startLoop = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stopLoop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const syncRunning = () => {
      const shouldRun =
        !reduce &&
        visibleOnScreen &&
        !(typeof document !== "undefined" && document.hidden);
      if (shouldRun) startLoop();
      else stopLoop();
    };

    // ---- observers ----
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        resize();
        if (reduce || !running) renderFrame((now() - start) / 1000);
      });
      ro.observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) visibleOnScreen = e.isIntersecting;
          syncRunning();
        },
        { threshold: 0 }
      );
      io.observe(canvas);
    }

    const onVisibility = () => syncRunning();

    // ---- context loss safety ----
    const onLost = (e: Event) => {
      e.preventDefault();
      ready = false;
      stopLoop();
    };
    const onRestored = () => {
      ready = buildGL();
      if (ready) {
        resize();
        if (reduce) renderFrame((now() - start) / 1000);
        else syncRunning();
      }
    };
    canvas.addEventListener("webglcontextlost", onLost as EventListener, false);
    canvas.addEventListener("webglcontextrestored", onRestored, false);

    if (reduce) {
      // one static frame, no loop, no mouse listener
      renderFrame(8.0);
    } else {
      window.addEventListener("mousemove", onMouse, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      syncRunning();
    }

    // ---- cleanup ----
    return () => {
      stopLoop();
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", resize);
      if (typeof document !== "undefined")
        document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost as EventListener);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      if (ro) ro.disconnect();
      if (io) io.disconnect();
      if (gl) {
        if (buffer) gl.deleteBuffer(buffer);
        if (program) gl.deleteProgram(program);
        const lose = gl.getExtension("WEBGL_lose_context");
        if (lose) lose.loseContext();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}

export default ShaderField;
