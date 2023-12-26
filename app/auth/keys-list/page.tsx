"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import KeyCard from "./components/KeyCard";
import { useListApiKeys, useDeleteApiKey, useAddApiKey } from "@/api/apiKeys";
import Button from "@/components/Button";

const schema = yup.object().shape({
  apiKeyName: yup.string().required(),
});

const KeysListPage: FC = () => {
  const { data: keys, refetch } = useListApiKeys();
  const deleteKeyMutation = useDeleteApiKey();
  const addKeyMutation = useAddApiKey();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { apiKeyName: string }) => {
    await addKeyMutation.mutateAsync(data.apiKeyName);
    reset();
    refetch();
  };

  return (
    <div className="flex flex-col space-y-4 items-center justify-center h-full min-h-screen w-full">
      {keys?.map((key) => (
        <KeyCard
          key={key.id}
          name={key.name}
          onDelete={async () => deleteKeyMutation.mutateAsync(key.id)}
        />
      ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("apiKeyName")} placeholder="API Key Name" />
        {errors.apiKeyName && <p>This field is required</p>}
        <Button type="submit">Add API Key</Button>
      </form>
    </div>
  );
};

export default KeysListPage;
