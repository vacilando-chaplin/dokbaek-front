import { api } from "@/lib/axiosInstance";
import { base64ToBlob } from "@/lib/utils";

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
      `/profile/${id}/recent?photoType=${photoType}`,
      formData
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postRecentPhotoEdit = async (
  id: number,
  origin: string,
  preview: string,
  photoId: string,
  category: string
) => {
  const formData = new FormData();

  const imageOrigin = base64ToBlob(origin);
  const imagePreview = base64ToBlob(preview);

  formData.append("origin", imageOrigin);
  formData.append("preview", imagePreview);

  try {
    const res = await api.post(
      `/profile/${id}/${category}/${photoId}`,
      formData
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
