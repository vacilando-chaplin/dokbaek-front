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
    <div className="mx-[auto] mt-[40px] flex w-[100%] flex-col rounded-2xl">
      <div
        className="relative h-[240px] px-[100px]"
        style={{
          background:
            "linear-gradient(275.85deg, rgba(30, 133, 239, 0.08) 0%, rgba(99, 123, 255, 0.08) 100%)",
          borderRadius: "40px"
        }}
      >
        <div className="">
          <div className="absolute top-[80px]">
            <p
              style={{ lineHeight: "40px" }}
              className="text-display font-bold text-accent-primary-light dark:text-accent-primary-dark"
            >
              프로필은
            </p>
          </div>
          <div className="absolute left-[169px] top-[120px]">
            <p
              style={{ lineHeight: "40px" }}
              className="text-display font-bold text-accent-primary-light dark:text-accent-primary-dark"
            >
              독백
            </p>
          </div>
        </div>
        <div className="absolute right-[100px] top-[95px]">
          <BoxButton onClick={onMoveProfileEdit} type="primary" size="large">
            프로필 만들기
            <ArrowDirectionRight
              width="16"
              height="16"
              className="fill-current text-content-on_color-light dark:text-content-on_color-dark"
            />
          </BoxButton>
        </div>
      </div>
      {loginModal && (
        <LoginModal onLoginModalClose={() => setLoginModal(false)} />
      )}
    </div>
  );
};

export default LandingSub;
