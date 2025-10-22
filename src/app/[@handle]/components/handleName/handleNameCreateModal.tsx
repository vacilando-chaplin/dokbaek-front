"use client";

import BoxButton from "@/components/atoms/boxButton";
import HandleNameModalHeader from "./handleNameModalHeadet";
import { getProfileHandleExists, postProfile } from "../../api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState, toastMessage } from "@/lib/atoms";
import { useMutation } from "@tanstack/react-query";
import TextInput from "@/components/atoms/textInput";
import { useEffect, useState } from "react";
import { handleNameState, profileViewState } from "@/lib/recoil/handle/atom";
import { useRouter } from "next/navigation";
import { routePaths } from "@/constants/routes";
import { isValidHandle, setLoginProfileId } from "@/lib/utils";

const HandleNameCreateModal = () => {
  const router = useRouter();

  const [handleName, setHandleName] = useState("");

  const isLoggedIn = useRecoilValue(loginState);
  const setProfileData = useSetRecoilState(profileViewState);
  const setCurrentHandleName = useSetRecoilState(handleNameState);
  const setToastMessage = useSetRecoilState(toastMessage);

  const onHandleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // 모든 @ 제거 후, 순수 사용자 입력만 저장
    value = value.replace(/^@+/, "");

    // 빈 입력은 허용
    setHandleName(value);
  };

  const onHandleNameClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const pos = e.currentTarget.selectionStart ?? 0;

    // 커서를 @ 앞에 두려고 할 때 막기
    if (pos < 1) {
      e.currentTarget.setSelectionRange(1, 1);
    }
  };

  const onHandleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const pos = e.currentTarget.selectionStart ?? 0;

    // 백스페이스로 @ 지우려고 할 때 막기
    if (e.key === "Backspace" && pos <= 1) {
      e.preventDefault();
    }
  };

  const useCreateProfile = () => {
    return useMutation({
      mutationFn: (handleId: string) => getProfileHandleExists(handleId),
      onSuccess: async (res, handleId) => {
        const exists = res?.data?.exists;

        if (exists === false) {
          try {
            const profileRes = await postProfile(handleId);
            const data = profileRes.data.data;

            setHandleName(handleId);
            setCurrentHandleName(handleId);
            setProfileData(data);
            setLoginProfileId("loginProfileId", data.id);
            setToastMessage("프로필 생성이 완료됐어요.");
            router.replace(routePaths.profile(handleId));
          } catch (error) {
            setToastMessage("프로필 생성 중 오류가 발생했어요.");
            console.error("프로필 생성 실패:", error);
          }
        } else {
          setToastMessage("이미 존재하는 프로필 아이디에요.");
        }
      },
      onError: () => {
        setToastMessage("프로필 생성 중 오류가 발생했어요.");
      }
    });
  };

  const createProfileMutation = useCreateProfile();

  const onSaveClick = () => {
    createProfileMutation.mutate(handleName);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace(routePaths.home());
    }
  }, []);

  return (
    <section className="fixed inset-0 z-[50] flex h-auto w-full items-center justify-center overflow-auto bg-background-scrim-light bg-opacity-40 dark:bg-background-scrim-dark">
      <div className="interaction-default relative my-20 flex h-auto w-[480px] animate-enter flex-col items-center justify-center rounded-3xl bg-background-surface-light shadow-medium dark:bg-background-surface-dark">
        <HandleNameModalHeader title="프로필 링크에 표시할 아이디를 입력해주세요." />
        <div className="scrollbar dark:dark-scrollbar flex h-auto max-h-[80vh] w-full flex-col gap-4 overflow-auto overscroll-contain rounded-3xl p-6">
          <div className="flex h-auto w-full flex-col gap-1">
            <TextInput
              type="text"
              size="medium"
              name="handleName"
              value={`@${handleName}`}
              maxLength={15}
              onKeyDown={onHandleNameKeyDown}
              onClick={onHandleNameClick}
              onChange={onHandleNameChange}
            />
            <span className="typography-caption1 h-auto w-full font-normal text-content-tertiary-light dark:text-content-tertiary-dark">
              프로필 아이디 예시: @kse123, @kbs0506, @sjkim97
            </span>
          </div>
        </div>
        <div className="typography-body3 flex h-auto w-full items-center justify-end gap-2 border-t-[1px] border-border-default-light px-6 py-5 font-medium dark:border-border-default-dark">
          <BoxButton
            type="primary"
            size="medium"
            disabled={!isValidHandle(handleName)}
            onClick={onSaveClick}
          >
            완료
          </BoxButton>
        </div>
      </div>
    </section>
  );
};

export default HandleNameCreateModal;
