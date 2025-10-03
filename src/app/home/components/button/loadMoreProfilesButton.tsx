"use client";

import BoxButton from "@/components/atoms/boxButton";
import ArrowDirectionRight from "../../../../../public/icons/ArrowDirectionRight.svg";
import LoadingSpinner from "../../../../../public/icons/LoadingSpinner.svg";
import { useRecoilState, useSetRecoilState } from "recoil";
import { profileShowcaseState } from "@/lib/recoil/home/atom";
import { useMutation } from "@tanstack/react-query";
import { getProfileShowcase } from "../../api";
import { toastMessage } from "@/lib/atoms";

const LoadMoreProfilesButton = () => {
  const [profileState, setProfileState] = useRecoilState(profileShowcaseState);

  const setToastMessage = useSetRecoilState(toastMessage);

  const loadMoreMutation = useMutation({
    mutationFn: async () => {
      const nextPage = profileState.currentPage + 1;
      const size = 20;
      const res = await getProfileShowcase(nextPage, size);

      return {
        content: res.content || [],
        currentPage: res.page || nextPage,
        totalElements: res.totalElements || 0,
        totalPages: res.totalPages || 0,
        hasNext: res.hasNext || false
      };
    },
    onMutate: () => {
      setProfileState((prev) => ({
        ...prev,
        isLoading: true
      }));
    },
    onSuccess: (data) => {
      setProfileState((prev) => ({
        profiles: [...prev.profiles, ...data.content],
        currentPage: data.currentPage,
        totalElements: data.totalElements,
        totalPages: data.totalPages,
        hasNext: data.hasNext,
        isLoading: false
      }));
    },
    onError: () => {
      setProfileState((prev) => ({
        ...prev,
        isLoading: false
      }));
      setToastMessage("프로필을 더 불러올 수 없어요.");
    }
  });

  const onLoadMore = () => {
    if (profileState.hasNext && !profileState.isLoading) {
      loadMoreMutation.mutate();
    }
  };

  return (
    profileState.hasNext && (
      <div className="w-fit">
        <BoxButton
          type="secondaryOutlined"
          size="large"
          onClick={onLoadMore}
          disabled={profileState.isLoading}
        >
          {profileState.isLoading ? (
            <LoadingSpinner
              width="16"
              height="16"
              className="fill-current animate-spin text-content-primary-light dark:text-content-primary-dark"
            />
          ) : (
            <>
              프로필 더 보기
              <ArrowDirectionRight
                width="16"
                height="16"
                className="fill-current text-content-primary-light dark:text-content-primary-dark"
              />
            </>
          )}
        </BoxButton>
      </div>
    )
  );
};

export default LoadMoreProfilesButton;
