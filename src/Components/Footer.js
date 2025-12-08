import React, { useEffect, useState } from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const [shopData, setShopData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://myvillage.dev.birthplace.in/api/shops/shop_names/rtk-gold-shop/")
      .then((res) => res.json())
      .then((data) => setShopData(data));
  }, []);

  if (!shopData) return null;

  const scrollToSection = (id) => {
    if (document.getElementById(id)) {
      document.getElementById(id).scrollIntoView({ behavior: "smooth" });
      return;
    }
    navigate("/");
    setTimeout(() => {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-left">
          <h2 className="footer-shop-title">{shopData.shop_name}</h2>
          {shopData.logo && (
            <div className="footer-logo-box">
              <img src={shopData.logo} alt="Shop Logo" />
            </div>
          )}
        </div>

        <div className="footer-middle">
          <h3 className="footer-links-title">QUICK LINKS</h3>
          <ul className="footer-links">
            <li onClick={() => scrollToSection("home")}>• HOME</li>
            <li onClick={() => scrollToSection("about")}>• ABOUT</li>
            <li onClick={() => scrollToSection("categories")}>• CATEGORIES</li>
            <li onClick={() => scrollToSection("trending")}>• TRENDING</li>
            <li onClick={() => navigate("/blogs")}>• BLOGS</li>
            <li onClick={() => scrollToSection("contact")}>• CONTACT US</li>
          </ul>
        </div>

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
