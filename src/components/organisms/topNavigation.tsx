"use client";

import Logo from "../atoms/logo";
import { usePathname, useRouter } from "next/navigation";
import { deleteSignOut } from "@/lib/api";
import Cookies from "js-cookie";
import BoxButton from "../atoms/boxButton";
import Link from "next/link";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentPath, loginProfileId } from "@/lib/atoms";
import Bell from "../../../public/icons/Bell.svg";
import Person from "../../../public/icons/Person.svg";
import Heart from "../../../public/icons/Heart.svg";
import { useEffect, useState } from "react";
import { removeStorageData } from "@/lib/utils";

interface UserMenuType {
  name: string;
  onClick: () => void;
}

const TopNavigation = () => {
  const router = useRouter();
  const pathName = usePathname();

  const jwt = Cookies.get("jwt");
  const loginProfile = useRecoilValue(loginProfileId);
  const setPathName = useSetRecoilState(currentPath);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMenuActive, setUserMenuActive] = useState(false);

  const onLogIn = () => {
    setPathName(pathName);

    router.prefetch("/login");
    router.push("/login");
  };

  const onLogOut = async () => {
    const refreshToken = Cookies.get("refresh_token");

    if (refreshToken) {
      await deleteSignOut(refreshToken);

      removeStorageData();

      router.prefetch("/");
      router.push("/");
    }

    setIsLoggedIn(false);
  };

  const onUserMenuClick = () => {
    setUserMenuActive(!userMenuActive);
  };

  const userMenu = [
    // {
    //   name: "계정 연동",
    //   onClick: () => {}
    // },
    // {
    //   name: "알림 설정",
    //   onClick: () => {}
    // },
    {
      name: "계정",
      onClick: () => {
        router.prefetch("/account");
        router.push("/account");
      }
    },
    {
      name: "로그아웃",
      onClick: onLogOut
    }
  ];

  useEffect(() => {
    if (jwt) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return (
    <section className="fixed top-0 z-50 flex h-12 w-full items-center border-b-[1px] border-border-default-light bg-background-elevated-light px-6 shadow-drop dark:border-border-default-dark dark:bg-background-elevated-dark">
      <nav className="flex w-full items-center justify-between">
        <Logo />
        {isLoggedIn ? (
          <div className="flex flex-row gap-5">
            <Link
              href={`/profiles`}
              className="typography-body3 flex items-center font-semibold text-content-secondary-light hover:text-accent-primary-light dark:text-content-secondary-dark dark:hover:text-accent-primary-dark"
            >
              배우 찾기
            </Link>
            <Link
              href={`/profile/${loginProfile}`}
              className="typography-body3 flex items-center font-semibold text-content-secondary-light hover:text-accent-primary-light dark:text-content-secondary-dark dark:hover:text-accent-primary-dark"
            >
              내 프로필
            </Link>
            <Link href={`/likes`} className="flex items-center">
              <Heart
                width="20"
                height="20"
                className="fill-current text-content-secondary-light dark:text-content-secondary-dark"
              />
            </Link>
            {/* <button type="button">
              <Bell width="20" height="20" className="fill-current text-content-secondary-light dark:text-content-secondary-dark" />
            </button> */}
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
        ) : (
          <div className="flex flex-row gap-5">
            <Link
              href={`/profiles`}
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

export default TopNavigation;
