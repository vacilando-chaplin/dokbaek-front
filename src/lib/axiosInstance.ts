import axios from "axios";
import Cookies from "js-cookie";
import { removeStorageData, setRefreshToken, setToken } from "./utils";

export const baseURL = process.env.NEXT_PUBLIC_API_BASEURL;

const api = axios.create({
  baseURL: baseURL
});

const refreshToken = async () => {
  const refresh_token = Cookies.get("refresh_token");
  if (!refresh_token) {
    removeStorageData();
    throw new Error("Refresh token not found");
  }

  try {
    const { data } = await axios.post(
      `${baseURL}/auth/refresh`,
      {
        refreshToken: refresh_token,
        deviceId: "web"
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    const { jwt, refreshToken } = data.data.token;
    setToken("jwt", jwt);
    setRefreshToken("refresh_token", refreshToken);
    return jwt;
  } catch (error) {
    console.error("Refresh token failed:", error);
    removeStorageData(); // 리프레시 실패 시 모든 토큰 제거
    throw error;
  }
};

// Request 인터셉터
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

// Response 인터셉터
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고 아직 재시도하지 않은 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { api };
