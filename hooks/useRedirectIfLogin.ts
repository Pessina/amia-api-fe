import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRedirectIfLoggedIn = (route: string) => {
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    if (auth.currentUser) {
      router.push(route);
    }
  }, [auth.currentUser, route, router]);
};
