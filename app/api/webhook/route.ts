// app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function POST(req: NextRequest) {
  // Twilio sends URL-encoded form data
  const formData = await req.text();
  const params = new URLSearchParams(formData);
  const from = params.get("From")!;
  const body = params.get("Body") || "";

  // Echo the incoming message back to the sender
  await client.messages.create({
    from:  process.env.TWILIO_WHATSAPP_FROM!,
    to:    from,
    body:  `✂️ Got your message (“${body}”)—we’ll be right with you!`,
  });

  return NextResponse.json({ status: "ok" });
}

export function GET() {
  return NextResponse.json({ status: "WhatsApp webhook online" });
}
