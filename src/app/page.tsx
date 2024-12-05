"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/login");
    router.push("/login");
  }, []);
  return <main className=""></main>;
};

export default Home;
