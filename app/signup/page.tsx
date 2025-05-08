// app/signup/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// 1) Define exactly what your form holds
interface SignupForm {
  shopName: string;
  city: string;
  phone: string;
  startHour: number;
  endHour: number;
  slotDuration: number;
}

export default function SignupPage() {
  const router = useRouter();

  // 2) Strongly-typed form state
  const [formData, setFormData] = useState<SignupForm>({
    shopName: "",
    city: "",
    phone: "",
    startHour: 9,
    endHour: 17,
    slotDuration: 60,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 3) Typed change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? // convert numeric fields
            parseInt(value, 10)
          : value,
    }));
  };

  // 4) Typed submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // basic client-side validation
    const { shopName, city, phone, startHour, endHour, slotDuration } =
      formData;
    if (
      !shopName ||
      !city ||
      !phone ||
      startHour == null ||
      endHour == null ||
      slotDuration == null
    ) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/app/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || res.statusText);
      }
      // on success, send them to the dashboard (or a thank-you page)
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-neutral-900">
          Barber Signup
        </h1>

        {error && (
          <p className="text-red-600 bg-red-100 p-2 rounded">{error}</p>
        )}

        <div>
          <label className="block font-medium text-neutral-800">
            Shop Name
          </label>
          <input
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
            className="mt-1 w-full border border-neutral-200 rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-neutral-800">
            City
          </label>
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 w-full border border-neutral-200 rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-neutral-800">
            WhatsApp / SMS Number
          </label>
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 w-full border border-neutral-200 rounded p-2"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-neutral-800">
              Start Hour (24h)
            </label>
            <input
              name="startHour"
              type="number"
              min={0}
              max={23}
              value={formData.startHour}
              onChange={handleChange}
              className="mt-1 w-full border border-neutral-200 rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-neutral-800">
              End Hour (24h)
            </label>
            <input
              name="endHour"
              type="number"
              min={0}
              max={23}
              value={formData.endHour}
              onChange={handleChange}
              className="mt-1 w-full border border-neutral-200 rounded p-2"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-neutral-800">
            Slot Duration (minutes)
          </label>
          <input
            name="slotDuration"
            type="number"
            min={15}
            step={15}
            value={formData.slotDuration}
            onChange={handleChange}
            className="mt-1 w-full border border-neutral-200 rounded p-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-light text-white py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Signing up…" : "Sign Up"}
        </button>
      </form>
    </main>
  );
}
