import { SignUpRequestTypes } from "@/types/types";
import axios from "axios";

const api = axios.create({
  baseURL: "http://filogram.my/api",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

export const getSchoolName = async (search: string) => {
  const univ_res = await fetch(
    `https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${process.env.NEXT_PUBLIC_CAREERNET_API_KEY}&svcType=api&svcCode=SCHOOL&contentType=json&gubun=univ_list&perPage=10&searchSchulNm=${search}`
  );

  const high_res = await fetch(
    `https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${process.env.NEXT_PUBLIC_CAREERNET_API_KEY}&svcType=api&svcCode=SCHOOL&contentType=json&gubun=high_list&perPage=10&searchSchulNm=${search}`
  );

  const univ_list_data = await univ_res.json();
  const high_list_data = await high_res.json();

  const data = univ_list_data.dataSearch.content.concat(
    high_list_data.dataSearch.content
  );

  return await data;
};

export const AuthLogin = async (code: string | string[]) => {
  const res = await axios.post(`/api/oauth/callback/kakao?code=${code}`);
  const data = res.data;

  return data;
};

export const postUser = async (data: SignUpRequestTypes) => {
  if (!data.accessToken) {
    return false;
  }
  try {
    const res = await api.post("/auth/signup", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

