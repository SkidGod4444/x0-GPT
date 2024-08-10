import React from 'react'
import { FeaturesSection } from './features-sec'
import { TextGenerateEffect } from './text-gen'

const words = `Why not? If it's all you want, then it's all we can provide. Haha, love from Saidev Dhal!`
export default function Features() {
  return (
    <div className="flex flex-col gap-4 h-full w-full justify-center items-center overflow-hidden px-4">
      <span className="text-4xl font-bold md:text-6xl lg:text-7xl max-w-10xl mx-auto text-center relative z-20 px-2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Why x0-GPT?
      </span>
      <TextGenerateEffect filter={false} words={words} />
      <FeaturesSection/>
    </div>
  )
}
