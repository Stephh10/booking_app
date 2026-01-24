"use client";

import { useEffect } from "react";

export default function DashboardError({ error }: { error: Error }) {
  const resetPage = () => window.location.reload();
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        minHeight: "60vh",
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div style={{ fontSize: "80px", marginBottom: "20px" }}>📊</div>
        <h2 style={{ color: "#1976d2" }}>Error</h2>
        <p style={{ margin: "20px 0", color: "#666" }}>Something went wrong.</p>

        <div
          style={{
            backgroundColor: "#e3f2fd",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <strong>Error message:</strong> {error.message}
        </div>

        <div>
          <button
            onClick={resetPage}
            style={{
              backgroundColor: "#1976d2",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
