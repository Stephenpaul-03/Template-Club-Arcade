"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/NavBar";
import TetrisBackground from "@/components/HeroTetrisBackground";

const COIN_YELLOW = "#facc15"; // arcade coin yellow

// ── Scanline overlay ───────────────────────────────────────────────────────────
function Scanlines() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
        backgroundSize: "100% 4px",
      }}
    />
  );
}

// ── Pixel corner brackets ──────────────────────────────────────────────────────
function CornerBrackets({ color = "rgba(255,255,255,0.22)" }: { color?: string }) {
  const size = 18;
  const thickness = 2;
  const style: React.CSSProperties = { position: "absolute", width: size, height: size };
  const line: React.CSSProperties = { position: "absolute", background: color };

  return (
    <>
      {/* TL */}
      <span style={{ ...style, top: -1, left: -1 }}>
        <span style={{ ...line, top: 0, left: 0, width: thickness, height: size }} />
        <span style={{ ...line, top: 0, left: 0, width: size, height: thickness }} />
      </span>
      {/* TR */}
      <span style={{ ...style, top: -1, right: -1 }}>
        <span style={{ ...line, top: 0, right: 0, width: thickness, height: size }} />
        <span style={{ ...line, top: 0, right: 0, width: size, height: thickness }} />
      </span>
      {/* BL */}
      <span style={{ ...style, bottom: -1, left: -1 }}>
        <span style={{ ...line, bottom: 0, left: 0, width: thickness, height: size }} />
        <span style={{ ...line, bottom: 0, left: 0, width: size, height: thickness }} />
      </span>
      {/* BR */}
      <span style={{ ...style, bottom: -1, right: -1 }}>
        <span style={{ ...line, bottom: 0, right: 0, width: thickness, height: size }} />
        <span style={{ ...line, bottom: 0, right: 0, width: size, height: thickness }} />
      </span>
    </>
  );
}

// ── Glitchy text that briefly scrambles then resolves ─────────────────────────
const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#@$%&";

function useGlitchText(target: string, delay = 0) {
  const [display, setDisplay] = useState(() => target.replace(/[^ ]/g, "_"));
  const [done, setDone] = useState(false);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const DURATION = 900;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start - delay;
      if (elapsed < 0) { frame = requestAnimationFrame(tick); return; }

      const progress = Math.min(elapsed / DURATION, 1);
      const resolvedCount = Math.floor(progress * target.length);

      setDisplay(
        target
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < resolvedCount) return ch;
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join("")
      );

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
        setDone(true);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, delay]);

  return { display, done };
}

// ── Blinking cursor ────────────────────────────────────────────────────────────
function BlinkCursor({ active }: { active: boolean }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: "0.55em",
        height: "1em",
        background: COIN_YELLOW,
        marginLeft: 2,
        verticalAlign: "text-bottom",
        animation: active ? "blink 1s step-end infinite" : "none",
        opacity: active ? 1 : 0,
      }}
    />
  );
}

// ── Pixel badge ────────────────────────────────────────────────────────────────
function PixelBadge({ children, color = "rgba(255,255,255,0.65)", delay = 0 }: {
  children: React.ReactNode;
  color?: string;
  delay?: number;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        border: `1px solid ${color}`,
        color,
        fontSize: 11,
        letterSpacing: "0.12em",
        padding: "3px 10px 3px 8px",
        fontFamily: "'Courier New', monospace",
        textTransform: "uppercase",
        opacity: 0,
        animation: `fadeSlideUp 0.5s ease forwards`,
        animationDelay: `${delay}ms`,
      }}
    >
      <span style={{ width: 6, height: 6, background: color, display: "inline-block", flexShrink: 0 }} />
      {children}
    </span>
  );
}

// ── Score ticker that counts up ────────────────────────────────────────────────
function ScoreTicker({ label, value, delay }: { label: string; value: number; delay: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const DURATION = 1400;
    let frame: number;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start - delay;
      if (elapsed < 0) { frame = requestAnimationFrame(tick); return; }
      const t = Math.min(elapsed / DURATION, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * value));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, delay]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        opacity: 0,
        animation: "fadeSlideUp 0.5s ease forwards",
        animationDelay: `${delay}ms`,
      }}
    >
      <span style={{
        fontFamily: "'Courier New', monospace",
        fontSize: 22,
        fontWeight: 700,
        color: "rgba(255,255,255,0.88)",
        letterSpacing: "0.05em",
        lineHeight: 1,
      }}>
        {count.toLocaleString()}
      </span>
      <span style={{
        fontFamily: "'Courier New', monospace",
        fontSize: 9,
        color: "rgba(255,255,255,0.4)",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
      }}>
        {label}
      </span>
    </div>
  );
}

