"use client";

import Logo from "../atoms/logo";
import { usePathname, useRouter } from "next/navigation";
import { deleteSignOut, getProfileMe } from "@/lib/api";
import Cookies from "js-cookie";
import BoxButton from "../atoms/boxButton";
import Link from "next/link";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentPath, loginState, toastMessage } from "@/lib/atoms";
import Person from "../../../public/icons/Person.svg";
import Heart from "../../../public/icons/Heart.svg";
import { useState } from "react";
import { removeStorageData, setLoginProfileId } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { routePaths } from "@/constants/routes";
import { handleNameState } from "@/lib/recoil/handle/atom";

interface UserMenuType {
  name: string;
  onClick: () => void;
}

const TopNavigationClient = () => {
  const router = useRouter();
  const pathName = usePathname();

  const setPathName = useSetRecoilState(currentPath);
  const setToastMessage = useSetRecoilState(toastMessage);
  const setHandleName = useSetRecoilState(handleNameState);

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [userMenuActive, setUserMenuActive] = useState(false);

  const onLogIn = () => {
    setPathName(pathName);

    router.prefetch(routePaths.login());
    router.push(routePaths.login());
  };

  const onLogOutMutation = useMutation({
    mutationFn: async () => {
      const jwt = Cookies.get("jwt");

      if (!jwt) {
        throw new Error();
      }

      await deleteSignOut(jwt);
    },
    onSuccess: () => {
      removeStorageData();
      setIsLoggedIn(false);
      setToastMessage("안전하게 로그아웃됐어요.");
      router.replace(routePaths.home());
    },
    onError: () => {
      setToastMessage("로그아웃 중 문제가 발생했어요. 다시 시도해 주세요.");
    }
  });

  const onUserMenuClick = () => {
    setUserMenuActive(!userMenuActive);
  };

  const moveMyProfileMutation = useMutation({
    mutationFn: getProfileMe,
    onSuccess: (res) => {
      const data = res.data.data;

      if (data.handleId) {
        setHandleName(data.handleId);
        setLoginProfileId("loginProfileId", data.id);
        router.push(routePaths.profile(data.handleId));
      } else {
        router.push(routePaths.profile("new"));
      }
    },
    onError: (error: any) => {
      const status = error.response?.status;

      if (status === 404) {
        router.push(routePaths.profile("new"));
      } else {
        setToastMessage("내 프로필을 불러 올 수 없어요. 다시 시도해 주세요.");
      }
    }
  });

  const onMoveMyProfile = () => {
    moveMyProfileMutation.mutate();
  };

  const userMenu = [
    {
      name: "계정",
      onClick: () => {
        router.prefetch(routePaths.account());
        router.push(routePaths.account());
      }
    },
    {
      name: "로그아웃",
      onClick: () => onLogOutMutation.mutate()
    }
  ];

  return (
    <section className="fixed top-0 z-[48] flex h-12 w-full items-center border-b-[1px] border-border-default-light bg-background-elevated-light px-8 shadow-drop dark:border-border-default-dark dark:bg-background-elevated-dark">
      <nav className="flex w-full items-center justify-between">
        <Logo />
        {isLoggedIn === true && (
          <div className="flex flex-row gap-5">
            <Link
              href={routePaths.profiles()}
              className="typography-body3 flex items-center font-semibold text-content-secondary-light hover:text-accent-primary-light dark:text-content-secondary-dark dark:hover:text-accent-primary-dark"
            >
              배우 찾기
            </Link>
            <button
              type="button"
              className="typography-body3 flex items-center font-semibold text-content-secondary-light hover:text-accent-primary-light dark:text-content-secondary-dark dark:hover:text-accent-primary-dark"
              onClick={onMoveMyProfile}
            >
              내 프로필
            </button>
            <Link href={routePaths.likes()} className="flex items-center">
              <Heart
                width="20"
                height="20"
                className="fill-current text-content-secondary-light dark:text-content-secondary-dark"
              />
            </Link>
            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-[100px] border border-border-default-light bg-gray-50 dark:border-border-default-dark dark:bg-gray-900"
              onClick={onUserMenuClick}
            >
              <Person
                width="20"
                height="20"
                className="fill-current text-content-secondary-light dark:text-content-secondary-dark"
              />
            </button>
            {userMenuActive && (
              <div className="scrollbar interaction-default absolute right-6 top-11 z-10 flex h-auto max-h-[332px] w-[120px] animate-enter list-none flex-col rounded-xl bg-background-elevated-light p-2 shadow-low dark:bg-background-elevated-dark">
                {userMenu.map((item: UserMenuType) => {
                  return (
                    <button
                      key={item.name}
                      type="button"
                      className="flex h-[38px] w-full cursor-pointer gap-2 rounded-md px-3 py-2 hover:bg-gray-50 active:bg-gray-150 dark:hover:bg-background-surface-dark dark:active:bg-gray-800"
                      onClick={item.onClick}
                    >
                      <span className="typography-body3 font-regular text-content-primary-light dark:text-content-primary-dark">
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
        {isLoggedIn === false && (
          <div className="flex flex-row gap-5">
            <Link
              href={routePaths.profiles()}
              className="typography-body3 flex items-center font-semibold text-content-secondary-light"
            >
              배우 찾기
            </Link>
            <BoxButton type="black" size="small" onClick={onLogIn}>
              로그인
            </BoxButton>
          </div>
        )}
      </nav>
    </section>
  );
};

export default TopNavigationClient;
