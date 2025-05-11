'use client'

import { useState, useEffect } from "react"
import HeroSection from "@/app/components/Herosection"
import WorkFlow from "@/app/components/workFlow"
import WhyUs from "@/app/components/WhyUs"
import Testimonials from "./components/Testimonials"
import Contact from "./components/Contact"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {motion} from "framer-motion"
import { Sun, Moon, Bot, Send } from "lucide-react"

export default function HomePage() {
  const [isDark, setIsDark] = useState(false)
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const loadingTexts = [
  "Thinking",
  "Thinking.",
  "Thinking..",
  "Thinking..."
];
const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  const handleSend = async () => {
    if (!input.trim()) return console.log("Please enter a prompt.")
    setLoading(true)
    setResponse("")

    try {
      const res = await fetch("/api/deepseek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      })

      const data = await res.json()
      setResponse(data.answer || "Sorry, I couldn’t understand that.")
    } catch (err) {
      console.error(err)
      setResponse("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const darkModeEnabled = localStorage.getItem("theme") === "dark"
    document.documentElement.classList.toggle("dark", darkModeEnabled)
    setIsDark(darkModeEnabled)
  }, ["theme"])

  useEffect(() => {
  if (!loading) return;

  const interval = setInterval(() => {
    setLoadingTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
  }, 400);

  return () => clearInterval(interval);
}, [loading]);


  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)
    localStorage.setItem("theme", newDark ? "dark" : "light")
    document.documentElement.classList.toggle("dark", newDark)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="fixed top-4 right-4 z-50">
        <div className="rounded-full border-2 border-black dark:border-white">
          <button
            onClick={toggleTheme}
            className={`w-14 h-8 bg-muted rounded-full p-1 flex items-center transition-colors ${
              isDark ? "bg-gray-700" : "bg-gray-300"
            }`}
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                isDark ? "translate-x-6 bg-primary" : "translate-x-0 bg-secondary"
              }`}
            >
              {isDark ? (
                <Sun size={16} className="text-black" />
              ) : (
                <Moon size={16} className="text-black" />
              )}
            </motion.div>
          </button>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <HeroSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <WorkFlow />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <WhyUs />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Testimonials />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Contact />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="rounded-full border border-black dark:border-white inline-block">
          <Button
            onClick={() => setOpen(true)}
            variant="secondary"
            className="rounded-full shadow-lg p-4 flex items-center justify-center"
          >
            <Bot className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg">Ask SoftSell AI</DialogTitle>
            <p className="text-sm text-muted-foreground">24/7 Support — try asking something like:</p>
          </DialogHeader>

          <div className="flex flex-wrap gap-2 my-3">
            {["How do I sell my license?", "How long does payment take?", "Is this service secure?"].map((q, idx) => (
              <button
                key={idx}
                onClick={() => setInput(q)}
                className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <Textarea
              placeholder="Ask your question here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <Button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="w-full"
            >
              {loading ? loadingTexts[loadingTextIndex] : (
                <>
                  Send <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            {response && (
              <div className="mt-4 p-3 rounded-md bg-muted text-muted-foreground whitespace-pre-wrap break-words max-w-full">
                {response}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}