import Cookies from "js-cookie";

export const setOnlyNumber = (value: string) => {
  return value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
};

export const contactFormat = (contact: string): string => {
  const number = contact.trim().replace(/[^0-9]/g, "");

  if (number.length < 4) return number;
  if (number.length < 7) return number.replace(/(\d{3})(\d{1})/, "$1-$2");
  if (number.length < 11)
    return number.replace(/(\d{3})(\d{3})(\d{1})/, "$1-$2-$3");
  return number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
};

export const base64ToBlob = (base64String: string) => {
  const [metadata, base64Data] = base64String.split(";base64,");
  const mimeType = metadata.split(":")[1];
  const binaryData = atob(base64Data); // Base64 문자열을 바이너리로 디코딩

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
};

export const getFileMimeTypeFromUrl = async (url: string) => {
  const response = await fetch(url);
  const contentType = response.headers.get("Content-Type");

  if (contentType && contentType === "application/octet-stream") {
    const buffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);

    if (uint8Array[0] === 0xff && uint8Array[1] === 0xd8) {
      return "image/jpeg";
    }
    if (uint8Array[0] === 0x89 && uint8Array[1] === 0x50) {
      return "image/png";
    }

    return "unknown";
  }

  return contentType || "unknown";
};

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string); // base64 문자열 반환
    reader.onerror = reject;
    reader.readAsDataURL(file); // 파일을 base64로 변환
  });
};

const COOKIE_OPTIONS = {
  expires: 7,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  sameSite: "strict" as const
};

const COOKIE_REMOVE_OPTIONS = {
  secure: process.env.NODE_ENV === "production",
  path: "/",
  sameSite: "strict" as const
};

export const removeStorageData = () => {
  localStorage.removeItem("recoil-persist");

  Cookies.remove("jwt", COOKIE_REMOVE_OPTIONS);
  Cookies.remove("refresh_token", COOKIE_REMOVE_OPTIONS);
  Cookies.remove("loginProfileId", COOKIE_REMOVE_OPTIONS);
};

export const setToken = (name: string, token: string) => {
  Cookies.set(name, token, COOKIE_OPTIONS);
};

export const setLoginProfileId = (name: string, loginProfileId: string) => {
  Cookies.set(name, loginProfileId, COOKIE_OPTIONS);
};

export const setLoginForm = (name: string, loginForm: string) => {
  Cookies.set(name, loginForm, COOKIE_OPTIONS);
};

export const isValidHandle = (handle: string) => {
  return handle.length > 2 && /^[a-zA-Z0-9]+$/.test(handle);
};
