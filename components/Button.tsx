import React, { ReactNode, forwardRef } from "react";
import { FaSpinner } from "react-icons/fa";

type ButtonVariant = "primary" | "outline" | "link" | "error";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: ButtonVariant;
  left?: ReactNode;
  right?: ReactNode;
  isRounded?: boolean;
  isTextCenter?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      loading,
      children,
      variant = "primary",
      left,
      right,
      isRounded = false,
      isTextCenter,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      primary: `bg-primary text-white font-bold font-semibold`,
      outline: `border border-grayCCC text-black font-semibold bg-white`,
      link: `text-black font-medium`,
      error: `bg-red-500 text-white font-bold`,
    };

    return (
      <button
        {...props}
        ref={ref}
        disabled={loading}
        className={`flex items-center space-x-2 min-h-[48px] py-2 px-5
                  ${variantClasses[variant]} 
                  ${props.className} 
                  ${isRounded ? "rounded-xl" : "rounded"}
                  ${isTextCenter ? "justify-center" : ""}
        `}
      >
        {loading ? (
          <FaSpinner className="animate-spin" />
        ) : (
          <>
            {left && <span>{left}</span>}
            <div>{children}</div>
            {right && <span>{right}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
