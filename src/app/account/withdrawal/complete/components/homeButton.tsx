"use client";

import BoxButton from "@/components/atoms/boxButton";
import { useRouter } from "next/navigation";

const HomeButton = () => {
  const router = useRouter();

  const onGoHome = () => {
    router.replace("/");
  };

  return (
    <div className="flex justify-center">
      <BoxButton type="primary" size="large" onClick={onGoHome}>
        첫 화면으로 가기
      </BoxButton>
    </div>
  );
};

export default HomeButton;
