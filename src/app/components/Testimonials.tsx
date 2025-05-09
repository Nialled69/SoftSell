'use client'

const testimonials = [
  {
    name: "Alice Johnson",
    role: "IT Manager",
    company: "TechNova",
    quote: "SoftSell made it incredibly easy to resell old software. We got paid within days!"
  },
  {
    name: "David Harbour",
    role: "Operations Head",
    company: "InfoSolve Inc.",
    quote: "A seamless process from start to finish. Highly recommended for any business with extra licenses."
  }
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-muted px-6">
      <h2 className="text-3xl font-semibold text-center mb-10">What Our Customers Say</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-background p-6 rounded-lg shadow-sm">
            <p className="mb-4 italic text-muted-foreground">“{t.quote}”</p>
            <p className="font-medium">{t.name}</p>
            <p className="text-sm text-muted-foreground">{t.role}, {t.company}</p>
          </div>
        ))}
      </div>
    </section>
  )
}