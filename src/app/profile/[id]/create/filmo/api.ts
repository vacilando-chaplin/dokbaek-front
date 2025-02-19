import { api } from "@/lib/axiosInstance";
import { FilmoRequestType } from "@/lib/types";
import { base64ToBlob } from "@/lib/utils";

export const postFilmography = async (id: number, data: FilmoRequestType) => {
  try {
    const res = await api.post(`/profile/${id}/filmo`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postFilmographyThumbnail = async (thumbnail: string) => {
  const formData = new FormData();

  const imageOrigin = base64ToBlob(thumbnail);
  formData.append("thumbnail", imageOrigin);

  try {
    const res = await api.post(`/filmo/thumbnail`, formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const putFilmography = async (
  id: number,
  filmoId: number,
  data: FilmoRequestType
) => {
  try {
    const res = await api.put(`/profile/${id}/filmo/${filmoId}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFilmography = async (id: number, filmoId: number) => {
  try {
    const res = await api.delete(`/profile/${id}/filmo/${filmoId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
