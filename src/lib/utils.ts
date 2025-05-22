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

export const isValid = (value: string | number | any[]): boolean => {
  if (typeof value === "string") {
    return value.trim().length >= 1;
  }
  if (typeof value === "number") {
    return value > 0;
  }
  if (Array.isArray(value)) {
    return value.length >= 1;
  }
  return false;
};

export const setCanvasPreview = (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: any
) => {
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("No 2d context");
  }

  const pixelRatio = window.devicePixelRatio;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  context.scale(pixelRatio, pixelRatio);
  context.imageSmoothingQuality = "high";
  context.save();

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  context.translate(-cropX, -cropY);
  context.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  context.restore();
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

export const isValidInstagramUrl = (url: string) => {
  const regex =
    /^https:\/\/(www\.)?instagram\.com\/([a-zA-Z0-9_]+)\/?(\?.*)?(#.*)?$/;
  return regex.test(url);
};

export const isValidYoutubeChannelUrl = (url: string) => {
  const regex =
    /^(https:\/\/(www\.)?youtube\.com\/(@[a-zA-Z0-9_-]+|c\/[a-zA-Z0-9_-]+|user\/[a-zA-Z0-9_-]+|channel\/[a-zA-Z0-9_-]{24}))$/;
  return regex.test(url);
};

export const removeStorageData = () => {
  Cookies.remove("jwt", { path: "/" });
  Cookies.remove("refresh_token", { path: "/" });
  localStorage.removeItem("recoil-persist");
};
