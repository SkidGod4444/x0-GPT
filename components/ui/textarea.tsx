import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onInput, onKeyDown, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
      const textarea = textareaRef.current;
      if (textarea) {
        const maxHeight = 80; // Adjust this value as needed
        const minHeight = 30; // Default height

        // Reset the height to minHeight if there's no content
        if (textarea.value.trim() === "" || null || undefined) {
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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Prevents the default newline behavior
        const form = event.currentTarget.form;
        if (form) {
          form.requestSubmit(); // Triggers the form submission
        }
      }

      if (onKeyDown) {
        onKeyDown(event);
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
          className,
        )}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
