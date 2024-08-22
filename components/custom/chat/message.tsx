import { cn } from "@/lib/utils";
import { Bot, CheckCheck } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";

interface MsgProps {
  content: string;
  isUser: boolean;
}

export default function Message({ content, isUser }: MsgProps) {
  return (
    <div className="bg-transparent py-5">
      <div className="px-6 py-2">
        <div
          className={cn("max-w-3xl mx-auto flex", {
            "flex-row-reverse": isUser, // User's messages on the right
            "flex-row": !isUser, // Bot's messages on the left
          })}
        >
          {!isUser && (
            <div
              className={cn(
                "size-10 shrink-0 aspect-square rounded-full border border-zinc-700 bg-zinc-900 flex justify-center items-center cursor-pointer",
              )}
            >
              <Bot className="size-5 text-white" />
            </div>
          )}

          <div
            className={cn("flex flex-col w-full text-start mx-6", {
              "items-end": isUser,
              "items-start mb-5": !isUser,
            })}
          >
            <div
              className={cn("flex items-center space-x-2", {
                "justify-end": isUser,
                "justify-start": !isUser,
              })}
            >
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {!isUser && "x0-GPT"}
              </span>
              {!isUser && (
                <Badge className=" cursor-pointer">
                  <CheckCheck className="size-4 mr-1" />
                  Bot
                </Badge>
              )}
            </div>

            <p
              className={cn(
                "text-md font-normal text-gray-900 dark:text-white px-4 py-2",
                { "bg-[#2F2F2F] rounded-md mt-2 ": isUser },
              )}
            >
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
