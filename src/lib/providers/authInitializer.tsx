"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useSetRecoilState } from "recoil";
import { loginState } from "../atoms";
import { removeStorageData } from "../utils";

export default function AuthInitializer() {
  const setIsLoggedIn = useSetRecoilState(loginState);

  useEffect(() => {
    const jwt = Cookies.get("jwt");

    if (jwt) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      removeStorageData();
    }
  }, []);

  return null;
}
