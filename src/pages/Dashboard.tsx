import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";

export default function Dashboard() {
  const [status, setStatus] = useState("loading");
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [storeDomain, setStoreDomain] = useState<string>("");
  const [storeName, setStoreName] = useState<string>("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const firstName = localStorage.getItem("userName") || "User";

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        // 🧾 1️⃣ Check trial status
        const trialRes = await axios.get(
          `http://localhost:5000/api/auth/check-trial/${userId}`
        );

        if (trialRes.data.plan === "expired") {
          navigate("/upgrade");
        } else {
          setStatus(trialRes.data.plan);
          setDaysLeft(trialRes.data.daysLeft);
          setUserName(firstName);
        }

        // 🏪 2️⃣ Fetch store info specific to logged-in user
        const storeRes = await axios.get(
          `http://localhost:5000/api/store/user/${userId}`
        );

        if (storeRes.data?.store) {
          setStoreDomain(storeRes.data.store.domain || "");
          setStoreName(storeRes.data.store.name || "");
        }
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      }
    };

    fetchDashboardData();
  }, [navigate, userId, firstName]);

  if (status === "loading") {
    return (
      <div style={{ textAlign: "center", marginTop: "150px" }}>
        <h2>Loading your dashboard...</h2>
      </div>
    );
  }

  // 🧠 Clean and Safe Website URL Generator
  const cleanDomain = storeDomain
    ?.replace("http://", "")
    ?.replace("https://", "")
    ?.replace(".localhost:5173", "")
    ?.replace(/\/$/, "") // remove trailing slash
    ?.trim();

  const websiteURL = cleanDomain
    ? `http://${cleanDomain}.localhost:5173`
    : `http://localhost:5173/demo`;

  const handleViewWebsite = () => {
    window.open(websiteURL, "_blank", "noopener,noreferrer");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f9fafb" }}>
      {/* ✅ Sidebar */}
      <Sidebar />

      {/* ✅ Dashboard Content */}
      <main style={{ marginLeft: "230px", padding: "40px", width: "100%" }}>
        <h1 style={{ color: "#111", fontSize: "1.8rem" }}>
          🎉 Welcome back,{" "}
          <span style={{ color: "#4f46e5" }}>{userName}</span>
        </h1>

        {storeName && (
          <p style={{ marginTop: "5px", color: "#6b7280" }}>
            🏪 Managing Store: <strong>{storeName}</strong>
          </p>
        )}

        {status === "trial" && (
          <div
            style={{
              background: "#eef2ff",
              border: "1px solid #c7d2fe",
              borderRadius: "8px",
              padding: "16px 20px",
              marginTop: "20px",
              display: "inline-block",
              fontSize: "0.95rem",
              color: "#4338ca",
            }}
          >
            🔔 Your <strong>7-day free trial</strong> is active.{" "}
            <strong>{daysLeft}</strong> days left ⏳
          </div>
        )}

        {status === "premium" && (
          <div
            style={{
              background: "#dcfce7",
              border: "1px solid #86efac",
              borderRadius: "8px",
              padding: "16px 20px",
              marginTop: "20px",
              display: "inline-block",
              fontSize: "0.95rem",
              color: "#166534",
            }}
          >
            ✅ You’re on the <strong>Premium Plan</strong>. Enjoy all features!
          </div>
        )}

        <section style={{ marginTop: "40px" }}>
          <h2 style={{ color: "#374151", marginBottom: "10px" }}>
            Dashboard Overview
          </h2>
          <p style={{ color: "#6b7280" }}>
            Your website setup progress will appear here soon...
          </p>
        </section>

        {/* 🌐 View Website Button */}
        <div
          style={{
            marginTop: "80px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={handleViewWebsite}
            style={{
              background: "linear-gradient(135deg, #4f46e5, #6366f1)",
              color: "#fff",
              padding: "12px 28px",
              borderRadius: "8px",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(99,102,241,0.3)",
              transition: "all 0.2s ease-in-out",
            }}
            onMouseOver={(e) =>
              ((e.target as HTMLButtonElement).style.transform = "scale(1.05)")
            }
            onMouseOut={(e) =>
              ((e.target as HTMLButtonElement).style.transform = "scale(1)")
            }
          >
            🌐 View {cleanDomain ? cleanDomain : "Website"}
          </button>
        </div>
      </main>
    </div>
  );
}
