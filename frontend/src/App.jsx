import React from "react";
import LeadUpload from "./pages/LeadUpload";
import LeadAssign from "./pages/LeadAssign";
import Dashboard from "./pages/Dashboard";
import Histograms from "./pages/Histograms";
import Leaderboard from "./pages/Leaderboard";
import SalespersonReport from "./pages/SalespersonReport";

function App() {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Sales AI Platform</h1>

      {/* Render pages in demo order */}
      <LeadUpload />
      <LeadAssign />
      <Dashboard />
      <Histograms />
      <Leaderboard />
      <SalespersonReport />
    </div>
  );
}

export default App;
