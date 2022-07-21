import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import "../styles/cart.css";

function Cart() {
    const arrowImage = require("../images/arrow.svg").default;
    const itemImage = require("../content/item1.png");
    const trashImage = require("../images/trash.svg").default;
    const userImage = require("../images/user.svg").default;
    const phoneImage = require("../images/phone-order.svg").default;
    const emailImage = require("../images/email.svg").default;
    const orgImage = require("../images/org.svg").default;
    const cartImage = require("../images/cart-order.svg").default;
    const commercialImage = require("../images/commercial-order.svg").default;

    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");
    const [org, setOrg] = useState("");

    const { cart } = useAppSelector((state) => state.cartSlice);

    return (
        <div className="Products">
            <div className="container">
                <div className="path">
                    <label>Главная</label>
                    <img src={arrowImage} alt="" />
                    <label>
                        <Link to="/">Интернет-магазин</Link>
                    </label>
                    <img src={arrowImage} alt="" />
                    <label className="current">Корзина</label>
                </div>
                <div className="page-name">
                    <h2>Корзина</h2>
                </div>

                {cart.items.length > 0 ? (
                    <div className="page-content-cart">
                        <div className="items">
                            {cart.items.map((i) => (
                                <div className="item">
                                    <div className="item-img">
                                        <img src={itemImage} />
                                    </div>
                                    <div className="item-text">
                                        <div className="gost">
                                            <label>{i.product.gost}</label>
                                        </div>
                                        <div className="name">
                                            {i.product.name}
                                        </div>
                                        <div className="price">
                                            {i.product.price} руб.
                                        </div>
                                    </div>
                                    <div className="item-quantity">
                                        <div className="quantity">
                                            <div className="plus">+</div>
                                            <div className="input">
                                                <input value={i.quantity} />
                                            </div>
                                            <div className="minus">-</div>
                                        </div>
                                    </div>
                                    <div className="item-total">
                                        {i.product.price * i.quantity} руб.
                                    </div>
                                    <div className="item-delete">
                                        <img src={trashImage} alt="" />
                                    </div>
                                </div>
                            ))}

                            <div className="clear-cart">
                                <a>
                                    <img src={trashImage} alt="" /> Очистить
                                    корзину
                                </a>
                            </div>
                        </div>

                        <div className="order">
                            <div className="order-name">
                                <h3>Заказ</h3>
                            </div>
                            <div className="order-info">
                                <div className="head">
                                    Контактная информация
                                </div>
                                <div className="input-group">
                                    <img src={userImage} alt="" />
                                    <input placeholder="ФИО" />
                                </div>
                                <div className="input-group">
                                    <img src={phoneImage} alt="" />
                                    <input placeholder="Контактный телефон" />
                                </div>
                                <div className="input-group">
                                    <img src={emailImage} alt="" />
                                    <input placeholder="Email" />
                                </div>
                                <div className="input-group">
                                    <img src={orgImage} alt="" />
                                    <input placeholder="Организация / ИНН" />
                                </div>
                            </div>
                            <div className="order-total">
                                <div className="total">Итого</div>
                                <div className="price">
                                    {cart.items
                                        .reduce(
                                            (prev, cur) =>
                                                prev +
                                                cur.product.price *
                                                    cur.quantity,
                                            0
                                        )
                                        .toFixed(1)}{" "}
                                    руб.
                                </div>
                            </div>
                            <div className="order-buttons">
                                <div className="order-create">
                                    <button>
                                        <div className="img-box">
                                            <img src={cartImage} alt="" />
                                        </div>
                                        <div className="text-box">
                                            Оформить заказ
                                        </div>
                                    </button>
                                </div>
                                <div className="order-commercial">
                                    <button>
                                        <div className="img-box">
                                            <img src={commercialImage} alt="" />
                                        </div>
                                        <div className="text-box">
                                            Коммерческое предложение
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="empty-cart">
                        <h3>Корзина пуста.</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
