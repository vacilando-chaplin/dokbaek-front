import { api } from "@/lib/axiosInstance";

export const postVideo = async (id: number, url: string) => {
  try {
    const res = await api.post(`/profile/${id}/draft/video`, { url });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const putVideo = async (id: number, videoId: number, url: string) => {
  try {
    const res = await api.put(`/profile/${id}/draft/video/${videoId}`, { url });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteVideo = async (id: number, videoId: number) => {
  try {
    const res = await api.delete(`/profile/${id}/draft/video/${videoId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
