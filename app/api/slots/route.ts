// app/api/slots/route.ts
import { NextResponse } from "next/server";
import { generateSlots, Slot } from "@/lib/slots";
import { bookings } from "@/lib/bookings";

/**
 * GET /api/slots
 * Dynamically generates today’s slots and filters out any taken ones.
 */
export function GET() {
  const allSlots: Slot[] = generateSlots();
  const freeSlots = allSlots.filter(s => !bookings.find(b => b.slotId === s.id));
  return NextResponse.json({ slots: freeSlots });
}
