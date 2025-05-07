"use client";
import { useRouter } from "next/navigation";

export default function DevControls() {
  const router = useRouter();
  const handleReset = async () => {
    await fetch("/api/reset", { method: "POST" });
    router.refresh();
  };

  return (
    <button
      onClick={handleReset}
      className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
    >
      Reset All Bookings
    </button>
  );
}
