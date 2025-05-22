"use client";

import Toast from "@/components/atoms/toast";
import { loginErrorState } from "@/lib/atoms";
import { useRecoilValue } from "recoil";

const ToastClientWrapper = () => {
  const error = useRecoilValue(loginErrorState);

  return (
    <Toast kind={error ? "error" : ""} fullWidth={false} placement="top" />
  );
};

export default ToastClientWrapper;
