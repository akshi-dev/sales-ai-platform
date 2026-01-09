import { useEffect, useState } from "react";
import { getDashboardStats } from "../api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats()
      .then(data => setStats(data))
      .catch(err => console.error("Failed to load dashboard stats", err));
  }, []);

  if (!stats) {
    return <p className="text-gray-600">Loading dashboard...</p>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard title="Total Calls" value={stats.total_calls} />
        <StatCard title="Conversions" value={stats.conversions} />
        <StatCard title="Unique Numbers" value={stats.unique_numbers} />
        <StatCard title="Follow-ups" value={stats.followups} />

      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
      <p className="text-gray-500 text-sm mb-2">{title}</p>
      <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
    </div>
  );
}
