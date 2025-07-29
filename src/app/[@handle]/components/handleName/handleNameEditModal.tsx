"use client";

import TextInput from "@/components/atoms/textInput";
import ModalFooter from "@/components/molecules/modalFooter";
import ModalHeader from "@/components/molecules/modalHeader";
import {
  handleNameModalState,
  handleNameState
} from "@/lib/recoil/handle/atom";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { profileHandleNameModalInit } from "../../data";
import { useMutation } from "@tanstack/react-query";
import { postProfile } from "../../api";
import { toastMessage } from "@/lib/atoms";

const HandleNameEditModal = () => {
  const [handleName, setHandleName] = useState("");
  const [currentHandleName, setCurrentHandleName] =
    useRecoilState(handleNameState);
  const [handleNameModal, setHandleNameModal] =
    useRecoilState(handleNameModalState);

  const setToastMessage = useSetRecoilState(toastMessage);

  const onModalClose = () => {
    setHandleName("");
    setHandleNameModal(profileHandleNameModalInit);
  };

  const onHandleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (!value.startsWith("@")) {
      value = "@" + value.replace(/^@*/, "");
    }

    if (value === "@") {
      setHandleName("");
      return;
    }

    setHandleName(value);
  };

  const onHandleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // @ 뒤의 텍스트가 없는 상태에서 백스페이스를 누르면 막기
    if (
      e.key === "Backspace" &&
      e.currentTarget.selectionStart !== null &&
      e.currentTarget.selectionStart <= 1
    ) {
      e.preventDefault();
    }
  };

  const onHandleNameClick = (e: React.MouseEvent<HTMLInputElement>) => {
    // 클릭했을 때 커서가 @ 앞에 오지 않도록 처리
    if (
      e.currentTarget.selectionStart !== null &&
      e.currentTarget.selectionStart < 1
    ) {
      e.currentTarget.setSelectionRange(1, 1);
    }
  };

  const useEditProfile = () => {
    return useMutation({
      mutationFn: (handleId: string) => postProfile(handleId),
      onSuccess: (res, handleId) => {
        if (res.status === 200) {
          setHandleName(handleId);
        }
      },
      onError: (error: any) => {
        if (error.response?.status === 409) {
          setToastMessage("이미 존재하는 프로필 아이디에요.");
        } else {
          setToastMessage("프로필 아이디 생성 중 오류가 발생했어요.");
        }
      }
    });
  };

  const createProfileMutation = useEditProfile();

  const onSaveClick = () => {
    createProfileMutation.mutate(handleName);
    setHandleNameModal(profileHandleNameModalInit);
  };

  useEffect(() => {
    setHandleName(currentHandleName || "");
  }, [currentHandleName]);

  return (
    handleNameModal.type === "edit" &&
    handleNameModal.active && (
      <section className="fixed inset-0 z-[50] flex h-auto w-full items-center justify-center overflow-auto bg-background-scrim-light bg-opacity-40 dark:bg-background-scrim-dark">
        <div className="interaction-default relative my-20 flex h-auto w-full max-w-[1024px] animate-enter flex-col items-center justify-center rounded-3xl bg-background-surface-light shadow-medium dark:bg-background-surface-dark">
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
            onCloseClick={onModalClose}
            onSaveClick={onSaveClick}
          />
        </div>
      </section>
    )
  );
};

export default HandleNameEditModal;
