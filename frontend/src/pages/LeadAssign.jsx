import React, { useEffect, useState } from "react";
import axios from "axios";

const LeadAssign = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [assigningId, setAssigningId] = useState(null);
  const [error, setError] = useState("");

  // 🔹 Fetch unassigned leads
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/leads/unassigned");
      setLeads(res.data);
    } catch (err) {
      setError("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // 🔹 Assign lead using backend logic
  const assignLead = async (leadId) => {
    try {
      setAssigningId(leadId);
      await axios.post(`http://localhost:8000/leads/${leadId}/assign`);
      fetchLeads(); // refresh after assignment
    } catch (err) {
      alert("Assignment failed");
    } finally {
      setAssigningId(null);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Lead Assignment Engine</h2>

      {loading && <p>Loading leads...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {leads.length === 0 && !loading && (
        <p>No unassigned leads available</p>
      )}

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Lead ID</th>
            <th>Name</th>
            <th>Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.id}</td>
              <td>{lead.name}</td>
              <td>{lead.score ?? 50}</td>
              <td>
                <button
                  style={styles.button}
                  disabled={assigningId === lead.id}
                  onClick={() => assignLead(lead.id)}
                >
                  {assigningId === lead.id ? "Assigning..." : "Assign Lead"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadAssign;

// 🔹 Basic professional styling
const styles = {
  container: {
    padding: "30px",
    background: "#f8f9fa",
    minHeight: "100vh",
  },
  title: {
    marginBottom: "20px",
  },
  error: {
    color: "red",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
  },
  button: {
    padding: "8px 14px",
    background: "#0d6efd",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
