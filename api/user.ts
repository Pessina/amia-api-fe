import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "./config";

export const useCreateUser = () =>
  useMutation({
    mutationFn: ({
      firebaseUid,
      email,
    }: {
      firebaseUid: string;
      email: string;
    }) => axiosInstance.post(`/user`, { firebaseUid, email }),
  });

export const useDeleteUser = () =>
  useMutation({
    mutationFn: (id: number) => axiosInstance.delete(`/user/${id}`),
  });
