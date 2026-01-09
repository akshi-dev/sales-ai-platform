import { useEffect, useState } from "react";
import axios from "axios";

export default function Followups() {

  const [followups, setFollowups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Fetch follow-ups from backend
  const fetchFollowups = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/followups");
      setFollowups(res.data);
    } catch (err) {
      setError("Failed to load follow-ups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowups();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Follow-up Tracker</h2>

      {loading && <p>Loading follow-ups...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={cellStyle}>Lead</th>
            <th style={cellStyle}>Status</th>
            <th style={cellStyle}>Due Date</th>
          </tr>
        </thead>

        <tbody>
          {followups.map((row, i) => (
            <tr key={i}>
              <td style={cellStyle}>{row.lead}</td>
              <td style={cellStyle}>{row.status}</td>
              <td style={cellStyle}>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cellStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "center"
};
