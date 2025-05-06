// app/api/slots/route.ts

import { NextResponse } from "next/server";
import { slots } from "@/lib/slots";
import { bookings } from "@/lib/bookings";

/**
 * GET /api/slots
 * Returns JSON { slots: Slot[] } for all slots not yet taken.
 */
export function GET() {
  // Filter out any slot whose id appears in the bookings array
  const freeSlots = slots.filter(s => !bookings.find(b => b.slotId === s.id));
  return NextResponse.json({ slots: freeSlots });
}
