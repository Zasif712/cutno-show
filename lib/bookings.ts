// lib/bookings.ts
export interface Booking {
    slotId: number
    time: string
    phone: string
    bookedAt: number           // unix ms
  }
  
  export const bookings: Booking[] = []