"use server";

import { createServerAxios } from "@/lib/axios/server";
import { cookies } from "next/headers";

export const getProfileDraftServer = async (profileId: number) => {
  const cookie = cookies();
  const jwt = cookie.get("jwt")?.value;
  const api = createServerAxios(jwt);

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

export const postProfileDraftServer = async (profileId: number) => {
  const cookie = cookies();
  const jwt = cookie.get("jwt")?.value;
  const api = createServerAxios(jwt);

  try {
    const res = await api.post(`/profile/${profileId}/draft`);
    return res;
  } catch (error) {
    throw error;
  }
};
