"use client";

import { AuthLogin, postUser } from "@/api/api";
import Loading from "@/components/atoms/loading";
import { defaultId, jwt } from "@/data/atom";
import { KakaoDataTypes, SignUpResponseTypes } from "@/types/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

const Kakao = () => {
  const router = useRouter();

  const setId = useSetRecoilState(defaultId);
  const setJWT = useSetRecoilState(jwt);

  const searchParams = useSearchParams();
  const authCode = searchParams?.get("code");
  const [data, setData] = useState<KakaoDataTypes | null>(null);

  const [postData, setPostData] = useState({
    domain: "KAKAO",
    accessToken: "",
    deviceId: ""
  });

  const [resData, setResData] = useState<any>({});

  console.log(resData.data);

  const onClick = () => {
    setId(resData.data.defaultProfileId);
    setJWT(resData.data.token.jwt);
    router.push(`/profile`);
  };

  useEffect(() => {
    const checkCode = async () => {
      if (!authCode) {
        return;
      }
      if (authCode) {
        //await AuthLogin(authCode).then((res) => setData(res));
        setPostData({ ...postData, accessToken: authCode });
      }
    }
    checkCode();
  }, [authCode]);

  useEffect(() => {
    if (data) {
      setPostData({ ...postData, accessToken: data.data.access_token });
    }
  }, [data]);

  useEffect(() => {
    postUser(postData)
      .then((res: SignUpResponseTypes) => {
        setResData(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postData]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-2">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.2236 5.3098C22.6048 5.70945 22.5898 6.34244 22.1902 6.72362L8.86639 19.432L1.75865 11.5802C1.388 11.1708 1.41946 10.5384 1.8289 10.1677C2.23835 9.79709 2.87073 9.82854 3.24137 10.238L8.97146 16.568L20.8098 5.27638C21.2095 4.8952 21.8424 4.91016 22.2236 5.3098Z"
            fill="#01C043"
          />
        </svg>
        <div className="flex flex-col items-center text-heading3 font-semibold leading-heading3 tracking-heading3 text-content-primary-light">
          <p>{`{카카오}`} 계정으로</p>
          <p>회원가입이 완료되었어요.</p>
        </div>
        <label className="items-center text-body2 font-medium leading-body2 tracking-body2 text-content-secondary-light">
          이제 나만의 프로필을 만들어 보세요.
        </label>
      </div>
      <button
        type="button"
        className="flex h-auto w-auto items-center justify-center gap-2 rounded-[14px] bg-accent-primary-light px-6 py-3.5"
        onClick={onClick}>
        <div className="text-body2 font-medium leading-body2 tracking-body2 text-static-white">
          프로필 만들기
        </div>
      </button>
    </div>
  );
};

export default function KaKaoWrapper() {
  return (
    <Suspense fallback={<Loading />}>
      <Kakao />
    </Suspense>
  )
}
