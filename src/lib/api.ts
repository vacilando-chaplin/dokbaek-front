import { base64ToBlob } from "@/lib/utils";
import axios from "axios";
import { api } from "./axiosInstance";

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

export const deleteSignOut = async (refreshToken: string) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASEURL}/auth/signout`,
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

export const getProfile = async (id: number) => {
  try {
    const res = await api.get(`/profile/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getProfileOtherUser = async (id: number) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/profile/${id}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postPhoto = async (
  id: number,
  origin: string,
  preview: string,
  category: string
) => {
  const formData = new FormData();

  const imageOrigin = base64ToBlob(origin);
  const imagePreview = base64ToBlob(preview);

  formData.append("origin", imageOrigin);
  formData.append("preview", imagePreview);

  try {
    const res = await api.post(`/profile/${id}/draft/${category}`, formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const patchPhoto = async (
  id: number,
  preview: string,
  photoId: string,
  category: string
) => {
  const formData = new FormData();
  const imagePreview = base64ToBlob(preview);
  formData.append("preview", imagePreview);

  try {
    const res = await api.patch(
      `/profile/${id}/draft/${category}/${photoId}`,
      formData
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deletePhoto = async (
  id: number,
  photoId: string,
  category: string
) => {
  try {
    const res = await api.delete(`/profile/${id}/draft/${category}/${photoId}`);
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
