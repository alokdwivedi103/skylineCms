import { FieldError } from "react-hook-form";

import { cn } from "@/lib/utils";

interface InputErrorProps {
  error: FieldError | undefined;
  className?: string;
}

export default function InputError({ error, className = "" }: InputErrorProps) {
  return (
    error && (
      <div className={cn(className, "text-red-600 text-left -mt-2 mb-2")}>
        {error.message}
      </div>
    )
  );
}
