type ImagePlaceholderProps = {
  /** What belongs here — shown until a real photo replaces the block. */
  label: string;
  /** CSS aspect ratio, e.g. "16 / 9". */
  ratio?: string;
};

/**
 * Stand-in for photography that has not been supplied yet. Swap it for
 * `Photo` once a real file lands in `public/image/`.
 */
export function ImagePlaceholder({
  label,
  ratio = "16 / 9",
}: ImagePlaceholderProps) {
  return (
    <div
      className="my-10 grid w-full place-items-center rounded-3xl border border-dashed border-smoke bg-white/50 text-center"
      style={{ aspectRatio: ratio }}
    >
      <div className="px-6">
        <svg
          className="mx-auto w-9 text-smoke"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="8.5" cy="10" r="1.5" fill="currentColor" />
          <path
            d="M21 16L16 11L7 19"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="mt-3 font-display text-[0.68rem] uppercase tracking-[0.18em] text-muted">
          {label}
        </p>
      </div>
    </div>
  );
}
