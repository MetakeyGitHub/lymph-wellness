/** Architectural linework drawn for the clinic; decorative, never an anatomy diagram. */
export function CareMark({
  variant = "arch",
}: {
  variant?: "arch" | "flow" | "face";
}) {
  return (
    <svg
      className={`lw-care-mark lw-care-mark-${variant}`}
      viewBox="0 0 240 280"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {variant === "arch" ? (
        <>
          {[0, 1, 2, 3, 4].map((n) => (
            <path
              key={n}
              d={`M${30 + n * 15} 265V125a${90 - n * 15} ${90 - n * 15} 0 0 1 ${180 - n * 30} 0v140`}
            />
          ))}
          <path d="M15 265h210" />
        </>
      ) : variant === "flow" ? (
        <>
          {[0, 1, 2, 3, 4].map((n) => (
            <path
              key={n}
              d={`M${30 + n * 18} 250c-42-60 130-90 82-155C88 65 150 30 200 25`}
            />
          ))}
        </>
      ) : (
        <>
          <path d="M150 250c-40-10-67-39-69-78l-4-76c-2-43 26-69 65-69 42 0 70 33 67 72l-3 45c-2 38-16 65-48 78" />
          <path d="M77 96c-12 8-18 23-18 43 0 50 20 101 56 121M164 89c-9 22-12 41-7 52l11 14-17 9M120 104l18-3m38 0 15 3M136 190c12 6 25 6 36-2M103 42c-33 13-50 48-50 88" />
        </>
      )}
    </svg>
  );
}
