import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import Navbar from "../Components/Navbar";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  // Highlight Trending tab in Navbar
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("setActiveNav", { detail: "Trending" }));
  }, []);

  // Fetch single product
  useEffect(() => {
    fetch(`https://myvillage.dev.birthplace.in/api/shops/products/shop/rtk-gold-shop/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log("API Error:", err));
  }, [id]);

  if (!product) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="product-page">
        <p className="back-btn" onClick={() => navigate(-1)}>
          ← Back to RTK Gold Shop
        </p>

        <div className="product-details-container">
          <div className="product-image">
            <img src={product.product_image} alt={product.product_name} />
          </div>

          <div className="product-info">
            <h1>{product.product_name}</h1>

            {product.discount_percentage > 0 && (
              <span className="discount-badge">{product.discount_percentage}% OFF</span>
            )}

            <p className="price">
              ₹{product.product_discount_price} <span>₹{product.product_price}</span>
            </p>

            <p className="views">👁 {product.product_views_count} views</p>

            <hr />

            <div
              className="desc"
              dangerouslySetInnerHTML={{ __html: product.product_description }}
            />
          </div>
        </div>
      </div>

      
    </>
  );
}
