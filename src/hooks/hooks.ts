import { useCallback, useEffect, useRef, useState } from "react";

export const useInputs = (init: any) => {
  const [text, setText] = useState(init);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setText((text: any) => ({ ...text, [name]: value }));
    },
    []
  );

  return [text, onInputChange];
};

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

interface ComponentSize {
  width: number;
  height: number;
}

function useComponentSize(): [React.RefObject<HTMLDivElement>, ComponentSize] {
  const [size, setSize] = useState<ComponentSize>({ width: 0, height: 0 });
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        const { width, height } =
          componentRef.current?.getBoundingClientRect() ?? {
            width: 0,
            height: 0
          };
        setSize({ width, height });
      }, 300);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return [componentRef, size];
}

export default useComponentSize;

export const useCheckPageSize = (info: any) => {
  const [page, setPage] = useState({ count: 2, capacity: 0 });

  useEffect(() => {
    const onCheckPage = () => {
      Object.values(info).map((v: any) => {
        if (v.length >= 5) {
          setPage({ ...page, count: 3, capacity: 1 });
          if (v.length >= 20) {
            setPage({ ...page, count: 3, capacity: 2 });
            return;
          }
        } else {
          setPage({ count: 2, capacity: 0 });
        }
      });
      if (Object.keys(info).length >= 3) {
        let odd = 0;
        let even = 0;
        Object.values(info).map((v: any, index: number) => {
          if (index % 2 === 0) {
            even += v.length;
          } else {
            odd += v.length;
          }
        });
        if (odd >= 4 || even >= 4) {
          setPage({ ...page, count: 3, capacity: 1 });
        }
        if (odd >= 20 || even >= 20) {
          setPage({ ...page, count: 3, capacity: 2 });
          return;
        }
      }
      if (Object.keys(info).length >= 5) {
        setPage({ count: 3, capacity: 1 });
      }
    };
    onCheckPage();
  }, [info]);

  return page;
};

export const useGetWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
};

export const useGetRefreshToken = () => {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "refresh_token") {
      return value;
    }
  }
  return null;
};
