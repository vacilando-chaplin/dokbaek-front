import { api } from "@/lib/axiosInstance";
import { ProfileSearchParams } from "./types";

export const getProfiles = async (query: string) => {
  try {
    const res = await api.get(`/profiles?${query}`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

// 프로필 좋아요
export const postProfileLike = async (profileId: number) => {
  try {
    const res = await api.post(`/profile/${profileId}/like`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
// 프로필 좋아요 취소
export const deleteProfileLike = async (profileId: number) => {
  try {
    const res = await api.delete(`/profile/${profileId}/like`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
