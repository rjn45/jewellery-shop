import React, { useEffect, useState } from "react";
import "./BlogsSection.css";

export default function BlogsSection() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(
      "https://myvillage.dev.birthplace.in/api/shops/shop_blogs/shop/rtk-gold-shop"
    )
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.results || []);
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  return (
    <div className="blogs-section" id="blogs">  
      {/* Title */}
      <h2 className="blogs-title">
        <span>BLOGS</span>
      </h2>

      {/* Blog Cards */}
      <div className="blogs-grid">
        {blogs.slice(0, 3).map((item) => (
          <div className="blog-card" key={item.id}>
            {/* Blog Image */}
            <div className="blog-img-wrapper">
              <img src={item.blog_image} alt={item.blog_title} />
            </div>

            {/* Blog Content */}
            <div className="blog-content">
              <h3 className="blog-title-text">{item.blog_title}</h3>

              <p
                className="blog-description"
                dangerouslySetInnerHTML={{ __html: item.blog_content }}
              ></p>

              {/* Footer */}
              <div className="blog-footer">
                <span className="views">
                  <i className="fa fa-eye"></i> {item.blog_views_count}
                </span>
                <span className="time">about 1 month ago</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
