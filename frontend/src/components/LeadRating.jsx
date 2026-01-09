import React, { useState } from "react";

export default function LeadRating({ leadId, userId, initialRating = 0, onRated }) {
  const [rating, setRating] = useState(initialRating);

  const submitRating = async () => {
    const res = await fetch("/leads/rate-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lead_id: leadId, rating, user_id: userId })
    });
    const data = await res.json();
    if (data.status === "rated") {
      onRated && onRated(rating);
      onRated && onRated(rating);
    }
  };

  return (
    <div className="p-3 border rounded-2xl shadow-sm max-w-sm">
      <p className="text-sm font-medium mb-2">Rate this Lead</p>

      <div className="flex gap-1 mb-2">
        {[1,2,3,4,5].map(star => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-xl ${rating >= star ? "text-yellow-500" : "text-gray-300"}`}
          >
            ★
          </button>
        ))}
      </div>

      <button
        onClick={submitRating}
        className="px-3 py-1 text-sm border rounded-xl shadow"
      >
        Submit
      </button>
    </div>
  );
}
