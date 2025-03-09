import { api } from "@/lib/axiosInstance";
import { base64ToBlob } from "@/lib/utils";

export const getProfileDraft = async (profileId: number) => {
  try {
    const res = await api.get(`/profile/${profileId}/draft`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      throw error;
    }
  }
};

export const postProfileDraft = async (profileId: number) => {
  try {
    const res = await api.post(`/profile/${profileId}/draft`);
    return res;
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

export const postProfilePhotoMain = async (
  id: number,
  origin: string,
  preview: string
) => {
  try {
    const formData = new FormData();

    const imageOrigin = base64ToBlob(origin);
    const imagePreview = base64ToBlob(preview);

    formData.append("origin", imageOrigin);
    formData.append("preview", imagePreview);

    const res = await api.post(`/profile/${id}/photo/main`, formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const patchProfilePhotoMain = async (id: number, preview: string) => {
  const formData = new FormData();
  const imagePreview = base64ToBlob(preview);
  formData.append("preview", imagePreview);

  try {
    const res = await api.patch(`/profile/${id}/photo/main`, formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProfilePhotoMain = async (id: number) => {
  try {
    const res = await api.delete(`/profile/${id}/photo/main`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
