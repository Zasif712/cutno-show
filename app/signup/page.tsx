"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    shopName: "",
    city: "",
    phone: "",
    startHour: 9,
    endHour: 17,
    slotDuration: 60,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const { error: msg } = await res.json();
        throw new Error(msg || "Signup failed");
      }
      // On success, redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow"
      >
        <h1 className="text-2xl font-semibold mb-6">Barber Signup</h1>

        {error && (
          <div className="mb-4 text-red-600">Error: {error}</div>
        )}

        <label className="block mb-2">
          <span className="text-gray-700">Shop Name</span>
          <input
            name="shopName"
            value={form.shopName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-neutral-200 rounded-md"
          />
        </label>

        <label className="block mb-2">
          <span className="text-gray-700">City</span>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-neutral-200 rounded-md"
          />
        </label>

        <label className="block mb-2">
          <span className="text-gray-700">Phone (WhatsApp)</span>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-neutral-200 rounded-md"
          />
        </label>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <label className="block">
            <span className="text-gray-700">Start Hour</span>
            <input
              name="startHour"
              type="number"
              min={0}
              max={23}
              value={form.startHour}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-neutral-200 rounded-md"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">End Hour</span>
            <input
              name="endHour"
              type="number"
              min={0}
              max={23}
              value={form.endHour}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-neutral-200 rounded-md"
            />
          </label>
        </div>

        <label className="block mb-6">
          <span className="text-gray-700">Slot Duration (minutes)</span>
          <input
            name="slotDuration"
            type="number"
            min={15}
            max={180}
            step={15}
            value={form.slotDuration}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-neutral-200 rounded-md"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-2 rounded-md transition"
        >
          {loading ? "Signing up..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
