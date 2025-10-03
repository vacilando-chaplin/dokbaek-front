"use server";

import { createServerAxios } from "@/lib/axios/server";
import { cookies } from "next/headers";

export const getProfileMeServer = async () => {
  const cookie = cookies();
  const jwt = cookie.get("jwt")?.value;
  const api = createServerAxios(jwt);

  if (!jwt) return null;

  try {
    const res = await api.get("/profile/me");
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
