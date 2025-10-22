"use client";

import TextButton from "@/components/atoms/textButton";
import { routePaths } from "@/constants/routes";
import { useRouter } from "next/navigation";
import ArrowDirectionRight from "../../../../../public/icons/ArrowDirectionRight.svg";

const HomeProfileListHeaderButton = () => {
  const router = useRouter();

  return (
    <TextButton
      type="secondary"
      size="large"
      onClick={() => {
        router.push(routePaths.profiles());
      }}
    >
      더 많은 프로필 보기
      <ArrowDirectionRight
        width="16"
        height="16"
        className="fill-current text-content-tertiary-light dark:text-content-tertiary-dark"
      />
    </TextButton>
  );
};

export default HomeProfileListHeaderButton;
