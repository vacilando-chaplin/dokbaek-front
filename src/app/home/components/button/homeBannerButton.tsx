"use client";

import BoxButton from "@/components/atoms/boxButton";
import ArrowDirectionRight from "../../../../../public/icons/ArrowDirectionRight.svg";
import { useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { handleNameState } from "@/lib/recoil/handle/atom";
import { loginState, toastMessage } from "@/lib/atoms";
import { setLoginProfileId } from "@/lib/utils";
import { routePaths } from "@/constants/routes";
import { ProfileDraftDataType } from "@/app/[@handle]/edit/types";
import { homeLoginModalState } from "@/lib/recoil/home/atom";

interface HomeBannerButtonProps {
  myProfileData: ProfileDraftDataType | null;
}

const HomeBannerButton = ({ myProfileData }: HomeBannerButtonProps) => {
  const router = useRouter();

  const isLoggedIn = useRecoilValue(loginState);

  const setLoginModal = useSetRecoilState(homeLoginModalState);
  const setHandleName = useSetRecoilState(handleNameState);
  const setToastMessage = useSetRecoilState(toastMessage);

  const onMoveProfileEdit = () => {
    if (!isLoggedIn) {
      setLoginModal(true);
      return;
    }

    if (!myProfileData) {
      setToastMessage("내 프로필을 불러 올 수 없어요. 다시 시도해 주세요.");
      return;
    }

    if (myProfileData.handleId) {
      setHandleName(myProfileData.handleId);
      setLoginProfileId("loginProfileId", String(myProfileData.id));
      router.prefetch(routePaths.profileEditInfo(myProfileData.handleId));
      router.push(routePaths.profileEditInfo(myProfileData.handleId));
    } else {
      router.push(routePaths.createProfile());
    }
  };

  return (
    <BoxButton
      type="secondaryOutlined"
      size="large"
      onClick={onMoveProfileEdit}
    >
      프로필 만들기
      <ArrowDirectionRight
        width="16"
        height="16"
        className="fill-current text-content-primary-light dark:text-content-primary-dark"
      />
    </BoxButton>
  );
};

export default HomeBannerButton;
