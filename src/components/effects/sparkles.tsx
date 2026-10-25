import { cn } from "@/lib/utils";

// Small deterministic PRNG so server and client render identical sparkles (no hydration mismatch).
function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function Star({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("twinkle absolute", className)} style={style}>
      <path
        fill="currentColor"
        d="M12 0c.6 5.6 2.4 8.9 6.2 10.5L24 12l-5.8 1.5C14.4 15.1 12.6 18.4 12 24c-.6-5.6-2.4-8.9-6.2-10.5L0 12l5.8-1.5C9.6 8.9 11.4 5.6 12 0Z"
      />
    </svg>
  );
}

/** Scatters twinkling four-point stars over its (relatively positioned) parent. */
export function Sparkles({
  count = 14,
  seed = 7,
  className,
  colors = ["text-primary", "text-white", "text-amber-300"],
}: {
  count?: number;
  seed?: number;
  className?: string;
  colors?: string[];
}) {
  const rand = seeded(seed);
  const stars = Array.from({ length: count }, (_, i) => ({
    left: `${(rand() * 96 + 2).toFixed(2)}%`,
    top: `${(rand() * 90 + 5).toFixed(2)}%`,
    size: Math.round(6 + rand() * 12),
    delay: `${(rand() * 3).toFixed(2)}s`,
    duration: `${(1.8 + rand() * 2.2).toFixed(2)}s`,
    color: colors[i % colors.length],
  }));

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {stars.map((s, i) => (
        <Star
          key={i}
          className={cn(s.color, "drop-shadow-[0_0_6px_currentColor]")}
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            ["--twinkle-delay" as string]: s.delay,
            ["--twinkle-duration" as string]: s.duration,
          }}
        />
      ))}
    </div>
  );
}
