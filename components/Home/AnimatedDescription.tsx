"use client"

import { motion } from "framer-motion"

export default function AnimatedDescription() {
  return (
    <h3 className="flex animate-fade-up-5 flex-col text-center text-lg opacity-0">
      Over the last 5 years, I&apos;ve empowered 9+ companies
      <span className="max-w-2xl animate-fade-up-6 leading-normal text-muted-foreground opacity-0 sm:text-xl sm:leading-8">
        Developing user-centric interfaces that captivate and engage audiences
        and make a real impact.
      </span>
    </h3>
  )
}
