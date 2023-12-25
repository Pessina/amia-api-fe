"use client";
import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";
import { ReactNode, createContext } from "react";

import { app, auth } from "../firebase/firebase";

type AuthProviderProps = {
  children: ReactNode;
};

type FirebaseContextType = {
  app: FirebaseApp;
  auth: Auth;
};

export const FirebaseContext = createContext<FirebaseContextType>({
  auth,
  app,
});

export const FirebaseProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ app, auth }}>
      {children}
    </FirebaseContext.Provider>
  );
};
