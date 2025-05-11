'use client'

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", license: "", message: "" })
  const [error, setError] = useState("")
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.license) {
      setError("Please fill all required fields.")
      return
    }
    setError("")
    alert("Form submitted! (dummy)")
  }

  return (
    <section className="py-20 px-6 bg-background text-foreground overflow-hidden relative">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ overflow: "hidden" }}
      >
        {spans}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto bg-background px-6 py-8">
        <h2 className="text-3xl font-semibold text-center mb-10">Contact Us</h2>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Company</Label>
            <Input
              value={form.company}
              onChange={e => setForm({ ...form, company: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>License Type</Label>
            <Select onValueChange={val => setForm({ ...form, license: val })}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="windows">Windows</SelectItem>
                <SelectItem value="office">Office Suite</SelectItem>
                <SelectItem value="adobe">Adobe Products</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </section>
  )
}
