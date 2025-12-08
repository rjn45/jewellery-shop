import React from "react";
import Navbar from "../Components/Navbar";
import CategoriesSlider from "../Components/CategoriesSlider";
import HeroSlider from "../Components/HeroSlider";
import AboutSection from "../Components/AboutSection";
import Categories from "../Components/Categories";
import TrendingProducts from "../Components/TrendingProducts";
import BlogsSection from "../Components/BlogsSection";
import ContactSection from "../Components/ContactSection";
import Footer from "../Components/Footer";

export default function HomePage() {
    return (
        <div>
            <Navbar />

            <section id="home">
                <CategoriesSlider />
                <HeroSlider />
            </section>

            <section id="about">
                <AboutSection />
            </section>

            <section id="categories">
                <Categories />
            </section>

            <section id="trending">
                <TrendingProducts />
            </section>

            <section id="blogs">
                <BlogsSection />
            </section>

            <section id="contact">
                <ContactSection />
            </section>

            <Footer />
        </div>
    );
}
