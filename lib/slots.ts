// lib/slots.ts
import { barberSettings } from "@/lib/settings";

export interface Slot {
  id: number;
  time: string; // format "HH:mm"
}

/**
 * Generate an array of slots from startHour → endHour,
 * each slotDuration minutes apart.
 */
export function generateSlots(): Slot[] {
  const { startHour, endHour, slotDuration } = barberSettings;
  const slots: Slot[] = [];
  let id = 1;

  // total minutes since midnight
  for (
    let totalMins = startHour * 60;
    totalMins + slotDuration <= endHour * 60;
    totalMins += slotDuration
  ) {
    const hrs = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    const time = `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;

    slots.push({ id: id++, time });
  }

  return slots;
}
