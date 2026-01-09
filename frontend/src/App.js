import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import LeadUpload from "./pages/LeadUpload";
import CallLogs from "./pages/CallLogs";
import Histograms from "./pages/Histograms";
import Leaderboard from "./pages/Leaderboard";
import SalespersonReport from "./pages/SalespersonReport";
import FollowUps from "./pages/Followups";

export default function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-10">Manager Panel</h1>

        <MenuItem text="Dashboard" onClick={() => setPage("dashboard")} />
        <MenuItem text="Upload Leads" onClick={() => setPage("upload")} />
        <MenuItem text="Call Logs" onClick={() => setPage("calls")} />
        <MenuItem text="Histograms" onClick={() => setPage("histograms")} />
        <MenuItem text="Leaderboard" onClick={() => setPage("leaderboard")} />
        <MenuItem text="Salesperson Report" onClick={() => setPage("report")} />
        <MenuItem text="Follow-ups" onClick={() => setPage("followups")} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        {page === "dashboard" && <Dashboard />}
        {page === "upload" && <LeadUpload />}
        {page === "calls" && <CallLogs />}
        {page === "histograms" && <Histograms />}
        {page === "leaderboard" && <Leaderboard />}
        {page === "report" && <SalespersonReport />}
        {page === "followups" && <FollowUps />}
      </div>
    </div>
  );
}

function MenuItem({ text, onClick }) {
  return (
    <div
      onClick={onClick}
      className="mb-4 cursor-pointer hover:bg-slate-800 p-3 rounded-lg transition"
    >
      {text}
    </div>
  );
}

