"use client";

import BoxButton from "@/components/atoms/boxButton";
import { useRouter } from "next/navigation";

const WithdrawalComplete = () => {
  const router = useRouter();

  const onGoHome = () => {
    router.replace("/");
  };

  return (
    <div className="flex h-auto w-full max-w-[560px] flex-col gap-10 py-20">
      <div className="typography-heading2 flex flex-col items-center justify-center font-semibold text-content-primary-light dark:text-content-primary-dark">
        <span>탈퇴가 완료되었습니다.</span>
        <span>그동안 필로그램을 이용해 주셔서 감사합니다.</span>
      </div>
      <div className="flex justify-center">
        <BoxButton type="primary" size="large" onClick={onGoHome}>
          첫 화면으로 가기
        </BoxButton>
      </div>
    </div>
  );
};

export default WithdrawalComplete;
