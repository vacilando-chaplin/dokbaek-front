"use client";

declare global {
  interface Window {
    AppleID: any;
  }
}

import { useEffect } from "react";
import Apple from "../../../public/icons/Apple.svg";

const appleLogin = () => {
  const onAppleLogin = async () => {
    if (window.AppleID) {
      window.AppleID.auth
        .signIn()
        .then((response: any) => {
          debugger;
          const { code, id_token } = response;

          console.log("Code:", code);
          console.log("ID Token:", id_token);
          sessionStorage.setItem("appleCode", code);
          sessionStorage.setItem("appleIdToken", id_token);
        })
        .catch((error: any) => {
          console.error("Apple login failed:", error);
        });
    }
    console.log("onAppleLogin");
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.AppleID) {
        window.AppleID.auth.init({
          clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
          scope: "name",
          redirectURI: process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <button
      type="button"
      className="relative flex h-auto w-full flex-row items-center justify-center gap-2 rounded-[14px] bg-content-primary-light px-6 py-3"
      onClick={onAppleLogin}
    >
      <Apple
        width="16"
        height="16"
        fill="#ffffff"
        className="absolute left-4"
      />
      <div className="text-body2 font-medium leading-body2 tracking-body2 text-static-white">
        Apple로 시작하기
      </div>
    </button>
  );
};

export default appleLogin;
