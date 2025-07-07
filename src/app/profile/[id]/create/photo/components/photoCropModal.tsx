"use client";

import ImageCropper from "@/components/molecules/imageCropper";
import ModalFooter from "@/components/molecules/modalFooter";
import ModalHeader from "@/components/molecules/modalHeader";
import Image from "next/image";
import { SelectedImagesType } from "../../../types";
import { useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { toastMessage } from "@/lib/atoms";
import { patchPhoto, postPhoto } from "@/lib/api";
import { categoryMap, photoModalInit } from "../data";
import { profileDraftData } from "@/lib/recoil/profile/common/atom";
import { ProfilePhotoDataType, ProfileRecentPhotoDataType } from "../../types";
import { cropDataInit } from "../../../data";
import { Coordinates } from "react-advanced-cropper";
import { CategoryKey } from "../types";
import Cookies from "js-cookie";
import X from "../../../../../../../public/icons/X.svg";
import {
  cropImageState,
  cropModalState,
  recentPhotoTypeState,
  selectedImagesState,
  selectImageState
} from "@/lib/recoil/profile/photo/atom";
import { postRecentPhoto, postRecentPhotoEdit } from "../api";

const PhotoCropModal = () => {
  const profileId = Number(Cookies.get("loginProfileId"));
  const setToastMessage = useSetRecoilState(toastMessage);
  const setProfileData = useSetRecoilState(profileDraftData);

  const [cropModal, setCropModal] = useRecoilState(cropModalState);
  const [selectImage, setSelectImage] = useRecoilState(selectImageState);
  const [cropImage, setCropImage] = useRecoilState(cropImageState);
  const [selectedImages, setSelectedImages] =
    useRecoilState(selectedImagesState);
  const [recentPhotoType, setRecentPhotoType] =
    useRecoilState(recentPhotoTypeState);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPhotoId, setSelectedPhotoId] = useState(0);
  const [cropData, setCropData] = useState<Coordinates | null>(cropDataInit);

  // 사진 추가 모달 닫기
  const onCropModalClose = () => {
    setCropImage("");
    setSelectImage("");
    setSelectedImages([]);
    setCropModal(photoModalInit);
    setSelectedIndex(0);
    setSelectedPhotoId(0);
    setRecentPhotoType("");
  };

  // 모달에서 사진 여러개 업로드 시 사진 선택
  const onSelectImage = (id: number) => {
    const selectedIndex = selectedImages.findIndex((item) => item.id === id);
    if (selectedIndex === -1) {
      setToastMessage("선택한 이미지를 찾을 수 없습니다.");
      return;
    }

    setSelectedIndex(selectedIndex);
    setSelectedPhotoId(id);

    const currentImage = selectedImages[selectedIndex];

    const image = currentImage.originImage;
    const cropedImage = currentImage.preview;
    const coordinates = currentImage.cropData;

    setCropData(coordinates);
    setCropImage(cropedImage);
    setSelectImage(image);
  };

  const onRemoveImage = (id: number) => {
    setSelectedImages((prev) => {
      const updatedImages = prev.filter((item) => item.id !== id);

      const currentSelectedImage = prev[selectedIndex];
      const newSelectedIndex = updatedImages.findIndex(
        (img) => img.id === currentSelectedImage?.id
      );

      if (newSelectedIndex === -1 || selectedIndex >= updatedImages.length) {
        setSelectedIndex(Math.max(0, updatedImages.length - 1));
      } else {
        setSelectedIndex(newSelectedIndex);
      }

      return updatedImages;
    });
  };

  // 사진 추가 모달 저장
  const onAddPhoto = async () => {
    const photoList: ProfilePhotoDataType[] | ProfileRecentPhotoDataType[] = [];
    const category = cropModal.category as CategoryKey;

    if (selectedImages.length > 1) {
      if (category === "photos" || category === "stillCuts") {
        for (const [index, images] of selectedImages.entries()) {
          const result = await postPhoto(
            profileId,
            images.origin,
            selectedPhotoId === index ? cropImage : images.preview,
            categoryMap[category]
          );
          photoList.push(result.data);
        }
      }
    } else {
      if (recentPhotoType !== "") {
        const result = await postRecentPhoto(
          profileId,
          selectedImages[0].origin,
          cropImage,
          recentPhotoType
        );
        photoList.push(result.data);
      } else if (category === "photos" || category === "stillCuts") {
        const result = await postPhoto(
          profileId,
          selectedImages[0].origin,
          cropImage,
          categoryMap[category]
        );
        photoList.push(result.data);
      }
    }

    setProfileData((prev) => ({
      ...prev,
      [category]: [...(prev[category] ?? []), ...photoList]
    }));

    setCropModal(photoModalInit);
    setRecentPhotoType("");
    setSelectImage("");
    setCropImage("");
    setSelectedImages([]);
    setToastMessage("사진을 추가했어요.");
  };

  // 사진 편집 모달 완료
  const onEditPhoto = async () => {
    const category = cropModal.category as CategoryKey;

    if (category === "recentPhotos") {
      const updatedPhoto = await postRecentPhotoEdit(
        profileId,
        cropImage,
        cropModal.id
      );

      setProfileData((prev) => ({
        ...prev,
        [category]: prev[category].map((item) =>
          item.id === cropModal.id ? updatedPhoto.data : item
        )
      }));
    } else if (category === "photos" || category === "stillCuts") {
      const updatedPhoto = await patchPhoto(
        profileId,
        cropImage,
        cropModal.id,
        categoryMap[category]
      );

      setProfileData((prev) => ({
        ...prev,
        [category]: prev[category].map((item) =>
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
    <>
      {cropModal.active && selectedImages?.length >= 1 && (
        <section className="fixed inset-0 z-[999] flex h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 dark:bg-background-scrim-dark md:inset-0">
          <div className="interaction-default relative flex h-auto max-h-[88vh] w-full max-w-[720px] animate-enter flex-col items-center justify-center rounded-2xl bg-background-surface-light shadow-medium dark:bg-background-surface-dark">
            <ModalHeader name={cropModal.name} onClick={onCropModalClose} />
            <div
              className={`flex w-full flex-col items-center justify-center ${selectedImages.length >= 2 ? "h-[60vh] max-h-[60vh]" : "h-[70vh] max-h-[70vh]"}`}
            >
              <ImageCropper
                cropData={selectedImages[selectedIndex].cropData}
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
                {selectedImages.map((images: SelectedImagesType) => {
                  return (
                    <div
                      key={images.id}
                      tabIndex={0}
                      className="group relative mx-2 h-20 w-14 shrink-0 cursor-pointer"
                      onClick={() => onSelectImage(images.id)}
                    >
                      <Image
                        src={images.originImage}
                        alt="originImage"
                        layout="fill"
                        priority
                      />
                      {selectedPhotoId !== images.id && (
                        <button
                          className="absolute right-1 top-1 h-auto w-auto rounded-md border border-border-default-light bg-background-surface-light p-0.5 opacity-0 outline-none transition-opacity group-hover:opacity-100 dark:border-border-default-dark dark:bg-background-surface-dark"
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveImage(images.id);
                          }}
                        >
                          <X
                            width="12"
                            height="12"
                            className="fill-current text-state-negative-light dark:text-state-negative-dark"
                          />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            <ModalFooter
              text={cropModal.buttonText}
              disabled={selectImage === ""}
              onCloseClick={onCropModalClose}
              onSaveClick={cropModal.state === "add" ? onAddPhoto : onEditPhoto}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default PhotoCropModal;
