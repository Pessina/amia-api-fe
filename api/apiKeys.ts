import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./config";

export const useAddApiKey = () =>
  useMutation({
    mutationFn: (apiKeyName: string) =>
      axiosInstance.post(`/api-key`, { name: apiKeyName }),
  });

export const useDeleteApiKey = () =>
  useMutation({
    mutationFn: (id: number) => axiosInstance.delete(`/api-key/${id}`),
  });

export const useListApiKeys = () =>
  useQuery({
    queryKey: ["api-keys"],
    queryFn: () => axiosInstance.get(`/api-keys`),
  });
