"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/landing");
    router.push("/landing");
  }, []);
  return <main className=""></main>;
};

export default Home;
