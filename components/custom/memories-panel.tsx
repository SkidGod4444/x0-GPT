"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import ToolbarPanel from "../ui/toolbar-panel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useAuth } from "@/context/auth.context";
import { getResourcesByUserId } from "@/db/func";
import MemoCard from "./memories-card";
import { ScrollArea } from "../ui/scroll-area";
import { createClient } from "@/db/supabase/client";

const TITLES = ["All", "Webpages", "Notes", "PDFs", "CSVs"];

interface MemoCardProps {
  id: string;
  title: string;
  type: string;
  content: string;
  space: string;
}

export default function MemoriesPanel() {
  const { user } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentMemo, setCurrentMemo] = useState<MemoCardProps[] | null>(null);
  const [displayMemo, setDisplayMemo] = useState<MemoCardProps[] | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Fetching memories from the database
  useEffect(() => {
    const fetchMemories = async () => {
      if (user) {
        setIsSyncing(true);
        try {
          const mem = await getResourcesByUserId(user.id);
          if (mem) {
            const formattedMemo = mem.map((meme: any) => ({
              id: meme.id,
              title: meme.title,
              type: meme.type,
              content: meme.content,
              space: meme.spaces,
            }));
            setCurrentMemo(formattedMemo);
          }
        } catch (error) {
          console.error("Failed to fetch memories:", error);
        } finally {
          setIsSyncing(false);
        }
      }
    };

    if (user && !currentMemo) {
      fetchMemories();
    }
  }, [user, currentMemo]);

  useEffect(() => {
    const supabase = createClient();
    const subscription = supabase
      .channel("resource-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "RESOURCES",
          filter: `user_id=eq.${user?.id!}`,
        },
        (payload) => {
          if (payload.eventType === "DELETE") {
            setCurrentMemo((prev) =>
              prev ? prev.filter((memo) => memo.id !== payload.old.id) : null,
            );
          } else if (payload.eventType === "UPDATE") {
            setCurrentMemo((prev) =>
              prev
                ? prev.map((memo) =>
                    memo.id === payload.new.id
                      ? {
                          ...memo,
                          title: payload.new.title,
                          type: payload.new.type,
                          content: payload.new.content,
                          space: payload.new.spaces,
                        }
                      : memo,
                  )
                : null,
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user]);
  // Filtering memos based on activeIndex
  useEffect(() => {
    if (currentMemo) {
      let filteredMemo;
      switch (activeIndex) {
        case 0:
          filteredMemo = currentMemo;
          break;
        case 1:
          filteredMemo = currentMemo.filter((memo) => memo.type === "html");
          break;
        case 2:
          filteredMemo = currentMemo.filter((memo) => memo.type === "txt");
          break;
        case 3:
          filteredMemo = currentMemo.filter((memo) => memo.type === "pdf");
          break;
        case 4:
          filteredMemo = currentMemo.filter((memo) => memo.type === "csv");
          break;
        default:
          filteredMemo = currentMemo;
      }
      setDisplayMemo(filteredMemo);
    }
  }, [activeIndex, currentMemo]);

  // Handle toolbar value change
  const handleValueChange = (id: string | null) => {
    const newIndex = TITLES.findIndex((title) => title === id);
    if (newIndex !== -1) {
      setActiveIndex(newIndex);
    }
  };

  // Debugging logs
  useEffect(() => {
    console.log("Current Memo:", currentMemo);
    console.log("Display Memo:", displayMemo);
  }, [currentMemo, displayMemo]);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex mb-2 w-full items-center justify-between">
        <div className="flex gap-2 rounded-xl p-[2px] bg-primary-foreground">
          <ToolbarPanel
            defaultValue="All"
            className="rounded-xl bg-white dark:bg-muted"
            transition={{
              ease: "easeInOut",
              duration: 0.2,
            }}
            onValueChange={handleValueChange}
          >
            {TITLES.map((label, index) => (
              <Button
                key={index}
                data-id={label}
                variant="ghost"
                className="rounded-xl"
              >
                {label}
              </Button>
            ))}
          </ToolbarPanel>
        </div>
        <Badge
          className={`hidden md:flex self-end ${isSyncing ? "bg-white" : "bg-green-400"}`}
        >
          ({activeIndex + 1}/{TITLES.length}){" "}
          {isSyncing ? "Syncing..." : "Synchronized"}
        </Badge>
      </div>
      <div className="overflow-hidden border-t border-zinc-200 dark:border-zinc-700">
        <ScrollArea className="flex h-[65vh] w-full">
          {displayMemo && displayMemo.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-2">
              {displayMemo.map((memo, index) => (
                <MemoCard
                  key={index}
                  id={memo.id}
                  title={memo.title}
                  type={memo.type}
                  content={memo.content}
                  space={memo.space}
                />
              ))}
            </div>
          ) : (
            <div className="p-4 text-center">
              <span>Memory is empty</span>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
