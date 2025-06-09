"use client";

import ArrowDirectionLeft from "../../../../../../public/icons/ArrowDirectionLeft.svg";
import BoxButton from "@/components/atoms/boxButton";
import ProgressBar from "./progressBar";
import { useRouter } from "next/navigation";
import { postProfileDraftPublish } from "../../api";
import { useRecoilValue } from "recoil";
import { profileDraftData } from "@/lib/recoil/profile/common/atom";
import { stepperInit } from "@/lib/atoms";
import { putInfoDraft } from "../info/api";

interface BottomBarProps {
  profileId: number;
}

const BottomBar = ({ profileId }: BottomBarProps) => {
  const router = useRouter();

  const stepper = useRecoilValue(stepperInit);
  const profileData = useRecoilValue(profileDraftData);

  const { name, gender, bornYear, contact } = profileData.info;
  const valid =
    name !== null &&
    name.trim() !== "" &&
    gender !== null &&
    bornYear !== null &&
    String(bornYear).length === 4 &&
    contact !== null &&
    contact.length >= 9;

  const onSaveInfo = async () => {
    if (stepper === 0) {
      await putInfoDraft(profileId, profileData.info);
    }
  };

  const onSave = async () => {
    await onSaveInfo();
    await postProfileDraftPublish(profileId);

    router.prefetch(`/profile/${profileId}`);
    router.push(`/profile/${profileId}`);
  };

  const onBack = async () => {
    await onSaveInfo();

    router.prefetch(`/profile/${profileId}`);
    router.push(`/profile/${profileId}`);
  };

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
          disabled={!valid}
          onClick={onSave}
        >
          프로필 저장
        </BoxButton>
      </div>
    </section>
  );
};

export default BottomBar;
