export interface ProfileSearchParams {
  page?: number | null;
  size?: number | null;
  sort?: "RECENT_UPDATED" | "MOST_LIKED" | null;
  sex?: "M" | "F" | "U" | null;
  keyword?: string | null;
  minBornYear?: number | null;
  maxBornYear?: number | null;
  minHeight?: number | null;
  maxHeight?: number | null;
  minWeight?: number | null;
  maxWeight?: number | null;
  specialties?: any[] | null;
}
