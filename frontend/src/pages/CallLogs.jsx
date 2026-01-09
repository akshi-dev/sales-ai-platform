import { useEffect, useState } from "react";
import axios from "axios";

export default function CallLogs() {

  const [allCalls, setAllCalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [salespersonFilter, setSalespersonFilter] = useState("All");
  const [outcomeFilter, setOutcomeFilter] = useState("All");

  // 🔹 Fetch call logs from backend
  const fetchCallLogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/call-logs");
      setAllCalls(res.data);
    } catch (err) {
      setError("Failed to load call logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCallLogs();
  }, []);

  // 🔹 Apply filters
  const filteredCalls = allCalls.filter(call => {
    return (
      (salespersonFilter === "All" || call.salesperson === salespersonFilter) &&
      (outcomeFilter === "All" || call.outcome === outcomeFilter)
    );
  });

  return (
    <div style={{ padding: "30px" }}>
      <h2>Call Logs</h2>

      {loading && <p>Loading call logs...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Filters */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
        <select onChange={(e) => setSalespersonFilter(e.target.value)}>
          <option value="All">All Salespersons</option>
          <option value="Madhu">Madhu</option>
          <option value="Priya">Priya</option>
          <option value="Amit">Amit</option>
        </select>

        <select onChange={(e) => setOutcomeFilter(e.target.value)}>
          <option value="All">All Outcomes</option>
          <option value="Converted">Converted</option>
          <option value="Follow-up">Follow-up</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>Lead</th>
            <th style={cellStyle}>Salesperson</th>
            <th style={cellStyle}>Date</th>
            <th style={cellStyle}>Time</th>
            <th style={cellStyle}>Duration</th>
            <th style={cellStyle}>Sentiment</th>
            <th style={cellStyle}>Outcome</th>
            <th style={cellStyle}>Call Score</th>
            <th style={cellStyle}>Network</th>
            <th style={cellStyle}>Follow-up</th>
            <th style={cellStyle}>Reject Reason</th>
            <th style={cellStyle}>Call Summary</th>
          </tr>
        </thead>

        <tbody>
          {filteredCalls.map((call, index) => (
            <tr key={index}>
              <td style={cellStyle}>{call.lead}</td>
              <td style={cellStyle}>{call.salesperson}</td>
              <td style={cellStyle}>{call.date}</td>
              <td style={cellStyle}>{call.time}</td>
              <td style={cellStyle}>{call.duration}</td>
              <td style={cellStyle}>{call.sentiment}</td>
              <td style={cellStyle}>{call.outcome}</td>
              <td style={cellStyle}>{call.score}</td>
              <td style={cellStyle}>{call.network}</td>
              <td style={cellStyle}>{call.followup}</td>
              <td style={cellStyle}>{call.reject}</td>
              <td style={{ ...cellStyle, maxWidth: "300px", textAlign: "left" }}>
                {call.summary}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
