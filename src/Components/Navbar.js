import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  const [shop, setShop] = useState({});
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch shop info
  useEffect(() => {
    fetch("https://myvillage.dev.birthplace.in/api/shops/shop_names/rtk-gold-shop")
      .then((res) => res.json())
      .then((data) => setShop(data));
  }, []);

  // Listen for external active tab change
  useEffect(() => {
    const handler = (e) => {
      setActive(e.detail);
    };
    window.addEventListener("setActiveNav", handler);
    return () => window.removeEventListener("setActiveNav", handler);
  }, []);

  // Auto-detect active tab by URL
  useEffect(() => {
    const path = location.pathname;

    if (path === "/") setActive("Home");
    else if (path.startsWith("/categories")) setActive("Categories");
    else if (path.startsWith("/blogs")) setActive("Blogs");
    else if (path.startsWith("/products")) setActive("Trending"); // ⭐ correct path
    else setActive("");
  }, [location.pathname]);

  // Scroll and navigation handler
  const handleNavClick = (id) => {
    setActive(id);
    setMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const target = document.getElementById(id.toLowerCase());
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }, 300);
      return;
    }

    const target = document.getElementById(id.toLowerCase());
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={shop.logo} alt="logo" className="shop-logo" />
        <h1 className="shop-title">{shop.shop_name}</h1>
      </div>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <i className="fa-solid fa-bars"></i>
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li className={active === "Home" ? "active" : ""} onClick={() => handleNavClick("Home")}>
          <i className="fa-solid fa-house"></i> Home
        </li>

        <li className={active === "About" ? "active" : ""} onClick={() => handleNavClick("About")}>
          <i className="fa-solid fa-circle-info"></i> About
        </li>

        <li className={active === "Categories" ? "active" : ""} onClick={() => handleNavClick("Categories")}>
          <i className="fa-solid fa-layer-group"></i> Categories
        </li>

        <li className={active === "Trending" ? "active" : ""} onClick={() => handleNavClick("Trending")}>
          <i className="fa-solid fa-fire"></i> Trending
        </li>

        <li className={active === "Blogs" ? "active" : ""} onClick={() => navigate("/blogs")}>
          <i className="fa-solid fa-blog"></i> Blogs
        </li>

        <li className={active === "Contact" ? "active" : ""} onClick={() => handleNavClick("Contact")}>
          <i className="fa-solid fa-address-card"></i> Contact
        </li>
      </ul>
    </nav>
  );
}
