/** Inline vectors keep navigation marks consistent, including Safari on iOS. */
export function ArrowIcon({
  direction = "up-right",
}: {
  direction?: "up-right" | "right" | "left" | "down";
}) {
  const paths = {
    "up-right": "M5 19 19 5M5 5h14v14",
    right: "M4 12h16m-6-6 6 6-6 6",
    left: "M20 12H4m6-6-6 6 6 6",
    down: "M12 4v16m-6-6 6 6 6-6",
  };
  return (
    <svg
      className="lw-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[direction]} />
    </svg>
  );
}
export function ResetIcon() {
  return (
    <svg
      className="lw-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 10a8 8 0 1 1 1 7M4 4v6h6" />
    </svg>
  );
}
export function ClockIcon() {
  return (
    <svg
      className="lw-icon lw-time-mark"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

export function SparkIcon() {
  return (
    <svg
      className="lw-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M5.6 18.4 18.4 5.6" />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg
      className="lw-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}
