import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IProduct } from "../models/IProduct";
import { IProductType } from "../models/IProductType";
import {addProduct} from "../reducers/ProductSlice";
import "../styles/add-product.css";

function Products() {
    const arrowImage = require("../images/arrow.svg").default;
    const arrowBackImage = require("../images/arrow-back.svg").default;

    const [name, setName] = useState("");
    const [type, setType] = useState(1);
    const [price, setPrice] = useState(1);
    const [gost, setGost] = useState("");

    const { types } = useAppSelector((state) => state.productTypeSlice);
    const { products } = useAppSelector((state) => state.productSlice);

    const dispatch = useAppDispatch();

    const addProductBtnClick = () => {
        if (type && name && gost) {
            const selectedType = types.find(
                (t) => t.id == type
            ) as IProductType;

            const hit =
                name
                    .toLowerCase()
                    .split("")
                    .find((l) => l == "a") != undefined;
            const promo =
                name
                    .toLowerCase()
                    .split("")
                    .find((l) => l == "о") != undefined;

            const product: IProduct = {
                id: products.length,
                name,
                type: selectedType,
                price,
                gost,
                hit: hit,
                promo: promo,
                image: "",
            };
            setName("");
            setPrice(1);
            setGost("");
            dispatch(addProduct(product));
        }
    };

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
                    <label className="current">Добавление продукта</label>
                </div>
                <div className="page-name">
                    <Link to="/">
                        <img src={arrowBackImage} alt="" />
                    </Link>
                    <h2>Добавление продукта</h2>
                </div>
                <div className="page-content">
                    <div className="input-group">
                        <label>Название</label>
                        <input
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        ></input>
                    </div>
                    <div className="input-group">
                        <label>Тип</label>
                        <select
                            onChange={(
                                e: React.ChangeEvent<HTMLSelectElement>
                            ) => {
                                setType(Number(e.target.selectedIndex));
                            }}
                        >
                            <option disabled selected id={"0"}>
                                Выберите тип
                            </option>
                            {types.map((t) => (
                                <option id={String(t.id)}>{t.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Цена</label>
                        <input
                            type={"number"}
                            min={1}
                            max={9999999999999999}
                            value={price}
                            onChange={(e) => {
                                setPrice(Number(e.target.value));
                            }}
                        ></input>
                    </div>
                    <div className="input-group">
                        <label>ГОСТ</label>
                        <input
                            value={gost}
                            onChange={(e) => {
                                setGost(e.target.value);
                            }}
                        ></input>
                    </div>
                    <div className="add-btn">
                        <button onClick={addProductBtnClick}>Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;
