"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      router.push("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6">
        Create New Account
      </h2>

      <form onSubmit={handleRegister} className="space-y-4">
        <input name="name" type="text" placeholder="Full Name"
          className="w-full border p-3 rounded-lg" required />

        <input name="email" type="email" placeholder="Email"
          className="w-full border p-3 rounded-lg" required />

        <input name="password" type="password" placeholder="Password"
          className="w-full border p-3 rounded-lg" required />

        <button
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg"
        >
          {loading ? "Creating..." : "Register"}
        </button>
      </form>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <span
          onClick={() => router.push("/auth/login")}
          className="text-black font-semibold cursor-pointer"
        >
          Login
        </span>
      </p>
    </>
  );
}