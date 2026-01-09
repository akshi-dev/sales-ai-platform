import { useState } from "react";

export default function LeadUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = () => {
    if (!file) {
      setMessage("Please select a file first");
      return;
    }

    setMessage("File ready for upload: " + file.name);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Upload Leads (Excel / CSV)</h2>

      <div style={{ marginTop: "20px" }}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <button
        onClick={handleUpload}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Upload File
      </button>

      {message && (
        <p style={{ marginTop: "15px", color: "green" }}>{message}</p>
      )}
    </div>
  );
}
