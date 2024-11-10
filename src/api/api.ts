import { SignUpRequestTypes } from "@/types/types";
import axios from "axios";
import { headers } from "next/headers";

const api = axios.create({
  baseURL: "https://fillogram.my/api",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

const baseURL = "https://fillogram.my/api"

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


  const res = await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI}&code=${code}`,
  {
    method: "POST",
      headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }});
  const data = res.data;

  return data;
};

export const postUser = async (data: SignUpRequestTypes) => {
  console.log(data)
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

const getAuthHeaders = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
};

export const putInfo = async (id: number, data: any, token: string) => {
  try {
    const res = await api.put(`/profile/${id}`, data, getAuthHeaders(token));
    return res.data;
  } catch (error) {
    throw error;
  }
};

function base64ToBlob(base64String: any) {
    const [metadata, base64Data] = base64String.split(';base64,');
    const mimeType = metadata.split(':')[1];
    const binaryData = atob(base64Data);  // Base64 문자열을 바이너리로 디코딩

    // Blob 객체 생성
    const byteArrays = [];
    for (let offset = 0; offset < binaryData.length; offset += 1024) {
        const slice = binaryData.slice(offset, offset + 1024);
        const byteArray = new Uint8Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteArray[i] = slice.charCodeAt(i);
        }
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: mimeType });
}

export const postPhoto = async (id: number, origin: any, preview: any, token: string) => {
  const formData = new FormData();

  const imagePreview = base64ToBlob(preview);
  formData.append("origin", origin, "origin");
  formData.append("preview", imagePreview, "image.jpg");

  try {
    const res = await axios.post(`${baseURL}/profile/${id}/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const deletePhoto = async (id: number, photoId: number, token: string) => {
  try {
    const res = await api.delete(`/profile/${id}/photo/${photoId}`, getAuthHeaders(token));
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const patchPhotoDefault = async (id: number, photoId: string, token: string) => {
  try {
    const res = await api.patch(`/profile/${id}/photo/${photoId}/default`, getAuthHeaders(token))
    return res.data;
  } catch (error) {
    throw error
  }
} 

export const postFilmography = async (id: number, data: any, token: string) => {
  try {
    const res = await api.post(`/profile/${id}/filmo`, data, getAuthHeaders(token));
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const putFilmography = async (id: number, filmoId: number, data: any, token: string) => {
  try {
    const res = await api.put(`/profile/${id}/filmo/${filmoId}}`, data, getAuthHeaders(token));
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const deleteFilmography = async (id: number, filmoId: number, token: string) => {
  try {
    const res = await api.delete(`/profile/${id}/filmo/${filmoId}`, getAuthHeaders(token));
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const postVideo = async (id: number, url: string, token: string) => {
  try {
    const res = await api.post(`/profile/${id}/video`, { url }, getAuthHeaders(token));
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const putVideo = async (id: number, videoId: number, url: string, token: string) => {
  try {
    const res = await api.put(`/profile/${id}/video/${videoId}`, { url }, getAuthHeaders(token));
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const deleteVideo = async (id: number, videoId: number, token: string) => {
  try {
    const res = await api.delete(`/profile/${id}/video/${videoId}`, getAuthHeaders(token));
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const getProfile = async (id: number) => {
  try {
    const res = await api.get(`/profile${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}