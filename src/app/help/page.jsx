"use client";

import { useState } from "react";

export default function HelpPage() {
  const [question, setQuestion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/help", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "user@gmail.com", // later use logged-in user
        question,
      }),
    });

    alert("Question submitted!");
    setQuestion("");
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-xl font-bold mb-4">Need Help?</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Ask your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button className="mt-3 bg-black text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}