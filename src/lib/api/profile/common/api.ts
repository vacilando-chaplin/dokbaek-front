"use server";

import { ProfileDraftDataType } from "@/app/profile/[id]/create/types";
import { createServerAxios } from "@/lib/axios/server";
import { cookies } from "next/headers";

export const getProfileDraftServer = async (profileId: number) => {
  const cookie = cookies();
  const jwt = cookie.get("jwt")?.value;
  const api = createServerAxios(jwt);

  try {
    const res = await api.get(`/profile/${profileId}/draft`);
    if (res.status === 200) {
      return { data: res.data, hasDraft: true };
    }
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return { data: error.response.data, hasDraft: false };
    }
    throw error;
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
