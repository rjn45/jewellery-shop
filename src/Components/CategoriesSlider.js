import React, { useEffect, useState } from "react";
import "../App.css"; // we will add CSS here

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);

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
          <div key={cat.id} className="category-item">
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
