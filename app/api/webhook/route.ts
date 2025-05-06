// app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

// helper so we can reuse the same slot list here without an HTTP fetch
const slots = [
  { id: 1, time: "09:00" },
  { id: 2, time: "10:00" },
  { id: 3, time: "11:00" },
  { id: 4, time: "13:00" },
  { id: 5, time: "14:00" },
  { id: 6, time: "15:00" },
];

export async function POST(req: NextRequest) {
  const body = await req.text();
  const p = new URLSearchParams(body);
  const from = p.get("From")!;
  const msg = (p.get("Body") || "").trim().toLowerCase();

  if (msg === "book" || msg.includes("slot")) {
    const list = slots.map(s => `${s.id}. ${s.time}`).join("\n");
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM!,
      to:   from,
      body: `Here are today’s openings:\n\n${list}\n\nReply with a number to reserve.`,
    });
  } else {
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM!,
      to:   from,
      body: `✂️ Echo: ${p.get("Body")}`,
    });
  }
  return NextResponse.json({ ok: true });
}
