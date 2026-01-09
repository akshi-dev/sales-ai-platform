export default function Leaderboard() {
  const data = [
    { name: "Madhu", conversions: 8, calls: 40 },
    { name: "Priya", conversions: 6, calls: 35 },
    { name: "Amit", conversions: 5, calls: 30 }
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h2>Sales Leaderboard</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={cellStyle}>Rank</th>
            <th style={cellStyle}>Name</th>
            <th style={cellStyle}>Conversions</th>
            <th style={cellStyle}>Total Calls</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td style={cellStyle}>#{index + 1}</td>
              <td style={cellStyle}>{row.name}</td>
              <td style={cellStyle}>{row.conversions}</td>
              <td style={cellStyle}>{row.calls}</td>
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
