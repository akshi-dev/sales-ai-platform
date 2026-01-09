import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function HistogramChart({ data = [], title = "" }) {
  return (
    <div className="p-4">
      {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
      <div className="overflow-x-auto">
        <BarChart width={400} height={260} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </div>
    </div>
  );
}
