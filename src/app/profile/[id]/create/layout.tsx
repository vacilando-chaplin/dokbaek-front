"use client";

import ListMenu from "@/app/profile/[id]/create/components/listMenu";
import BottomBar from "@/app/profile/[id]/create/components/bottomBar";
import {
  completionProgress,
  defaultId,
  isDraft,
  isDraftComplete,
  stepperInit
} from "@/lib/atoms";
import { useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { stepperList } from "./data";
import {
  deleteProfileDraft,
  postProfileDraft,
  postProfileDraftPublish
} from "../api";
import ConfirmModal from "@/components/organisms/confirmModal";
import { useEffect, useState } from "react";
import { isValid } from "@/lib/utils";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const userId = useRecoilValue(defaultId);

  const { name, gender, birth, contact } = useRecoilValue(completionProgress);
  const [isDraftState, setIsDraftState] = useRecoilState(isDraft);
  const setIsDraftLoading = useSetRecoilState(isDraftComplete);
  const [completion, setCompletion] = useRecoilState(completionProgress);

  const [progress, setProgress] = useState(0);

  const router = useRouter();

  const setStepper = useSetRecoilState(stepperInit);
  const onStepper = (index: number) => {
    setStepper(index);
    router.prefetch(`/profile/${userId}/create/${stepperList[index].path}`);
    router.push(`/profile/${userId}/create/${stepperList[index].path}`);
  };

  const onSaveProfileClick = async () => {
    await postProfileDraftPublish(userId);

    setIsDraftLoading(false);
    setStepper(0);
    router.prefetch(`/profile/${userId}`);
    router.push(`/profile/${userId}`);
  };

  const onBackProfileClick = () => {
    setStepper(0);
    setIsDraftLoading(false);
    router.prefetch(`/profile/${userId}`);
    router.push(`/profile/${userId}`);
  };

  const onProfileDraftRejected = async () => {
    await deleteProfileDraft(userId);
    await postProfileDraft(userId);

    setIsDraftState(false);
    setIsDraftLoading(true);
  };

  const onProfileDraftConfirmed = async () => {
    setIsDraftState(false);
    setIsDraftLoading(true);
  };

  useEffect(() => {
    const onCheckIsDraft = async () => {
      const res = await postProfileDraft(userId);
      const data = await res.data.data;

      if (res.status === 200) {
        setIsDraftState(true);
      } else if (res.status === 201) {
        setIsDraftLoading(true);
      }

      setCompletion({
        ...completion,
        name: isValid(data.info.name),
        gender: isValid(data.info.gender),
        birth: data.info.bornYear >= 4 ? true : false,
        height: data.info.height > 0 ? true : false,
        weight: data.info.weight > 0 ? true : false,
        contact: isValid(data.info.contact),
        email: isValid(data.info.email),
        specialty: isValid(data.specialties),
        youtube: isValid(data.info.youtubeLink),
        instagram: isValid(data.info.instagramLink),
        introduction: isValid(data.info.introduction),
        profilePhoto: isValid(data.photos),
        stillcutPhoto: isValid(data.stillCuts),
        recentPhoto: isValid(data.recentPhotos),
        filmography: isValid(data.filmos),
        video: isValid(data.videos)
      });
      if (data.education.length >= 1) {
        setCompletion({
          ...completion,
          schoolName: isValid(data.education[0].school.name),
          schoolMajor: isValid(data.education[0].major),
          schoolStatus: true
        });
      }
    };
    onCheckIsDraft();
  }, []);

  useEffect(() => {
    const totalItems = Object.keys(completion).length;
    const completedItems = Object.values(completion).filter(
      (value) => value === true
    ).length;
    const resultProgress = Math.floor((completedItems / totalItems) * 100);
    setProgress(resultProgress);
  }, [completion, birth]);

  return (
    <div className="relative mb-16 mt-16 flex flex-row justify-center gap-4 p-10">
      <ListMenu onStepper={onStepper} />
      {children}
      <BottomBar
        progress={progress}
        onBack={onBackProfileClick}
        onSave={onSaveProfileClick}
        disabled={!(name && gender && birth && contact)}
      />
      {isDraftState && (
        <ConfirmModal
          dense={false}
          resizing="fixed"
          titleText="작성 중인 프로필이 있습니다. 불러올까요?"
          cancelText="새로 작성"
          confirmText="불러오기"
          cancelButtonType="secondaryOutlined"
          confirmButtonType="primary"
          onCancel={onProfileDraftRejected}
          onConfirm={onProfileDraftConfirmed}
        />
      )}
    </div>
  );
};

export default Layout;
