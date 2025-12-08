import React, { useEffect, useState } from "react";
import "./Footer.css";

export default function Footer() {
  const [shopData, setShopData] = useState(null);

  useEffect(() => {
    fetch("https://myvillage.dev.birthplace.in/api/shops/shop_names/rtk-gold-shop/")
      .then((res) => res.json())
      .then((data) => setShopData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!shopData) return null;

  // Smooth scroll function
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer>
      <div className="footer-container">

        {/* COLUMN 1 — Logo + Shop Name */}
        <div className="footer-left">
          <h2 className="footer-shop-title">{shopData.shop_name}</h2>

          {shopData.logo && (
            <div className="footer-logo-box">
              <img src={shopData.logo} alt="Shop Logo" />
            </div>
          )}
        </div>

        {/* COLUMN 2 — Quick Links */}
        <div className="footer-middle">
          <h3 className="footer-links-title">QUICK LINKS</h3>
          <ul className="footer-links">
            <li onClick={() => scrollToSection("home")}>• HOME</li>
            <li onClick={() => scrollToSection("about")}>• ABOUT</li>
            <li onClick={() => scrollToSection("categories")}>• CATEGORIES</li>
            <li onClick={() => scrollToSection("trending")}>• TRENDING</li>
            <li onClick={() => scrollToSection("blogs")}>• BLOGS</li>
            <li onClick={() => scrollToSection("contact")}>• CONTACT US</li>
          </ul>
        </div>

        {/* COLUMN 3 — Scroll to Top */}
        <div className="footer-right">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="scroll-btn"
          >
            ↑
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 jewellery shop Technologies • Designed By Raja
      </div>
    </footer>
  );
}