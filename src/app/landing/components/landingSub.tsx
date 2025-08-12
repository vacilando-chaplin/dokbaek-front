"use client";

import BoxButton from "@/components/atoms/boxButton";
import React, { useState } from "react";
import ArrowDirectionRight from "../../../../public/icons/ArrowDirectionRight.svg";
import { useRouter } from "next/navigation";
import LoginModal from "@/components/organisms/loginModal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { handleNameState } from "@/lib/recoil/handle/atom";
import { routePaths } from "@/constants/routes";
import { useMutation } from "@tanstack/react-query";
import { getProfileMe } from "@/lib/api";
import { loginState, toastMessage } from "@/lib/atoms";
import { setLoginProfileId } from "@/lib/utils";

const LandingSub = () => {
  const router = useRouter();
  const [loginModal, setLoginModal] = useState(false);

  const isLoggedIn = useRecoilValue(loginState);

  const setHandleName = useSetRecoilState(handleNameState);
  const setToastMessage = useSetRecoilState(toastMessage);

  const moveMyProfileMutation = useMutation({
    mutationFn: getProfileMe,
    onSuccess: (res) => {
      const data = res.data.data;

      if (data.handleId) {
        setHandleName(data.handleId);
        setLoginProfileId("loginProfileId", data.id);
        router.prefetch(routePaths.profileEditInfo(data.handleId));
        router.push(routePaths.profileEditInfo(data.handleId));
      } else {
        router.push(routePaths.profile("new"));
      }
    },
    onError: (error: any) => {
      const status = error.response?.status;

      if (status === 404) {
        router.push(routePaths.profile("new"));
      } else {
        setToastMessage("내 프로필을 불러 올 수 없어요. 다시 시도해 주세요.");
      }
    }
  });

  const onMoveProfileEdit = () => {
    if (!isLoggedIn) {
      setLoginModal(true);
      return;
    }

    moveMyProfileMutation.mutate();
  };

  return (
    <div className="relative mx-auto mt-10 flex h-60 w-full max-w-[1272px] flex-row items-center justify-between rounded-[40px] bg-[linear-gradient(to_bottom,#000000,#000003)] px-[100px]">
      <img
        src="/images/homeBannerImage.png"
        alt="homeBannerImage"
        className="absolute left-1/2 top-1/2 z-10 hidden h-[431px] w-[288px] -translate-x-1/2 -translate-y-1/2 object-contain shadow-[0_0_50px_0_rgba(0,0,0,0)] grayscale md:block"
      />
      <div
        className="absolute left-1/2 top-1/2 z-[8] hidden h-[240px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-opacity-50 bg-gradient-to-b from-static-white/30 to-static-white/0 md:block"
        style={{
          filter: "blur(50px)"
        }}
      />
      <span className="text-[40px] font-bold leading-[100%] tracking-[-1%] text-static-white">
        프로필은 독백에서
      </span>
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
      {loginModal && (
        <LoginModal onLoginModalClose={() => setLoginModal(false)} />
      )}
    </div>
  );
};

export default LandingSub;
