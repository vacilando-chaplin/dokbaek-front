"use client";

import TextArea from "@/components/atoms/textArea";
import Title from "@/components/atoms/title";
import { useRecoilState } from "recoil";
import { profileDraftData } from "@/lib/recoil/handle/edit/common/atom";
import { useMutation } from "@tanstack/react-query";
import { ProfileInfoDataType } from "../../types";
import { putInfoDraft } from "../api";

interface IntroductionProps {
  profileId: number;
}

const Introduction = ({ profileId }: IntroductionProps) => {
  const [profileData, setProfileData] = useRecoilState(profileDraftData);

  const { introduction } = profileData.info ?? {};

  const { mutate } = useMutation({
    mutationFn: (newInfo: ProfileInfoDataType) =>
      putInfoDraft(profileId, newInfo),
    onMutate: (newInfo) => {
      setProfileData((prev) => ({
        ...prev,
        info: {
          ...prev.info,
          info: newInfo
        }
      }));
    }
  });

  // 자기소개 저장
  const onSaveInfo = () => {
    mutate(profileData.info);
  };

  // 문자열, 숫자 상관없는 입력
  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      info: {
        ...profileData.info,
        [name]: value
      }
    }));
  };

  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8 dark:bg-background-surface-dark">
      <Title name="자기 소개" />
      <TextArea
        size="medium"
        name="introduction"
        value={introduction ?? ""}
        limit={500}
        placeholder="자기소개를 입력해주세요."
        onChange={onInputChange}
        onSave={onSaveInfo}
      />
    </section>
  );
};

export default Introduction;
