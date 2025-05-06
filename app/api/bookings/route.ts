import { NextResponse } from "next/server";
import { bookings, waitlist } from "@/lib/bookings";

export function GET() {
  return NextResponse.json({ bookings, waitlist });
}
