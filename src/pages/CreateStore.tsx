import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateStore() {
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      setMessage("⚠️ Store name is required!");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/store/create",
        { name, domain, logoUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setMessage("✅ Store created successfully!");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setMessage(`⚠️ ${res.data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error while creating store");
    } finally {
      setLoading(false);
    }
  };

  const autoDomain = (value: string) => {
    const clean = value.toLowerCase().replace(/\s+/g, "");
    setDomain(clean);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eef2ff, #f5f3ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          padding: "40px",
          width: "400px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#4f46e5",
            marginBottom: "20px",
            fontSize: "1.6rem",
            fontWeight: 700,
          }}
        >
          🏪 Create Your Store
        </h2>
        <p style={{ color: "#6b7280", marginBottom: "25px", fontSize: "0.9rem" }}>
          Let’s set up your first online store in just a few seconds.
        </p>

        <form onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Store Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              autoDomain(e.target.value);
            }}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              marginBottom: "15px",
              fontSize: "1rem",
            }}
          />

          <input
            type="text"
            placeholder="Custom Domain (optional)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              marginBottom: "15px",
              fontSize: "1rem",
            }}
          />

          <input
            type="text"
            placeholder="Logo URL (optional)"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              marginBottom: "20px",
              fontSize: "1rem",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: loading
                ? "#a5b4fc"
                : "linear-gradient(135deg, #4f46e5, #6366f1)",
              color: "#fff",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            {loading ? "Creating..." : "Create Store"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "20px",
              fontSize: "0.95rem",
              color: message.startsWith("✅")
                ? "#16a34a"
                : message.startsWith("⚠️")
                ? "#ca8a04"
                : "#dc2626",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
