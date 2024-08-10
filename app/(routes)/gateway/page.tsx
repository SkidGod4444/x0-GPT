import SparklesText from "@/components/custom/sparkle-text";
import { Button } from "@/components/ui/button";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

export default function Gateway() {
  return (
    <div className="flex flex-col h-full w-full lg:grid lg:grid-cols-2 overflow-hidden">
      <div className="absolute top-0 -z-[50] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,220,220,0.2),rgba(255,255,255,0))]" />

      <div className="flex flex-col items-center justify-center">
        <div className="relative mx-auto grid h-full w-full px-10 lg:px-20">
          {/* Background grid pattern */}
          <div className="absolute -z-[50] bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

          {/* Content */}
          <div className="relative w-full flex flex-col items-start justify-center h-full">
            <h1 className="text-5xl lg:text-6xl font-bold my-20 lg:my-8 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
              x0-GPT
            </h1>

            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 lg:my-2">
              Hey, Humans!
            </h2>

            <p className="mt-2 lg:mt-4 text-muted-foreground">
              Welcome! Give x0-GPT a try, and experience reliable, AI-powered
              GPT on your own data.
            </p>

            <div className="mt-6">
              <Button variant="secondary">
                <IconBrandGoogleFilled className="h-5 w-5 mr-2" /> Continue with
                Google
              </Button>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              By continuing, you agree to the{" "}
              <Link href="/tos" className="underline text-white">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline text-white">
                Privacy Policy
              </Link>
              .
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center min-h-screen">
        <div className="flex items-center justify-center gap-2">
          <span className="text-muted-foreground">
            Talk to any website using{" "}
          </span>
          <SparklesText text="x0-GPT" />
          <span className="text-muted-foreground">just for $0.</span>
        </div>
      </div>

      <div className="hidden lg:block lg:absolute lg:top-0 lg:bottom-0 lg:left-1/2 lg:border-l lg:border-secondary"></div>
    </div>
  );
}
