import { api } from "@/lib/axiosInstance";

export const getLikedProfiles = async (page: number, size: number) => {
  try {
    const res = await api.get(`/profiles/liked?page=${page}&size=${size}`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const postProfileLike = async (profileId: number) => {
  try {
    const res = await api.post(`/profile/${profileId}/like`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProfileLike = async (profileId: number) => {
  try {
    const res = await api.delete(`/profile/${profileId}/like`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
