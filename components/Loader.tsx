import React, { FC } from "react";
import { IconBaseProps } from "react-icons";
import { RiLoader4Line } from "react-icons/ri";

type LoaderProps = IconBaseProps & {
  className?: string;
};

export const Loader: FC<LoaderProps> = ({ className, size = 40, ...props }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <RiLoader4Line className="animate-spin text-4xl" size={size} {...props} />
    </div>
  );
};
