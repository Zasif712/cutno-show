// app/api/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const {
      shopName,
      city,
      phone,
      startHour,
      endHour,
      slotDuration
    } = await req.json();

    // Basic validation
    if (!shopName || !city || !phone || startHour == null || endHour == null || !slotDuration) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Create a new barber record
    const barber = await prisma.barber.create({
      data: {
        shopName,
        city,
        phone,
        startHour,
        endHour,
        slotDuration
      }
    });

    return NextResponse.json({ barber }, { status: 201 });
  } catch (error: any) {
    // Handle unique constraint violation on phone
    if (error.code === 'P2002' && error.meta?.target?.includes('phone')) {
      return NextResponse.json({ error: 'A barber with that phone number already exists.' }, { status: 409 });
    }
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
