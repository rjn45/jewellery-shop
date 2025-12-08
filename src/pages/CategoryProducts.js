import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./CategoryProducts.css";

export default function CategoryProducts() {
  const { id } = useParams(); // category id
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  // ✅ FETCH CATEGORY NAME DIRECTLY FROM API
  useEffect(() => {
    fetch(
      "https://myvillage.dev.birthplace.in/api/shops/shops_categories/shop/rtk-gold-shop"
    )
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((cat) => String(cat.id) === String(id));
        setCategoryName(found ? found.category_name : "Collection");
      })
      .catch(() => setCategoryName("Collection"));
  }, [id]);

  // ✅ FETCH PRODUCTS
  useEffect(() => {
    fetch(
      `https://myvillage.dev.birthplace.in/api/shops/products/shop/rtk-gold-shop/category/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data?.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Product fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <Navbar forceActive="Categories" />

      <div className="category-products-page">
        {/* BACK BUTTON */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back To Categories
        </button>

        {/* CATEGORY NAME FIXED */}
        <h1 className="category-title">{categoryName}</h1>

        {loading && <p className="loading-text">Loading products...</p>}

        <div className="products-grid">
          {!loading && products.length === 0 && (
            <p className="empty-text">No products available in this category.</p>
          )}

          {products.map((item) => (
            <div
              className="product-card"
              key={item.id}
              onClick={() => navigate(`/products/${item.id}`)}
            >
              <img src={item.product_image} alt={item.product_name} />
              <h3>{item.product_name}</h3>
              <p>₹{item.product_price}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
