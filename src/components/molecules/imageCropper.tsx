import Image from "next/image";
import {
  PercentCrop,
  PixelCrop,
  ReactCrop,
  centerCrop,
  makeAspectCrop
} from "react-image-crop";

interface ImageCropperProps {
  selectImage: string;
  imgRef: any;
  previewCanvasRef: any;
  crop: PercentCrop | undefined;
  setCrop: React.Dispatch<React.SetStateAction<PercentCrop | undefined>>;
}

const ImageCropper = ({
  selectImage,
  imgRef,
  previewCanvasRef,
  crop,
  setCrop
}: ImageCropperProps) => {
  const cropWidth = 160;
  const cropHeight = 204;

  const ASPECT_RATIO = cropWidth / cropHeight; // 가로, 세로 비율

  const onImageLoad = (e: any) => {
    if (e.currentTarget) {
      const { width, height } = e.currentTarget;
      const cropWidthInPercent = (cropWidth / width) * 100;
      const cropHeightInPercent = (cropHeight / height) * 100;

      const crop = makeAspectCrop(
        {
          unit: "%",
          width: cropWidthInPercent,
          height: cropHeightInPercent
        },
        ASPECT_RATIO,
        width,
        height
      );
      const centeredCrop = centerCrop(crop, width, height);
      setCrop(centeredCrop);
    }
  };

  return (
    <div className="min-h-[480px]">
      {selectImage && (
        <div className="flex flex-col items-center">
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={10}
            minHeight={10}
          >
            <Image
              ref={imgRef}
              src={selectImage}
              alt="Upload"
              width={500}
              height={500}
              style={{ maxHeight: "70vh" }}
              priority
              onLoadingComplete={onImageLoad}
            />
          </ReactCrop>
        </div>
      )}
      {crop && <canvas ref={previewCanvasRef} className="hidden" />}
    </div>
  );
};
export default ImageCropper;
