import React, { useEffect, useState } from "react";
import "./App.css";

// Color palette (from work item): 
// primary: #1976d2, secondary: #90caf9, accent: #ff9800

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");
  // States for data widgets
  const [elephantCount, setElephantCount] = useState("...");
  const [actions, setActions] = useState([]);
  const [hitCount, setHitCount] = useState("...");
  const [responseTimes, setResponseTimes] = useState([]);

  // Dynamic API base (adjust for deployment CORS if needed)
  const API_BASE = "http://localhost:3001";

  // Fetches
  useEffect(() => {
    // Set theme variable on root for CSS
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Fetch dashboard data on load
  useEffect(() => {
    fetch(`${API_BASE}/elephants/count`)
      .then((r) => r.json())
      .then((data) => setElephantCount(data?.count ?? "N/A"))
      .catch(() => setElephantCount("N/A"));

    fetch(`${API_BASE}/elephants/actions`)
      .then((r) => r.json())
      .then((data) => setActions(data?.actions ?? []))
      .catch(() => setActions([]));

    fetch(`${API_BASE}/metrics/hit_count`)
      .then((r) => r.json())
      .then((data) => setHitCount(data?.hit_count ?? "N/A"))
      .catch(() => setHitCount("N/A"));

    fetch(`${API_BASE}/metrics/response_times`)
      .then((r) => r.json())
      .then((data) => setResponseTimes(data?.response_times ?? []))
      .catch(() => setResponseTimes([]));
  }, []);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // ---- Layout ----
  return (
    <div className="dashboard-root">
      <nav className="navbar">
        <div className="navbar-title">🐘 Elephant Dashboard</div>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </nav>
      <main className="dashboard-content">
        <div className="widget-grid">
          <WidgetCard
            title="Elephant Count"
            icon="🐘"
            accent="primary"
            className="widget"
          >
            <span className="dashboard-num">{elephantCount}</span>
          </WidgetCard>
          <WidgetCard
            title="Elephant Actions"
            icon="🦣"
            accent="secondary"
            className="widget"
          >
            <ul className="actions-list">
              {actions.length === 0 && (
                <li className="actions-empty">No data</li>
              )}
              {actions.map((act, idx) => (
                <li key={idx} className="action-item">
                  <strong>{act.name}:</strong>{" "}
                  <span>{act.action}</span>
                </li>
              ))}
            </ul>
          </WidgetCard>
          <WidgetCard
            title="API Hit Count"
            icon="💡"
            accent="accent"
            className="widget"
          >
            <span className="dashboard-num">{hitCount}</span>
          </WidgetCard>
          <WidgetCard
            title="API Response Times"
            icon="⏱️"
            accent="secondary"
            className="widget"
          >
            <ul className="responses-list">
              {Array.isArray(responseTimes) && responseTimes.length > 0 ? (
                responseTimes.map((v, idx) => (
                  <li key={idx}>
                    <span>#{idx + 1}:</span>
                    <span className="response-time">{v} ms</span>
                  </li>
                ))
              ) : (
                <li>No data</li>
              )}
            </ul>
          </WidgetCard>
        </div>
      </main>
    </div>
  );
}

// PUBLIC_INTERFACE
function WidgetCard({ title, icon, accent, className = "", children }) {
  // accent: "primary"|"secondary"|"accent"
  return (
    <section className={`widget-card ${accent} ${className}`}>
      <div className="widget-header">
        <span className="widget-icon">{icon}</span>
        <span className="widget-title">{title}</span>
      </div>
      <div className="widget-content">{children}</div>
    </section>
  );
}

export default App;
