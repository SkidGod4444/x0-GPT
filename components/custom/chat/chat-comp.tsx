"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BookCopy,
  BrainCircuit,
  FileText,
  InboxIcon,
  SquarePen,
  SquareTerminal,
} from "lucide-react";
import {
  IconLayoutSidebarLeftExpand,
  IconLayoutSidebarLeftCollapse,
  IconArrowUp,
  IconStack2,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { SpaceComp } from "../sidebar/spaces-comp";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import useLocalStorage from "@/lib/local-storage";
import { MobSidebar } from "../sidebar/mob-sidebar";
import FileUploadComp from "../file-upload-comp";
import AddResComp from "../sidebar/add-res-comp";
import { Message, useChat } from "ai/react";
import MsgsWrapper from "./msgs-wrapper";
import { useEffect } from "react";
import UserBtn from "../user-btn";
import { useAuth } from "@/context/auth.context";
import { useRouter } from "next/navigation";
import { getChatBySlug, storeChat, updateChatTitle } from "@/db/func";
import SearchComp from "../sidebar/search-comp";
import { HistoryViewer } from "../sidebar/history-viewer";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ChatComp = ({
  chatId,
  history,
  offRag,
  onHasMessagesChange,
}: {
  chatId: string;
  history?: Message[];
  offRag?: boolean;
  onHasMessagesChange?: (hasMessages: boolean) => void;
}) => {
  const { user } = useAuth();
  const uid = user?.id!;
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        const form = document.querySelector("form");
        if (form) {
          form.requestSubmit();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const { messages, handleInputChange, handleSubmit, input, isLoading } =
    useChat({
      api: "/api/stream/reply",
      body: { chatId, offRag },
      initialMessages: history,
    });

  useEffect(() => {
    const storeChatData = async (title: string) => {
      const isSlug = await getChatBySlug(chatId);
      if (!isSlug) {
        storeChat(uid, chatId, title);
      }
    };
    if (messages.length) {
      const title = messages[0].content;
      const tits = title.length > 30 ? `${title.slice(0, 30)}...` : title;
      storeChatData(tits);
      if (onHasMessagesChange) {
        onHasMessagesChange(true);
      }
    }
  }, [messages, uid, chatId, onHasMessagesChange]);

  const [isCollapsed, setIsCollapsed] = useLocalStorage(
    "x0-isCollapsed",
    false,
  );

  const handleNewChat = () => {
    router.replace("/chat");
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const ITEMS = [
    {
      description: "How can i make my own data groups?",
      icon: <BrainCircuit className="h-4 w-4 text-blue-500" />,
    },
    {
      description: "Can you help me in my homework?",
      icon: <BookCopy className="h-4 w-4 text-pink-500" />,
    },
    {
      description: "How can i get summary of a pdf?",
      icon: <FileText className="h-4 w-4 text-yellow-500" />,
    },
    {
      description: "Can you teach me DSA?",
      icon: <SquareTerminal className="h-4 w-4" />,
    },
  ];

  return (
    <div className="flex min-h-screen w-full">
      {/* Screen Left Side Content */}
      <aside
        className={`hidden md:fixed inset-y-0 left-0 z-10 md:flex flex-col border-r bg-[#171717] transition-all duration-300 overflow-hidden ${
          isCollapsed ? "opacity-0 w-0" : "opacity-100 w-60"
        }`}
      >
        <div className="flex py-3 flex-col w-full items-center justify-center border-b">
          <div
            className={`transition-all duration-700 overflow-hidden cursor-pointer ${
              !isCollapsed ? "opacity-100" : "opacity-0"
            }`}
          >
            <span
              className={`text-4xl font-bold text-muted-foreground transition-all duration-300 overflow-hidden ${
                !isCollapsed ? "opacity-100" : "opacity-0"
              }`}
            >
              x0-GPT
            </span>
            {!isCollapsed ? (
              <Badge
                variant="secondary"
                className={`rounded-full transition-all duration-700 overflow-hidden ${
                  !isCollapsed ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="text-xs">Beta</span>
              </Badge>
            ) : null}
          </div>
        </div>

        <ScrollArea className="flex flex-col w-full h-full">
          <div
            className={`flex-1 flex-col transition-all duration-700 overflow-hidden ${
              !isCollapsed ? "opacity-100" : "opacity-0"
            }`}
          >
            <nav className="grid gap-1 px-2 py-4">
              {!isCollapsed ? <SpaceComp /> : null}
              {!isCollapsed ? <SearchComp /> : null}
              <div className="flex w-full border-b mt-3" />
              {!isCollapsed ? <AddResComp /> : null}
              <MenuItem
                href="/memories"
                icon={<InboxIcon className="h-5 w-5" />}
                label="Memories"
                isCollapsed={isCollapsed}
              />
              {/* <MenuItem
                href="/spaces"
                icon={<IconStack2 className="size-6" />}
                label="Spaces"
                isCollapsed={isCollapsed}
              /> */}
              <div className="flex w-full border-b mt-3" />
            </nav>
            <div className="flex flex-col min-h-[50vh] w-full">
              <HistoryViewer slug={chatId} />
            </div>
          </div>
        </ScrollArea>

        <div className="flex h-14 items-center justify-between border-t px-4">
          <div
            className={`flex items-center justify-between gap-2 transition-all duration-300 overflow-hidden ${
              !isCollapsed ? "opacity-100 w-full" : "opacity-0 w-0"
            }`}
          >
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl text-muted-foreground"
              onClick={toggleCollapse}
            >
              {!isCollapsed ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <IconLayoutSidebarLeftCollapse className="h-6 w-6 transition-transform duration-300" />
                    </TooltipTrigger>
                    <TooltipContent>Collapse</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <IconLayoutSidebarLeftExpand className="h-6 w-6 transition-transform duration-300" />
                    </TooltipTrigger>
                    <TooltipContent>Expand</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </Button>
            {!isCollapsed ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl text-muted-foreground"
                      onClick={handleNewChat}
                    >
                      <SquarePen className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>New Chat</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : null}
          </div>
        </div>
      </aside>

      {/* Screen Right Side Content Area */}
      <div
        className={`flex-1 h-full bg-[#212121] transition-all duration-300 overflow-hidden ${
          isCollapsed ? "w-full md:ml-0" : "md:ml-60"
        }`}
      >
        {/* Top Content */}
        <div className="flex h-[60px] w-full items-center justify-between px-4">
          {/* Left Side */}
          <div className="md:hidden flex items-center justify-start">
            <MobSidebar slug={chatId} />
          </div>
          <div
            className={`hidden md:flex items-center bg-[#171717] rounded-xl transition-all duration-700 overflow-hidden ${
              isCollapsed ? "opacity-100 max-w-full" : "opacity-0 max-w-0"
            }`}
          >
            {isCollapsed ? <SpaceComp /> : null}
          </div>

          {/* Center (Logo) */}
          {isCollapsed ? (
            <div
              className={`hidden md:flex items-center justify-center transition-all duration-700 cursor-pointer ${
                isCollapsed ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-4xl font-bold text-muted-foreground">
                x0-GPT
              </span>
              <Badge variant="secondary" className="ml-2 rounded-full">
                <span className="text-xs">Beta</span>
              </Badge>
            </div>
          ) : null}

          <div className="flex md:hidden items-center justify-center transition-all duration-700 cursor-pointer">
            <span className="text-4xl font-bold text-muted-foreground">
              x0-GPT
            </span>
            <Badge variant="secondary" className="ml-2 rounded-full">
              <span className="text-xs">Beta</span>
            </Badge>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-5">
            {isCollapsed ? (
              <div
                className={`hidden md:flex bg-[#171717] rounded-xl transition-all duration-700 overflow-hidden ${
                  isCollapsed ? "opacity-100 max-w-full" : "opacity-0 max-w-0"
                }`}
              >
                <SearchComp />
              </div>
            ) : null}

            <div className="flex items-center justify-end">
              <UserBtn />
            </div>
          </div>
        </div>

        {/* Screen Center Content */}
        <div className="flex h-full w-full items-center justify-center">
          {messages.length ? (
            <div
              className={`relative h-full w-full p-5 ${
                isCollapsed ? "md:mr-0" : "md:mr-20"
              }`}
            >
              <MsgsWrapper msgs={messages} />
            </div>
          ) : (
            <div
              className={`grid grid-cols-2 p-10 md:grid-cols-4 gap-4 mb-40 ${
                isCollapsed ? "md:mr-0" : "md:mr-20"
              }`}
            >
              {ITEMS.map((item, index) => (
                <div key={index}>
                  <div className="flex h-full w-40 hover:bg-muted border-2 border-dashed border-muted rounded-3xl select-none flex-col items-center justify-center p-3 cursor-pointer">
                    <div className="relative mt-2 w-full items-center justify-start">
                      {item.icon}
                    </div>
                    <p className="text-sm mt-2 mb-8 text-start text-zinc-600 dark:text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Screen Bottom Content */}
      <div className="fixed bg-[#212121] bottom-0 flex h-[60px] w-full items-center justify-between px-4 ">
        <div className="flex h-full w-full items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center justify-start">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl text-muted-foreground hidden md:flex"
              onClick={toggleCollapse}
            >
              {!isCollapsed ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <IconLayoutSidebarLeftCollapse className="h-6 w-6 transition-transform duration-300" />
                    </TooltipTrigger>
                    <TooltipContent>Collapse</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <IconLayoutSidebarLeftExpand className="h-6 w-6 transition-transform duration-300" />
                    </TooltipTrigger>
                    <TooltipContent>Expand</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </Button>
          </div>

          {/* Center Comp */}
          <div
            className={`flex flex-col mb-10 items-center justify-center transition-all duration-300 ${
              isCollapsed ? "w-full mx-0 md:mx-40" : "w-full md:ml-80 md:mr-40"
            }`}
          >
            <div className="flex h-full w-full bg-secondary p-2 rounded-full items-center justify-center bg-[#2F2F2F]">
              <form
                onSubmit={handleSubmit}
                className="flex h-full w-full items-center justify-between"
              >
                {/* Left Button */}
                <div className="flex w-auto h-full m-1 items-center justify-start">
                  <FileUploadComp disabled={isLoading} />
                </div>
                <Textarea
                  value={input}
                  onChange={handleInputChange}
                  className="h-5 w-full mx-2 focus-visible:outline-none text-white font-normal"
                  placeholder="Ask anything to x0-GPT..."
                />

                {/* Right Button */}
                <div className="flex w-auto h-full m-1 items-center justify-end">
                  <Button
                    type="submit"
                    size="icon"
                    className="rounded-full"
                    disabled={input === "" || isLoading}
                  >
                    <IconArrowUp className="h-6 w-6" />
                  </Button>
                </div>
              </form>
            </div>

            {/* Disclaimer */}
            <div className="flex items-center justify-center">
              <span className="text-xs mt-2 pb-5 text-muted-foreground">
                x0-GPT can make mistakes rarely. Check important info.
              </span>
            </div>
          </div>

          {/* Right Side */}
          <div
            className={`hidden md:flex items-center justify-end transition-all duration-700 overflow-hidden ${
              isCollapsed ? "opacity-100" : "opacity-0"
            }`}
          >
            {isCollapsed ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl text-muted-foreground"
                      onClick={handleNewChat}
                    >
                      <SquarePen className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>New Chat</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

function MenuItem({ href, icon, label, isCollapsed }: any) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-300 ${
        isCollapsed ? "justify-center opacity-0" : "justify-start opacity-100"
      }`}
      prefetch={false}
    >
      {icon}
      <span className="transition-opacity duration-300 opacity-100">
        {label}
      </span>
    </Link>
  );
}
