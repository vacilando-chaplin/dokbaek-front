"use client";

import { postUser } from "@/app/api/route";
import { defaultId, jwt, loginForm } from "@/data/atom";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

const Login = () => {
  const router = useRouter();

  const setId = useSetRecoilState(defaultId);
  const setJWT = useSetRecoilState(jwt);
  const setLoginForm = useSetRecoilState(loginForm);

  // 카카오 로그인
  const [kakaoUserData, setKakaoUserData] = useState({}); // 유저 카카오 회원 데이터

  // const fetchUserProfile = () => {
  //   if (window.Kakao) {
  //     window.Kakao.API.request({
  //       url: "/v2/user/me",
  //       success: (response: any) => {
  //         setKakaoUserData(response);
  //       },
  //       fail: (error: any) => {
  //         throw error;
  //       }
  //     });
  //   }
  // };

  const loadKakaoSDK = () => {
    if (window.Kakao) {
      return;
    }
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    script.onload = () => {
      if (window.Kakao) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
      }
    };
    document.head.appendChild(script);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      loadKakaoSDK();
    }
  }, []);

  const onKakaoLogin = () => {
    if (!window.Kakao) {
      return;
    }
    window.Kakao.Auth.login({
      success: (authData: any) => {
        postUser({
          domain: "KAKAO",
          accessToken: authData.access_token,
          deviceId: ""
        })
          .then((res: any) => {
            const data = res.data;

            setId(data.defaultProfileId);
            setJWT(data.token.jwt);
            setLoginForm("카카오");
          })
          .catch((error) => {
            throw error;
          });
        // fetchUserProfile();

        router.push("/oauth/callback");
      },
      fail: (error: any) => {
        throw error;
      }
    });
  };

  return (
    <main className="flex h-auto w-auto flex-col gap-10 rounded-[40px] border border-border-default-light bg-background-surface-light p-20">
      <div className="flex flex-col items-center justify-center gap-4">
        <svg
          width="103"
          height="56"
          viewBox="0 0 231 125"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_81_206)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M99.3842 2.68605V0H94.0121V48.3488H99.3842V44.3198H103.413V48.3488H127.588V44.3198H131.617V48.3488H136.989V0H131.617V2.68605H127.588V0H103.413V2.68605H99.3842ZM103.413 6.71512H99.3842V12.0872H103.413V6.71512ZM99.3842 16.1163H103.413V21.4884H99.3842V16.1163ZM103.413 25.5174H99.3842V30.8895H103.413V25.5174ZM99.3842 34.9186H103.413V40.2907H99.3842V34.9186ZM131.617 6.71512H127.588V12.0872H131.617V6.71512ZM127.588 16.1163H131.617V21.4884H127.588V16.1163ZM131.617 25.5174H127.588V30.8895H131.617V25.5174ZM127.588 34.9186H131.617V40.2907H127.588V34.9186Z"
              fill="black"
            />
            <path
              d="M0.368652 77.6435V82.9317H5.84567V110.128H12.33V82.9317H20.9547V77.6435H12.33V74.4329C12.33 71.0963 13.8723 69.491 17.1774 69.5224C18.3106 69.491 19.5697 69.6798 20.9547 70.089V64.1084C19.6326 63.6047 17.9958 63.227 16.0443 63.227C9.68588 63.227 5.84567 67.319 5.84567 74.1181V77.6435H0.368652Z"
              fill="black"
            />
            <path
              d="M25.6307 110.128V77.6436H32.115V110.128H25.6307Z"
              fill="black"
            />
            <path
              d="M24.8123 67.445C24.7493 69.7743 26.512 71.5056 28.9043 71.5371C31.2336 71.5056 32.9963 69.7743 33.0593 67.445C32.9963 65.0843 31.2336 63.3215 28.9043 63.353C26.512 63.3215 24.7493 65.0843 24.8123 67.445Z"
              fill="black"
            />
            <path
              d="M38.3655 64.5491V110.128H44.8497V64.5491H38.3655Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M49.5257 93.8857C49.5257 103.644 56.7655 111.009 66.3975 111.009C75.9665 111.009 83.2062 103.644 83.2062 93.8857C83.2062 84.1278 75.9665 76.7622 66.3975 76.7622C56.7655 76.7622 49.5257 84.1278 49.5257 93.8857ZM76.722 93.8857C76.722 100.37 72.4411 104.934 66.3975 104.903C60.2909 104.934 56.01 100.37 56.01 93.8857C56.01 87.4014 60.2909 82.8373 66.3975 82.8687C72.4411 82.8373 76.722 87.4014 76.722 93.8857Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M87.0012 116.675C90.7784 121.963 95.5 124.607 101.984 124.607C112.277 124.607 118.699 118.06 118.73 106.854V77.6435H112.246V82.3021H111.994C109.791 78.6508 106.328 76.7622 101.732 76.7622C92.73 76.7622 86.3087 83.939 86.3087 93.3821C86.3087 102.825 92.73 110.002 101.732 110.002C106.328 110.002 109.854 108.082 111.994 104.399H112.246V106.854C112.183 114.566 108.532 118.658 101.858 118.627C97.609 118.658 94.6187 117.021 91.8487 113.024L87.0012 116.675ZM112.498 93.3821C112.466 99.6146 108.406 103.99 102.677 104.021C96.948 103.99 92.9189 99.5516 92.9189 93.3821C92.9189 87.2126 96.948 82.7743 102.677 82.7428C108.406 82.7743 112.466 87.1496 112.498 93.3821Z"
              fill="black"
            />
            <path
              d="M131.465 77.6435H124.98V110.128H131.465V94.3894C131.465 87.2441 134.549 83.152 139.9 83.1206C141.034 83.152 142.293 83.3409 143.552 83.6871V77.3917C142.45 76.9825 141.38 76.7622 140.215 76.7622C136.532 76.7622 133.385 79.06 131.716 82.554H131.465V77.6435Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M171.143 110.128H177.628V77.6435H171.143V82.491H170.891C168.72 78.7138 165.226 76.7622 160.63 76.7622C151.627 76.7622 145.206 84.1278 145.269 93.8857C145.206 103.644 151.627 111.009 160.63 111.009C165.257 111.009 168.751 109.026 170.891 105.217H171.143V110.128ZM171.395 93.8857C171.364 100.37 167.303 104.934 161.637 104.903C155.845 104.934 151.816 100.339 151.879 93.8857C151.816 87.4329 155.845 82.8373 161.637 82.8687C167.303 82.8373 171.364 87.4014 171.395 93.8857Z"
              fill="black"
            />
            <path
              d="M183.878 77.6435H190.362V82.3651H190.614C192.156 78.9026 195.43 76.7622 199.742 76.7622C204.338 76.7622 207.611 79.1859 209.185 83.4353H209.437C210.791 79.3433 214.41 76.7622 219.321 76.7622C226.309 76.7622 230.243 81.9559 230.275 90.4232V110.128H223.728V91.4305C223.728 85.8905 221.524 82.8373 217.684 82.8687C213.844 82.8373 210.318 85.8905 210.318 92.6266V110.128H203.834V91.4305C203.803 85.8905 201.599 82.8373 197.728 82.8687C193.887 82.8373 190.362 85.8905 190.362 92.6266V110.128H183.878V77.6435Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_81_206">
              <rect width="231" height="125" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <label className="text-body2 font-semibold leading-body2 tracking-body2 text-content-primary-light">
          필로그램으로 쉽고 빠르게 프로필을 만들어 보세요.
        </label>
      </div>
      <div className="flex h-auto w-full flex-col gap-2">
        <button
          type="button"
          className="relative flex h-auto w-full flex-row items-center justify-center gap-2 rounded-[14px] bg-[#FAE64D] px-6 py-3"
          onClick={onKakaoLogin}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-4"
          >
            <path
              d="M8.49984 1.33333C4.08213 1.33333 0.5 4.14084 0.5 7.60612C0.5 9.83199 1.98366 11.7863 4.21178 12.9018L3.45798 15.6948C3.42913 15.7805 3.45306 15.8713 3.51567 15.9331C3.55878 15.9762 3.61631 16 3.67876 16C3.72695 16 3.77481 15.981 3.81808 15.9476L7.05928 13.774C7.53002 13.8407 8.01025 13.8788 8.49984 13.8788C12.9175 13.8788 16.5 11.0714 16.5 7.60612C16.5 4.14084 12.9175 1.33333 8.49984 1.33333Z"
              fill="#3C1E1E"
            />
          </svg>
          <div className="text-body2 font-medium leading-body2 tracking-body2 text-static-black">
            카카오로 시작하기
          </div>
        </button>
        <button
          type="button"
          className="relative flex h-auto w-full flex-row items-center justify-center gap-2 rounded-[14px] bg-[#5FC53A] px-6 py-3"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-4"
          >
            <path
              d="M10.5667 15L6.37224 7.75345V15H2V1H6.43326L10.6278 8.24654V1H15V15H10.5667Z"
              fill="white"
            />
          </svg>
          <div className="text-body2 font-medium leading-body2 tracking-body2 text-static-white">
            네이버로 시작하기
          </div>
        </button>
      </div>
    </main>
  );
};

export default Login;
