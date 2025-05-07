// app/dashboard/page.tsx
import React from "react";
import DevControls from "@/components/DevControls";

// Define Booking type for clarity
type Booking = {
  slotId: number;
  time: string;
  phone: string;
  bookedAt: number;
};

type Data = {
  bookings: Booking[];
  waitlist: string[];
};

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // Fetch and assert type of the JSON response
  const res = await fetch("/api/bookings", { cache: "no-store" });
  const { bookings, waitlist }: Data = (await res.json()) as Data;

  return (
    <section
      className="relative flex flex-col items-center justify-start text-center
                 min-h-screen py-16 bg-gradient-to-br from-indigo-600 to-purple-600 overflow-hidden"
    >
      {/* Decorative blob */}
      <div className="absolute -top-20 -left-20 opacity-20 w-96 h-96">
        {/* SVG omitted for brevity */}
      </div>

      <div className="relative z-10 w-full max-w-4xl space-y-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white">
          CutNoShow Dashboard
        </h1>

        {/* Today's Bookings */}
        <div className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-lg text-left">
          <h2 className="text-2xl font-semibold mb-4">Today&apos;s Bookings</h2>
          {bookings.length > 0 ? (
            <table className="w-full text-gray-900">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">Slot</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                  <th className="px-4 py-2 text-left">Booked At</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b: Booking) => (
                  <tr key={`${b.phone}-${b.bookedAt}`} className="border-b">
                    <td className="px-4 py-2">{b.time}</td>
                    <td className="px-4 py-2">{b.phone}</td>
                    <td className="px-4 py-2">
                      {new Date(b.bookedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-700">No bookings yet today.</p>
          )}
        </div>

        {/* Wait-list */}
        <div className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-lg text-left">
          <h2 className="text-2xl font-semibold mb-4">Wait-list</h2>
          {waitlist.length > 0 ? (
            <ul className="list-disc list-inside text-gray-900">
              {waitlist.map((phone: string) => (
                <li key={phone} className="py-1">{phone}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">Wait-list is empty.</p>
          )}
        </div>

        {/* Dev Controls */}
        <div className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-lg text-left">
          <h2 className="text-2xl font-semibold mb-4">Dev Controls</h2>
          <DevControls />
        </div>
      </div>
    </section>
  );
}
