import { SignUpRequestTypes } from "@/types/types";
import axios from "axios";

const api = axios.create({
  baseURL: "http://3.38.102.209:8080",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

const baseURL = "http://3.38.102.209:8080"

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

export const putInfo = async (id: number, token: string, data: any) => {
  try {
    const res = await api.put(`/profile/${id}`, data, getAuthHeaders(token));
    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Error response:', error.response);  // 서버에서 반환한 응답
      throw new Error(`Error ${error.response.status}: ${error.response.data.message || 'Unknown error'}`);
    } else if (error.request) {
      console.error('Error request:', error.request);  // 요청이 서버로 전송되었으나 응답이 없을 경우
      throw new Error('No response from server.');
    } else {
      console.error('Error message:', error.message);  // 요청 설정 중 발생한 오류
      throw new Error('Error in setting up request: ' + error.message);
    }
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
    console.log(error);
    throw error;
  }
}

export const patchPhotoDefault = async (id: number, photoId: string, token: string) => {
  try {
    const res = await api.patch(`/profile/${id}/photo/${photoId}/default`, getAuthHeaders(token))
    return res.data;
  } catch (error) {
    console.log(error);
    throw error
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