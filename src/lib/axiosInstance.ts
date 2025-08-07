import axios from "axios";
import Cookies from "js-cookie";
import { removeStorageData, setRefreshToken, setToken } from "./utils";

const token = Cookies.get("jwt");
export const baseURL = process.env.NEXT_PUBLIC_API_BASEURL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${token}`
  }
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
    console.error(error);
    throw error;
  }
};

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

const addResponseInterceptor = (axiosInstance: any) => {
  axiosInstance.interceptors.response.use(
    (response: any) => {
      return response;
    },
    async (error: any) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        await refreshToken();
        try {
          const newToken = await refreshToken();
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
};

addResponseInterceptor(api);

export { api };
