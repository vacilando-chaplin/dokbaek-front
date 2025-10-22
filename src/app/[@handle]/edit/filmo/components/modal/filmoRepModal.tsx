"use client";

import ModalHeader from "@/components/molecules/modalHeader";
import {
  filmoRepEditListState,
  filmoRepInitCountState,
  filmoRepModalState
} from "@/lib/recoil/handle/edit/filmo/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useMutation } from "@tanstack/react-query";
import { ProfileFilmoDataType } from "../../../types";
import { deleteFilmographyFeatured, putFilmographyFeatured } from "../../api";
import { profileDraftData } from "@/lib/recoil/handle/edit/common/atom";
import Cookies from "js-cookie";
import { toastMessage } from "@/lib/atoms";
import FilmoRepModalContents from "./filmoRepModalContents";
import FilmoRepModalFooter from "./filmoRepModalFooter";

const FilmoRepModal = () => {
  const profileId = Number(Cookies.get("loginProfileId"));

  const [profileData, setProfileData] = useRecoilState(profileDraftData);
  const [filmoRepModal, setFilmoRepModal] = useRecoilState(filmoRepModalState);
  const [filmoRepEditList, setFilmoRepEditList] = useRecoilState(
    filmoRepEditListState
  );
  const [filmoRepInitCount, setFilmoRepInitCount] = useRecoilState(
    filmoRepInitCountState
  );

  const setToastMessage = useSetRecoilState(toastMessage);

  const filmoList = profileData?.filmos ?? [];

  const onFilmoModalClose = () => {
    setFilmoRepEditList([]);
    setFilmoRepInitCount(0);
    setFilmoRepModal(false);
  };

  const useFilmoRepSaveMutation = () => {
    return useMutation({
      mutationFn: async ({
        profileId,
        filmoList,
        filmoRepEditList
      }: {
        profileId: number;
        filmoList: ProfileFilmoDataType[];
        filmoRepEditList: ProfileFilmoDataType[];
      }) => {
        const updatedFilmoList = [];

        for (const filmo of filmoList) {
          const findFilmo = filmoRepEditList.findIndex(
            (item) => item.id === filmo.id
          );

          if (filmo.featured && findFilmo === -1) {
            await deleteFilmographyFeatured(profileId, filmo.id);
            updatedFilmoList.push({ id: filmo.id, featured: false });
          } else if (!filmo.featured && findFilmo >= 0) {
            await putFilmographyFeatured(profileId, filmo.id);
            updatedFilmoList.push({
              id: filmo.id,
              featured: true
            });
          }
        }

        return updatedFilmoList;
      },
      onSuccess: (updatedFilmoList) => {
        setProfileData((prev) => ({
          ...prev,
          filmos: prev.filmos.map((filmo) => {
            const updatedFilmo = updatedFilmoList.find(
              (updated) => updated.id === filmo.id
            );
            if (updatedFilmo) {
              return { ...filmo, featured: updatedFilmo.featured };
            }
            return filmo;
          })
        }));
        setFilmoRepEditList([]);
        setFilmoRepInitCount(0);
        setFilmoRepModal(false);
        setToastMessage("대표작을 설정했어요.");
      },
      onError: () => {
        setToastMessage("대표작 변경에 실패했어요. 다시 시도해 주세요.");
      }
    });
  };

  const updateMutation = useFilmoRepSaveMutation();

  // 필모그래피 대표작 설정 완료
  const onFilmoRepSave = () => {
    updateMutation.mutate({
      profileId,
      filmoList,
      filmoRepEditList
    });
  };

  return (
    filmoRepModal && (
      <section className="fixed inset-0 z-[999] flex h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 dark:bg-background-scrim-dark md:inset-0">
        <div className="interaction-default relative my-[80px] flex max-h-[80vh] w-full max-w-[1024px] animate-enter flex-col items-center justify-center rounded-2xl bg-background-surface-light shadow-medium dark:bg-background-surface-dark">
          <ModalHeader
            name="프로필 메인에 표시할 대표작을 선택해주세요. (최대 6개)"
            onClick={onFilmoModalClose}
          />
          <FilmoRepModalContents />
          <FilmoRepModalFooter
            text="완료"
            count={filmoRepEditList.length}
            disabled={filmoRepInitCount === 0 && filmoRepEditList.length === 0}
            onCloseClick={onFilmoModalClose}
            onSaveClick={onFilmoRepSave}
          />
        </div>
      </section>
    )
  );
};

export default FilmoRepModal;
