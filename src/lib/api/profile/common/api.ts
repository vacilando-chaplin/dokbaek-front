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
    return { data: res.data, hasDraft: true };
  } catch (error) {
    throw error;
  }
};

export const getProfileByHandleIdServer = async (handleId: string) => {
  const cookie = cookies();
  const jwt = cookie.get("jwt")?.value;
  const api = createServerAxios(jwt);

  try {
    const res = await api.get(`profile/@${handleId}`);
    return { ...res.data, isForbidden: false };
  } catch (error: any) {
    if (error.response?.status === 403) {
      return {
        ...(error.response.data?.data || error.response.data),
        isForbidden: true
      };
    }

    if (error.response?.status === 404) {
      return null;
    }

    throw error;
  }
};
