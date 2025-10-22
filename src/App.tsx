import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// 🌟 Pages
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Upgrade from "./pages/Upgrade";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Banners from "./pages/Banners"; // 🖼️ Banner Management Page
import CreateStore from "./pages/CreateStore";
import ShopFront from "./pages/ShopFront"; // 🧸 Storefront for subdomain customers
import ProductDetails from "./pages/ProductDetails"; // 🛍️ Product detail page

// 🧩 Layout
import Sidebar from "./components/Dashboard/Sidebar";

/* ============================================================
   🔐 Protected Route
============================================================ */
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuth(true);
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "Poppins, sans-serif",
          color: "#555",
        }}
      >
        Checking login...
      </div>
    );

  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
}

/* ============================================================
   🧱 Dashboard Layout (Sidebar + Main)
============================================================ */
function DashboardLayout({ children }: { children: JSX.Element }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "20px",
          background: "#f8f9fa",
          overflowY: "auto",
        }}
      >
        {children}
      </main>
    </div>
  );
}

/* ============================================================
   🚀 Main App
============================================================ */
export default function App() {
  const [isSubdomain, setIsSubdomain] = useState(false);

  // 🧠 Detect subdomain (like collection.localhost)
  useEffect(() => {
    const host = window.location.hostname;
    const parts = host.split(".");
    if (parts.length > 2 || (parts.length === 2 && parts[0] !== "localhost")) {
      setIsSubdomain(true);
    }
  }, []);

  // 🧸 If visiting a store subdomain → render storefront routes
  if (isSubdomain) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShopFront />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // 🧱 Otherwise, show SaaS admin dashboard
  return (
    <BrowserRouter>
      <Routes>
        {/* 🏠 Public Landing */}
        <Route path="/" element={<Landing />} />

        {/* 🔐 Auth Pages */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* 🏪 Create Store */}
        <Route path="/create-store" element={<CreateStore />} />

        {/* 🧸 Public Demo */}
        <Route path="/demo" element={<ShopFront />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* ================= Dashboard ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Products />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Categories />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/banners"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Banners />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/upgrade"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Upgrade />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* 🚧 404 Page */}
        <Route
          path="*"
          element={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
                fontFamily: "Poppins, sans-serif",
                color: "#333",
              }}
            >
              <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>
                🚧 Page Not Found
              </h1>
              <p>
                Go back{" "}
                <a
                  href="/"
                  style={{
                    color: "#4f46e5",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  home
                </a>
                .
              </p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
