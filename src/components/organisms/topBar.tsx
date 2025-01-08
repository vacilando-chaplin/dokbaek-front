"use client";

import Logo from "../atoms/logo";
import { useRouter } from "next/navigation";
import { postSignOut } from "@/app/api/route";
import Cookies from "js-cookie";
import BoxButton from "../atoms/boxButton";

const TopBar = () => {
  const router = useRouter();

  const onLogOut = async () => {
    const refreshToken = Cookies.get("refresh_token");

    if (refreshToken) {
      await postSignOut({ refreshToken: refreshToken, deviceId: "" });
      Cookies.remove("jwt", { path: "/" });
      Cookies.remove("refresh_token", { path: "/" });
      router.prefetch("/");
      router.push("/");
    }
  };

  return (
    <section className="fixed top-0 z-50 flex h-12 w-full items-center bg-background-elevated-light px-6 shadow-drop">
      <nav className="flex w-full items-center justify-between">
        <Logo href="/" />
        <div>
          <BoxButton type="black" size="small" onClick={onLogOut}>
            로그아웃
          </BoxButton>
        </div>
      </nav>
    </section>
  );
};

export default TopBar;
