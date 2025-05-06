"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function DevControls() {
  const router = useRouter();

  const handleReset = async () => {
    try {
      await fetch("/api/reset", { method: "POST" });
      router.refresh();
    } catch (error) {
      console.error("Failed to reset bookings:", error);
    }
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
