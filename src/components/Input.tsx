import { InputHTMLAttributes, useState } from "react";
import { cn } from "../utils/cn";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange?: (e: string) => void;
  className?: string;
  inputClassName?: string;
}

export default function Input(props: InputProps) {
  const { className, inputClassName, onChange, ...inputProps } = props;

  const [focus, setFocus] = useState(false);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {inputProps.name ? (
        <label
          htmlFor={inputProps.name}
          className={cn("text-white/60", { "text-white": focus })}
        >
          {inputProps.name}
        </label>
      ) : null}

      <input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => onChange?.(e.target.value)}
        {...inputProps}
        className={cn(
          "min-w-[300px] w-full text-white text-xs md:text-base p-2 border border-white/60 rounded-md focus:outline-none transition-colors",
          { "border-white": focus },
          inputClassName
        )}
      />
    </div>
  );
}
