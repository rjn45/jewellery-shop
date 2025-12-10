import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();   // ✅ ADD THIS

  useEffect(() => {
    fetch("https://myvillage.dev.birthplace.in/api/shops/shops_categories/shop/rtk-gold-shop")
      .then(res => res.json())
      .then(data => {
        setCategories(data.results);
      });
  }, []);

  return (
    <div className="categories-section">
      <div className="categories-scroll">

        {categories.map(cat => (
          <div 
            key={cat.id} 
            className="category-item"
            onClick={() => navigate(`/categories/${cat.id}`)}   // ✅ CLICK NAVIGATION
          >
            <div className="category-image-wrapper">
              <img 
                src={cat.category_image}
                alt={cat.category_name}
                className="category-image"
              />
            </div>

            <p className="category-label">{cat.category_name}</p>
          </div>
        ))}

      </div>
    </div>
  );
}
