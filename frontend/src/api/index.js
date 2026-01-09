const API_BASE = "http://localhost:8000";   // backend URL

export const getDashboardStats = async () => {
  const res = await fetch(`${API_BASE}/api/analytics/summary`);
  return res.json();
};

export const getCallLogs = async () => {
  const res = await fetch(`${API_BASE}/api/calls`);
  return res.json();
};

export const getHistograms = async () => {
  const res = await fetch(`${API_BASE}/api/analytics/histograms`);
  return res.json();
};

export const getSalespersonReport = async () => {
  const res = await fetch(`${API_BASE}/api/analytics/salesperson-report`);
  return res.json();
};
