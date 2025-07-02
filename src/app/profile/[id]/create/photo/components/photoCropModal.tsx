"use client";

import ImageCropper from "@/components/molecules/imageCropper";
import ModalFooter from "@/components/molecules/modalFooter";
import ModalHeader from "@/components/molecules/modalHeader";
import Image from "next/image";
import { PhotoModalType, SelectedImagesType } from "../../../types";
import { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { toastMessage } from "@/lib/atoms";
import { patchPhoto, postPhoto } from "@/lib/api";
import { photoModalInit } from "../data";
import { profileDraftData } from "@/lib/recoil/profile/common/atom";
import { ProfilePhotoDataType } from "../../types";
import { cropDataInit } from "../../../data";
import { Coordinates } from "react-advanced-cropper";
import { CategoryKey } from "../types";
import Cookies from "js-cookie";
import X from "../../../../../../../public/icons/X.svg";

interface PhotoCropModalProps {
  cropImage: string;
  cropModal: PhotoModalType;
  selectImage: string;
  selectedImages: SelectedImagesType[];
  setCropModal: React.Dispatch<React.SetStateAction<PhotoModalType>>;
  setCropImage: React.Dispatch<React.SetStateAction<string>>;
  setSelectImage: React.Dispatch<React.SetStateAction<string>>;
  setSelectedImages: React.Dispatch<React.SetStateAction<SelectedImagesType[]>>;
  onCropModalClose: React.MouseEventHandler<HTMLButtonElement>;
}

const PhotoCropModal = ({
  cropImage,
  cropModal,
  selectImage,
  selectedImages,
  setCropModal,
  setCropImage,
  setSelectImage,
  setSelectedImages,
  onCropModalClose
}: PhotoCropModalProps) => {
  const profileId = Number(Cookies.get("loginProfileId"));
  const setToastMessage = useSetRecoilState(toastMessage);
  const setProfileData = useSetRecoilState(profileDraftData);

  const [selectedPhotoId, setSelectedPhotoId] = useState(0);
  const [cropData, setCropData] = useState<Coordinates | null>(cropDataInit);

  // 모달에서 사진 여러개 업로드 시 사진 선택
  const onSelectImage = (index: number) => {
    const updateImages = [...selectedImages];
    updateImages[selectedPhotoId] = {
      id: selectedImages[selectedPhotoId].id,
      origin: selectedImages[selectedPhotoId].origin,
      preview: cropImage,
      originImage: selectImage,
      cropData: cropData
    };
    setSelectedImages(updateImages);
    setSelectedPhotoId(index);

    const image = selectedImages[index].originImage;
    const cropedImage = selectedImages[index].preview;
    const coordinates = selectedImages[index].cropData;

    setCropData(coordinates);
    setCropImage(cropedImage);
    setSelectImage(image);
  };

  const onRemoveImage = (indexToRemove: number) => {
    setSelectedImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  // 사진 추가 모달 저장
  const onAddPhoto = async () => {
    const photoList: ProfilePhotoDataType[] = [];
    if (selectedImages.length > 1) {
      for (const [index, images] of selectedImages.entries()) {
        const result = await postPhoto(
          profileId,
          images.origin,
          selectedPhotoId === index ? cropImage : images.preview,
          cropModal.category === "photos" ? "photo" : "stillcut"
        );
        photoList.push(result.data);
      }
    } else {
      const result = await postPhoto(
        profileId,
        selectedImages[0].origin,
        cropImage,
        cropModal.category === "photos" ? "photo" : "stillcut"
      );
      photoList.push(result.data);
    }

    setProfileData((prev) => ({
      ...prev,
      [cropModal.category]: photoList
    }));

    setCropModal(photoModalInit);
    setSelectImage("");
    setCropImage("");
    setToastMessage("사진을 추가했어요.");
  };

  // 사진 편집 모달 완료
  const onEditPhoto = async () => {
    const updatedPhoto = await patchPhoto(
      profileId,
      cropImage,
      cropModal.id,
      cropModal.category === "photos" ? "photo" : "stillcut"
    );

    if (cropModal.category === "photos" || cropModal.category === "stillCuts") {
      const key = cropModal.category as CategoryKey;
      setProfileData((prev) => ({
        ...prev,
        [key]: prev[key].map((item) =>
          item.id === cropModal.id ? updatedPhoto.data : item
        )
      }));
    }

    setCropModal(photoModalInit);
    setSelectImage("");
    setCropImage("");
    setToastMessage("사진을 수정했어요.");
  };

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isMouseDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (scrollRef.current) {
      isMouseDown.current = true;
      startX.current = e.pageX - scrollRef.current.offsetLeft;
      scrollLeft.current = scrollRef.current.scrollLeft;
      scrollRef.current.style.cursor = "grabbing";
      scrollRef.current.style.userSelect = "none";
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX.current;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => {
    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab";
      scrollRef.current.style.userSelect = "auto";
    }
    isMouseDown.current = false;
  };

  const onMouseLeave = () => {
    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab";
      scrollRef.current.style.userSelect = "auto";
    }
    isMouseDown.current = false;
  };

  return (
    <section className="fixed inset-0 z-[999] flex h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 dark:bg-background-scrim-dark md:inset-0">
      <div className="interaction-default relative flex h-auto max-h-[88vh] w-full max-w-[720px] animate-enter flex-col items-center justify-center rounded-2xl bg-background-surface-light shadow-medium dark:bg-background-surface-dark">
        <ModalHeader name={cropModal.name} onClick={onCropModalClose} />
        <div
          className={`flex w-full flex-col items-center justify-center ${selectedImages.length >= 2 ? "h-[60vh] max-h-[60vh]" : "h-[70vh] max-h-[70vh]"}`}
        >
          <ImageCropper
            cropData={selectedImages[selectedPhotoId].cropData}
            cropType={cropModal.category}
            selectImage={selectImage}
            setCropData={setCropData}
            setCropImage={setCropImage}
          />
        </div>
        {selectedImages.length >= 2 && (
          <div
            className="no-scrollbar flex w-full flex-row overflow-x-auto overflow-y-hidden px-2 py-4"
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
          >
            {selectedImages.map((images: SelectedImagesType, index: number) => {
              return (
                <div
                  key={images.id}
                  tabIndex={0}
                  className="group relative mx-2 h-20 w-14 shrink-0 cursor-pointer"
                  onClick={() => onSelectImage(index)}
                >
                  <Image
                    src={images.originImage}
                    alt={`originImage${index}`}
                    layout="fill"
                    priority
                  />
                  <button
                    className="absolute right-1 top-1 h-auto w-auto rounded-md border border-border-default-light bg-background-surface-light p-1 opacity-0 outline-none transition-opacity group-hover:opacity-100 dark:border-border-default-dark dark:bg-background-surface-dark"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); // 부모의 onClick 이벤트 방지
                      onRemoveImage(index);
                    }}
                  >
                    <X
                      width="12"
                      height="12"
                      className="fill-current text-state-negative-light dark:text-state-negative-dark"
                    />
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <ModalFooter
          text={cropModal.buttonText}
          disabled={selectImage.length === 0}
          onCloseClick={onCropModalClose}
          onSaveClick={cropModal.state === "add" ? onAddPhoto : onEditPhoto}
        />
      </div>
    </section>
  );
};

export default PhotoCropModal;
