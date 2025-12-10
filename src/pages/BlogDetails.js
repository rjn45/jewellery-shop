import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./BlogDetails.css";

export default function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(
      `https://myvillage.dev.birthplace.in/api/shops/shop_blogs/shop/rtk-gold-shop/${slug}`
    )
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.log("Error:", err));
  }, [slug]);

  if (!blog) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="blog-details-container">
        <div className="blog-details-img">
          <img src={blog.blog_image} alt={blog.blog_title} />
        </div>

        <div className="blog-details-info">
          <div className="blog-meta">
            <span>👁 {blog.blog_views_count} views</span>
            <span>📅 about 1 month ago</span>
          </div>

          <h1>{blog.blog_title}</h1>

          <div
            className="blog-full-content"
            dangerouslySetInnerHTML={{ __html: blog.blog_content }}
          ></div>
        </div>
      </div>

      
    </>
  );
}
