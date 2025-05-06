// lib/slots.ts

export interface Slot {
    id: number;
    time: string;
  }
  
  // All potential slots for today (or whatever day you choose)
  export const slots: Slot[] = [
    { id: 1, time: "09:00" },
    { id: 2, time: "10:00" },
    { id: 3, time: "11:00" },
    { id: 4, time: "13:00" },
    { id: 5, time: "14:00" },
    { id: 6, time: "15:00" },
  ];
  