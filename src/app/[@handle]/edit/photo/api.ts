import { api } from "@/lib/axiosInstance";
import { base64ToBlob } from "@/lib/utils";

export const postPhoto = async (
  id: number,
  origin: string,
  preview: string,
  category: string
) => {
  const formData = new FormData();

  const imageOrigin = base64ToBlob(origin);
  const imagePreview = base64ToBlob(preview);

  formData.append("origin", imageOrigin);
  formData.append("preview", imagePreview);

  try {
    const res = await api.post(`/profile/${id}/draft/${category}`, formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const patchPhoto = async (
  id: number,
  preview: string,
  photoId: string,
  category: string
) => {
  const formData = new FormData();
  const imagePreview = base64ToBlob(preview);
  formData.append("preview", imagePreview);

  try {
    const res = await api.patch(
      `/profile/${id}/draft/${category}/${photoId}`,
      formData
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deletePhoto = async (
  id: number,
  photoId: string,
  category: string
) => {
  try {
    const res = await api.delete(`/profile/${id}/draft/${category}/${photoId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postRecentPhoto = async (
  id: number,
  origin: string,
  preview: string,
  photoType: string
) => {
  const formData = new FormData();

  const imageOrigin = base64ToBlob(origin);
  const imagePreview = base64ToBlob(preview);

  formData.append("origin", imageOrigin);
  formData.append("preview", imagePreview);

  try {
    const res = await api.post(
      `/profile/${id}/draft/recent?photoType=${photoType}`,
      formData
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postRecentPhotoEdit = async (
  id: number,
  preview: string,
  photoId: string
) => {
  const formData = new FormData();

  const imagePreview = base64ToBlob(preview);

  formData.append("preview", imagePreview);

  try {
    const res = await api.post(
      `/profile/${id}/draft/recent/${photoId}`,
      formData
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
