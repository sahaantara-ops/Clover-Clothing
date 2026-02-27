"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      router.push("/");
    } else {
      alert(data.message);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6">
        Login to Your Account
      </h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <input name="email" type="email" placeholder="Email"
          className="w-full border p-3 rounded-lg" required />

        <input name="password" type="password" placeholder="Password"
          className="w-full border p-3 rounded-lg" required />

        <button
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center mt-4">
        Don't have an account?{" "}
        <span
          onClick={() => router.push("/auth/register")}
          className="text-black font-semibold cursor-pointer"
        >
          Register
        </span>
      </p>
    </>
  );
}