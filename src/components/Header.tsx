import React from "react";
import { useAppSelector } from "../hooks/redux";
import { Link } from "react-router-dom";
import "../styles/header.css";

function Header() {
    const phoneImage = require("../images/phone.svg").default;
    const locationImage = require("../images/location.svg").default;
    const dropdownImage = require("../images/down.svg").default;
    const mailImage = require("../images/mail.svg").default;

    const logoImage = require("../images/logo.svg").default;
    const catalogImage = require("../images/catalog.svg").default;

    const searchImage = require("../images/search.svg").default;
    const enterImage = require("../images/enter.svg").default;

    const cartImage = require("../images/cart.svg").default;
    const favouriteImage = require("../images/favourite.svg").default;

    return (
        <div className="Header">
            <div className="nav">
                <div className="container">
                    <div className="nav-left">
                        <Link to="/products">Продукты</Link>
                        <Link to="/products_types">Типы продуктов</Link>
                    </div>
                    <div className="nav-right">
                        <div className="phone">
                            <img
                                src={phoneImage}
                                alt="phone"
                                width={"15px"}
                                height={"15px"}
                            />
                            <div>
                                <label>+7 (499) 380-78-90</label>
                            </div>
                        </div>
                        <div className="location">
                            <img
                                src={locationImage}
                                alt="location"
                                width={"15px"}
                                height={"15px"}
                            />
                            <div>
                                <label>Москва</label>
                            </div>
                            <div className="drop">
                                <img
                                    src={dropdownImage}
                                    alt="drop"
                                    width={"8px"}
                                    height={"8px"}
                                />
                            </div>
                        </div>
                        <div className="mail">
                            <img
                                src={mailImage}
                                alt="mail"
                                width={"15px"}
                                height={"15px"}
                            />
                            <div>
                                <label>info@bastion.pro</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-nav">
                <div className="container">
                    <div className="left">
                        <div className="brand">
                            <img src={logoImage} alt="logo" />
                            <h1>Производитель металлических изделий №1</h1>
                        </div>
                        <div className="catalog">
                            <div className="rect">
                                <img src={catalogImage} alt="catalog" />
                                <h2>Каталог</h2>
                            </div>
                        </div>
                        <div className="search">
                            <div className="search-icon">
                                <img src={searchImage} alt="search" />
                            </div>
                            <div className="search-input">
                                <input placeholder="Поиск по названию..."></input>
                            </div>
                            <div className="search-enter">
                                <img src={enterImage} alt="search" />
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="favourite">
                            <img src={favouriteImage}/>
                            <h3>Избранное</h3>
                        </div>
                        <div className="cart">
                            <img src={cartImage}></img>
                            <h3>Корзина</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
