import Image from "next/image";
import React from "react";
import OrbitingCircles from "./orbiting-circles";

export default function Orbits() {
  return (
    <div className="flex flex-col my-20 gap-4 md:flex-row h-full w-full justify-center items-center overflow-hidden px-4">
      <span className="text-4xl font-bold md:text-6xl lg:text-7xl max-w-10xl mx-auto text-center relative z-20 px-2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Chat with any data from any website on the internet
      </span>
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden md:shadow-xl px-4">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-7xl font-bold leading-none text-transparent dark:from-white dark:to-black">
        x0
      </span>
      {/* Inner Circles */}
      <OrbitingCircles
        className="size-[80px] border-none bg-white"
        duration={20}
        delay={20}
        radius={200}
      >
        <Icons.github />
      </OrbitingCircles>

      <OrbitingCircles
        className="size-[80px] border-none bg-transparent"
        duration={20}
        delay={15}
        radius={200}
      >
        <Icons.notion />
      </OrbitingCircles>

      <OrbitingCircles
        className="size-[80px] border-none bg-transparent"
        duration={20}
        delay={10}
        radius={200}
      >
        <Icons.medium />
      </OrbitingCircles>

      <OrbitingCircles
        className="size-[80px] border-none bg-transparent"
        duration={20}
        delay={5}
        radius={200}
      >
        <Icons.reddit />
      </OrbitingCircles>

      {/* reverse */}

      <OrbitingCircles
        className="size-[80px] border-none bg-transparent"
        duration={20}
        delay={10}
        radius={100}
        reverse
      >
        <Icons.wiki />
      </OrbitingCircles>

      <OrbitingCircles
        className="size-[80px] border-none bg-transparent"
        duration={20}
        delay={20}
        radius={100}
        reverse
      >
        <Icons.x />
      </OrbitingCircles>

    </div>
    </div>
  );
}

const Icons = {
  github: () => (
    <Image
      src={"/assets/github.svg"}
      alt="github logo"
      width={100}
      height={100}
    />
  ),
  githubDark: () => (
    <Image
      src={"/assets/github-dark.svg"}
      alt="github logo"
      width={100}
      height={100}
    />
  ),

  medium: () => (
    <Image
      src={"/assets/medium.svg"}
      alt="medium logo"
      width={100}
      height={100}
    />
  ),
  mediumDark: () => (
    <Image
      src={"/assets/medium-dark.svg"}
      alt="medium logo"
      width={100}
      height={100}
    />
  ),

  x: () => (
    <Image
      src={"/assets/x.svg"}
      alt="x logo"
      width={60}
      height={60}
    />
  ),
  xDark: () => (
    <Image
      src={"/assets/x-dark.svg"}
      alt="x logo"
      width={100}
      height={100}
    />
  ),

  notion: () => (
    <Image
      src={"/assets/notion.svg"}
      alt="notion logo"
      width={60}
      height={60}
    />
  ),
  notionDark: () => (
    <Image
      src={"/assets/notion-dark.svg"}
      alt="notion logo"
      width={100}
      height={100}
    />
  ),

  reddit: () => (
    <Image
      src={"/assets/reddit.svg"}
      alt="reddit logo"
      width={100}
      height={100}
    />
  ),
  redditDark: () => (
    <Image
      src={"/assets/reddit-dark.svg"}
      alt="reddit logo"
      width={100}
      height={100}
    />
  ),

  wiki: () => (
    <Image
      src={"/assets/wikipedia.svg"}
      alt="wikipedia logo"
      width={60}
      height={60}
      // className="m-20"
    />
  ),
};
