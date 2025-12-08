import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Categories.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  // ✅ PASS BOTH ID + NAME
  const handleCategoryClick = (id, name) => {
    navigate(`/categories/${id}`, {
      state: { categoryName: name },
    });
  };

  return (
    <section className="category-section" id="categories">
      <h2 className="section-title">
        <span>Categories</span>
      </h2>

      {loading && <p className="loading-text">Loading categories...</p>}

      <div className="category-grid">
        {categories.map((cat) => (
          <div
            className="category-card"
            key={cat.id}
            onClick={() =>
              handleCategoryClick(cat.id, cat.category_name)
            }
            style={{ cursor: "pointer" }}
          >
            <div className="image-box">
              <img
                src={cat.category_image}
                alt={cat.category_name}
                loading="lazy"
              />

              <span className="count-badge">
                {cat.product_count}
              </span>
            </div>

            <p className="cat-name">{cat.category_name}</p>
          </div>
        ))}
      </div>

      {!loading && categories.length === 0 && (
        <p className="empty-text">No categories available.</p>
      )}
    </section>
  );
}
