"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { ShaderField, type ShaderDrive } from "@/components/site/shader-field";

/**
 * Cinematic scroll-scrubbed hero. A Higgsfield video of the journal (open
 * spread -> pages burst into a radial fan) is pre-extracted to JPEG frames and
 * painted to a <canvas> by scroll progress. Layered with a drifting light field
 * and mouse parallax for ambient motion, and a portal exit: near the end the
 * diary zooms in and cross-dissolves into the next section's colour.
 * One rAF loop, no scroll listener, no video element.
 */
const FRAME_COUNT = 121;
const frameSrc = (i: number) => `/diary/frames/frame_${String(i).padStart(4, "0")}.jpg`;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const outCubic = (t: number) => 1 - Math.pow(1 - clamp(t), 3);
// diary size within its canvas at rest. contain-fit (whole book visible) * FIT
const FIT = 0.95;

export function ScrollHero({
  overlay,
  exitColor = "var(--paper)",
  floodInk = true,
}: {
  overlay: ReactNode;
  exitColor?: string;
  floodInk?: boolean;
}) {
  const reduce = useReducedMotion();
  // The WebGL field mounts after the page has settled (or on first input).
  // Compiling shaders during initial load taxes the main thread exactly when
  // the phone is trying to paint the headline, and the field is ambient
  // decoration nobody misses in the first second.
  const [fx, setFx] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  // live bridge to the WebGL field: scroll progress drives ambient swell + the
  // ink-bleed flood without any React state (written every rAF tick).
  const driveRef = useRef<ShaderDrive | null>({
    ink: 0,
    ambient: 0.85,
    originX: 0.34, // spine origin in the field's centred UV (right of centre)
    originY: 0.04, // just above centre, where the binding sits on the stage
  });

  useEffect(() => {
    // typeof, not `in`: Safari still lacks requestIdleCallback, but lib.dom
    // declares it unconditionally, so an `in` check narrows window to never.
    const hasRic = typeof window.requestIdleCallback === "function";
    const id = hasRic
      ? window.requestIdleCallback(() => setFx(true), { timeout: 2500 })
      : window.setTimeout(() => setFx(true), 2500);
    return () => {
      if (hasRic) window.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const images: (HTMLImageElement | undefined)[] = new Array(FRAME_COUNT);
    const loaded: boolean[] = new Array(FRAME_COUNT).fill(false);
    let current = -1;
    let raf = 0;
    let disposed = false;

    const draw = (idx: number): boolean => {
      const img = images[idx];
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      if (cw === 0 || ch === 0) return false;
      const W = Math.round(cw * dpr);
      const H = Math.round(ch * dpr);
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!img || !img.complete || img.naturalWidth === 0) return false;
      const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight) * FIT;
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      return true;
    };

    /*
     * Frame loading, rebuilt for the phone it actually runs on.
     *
     * The first version fetched all 121 frames (5.9MB) the moment the page
     * mounted and let the browser decode each one on the main thread as it was
     * drawn. On a mid-range phone that is ~30 seconds of main-thread blocking
     * layered over the initial paint. Now:
     *
     *  - frame 1 loads immediately (it is the visible poster and the LCP)
     *  - the rest wait for first input or idle, whichever comes first
     *  - they arrive coarse-to-fine (every 15th, every 5th, then all), so a
     *    user who scrolls early scrubs a sparse-but-complete animation that
     *    sharpens as it fills in; draw() falls back to the nearest loaded frame
     *  - decode() runs off the main thread, four frames in flight at a time
     *  - reduced-motion loads exactly one frame instead of all 121
     */
    const loadFrame = (i: number): Promise<void> =>
      new Promise((resolve) => {
        if (images[i]) return resolve();
        const im = new Image();
        im.decoding = "async";
        images[i] = im;
        im.src = frameSrc(i + 1);
        const done = () => {
          loaded[i] = true;
          resolve();
        };
        im.decode().then(done).catch(() => {
          // decode() can reject on transient pressure; the pixels may still be
          // fine. Fall back to load events rather than dropping the frame.
          if (im.complete && im.naturalWidth > 0) done();
          else {
            im.onload = done;
            im.onerror = () => resolve();
          }
        });
      });

    const nearestLoaded = (idx: number): number => {
      if (loaded[idx]) return idx;
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (idx - d >= 0 && loaded[idx - d]) return idx - d;
        if (idx + d < FRAME_COUNT && loaded[idx + d]) return idx + d;
      }
      return -1;
    };

    // Coarse-to-fine order: a 9-frame skeleton of the whole animation first,
    // then 25, then everything. Scrubbing works end to end almost immediately.
    const order: number[] = [];
    {
      const seen = new Set<number>();
      for (const step of [15, 5, 1]) {
        for (let i = 0; i < FRAME_COUNT; i += step) {
          if (!seen.has(i)) {
            seen.add(i);
            order.push(i);
          }
        }
      }
      if (!seen.has(FRAME_COUNT - 1)) order.push(FRAME_COUNT - 1);
    }

    let bulkStarted = false;
    const startBulk = () => {
      if (bulkStarted || disposed) return;
      bulkStarted = true;
      let cursor = 0;
      const next = (): void => {
        if (disposed) return;
        const i = order[cursor++];
        if (i === undefined) return;
        void loadFrame(i).then(next);
      };
      for (let k = 0; k < 4; k++) next();
    };

    void loadFrame(0).then(() => {
      if (!disposed && draw(0)) current = 0;
    });

    const onResize = () => draw(current < 0 ? 0 : current);
    window.addEventListener("resize", onResize);

    if (reduce) {
      const t = setTimeout(() => draw(0), 80);
      return () => {
        disposed = true;
        clearTimeout(t);
        window.removeEventListener("resize", onResize);
      };
    }

    // First input starts the bulk load instantly; a settled main thread starts
    // it anyway so frames are ready before an idle reader begins to scroll.
    const inputOpts = { once: true, passive: true } as const;
    window.addEventListener("scroll", startBulk, inputOpts);
    window.addEventListener("pointerdown", startBulk, inputOpts);
    window.addEventListener("touchstart", startBulk, inputOpts);
    const hasRic = typeof window.requestIdleCallback === "function";
    const idleId = hasRic
      ? window.requestIdleCallback(startBulk, { timeout: 3500 })
      : window.setTimeout(startBulk, 3500);

    // mouse parallax target (-1..1), smoothed each frame
    const target = { x: 0, y: 0 };
    let mx = 0;
    let my = 0;
    // smoothed scroll progress, eased toward the raw value so the scrub glides
    // between frames and settles instead of stepping (-1 = not yet initialised).
    let sp = -1;
    const onMouse = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const tick = () => {
      mx += (target.x - mx) * 0.06;
      my += (target.y - my) * 0.06;
      const camX = -mx;
      const camY = -my;

      const c = containerRef.current;
      if (c) {
        const top = c.getBoundingClientRect().top;
        const denom = c.offsetHeight - window.innerHeight;
        const p = denom > 0 ? clamp(-top / denom) : 0;

        // critically damped follow: first tick snaps, then eases toward p. This
        // is what smooths the scrub. fp ("frame progress") drives every visual
        // so the diary, zoom, shader and fades all move together, buttery.
        if (sp < 0) sp = p;
        else sp += (p - sp) * 0.1;
        if (Math.abs(p - sp) < 0.0002) sp = p; // settle exactly, no drift
        const fp = sp;

        // The diary finishes its full open + page-burst by fp ~0.78, then HOLDS
        // the last frame while the ink flood + fade take over. With the shorter
        // (quicker) track this stops the burst getting cut off mid-animation.
        const want = Math.round(clamp(fp / 0.78) * (FRAME_COUNT - 1));
        // Draw the nearest frame that has actually arrived. While the
        // coarse-to-fine load is still filling in, this converges toward the
        // exact frame on its own as neighbours land.
        const idx = nearestLoaded(want);
        if (idx >= 0 && idx !== current) {
          if (draw(idx)) current = idx;
        }

        // drive the WebGL field: ambient light swells as the book opens and
        // eases back as it bursts; ink releases from the spine at the burst and
        // floods organically to brand blue (the diary "writing" the next section)
        const open = clamp(fp / 0.45);
        const settle = clamp((fp - 0.6) / 0.18);
        const ambient = 0.85 + 0.3 * outCubic(open) - 0.43 * outCubic(settle);
        // the diary stays visible for most of the scroll; the ink only floods
        // LATE (0.82..0.97) so there is no long pinned-blue stretch before the
        // proof bar. flood ends right at the unpin -> minimal blank blue.
        const ink = outCubic((fp - 0.82) / 0.15);
        if (driveRef.current) {
          driveRef.current.ink = floodInk ? clamp(ink) : 0;
          driveRef.current.ambient = ambient;
        }

        // portal exit: zoom into the burst, then dissolve into the next section
        const zoom = 1 + 1.4 * outCubic((fp - 0.76) / 0.24);
        canvas.style.transform = `translate(${(camX * 10).toFixed(2)}px, ${(
          camY * 10
        ).toFixed(2)}px) scale(${zoom.toFixed(4)})`;
        canvas.style.opacity = String(1 - clamp((fp - 0.84) / 0.12));
        if (washRef.current) {
          // the shader floods 0.82..0.97; the wash only seals the final sliver
          // so the very last pixels are a banding-free match to the blue ProofBar
          washRef.current.style.opacity = String(clamp((fp - 0.96) / 0.04));
        }
        if (glowRef.current) {
          glowRef.current.style.transform = `translate(${(camX * 20).toFixed(2)}px, ${(
            camY * 20
          ).toFixed(2)}px)`;
          glowRef.current.style.opacity = String(1 - clamp((fp - 0.8) / 0.18));
        }
        if (overlayRef.current) {
          const o = 1 - clamp((fp - 0.02) / 0.12);
          overlayRef.current.style.opacity = String(o);
          overlayRef.current.style.transform = `translate(${(camX * 5).toFixed(2)}px, ${(
            -22 * (1 - o) + camY * 5
          ).toFixed(2)}px)`;
          overlayRef.current.style.pointerEvents = o < 0.2 ? "none" : "auto";
        }
      }
      if (running) raf = requestAnimationFrame(tick);
    };

    // The loop only runs while the hero is anywhere near the viewport. A
    // reader three sections down was still paying for sixty getBoundingClientRect
    // calls a second on an element they could not see.
    let running = false;
    const startLoop = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startLoop();
        else stopLoop();
      },
      { rootMargin: "160px 0px" },
    );
    if (containerRef.current) io.observe(containerRef.current);
    else startLoop();

    return () => {
      disposed = true;
      stopLoop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", startBulk);
      window.removeEventListener("pointerdown", startBulk);
      window.removeEventListener("touchstart", startBulk);
      if (hasRic) window.cancelIdleCallback(idleId);
      else clearTimeout(idleId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  return (
    <div
      ref={containerRef}
      className={`sh-track${reduce ? " sh-track--static" : ""}`}
      id="top"
    >
      <div className="sh-stage">
        <div ref={glowRef} className="sh-glow" aria-hidden>
          <div className="sh-glow__inner" />
        </div>
        <canvas ref={canvasRef} className="sh-canvas" aria-hidden />
        {fx && <ShaderField className="sh-shader" drive={driveRef} intensity={0.85} />}
        <div
          ref={washRef}
          className="sh-wash"
          style={{ background: exitColor }}
          aria-hidden
        />
        <div ref={overlayRef} className="sh-overlay">
          {overlay}
        </div>
      </div>
    </div>
  );
}
