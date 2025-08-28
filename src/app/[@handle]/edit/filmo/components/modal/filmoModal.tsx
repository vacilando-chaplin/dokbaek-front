"use client";

import ModalFooter from "@/components/molecules/modalFooter";
import ModalHeader from "@/components/molecules/modalHeader";
import { FilmoRequestType } from "../../types";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  filmoCategoryListState,
  filmoInputState,
  filmoModalState,
  filmoRoleListState
} from "@/lib/recoil/handle/edit/filmo/atom";
import { FilmoCategoryType, FilmoRoleType } from "@/lib/types";
import { toastMessage } from "@/lib/atoms";
import {
  deleteFilmographyThumbnail,
  postFilmography,
  postFilmographyThumbnail,
  putFilmography
} from "../../api";
import { filmoInputInit, filmoModalInit } from "../../data";
import Cookies from "js-cookie";
import { profileDraftData } from "@/lib/recoil/handle/edit/common/atom";
import { useMutation } from "@tanstack/react-query";
import FilmoModalContents from "./filmoModalContents";

const FilmoModal = () => {
  const profileId = Number(Cookies.get("loginProfileId"));

  const [profileData, setProfileData] = useRecoilState(profileDraftData);
  const [filmoModal, setFilmoModal] = useRecoilState(filmoModalState);
  const [filmoInputs, setFilmoInputs] = useRecoilState(filmoInputState);

  const filmoRoleList = useRecoilValue<FilmoRoleType[]>(filmoRoleListState);
  const filmoCategoryList = useRecoilValue<FilmoCategoryType[]>(
    filmoCategoryListState
  );

  const setToastMessage = useSetRecoilState(toastMessage);

  const onFilmoModalClose = () => {
    setFilmoModal(filmoModalInit);
    setFilmoInputs(filmoInputInit);
  };

  // 필모그래피 모달 저장 Mutation
  const useFilmographySave = () => {
    return useMutation({
      mutationFn: async ({
        profileId,
        filmo,
        thumbnail
      }: {
        profileId: number;
        filmo: FilmoRequestType;
        thumbnail: string;
      }) => {
        const filmoRes = await postFilmography(profileId, filmo);
        const filmoData = filmoRes.data;

        if (thumbnail !== "") {
          const thumbnailRes = await postFilmographyThumbnail(
            profileId,
            filmoData.id,
            thumbnail
          );
          filmoData.thumbnailPath = thumbnailRes.data.thumbnailPath;
        }

        return filmoData;
      },
      onSuccess: (filmoData) => {
        setProfileData((prev) => ({
          ...prev,
          filmos: [...prev.filmos, filmoData]
        }));
        setFilmoInputs(filmoInputInit);
        setFilmoModal(filmoModalInit);
        setToastMessage("작품 활동을 추가했어요.");
      },
      onError: () => {
        setToastMessage(
          "작품 활동 추가에 실패했어요. 잠시 후 다시 시도해 주세요."
        );
      }
    });
  };

  // 필모그래피 편집 모달 저장 Mutation
  const useFilmographyEdit = () => {
    return useMutation({
      mutationFn: async ({
        profileId,
        filmoId,
        editFilmo,
        thumbnail
      }: {
        profileId: number;
        filmoId: number;
        editFilmo: FilmoRequestType;
        thumbnail: string;
      }) => {
        const filmoRes = await putFilmography(profileId, filmoId, editFilmo);
        const filmoData = filmoRes.data;

        const findThumbnail = profileData?.filmos.find(
          (filmo) => filmo.id === filmoData.id
        );

        const checkDeletedThumbnail =
          findThumbnail?.thumbnailPath != null &&
          findThumbnail.thumbnailPath !== "" &&
          !findThumbnail.thumbnailPath.endsWith("null") &&
          filmoInputs.thumbnail === "";

        let updatedThumbnailPath = filmoData.thumbnailPath;

        if (thumbnail && thumbnail.includes("base64")) {
          if (thumbnail.endsWith("null")) {
            const thumbnailRes = await postFilmographyThumbnail(
              profileId,
              filmoData.id,
              thumbnail
            );
            updatedThumbnailPath =
              thumbnailRes?.data?.thumbnailPath || thumbnail;
          } else {
            await deleteFilmographyThumbnail(profileId, filmoData.id);
            const thumbnailRes = await postFilmographyThumbnail(
              profileId,
              filmoData.id,
              thumbnail
            );
            updatedThumbnailPath =
              thumbnailRes?.data?.thumbnailPath || thumbnail;
          }
        } else if (checkDeletedThumbnail) {
          await deleteFilmographyThumbnail(profileId, filmoData.id);
          updatedThumbnailPath = null;
        }

        return { ...filmoData, thumbnailPath: updatedThumbnailPath };
      },
      onSuccess: (filmoData) => {
        setProfileData((prev) => ({
          ...prev,
          filmos: prev.filmos.map((item) =>
            item.id === filmoData.id ? filmoData : item
          )
        }));
        setFilmoInputs(filmoInputInit);
        setFilmoModal(filmoModalInit);
        setToastMessage("작품 활동을 수정했어요.");
      },
      onError: () => {
        setToastMessage(
          "작품 활동 수정에 실패했어요. 잠시 후 다시 시도해 주세요."
        );
      }
    });
  };

  const saveFilmographyMutation = useFilmographySave();
  const editFilmographyMutation = useFilmographyEdit();

  // 필모그래피 모달 필모그래피 추가
  const onFilmographySave = () => {
    const roleId = filmoRoleList.findIndex(
      (cast: FilmoRoleType) => cast.name === filmoInputs.cast
    );
    const categoryId = filmoCategoryList.findIndex(
      (category: FilmoCategoryType) =>
        category.name === filmoInputs.classification
    );

    const filmo = {
      roleId: filmoInputs.cast ? roleId + 1 : null,
      customRole: filmoInputs.castInput,
      character: filmoInputs.casting,
      featured: false,
      production: {
        categoryId: filmoCategoryList[categoryId].id,
        productionYear: Number(filmoInputs.production),
        title: filmoInputs.title,
        description: filmoInputs.description,
        videoUrl: filmoInputs.link,
        thumbnailUrl: ""
      },
      displayOrder: 0
    };

    saveFilmographyMutation.mutate({
      profileId,
      filmo,
      thumbnail: filmoInputs.thumbnail
    });
  };

  // 필모그래피 편집 모달 필모그래피 저장
  const onFilmographyEdit = () => {
    const roleId = filmoRoleList.findIndex(
      (cast: FilmoRoleType) => cast.name === filmoInputs.cast
    );
    const categoryId = filmoCategoryList.findIndex(
      (category: FilmoCategoryType) =>
        category.name === filmoInputs.classification
    );

    const editFilmo = {
      roleId: filmoInputs.cast ? roleId + 1 : null,
      customRole: filmoInputs.castInput,
      character: filmoInputs.casting,
      featured: filmoInputs.representative ?? false,
      production: {
        categoryId: filmoCategoryList[categoryId].id,
        productionYear: Number(filmoInputs.production),
        title: filmoInputs.title,
        description: filmoInputs.description,
        videoUrl: filmoInputs.link,
        thumbnailUrl: ""
      },
      displayOrder: filmoInputs.displayOrder
    };

    editFilmographyMutation.mutate({
      profileId,
      filmoId: filmoInputs.id,
      editFilmo,
      thumbnail: filmoInputs.thumbnail
    });
  };

  return (
    filmoModal.active && (
      <section className="fixed inset-0 z-[999] flex h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 dark:bg-background-scrim-dark md:inset-0">
        <div className="interaction-default relative my-[80px] flex w-full max-w-[720px] animate-enter flex-col items-center justify-center rounded-2xl bg-background-surface-light shadow-medium dark:bg-background-surface-dark">
          <ModalHeader name={filmoModal.name} onClick={onFilmoModalClose} />
          <FilmoModalContents />
          <ModalFooter
            text={filmoModal.buttonText}
            disabled={
              filmoInputs.classification.length === 0 ||
              filmoInputs.title.length === 0
            }
            onCloseClick={onFilmoModalClose}
            onSaveClick={
              filmoModal.state === "add" ? onFilmographySave : onFilmographyEdit
            }
          />
        </div>
      </section>
    )
  );
};

export default FilmoModal;
