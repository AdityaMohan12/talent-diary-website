"use client";

import { useEffect, useRef, type ReactNode } from "react";
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
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const images: HTMLImageElement[] = [];
    let current = -1;
    let raf = 0;

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

    for (let i = 0; i < FRAME_COUNT; i++) {
      const im = new Image();
      im.src = frameSrc(i + 1);
      if (i === 0) {
        im.onload = () => {
          if (draw(0)) current = 0;
        };
      }
      images.push(im);
    }
    if (draw(0)) current = 0;

    const onResize = () => draw(current < 0 ? 0 : current);
    window.addEventListener("resize", onResize);

    if (reduce) {
      const t = setTimeout(() => draw(0), 80);
      return () => {
        clearTimeout(t);
        window.removeEventListener("resize", onResize);
      };
    }

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
        const idx = Math.round(clamp(fp / 0.78) * (FRAME_COUNT - 1));
        if (idx !== current) {
          if (draw(idx)) current = idx; // retry next frame if not loaded yet
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
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
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
        <ShaderField className="sh-shader" drive={driveRef} intensity={0.85} />
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
