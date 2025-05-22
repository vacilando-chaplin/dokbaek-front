import { api } from "@/lib/axiosInstance";

export const postWithdrawReason = async (reasonIds: number[]) => {
  try {
    await api.post("/withdraw/user/reason", {
      reasonIds: reasonIds
    });
  } catch (error) {
    throw error;
  }
};

export const deleteWithdraw = async () => {
  try {
    await api.delete("/withdraw");
  } catch (error) {
    throw error;
  }
};
