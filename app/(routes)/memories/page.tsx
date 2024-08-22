"use client";

import MemoriesPanel from "@/components/custom/memories-panel";
import { Button } from "@/components/ui/button";
import { IconArrowBackUp } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Memories() {
  const router = useRouter();
  return (
    <div className="h-screen w-screen flex flex-col bg-primary-foreground p-10">
      <div className="flex flex-row items-center justify-between mb-5">
        <Button
          size="sm"
          variant="outline"
          className="self-start rounded-xl"
          onClick={() => router.back()}
        >
          <IconArrowBackUp className="size-5 mr-2" /> Back
        </Button>
        <h1 className="text-4xl font-bold self-end ml-auto">Your Memories</h1>
      </div>
      <div className="flex flex-col h-full w-full p-2 rounded-xl border-2 bg-muted shadow-xl">
        <MemoriesPanel />
      </div>
    </div>
  );
}
