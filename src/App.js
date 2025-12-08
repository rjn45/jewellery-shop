import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Categories from "./Components/Categories";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetails from "./pages/ProductDetails";
import BlogDetails from "./pages/BlogDetails";   // ✅ ADD THIS

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<CategoryProducts />} />

        {/* ✅ PRODUCT DETAILS PAGE */}
        <Route path="/products/:id" element={<ProductDetails />} />

        {/* ✅ BLOG DETAILS PAGE */}
        <Route path="/blogs/:slug" element={<BlogDetails />} />

      </Routes>
    </Router>
  );
}

export default App;
