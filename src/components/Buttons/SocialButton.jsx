"use client";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

const SocialButton = ({ callbackUrl }) => {
  const handleSignIn = async () => {
    // OAuth will automatically redirect; no need to await
    signIn("google", { callbackUrl: callbackUrl || "/" });
  };

  return (
    <div className="flex gap-3 mt-4">
      <button onClick={handleSignIn} className="btn btn-ghost">
        <FaGoogle className="text-lg mr-2" />
        Sign in with Google
      </button>
    </div>
  );
};

export default SocialButton;