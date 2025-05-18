import { api } from "@/lib/axiosInstance";

export const getWithdrawReasons = async () => {
  try {
    const res = await api.get("/withdraw/reasons");
    return res.data;
  } catch (error) {
    throw error;
  }
};
