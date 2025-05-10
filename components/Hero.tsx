import React from "react";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center h-screen
                       bg-gradient-to-br from-indigo-600 to-purple-600 overflow-hidden">
      <h1 className="text-5xl md:text-6xl font-extrabold text-white">
        SeatSure - Cut No Shows in Half
      </h1>
      <p className="mt-4 max-w-lg text-lg text-indigo-200">
        Let clients book & reschedule <strong>inside WhatsApp</strong>.
        Automated reminders keep your chairs full—no new app, no receptionist.
      </p>
      <a
        href="https://tally.so/r/wayYZq"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full
                   bg-gradient-to-r from-purple-500 to-indigo-500 px-8 py-4
                   text-white font-semibold shadow-lg hover:scale-105 transition"
      >
        Join the Free Beta
        <span className="animate-bounce">⬇️</span>
      </a>
    </section>
  );
}
