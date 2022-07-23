import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IProduct } from "../models/IProduct";
import { IProductType } from "../models/IProductType";
import { addProduct } from "../reducers/ProductSlice";
import { addGostFilter, updatePriceFilter } from "../reducers/FilterSlice";
import "../styles/add-product.css";

function Products() {
    const arrowImage = require("../images/arrow.svg").default;
    const arrowBackImage = require("../images/arrow-back.svg").default;

    const [nameString, setName] = useState("");
    const [type, setType] = useState(1);
    const [price, setPrice] = useState(1);
    const [gostString, setGost] = useState("");

    const { types } = useAppSelector((state) => state.productTypeSlice);
    const { products } = useAppSelector((state) => state.productSlice);
    const { filter } = useAppSelector((state) => state.filterSlice);

    const dispatch = useAppDispatch();

    const addProductBtnClick = () => {
        if (type && nameString && gostString) {
            const selectedType = types.find(
                (t) => t.id == type
            ) as IProductType;

            const hit =
                nameString
                    .toLowerCase()
                    .split("")
                    .find((l) => l == "о") != undefined;
            const promo =
                nameString
                    .toLowerCase()
                    .split("")
                    .find((l) => l == "а") != undefined;

            let gost = filter.gost.find(
                (g) => g.gost.name === gostString
            )?.gost;
            if (!gost) {
                gost = { id: filter.gost.length + 1, name: gostString };
                dispatch(addGostFilter({ gost, use: false }));
            }

            const product: IProduct = {
                id: products.length + 1,
                name: nameString,
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
            if (price > filter.price.max)
                dispatch(
                    updatePriceFilter({ min: filter.price.min, max: price })
                );
            if (price < filter.price.min)
                dispatch(
                    updatePriceFilter({ min: price, max: filter.price.max })
                );
        }
    };

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
                    <label className="current">Добавление продукта</label>
                </div>
                <div className="page-name">
                    <Link to="/shop-bastion/">
                        <img src={arrowBackImage} alt="" />
                    </Link>
                    <h2>Добавление продукта</h2>
                </div>
                <div className="page-content">
                    <div className="input-group">
                        <label>Название</label>
                        <input
                            value={nameString}
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
                            value={gostString}
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
