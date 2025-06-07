import axios from "axios";

export const createServerAxios = (token: string | undefined) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASEURL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
