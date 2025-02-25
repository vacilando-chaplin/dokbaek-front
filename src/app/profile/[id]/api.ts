import { api } from "@/lib/axiosInstance";

export const getProfileDraft = async (profileId: number) => {
  try {
    const res = await api.get(`/profile/${profileId}/draft`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postProfileDraft = async (profileId: number) => {
  try {
    const res = await api.post(`/profile/${profileId}/draft`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProfileDraft = async (profileId: number) => {
  try {
    const res = await api.delete(`/profile/${profileId}/draft`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postProfileDraftPublish = async (profileId: number) => {
  try {
    const res = await api.post(`/profile/${profileId}/draft/publish`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
