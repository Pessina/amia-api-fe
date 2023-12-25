"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { routes } from "@/utils/constants";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(routes.login);
  }, [router]);

  return null;
};
export default Page;
