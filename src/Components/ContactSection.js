import React from "react";
import "./ContactSection.css";

export default function ContactSection() {
  return (
    <div className="contact-section" id="contact"> {/* <-- SCROLL ID ADDED */}
      <h2 className="contact-title">
        <span>CONTACT</span>
      </h2>

      <div className="contact-card">

        {/* INNER WRAPPER FOR SPACING */}
        <div className="contact-inner">

          {/* PHONE */}
          <div className="contact-item">
            <i className="fa fa-phone contact-icon"></i>
            <div>
              <p className="contact-label">Phone</p>
              <p className="contact-value">7735894267</p>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="contact-item">
            <i className="fa fa-map-marker contact-icon location"></i>
            <div>
              <p className="contact-label">Address</p>
              <p className="contact-value">Main Road</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
