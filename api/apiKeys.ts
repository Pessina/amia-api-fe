import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./config";

export const useAddApiKey = () =>
  useMutation<string, unknown, string>({
    mutationFn: async (apiKeyName: string) => {
      const response = await axiosInstance.post(`/api-key`, {
        name: apiKeyName,
      });
      return response.data;
    },
  });

export const useDeleteApiKey = () =>
  useMutation<void, unknown, number>({
    mutationFn: async (id: number) => {
      await axiosInstance.delete(`/api-key/${id}`);
    },
  });

export const useListApiKeys = () =>
  useQuery<{ name: string; id: number }[], unknown>({
    queryKey: ["api-keys"],
    queryFn: async () => (await axiosInstance.get(`/api-keys`)).data,
  });
