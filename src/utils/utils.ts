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
