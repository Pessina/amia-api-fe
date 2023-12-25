"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import { existDoctor, useCreateDoctor } from "@/api/doctor";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import { Logo } from "@/components/Logo";
import { useRedirectIfLoggedIn } from "@/hooks/useRedirectIfLogin";
import { routes } from "@/utils/constants";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
  cpf: yup.string().required(),
  crm: yup.string().required(),
  specialty: yup.string().required(),
});

type FormData = {
  name: string;
  email: string;
  password: string;
  cpf: string;
  crm: string;
  specialty: string;
};

export default function RegisterPage() {
  useRedirectIfLoggedIn(routes.patientList);
  const router = useRouter();
  const auth = getAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation("", { keyPrefix: "pages.register" });

  const { mutateAsync } = useCreateDoctor();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { name, email, password, cpf, crm, specialty } = data;
      const doctorExists = await existDoctor({ email, cpf, crm });

      if (!doctorExists.data) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await mutateAsync({
          firebaseUserUID: userCredential.user.uid,
          name,
          email,
          cpf,
          crm,
          specialty,
        });

        router.push(routes.patientList);
      } else {
        console.error(t("doctorExists"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <Card className="space-y-4 flex flex-col items-center w-[400px]">
        <Logo width={100} height={100} />
        <h1 className="text-3xl font-bold mb-8">{t("register")}</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center space-y-4 w-full"
        >
          <Input
            {...register("name")}
            label={t("name")}
            error={errors.name?.message}
          />
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
          <Input
            {...register("cpf")}
            label={t("cpf")}
            error={errors.cpf?.message}
          />
          <Input
            {...register("crm")}
            label={t("crm")}
            error={errors.crm?.message}
          />
          <Input
            {...register("specialty")}
            label={t("specialty")}
            error={errors.specialty?.message}
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isTextCenter
            loading={loading}
          >
            {t("register")}
          </Button>
          <Button
            type="button"
            variant="link"
            isTextCenter
            onClick={() => router.push(routes.login)}
          >
            {t("login")}
          </Button>
        </form>
      </Card>
    </div>
  );
}