// ── CTA Button ────────────────────────────────────────────────────────────────
function ArcadeButton({ children, href, delay, primary }: {
  children: React.ReactNode;
  href?: string;
  delay: number;
  primary?: boolean;
}) {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: primary ? "12px 32px" : "11px 28px",
        fontFamily: "'Courier New', monospace",
        fontSize: 13,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        fontWeight: 700,
        cursor: "pointer",
        textDecoration: "none",
        border: primary ? `2px solid ${COIN_YELLOW}` : "1px solid rgba(255,255,255,0.25)",
        background: primary
          ? "linear-gradient(180deg, #fde047, #facc15)"
          : "rgba(0,0,0,0.12)",
        color: primary ? "rgba(0,0,0,0.92)" : "rgba(255,255,255,0.72)",
        position: "relative",
        transition: "all 0.2s ease",
        opacity: 0,
        animation: "fadeSlideUp 0.5s ease forwards",
        animationDelay: `${delay}ms`,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        if (primary) {
          el.style.background = "linear-gradient(180deg, #fef08a, #facc15)";
          el.style.boxShadow = "0 0 26px rgba(250,204,21,0.22), inset 0 0 12px rgba(255,255,255,0.08)";
        } else {
          el.style.borderColor = "rgba(255,255,255,0.5)";
          el.style.color = "rgba(255,255,255,0.9)";
        }
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        if (primary) {
          el.style.background = "linear-gradient(180deg, #fde047, #facc15)";
          el.style.boxShadow = "none";
        } else {
          el.style.borderColor = "rgba(255,255,255,0.25)";
          el.style.color = "rgba(255,255,255,0.72)";
        }
      }}
    >
      {primary && <span style={{ fontSize: 10 }}>▶</span>}
      {children}
    </Tag>
  );
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function Hero() {
  const line1 = useGlitchText("RetroByte", 300);
  const line2 = useGlitchText("Studio", 700);

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scanH {
          0%   { transform: translateY(-100%); opacity: 0.6; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(250,204,21,0.10), inset 0 0 14px rgba(255,255,255,0.04); }
          50%       { box-shadow: 0 0 26px rgba(250,204,21,0.18), inset 0 0 18px rgba(255,255,255,0.06); }
        }
        @keyframes borderPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .hero-card {
          animation: pulseGlow 4s ease-in-out infinite;
        }
      `}</style>

      <main className="relative min-h-svh w-screen overflow-hidden bg-background text-foreground">
        {/* Tetris background */}
        <TetrisBackground className="opacity-60 saturate-[0.75]" />

        {/* Scanlines */}
        <Scanlines />

        {/* Horizontal scan beam that sweeps once on load */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 11,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 2,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
            animation: "scanH 1.8s ease-out forwards",
            animationDelay: "0.2s",
          }} />
        </div>

        <Navbar />

        <section
          className="relative flex min-h-svh w-full items-center justify-center px-6"
          style={{ zIndex: 20 }}
        >
          <div style={{ maxWidth: 680, width: "100%", textAlign: "center" }}>

            {/* Top badge row */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              marginBottom: 28,
              flexWrap: "wrap",
            }}>
              <PixelBadge color="rgba(255,255,255,0.65)" delay={200}>Est. 2024</PixelBadge>
              <PixelBadge color="rgba(255,255,255,0.55)" delay={350}>Now Playing</PixelBadge>
            </div>

            {/* Card */}
            <div
              className="hero-card"
              style={{
                position: "relative",
                background: "rgba(0,0,0,0.30)",
                border: "1px solid rgba(255,255,255,0.14)",
                padding: "44px 48px 40px",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <CornerBrackets color="rgba(255,255,255,0.22)" />

              {/* Subtitle above title */}
              <div style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 11,
                letterSpacing: "0.22em",
                color: "rgba(255,255,255,0.55)",
                textTransform: "uppercase",
                marginBottom: 16,
                opacity: 0,
                animation: "fadeSlideUp 0.5s ease forwards",
                animationDelay: "250ms",
              }}>
                ◈ &nbsp;PLAYER ONE READY&nbsp; ◈
              </div>

              {/* Glitch title */}
              <h1 style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "clamp(42px, 8vw, 82px)",
                fontWeight: 700,
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                color: "#fff",
                margin: 0,
                marginBottom: 4,
              }}>
                <span style={{ display: "block", color: "rgba(255,255,255,0.96)" }}>
                  {line1.display}
                  {!line1.done && <BlinkCursor active={true} />}
                </span>
                <span style={{ display: "block" }}>
                  {line2.display}
                  {line1.done && !line2.done && <BlinkCursor active={true} />}
                  {line2.done && <BlinkCursor active={true} />}
                </span>
              </h1>

              {/* Tagline */}
              <p style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 14,
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.12em",
                marginTop: 20,
                marginBottom: 0,
                opacity: 0,
                animation: "fadeSlideUp 0.5s ease forwards",
                animationDelay: "1400ms",
              }}>
                Old rules.&nbsp;&nbsp;New polish.
              </p>

              {/* Divider */}
              <div style={{
                height: 1,
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                margin: "28px 0",
                opacity: 0,
                animation: "fadeIn 0.6s ease forwards",
                animationDelay: "1500ms",
              }} />

              {/* Score stats */}
              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "clamp(24px, 6vw, 56px)",
                marginBottom: 32,
              }}>
                <ScoreTicker label="Projects" value={24} delay={1600} />
                <ScoreTicker label="Lines Cleared" value={48200} delay={1750} />
                <ScoreTicker label="High Score" value={999999} delay={1900} />
              </div>

              {/* CTA buttons */}
              <div style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}>
                <ArcadeButton href="#work" primary delay={2100}>
                  Insert Coin
                </ArcadeButton>
                <ArcadeButton href="#about" delay={2250}>
                  High Scores
                </ArcadeButton>
              </div>
            </div>

            {/* Scroll hint */}
            <div style={{
              marginTop: 32,
              fontFamily: "'Courier New', monospace",
              fontSize: 10,
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
              opacity: 0,
              animation: "fadeSlideUp 0.5s ease forwards",
              animationDelay: "2400ms",
            }}>
              ▼ &nbsp; scroll to continue &nbsp; ▼
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
