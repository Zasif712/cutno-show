import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import { slots } from "@/lib/slots";
import { bookings, waitlist } from "@/lib/bookings";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function POST(req: NextRequest) {
  const form = await req.text();
  const p = new URLSearchParams(form);
  const from = p.get("From")!;
  const body = (p.get("Body") || "").trim().toLowerCase();

  // 1️⃣ Show slots
  if (body === "book" || body.includes("slot")) {
    const free = slots.filter(s => !bookings.find(b => b.slotId === s.id));
    const list = free.length
      ? free.map(s => `${s.id}. ${s.time}`).join("\n")
      : "No slots left today.";
    await sendReply(from, `Free slots:\n\n${list}\n\nReply with the slot number to book.`);
    return NextResponse.json({});
  }

  // 2️⃣ New booking
  const choice = parseInt(body, 10);
  const slot = slots.find(s => s.id === choice);
  const taken = bookings.find(b => b.slotId === choice);
  if (slot && !taken) {
    bookings.push({ slotId: slot.id, time: slot.time, phone: from, bookedAt: Date.now() });
    await sendReply(from, `✅ Booked for ${slot.time}! You’ll get a reminder before.`);
    return NextResponse.json({});
  }

  // 3️⃣ Cancellation
  if (body === "cancel" || body.includes("cancel")) {
    const idx = bookings.findIndex(b => b.phone === from);
    if (idx > -1) {
      const freed = bookings.splice(idx, 1)[0];                     // remove their booking
      await sendReply(from, `Your ${freed.time} slot is now canceled.`);
      // Offer to next in waitlist
      if (waitlist.length) {
        const next = waitlist.shift()!;                              // get next phone
        bookings.push({ slotId: freed.slotId, time: freed.time, phone: next, bookedAt: Date.now() });
        await sendReply(next, `⚡️ A slot just opened at ${freed.time}—you’re booked!`);
      }
    } else {
      await sendReply(from, `You don’t have an active booking to cancel.`);
    }
    return NextResponse.json({});
  }

  // 4️⃣ Join wait-list
  if (body === "waitlist" || body.includes("wait list")) {
    if (!waitlist.includes(from)) {
      waitlist.push(from);
      await sendReply(from, `You’re on the wait-list! We’ll text you if a slot frees up.`);
    } else {
      await sendReply(from, `You’re already on the wait-list.`);
    }
    return NextResponse.json({});
  }

  // 5️⃣ Fallback
  await sendReply(from, `Sorry, I didn’t get that. Text 'book' to see slots, or 'cancel' to cancel.`);
  return NextResponse.json({});
}

async function sendReply(to: string, text: string) {
  await client.messages.create({
    from: process.env.TWILIO_WHATSAPP_FROM!,
    to,
    body: text,
  });
}

export function GET() {
  return NextResponse.json({ status: "Webhook online" });
}
