'use client'

import { motion } from "framer-motion"
import { Upload, DollarSign, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: <Upload className="w-8 h-8 text-primary" />,
    title: "Upload License",
    description: "Submit your unused software license details securely.",
  },
  {
    icon: <DollarSign className="w-8 h-8 text-primary" />,
    title: "Get Valuation",
    description: "We analyze and suggest a competitive resale price.",
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-primary" />,
    title: "Get Paid",
    description: "Accept the offer and receive fast, secure payment.",
  },
]

export default function WorkFlow() {
  return (
    <section className="py-20 bg-muted text-center px-6">
      <h2 className="text-3xl font-semibold mb-10">How It Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-background rounded-xl p-6 shadow-md border border-transparent hover:border-primary hover:shadow-[0_0_10px_1px_rgba(0,123,255,0.2)] transition-all"
          >
            <div className="mb-4 flex justify-center">{step.icon}</div>
            <h3 className="text-xl font-medium mb-2">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
