import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", label = "", ...rest }, ref) => {
    return (
      <div className="flex flex-col my-2">
        {label && (
          <label className="my-1 text-gray-700 text-left">{label}</label>
        )}
        <input
          ref={ref}
          className={`border border-gray-300 px-3 py-2 rounded-md ${className}`}
          type={type}
          {...rest}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
