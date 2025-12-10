import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  const [shop, setShop] = useState({});
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ FETCH SHOP DATA
  useEffect(() => {
    fetch("https://myvillage.dev.birthplace.in/api/shops/shop_names/rtk-gold-shop")
      .then((res) => res.json())
      .then((data) => setShop(data));
  }, []);

  // ✅ AUTO ACTIVE TAB BASED ON URL (FIXES YOUR ISSUE)
  useEffect(() => {
    const path = location.pathname;

    if (path === "/") setActive("Home");
    else if (path.includes("about")) setActive("About");
    else if (path.includes("categories")) setActive("Categories");
    else if (path.includes("trending")) setActive("Trending");
    else if (path.includes("blogs")) setActive("Blogs");
    else if (path.includes("product")) setActive("Trending");
    else if (path.includes("contact")) setActive("Contact");

  }, [location.pathname]);

  // ✅ SCROLL SPY ONLY FOR HOME PAGE
  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = ["home", "about", "categories", "trending", "blogs", "contact"];

    const handleScroll = () => {
      let scrollPos = window.scrollY + 150;

      for (let sec of sections) {
        const el = document.getElementById(sec);
        if (!el) continue;

        if (scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActive(sec.charAt(0).toUpperCase() + sec.slice(1));
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // ✅ NAVIGATION HANDLER
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

        <li className={active === "Blogs" ? "active" : ""} onClick={() => handleNavClick("Blogs")}>
          <i className="fa-solid fa-blog"></i> Blogs
        </li>

        <li className={active === "Contact" ? "active" : ""} onClick={() => handleNavClick("Contact")}>
          <i className="fa-solid fa-address-card"></i> Contact
        </li>

      </ul>
    </nav>
  );
}
