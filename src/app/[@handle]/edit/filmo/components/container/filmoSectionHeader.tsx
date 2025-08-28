"use client";

import BoxButton from "@/components/atoms/boxButton";
import Title from "@/components/atoms/title";
import InfoCircle from "../../../../../../../public/icons/InfoCircle.svg";
import Plus from "../../../../../../../public/icons/Plus.svg";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  filmoInputState,
  filmoModalState,
  filmoRepEditListState,
  filmoRepInitCountState,
  filmoRepModalState
} from "@/lib/recoil/handle/edit/filmo/atom";
import { profileDraftData } from "@/lib/recoil/handle/edit/common/atom";
import { filmoInputInit } from "../../data";

const FilmoSectionHeader = () => {
  const profileData = useRecoilValue(profileDraftData);

  const filmoList = profileData?.filmos ?? [];

  const setFilmoInputs = useSetRecoilState(filmoInputState);
  const setFilmoModal = useSetRecoilState(filmoModalState);
  const setFilmoRepModal = useSetRecoilState(filmoRepModalState);
  const setFilmoRepEditList = useSetRecoilState(filmoRepEditListState);
  const setFilmoRepInitCount = useSetRecoilState(filmoRepInitCountState);

  // 필모그래피 대표작 설정 액티브
  const onFilmoRepModalOpen = () => {
    const checkedFilmoList = filmoList.filter((filmo) => filmo.featured);
    setFilmoRepEditList(checkedFilmoList);
    setFilmoRepInitCount(checkedFilmoList.length);
    setFilmoRepModal(true);
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
      <div className="flex items-center gap-1">
        {filmoList.length >= 1 && (
          <BoxButton
            type="secondaryOutlined"
            size="small"
            onClick={onFilmoRepModalOpen}
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
    </div>
  );
};

export default FilmoSectionHeader;
