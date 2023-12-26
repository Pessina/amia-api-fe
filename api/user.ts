import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "./config";

type User = {
  id: number;
  firebaseUid: string;
  email: string;
};

export const useCreateUser = () =>
  useMutation<User, unknown, { firebaseUid: string; email: string }>({
    mutationFn: async ({ firebaseUid, email }) => {
      const response = await axiosInstance.post(`/user`, {
        firebaseUid,
        email,
      });
      return response.data;
    },
  });

export const useDeleteUser = () =>
  useMutation<boolean, unknown, number>({
    mutationFn: async (id: number) => {
      const response = await axiosInstance.delete(`/user/${id}`);
      return response.data;
    },
  });
