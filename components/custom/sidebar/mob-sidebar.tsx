import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IconAlignLeft, IconStack2 } from "@tabler/icons-react";
import { SpaceComp } from "./spaces-comp";
import { InboxIcon, SquarePen } from "lucide-react";
import Link from "next/link";
import AddResComp from "./add-res-comp";
import { useRouter } from "next/navigation";
import SearchComp from "./search-comp";
import { HistoryViewer } from "./history-viewer";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  slug: string;
}
export function MobSidebar({ slug }: Props) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setIsSheetOpen(true);
      } else {
        setIsSheetOpen(false);
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleNewChat = () => {
    router.replace("/chat");
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl text-muted-foreground"
        >
          <IconAlignLeft className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-60 px-2 bg-[#171717]">
        <SheetHeader className="flex w-full">
          <SheetTitle>
            <div className="flex md:hidden items-center justify-center transition-all duration-700 cursor-pointer border-b">
              <span className="text-4xl font-bold text-muted-foreground">
                x0-GPT
              </span>
              <Badge variant="secondary" className="ml-2 rounded-full">
                <span className="text-xs">Beta</span>
              </Badge>
            </div>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex h-full w-full">
          <nav className="grid md:hidden gap-1 py-4 w-full">
            <SpaceComp />
            <SearchComp />
            <div className="flex w-full border-b mt-3" />
            <div
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
              onClick={handleNewChat}
            >
              <SquarePen className="h-5 w-5" />
              <span>New Chat</span>
            </div>
            <AddResComp />
            <MenuItem
              href="/memories"
              icon={<InboxIcon className="h-5 w-5" />}
              label="Memories"
              isCollapsed={false}
            />
            {/* <MenuItem
              href="/spaces"
              icon={<IconStack2 className="size-6" />}
              label="Spaces"
              isCollapsed={false}
            /> */}
            <div className="flex w-full border-b mt-3" />
          </nav>
          <div className="flex h-full w-full">
            <HistoryViewer slug={slug} />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
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
