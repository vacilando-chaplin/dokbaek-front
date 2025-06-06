import { selector } from "recoil";
import { profileDraftData } from "./atom";

export const profileProgress = selector<number>({
  key: "profileProgress",
  get: ({ get }) => {
    const data = get(profileDraftData);

    const info = data.info ? Object.values(data.info) : [];
    const list = [
      data.specialties,
      data.education,
      data.photos,
      data.stillCuts,
      data.recentPhotos,
      data.filmos,
      data.videos
    ];

    const totalList = [...info, ...list];
    const progressCount = 17;

    const completedData = totalList.filter((value) => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === "number") return !isNaN(value);
      if (typeof value === "string") return value.trim() !== "";
      return false;
    }).length;

    return Math.round((completedData / progressCount) * 100);
  }
});
