import { api } from "@/lib/axiosInstance";
import { FilmoRequestType } from "@/lib/types";
import { base64ToBlob } from "@/lib/utils";

export const postFilmography = async (id: number, data: FilmoRequestType) => {
  try {
    console.log(data);
    const res = await api.post(`/profile/${id}/draft/filmo`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postFilmographyThumbnail = async (
  id: number,
  filmoId: number,
  thumbnail: string
) => {
  const formData = new FormData();

  const imageOrigin = base64ToBlob(thumbnail);
  formData.append("thumbnail", imageOrigin);

  try {
    const res = await api.post(
      `/profile/${id}/draft/filmo/${filmoId}/thumbnail`,
      formData
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFilmographyThumbnail = async (
  id: number,
  filmoId: number
) => {
  try {
    const res = await api.delete(
      `/profile/${id}/draft/filmo/${filmoId}/thumbnail`
    );
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
    const res = await api.put(`/profile/${id}/draft/filmo/${filmoId}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFilmography = async (id: number, filmoId: number) => {
  try {
    const res = await api.delete(`/profile/${id}/draft/filmo/${filmoId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const putFilmographyFeatured = async (
  profileId: number,
  filmoId: number
) => {
  try {
    const res = await api.put(
      `/profile/${profileId}/draft/filmo/${filmoId}/featured`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFilmographyFeatured = async (
  profileId: number,
  filmoId: number
) => {
  try {
    const res = await api.delete(
      `/profile/${profileId}/draft/filmo/${filmoId}/featured`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
