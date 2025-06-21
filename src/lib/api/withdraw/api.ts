import { createServerAxios } from "@/lib/axios/server";
import { cookies } from "next/headers";

export const getWithdrawReasonServer = async () => {
  const cookie = cookies();
  const jwt = cookie.get("jwt")?.value;
  const api = createServerAxios(jwt);

  try {
    const res = await api.get("/withdraw/reasons");
    const data = res.data;

    return data;
  } catch (error) {
    throw error;
  }
};
