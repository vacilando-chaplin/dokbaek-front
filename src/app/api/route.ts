import {
  FilmoRequestType,
  SignOutRequestType,
  SignUpRequestType
} from "@/types/types";
import { base64ToBlob } from "@/utils/utils";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("jwt");

const baseURL = process.env.NEXT_PUBLIC_BASEURL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  },
  withCredentials: true
});

const multipartAPI = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`
  },
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("jwt");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

multipartAPI.interceptors.request.use(
  (config) => {
    const token = Cookies.get("jwt");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const convertImageToBase64 = async (imageUrl: string) => {
  try {
    const res = await axios({
      method: "get",
      url: imageUrl,
      responseType: "arraybuffer"
    });
    if (typeof window !== "undefined") {
      // 브라우저 환경에서는 FileReader를 사용
      const base64Image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        const blob = new Blob([res.data]);
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      return base64Image;
    } else {
      // Node.js 환경에서는 Buffer를 사용
      const base64Image = Buffer.from(res.data, "binary").toString("base64");
      return `data:image/jpeg;base64,${base64Image}`;
    }
  } catch (error) {
    throw error;
  }
};

export const getUser = async () => {
  try {
    const res = await api.get("/user");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async () => {
  try {
    const res = await api.delete("/user");
    return res.data;
  } catch (error) {
    throw error;
  }
};

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

// 커리어넷 학교 검색 api
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

export const postSignOut = async (data: SignOutRequestType) => {
  try {
    const res = await axios.post(`${baseURL}/auth/signout`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getProfile = async (id: number) => {
  try {
    const res = await api.get(`/profile/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const putInfo = async (id: number, data: any) => {
  try {
    const res = await api.put(`/profile/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postPhoto = async (
  id: number,
  origin: string,
  preview: string
) => {
  const formData = new FormData();

  const imageOrigin = base64ToBlob(origin);
  const imagePreview = base64ToBlob(preview);

  formData.append("origin", imageOrigin);
  formData.append("preview", imagePreview);

  try {
    const res = await multipartAPI.post(`/profile/${id}/photo`, formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postPhotoEdit = async (
  id: number,
  origin: string,
  preview: string,
  photoId: string
) => {
  const formData = new FormData();

  const imageOrigin = base64ToBlob(origin);
  const imagePreview = base64ToBlob(preview);

  formData.append("origin", imageOrigin);
  formData.append("preview", imagePreview);

  try {
    const res = await multipartAPI.post(
      `/profile/${id}/photo/${photoId}`,
      formData
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deletePhoto = async (id: number, photoId: string) => {
  try {
    const res = await api.delete(`/profile/${id}/photo/${photoId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const patchPhotoDefault = async (id: number, photoId: string) => {
  try {
    const res = await api.patch(`/profile/${id}/photo/${photoId}/default`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getFilmoRoles = async () => {
  try {
    const res = await api.get("/filmo/roles");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getFilmoCategories = async () => {
  try {
    const res = await api.get("/filmo/categories");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postFilmography = async (id: number, data: FilmoRequestType) => {
  try {
    const res = await api.post(`/profile/${id}/filmo`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postFilmographyThumbnail = async (thumbnail: string) => {
  const formData = new FormData();

  const imageOrigin = base64ToBlob(thumbnail);
  formData.append("thumbnail", imageOrigin);

  try {
    const res = await multipartAPI.post(`/filmo/thumbnail`, formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const putFilmography = async (
  id: number,
  filmoId: number,
  data: FilmoRequestType
) => {
  try {
    const res = await api.put(`/profile/${id}/filmo/${filmoId}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFilmography = async (id: number, filmoId: number) => {
  try {
    const res = await api.delete(`/profile/${id}/filmo/${filmoId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postVideo = async (id: number, url: string) => {
  try {
    const res = await api.post(`/profile/${id}/video`, { url });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const putVideo = async (id: number, videoId: number, url: string) => {
  try {
    const res = await api.put(`/profile/${id}/video/${videoId}`, { url });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteVideo = async (id: number, videoId: number) => {
  try {
    const res = await api.delete(`/profile/${id}/video/${videoId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
