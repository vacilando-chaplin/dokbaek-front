export const SORT_OPTIONS = {
  RECENT_UPDATED: "업데이트순",
  MOST_LIKED: "좋아요순"
};

export type SortType = keyof typeof SORT_OPTIONS;

export const getSortLabel = (key: SortType): string => {
  return SORT_OPTIONS[key];
};

export const getSortKey = (label: string): SortType => {
  return (
    (Object.keys(SORT_OPTIONS) as SortType[]).find(
      (key) => SORT_OPTIONS[key] === label
    ) || "RECENT_UPDATED"
  );
};
