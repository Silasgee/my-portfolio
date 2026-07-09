"use client";

import { useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import TextReveal from "@/components/ui/TextReveal";

/**
 * One living room, drawn twice: neglected and pristine. The same
 * geometry with different light — because that's what cleaning is.
 */
function RoomScene({ after }: { after: boolean }) {
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`sky-${after ? "a" : "b"}`} x1="0" y1="0" x2="0" y2="1">
          {after ? (
            <>
              <stop offset="0%" stopColor="#FDE9BE" />
              <stop offset="100%" stopColor="#FBF2DC" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#CDCBC6" />
              <stop offset="100%" stopColor="#D8D5CF" />
            </>
          )}
        </linearGradient>
      </defs>

      {/* Wall + floor */}
      <rect width="800" height="500" fill={after ? "#FBF7EE" : "#DEDCD6"} />
      <rect y="380" width="800" height="120" fill={after ? "#EBDCBB" : "#C9C4B8"} />
      <line x1="0" y1="380" x2="800" y2="380" stroke={after ? "#D9C79E" : "#B3AEA1"} strokeWidth="2" />
      {/* Floor boards */}
      {[120, 300, 480, 660].map((x) => (
        <line
          key={x}
          x1={x}
          y1="380"
          x2={x - 40}
          y2="500"
          stroke={after ? "#DFCEA6" : "#BDB8AB"}
          strokeWidth="2"
        />
      ))}

      {/* Window */}
      <rect x="64" y="56" width="200" height="244" rx="6" fill={`url(#sky-${after ? "a" : "b"})`} stroke={after ? "#0F172A" : "#6B7280"} strokeWidth="6" />
      <line x1="164" y1="59" x2="164" y2="297" stroke={after ? "#0F172A" : "#6B7280"} strokeWidth="4" />
      <line x1="67" y1="178" x2="261" y2="178" stroke={after ? "#0F172A" : "#6B7280"} strokeWidth="4" />
      {!after && (
        <g stroke="#B7B3AB" strokeWidth="3" strokeLinecap="round" opacity="0.8">
          {/* Smudges on the glass */}
          <path d="M92 90l38 46M110 84l30 38M196 200l40 52M212 194l34 44" />
        </g>
      )}
      {after && (
        // Sunlight pouring through onto the floor
        <polygon points="70,300 258,300 420,470 150,470" fill="#F59E0B" opacity="0.14" />
      )}

      {/* Rug */}
      <rect x="290" y="398" width="340" height="76" rx="10" fill={after ? "#0F766E" : "#A8A398"} opacity={after ? 0.9 : 0.7} />
      <rect x="302" y="408" width="316" height="56" rx="7" fill="none" stroke={after ? "#FAFAF8" : "#918C80"} strokeWidth="2" opacity="0.55" />

      {/* Sofa */}
      <g>
        <rect x="430" y="222" width="280" height="76" rx="14" fill={after ? "#1C2A4A" : "#8E8B87"} />
        <rect x="418" y="286" width="304" height="88" rx="16" fill={after ? "#0F172A" : "#7C7A76"} />
        {/* Cushions */}
        <rect x="440" y="238" width="120" height="52" rx="10" fill={after ? "#24365C" : "#98948E"} />
        <rect x="576" y="238" width="120" height="52" rx="10" fill={after ? "#24365C" : "#98948E"} />
        {after && (
          <g stroke="#F59E0B" strokeWidth="2" opacity="0.8">
            <line x1="430" y1="300" x2="710" y2="300" />
          </g>
        )}
        {/* Legs */}
        <rect x="436" y="374" width="8" height="18" fill={after ? "#0F172A" : "#6E6C68"} />
        <rect x="696" y="374" width="8" height="18" fill={after ? "#0F172A" : "#6E6C68"} />
        {/* Throw pillow, only fluffed in the after */}
        {after && <rect x="548" y="244" width="44" height="44" rx="9" transform="rotate(8 570 266)" fill="#0F766E" />}
      </g>

      {/* Wall art above the sofa — crooked before, straight after */}
      <g transform={after ? "translate(526 96)" : "translate(526 96) rotate(-7 44 32)"}>
        <rect width="88" height="64" rx="4" fill={after ? "#FBF7EE" : "#CFCCC5"} stroke={after ? "#F59E0B" : "#8E8B85"} strokeWidth="4" />
        <path d="M12 46l20-20 14 12 16-18 14 26H12z" fill={after ? "#0F766E" : "#9B978F"} />
      </g>

      {/* Side table with vase */}
      <g>
        <rect x="318" y="316" width="86" height="6" rx="3" fill={after ? "#0F172A" : "#7C7A76"} />
        <rect x="328" y="322" width="6" height="60" fill={after ? "#0F172A" : "#7C7A76"} />
        <rect x="388" y="322" width="6" height="60" fill={after ? "#0F172A" : "#7C7A76"} />
        <path
          d="M352 316c0-8 3-11 3-18 0-5-5-7-5-12 0-4 4-6 11-6s11 2 11 6c0 5-5 7-5 12 0 7 3 10 3 18h-18z"
          fill={after ? "#0F766E" : "#94908A"}
        />
        {after && (
          <g stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" fill="none">
            <path d="M361 280c0-12 6-18 14-22" />
            <path d="M361 280c0-10-5-16-11-19" />
          </g>
        )}
      </g>

      {/* Pendant lamp — lit in the after */}
      <g>
        <line x1="672" y1="0" x2="672" y2="64" stroke={after ? "#0F172A" : "#8E8B87"} strokeWidth="3" />
        <path d="M646 96a26 26 0 0152 0z" transform="rotate(180 672 82)" fill={after ? "#0F172A" : "#8E8B87"} />
        {after && <ellipse cx="672" cy="86" rx="34" ry="16" fill="#F59E0B" opacity="0.28" />}
      </g>

      {before_extras(after)}
      {after && (
        <g fill="#F59E0B">
          {/* Sparkles: the just-cleaned glint */}
          {[
            [712, 196, 12],
            [300, 340, 9],
            [176, 330, 10],
            [640, 420, 8],
          ].map(([x, y, s], i) => (
            <path
              key={i}
              transform={`translate(${x} ${y}) scale(${(s as number) / 24})`}
              d="M12 1.5c.9 5.6 4.9 9.6 10.5 10.5C16.9 12.9 12.9 16.9 12 22.5 11.1 16.9 7.1 12.9 1.5 12 7.1 11.1 11.1 7.1 12 1.5z"
            />
          ))}
          {/* Gleam on the floor */}
          <rect x="330" y="486" width="150" height="3" rx="1.5" opacity="0.5" />
        </g>
      )}
    </svg>
  );
}

