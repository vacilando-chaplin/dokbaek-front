"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useSetRecoilState } from "recoil";
import { loginState } from "../atoms";
import { setRefreshToken, setToken } from "../utils";

export default function AuthInitializer() {
  const setIsLoggedIn = useSetRecoilState(loginState);

  useEffect(() => {
    const jwt = Cookies.get("jwt");
    setIsLoggedIn(!!jwt);
  }, []);

  return null;
}
