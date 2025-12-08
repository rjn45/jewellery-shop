import React, { useEffect, useState } from "react";
import "./Categories.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://myvillage.dev.birthplace.in/api/shops/shops_categories/shop/rtk-gold-shop"
    )
      .then((res) => res.json())
      .then((data) => {
        setCategories(data?.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Category fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="category-section" id="categories">
      {/* Title */}
      <h2 className="section-title">
        <span>Categories</span>
      </h2>

      {/* Loading State */}
      {loading && <p className="loading-text">Loading categories...</p>}

      {/* Category Cards */}
      <div className="category-grid">
        {categories.map((cat) => (
          <div className="category-card" key={cat.id}>
            
            <div className="image-box">
              <img
                src={cat.category_image}
                alt={cat.category_name}
                loading="lazy"
              />

              {/* Count Badge */}
              <span className="count-badge">
                {cat.product_count}
              </span>
            </div>

            {/* Name */}
            <p className="cat-name">{cat.category_name}</p>
          </div>
        ))}
      </div>

      {/* If no categories */}
      {!loading && categories.length === 0 && (
        <p className="empty-text">No categories available.</p>
      )}
    </section>
  );
}