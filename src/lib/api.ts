import axios from "axios";
import { api } from "./axiosInstance";
import { profileInit } from "./data";

export const deleteSignOut = async (refreshToken: string) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASEURL}/auth/signout`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`
        }
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getProfileByProfileId = async (
  profileId: number | null | undefined
) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASEURL}/profile/${profileId}`
    );
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return profileInit;
    }
  }
};

export const getProfileMe = async () => {
  try {
    const res = await api.get("/profile/me");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getTerms = async () => {
  try {
    const res = await api.get("/terms");
    return res.data;
  } catch (error) {
    throw error;
  }
};
