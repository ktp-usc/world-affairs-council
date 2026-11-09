export const CATEGORIES = [
  { title: "Executive Committee", value: "executive" },
  { title: "Directors", value: "director" },
  { title: "Administration", value: "administration" },
  { title: "Program Committee", value: "committee" },
] as const;

// lookup map so the card can turn "office" into "Office Staff"
export const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.value, c.title]),
);
