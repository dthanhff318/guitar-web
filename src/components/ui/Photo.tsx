import Image from "next/image";

type PhotoProps = {
  /** Path under `public/`, e.g. "/image/teaching.jpeg". */
  src: string;
  /** Describes the photo for screen readers; never decorative here. */
  alt: string;
  /** CSS aspect ratio for the frame, e.g. "16 / 9". */
  ratio?: string;
  /** Load eagerly when the photo sits above the fold. */
  priority?: boolean;
};

/**
 * Framed photograph matching the dashed `ImagePlaceholder` it replaces, so
 * swapping one for the other leaves the page rhythm untouched.
 */
export function Photo({
  src,
  alt,
  ratio = "16 / 9",
  priority = false,
}: PhotoProps) {
  return (
    <div
      className="relative my-10 w-full overflow-hidden rounded-3xl border border-smoke bg-white/50"
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        // The article is capped at max-w-3xl (48rem), so never request more
        // than that plus a margin for high-density screens.
        sizes="(max-width: 48rem) 100vw, 48rem"
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}
