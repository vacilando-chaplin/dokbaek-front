"use client";

import { useSearchParams } from "next/navigation";

const OauthError = () => {
  const urlParams = useSearchParams();
  const errorCode = urlParams.get("errorCode");
  const errorInfo = errorCode ? loginErrorMessages[errorCode] : null;

  return (
    <div className="flex items-center justify-center">
      {errorInfo ? (
        <div>
          <div>{errorInfo.title}</div>
          <p>{errorInfo.message}</p>
        </div>
      ) : (
        <div>
          <div>알 수 없는 오류</div>
          <p>문제가 발생했습니다. 다시 시도해 주세요.</p>
        </div>
      )}
    </div>
  );
};

export default OauthError;
