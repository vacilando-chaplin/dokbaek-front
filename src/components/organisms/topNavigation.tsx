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
import { useEffect, useState } from "react";

const TopNavigation = () => {
  const router = useRouter();
  const pathName = usePathname();

  const jwt = Cookies.get("jwt");
  const setPathName = useSetRecoilState(currentPath);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userId = useRecoilValue(defaultId);

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
      router.prefetch("/");
      router.push("/");
    }

    setIsLoggedIn(false);
  };

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
            <BoxButton type="black" size="small" onClick={onLogOut}>
              로그아웃
            </BoxButton>
            <Link
              href="/landing"
              className="typography-body3 flex items-center font-semibold text-content-secondary-light"
            >
              배우 찾기
            </Link>
            <Link
              href={`/profile/${userId}`}
              className="typography-body3 flex items-center font-semibold text-content-secondary-light"
            >
              내 프로필
            </Link>
            <button type="button">
              <Bell width="20" height="20" fill="#5E656C" />
            </button>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-[100px] border border-border-default-light bg-gray-50"
            >
              <Person width="20" height="20" fill="#5E656C" />
            </button>
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
