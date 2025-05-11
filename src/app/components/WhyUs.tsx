'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Image from 'next/image'
import { useEffect, useState } from "react"
import React from 'react'
import { ArrowLeft, ArrowRight, ShieldCheck, Clock, Handshake, Award, Headphones, TicketCheck } from 'lucide-react'
import { motion } from 'framer-motion'

const benefits = [
  {
    icon: <ShieldCheck className="w-5 h-5 text-primary" />,
    title: "Secure Transactions",
    description:
      "Every deal is protected with bank-grade encryption and active fraud monitoring. We ensure licenses are transferred safely and securely, with full transparency at every step."
  },
  {
    icon: <Clock className="w-5 h-5 text-primary" />,
    title: "Fast Process",
    description:
      "List your license in minutes, and receive your payment within 1–3 business days after validation. No long waits or red tape — just efficient, verified payouts."
  },
  {
    icon: <Handshake className="w-5 h-5 text-primary" />,
    title: "Trusted Network",
    description:
      "We work only with verified buyers and industry partners, ensuring your license lands in the right hands. All users go through a thorough screening process before any deal."
  },
  {
    icon: <Award className="w-5 h-5 text-primary" />,
    title: "Top Valuations",
    description:
      "Our proprietary pricing engine uses real-time market signals to get you the best price possible. You’ll always know what your license is worth — and why."
  },
  {
    icon: <Headphones className="w-5 h-5 text-primary" />,
    title: "24/7 Support",
    description:
      "Got questions at 2am? Our global support team is always online to guide you through listing, verification, or payment. Human help, whenever you need it."
  },
  {
    icon: <TicketCheck className="w-5 h-5 text-primary" />,
    title: "No Hidden Fees",
    description:
      "We’re upfront about pricing — what you see is what you get. No platform fees, no sneaky commissions. Just honest deals and full payouts."
  }
]

export default function WhyUs() {
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

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 12,
    },
  })

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next()
    }, 5000) 

    return () => clearInterval(interval)
  }, [instanceRef])

  return (
    <section className="py-20 px-6 bg-background relative overflow-hidden">
  <div
    className="absolute inset-0 z-0 pointer-events-none"
    style={{ overflow: "hidden" }}
  >
    {spans}
  </div>

  <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
    <div className="w-full lg:w-1/2 flex justify-center">
      <Image
        src="/logo-transparent.png"
        alt="SoftSell Logo"
        width={500}
        height={400}
        className="rounded-2xl object-contain"
      />
    </div>

    <div className="w-full lg:w-1/2 flex justify-center">
      <div className="w-full bg-background p-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-foreground text-transparent bg-clip-text text-center mb-12">
          Why Choose SoftSell
        </h2>

        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => instanceRef.current?.prev()}
            className="p-1.5 rounded-full border hover:bg-muted transition-colors text-xs"
          >
            <ArrowLeft size={14} />
          </button>

          {/* Increased width and font size of carousel */}
          <div className="w-[90vw] sm:w-[500px] md:w-[600px] lg:w-[700px] max-w-full" ref={sliderRef}>
            <div className="keen-slider">
              {benefits.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="keen-slider__slide bg-muted p-6 rounded-xl text-center"
                >
                  <div className="mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="font-semibold text-xl mb-2">{item.title}</h3> {/* Increased font size */}
                  <p className="text-base text-muted-foreground">{item.description}</p> {/* Increased font size */}
                </motion.div>
              ))}
            </div>
          </div>

          <button
            onClick={() => instanceRef.current?.next()}
            className="p-1.5 rounded-full border hover:bg-muted transition-colors text-xs"
          >
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

  )
}