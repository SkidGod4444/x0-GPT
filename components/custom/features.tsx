import React from 'react'
import { FeaturesSection } from './features-sec'
import { TextEffect } from './text-gen'

export default function Features() {
  return (
    <div className="flex flex-col gap-4 h-full w-full justify-center items-center overflow-hidden px-4">
      <span className="text-4xl font-bold md:text-6xl lg:text-7xl max-w-10xl mx-auto text-center relative z-20 px-2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Why x0-GPT?
      </span>
      <TextEffect per='char' preset='fade' className='text-muted-foreground text-sm font-normal md:text-lg max-w-4xl mx-auto px-10 text-center'>
      Why not? If it&apos;s all you want, then it&apos;s all we can provide. Haha, love from Saidev Dhal.
      </TextEffect>
      <FeaturesSection/>
    </div>
  )
}
