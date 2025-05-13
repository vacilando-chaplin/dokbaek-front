import { SignInRequestType, SignUpRequestType } from "@/lib/types";
import axios from "axios";

// export const googleAuthLogin = async (code: string) => {
//   try {
//     const res = await axios.post("https://oauth2.googleapis.com/token", null, {
//       params: {
//         client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//         client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
//         code: code,
//         redirect_uri: process.env.NEXT_PUBLIC_OAUTH_LOGIN_REDIRECT_URI,
//         grant_type: "authorization_code"
//       }
//     });
//     const data = res.data;

//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

export const postOauthSignUp = async (data: SignUpRequestType) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/auth/oauth/signup`,
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
      `${process.env.NEXT_PUBLIC_BASEURL}/auth/oauth/signin`,
      data
    );
    const resData = res.data;
    return resData;
  } catch (error) {
    throw error;
  }
};
