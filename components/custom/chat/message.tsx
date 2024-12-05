import { cn } from "@/lib/utils";
import { Bot, CheckCheck } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MsgProps {
  content: string;
  isUser: boolean;
}

const CustomMarkdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({node, ...props}) => <h1 className="text-xl sm:text-2xl font-bold mb-2 mt-4" {...props} />,
        h2: ({node, ...props}) => <h2 className="text-lg sm:text-xl font-semibold mb-2 mt-3" {...props} />,
        h3: ({node, ...props}) => <h3 className="text-base sm:text-lg font-medium mb-2 mt-2" {...props} />,
        ul: ({node, ...props}) => (
          <ul 
            className="list-disc list-outside pl-4 sm:pl-6 space-y-1 mb-2" 
            {...props} 
          />
        ),
        ol: ({node, ...props}) => (
          <ol 
            className="list-decimal list-outside pl-4 sm:pl-6 space-y-1 mb-2" 
            {...props} 
          />
        ),
        code: ({node, inline, className, children, ...props}) => {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={dracula}
              language={match[1]}
              PreTag="div"
              className="rounded-md text-xs sm:text-sm overflow-x-auto p-2 sm:p-4 my-2 max-w-full"
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code 
              className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded-md text-xs sm:text-sm break-words"
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default function Message({ content, isUser }: MsgProps) {
  return (
    <div className="bg-transparent py-3 sm:py-5">
      <div className="px-2 sm:px-6 py-1 sm:py-2">
        <div
          className={cn("max-w-3xl mx-auto flex items-start", {
            "flex-row-reverse": isUser, // User's messages on the right
            "flex-row": !isUser, // Bot's messages on the left
          })}
        >
          {!isUser && (
            <div
              className={cn(
                "size-8 sm:size-10 shrink-0 aspect-square rounded-full border border-zinc-700 bg-zinc-900 flex justify-center items-center cursor-pointer",
              )}
            >
              <Bot className="size-4 sm:size-5 text-white" />
            </div>
          )}

          <div
            className={cn("flex flex-col w-full text-start mx-2 sm:mx-6", {
              "items-end": isUser,
              "items-start mb-3 sm:mb-5": !isUser,
            })}
          >
            <div
              className={cn("flex items-center space-x-2 mb-1", {
                "justify-end": isUser,
                "justify-start": !isUser,
              })}
            >
              <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                {!isUser && "x0-GPT"}
              </span>
              {!isUser && (
                <Badge className="cursor-pointer text-xs sm:text-sm">
                  <CheckCheck className="size-3 sm:size-4 mr-1" />
                  Bot
                </Badge>
              )}
            </div>

            <div
              className={cn(
                "text-sm sm:text-md font-normal text-gray-900 dark:text-white px-2 sm:px-4 py-1 sm:py-2 w-full break-words",
                { 
                  "bg-[#2F2F2F] rounded-md mt-1 sm:mt-2": isUser,
                  "w-[calc(100vw-100px)] sm:w-full": true // Ensure content doesn't overflow on small screens
                },
              )}
            >
              <CustomMarkdown>{content}</CustomMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}