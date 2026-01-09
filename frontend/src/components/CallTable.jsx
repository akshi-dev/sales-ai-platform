import React from "react";

export default function CallTable({ calls = [] }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">Call Logs</h2>

      <div className="overflow-x-auto rounded-2xl shadow">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="border-b">
            <tr>
              <th className="p-2">Lead Name</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Salesperson</th>
              <th className="p-2">Time</th>
              <th className="p-2">Duration (sec)</th>
              <th className="p-2">Sentiment</th>
              <th className="p-2">Call Score</th>
              <th className="p-2">Network Score</th>
              <th className="p-2">Lead Rating</th>
              <th className="p-2">Summary</th>
              <th className="p-2">Follow-Up</th>
              <th className="p-2">Reject Reason</th>
              <th className="p-2">Unique #</th>
            </tr>
          </thead>
        </table>

        <tbody>
          {calls.length === 0 ? (
            <tr>
              <td className="p-3 text-center" colSpan="13">
                No calls logged yet
              </td>
            </tr>
          ) : (
            calls.map((call, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="p-2">{call.lead_name}</td>
                <td className="p-2">{call.phone}</td>
                <td className="p-2">{call.salesperson}</td>
                <td className="p-2">{new Date(call.timestamp).toLocaleTimeString()}</td>
                <td className="p-2">{call.duration}</td>
                <td className="p-2">{call.sentiment || "—"}</td>
                <td className="p-2">{call.call_quality_score || 0}</td>
                <td className="p-2">{call.network_quality_score || 0}</td>
                <td className="p-2">
                  {call.lead_rating ? "⭐".repeat(call.lead_rating) : "—"}
                </td>
                <td className="p-2 max-w-xs truncate">
                  {call.summary || "Analyzing..."}
                </td>
                <td className="p-2">
                  {call.followup_required ? (
                    <span className="text-blue-600 font-medium">
                      {call.followup_date}
                    </span>
                  ) : (
                    "No"
                  )}
                </td>
                <td className="p-2">
                  {call.rejection_reason ? (
                    <span className="text-red-600">{call.rejection_reason}</span>
                  ) : (
                    "None"
                  )}
                </td>
                <td className="p-2">
                  {call.is_time_waste ? (
                    <span className="text-orange-600 font-medium">⚠ Flagged</span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-2">
                  {call.unique_number_called ? (
                    <span className="font-semibold">✔ Yes</span>
                  ) : (
                    "Repeat"
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </div>
    </div>
  );
}
