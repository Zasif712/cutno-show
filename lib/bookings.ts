// lib/bookings.ts

export interface Booking {
    slotId: number;
    time: string;
    phone: string;
    bookedAt: number;
  }
  
  // All confirmed bookings
  export const bookings: Booking[] = [];
  
  // Phones waiting for the next freed slot
  export const waitlist: string[] = [];
  