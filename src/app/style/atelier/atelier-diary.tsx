"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { Bricolage_Grotesque } from "next/font/google";

/**
 * Atelier scroll-scrubbed diary (the one animated variant).
 *
 * A pre-extracted JPEG sequence of the journal (closed -> open spread -> pages
 * burst into a radial fan) is painted to a <canvas> by scroll progress.
 *
 * Mechanic, adapted from the site ScrollHero:
 *  - ONE requestAnimationFrame loop. NO scroll event listener. NO <video>.
 *  - Reads the tall track container's getBoundingClientRect every frame and
 *    maps scroll progress 0..1 -> frame index 0..FRAME_COUNT-1. Scroll-driven
 *    open + page burst, never an idle flutter.
 *  - contain-fit, dpr-aware blit. If the target frame has not decoded yet the
 *    draw returns false and we RETRY on the next tick, so it never freezes.
 *  - prefers-reduced-motion holds frame 0 and skips the loop.
 *
 * The frames carry a warm CREAM background that would read as a hard light
 * rectangle on the warm-dark stage. A soft RADIAL mask-image feathers the cream
 * margins into the void while the journal itself stays fully visible, and a warm
 * radial glow sits behind so the book appears to float and glow in the dark.
 */

const FRAME_COUNT = 121;
const frameSrc = (i: number) =>
  `/diary/frames/frame_${String(i).padStart(4, "0")}.jpg`;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const outCubic = (t: number) => 1 - Math.pow(1 - clamp(t), 3);

/* Display face for the giant ghost wordmark, self-contained to this component. */
const ghostDisplay = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

const GHOST = "#3a342c";

