// app/api/reset/route.ts
import { NextResponse } from "next/server";
import { bookings, waitlist } from "@/lib/bookings";

export function POST() {
  bookings.length = 0;
  waitlist.length = 0;
  return NextResponse.json({ status: "reset", bookings: bookings.length });
}
