"use client";
import { getAuth } from "firebase/auth";
import React from "react";
import { useTranslation } from "react-i18next";
import { RiLogoutBoxLine } from "react-icons/ri";

import { useLogout } from "../api/auth";

import { Logo } from "./Logo";
import Dropdown from "./Dropdown";

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const auth = getAuth();
  const logoutMutation = useLogout(auth);
  const { t } = useTranslation("", { keyPrefix: "header" });

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
  };

  return (
    <header
      className={`${className} bg-white text-black60 p-4 flex justify-between items-center border-b border-black12`}
    >
      <Logo height={36} width={36} type="icon" />
      <Dropdown
        text={auth.currentUser?.email ?? ""}
        options={[
          {
            label: t("logout"),
            icon: <RiLogoutBoxLine />,
            onClick: handleLogout,
          },
        ]}
      />
    </header>
  );
};

export default Header;
