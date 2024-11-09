"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = async () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router])
  return <main className="">

  </main>;
};

export default Home;