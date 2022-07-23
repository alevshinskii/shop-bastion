import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import "../styles/home.css";
import {
    increaseItemQuantity,
    decreaseItemQuantity,
    addItem,
} from "../reducers/CartSlice";
import { ICartItem } from "../models/ICartItem";
import { IProduct } from "../models/IProduct";
import {
    toggleGostFilter,
    toggleTypeFilter,
    updatePriceFilter,
    resetFilters,
} from "../reducers/FilterSlice";
import { ITypeFilter } from "../models/ITypeFilter";
import { IGostFilter } from "../models/IGostFilter";
import { useState } from "react";

function Home() {
    const arrowImage = require("../images/arrow.svg").default;
    const arrowBackImage = require("../images/arrow-back.svg").default;
    const sortImage = require("../images/sort.svg").default;
    const showImage = require("../images/show.svg").default;
    const filterImage = require("../images/filter.svg").default;
    const addToCartImage = require("../images/add-to-cart.svg").default;
    const sliderMarksImage = require("../images/slider-marks.svg").default;
    const arrowPagesImage = require("../images/arrow-pages.svg").default;
    const arrowHideImage = require("../images/arrow-hide.svg").default;
    const exitImage = require("../images/exit.svg").default;

    const cartImage = require("../images/cart-order.svg").default;
    const commercialImage = require("../images/commercial-order.svg").default;

    const itemImage = require("../content/item1.png");

    const { products } = useAppSelector((state) => state.productSlice);
    const { types } = useAppSelector((state) => state.productTypeSlice);
    const { cart } = useAppSelector((state) => state.cartSlice);
    const { filter } = useAppSelector((state) => state.filterSlice);
    const dispatch = useAppDispatch();

    const [isFirstTimeClickBuyBtn, setFirstTimeClickButBtn] = useState(true);

    let minPrice = Number.MAX_VALUE,
        maxPrice = 0;
    products.forEach((p) => {
        if (p.price < minPrice) minPrice = p.price;
        if (p.price > maxPrice) maxPrice = p.price;
    });

    function isProductInCart(id: number) {
        return cart.items.find((i) => i.product.id === id) !== undefined;
    }

    function getFilteredProducts(products: IProduct[]) {
        let isAllTypeFiltersDisabled = true;
        for (let i = 0; i < filter.type.length; i++) {
            if (filter.type[i].use) {
                isAllTypeFiltersDisabled = false;
                break;
            }
        }
        let isAllGostFiltersDisabled = true;
        for (let i = 0; i < filter.gost.length; i++) {
            if (filter.gost[i].use) {
                isAllGostFiltersDisabled = false;
                break;
            }
        }

        let filtered = products
            .filter(
                (p) =>
                    p.price >= filter.price.min && p.price <= filter.price.max
            )
            .filter(
                (p) =>
                    isAllTypeFiltersDisabled ||
                    filter.type.find((t) => t.type.id === p.type.id)?.use
            )
            .filter(
                (p) =>
                    isAllGostFiltersDisabled ||
                    filter.gost.find((g) => g.gost.id === p.gost.id)?.use
            );

        return filtered;
    }

    function resetAllFilters() {
        let clearedPriceFilter = { min: minPrice, max: maxPrice };
        let clearedTypeFilters: ITypeFilter[] = [];
        filter.type.map((t) =>
            clearedTypeFilters.push({ type: t.type, use: false })
        );
        let clearedGostFilters: IGostFilter[] = [];
        filter.gost.map((g) =>
            clearedGostFilters.push({ gost: g.gost, use: false })
        );

        dispatch(
            resetFilters({
                price: clearedPriceFilter,
                type: clearedTypeFilters,
                gost: clearedGostFilters,
            })
        );
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

    return (
        <div className="Home">
            <div className="container">
                <div className="path">
                    <label>Главная</label>
                    <img src={arrowImage} alt="" />
                    <label className="current">Интернет-магазин</label>
                </div>
                <div className="page-header">
                    <div className="left">
                        <img src={arrowBackImage} alt="" />
                        <h2>Интернет-магазин</h2>
                    </div>
                    <div className="right">
                        <div className="sort">
                            <label>Сначала популярные</label>
                            <img src={sortImage} alt="" />
                        </div>
                        <div className="show">
                            <img src={showImage} alt="" />
                        </div>
                    </div>
                </div>
                <div className="page-content">
                    <div className="filters">
                        <div className="head">
                            <img src={filterImage} alt="" />
                            <h3>Фильтры</h3>
                        </div>
                        <div className="filter-price">
                            <div className="filter-price-name">Цена, руб.</div>
                            <div className="slider-block">
                                <Slider min={minPrice} max={maxPrice} />
                                <img src={sliderMarksImage} alt="" />
                            </div>
                        </div>
                        <div className="filter-type">
                            <div className="filter-type-name">Тип продукта</div>
                            <div className="inputs">
                                {filter.type.map((t) => (
                                    <div
                                        className="check"
                                        key={t.type.id}
                                        onClick={() =>
                                            dispatch(
                                                toggleTypeFilter(t.type.id)
                                            )
                                        }
                                    >
                                        <input
                                            type={"checkbox"}
                                            name={String(t.type.id)}
                                            placeholder={t.type.name}
                                            checked={t.use}
                                        />
                                        <span className="checkmark"></span>
                                        <label>{t.type.name}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="filter-reset">
                            <button onClick={() => resetAllFilters()}>
                                Сбросить фильтры
                            </button>
                        </div>
                    </div>
                    <div className="products">
                        <div className="gosts">
                            {filter.gost.map((g) => (
                                <div
                                    className={
                                        g.use
                                            ? "rect selected unselectable"
                                            : "rect unselectable"
                                    }
                                    key={g.gost.id}
                                    onClick={() =>
                                        dispatch(toggleGostFilter(g.gost.id))
                                    }
                                >
                                    {g.gost.name}
                                </div>
                            ))}
                        </div>

                        <div className="products-list">
                            {getFilteredProducts(products).length > 0 ? (
                                getFilteredProducts(products).map((p) => (
                                    <div className="product" key={p.id}>
                                        <div className="promos">
                                            {p.hit ? (
                                                <div className="hit">Хит</div>
                                            ) : (
                                                ""
                                            )}
                                            {p.promo ? (
                                                <div className="promo">
                                                    Акция
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="image">
                                            <img src={itemImage} alt="item" />
                                        </div>
                                        <div className="gost">
                                            <div className="gost-rect">
                                                <label>{p.gost.name}</label>
                                            </div>
                                        </div>
                                        <div className="name">{p.name}</div>
                                        <div className="price">
                                            <div className="price-amount">
                                                {p.price} руб.
                                            </div>

                                            {isProductInCart(p.id) ? (
                                                <div className="quantity">
                                                    <div
                                                        className="plus unselectable"
                                                        onClick={() =>
                                                            dispatch(
                                                                increaseItemQuantity(
                                                                    p.id
                                                                )
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </div>
                                                    <div className="input">
                                                        <input
                                                            type={"number"}
                                                            value={
                                                                cart.items.find(
                                                                    (i) =>
                                                                        i
                                                                            .product
                                                                            .id ===
                                                                        p.id
                                                                )?.quantity
                                                            }
                                                            min={1}
                                                            max={100}
                                                        />
                                                    </div>
                                                    <div
                                                        className="minus unselectable"
                                                        onClick={() =>
                                                            dispatch(
                                                                decreaseItemQuantity(
                                                                    p.id
                                                                )
                                                            )
                                                        }
                                                    >
                                                        -
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="quantity"></div>
                                            )}
                                        </div>
                                        <div className="buy-menu">
                                            {!isProductInCart(p.id) ? (
                                                <div className="add">
                                                    <button
                                                        onClick={() => {
                                                            if (
                                                                isFirstTimeClickBuyBtn
                                                            ) {
                                                                setFirstTimeClickButBtn(
                                                                    false
                                                                );
                                                                const msg: HTMLDivElement | null =
                                                                    document.querySelector(
                                                                        ".fullscreen-msg"
                                                                    );
                                                                openFullscreenMsg(
                                                                    msg
                                                                );
                                                            }
                                                            dispatch(
                                                                addItem({
                                                                    product: p,
                                                                    quantity: 1,
                                                                } as ICartItem)
                                                            );
                                                        }}
                                                    >
                                                        <img
                                                            src={addToCartImage}
                                                            alt=""
                                                        ></img>
                                                        В корзину
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="add">
                                                    <Link to="/shop-bastion/cart">
                                                        <button>
                                                            Перейти в корзину
                                                        </button>
                                                    </Link>
                                                </div>
                                            )}

                                            <div className="desc">
                                                <button>Подробнее</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <h3>
                                    Ничего не найдено. Попробуйте{" "}
                                    <label onClick={() => resetAllFilters()}>
                                        сбросить фильтры
                                    </label>
                                </h3>
                            )}
                        </div>
                    </div>
                </div>
                <div className="nav-through-items">
                    <div className="items-on-page">
                        <label>Выводить по</label>
                        <div className="items-on-page-option active">9</div>
                        <div className="items-on-page-option">15</div>
                        <div className="items-on-page-option">21</div>
                    </div>
                    <div className="pages">
                        <div className="arrow arrow-left">
                            <img src={arrowPagesImage} alt="" />
                        </div>
                        <div className="page current-page">1</div>
                        <div className="page">2</div>
                        <div className="page">3</div>
                        <div className="page">4</div>
                        <div className="page">5</div>
                        <div className="arrow arrow-right">
                            <img
                                src={arrowPagesImage}
                                alt=""
                                style={{ transform: "rotate(180deg)" }}
                            />
                        </div>
                    </div>
                    <div className="show-all">
                        <a>Показать все товары</a>
                    </div>
                </div>
                <div className="about">
                    <h2>
                        Опоры трубопроводов от Бастион Груп - производитель
                        металлических изделий №1
                    </h2>
                    <p>
                        Надежность работы трубопровода в значительной мере
                        зависит от правильности и прочности его крепления.
                        Основные средства крепления трубопроводов — это опора,
                        подвеска, кронштейны, скобы и другие части опорных
                        конструкций. Мы изготавливаем типовые опоры
                        трубопроводов по нижеперечисленным существующим
                        нормативным документам, а также изготовим любые
                        нестандартные опоры трубопроводов по чертежам заказчика.
                    </p>
                    <p>
                        Жесткие и пружинные подвески рассчитаны на вертикальную
                        нагрузку горизонтальных и вертикальных участков
                        трубопровода. Основным материалом деталей является сталь
                        17гс-12, 17г1с-12, 14г2-12, 09г2с-14, 20, 20к и пр.
                    </p>
                    <p>
                        Марка стали выбирается исходя от параметров окружающей
                        среды, опоры могут использоваться при температуре от
                        -60°C. Конструкции опор, представленные на сайте,
                        отличаются между собой методом крепления с трубопроводом
                        и несущей способностью.
                    </p>
                    <p>
                        Подвески являются сборными устройствами, соединяются при
                        помощи сварки. Сварные швы отвечают требованиям СНиП
                        III-18-75, СНиП II-23-81. Резьбовые части опор
                        обрабатываются антикоррозионной смазкой ПВК по ГОСТ
                        19537-83 или ее аналогом.
                    </p>
                    <a>
                        Скрыть описание <img src={arrowHideImage} alt=""></img>
                    </a>
                </div>
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
                            Товар добавлен в корзину
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
                        <div className="msg-content-left">
                            <div className="msg-img">
                                <img src={itemImage} alt="item" />
                            </div>
                        </div>
                        <div className="msg-content-right">
                            <div className="msg-content-text">
                                <div className="msg-content-gost">
                                    <div className="gost-rect">
                                        {cart.items[0]?.product.gost.name}
                                    </div>
                                </div>
                                <div className="msg-content-main">
                                    <div className="msg-content-name">
                                        {cart.items[0]?.product.name}
                                    </div>
                                    <div className="msg-content-price">
                                        {cart.items[0]?.product.price} руб.
                                    </div>
                                </div>
                            </div>
                            <div className="msg-content-actions">
                                <div className="order-create">
                                    <Link to="/shop-bastion/cart">
                                        <button>
                                            <div className="text-box">
                                                Оформить заказ
                                            </div>
                                        </button>
                                    </Link>
                                </div>
                                <div className="order-commercial">
                                    <button>
                                        <div className="text-box">
                                            Коммерческое предложение
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

export default Home;
