"use client";

import ArrowDirectionLeft from "../../../../../public/icons/ArrowDirectionLeft.svg";
import BoxButton from "@/components/atoms/boxButton";
import ProgressBar from "./progressBar";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { profileDraftData } from "@/lib/recoil/handle/edit/common/atom";
import { putInfoDraft } from "../info/api";
import { postProfileDraftPublish } from "../../api";
import { routePaths } from "@/constants/routes";
import { handleNameState } from "@/lib/recoil/handle/atom";

interface BottomBarProps {
  profileId: number;
}

const BottomBar = ({ profileId }: BottomBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const profileData = useRecoilValue(profileDraftData);
  const handleName = useRecoilValue(handleNameState);

  const { name, gender, bornYear, contact } = profileData.info;
  const valid =
    name !== null &&
    name.trim() !== "" &&
    gender !== null &&
    bornYear !== null &&
    String(bornYear).length === 4 &&
    contact !== null &&
    contact.length >= 9;

  const profileURL = routePaths.profile(handleName);

  const onSaveInfo = async () => {
    if (pathname.endsWith("/info") && profileData?.info) {
      await putInfoDraft(profileId, profileData.info);
    }
  };

  const onSave = async () => {
    await onSaveInfo();
    await postProfileDraftPublish(profileId);

    router.prefetch(profileURL);
    router.push(profileURL);
  };

  const onBack = async () => {
    await onSaveInfo();

    router.prefetch(profileURL);
    router.push(profileURL);
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
