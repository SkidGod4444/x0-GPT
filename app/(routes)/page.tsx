import { AnncBtn } from "@/components/custom/annc";
import { Cover } from "@/components/custom/cover";
import DotPattern from "@/components/custom/dot-patern";
import Credits from "@/components/custom/hero/credits";
import Features from "@/components/custom/hero/features";
import Orbits from "@/components/custom/hero/orbit";
import { TextEffect } from "@/components/custom/text-gen";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="absolute top-0 -z-[50] w-full h-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,220,220,0.2),rgba(255,255,255,0))]" />
      <div className="absolute w-full h-full -z-50 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      <div className="h-full w-full items-center justify-center flex flex-col overflow-hidden my-20">
        <div className="flex flex-col">
          <AnncBtn />
          {/* Title */}
          <h1 className="text-4xl font-bold md:text-6xl lg:text-7xl max-w-6xl mx-auto text-center relative z-20 py-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
            Talk to whatever you want using <Cover>x0-GPT</Cover> for free!
          </h1>
          <TextEffect
            per="word"
            as="h3"
            preset="blur"
            className="text-muted-foreground text-sm font-normal md:text-lg max-w-4xl mx-auto px-10 text-center"
          >
            Seamlessly interact with websites, PDFs, and various other content
            directly. Whether you&apos;re seeking answers, exploring content, or
            just curious, x0-GPT brings conversations to your fingertips, making
            information more accessible and engaging than ever before.
          </TextEffect>
        </div>
        <Link href="/gateway">
          <Button size="lg" className="mt-10">
            Get Started for $0 <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
        </Link>
      </div>

      <div className="flex h-full w-full items-center justify-center">
        <Credits />
      </div>

      <div className="relative h-full w-full flex flex-col gap-5">
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
          )}
        />
        <Orbits />
        <Features />
      </div>
    </>
  );
}
