import { api, baseURL } from "@/lib/axiosInstance";
import { base64ToBlob } from "@/lib/utils";
import axios from "axios";

export const getProfileDraftClient = async (profileId: number) => {
  try {
    const res = await api.get(`/profile/${profileId}/draft`);
    if (res.status === 200) {
      return { data: res.data, hasDraft: true };
    }
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return { data: error.response.data, hasDraft: false };
    }
    throw error;
  }
};

export const postProfileDraftClient = async (profileId: number) => {
  try {
    const res = await api.post(`/profile/${profileId}/draft`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteProfileDraftClient = async (profileId: number) => {
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

export const getFilmoRoles = async () => {
  try {
    const res = await axios.get(`${baseURL}/filmo/roles`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getFilmoCategories = async () => {
  try {
    const res = await axios.get(`${baseURL}/filmo/categories`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getProfileByHandleId = async (handleId: string) => {
  try {
    const res = await axios.get(`${baseURL}/profile/@${handleId}`);
    return res.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const postProfile = async (handleId: string) => {
  try {
    const res = await api.post(`/profile`, { handleId });
    return res;
  } catch (error) {
    throw error;
  }
};

export const putProfileHandle = async (profileId: number, handleId: string) => {
  try {
    const res = await api.put(`/profile/${profileId}/handle`, { handleId });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getProfileHandleExists = async (handleId: string) => {
  try {
    const res = await api.get(`/profile/handle/exists`, {
      params: { handleId }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
