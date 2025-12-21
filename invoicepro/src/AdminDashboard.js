import { useEffect } from "react";

export default function AdminDashboard() {
  const isAdmin = localStorage.getItem("isAdmin");

  useEffect(() => {
    if (isAdmin !== "true") {
      window.location.href = "/admin";
    }
  }, [isAdmin]);

  const logout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "/admin";
  };

  if (isAdmin !== "true") {
    return <h2 style={{ padding: 40 }}>Access Denied ❌</h2>;
  }

  return (
    <div style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Admin Dashboard</h1>
        <button
          onClick={logout}
          style={{
            padding: "8px 16px",
            background: "#e63946",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <p style={{ color: "#555" }}>Welcome Admin 👋 Manage your website here.</p>

      {/* Stats Cards */}
      <div style={{ display: "flex", gap: 20, marginTop: 30, flexWrap: "wrap" }}>
        <Card title="Total Invoices" value="128" />
        <Card title="PDF Downloads" value="342" />
        <Card title="Website Status" value="🟢 Online" />
      </div>

      {/* Info Section */}
      <div
        style={{
          marginTop: 40,
          padding: 20,
          background: "#f8f9fa",
          borderRadius: 8,
        }}
      >
        <h3>Admin Controls</h3>
        <ul>
          <li>Monitor invoice usage</li>
          <li>Track downloads</li>
          <li>Manage future features</li>
        </ul>
      </div>
    </div>
  );
}

/* Small reusable card component */
function Card({ title, value }) {
  return (
    <div
      style={{
        minWidth: 200,
        padding: 20,
        background: "#ffffff",
        borderRadius: 10,
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h4 style={{ marginBottom: 10 }}>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}
