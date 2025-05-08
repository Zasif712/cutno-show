// app/signup/page.tsx
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    shopName: "",
    city: "",
    phone: "",
    email: "",
    startHour: 9,
    endHour: 17,
    slotDuration: 60,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/signup/thank-you");
    } else {
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-neutral-900">Barber Signup</h1>
        {/** Shop Name */}
        <label className="block mb-4">
          <span className="text-neutral-800">Shop Name</span>
          <input
            type="text"
            name="shopName"
            value={form.shopName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-neutral-200 rounded p-2"
          />
        </label>
        {/** City */}
        <label className="block mb-4">
          <span className="text-neutral-800">City</span>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-neutral-200 rounded p-2"
          />
        </label>
        {/** Phone */}
        <label className="block mb-4">
          <span className="text-neutral-800">Phone (WhatsApp/SMS)</span>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-neutral-200 rounded p-2"
          />
        </label>
        {/** Email */}
        <label className="block mb-4">
          <span className="text-neutral-800">Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-neutral-200 rounded p-2"
          />
        </label>
        {/** Business Hours */}
        <div className="flex gap-4 mb-4">
          <label className="flex-1">
            <span className="text-neutral-800">Start Hour (24h)</span>
            <input
              type="number"
              name="startHour"
              value={form.startHour}
              onChange={handleChange}
              min={0}
              max={23}
              className="mt-1 block w-full border border-neutral-200 rounded p-2"
            />
          </label>
          <label className="flex-1">
            <span className="text-neutral-800">End Hour (24h)</span>
            <input
              type="number"
              name="endHour"
              value={form.endHour}
              onChange={handleChange}
              min={1}
              max={24}
              className="mt-1 block w-full border border-neutral-200 rounded p-2"
            />
          </label>
        </div>
        {/** Slot Duration */}
        <label className="block mb-6">
          <span className="text-neutral-800">Slot Duration (minutes)</span>
          <input
            type="number"
            name="slotDuration"
            value={form.slotDuration}
            onChange={handleChange}
            min={15}
            max={180}
            className="mt-1 block w-full border border-neutral-200 rounded p-2"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Signing Up..." : "Create Account"}
        </button>
      </form>
    </main>
  );
}
