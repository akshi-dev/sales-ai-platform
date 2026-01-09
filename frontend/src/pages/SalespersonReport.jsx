import { useEffect, useState } from "react";

export default function SalespersonReport() {

  const [salespeople, setSalespeople] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalespeople();
  }, []);

  const fetchSalespeople = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/sales-report");  
      const data = await response.json();

      setSalespeople(data);
      setSelected(data[0]);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching sales report:", error);
      setLoading(false);
    }
  };

  if (loading) return <p style={{ padding: "30px" }}>Loading report...</p>;

  const exportCSV = () => {
    let csv = "Name,Calls,Unique Numbers,Conversions,Conversion Rate,Avg Call Duration,Call Score,Network Quality,Followup Success\n";

    salespeople.forEach(sp => {
      csv += `${sp.name},${sp.calls},${sp.unique},${sp.conversions},${sp.rate},${sp.duration},${sp.score},${sp.network},${sp.followup}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "salesperson_report.csv";
    a.click();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Salesperson Performance Reports</h2>

      <button onClick={exportCSV} style={exportStyle}>
        Export Report (CSV)
      </button>

      <div style={{ marginBottom: "20px", marginTop: "10px" }}>
        {salespeople.map((sp, index) => (
          <button
            key={index}
            onClick={() => setSelected(sp)}
            style={buttonStyle}
          >
            {sp.name}
          </button>
        ))}
      </div>

      <div style={card}>Name: {selected.name}</div>
      <div style={card}>Total Calls: {selected.calls}</div>
      <div style={card}>Unique Numbers: {selected.unique}</div>
      <div style={card}>Conversions: {selected.conversions}</div>
      <div style={card}>Conversion Rate: {selected.rate}</div>
      <div style={card}>Avg Call Duration: {selected.duration}</div>
      <div style={card}>Avg Call Score: {selected.score}</div>
      <div style={card}>Network Quality Avg: {selected.network}</div>
      <div style={card}>Follow-up Success: {selected.followup}</div>
    </div>
  );
}
