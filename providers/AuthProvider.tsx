"use client";
import { useQueryClient } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Loader } from "@/components/Loader";

import { FirebaseContext } from "./FirebaseProvider";

interface AuthContextInterface {
  user: any | null;
  isLoadingUser?: boolean;
}

export const AuthContext = createContext<AuthContextInterface>({ user: null });

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const { auth } = useContext(FirebaseContext);
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoadingUser(false);
      setUser(user);
    });

    queryClient.invalidateQueries();

    return () => unsubscribe();
  }, [auth, pathname, queryClient, router, user]);

  return (
    <AuthContext.Provider value={{ user, isLoadingUser }}>
      {isLoadingUser ? (
        <div className="h-full w-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
