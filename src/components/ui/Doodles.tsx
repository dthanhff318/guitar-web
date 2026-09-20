/**
 * Hand-drawn accents that sit behind the instrument — sparkles, loose strokes
 * and a scribble, echoing the sketchbook feel of the reference layout.
 */
export function Doodles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Long stroke sweeping in from the right */}
      <svg
        className="absolute right-0 top-[28%] h-auto w-[42%] text-bone/25"
        viewBox="0 0 400 120"
        fill="none"
      >
        <path
          d="M2 108C60 112 128 96 196 62C252 34 318 8 398 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Mirrored stroke, lower left */}
      <svg
        className="absolute bottom-[14%] left-0 h-auto w-[34%] text-bone/25"
        viewBox="0 0 320 100"
        fill="none"
      >
        <path
          d="M318 6C262 2 196 18 132 48C82 72 36 88 2 94"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Four-point sparkles */}
      {[
        { top: "30%", left: "19%", size: 42, opacity: "opacity-70" },
        { top: "38%", left: "57%", size: 30, opacity: "opacity-50" },
        { top: "62%", left: "12%", size: 22, opacity: "opacity-40" },
      ].map((s) => (
        <svg
          key={`${s.top}-${s.left}`}
          className={`absolute text-bone/50 ${s.opacity}`}
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M20 2C21.6 12.4 27.6 18.4 38 20C27.6 21.6 21.6 27.6 20 38C18.4 27.6 12.4 21.6 2 20C12.4 18.4 18.4 12.4 20 2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      ))}

      {/* Solid dots */}
      <span className="absolute left-[13%] top-[36%] size-2 rounded-full bg-bone/30" />
      <span className="absolute left-[10%] top-[58%] size-3 rounded-full bg-ember-500" />
      <span className="absolute left-[16%] top-[47%] size-2.5 rounded-full bg-bone/20" />

      {/* Looping scribble, bottom centre */}
      <svg
        className="absolute bottom-[4%] left-1/2 h-auto w-24 -translate-x-1/2 text-bone/30"
        viewBox="0 0 90 140"
        fill="none"
      >
        <path
          d="M46 4C22 14 62 40 40 52C18 64 68 82 44 94C20 106 66 122 42 136"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
