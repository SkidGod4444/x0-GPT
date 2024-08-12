import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onInput, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
      const textarea = textareaRef.current;
      if (textarea) {
        const maxHeight = 80; // Adjust this value as needed
        const minHeight = 40; // Default height

        // Reset the height to minHeight if there's no content
        if (textarea.value.trim() === "") {
          textarea.style.height = `${minHeight}px`;
          textarea.style.overflowY = "hidden";
        } else {
          // Measure and adjust height when there's content
          textarea.style.height = "auto";
          const scrollHeight = textarea.scrollHeight;

          if (scrollHeight > maxHeight) {
            textarea.style.overflowY = "scroll";
            textarea.style.height = `${maxHeight}px`;
          } else {
            textarea.style.overflowY = "hidden";
            textarea.style.height = `${scrollHeight}px`;
          }
        }
      }

      if (onInput) {
        onInput(event);
      }
    };

    return (
      <textarea
        ref={(node) => {
          textareaRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn(
          "flex min-h-[40px] max-h-[80px] w-full rounded-md bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground resize-none border border-transparent focus-visible:ring-0 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onInput={handleInput}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
