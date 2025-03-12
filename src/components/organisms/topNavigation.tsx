"use client";

import Logo from "../atoms/logo";
import { usePathname, useRouter } from "next/navigation";
import { deleteSignOut } from "@/lib/api";
import Cookies from "js-cookie";
import BoxButton from "../atoms/boxButton";
import Link from "next/link";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentPath, defaultId } from "@/lib/atoms";
import Bell from "../../../public/icons/Bell.svg";
import Person from "../../../public/icons/Person.svg";
import Heart from "../../../public/icons/Heart.svg";
import { useEffect, useState } from "react";

interface UserMenuType {
  name: string;
  onClick: () => void;
}

const TopNavigation = () => {
  const router = useRouter();
  const pathName = usePathname();

  const jwt = Cookies.get("jwt");
  const userId = useRecoilValue(defaultId);
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
      Cookies.remove("jwt", { path: "/" });
      Cookies.remove("refresh_token", { path: "/" });
      localStorage.removeItem("recoil-persist");
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
    <section className="fixed top-0 z-50 flex h-12 w-full items-center bg-background-elevated-light px-6 shadow-drop">
      <nav className="flex w-full items-center justify-between">
        <Logo />
        {isLoggedIn ? (
          <div className="flex flex-row gap-5">
            <Link
              href={`/profiles`}
              className="typography-body3 flex items-center font-semibold text-content-secondary-light hover:text-accent-primary-light"
            >
              배우 찾기
            </Link>
            <Link
              href={`/profile/${userId}`}
              className="typography-body3 flex items-center font-semibold text-content-secondary-light hover:text-accent-primary-light"
            >
              내 프로필
            </Link>
            <Link href={`/likes`} className="flex items-center">
              <Heart width="20" height="20" fill="#5E656C" />
            </Link>
            {/* <button type="button">
              <Bell width="20" height="20" fill="#5E656C" />
            </button> */}
            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-[100px] border border-border-default-light bg-gray-50"
              onClick={onUserMenuClick}
            >
              <Person width="20" height="20" fill="#5E656C" />
            </button>
            {userMenuActive && (
              <div className="scrollbar interaction-default absolute right-6 top-11 z-10 flex h-auto max-h-[332px] w-[120px] animate-enter list-none flex-col rounded-xl bg-background-elevated-light p-2 shadow-low">
                {userMenu.map((item: UserMenuType) => {
                  return (
                    <div
                      key={item.name}
                      className="flex h-[38px] w-full gap-2 rounded-md bg-background-surface-light px-3 py-2"
                    >
                      <button
                        type="button"
                        className="typography-body3 font-regular text-content-primary-light"
                        onClick={item.onClick}
                      >
                        {item.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-row gap-5">
            <Link
              href="/landing"
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
