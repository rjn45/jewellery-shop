import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Categories.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ PAGINATION STATES
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Detect if HOME or FULL PAGE
  const isHomePage = location.pathname === "/";

  // ✅ FETCH CATEGORIES WITH PAGINATION
  useEffect(() => {
    let url = isHomePage
      ? "https://myvillage.dev.birthplace.in/api/shops/shops_categories/shop/rtk-gold-shop"
      : `https://myvillage.dev.birthplace.in/api/shops/shops_categories/shop/rtk-gold-shop/?page=${page}`;

    setLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data?.results || []);
        setNextPage(data?.next);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Category fetch error:", err);
        setLoading(false);
      });
  }, [page, isHomePage]);

  // ✅ CLICK CATEGORY
  const handleCategoryClick = (id, name) => {
    navigate(`/categories/${id}`, {
      state: { categoryName: name },
    });
  };

  // ✅ HOME PAGE SHOW ONLY 6
  const visibleCategories = isHomePage
    ? categories.slice(0, 6)
    : categories;

  return (
    <section className="category-section" id="categories">
      <h2 className="categories-title">
        <span>{isHomePage ? "Categories" : "All Categories"}</span>
      </h2>

      {loading && <p className="loading-text">Loading categories...</p>}

      <div className="category-grid">
        {visibleCategories.map((cat) => (
          <div
            className="category-card"
            key={cat.id}
            onClick={() =>
              handleCategoryClick(cat.id, cat.category_name)
            }
          >
            <div className="image-box">
              <img src={cat.category_image} alt={cat.category_name} loading="lazy" />

              <span className="count-badge">{cat.product_count}</span>
            </div>

            <p className="cat-name">{cat.category_name}</p>
          </div>
        ))}
      </div>

      {/* ✅ VIEW ALL BUTTON ONLY ON HOME */}
      {isHomePage && categories.length > 6 && (
        <div className="view-all-wrapper">
          <button
            className="view-all-btn"
            onClick={() => navigate("/categories")}
          >
            View All Categories
          </button>
        </div>
      )}

      {/* ✅ PAGINATION */}
      {!isHomePage && (
        <div className="pagination">
          {page > 1 && <button onClick={() => setPage(page - 1)}>Prev</button>}

          <button className={page === 1 ? "active" : ""} onClick={() => setPage(1)}>
            1
          </button>

          <button className={page === 2 ? "active" : ""} onClick={() => setPage(2)}>
            2
          </button>

          {nextPage && (
            <button onClick={() => setPage(page + 1)}>Next</button>
          )}
        </div>
      )}

      {!loading && categories.length === 0 && (
        <p className="empty-text">No categories available.</p>
      )}
    </section>
  );
}
