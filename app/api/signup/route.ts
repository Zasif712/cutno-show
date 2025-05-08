// app/api/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// Force dynamic so Next.js won’t try to prerender this as a page
export const dynamic = "force-dynamic";

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
    if (
      !shopName ||
      !city ||
      !phone ||
      startHour == null ||
      endHour == null ||
      slotDuration == null
    ) {
      return NextResponse.json(
        { error: "Missing one or more required fields." },
        { status: 400 }
      );
    }

    // Attempt to create the barber
    const barber = await prisma.barber.create({
      data: { shopName, city, phone, startHour, endHour, slotDuration },
    });

    return NextResponse.json({ barber }, { status: 201 });
  } catch (err) {
    // Handle unique-phone constraint error
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002" &&
      (err.meta?.target as string[]).includes("phone")
    ) {
      return NextResponse.json(
        { error: "A barber with that phone number already exists." },
        { status: 409 }
      );
    }
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Optional GET handler so Next.js won’t treat missing GET as a prerender failure
export function GET() {
  return NextResponse.json({ status: "Signup endpoint is live" });
}
