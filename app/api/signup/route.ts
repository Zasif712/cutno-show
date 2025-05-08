// app/api/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  // Define expected input shape
  type SignupInput = {
    shopName: string;
    city: string;
    phone: string;
    startHour: number;
    endHour: number;
    slotDuration: number;
  };

  // Parse and type the request body
  const body = (await req.json()) as SignupInput;
  const { shopName, city, phone, startHour, endHour, slotDuration } = body;

  // Basic validation
  if (!shopName || !city || !phone || startHour == null || endHour == null || slotDuration == null) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

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
