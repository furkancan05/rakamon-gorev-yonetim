import { TextareaHTMLAttributes, useState } from "react";
import { cn } from "../utils/cn";

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  onChange?: (e: string) => void;
  className?: string;
  textareaClassName?: string;
}

export default function Textarea(props: TextareaProps) {
  const { className, textareaClassName, onChange, ...textareaProps } = props;

  const [focus, setFocus] = useState(false);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {textareaProps.name ? (
        <label
          htmlFor={textareaProps.name}
          className={cn("text-black/50", { "text-black": focus })}
        >
          {textareaProps.name}
        </label>
      ) : null}

      <textarea
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => onChange?.(e.target.value)}
        {...textareaProps}
        className={cn(
          "min-w-[300px] w-full max-h-[400px] text-black text-xs md:text-base p-2 border border-black/50 rounded-md focus:outline-none transition-colors",
          { "border-black": focus },
          textareaClassName
        )}
      />
    </div>
  );
}
