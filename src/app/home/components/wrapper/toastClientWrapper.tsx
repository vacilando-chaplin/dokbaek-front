"use client";

import Toast from "@/components/atoms/toast";
import { loginErrorState } from "@/lib/atoms";
import { useRecoilValue } from "recoil";

const ToastClientWrapper = () => {
  const error = useRecoilValue(loginErrorState);

  return (
    <div className="flex w-full items-center justify-center">
      <Toast kind={error ? "error" : ""} fullWidth={false} placement="top" />
    </div>
  );
};

export default ToastClientWrapper;
