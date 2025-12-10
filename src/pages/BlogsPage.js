import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BlogsPage.css";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    fetch(
      `https://myvillage.dev.birthplace.in/api/shops/shop_blogs/shop/rtk-gold-shop/?page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.results || []);
        setNextPage(data.next);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  return (
    <section className="blogs-page">
      <h2 className="section-title">
        <span>All Blogs</span>
      </h2>

      {loading && <p className="loading-text">Loading blogs...</p>}

      <div className="blogs-grid">
        {blogs.map((item) => (
          <div
            className="blog-card"
            key={item.id}
            onClick={() => navigate(`/blogs/${item.slug}`)}
          >
            <div className="blog-img-wrapper">
              <img src={item.blog_image} alt={item.blog_title} />
            </div>

            <div className="blog-content">
              <h3>{item.blog_title}</h3>

              <p
                dangerouslySetInnerHTML={{
                  __html: item.blog_content.slice(0, 120) + "...",
                }}
              ></p>

              <div className="blog-footer">
                <span>👁 {item.blog_views_count}</span>
                <span>about 1 month ago</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ PERFECT PAGINATION */}
      <div className="pagination">
        {page > 1 && (
          <button onClick={() => setPage(page - 1)}>Prev</button>
        )}

        <button
          className={page === 1 ? "active" : ""}
          onClick={() => setPage(1)}
        >
          1
        </button>

        <button
          className={page === 2 ? "active" : ""}
          onClick={() => setPage(2)}
        >
          2
        </button>

        {nextPage && (
          <button onClick={() => setPage(page + 1)}>Next</button>
        )}
      </div>
    </section>
  );
}
