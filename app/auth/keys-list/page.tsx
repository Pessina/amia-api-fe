"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import KeyCard from "./components/KeyCard";
import { useListApiKeys, useDeleteApiKey, useAddApiKey } from "@/api/apiKeys";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useTranslation } from "react-i18next";
import { Modal } from "@/components/Modal";
import { APIKeyModal } from "./components/APIKeyModal";

const schema = yup.object().shape({
  apiKeyName: yup.string().required(),
});

const KeysListPage: FC = () => {
  const { t } = useTranslation("", { keyPrefix: "pages.keysList" });
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const onSubmit = async (data: { apiKeyName: string }) => {
    const newKey = await addKeyMutation.mutateAsync(data.apiKeyName);
    setApiKey(newKey);
    setIsModalOpen(true);
    reset();
    refetch();
  };

  return (
    <div className="flex flex-col space-y-8 items-center justify-center h-full min-h-screen w-full">
      <APIKeyModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        apiKey={apiKey}
      />
      <ul className="w-[300px] flex flex-col items-center justify-center space-y-4">
        {keys &&
          keys?.map((key) => (
            <KeyCard
              key={key.id}
              name={key.name}
              onDelete={async () => {
                await deleteKeyMutation.mutateAsync(key.id);
                refetch();
              }}
            />
          ))}
      </ul>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col items-center justify-center"
      >
        <Input
          {...register("apiKeyName")}
          placeholder={t("apiKeyNamePlaceholder")}
          error={errors.apiKeyName?.message}
        />
        <Button type="submit">{t("addApiKeyButton")}</Button>
      </form>
    </div>
  );
};

export default KeysListPage;
