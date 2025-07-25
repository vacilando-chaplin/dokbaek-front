import { SignInRequestType, SignUpRequestType } from "@/lib/types";
import axios from "axios";

export const postOauthSignUp = async (data: SignUpRequestType) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASEURL}/auth/oauth/signup`,
      data
    );
    const resData = res.data;
    return resData;
  } catch (error) {
    throw error;
  }
};

export const postOauthSignIn = async (data: SignInRequestType) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASEURL}/auth/oauth/signin`,
      data
    );
    const resData = res.data;
    return resData;
  } catch (error) {
    throw error;
  }
};