/** Clutter and dust that exist only in the before view. */
function before_extras(after: boolean) {
  if (after) return null;
  return (
    <g>
      {/* Dust motes hanging in stale air */}
      <g fill="#8E8B85" opacity="0.55">
        {[
          [320, 120, 4],
          [370, 180, 3],
          [420, 90, 4],
          [480, 150, 3],
          [280, 230, 3],
          [610, 140, 4],
          [740, 250, 3],
          [180, 340, 3],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} />
        ))}
      </g>
      {/* Scattered mess on the floor */}
      <g fill="#9B978F">
        <path d="M180 452l14-8 12 6-10 10z" />
        <path d="M690 440l16-6 8 10-14 8z" />
        <circle cx="260" cy="470" r="7" />
        <rect x="560" y="452" width="34" height="10" rx="4" transform="rotate(-12 577 457)" />
      </g>
      {/* Scuff marks on the wall */}
      <g stroke="#B9B5AD" strokeWidth="4" strokeLinecap="round" opacity="0.7">
        <path d="M320 330c14-4 26 2 38-2" />
        <path d="M710 320c10-6 20-2 28-8" />
      </g>
    </g>
  );
}

export default function BeforeAfter() {
  const [value, setValue] = useState(50);

  return (
    <section className="bg-fog py-24 lg:py-36" aria-label="Before and after comparison">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <Eyebrow>The transformation</Eyebrow>
        </Reveal>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <TextReveal
            text="Same room. Different feeling."
            highlight="feeling."
            className="max-w-xl font-display text-4xl font-medium leading-[1.08] tracking-tight text-navy sm:text-5xl"
          />
          <Reveal delay={0.2}>
            <p className="max-w-sm text-base leading-relaxed text-navy/60">
              Drag the light across the room and watch it come back to life.
              This is what your space feels like after we leave.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="relative mt-14 aspect-[16/10] select-none overflow-hidden rounded-[2rem] border border-navy/[0.08] shadow-[0_40px_80px_-40px_rgba(15,23,42,0.35)]">
            {/* Before layer */}
            <div className="absolute inset-0">
              <RoomScene after={false} />
            </div>

            {/* After layer, revealed from the left */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
            >
              <RoomScene after />
            </div>

            {/* Labels */}
            <span
              className={`absolute left-5 top-5 rounded-full bg-navy/80 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white backdrop-blur transition-opacity duration-300 ${
                value > 26 ? "opacity-100" : "opacity-0"
              }`}
            >
              After
            </span>
            <span
              className={`absolute right-5 top-5 rounded-full bg-white/80 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-navy backdrop-blur transition-opacity duration-300 ${
                value < 82 ? "opacity-100" : "opacity-0"
              }`}
            >
              Before
            </span>

            {/* Divider + handle */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_20px_rgba(15,23,42,0.35)]"
              style={{ left: `${value}%` }}
            >
              <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-navy/10 bg-white shadow-lg">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-navy">
                  <path
                    d="M8 7l-5 5 5 5m8-10l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            {/* The real control: an invisible full-bleed range input,     */}
            {/* so dragging, clicking and arrow keys all work for free.   */}
            <input
              type="range"
              min={0}
              max={100}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              aria-label="Compare the room before and after cleaning"
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-6 text-center text-xs font-semibold uppercase tracking-[0.24em] text-navy/40">
            Drag to compare
          </p>
        </Reveal>
      </div>
    </section>
  );
}
