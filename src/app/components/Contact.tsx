'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", license: "", message: "" })
  const [error, setError] = useState("")

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
    <section className="py-20 px-6 bg-background text-foreground">
      <h2 className="text-3xl font-semibold text-center mb-10">Contact Us</h2>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto grid gap-4">
        <div>
          <Label>Name</Label>
          <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div>
          <Label>Company</Label>
          <Input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
        </div>
        <div>
          <Label>License Type</Label>
          <Select onValueChange={(val) => setForm({ ...form, license: val })}>
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
        <div>
          <Label>Message</Label>
          <Textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit">Submit</Button>
      </form>
    </section>
  )
}
