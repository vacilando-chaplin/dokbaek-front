import {api} from '@/lib/axiosInstance';

export const getProfileShowcase = async (page: number, size: number) => {
  try {
    const res = await api.get(`/profile/showcase?page=${page}&size=${size}`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
}
