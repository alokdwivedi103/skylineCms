import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  variant = "primary",
  children,
  ...rest
}) => {
  const baseClasses =
    "px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-full";
  const variantClasses =
    variant === "primary"
      ? "bg-[#7F265B]/90 text-white hover:bg-[#7F265B] focus:ring-blue-500"
      : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-gray-500";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
