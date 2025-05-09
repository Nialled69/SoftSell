'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="w-full bg-background py-20 text-center px-6 sm:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto">
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
