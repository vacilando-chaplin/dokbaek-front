import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export const useSetToken = (name: string, token: string) => {
  Cookies.set(name, token, {
    expires: 1,
    path: "/",
    sameSite: "Strict"
  });
};
