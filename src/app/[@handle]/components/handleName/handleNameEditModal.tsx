"use client";

import TextInput from "@/components/atoms/textInput";
import ModalFooter from "@/components/molecules/modalFooter";
import ModalHeader from "@/components/molecules/modalHeader";
import {
  handleNameEditModalState,
  handleNameState,
  profileViewState
} from "@/lib/recoil/handle/atom";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useMutation } from "@tanstack/react-query";
import { getProfileHandleExists, putProfileHandle } from "../../api";
import { toastMessage } from "@/lib/atoms";
import { useRouter } from "next/navigation";
import { routePaths } from "@/constants/routes";
import { isValidHandle } from "@/lib/utils";
import Cookies from "js-cookie";

const HandleNameEditModal = () => {
  const loginProfileId = Number(Cookies.get("loginProfileId"));
  const router = useRouter();

  const [handleName, setHandleName] = useState("");
  const [currentHandleName, setCurrentHandleName] =
    useRecoilState(handleNameState);
  const [handleNameEditModal, setHandleNameEditModal] = useRecoilState(
    handleNameEditModalState
  );

  const setProfileData = useSetRecoilState(profileViewState);
  const setToastMessage = useSetRecoilState(toastMessage);

  const onModalClose = () => {
    setHandleName(currentHandleName);
    setHandleNameEditModal(false);
  };

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

  const editProfileMutation = useMutation({
    mutationFn: async (handleId: string) => {
      const exists = await getProfileHandleExists(handleId);

      if (exists.data.exists) {
        setToastMessage("이미 존재하는 프로필 아이디에요.");
        return null;
      }

      return await putProfileHandle(loginProfileId, handleId);
    },
    onSuccess: (data, handleId) => {
      if (!data) return;

      const profileData = data.data;
      setHandleName(handleId);
      setCurrentHandleName(handleId);
      setProfileData(profileData);
      setToastMessage("프로필 아이디가 변경됐어요.");
      setHandleNameEditModal(false);
      router.replace(routePaths.profile(handleName));
    }
  });

  const onSaveClick = () => {
    editProfileMutation.mutate(handleName);
  };

  useEffect(() => {
    setHandleName(currentHandleName || "");
  }, [currentHandleName]);

  return (
    handleNameEditModal && (
      <section className="fixed inset-0 z-[50] flex h-auto w-full items-center justify-center overflow-auto bg-background-scrim-light bg-opacity-40 dark:bg-background-scrim-dark">
        <div className="interaction-default relative my-20 flex h-auto w-[480px] animate-enter flex-col items-center justify-center rounded-3xl bg-background-surface-light shadow-medium dark:bg-background-surface-dark">
          <ModalHeader name="프로필 아이디 변경" onClick={onModalClose} />
          <div className="scrollbar dark:dark-scrollbar flex h-auto max-h-[80vh] w-full max-w-[1280px] flex-col gap-4 overflow-auto overscroll-contain rounded-3xl p-6">
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
          </div>
          <ModalFooter
            text="저장"
            disabled={!isValidHandle(handleName)}
            onCloseClick={onModalClose}
            onSaveClick={onSaveClick}
          />
        </div>
      </section>
    )
  );
};

export default HandleNameEditModal;
