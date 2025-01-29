import { api } from "@/lib/axiosInstance";
import { SignUpRequestType } from "@/lib/types";
import axios from "axios";

export const kakaoAuthLogin = async (code: string | string[]) => {
  try {
    const res = await axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_OAUTH_LOGIN_REDIRECT_URI}&code=${code}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
    const data = res.data;

    return data;
  } catch (error) {
    throw error;
  }
};

export const postNaverCode = async (code: string) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/oauth/token`,
      { code },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const data = res.data;

    return data;
  } catch (error) {
    throw error;
  }
};

export const naverAuthLogin = async (code: string) => {
  try {
    const res = await axios.post("https://nid.naver.com/oauth2.0/token", null, {
      params: {
        client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
        code: code,
        redirect_uri: process.env.NEXT_PUBLIC_OAUTH_LOGIN_REDIRECT_URI,
        grant_type: "authorization_code"
      }
    });
    const data = res.data;

    return data;
  } catch (error) {
    throw error;
  }
};

export const googleAuthLogin = async (code: string) => {
  try {
    const res = await axios.post("https://oauth2.googleapis.com/token", null, {
      params: {
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        code: code,
        redirect_uri: process.env.NEXT_PUBLIC_OAUTH_LOGIN_REDIRECT_URI,
        grant_type: "authorization_code"
      }
    });
    const data = res.data;

    return data;
  } catch (error) {
    throw error;
  }
};

export const postSignUp = async (data: SignUpRequestType) => {
  if (!data.accessToken) {
    return false;
  }
  try {
    const res = await api.post("/auth/signup", data);
    if (res.status === 200) {
      return res.data;
    }
    if (res.status === 201) {
      return res.data;
    }
  } catch (error) {
    throw error;
  }
};
