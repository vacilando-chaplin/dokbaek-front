"use client";

import Cookies from "js-cookie";
import BoxButton from "@/components/atoms/boxButton";
import Title from "@/components/atoms/title";
import InfoCircle from "../../../../../../../public/icons/InfoCircle.svg";
import Plus from "../../../../../../../public/icons/Plus.svg";
import { ProfileFilmoDataType } from "../../types";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  filmoInputState,
  filmoModalState,
  filmoRepActiveState,
  filmoRepEditListState
} from "@/lib/recoil/profile/filmo/atom";
import { profileDraftData } from "@/lib/recoil/profile/common/atom";
import { deleteFilmographyFeatured, putFilmographyFeatured } from "../api";
import { filmoInputInit } from "../data";
import { useMutation } from "@tanstack/react-query";
import { toastMessage } from "@/lib/atoms";

const FilmoSectionHeader = () => {
  const profileId = Number(Cookies.get("loginProfileId"));
  const profileData = useRecoilValue(profileDraftData);

  const filmoList = profileData?.filmos ?? [];

  const [filmoRepEditList, setFilmoRepEditList] = useRecoilState(
    filmoRepEditListState
  );

  const setProfileData = useSetRecoilState(profileDraftData);
  const setFilmoInputs = useSetRecoilState(filmoInputState);
  const setFilmoModal = useSetRecoilState(filmoModalState);
  const setToastMessage = useSetRecoilState(toastMessage);

  const [filmoRepActive, setFilmoRepActive] =
    useRecoilState(filmoRepActiveState);

  // 필모그래피 대표작 설정 액티브
  const onFilmoRepActive = () => {
    const checkedFilmoList = filmoList.filter((filmo) => filmo.featured);
    setFilmoRepEditList(checkedFilmoList);
    setFilmoRepActive(!filmoRepActive);
  };

  // 필모그래피 대표작 설정 취소
  const onFilmoRepCancel = () => {
    setFilmoRepEditList([]);
    setFilmoRepActive(!filmoRepActive);
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
        setFilmoRepActive(!filmoRepActive);
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

  // 필모그래피 모달 액티브
  const onFilmoModalOpen = () => {
    setFilmoModal({
      state: "add",
      active: true,
      name: "작품 활동 추가",
      buttonText: "추가"
    });
    setFilmoInputs(filmoInputInit);
  };

  return (
    <div className="flex w-full flex-row justify-between">
      <Title name="작품 활동" />
      {filmoRepActive ? (
        <div className="flex flex-row items-center gap-4">
          <label className="typography-body2 font-medium text-accent-primary-light dark:text-accent-primary-dark">
            프로필 메인에 표시할 대표작을 선택해주세요. (최대6개)
          </label>
          <div className="flex items-center gap-1">
            <BoxButton
              type="secondaryOutlined"
              size="small"
              onClick={onFilmoRepCancel}
            >
              취소
            </BoxButton>
            <BoxButton
              type="primaryOutlined"
              size="small"
              onClick={onFilmoRepSave}
            >
              완료
            </BoxButton>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          {filmoList.length >= 1 && (
            <BoxButton
              type="secondaryOutlined"
              size="small"
              onClick={onFilmoRepActive}
            >
              대표작 설정
              <InfoCircle
                width="12"
                height="12"
                className="fill-current text-content-tertiary-light dark:text-content-tertiary-dark"
              />
            </BoxButton>
          )}
          <BoxButton
            type="primaryOutlined"
            size="small"
            onClick={onFilmoModalOpen}
          >
            <Plus
              width="12"
              height="12"
              className="fill-current text-accent-primary-light dark:text-accent-primary-dark"
            />
            추가
          </BoxButton>
        </div>
      )}
    </div>
  );
};

export default FilmoSectionHeader;
