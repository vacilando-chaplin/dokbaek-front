import { api } from "@/lib/axiosInstance";
import { ProfileSearchParams } from "./types";

export const getProfiles = async (params: ProfileSearchParams) => {
  try {
    const res = await api.get(`/profiles`, { params: params });
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
