import React, { useEffect, useState } from "react";
import styles from "../../styles/components/Sidebar.module.css";
import {
  FaStore,
  FaBox,
  FaUsers,
  FaChartLine,
  FaCog,
  FaPalette,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaThLarge,
  FaTag,
  FaImages,
  FaGlobe,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { getStoreURL } from "../../utils/getStoreURL";

export default function Sidebar() {
  const [storeName, setStoreName] = useState("Loading...");
  const [storeDomain, setStoreDomain] = useState<string>("");

  /* 🧩 Fetch store details */
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) return;

        // 🧾 Fetch user info
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        // 🏪 Fetch store info
        const storeRes = await fetch(
          `${import.meta.env.VITE_API_URL}/api/store/user/${userId}`
        );
        const storeData = await storeRes.json();

        if (storeData?.store?.name)
          setStoreName(storeData.store.name || "My Store");
        else if (data?.user?.websiteName)
          setStoreName(data.user.websiteName || "My Store");
        else setStoreName("My Store");

        if (storeData?.store?.domain)
          setStoreDomain(storeData.store.domain || "");
      } catch (err) {
        console.error("Error fetching sidebar data:", err);
        setStoreName("My Store");
      }
    };

    fetchUserInfo();
  }, []);

  /* 🧭 Menu Items */
  const mainMenu = [
    { name: "Dashboard", icon: <FaThLarge />, path: "/dashboard" },
    { name: "Products", icon: <FaBox />, path: "/products" },
    { name: "Categories", icon: <FaTag />, path: "/categories" },
    { name: "Banners", icon: <FaImages />, path: "/banners" },
    { name: "Orders", icon: <FaMoneyBillWave />, path: "/orders" },
    { name: "Customers", icon: <FaUsers />, path: "/customers" },
    { name: "Analytics", icon: <FaChartLine />, path: "/analytics" },
  ];

  const settings = [
    { name: "Store Settings", icon: <FaCog />, path: "/settings" },
    { name: "Themes", icon: <FaPalette />, path: "/themes" },
    { name: "Payments", icon: <FaMoneyBillWave />, path: "/payments" },
  ];

  /* 🚪 Logout Handler */
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  /* 🌍 View Website */
  const handleViewWebsite = () => {
    const url = getStoreURL(storeDomain);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <aside className={styles.sidebar}>
      {/* 🧸 Brand Header */}
      <div className={styles.brand}>
        <FaStore className={styles.logoIcon} />
        <span className={styles.brandName}>
          {storeName.length > 18 ? storeName.slice(0, 18) + "..." : storeName}
        </span>
      </div>

      {/* 🌐 View Website Button */}
      {storeDomain && (
        <button className={styles.viewSiteBtn} onClick={handleViewWebsite}>
          <FaGlobe /> View Website
        </button>
      )}

      {/* 📋 Main Menu */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>MAIN MENU</h4>
        <nav>
          {mainMenu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
            >
              <span className={styles.icon}>{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* ⚙️ Settings */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>SETTINGS</h4>
        <nav>
          {settings.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
            >
              <span className={styles.icon}>{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* 🚪 Logout */}
      <button className={styles.logoutBtn} onClick={handleLogout}>
        <FaSignOutAlt className={styles.icon} /> Logout
      </button>

      {/* 🧾 Version */}
      <div className={styles.version}>Version 1.0.0</div>
    </aside>
  );
}