export function AtelierDiary({
  isMobile = false,
  overlay,
}: {
  isMobile?: boolean;
  overlay?: ReactNode;
}) {
  const reduceRaw = useReducedMotion();
  const reduce = reduceRaw ?? false;

  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: HTMLImageElement[] = [];
    const loaded: boolean[] = new Array(FRAME_COUNT).fill(false);
    let current = -1;
    let raf = 0;

    // Draw a frame contain-fit, centred, dpr-aware. Returns false if the
    // requested frame is not decoded yet so the caller can retry later.
    const draw = (idx: number): boolean => {
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
      const img = images[idx];
      if (!img || !loaded[idx] || img.naturalWidth === 0) return false;
      const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      return true;
    };

    // Nearest already-decoded frame to a target, so a not-yet-loaded frame
    // never blanks the canvas mid-scroll.
    const nearestLoaded = (target: number): number => {
      if (loaded[target]) return target;
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (target - d >= 0 && loaded[target - d]) return target - d;
        if (target + d < FRAME_COUNT && loaded[target + d]) return target + d;
      }
      return -1;
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const im = new Image();
      im.decoding = "async";
      const idx = i;
      im.onload = () => {
        loaded[idx] = true;
        if (idx === 0 && current < 0) {
          if (draw(0)) current = 0;
        }
      };
      im.src = frameSrc(i + 1);
      images.push(im);
    }
    if (draw(0)) current = 0;

    const onResize = () => {
      const c = current < 0 ? 0 : current;
      current = -1;
      if (draw(c)) current = c;
    };
    window.addEventListener("resize", onResize);

    // Reduced motion: hold frame 0, no loop, no parallax. Retry until decoded.
    if (reduce) {
      let tries = 0;
      const t = window.setInterval(() => {
        if (draw(0) || tries++ > 50) window.clearInterval(t);
      }, 60);
      return () => {
        window.clearInterval(t);
        window.removeEventListener("resize", onResize);
      };
    }

    const tick = () => {
      const c = trackRef.current;
      if (c) {
        const rect = c.getBoundingClientRect();
        const denom = rect.height - window.innerHeight;
        const p = denom > 0 ? clamp(-rect.top / denom) : 0;

        const target = Math.round(p * (FRAME_COUNT - 1));
        if (target !== current) {
          const drawIdx = nearestLoaded(target);
          if (drawIdx >= 0 && draw(drawIdx)) {
            current = drawIdx === target ? target : -1;
          }
        } else if (current < 0) {
          if (draw(target)) current = target;
        }

        // The book breathes forward as it opens, then the burst lifts and
        // softens as it leaves the stage. Scroll-driven, never idle. The lift
        // eases out (accelerates away) so the exit has weight, not a linear ramp.
        const scale = 1 + 0.1 * p;
        const lift = -30 * outCubic((p - 0.6) / 0.4);
        if (stageRef.current) {
          stageRef.current.style.transform = `translateY(${lift.toFixed(
            2,
          )}px) scale(${scale.toFixed(4)})`;
        }
        if (glowRef.current) {
          const g = 0.42 + 0.5 * outCubic((p - 0.28) / 0.5);
          glowRef.current.style.opacity = g.toFixed(3);
          glowRef.current.style.transform = `scale(${(1 + 0.22 * p).toFixed(3)})`;
        }
        if (cueRef.current) {
          cueRef.current.style.opacity = (1 - clamp(p / 0.12)).toFixed(3);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [reduce]);

  // Radial mask: opaque through the centre (journal stays crisp), feathering out
  // so the surrounding cream dissolves into the warm-dark void.
  const mask =
    "radial-gradient(ellipse 60% 58% at 50% 50%, #000 0%, #000 44%, rgba(0,0,0,0.72) 62%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 95%)";

  // Warm-black vignette painted ON TOP of the journal: the centre (the open
  // spread, its text) stays bright, but the surrounding cream margins are tinted
  // down toward the stage colour so the book sits in shadow instead of reading as
  // a bright light patch. Its own outer edge is the stage colour, so invisible.
  const vignette =
    "radial-gradient(ellipse 58% 60% at 50% 50%, rgba(21,17,13,0) 0%, rgba(21,17,13,0) 33%, rgba(21,17,13,0.46) 58%, rgba(21,17,13,0.86) 80%, #15110d 100%)";

  return (
    <div
      ref={trackRef}
      style={{ position: "relative", height: reduce ? "100svh" : "320vh" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* GIANT ghost wordmark behind the diary */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <span
            className={ghostDisplay.className}
            style={{
              fontWeight: 800,
              fontSize: isMobile ? "26vw" : "22vw",
              letterSpacing: "-0.05em",
              lineHeight: 1,
              color: GHOST,
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            Talent Diary
          </span>
        </div>

        {/* warm glow behind the journal so it floats / glows in the void */}
        <div
          ref={glowRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: isMobile ? "120%" : "80%",
            height: isMobile ? "64%" : "82%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            pointerEvents: "none",
            opacity: 0.5,
            background:
              "radial-gradient(closest-side, rgba(245,224,180,0.30) 0%, rgba(214,164,92,0.16) 40%, rgba(42,82,255,0.10) 62%, rgba(0,0,0,0) 80%)",
            filter: "blur(22px)",
            willChange: "transform, opacity",
          }}
        />

        {/* the scrubbed canvas, radially masked into the dark */}
        <div
          ref={stageRef}
          aria-label="The Talent Diary, a navy-leather journal of notes and lessons from startup hiring, its pages fanning open as you scroll."
          role="img"
          style={{
            position: "relative",
            zIndex: 3,
            width: isMobile ? "118vw" : "72vw",
            maxWidth: isMobile ? "none" : "1120px",
            height: isMobile ? "62vh" : "84vh",
            willChange: "transform",
          }}
        >
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              display: "block",
              maskImage: mask,
              WebkitMaskImage: mask,
              filter:
                "drop-shadow(0 40px 80px rgba(0,0,0,0.55)) drop-shadow(0 8px 24px rgba(0,0,0,0.4))",
            }}
          />
          {/* vignette that sinks the cream margins into the dark */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: vignette,
            }}
          />
        </div>

        {/* overlay slot (hero copy + frosted panels live here, pinned in view) */}
        {overlay && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 5,
              pointerEvents: "none",
            }}
          >
            {overlay}
          </div>
        )}

        {/* scroll cue */}
        <div
          ref={cueRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            color: "rgba(244,237,226,0.6)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            pointerEvents: "none",
          }}
        >
          <span>Scroll to open</span>
          <span
            style={{
              width: 1,
              height: 34,
              background:
                "linear-gradient(to bottom, rgba(244,237,226,0.5), rgba(244,237,226,0))",
            }}
          />
        </div>
      </div>
    </div>
  );
}
