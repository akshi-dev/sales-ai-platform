import React from "react";

export default function MetricsCards({ metrics }) {
  const items = [
    { label: "Total Calls", value: metrics?.total_calls || 0 },
    { label: "Conversions", value: metrics?.conversions || 0 },
    { label: "Unique Numbers", value: metrics?.unique_numbers || 0 },
    { label: "Duplicate Calls", value: metrics?.duplicate_calls || 0 },
    { label: "Follow-Ups", value: metrics?.followups || 0 },
    { label: "Conversion %", value: metrics?.conversion_rate ? metrics.conversion_rate + "%" : "0%" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-2">
      {items.map((item, i) => (
        <div key={i} className="border rounded-2xl shadow-sm p-3">
          <p className="text-xs text-gray-600 mb-1">{item.label}</p>
          <p className="text-lg font-semibold">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
