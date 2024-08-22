"use client";

import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Github, History, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { MyLinks } from "@/db/defaults";
import { useAuth } from "@/context/auth.context";
import { toast } from "sonner";
import { getChatsByUserId } from "@/db/func";
import { Input } from "@/components/ui/input";

interface HistoryInt {
  slug: string;
  name: string;
}

export default function SearchComp() {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [history, setHistory] = React.useState<HistoryInt[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!open) {
      setHistory([]);
    }
    if (user && open && history.length === 0) {
      setIsLoading(true);
      const fetchSpaces = async () => {
        try {
          const historyData = await getChatsByUserId(user.id);
          if (historyData) {
            const formattedSpaces = historyData.map((chat: any) => ({
              slug: chat.slug,
              name: chat.title,
            }));
            setHistory(formattedSpaces);
          }
        } catch (error) {
          console.error("Error fetching spaces:", error);
          toast.error("Failed to fetch spaces. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchSpaces();
    }
  }, [user, open, history.length]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <div className="relative flex w-full max-w-md items-center">
        <Input
          placeholder="Search history..."
          className="pr-12 w-full relative z-0 border rounded-xl cursor-pointer hover:bg-muted"
          readOnly
          onClick={(event: React.MouseEvent<HTMLInputElement>) =>
            setOpen(!open)
          }
        />
        <kbd className="absolute right-2 pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a word or search..." />
        <CommandList>
          {isLoading ? (
            <span className="flex w-full items-center justify-center my-5 text-muted-foreground">
              <History className="size-6 mr-2 animate-spin-counterclockwise" />
              Loading...
            </span>
          ) : history.length === 0 ? (
            <span className="flex w-full items-center justify-center my-5 text-muted-foreground">
              <History className="size-6 mr-2" />
              No history found.
            </span>
          ) : (
            <CommandGroup heading="Chat history">
              {history.map((item) => (
                <Link key={item.slug} href={`/c/${item.slug}`}>
                  <CommandItem className="rounded-xl cursor-pointer">
                    <History className="size-5 mr-2" />
                    {item.name}
                  </CommandItem>
                </Link>
              ))}
            </CommandGroup>
          )}
          <CommandSeparator />
          <CommandGroup heading="You are looking for this?">
            <Link href={MyLinks.github}>
              <CommandItem className="rounded-xl cursor-pointer">
                <Github className="size-5 mr-2" /> GitHub
              </CommandItem>
            </Link>

            <Link href={MyLinks.instagram}>
              <CommandItem className="rounded-xl cursor-pointer">
                <Instagram className="size-5 mr-2" /> Instagram
              </CommandItem>
            </Link>

            <Link href={MyLinks.twitter}>
              <CommandItem className="rounded-xl cursor-pointer">
                <Twitter className="size-5 mr-2" /> Twitter
              </CommandItem>
            </Link>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
