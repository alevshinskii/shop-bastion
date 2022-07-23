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
import { Provider } from "react-redux";
import { setupStore } from "./store/store";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const store = setupStore();

root.render(
    <div className="root">
        <Provider store={store}>
            <Router>
                <Header />
                <Routes>
                    <Route path="/shop-bastion/" element={<Home />} />
                    <Route path="/shop-bastion/products" element={<Products />} />
                    <Route path="/shop-bastion/products_types" element={<ProductsTypes />} />
                    <Route path="/shop-bastion/cart" element={<Cart />} />
                </Routes>
                <Footer />
            </Router>
        </Provider>
    </div>
);
