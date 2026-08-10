export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="accordion">
      {items.map((item, index) => (
        <details key={item.q}>
          <summary><span className="accordion-number">{String(index + 1).padStart(2, "0")}</span><span>{item.q}</span><span className="accordion-plus" aria-hidden="true">+</span></summary>
          <div className="accordion-answer"><p>{item.a}</p></div>
        </details>
      ))}
    </div>
  );
}

