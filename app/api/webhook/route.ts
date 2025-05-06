// app/api/webhook/route.ts

import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import { slots } from "@/lib/slots";
import { bookings, Booking } from "@/lib/bookings";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

/**
 * POST /api/webhook
 * - If user texts "book" or mentions "slot", replies with the list of free slots.
 * - If user texts a number corresponding to a slot, books it (in-memory) and confirms.
 * - Otherwise, sends a help fallback.
 */
export async function POST(req: NextRequest) {
  const form = await req.text();
  const p = new URLSearchParams(form);
  const from = p.get("From")!;
  const body = (p.get("Body") || "").trim().toLowerCase();

  // 1️⃣ User asks to see slots
  if (body === "book" || body.includes("slot")) {
    const free = slots.filter(s => !bookings.find(b => b.slotId === s.id));
    if (!free.length) {
      await sendReply(from, "Sorry, no slots left today. Text 'book' tomorrow 😊");
      return NextResponse.json({});
    }
    const list = free.map(s => `${s.id}. ${s.time}`).join("\n");
    await sendReply(from, `Here are today’s open slots:\n\n${list}\n\nReply with the slot number to book.`);
    return NextResponse.json({});
  }

  // 2️⃣ User picks a slot by number
  const choice = parseInt(body, 10);
  const slot = slots.find(s => s.id === choice);
  const taken = bookings.find(b => b.slotId === choice);

  if (slot && !taken) {
    const newBooking: Booking = {
      slotId: slot.id,
      time: slot.time,
      phone: from,
      bookedAt: Date.now(),
    };
    bookings.push(newBooking);
    await sendReply(from, `✅ Booked for ${slot.time}! You’ll get a reminder before. Thank you!`);
    return NextResponse.json({});
  }

  // 3️⃣ Fallback for unrecognized input
  await sendReply(
    from,
    "Sorry, I didn’t understand that. Text 'book' to see available slots."
  );
  return NextResponse.json({});
}

// Helper to send a message via Twilio
async function sendReply(to: string, text: string) {
  await client.messages.create({
    from: process.env.TWILIO_WHATSAPP_FROM!,
    to,
    body: text,
  });
}

// Also allow health-check via GET
export function GET() {
  return NextResponse.json({ status: "Webhook is online" });
}
