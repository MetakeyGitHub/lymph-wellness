export function SectionLabel({ number, children, light = false }: { number?: string; children: React.ReactNode; light?: boolean }) {
  return <div className={`section-label ${light ? "light" : ""}`}>{number && <span>{number}</span>}<p>{children}</p></div>;
}

