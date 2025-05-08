// app/api/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  // Parse and validate request body
  const {
    shopName,
    city,
    phone,
    startHour,
    endHour,
    slotDuration,
  } = (await req.json()) as {
    shopName: string;
    city: string;
    phone: string;
    startHour: number;
    endHour: number;
    slotDuration: number;
  };

  if (!shopName || !city || !phone || startHour == null || endHour == null || slotDuration == null) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const barber = await prisma.barber.create({
      data: { shopName, city, phone, startHour, endHour, slotDuration },
    });
    return NextResponse.json({ barber }, { status: 201 });
  } catch (error: unknown) {
    // Handle unique constraint violation on phone
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002' &&
      Array.isArray(error.meta?.target) &&
      error.meta.target.includes('phone')
    ) {
      return NextResponse.json(
        { error: 'A barber with that phone number already exists.' },
        { status: 409 }
      );
    }
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Respond to GET to satisfy Next.js build
export function GET() {
  return NextResponse.json({ ok: true });
}
