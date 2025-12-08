import React, { useEffect, useState } from "react";
import "../App.css";

export default function Navbar() {
  const [shop, setShop] = useState({});
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Fetch shop data
  useEffect(() => {
    fetch("https://myvillage.dev.birthplace.in/api/shops/shop_names/rtk-gold-shop")
      .then((response) => response.json())
      .then((result) => setShop(result));
  }, []);

  // ---------- SCROLL SPY: Detect active section ----------
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const options = {
      threshold: 0.6, // 60% of section visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const formatted = id.charAt(0).toUpperCase() + id.slice(1);
          setActive(formatted);
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // ---------- CLICK HANDLERS ----------
  const handleNavClick = (id) => {
    setActive(id);
    document.getElementById(id.toLowerCase()).scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
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
