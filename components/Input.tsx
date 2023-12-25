import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  theme?: "primary" | "secondary";
  leftIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, theme = "primary", leftIcon, className, ...props }, ref) => {
    let inputClasses = "";
    switch (theme) {
      case "primary":
        inputClasses = "border border-grayCCC text-black";
        break;
      case "secondary":
        inputClasses = "bg-grayF0 text-gray666";
        break;
    }

    return (
      <div className={`flex flex-col w-full ${className}`}>
        {label && (
          <label className="mb-1 text-black font-medium">{label}</label>
        )}
        <div className="flex items-center">
          <div
            className={`${inputClasses} font-medium p-4 rounded-xl w-full flex items-center ${
              error ? "border-error" : ""
            }`}
          >
            {leftIcon && <div className="mr-2">{leftIcon}</div>}
            <input
              {...props}
              ref={ref}
              className="bg-transparent focus:outline-none focus:ring-0 w-full"
            />
          </div>
        </div>
        {error && <p className="text-error mt-2">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
