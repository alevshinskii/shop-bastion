
import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import "../styles/home.css";
import {
    increaseItemQuantity,
    decreaseItemQuantity,
    addItem,
    removeItem,
    clearCart,
} from "../reducers/CartSlice";
import { ICartItem } from "../models/ICartItem";

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

    const itemImage = require("../content/item1.png");

    const { products } = useAppSelector((state) => state.productSlice);
    const { types } = useAppSelector((state) => state.productTypeSlice);
    const { cart } = useAppSelector((state) => state.cartSlice);
    const dispatch = useAppDispatch();

    let minPrice = 999999999,
        maxPrice = 0;
    products.forEach((p) => {
        if (p.price < minPrice) minPrice = p.price;
        if (p.price > maxPrice) maxPrice = p.price;
    });

    function isProductInCart(id: number) {
        return cart.items.find((i) => i.product.id === id) !== undefined;
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
                                {types.map((t) => (
                                    <div className="check" key={t.id}>
                                        <input
                                            type={"checkbox"}
                                            name={String(t.id)}
                                            placeholder={t.name}
                                        />
                                        <label>{t.name}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="filter-reset">
                            <button>Сбросить фильтры</button>
                        </div>
                    </div>
                    <div className="products">
                        <div className="gosts">
                            <div className="rect selected">ГОСТ 14911-82</div>
                            <div className="rect">ОСТ 36-146-88</div>
                            <div className="rect">НТС 65-06</div>
                        </div>
                        <div className="products-list">
                            {products.map((p) => (
                                <div className="product" key={p.id}>
                                    <div className="promos">
                                        {p.hit ? (
                                            <div className="hit">Хит</div>
                                        ) : (
                                            ""
                                        )}
                                        {p.promo ? (
                                            <div className="promo">Акция</div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="image">
                                        <img src={itemImage} alt="item" />
                                    </div>
                                    <div className="gost">
                                        <div className="gost-rect">
                                            <label>{p.gost}</label>
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
                                                    className="plus"
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
                                                        value={
                                                            cart.items.find(
                                                                (i) =>
                                                                    i.product
                                                                        .id ===
                                                                    p.id
                                                            )?.quantity
                                                        }
                                                    />
                                                </div>
                                                <div
                                                    className="minus"
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
                                                <button onClick={()=>dispatch(addItem({product:p,quantity:1} as ICartItem))}>
                                                    <img
                                                        src={addToCartImage}
                                                        alt=""
                                                    ></img>
                                                    В корзину
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="add">
                                                <Link to="cart">
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
                            ))}
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
        </div>
    );
}

export default Home;
