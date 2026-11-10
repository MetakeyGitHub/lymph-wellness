export type SearchEntry = {
  title: string;
  description: string;
  category: string;
  href: string;
  detail?: string;
  action: string;
};
export function searchEntries(
  entries: readonly SearchEntry[],
  query: string,
  category = "All",
): SearchEntry[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return entries
    .filter(
      (entry) =>
        (category === "All" || entry.category === category) &&
        words.every((word) =>
          `${entry.title} ${entry.description} ${entry.category}`
            .toLowerCase()
            .includes(word),
        ),
    )
    .sort(
      (a, b) =>
        Number(b.title.toLowerCase().includes(query.trim().toLowerCase())) -
        Number(a.title.toLowerCase().includes(query.trim().toLowerCase())),
    );
}
