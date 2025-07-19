"use client";

import BoxButton from "@/components/atoms/boxButton";
import Tooltip from "@/components/atoms/tooltip";
import { toastMessage } from "@/lib/atoms";
import { isMyProfileState, profileViewState } from "@/lib/recoil/handle/atom";
import { ProfilePathType } from "@/lib/types";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Download from "../../../../../public/icons/Download.svg";
import Copy from "../../../../../public/icons/Copy.svg";
import Edit from "../../../../../public/icons/Edit.svg";

const ProfileActionButtonContainer = () => {
  const loginProfileId = Number(Cookies.get("loginProfileId"));
  const router = useRouter();

  const profileData = useRecoilValue(profileViewState);
  const isMyProfile = useRecoilValue(isMyProfileState);

  const setToastMessage = useSetRecoilState(toastMessage);

  const { bornYear, contact } = profileData?.info || {};

  const onCopyUrl = async () => {
    const copyUrl = `https://filogram.my/profile/${loginProfileId}`;
    try {
      setToastMessage("프로필 링크를 복사 했어요.");
      await navigator.clipboard.writeText(copyUrl);
    } catch (error) {
      throw error;
    }
  };

  const onDownloadPDF = () => {
    const PDFUrl = `https://filogram.my/api/pdf/v1/profile/${loginProfileId}`;
    window.open(PDFUrl, "_blank");
  };

  const onMoveToCreate = async (path: ProfilePathType) => {
    router.prefetch(`/profile/${loginProfileId}/create/${path}}`);
    router.push(`/profile/${loginProfileId}/create/${path}`);
  };

  return isMyProfile ? (
    <div className="relative grid h-auto w-full grid-cols-3 flex-row items-center justify-between gap-2">
      <BoxButton type="secondaryOutlined" size="medium" onClick={onDownloadPDF}>
        <Download
          width="14"
          height="14"
          className="fill-current text-content-primary-light dark:text-content-primary-dark"
        />
        PDF 다운로드
      </BoxButton>
      <BoxButton type="secondaryOutlined" size="medium" onClick={onCopyUrl}>
        <Copy
          width="14"
          height="14"
          className="fill-current text-content-primary-light dark:text-content-primary-dark"
        />
        링크 복사
      </BoxButton>
      <div className="relative flex justify-center">
        <button
          type="button"
          className="interaction-default typography-body3 flex h-auto w-full items-center justify-center gap-1.5 rounded-xl border border-border-default-light bg-background-surface-light px-5 py-[11px] font-medium text-content-primary-light outline-none hover:brightness-[97%] active:brightness-[94%] dark:border-border-default-dark dark:bg-background-surface-dark dark:text-content-primary-dark"
          onClick={() => onMoveToCreate("info")}
        >
          <Edit
            width="14"
            height="14"
            className="fill-current text-content-primary-light dark:text-content-primary-dark"
          />
          프로필 편집
        </button>
        {(bornYear === 0 || contact === null) && (
          <div className="absolute -top-10">
            <Tooltip placement="top" text="프로필을 완성하세요." />
          </div>
        )}
      </div>
    </div>
  ) : (
    <BoxButton type="secondaryOutlined" size="medium" onClick={onCopyUrl}>
      <Copy
        width="14"
        height="14"
        className="fill-current text-content-primary-light dark:text-content-primary-dark"
      />
      링크 복사
    </BoxButton>
  );
};

export default ProfileActionButtonContainer;
