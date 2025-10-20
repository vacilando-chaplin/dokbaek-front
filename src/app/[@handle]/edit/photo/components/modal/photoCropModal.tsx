"use client";

import ImageCropper from "@/components/molecules/imageCropper";
import ModalFooter from "@/components/molecules/modalFooter";
import ModalHeader from "@/components/molecules/modalHeader";
import Image from "next/image";
import {
  Coordinates,
  PhotoModalType,
  SelectedImagesType
} from "../../../../types";
import { useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { toastMessage } from "@/lib/atoms";
import { categoryMap, photoModalInit } from "../../data";
import { profileDraftData } from "@/lib/recoil/handle/edit/common/atom";
import {
  ProfilePhotoDataType,
  ProfileRecentPhotoDataType
} from "../../../types";
import { CategoryKey, RecentPhotoCategory } from "../../types";
import Cookies from "js-cookie";
import X from "../../../../../../../public/icons/X.svg";
import {
  cropImageState,
  cropModalState,
  recentPhotoTypeState,
  selectedImageIdState,
  selectedImagesState,
  selectImageState
} from "@/lib/recoil/handle/edit/photo/atom";
import {
  patchPhoto,
  postPhoto,
  postRecentPhoto,
  postRecentPhotoEdit
} from "../../api";
import { useMutation } from "@tanstack/react-query";
import { cropDataInit } from "../../../../data";

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
  const [selectedPhotoId, setSelectedPhotoId] =
    useRecoilState<number>(selectedImageIdState);

  // 사진 추가 모달 닫기
  const onCropModalClose = () => {
    setCropImage("");
    setSelectImage("");
    setSelectedImages([]);
    setCropModal(photoModalInit);
    setSelectedPhotoId(0);
    setRecentPhotoType("");
  };

  // 모달에서 사진 여러개 업로드 시 사진 선택
  const onSelectImage = (id: number) => {
    const index = selectedImages.findIndex((item) => item.id === id);
    const selectedIndexToUpdate = selectedImages.findIndex(
      (item) => item.id === selectedPhotoId
    );

    const updateImages = [...selectedImages];

    if (selectedIndexToUpdate !== -1 && cropImage) {
      updateImages[selectedIndexToUpdate] = {
        ...updateImages[selectedIndexToUpdate],
        preview: cropImage
      };
    }

    const currentImage = updateImages[index];

    setSelectedImages(updateImages);
    setSelectedPhotoId(id);
    setCropImage(currentImage.preview || currentImage.origin);
    setSelectImage(currentImage.originImage || currentImage.origin);
  };

  const onRemoveImage = (id: number) => {
    const findImageIndex = selectedImages.findIndex((image) => image.id === id);
    let newImageItem = selectedImages[findImageIndex];

    if (findImageIndex === selectedImages.length - 1) {
      newImageItem = selectedImages[findImageIndex - 1];
    }

    if (findImageIndex === 0) {
      newImageItem = selectedImages[1];
    }

    const updatedImages = selectedImages.filter((item) => item.id !== id);

    setSelectedImages(updatedImages);
    setSelectImage(newImageItem.originImage);
    setCropImage(newImageItem.preview);
    setSelectedPhotoId(newImageItem.id);
  };

  // 사진 추가
  const useAddPhotoMutation = () => {
    return useMutation({
      mutationFn: async ({
        profileId,
        selectedImages,
        category,
        recentPhotoType
      }: {
        profileId: number;
        selectedImages: SelectedImagesType[];
        category: CategoryKey;
        recentPhotoType: RecentPhotoCategory;
      }) => {
        const photoList: ProfilePhotoDataType[] | ProfileRecentPhotoDataType[] =
          [];

        if (selectedImages.length > 1) {
          if (category === "photos" || category === "stillCuts") {
            for (const images of selectedImages.values()) {
              const imageToUpload = images.preview || images.origin;
              const result = await postPhoto(
                profileId,
                images.origin,
                imageToUpload,
                categoryMap[category]
              );
              photoList.push(result.data);
            }
          }
        } else {
          if (recentPhotoType !== "") {
            const imageToUpload =
              selectedImages[0].preview || selectedImages[0].origin;
            const result = await postRecentPhoto(
              profileId,
              selectedImages[0].origin,
              imageToUpload,
              recentPhotoType
            );
            photoList.push(result.data);
          } else if (category === "photos" || category === "stillCuts") {
            const imageToUpload =
              selectedImages[0].preview || selectedImages[0].origin;
            const result = await postPhoto(
              profileId,
              selectedImages[0].origin,
              imageToUpload,
              categoryMap[category]
            );
            photoList.push(result.data);
          }
        }

        return { photoList, category };
      },
      onSuccess: ({ photoList, category }) => {
        setProfileData((prev) => ({
          ...prev,
          [category]: [...(prev[category] ?? []), ...photoList]
        }));

        setCropModal(photoModalInit);
        setRecentPhotoType("");
        setSelectImage("");
        setCropImage("");
        setSelectedPhotoId(0);
        setSelectedImages([]);
        setToastMessage("사진을 추가했어요.");
      },
      onError: () => {
        setToastMessage("사진 추가에 실패했어요.");
      }
    });
  };

  // 사진 편집
  const useEditPhotoMutation = () => {
    return useMutation({
      mutationFn: async ({
        profileId,
        cropImage,
        cropModal
      }: {
        profileId: number;
        cropImage: string;
        cropModal: PhotoModalType;
      }) => {
        const category = cropModal.category as CategoryKey;

        if (category === "recentPhotos") {
          const updatedPhoto = await postRecentPhotoEdit(
            profileId,
            cropImage,
            cropModal.id
          );
          return {
            updatedPhoto: updatedPhoto.data,
            category,
            id: cropModal.id
          };
        } else if (category === "photos" || category === "stillCuts") {
          const updatedPhoto = await patchPhoto(
            profileId,
            cropImage,
            cropModal.id,
            categoryMap[category]
          );
          return {
            updatedPhoto: updatedPhoto.data,
            category,
            id: cropModal.id
          };
        }
        throw new Error(`지원하지 않는 카테고리입니다: ${category}`);
      },
      onSuccess: ({ updatedPhoto, category, id }) => {
        setProfileData((prev) => ({
          ...prev,
          [category]: prev[category].map((item) =>
            item.id === id ? updatedPhoto : item
          )
        }));

        setCropModal(photoModalInit);
        setSelectImage("");
        setCropImage("");
        setToastMessage("사진을 수정했어요.");
      },
      onError: () => {
        setToastMessage("사진 수정에 실패했어요.");
      }
    });
  };

  const onAddPhotoMutation = useAddPhotoMutation();
  const onEditPhotoMutation = useEditPhotoMutation();

  const onCropSaveClick = () => {
    if (cropModal.state === "add") {
      onAddPhotoMutation.mutate({
        profileId,
        selectedImages,
        category: cropModal.category as CategoryKey,
        recentPhotoType
      });
    } else if (cropModal.state === "edit") {
      onEditPhotoMutation.mutate({
        profileId,
        cropImage,
        cropModal
      });
    }
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

  const setCropData = (newCropData: Coordinates) => {
    const selectedIndex = selectedImages.findIndex(
      (item) => item.id === selectedPhotoId
    );

    setSelectedImages((prev) => {
      const updated = [...prev];
      updated[selectedIndex] = {
        ...updated[selectedIndex],
        cropData: newCropData
      };
      return updated;
    });
  };

  const setCroppedImage = (newImage: string) => {
    const selectedIndex = selectedImages.findIndex(
      (item) => item.id === selectedPhotoId
    );
    if (selectedIndex !== -1) {
      setSelectedImages((prev) => {
        const updated = [...prev];
        updated[selectedIndex] = {
          ...updated[selectedIndex],
          preview: newImage
        };
        return updated;
      });

      setCropImage(newImage);
    }
  };

  return (
    cropModal.active &&
    selectedImages?.length >= 1 && (
      <section className="fixed inset-0 z-[999] flex h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 dark:bg-background-scrim-dark md:inset-0">
        <div className="interaction-default relative flex h-auto max-h-[88vh] w-full max-w-[720px] animate-enter flex-col items-center justify-center rounded-2xl bg-background-surface-light shadow-medium dark:bg-background-surface-dark">
          <ModalHeader name={cropModal.name} onClick={onCropModalClose} />
          <div
            className={`flex w-full flex-col items-center justify-center ${selectedImages.length >= 2 ? "h-[60vh] max-h-[60vh]" : "h-[70vh] max-h-[70vh]"}`}
          >
            <ImageCropper
              cropData={
                selectedImages[
                  selectedImages.findIndex(
                    (item) => item.id === selectedPhotoId
                  )
                ]?.cropData ?? cropDataInit
              }
              cropType={cropModal.category}
              selectImage={selectImage}
              setCropData={setCropData}
              setCropImage={(img: string) => {
                setCroppedImage(img);
              }}
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
                      loading="lazy"
                      unoptimized={true}
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
            disabled={
              selectImage === "" ||
              onAddPhotoMutation.isPending ||
              onEditPhotoMutation.isPending
            }
            onCloseClick={onCropModalClose}
            onSaveClick={onCropSaveClick}
          />
        </div>
      </section>
    )
  );
};

export default PhotoCropModal;
