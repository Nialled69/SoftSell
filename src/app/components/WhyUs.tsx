'use client'

import { ShieldCheck, Clock, Handshake, Award } from "lucide-react"

const benefits = [
  { icon: <ShieldCheck className="w-6 h-6 text-primary" />, title: "Secure Transactions", description: "All deals are encrypted and monitored." },
  { icon: <Clock className="w-6 h-6 text-primary" />, title: "Fast Process", description: "Sell and get paid within days, not weeks." },
  { icon: <Handshake className="w-6 h-6 text-primary" />, title: "Trusted Network", description: "Buyers are verified and reliable." },
  { icon: <Award className="w-6 h-6 text-primary" />, title: "Top Valuations", description: "We offer some of the best rates in the market." }
]

export default function WhyUs() {
  return (
    <section className="py-20 px-6">
      <h2 className="text-3xl font-semibold text-center mb-10">Why Choose SoftSell</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {benefits.map((item, index) => (
          <div key={index} className="bg-muted p-6 rounded-lg text-center shadow-sm">
            <div className="mb-3 flex justify-center">{item.icon}</div>
            <h3 className="font-medium text-lg mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}