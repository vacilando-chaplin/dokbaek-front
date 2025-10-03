import { selector } from "recoil";
import { profileDraftData } from "./atom";

export const profileProgress = selector<number>({
  key: "profileProgress",
  get: ({ get }) => {
    const data = get(profileDraftData);

    const fields = [
      {
        value: data.info?.name,
        validate: (value: any) => typeof value === "string" && value.length > 0
      },
      {
        value: data.info?.bornYear,
        validate: (value: any) =>
          (typeof value === "string" && value.length === 4) ||
          (typeof value === "number" && value.toString().length === 4)
      },
      {
        value: data.info?.gender,
        validate: (value: any) =>
          typeof value === "string" && (value === "M" || value === "F")
      },
      {
        value: data.info?.height,
        validate: (value: any) =>
          (typeof value === "string" && value.length > 0) ||
          (typeof value === "number" && value > 0)
      },
      {
        value: data.info?.weight,
        validate: (value: any) =>
          (typeof value === "string" && value.length > 0) ||
          (typeof value === "number" && value > 0)
      },
      {
        value: data.info?.contact,
        validate: (value: any) => typeof value === "string" && value.length >= 9
      },
      {
        value: data.info?.instagramLink,
        validate: (value: any) => typeof value === "string" && value.length > 0
      },
      {
        value: data.info?.youtubeLink,
        validate: (value: any) => typeof value === "string" && value.length > 0
      },
      {
        value: data.info?.email,
        validate: (value: any) => typeof value === "string" && value.length > 0
      },
      {
        value: data.info?.introduction,
        validate: (value: any) => typeof value === "string" && value.length > 0
      },
      {
        value: data.specialties,
        validate: (value: any) => Array.isArray(value) && value.length > 0
      },
      {
        value: data.education,
        validate: (value: any) => Array.isArray(value) && value.length > 0
      },
      {
        value: data.photos,
        validate: (value: any) => Array.isArray(value) && value.length > 0
      },
      {
        value: data.stillCuts,
        validate: (value: any) => Array.isArray(value) && value.length > 0
      },
      {
        value:
          data.recentPhotos.find((p) => p.photoType === "FULL_BODY") ?? null,
        validate: (value: any) => value !== null
      },
      {
        value:
          data.recentPhotos.find((p) => p.photoType === "FRONT_FACE") ?? null,
        validate: (value: any) => value !== null
      },
      {
        value:
          data.recentPhotos.find((p) => p.photoType === "LEFT_FACE") ?? null,
        validate: (value: any) => value !== null
      },
      {
        value:
          data.recentPhotos.find((p) => p.photoType === "RIGHT_FACE") ?? null,
        validate: (value: any) => value !== null
      },
      {
        value: data.filmos,
        validate: (value: any) => Array.isArray(value) && value.length > 0
      },
      {
        value: data.videos,
        validate: (value: any) => Array.isArray(value) && value.length > 0
      }
    ];

    const completedData = fields.filter((field) =>
      field.validate(field.value)
    ).length;

    const progressCount = fields.length;

    return Math.round((completedData / progressCount) * 100);
  }
});
