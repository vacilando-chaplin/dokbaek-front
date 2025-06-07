"use client";

import ArrowDirectionLeft from "../../../../../../public/icons/ArrowDirectionLeft.svg";
import BoxButton from "@/components/atoms/boxButton";
import ProgressBar from "./progressBar";
import { useRouter } from "next/navigation";
import { postProfileDraftPublish } from "../../api";
import { useRecoilValue } from "recoil";
import { profileDraftData } from "@/lib/recoil/profile/common/atom";
import { useEffect, useState } from "react";

interface BottomBarProps {
  profileId: number;
}

const BottomBar = ({ profileId }: BottomBarProps) => {
  const router = useRouter();

  const draftInfoData = useRecoilValue(profileDraftData).info;
  const [disabled, setDisabled] = useState(true);

  const onSave = async () => {
    await postProfileDraftPublish(profileId);

    router.prefetch(`/profile/${profileId}`);
    router.push(`/profile/${profileId}`);
  };

  const onBack = () => {
    router.prefetch(`/profile/${profileId}`);
    router.push(`/profile/${profileId}`);
  };

  useEffect(() => {
    if (draftInfoData) {
      const { name, gender, bornYear, contact } = draftInfoData;
      const valid =
        name !== null &&
        name.trim() !== "" &&
        gender !== null &&
        bornYear !== null &&
        String(bornYear).length === 4 &&
        contact !== null &&
        contact.length >= 9;

      setDisabled(!valid);
    }
  }, [
    draftInfoData?.name,
    draftInfoData?.bornYear,
    draftInfoData?.contact,
    draftInfoData?.gender
  ]);

  return (
    <section className="fixed bottom-0 z-50 flex h-auto w-full items-center justify-between border-t-[1px] border-border-default-light bg-background-elevated-light px-6 py-3 shadow-low dark:border-border-default-dark dark:bg-background-elevated-dark">
      <div className="flex gap-4">
        <BoxButton type="secondaryOutlined" size="medium" onClick={onBack}>
          <ArrowDirectionLeft
            width="14"
            height="14"
            className="fill-current text-content-primary-light dark:text-content-primary-dark"
          />
          돌아가기
        </BoxButton>
      </div>
      <div className="flex flex-row items-center gap-6">
        <ProgressBar />
        <BoxButton
          type="primary"
          size="medium"
          disabled={disabled}
          onClick={onSave}
        >
          프로필 저장
        </BoxButton>
      </div>
    </section>
  );
};

export default BottomBar;
