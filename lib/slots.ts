// lib/slots.ts

export interface Slot {
    id: number;
    time: string; // format "HH:mm"
  }
  
  // Master list of all possible booking slots (static stub)
  // Dynamic slot generation based on barber settings
  import { barberSettings } from "@/lib/settings";
  
  export interface Slot {
    id: number;
    time: string; // "HH:mm"
  }
  
  export function generateSlots(): Slot[] {
    const { startHour, endHour, slotDuration } = barberSettings;
    const slots: Slot[] = [];
    let id = 1;
    for (let minutes = startHour * 60; minutes + slotDuration <= endHour * 60; minutes += slotDuration) {
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;
      const time = `${h.toString().padStart(2, "0")}:\${m.toString().padStart(2, "0")}`;
      slots.push({ id: id++, time });
    }
    return slots;
  }
  