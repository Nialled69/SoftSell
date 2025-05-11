'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import React from "react"

export default function HeroSection() {
  const [spans, setSpans] = useState<React.ReactNode[]>([])

  useEffect(() => {
    const count = 50
    const elements = []

    for (let i = 0; i < count; i++) {
      const style: React.CSSProperties = {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${10 + Math.random() * 10}s`,
        animationDelay: `${Math.random() * 10}s`,
      }

      elements.push(
        <span
          key={i}
          className="absolute bottom-[-150px] w-[20px] h-[20px] rounded-full animate-move opacity-30"
          style={style}
        />
      )
    }

    setSpans(elements)
  }, [])

  return (
    <section className="relative w-full h-screen bg-background overflow-hidden px-6 sm:px-10 lg:px-20 flex items-center">
      <div
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
        style={{ overflow: "hidden" }}
      >
        {spans}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
          Turn Unused Software into Real Money
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8">
          SoftSell helps you resell unused software licenses securely, quickly, and at fair value.
        </p>
        <Button className="text-base px-6 py-3">
          Sell My Licenses <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}
