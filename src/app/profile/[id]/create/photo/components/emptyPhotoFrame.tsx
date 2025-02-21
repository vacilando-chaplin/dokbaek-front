"use client";

import { useDropzone } from "react-dropzone";

interface EmptyPhotoFrameProps {
  text: string;
  listSize: number;
  onDrop: (images: File[], rejectedFiles: any[]) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCropModalOpen: (category: string) => void;
}

const EmptyPhotoFrame = ({
  text,
  listSize,
  onDrop,
  onChange,
  onCropModalOpen
}: EmptyPhotoFrameProps) => {
  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": []
      },
      onDrop,
      multiple: true,
      maxFiles: 20 - listSize,
      maxSize: 10000000
    });

  return (
    <div
      className={`flex h-auto w-full cursor-pointer items-center justify-center gap-4 rounded-xl border border-dotted px-6 py-16 hover:border-accent-primary-light hover:bg-accent-light-light ${isDragAccept ? "border-accent-primary-light bg-accent-light-light" : isDragReject ? "border-state-negative-light bg-red-50" : "border-gray-150 bg-gray-50"}`}
      {...getRootProps()}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onClick={() => onCropModalOpen}
        onChange={onChange}
        {...getInputProps()}
      />
      <label
        className={`typography-caption1 cursor-pointer font-medium ${isDragAccept ? "text-accent-primary-light" : "text-content-tertiary-light"}`}
      >
        {text}
      </label>
    </div>
  );
};

export default EmptyPhotoFrame;
