import React from "react";
import { CreditsComp } from "../credits-comp";
import TypingAnimation from "@/components/ui/typing-animation";

export default function Credits() {
  return (
    <div className=" hidden lg:flex flex-col gap-4 h-full w-full justify-center items-center overflow-hidden px-4 my-20">
      <TypingAnimation
        className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white"
        text="Powered by"
      />
      <CreditsComp />
    </div>
  );
}
