"use client";

import { routePaths } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(routePaths.home());
    router.push(routePaths.home());
  }, []);
  return <main className=""></main>;
};

export default Home;
