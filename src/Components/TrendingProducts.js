import React, { useEffect, useState } from "react";
import "./TrendingProducts.css";

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      "https://myvillage.dev.birthplace.in/api/shops/products/shop/rtk-gold-shop/trending/"
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  return (
    <section className="trending-section" id="trending">

      <h2 className="trend-title">
        <span>TRENDING PRODUCTS</span>
      </h2>

      {/* Scroll Wrapper */}
      <div className="trending-scroll">
        <div className="trending-grid">
          {products.map((item) => (
            <div className="trend-card" key={item.id}>
              
              {/* Image */}
              <div className="trend-img-wrapper">
                <img
                  src={item.product_image}
                  alt={item.product_name}
                  loading="lazy"
                />

                {/* Offer Badge */}
                {item.discount_percentage > 0 && (
                  <span className="offer-badge">
                    {item.discount_percentage}% OFF
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="trend-content">
                <h3 className="trend-name">{item.product_name}</h3>

                <p className="trend-price">
                  ₹{item.product_discount_price}
                  <span className="old-price">₹{item.product_price}</span>
                </p>

                <p className="views">
                  <i className="fa fa-eye"></i> {item.product_views_count} views
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}
