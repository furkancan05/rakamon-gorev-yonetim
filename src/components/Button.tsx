import { Loader } from "lucide-react";
import React, { ButtonHTMLAttributes } from "react";
import { cn } from "../utils/cn";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: VoidFunction;
}

export default function Button(props: ButtonProps) {
  const { loading, className, children, disabled, onClick, ...buttonProps } =
    props;

  return (
    <div
      onClick={() => {
        if (disabled || loading) return;

        onClick?.();
      }}
      className={cn(
        "min-w-20 rounded-md text-black bg-white flex gap-2 items-center justify-center px-4 py-2 cursor-pointer hover:bg-white/90 transition-colors",
        { "cursor-not-allowed bg-white/80 text-black/80": disabled || loading },
        className
      )}
    >
      <button
        disabled={loading || disabled}
        {...buttonProps}
        className="flex items-center gap-2 pointer-events-none text-xs md:text-base"
      >
        {loading ? (
          <Loader className="animate-spin size-4 md:size-6" />
        ) : (
          children
        )}
      </button>
    </div>
  );
}
