"use server";

import { createServerAxios } from "@/lib/axios/server";
import { cookies } from "next/headers";

export const getLikedProfilesServer = async (page: number, size: number) => {
  const cookie = cookies();
  const jwt = cookie.get("jwt")?.value;
  const api = createServerAxios(jwt);

  try {
    const res = await api.get(`/profiles/liked?page=${page}&size=${size}`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
