"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArchiveIcon,
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
  IconSend,
  IconArrowUp,
  IconPaperclip,
} from "@tabler/icons-react";
import SearchComp from "../search-comp";
import { Badge } from "@/components/ui/badge";
import { SpaceComp } from "../spaces-comp";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useLocalStorage from "@/lib/local-storage";
import { MobSidebar } from "../sidebar/mob-sidebar";
import { UserBtn } from "../user-btn";

export default function ChatComp() {
  const [isCollapsed, setIsCollapsed] = useLocalStorage(
    "x0-isCollapsed",
    false
  );

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
        <div
          className={`flex-1 flex-col transition-all duration-700 overflow-hidden ${
            !isCollapsed ? "opacity-100" : "opacity-0"
          }`}
        >
          <nav className="grid gap-1 px-2 py-4">
            {!isCollapsed ? <SpaceComp /> : null}
            {!isCollapsed ? <SearchComp /> : null}
            <MenuItem
              href="/memories"
              icon={<InboxIcon className="h-5 w-5" />}
              label="Memories"
              isCollapsed={isCollapsed}
            />
            <MenuItem
              href="/archives"
              icon={<ArchiveIcon className="h-5 w-5" />}
              label="Archives"
              isCollapsed={isCollapsed}
            />
          </nav>
        </div>

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
                    >
                      <SquarePen className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Create</TooltipContent>
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
        <div className="flex h-[60px] w-full items-center justify-between px-4 ">
          {/* Left Side */}
          <div className="md:hidden flex items-center justify-start">
            <MobSidebar />
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
              <UserBtn/>
            </div>
          </div>
        </div>

        {/* Screen Center Content */}
        <div className="flex h-full w-full items-center justify-center">
          <div
            className={`grid grid-cols-2 p-10 md:grid-cols-4 gap-4 mb-40 ${
              isCollapsed ? "md:mr-0" : "md:mr-20"
            }`}
          >
            {ITEMS.map((item, index) => (
              <div key={index}>
                <div className="flex h-full w-40 hover:bg-muted border-2 border-dashed border-muted rounded-3xl select-none flex-col items-center justify-center p-3">
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
        </div>
      </div>

      {/* Bottom Content */}
      <div className="fixed bottom-0 flex h-[60px] w-full items-center justify-between px-4 ">
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
            <Label className="flex h-full w-full bg-secondary rounded-full p-2 items-end justify-between">
              {/* Left Button */}
              <div className="flex w-auto h-full m-1 items-center justify-start">
                <Button size="icon" variant="ghost" className="rounded-full">
                  <IconPaperclip className="h-6 w-6" />
                </Button>
              </div>

              <Textarea
                className="h-5 w-full mx-2 focus-visible:outline-none text-white font-normal"
                placeholder="Ask anything to x0-GPT..."
              />

              {/* Right Button */}
              <div className="flex w-auto h-full m-1 items-center justify-end">
                <Button size="icon" className="rounded-full">
                  <IconArrowUp className="h-6 w-6" />
                </Button>
              </div>
            </Label>

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
                    >
                      <SquarePen className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Create</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

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
