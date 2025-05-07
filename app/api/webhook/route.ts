// app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import { generateSlots } from "@/lib/slots";
import { bookings, waitlist } from "@/lib/bookings";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

/**
 * POST /api/webhook
 * Handles WhatsApp/SMS messages for booking flow
 */
export async function POST(req: NextRequest) {
  const form = await req.text();
  const params = new URLSearchParams(form);
  const from = params.get("From")!;
  const body = (params.get("Body") || "").trim().toLowerCase();

  // 1️⃣ Show available slots
  if (body === "book" || body.includes("slot")) {
    const allSlots = generateSlots();
    const free = allSlots.filter(s => !bookings.find(b => b.slotId === s.id));
    if (free.length) {
      const list = free.map(s => `${s.id}. ${s.time}`).join("\n");
      await sendReply(
        from,
        `Here are today’s available slots:\n\n${list}\n\nReply with the slot number to book.`
      );
    } else {
      await sendReply(from, "Sorry, no slots left today. Text 'book' tomorrow 😌");
    }
    return NextResponse.json({});
  }

  // 2️⃣ Book a slot by number
  const choice = parseInt(body, 10);
  const allSlots = generateSlots();
  const slot = allSlots.find(s => s.id === choice);
  if (slot && !bookings.find(b => b.slotId === slot.id)) {
    bookings.push({
      slotId: slot.id,
      time: slot.time,
      phone: from,
      bookedAt: Date.now(),
    });
    await sendReply(from, `✅ Booked for ${slot.time}!`);
    return NextResponse.json({});
  }

  // 3️⃣ Cancel booking
  if (body === "cancel" || body.includes("cancel")) {
    const idx = bookings.findIndex(b => b.phone === from);
    if (idx > -1) {
      const freed = bookings.splice(idx, 1)[0];
      await sendReply(from, `Your booking at ${freed.time} has been canceled.`);
      // Offer slot to next wait-listed client
      if (waitlist.length) {
        const next = waitlist.shift()!;
        bookings.push({
          slotId: freed.slotId,
          time: freed.time,
          phone: next,
          bookedAt: Date.now(),
        });
        await sendReply(
          next,
          `⚡️ A slot at ${freed.time} just opened up — you’re booked!`
        );
      }
    } else {
      await sendReply(from, "You don’t have an active booking to cancel.");
    }
    return NextResponse.json({});
  }

  // 4️⃣ Join waitlist
  if (body === "waitlist" || body.includes("wait list")) {
    if (!waitlist.includes(from)) {
      waitlist.push(from);
      await sendReply(from, "You’re on the wait-list. We’ll notify you if a slot frees up.");
    } else {
      await sendReply(from, "You’re already on the wait-list.");
    }
    return NextResponse.json({});
  }

  // 5️⃣ Fallback help message
  await sendReply(
    from,
    "Sorry, I didn’t understand that. Text 'book' to see slots, 'cancel', or 'waitlist'."
  );
  return NextResponse.json({});
}

/**
 * GET /api/webhook
 * Health check endpoint
 */
export function GET() {
  return NextResponse.json({ status: "Webhook online" });
}

// Helper to send a Twilio message
async function sendReply(to: string, text: string) {
  await client.messages.create({
    from: process.env.TWILIO_WHATSAPP_FROM!,
    to,
    body: text,
  });
}