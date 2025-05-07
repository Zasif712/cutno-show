// app/page.tsx
import React from "react";
import Hero from "@/components/Hero";
import Link from "next/link";

// Features section inline component
function Features() {
  const items = [
    {
      title: "Instant Booking",
      desc: "Clients pick slots directly in chat, you approve with one click.",
      icon: "📅",
    },
    {
      title: "Automated Reminders",
      desc: "Reduce no-shows by 50% with 24h & 2h reminders.",
      icon: "⏰",
    },
    {
      title: "Waitlist Management",
      desc: "Auto-notify wait-listed clients when slots open.",
      icon: "🔁",
    },
  ];
  return (
    <section className="py-16 bg-neutral-100">
      <h2 className="text-3xl text-center font-bold mb-12 text-neutral-900">How It Works</h2>
      <div className="max-w-4xl mx-auto grid gap-8 sm:grid-cols-3">
        {items.map((f) => (
          <div key={f.title} className="p-6 bg-white border border-neutral-200 rounded-2xl shadow-lg">
            <div className="text-4xl mb-4 text-primary">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-neutral-900">{f.title}</h3>
            <p className="text-neutral-800">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Testimonials section inline component
function Testimonials() {
  const quotes = [
    { name: "Ali's Barbers", text: "CutNoShow cut our no-shows by half in a week!" },
    { name: "FadeMasters", text: "Setup took 5 min—clients love booking via WhatsApp." },
  ];
  return (
    <section className="py-16 bg-neutral-200">
      <h2 className="text-3xl text-center font-bold mb-12 text-neutral-900">What Barbers Say</h2>
      <div className="max-w-3xl mx-auto space-y-8">
        {quotes.map((q) => (
          <blockquote key={q.name} className="p-6 bg-white border border-neutral-200 rounded-2xl shadow-md">
            <p className="italic text-neutral-800">“{q.text}”</p>
            <footer className="mt-4 text-right font-semibold text-neutral-900">— {q.name}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="font-sans bg-neutral-100 text-neutral-900">
      <Hero />
      <Features />
      <Testimonials />
      <section className="py-16 bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-neutral-900">Ready to Stop No-Shows?</h2>
          <p className="mb-6 text-lg text-neutral-800">
            Join our free pilot and see the difference yourself.
          </p>
          <Link
            href="https://tally.so/r/wayYZq"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-white font-semibold shadow hover:bg-primary-light transition"
          >
            Join the Free Beta
            <span className="animate-bounce text-accent">⬇️</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
