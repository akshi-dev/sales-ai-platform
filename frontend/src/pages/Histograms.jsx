import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function Histograms() {

  const callDuration = [
    { name: "0-1 min", value: 30 },
    { name: "1-3 min", value: 55 },
    { name: "3-5 min", value: 20 },
    { name: "5+ min", value: 10 }
  ];

  const leadRatings = [
    { name: "1 Star", value: 5 },
    { name: "2 Star", value: 12 },
    { name: "3 Star", value: 28 },
    { name: "4 Star", value: 40 },
    { name: "5 Star", value: 15 }
  ];

  const sentiment = [
    { name: "Positive", value: 50 },
    { name: "Neutral", value: 30 },
    { name: "Negative", value: 20 }
  ];

  const callQuality = [
    { name: "0-40", value: 10 },
    { name: "40-60", value: 25 },
    { name: "60-80", value: 45 },
    { name: "80-100", value: 20 }
  ];

  const conversion = [
    { name: "Converted", value: 18 },
    { name: "Not Converted", value: 82 }
  ];

  const rejection = [
    { name: "Weak Signal", value: 12 },
    { name: "Customer Reject", value: 20 },
    { name: "Invalid Number", value: 8 },
    { name: "Duplicate Call", value: 5 }
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h2>Analytics Histograms</h2>

      <Histogram title="Call Duration Distribution" data={callDuration} />
      <Histogram title="Lead Rating Distribution" data={leadRatings} />
      <Histogram title="Call Sentiment Distribution" data={sentiment} />
      <Histogram title="Call Quality Score Distribution" data={callQuality} />
      <Histogram title="Conversion Distribution" data={conversion} />
      <Histogram title="Call Rejection Reason Frequency" data={rejection} />
    </div>
  );
}

function Histogram({ title, data }) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <h3>{title}</h3>

      <BarChart width={700} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>
    </div>
  );
}
