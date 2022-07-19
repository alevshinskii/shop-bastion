import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductsTypes from "./pages/ProductsTypes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Cart from "./pages/Cart";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <div className="root">
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="products" element={<Products />} />
                <Route path="products_types" element={<ProductsTypes />} />
                <Route path="cart" element={<Cart />} />
            </Routes>
            <Footer />
        </Router>
    </div>
);
