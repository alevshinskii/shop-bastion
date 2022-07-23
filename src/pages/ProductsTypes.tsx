import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { IProductType } from "../models/IProductType";
import { addTypeFilter } from "../reducers/FilterSlice";
import { addType } from "../reducers/ProductTypeSlice";
import "../styles/add-product-type.css";

function ProductsTypes() {
    const arrowImage = require("../images/arrow.svg").default;
    const arrowBackImage = require("../images/arrow-back.svg").default;

    const [name, setName] = useState("");

    const { types } = useAppSelector((state) => state.productTypeSlice);
    const dispatch = useAppDispatch();

    const addProductType = () => {
        const productType: IProductType = {
            id: types.length + 1,
            name,
        };
        setName("");
        dispatch(addType(productType));
        dispatch(addTypeFilter({ type: productType, use: false }));
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
                    <label className="current">Добавление типа продукта</label>
                </div>
                <div className="page-name">
                    <Link to="/shop-bastion/">
                        <img src={arrowBackImage} alt="" />
                    </Link>
                    <h2>Добавление типа продукта</h2>
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

                    <div className="add-btn">
                        <button onClick={addProductType}>Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductsTypes;
