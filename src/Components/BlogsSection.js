import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BlogsSection.css";

export default function BlogsSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://myvillage.dev.birthplace.in/api/shops/shop_blogs/shop/rtk-gold-shop/"
    )
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data?.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="blogs-section" id="blogs">
      <h2 className="blogs-title">
        <span>BLOGS</span>
      </h2>

      {/* ✅ LOADER */}
      {loading && <p className="loading-text">Loading blogs...</p>}

      <div className="blogs-grid">
        {!loading && blogs.slice(0, 3).map((item) => (
          <div
            className="blog-card"
            key={item.id}
            onClick={() => navigate(`/blogs/${item.slug}`)}
          >
            <div className="blog-img-wrapper">
              <img src={item.blog_image} alt={item.blog_title} />
            </div>

            <div className="blog-content">
              <h3 className="blog-title-text">{item.blog_title}</h3>

              <p
                className="blog-description"
                dangerouslySetInnerHTML={{
                  __html: item.blog_content?.slice(0, 120) + "..."
                }}
              ></p>

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

      {/* ✅ VIEW ALL BLOGS BUTTON */}
      {!loading && blogs.length > 3 && (
        <div className="view-all-wrapper">
          <button
            className="view-all-btn"
            onClick={() => navigate("/blogs")}
          >
            View All Blogs
          </button>
        </div>
      )}
    </div>
  );
}
