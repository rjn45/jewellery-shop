import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Categories from "./Components/Categories";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetails from "./pages/ProductDetails";
import BlogDetails from "./pages/BlogDetails";
import BlogsPage from "./pages/BlogsPage";

// ✅ ADD THESE IMPORTS
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  return (
    <Router>
      <Routes>

        {/* ✅ HOME PAGE */}
        <Route path="/" element={<HomePage />} />

        {/* ✅ ALL CATEGORIES PAGE */}
        <Route
          path="/categories"
          element={
            <>
              <Navbar forceActive="Categories" />
              <div className="main-wrapper">
                <Categories />
              </div>
              <Footer />
            </>
          }
        />

        {/* ✅ CATEGORY PRODUCTS PAGE */}
        <Route
          path="/categories/:id"
          element={
            <>
              <Navbar forceActive="Categories" />
              <div className="main-wrapper">
                <CategoryProducts />
              </div>
              <Footer />
            </>
          }
        />

        {/* ✅ PRODUCT DETAILS PAGE */}
        <Route
          path="/products/:id"
          element={
            <>
              <Navbar />
              <div className="main-wrapper">
                <ProductDetails />
              </div>
              <Footer />
            </>
          }
        />

        {/* ✅ BLOG DETAILS PAGE */}
        <Route
          path="/blogs/:slug"
          element={
            <>
              <Navbar forceActive="Blogs" />
              <div className="main-wrapper">
                <BlogDetails />
              </div>
              <Footer />
            </>
          }
        />

        {/* ✅ ALL BLOGS PAGE */}
        <Route
          path="/blogs"
          element={
            <>
              <Navbar forceActive="Blogs" />
              <div className="main-wrapper">
                <BlogsPage />
              </div>
              <Footer />
            </>
          }
        />

      </Routes>
    </Router>
  );
}


export default App;
