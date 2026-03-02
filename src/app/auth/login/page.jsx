"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

const searchParams = useSearchParams();
const callbackUrl = searchParams.get("callbackUrl") || "/";

 const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData(e.target);
  const email = formData.get("email");
  const password = formData.get("password");

  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
    callbackUrl,
  });

  if (!result.ok) {
    Swal.fire({
      title: "Error! Email and password do not match",
      width: 500,
      padding: "3em",
      color: "#716add",
      background: "#fff",
      backdrop: `
        rgba(0,0,123,0.4)
        url("/cat-space.gif")
        left top
        no-repeat
      `
    });
    setLoading(false);
  } else {
    Swal.fire({
      title: "Success! You are successfully logged in",
      width: 500,
      padding: "3em",
      color: "#716add",
      background: "#fff",
      backdrop: `
        rgba(0,0,123,0.4)
        url("/cat-space.gif")
        left top
        no-repeat
      `
    }).then(() => {
      router.push(callbackUrl);
    });
  };


    // const res = await fetch("/api/auth/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     email,password
    //   }),
    // });
    // console.log("email:", formData.get("email"), "password:", formData.get("password"));

    // const data = await res.json();
    // setLoading(false);

    // if (res.ok) {
    //   router.push("/");
    // } else {
    //   alert(data.message);
    // }
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