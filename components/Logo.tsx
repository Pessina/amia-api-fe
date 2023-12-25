import Image, { ImageProps } from "next/image";
import React from "react";

interface LogoProps extends Omit<ImageProps, "src" | "alt"> {
  width?: number;
  height?: number;
  type?: "icon" | "icon-text";
}

export const Logo: React.FC<LogoProps> = ({
  width = 200,
  height = 200,
  type = "icon",
  ...props
}) => {
  let src = "/images/icon.png";
  if (type === "icon-text") {
    src = "/images/logo.png";
  }
  if (type === "icon") {
    src = "/images/logo-icon.png";
  }

  return (
    <Image
      {...props}
      src={src}
      alt="logo"
      className={`${props.className} rounded-md`}
      height={height}
      width={width}
    />
  );
};
