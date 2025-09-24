"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useSetRecoilState } from "recoil";
import { loginState } from "../atoms";
import { removeStorageData, setRefreshToken, setToken } from "../utils";

export default function AuthInitializer() {
  const setIsLoggedIn = useSetRecoilState(loginState);

  useEffect(() => {
    const jwt = Cookies.get("jwt");

    if (jwt) {
      setIsLoggedIn(true);
      setToken(
          "jwt",
          "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MCIsImV4cCI6MTc1ODY4Njc4NywiaWF0IjoxNzU4NjQzNTg3LCJqdGkiOiI4NjdiOGMxMi1kM2FkLTQxYTQtOWRkNy1mNTU1ZTcwNzI3M2QiLCJkZXZpY2VJZCI6ImYwZjU1ZmRmLWY5Y2EtNGVmNS04MzQ0LTlkNjRhZDMwNzdmNCJ9.lK7an59qfp75iUa64SmuBZhtAF0FiDDSkPYKmFPfTOs"
      );
      setRefreshToken(
          "refresh_token",
          "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MCIsImV4cCI6MTc1ODY4Njc4NywiaWF0IjoxNzU4NjQzNTg3LCJqdGkiOiI4NjdiOGMxMi1kM2FkLTQxYTQtOWRkNy1mNTU1ZTcwNzI3M2QiLCJkZXZpY2VJZCI6ImYwZjU1ZmRmLWY5Y2EtNGVmNS04MzQ0LTlkNjRhZDMwNzdmNCJ9.lK7an59qfp75iUa64SmuBZhtAF0FiDDSkPYKmFPfTOs"
      );
    } else {
      setIsLoggedIn(false);
      removeStorageData();
    }
  }, []);

  return null;
}
