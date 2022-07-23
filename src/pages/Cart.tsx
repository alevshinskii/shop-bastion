import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IOrder } from "../models/IOrder";
import {
    increaseItemQuantity,
    decreaseItemQuantity,
    addItem,
    removeItem,
    clearCart,
} from "../reducers/CartSlice";
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
    const dispatch = useAppDispatch();

    function validatePhoneString(phone: String) {
        let count = 0;
        phone.split("").forEach((l) => {
            if (l <= "9" && l >= "0") {
                count++;
            }
        });
        if (count == 10 || count == 11) {
            return true;
        }
        return false;
    }
    function validateEmail(email: string) {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g;
        return regex.test(email);
    }

    function showInvalidField(element: HTMLDivElement) {

        console.log(element)
        element.classList.add("warning");
        element.focus();
        setTimeout(function () {
            element.classList.remove("warning");
        }, 2000);
    }

    function validateOrder(order: IOrder) {
        if (!order.org) {
            const orgInput: HTMLDivElement | null =
                document.querySelector(".input-org");
            if (orgInput) {
                showInvalidField(orgInput);
            }
            return false;
        }

        if (!validateEmail(order.email)) {
            const emailInput: HTMLDivElement | null =
                document.querySelector(".input-email");
            if (emailInput) {
                showInvalidField(emailInput);
            }
            return false;
        }
        if (!validatePhoneString(order.tel)) {
            const phoneInput: HTMLDivElement | null =
                document.querySelector(".input-phone");
            if (phoneInput) {
                showInvalidField(phoneInput);
            }
            return false;
        }
        if (!order.name) {
            const nameInput: HTMLDivElement | null =
                document.querySelector(".input-name");
            if (nameInput) {
                showInvalidField(nameInput);
            }
            return false;
        }
        return true;
    }
    function createOrder(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        const total = +cart.items
            .reduce((prev, cur) => prev + cur.product.price * cur.quantity, 0)
            .toFixed(1);

        const order: IOrder = {
            id: Date.now(),
            name,
            tel,
            email,
            org: org,
            cart,
            total,
        };

        if (validateOrder(order)) {
            openFullscreenMsg(document.querySelector(".fullscreen-msg"));
            console.log(order);
        }
    }

    function openFullscreenMsg(msg: HTMLDivElement | null) {
        if (msg) {
            msg.classList.add("displayed");
        }
    }
    function closeFullscreenMsg(msg: HTMLDivElement | null) {
        if (msg) {
            msg.classList.remove("displayed");
        }
    }
    const exitImage = require("../images/exit.svg").default;

    return (
        <div className="Products">
            <div className="container">
                <div className="path">
                    <label>Главная</label>
                    <img src={arrowImage} alt="" />
                    <label>
                        <Link to="/shop-bastion/">Интернет-магазин</Link>
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
                                            <label>{i.product.gost.name}</label>
                                        </div>
                                        <div className="name">
                                            {i.product.name}
                                        </div>
                                        <div className="price">
                                            {i.product.price.toFixed(1)} руб.
                                        </div>
                                    </div>
                                    <div className="item-quantity">
                                        <div className="quantity">
                                            <div
                                                className="plus unselectable"
                                                onClick={() =>
                                                    dispatch(
                                                        increaseItemQuantity(
                                                            i.product.id
                                                        )
                                                    )
                                                }
                                            >
                                                +
                                            </div>
                                            <div className="input">
                                                <input value={i.quantity} />
                                            </div>
                                            <div
                                                className="minus unselectable"
                                                onClick={() =>
                                                    dispatch(
                                                        decreaseItemQuantity(
                                                            i.product.id
                                                        )
                                                    )
                                                }
                                            >
                                                -
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-total">
                                        {(i.product.price * i.quantity).toFixed(
                                            1
                                        )}{" "}
                                        руб.
                                    </div>
                                    <div
                                        className="item-delete"
                                        onClick={() =>
                                            dispatch(removeItem(i.product.id))
                                        }
                                    >
                                        <img src={trashImage} alt="" />
                                    </div>
                                </div>
                            ))}

                            <div
                                className="clear-cart"
                                onClick={() => dispatch(clearCart())}
                            >
                                <a>
                                    <img src={trashImage} alt="" /> Очистить
                                    корзину
                                </a>
                            </div>
                        </div>

                        <div className="order">
                            <form>
                                <div className="order-name">
                                    <h3>Заказ</h3>
                                </div>
                                <div className="order-info">
                                    <div className="head">
                                        Контактная информация
                                    </div>
                                    <div className="input-group input-name">
                                        <img src={userImage} alt="" />
                                        <input
                                            placeholder="ФИО"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="input-group input-phone">
                                        <img src={phoneImage} alt="" />
                                        <input
                                            placeholder="Контактный телефон"
                                            value={tel}
                                            onChange={(e) =>
                                                setTel(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="input-group input-email">
                                        <img src={emailImage} alt="" />
                                        <input
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="input-group input-org">
                                        <img src={orgImage} alt="" />
                                        <input
                                            placeholder="Организация / ИНН"
                                            value={org}
                                            onChange={(e) =>
                                                setOrg(e.target.value)
                                            }
                                        />
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
                                        <button onClick={(e) => createOrder(e)}>
                                            <div className="img-box">
                                                <img src={cartImage} alt="" />
                                            </div>
                                            <div className="text-box">
                                                Оформить заказ
                                            </div>
                                        </button>
                                    </div>
                                    <div className="order-commercial">
                                        <button onClick={() => {}}>
                                            <div className="img-box">
                                                <img
                                                    src={commercialImage}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="text-box">
                                                Коммерческое предложение
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="empty-cart">
                        <h3>
                            Корзина пуста. Добавьте что-нибудь из{" "}
                            <Link to="/shop-bastion/">каталога</Link>
                        </h3>
                    </div>
                )}
            </div>
            <div
                className="fullscreen-msg"
                onClick={() =>
                    closeFullscreenMsg(
                        document.querySelector(".fullscreen-msg")
                    )
                }
            >
                <div className="msg" onClick={(e) => e.stopPropagation()}>
                    <div className="msg-title">
                        <div className="msg-title-text">
                            Спасибо за ваш заказ
                        </div>
                        <div
                            className="msg-title-exit"
                            onClick={() =>
                                closeFullscreenMsg(
                                    document.querySelector(".fullscreen-msg")
                                )
                            }
                        >
                            <img src={exitImage} alt="" />
                        </div>
                    </div>
                    <div className="msg-content">
                        <div className="msg-content-right">
                            <div className="msg-content-text">
                                <div className="msg-content-main">
                                    <div className="msg-content-name">
                                        В ближайшее время менеджеры свяжутся с
                                        вами для уточнения деталей
                                    </div>
                                </div>
                            </div>
                            <div className="msg-content-actions">
                                <div className="order-create">
                                    <Link to="/shop-bastion/">
                                        <button>
                                            <div className="text-box">
                                                Продолжить покупки
                                            </div>
                                        </button>
                                    </Link>
                                </div>
                                <div className="order-commercial">
                                    <button>
                                        <div className="text-box">
                                            Добавить сайт в избранное
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
