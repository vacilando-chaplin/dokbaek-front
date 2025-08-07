"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useSetRecoilState } from "recoil";
import { loginState } from "../atoms";
import { setRefreshToken, setToken } from "../utils";

export default function AuthInitializer() {
  const setIsLoggedIn = useSetRecoilState(loginState);

  useEffect(() => {
    const refreshToken = Cookies.get("refresh_token");
    setIsLoggedIn(!!refreshToken);
  }, []);

  return null;
}
