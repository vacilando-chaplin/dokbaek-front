import { api } from "@/lib/axiosInstance";

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
