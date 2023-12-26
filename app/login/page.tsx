"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { Logo } from "@/components/Logo";
import { useRedirectIfLoggedIn } from "@/hooks/useRedirectIfLogin";
import { routes } from "@/utils/constants";

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  useRedirectIfLoggedIn(routes.keysList);
  const router = useRouter();
  const auth = getAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation("", { keyPrefix: "pages.login" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const { email, password } = data;
      await signInWithEmailAndPassword(auth, email, password);
      router.push(routes.keysList);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white">
      <Logo width={130} height={40} type="icon-text" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center space-y-4 w-[300px] my-8"
      >
        <Input
          {...register("email")}
          label={t("email")}
          error={errors.email?.message}
        />
        <Input
          {...register("password")}
          type="password"
          label={t("password")}
          error={errors.password?.message}
        />
        <Button
          isRounded
          type="submit"
          variant="primary"
          className="w-full"
          isTextCenter
          loading={loading}
        >
          {t("login")}
        </Button>
      </form>
      <Button
        type="button"
        variant="link"
        isTextCenter
        onClick={() => router.push(routes.register)}
      >
        {t("register")}
      </Button>
    </div>
  );
}
