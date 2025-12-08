import React, { useEffect, useState } from "react";
import "./HeroSlider.css";

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("https://myvillage.dev.birthplace.in/api/shops/shop_names/rtk-gold-shop")
      .then((res) => res.json())
      .then((data) => {
        if (data.carousals) {
          const images = data.carousals.map((item) => item.heading_photo);
          setSlides(images);
        }
      })
      .catch((err) => console.error("Slider Error:", err));
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides]);

  if (slides.length === 0) return null;

  return (
    <section id="home" className="home-section">
      <div className="hero-slider-container">
        <div className="hero-slider">
          {slides.map((img, index) => (
            <div
              key={index}
              className={`slide ${index === current ? "active" : ""}`}
            >
              <img src={img} alt={`slide-${index}`} />
            </div>
          ))}
        </div>

        <div className="dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === current ? "active" : ""}`}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
