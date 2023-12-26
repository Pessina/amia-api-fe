import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Auth,
  createUserWithEmailAndPassword,
  deleteUser as firebaseDeleteUser,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";

import { routes } from "@/utils/constants";

export const createUser = async (
  auth: Auth,
  data: { email: string; password: string }
) => {
  try {
    return await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const deleteUser = async (auth: Auth) => {
  try {
    const user = auth.currentUser;
    if (user) {
      await firebaseDeleteUser(user);
    }
  } catch (e) {
    console.error("Failed to delete user: ", e);
  }
};

export const login = async (
  auth: Auth,
  data: { email: string; password: string }
) => {
  try {
    return await signInWithEmailAndPassword(auth, data.email, data.password);
  } catch (e) {
    throw new Error("Login failed");
  }
};

export const sendPasswordResetEmail = async (auth: Auth, email: string) => {
  try {
    await firebaseSendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const useLogout = (auth: Auth) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => auth.signOut(),
    onSuccess: () => {
      queryClient.invalidateQueries();
      queryClient.clear();
      router.push(routes.login);
    },
  });
};
