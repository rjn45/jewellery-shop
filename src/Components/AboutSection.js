import React from "react";
import "./AboutSection.css";

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      
      {/* Title */}
      <h2 className="about-title">
  <span>ABOUT</span>
</h2>


      {/* About Card */}
      <div className="about-card">
        <h3 className="about-heading">Hello! I'm Raja</h3>

        <p className="about-text">
          Welcome to <strong>RTK Gold Shop</strong>. For any inquiries or assistance, 
          feel free to reach out at <strong>1234569870</strong>.
        </p>
      </div>

    </section>
  );
}
