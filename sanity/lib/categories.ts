export const CATEGORIES = [
  { title: "Executive", value: "executive" },
  { title: "Director", value: "director" },
  { title: "Administrator", value: "administrator" },
  { title: "Program Committee Member", value: "committee" },
] as const;

// lookup map so the card can turn "office" into "Office Staff"
export const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.value, c.title]),
);
