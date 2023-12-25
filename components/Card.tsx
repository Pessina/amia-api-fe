import React, { ElementType, HTMLAttributes, PropsWithChildren } from "react";

interface CardProps extends HTMLAttributes<HTMLElement> {
  tag?: ElementType;
  padding?: string;
}

const Card: React.FC<PropsWithChildren<CardProps>> = ({
  children,
  tag: Tag = "div",
  className,
  padding = "p-3",
  ...props
}) => {
  return (
    <Tag
      {...props}
      className={`bg-white border rounded-xl border-black12 
      ${className ?? ""}
      ${padding ?? ""}
      ${props.onClick ? "cursor-pointer" : ""}`}
    >
      {children}
    </Tag>
  );
};

export default Card;
