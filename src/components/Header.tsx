import React from "react";
import { useAppSelector } from "../hooks/redux";
import { Link } from "react-router-dom";

function Header() {
    const phoneImage = require("../images/phone.svg").default;
    const locationImage = require("../images/location.svg").default;
    const dropdownImage = require("../images/down.svg").default;
    const mailImage = require("../images/mail.svg").default;


    return (
        <div className="Header">
            <div className="nav">
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
                        <label>+7 (499) 380-78-90</label>
                    </div>
                    <div className="location">
                        <img
                            src={locationImage}
                            alt="location"
                            width={"15px"}
                            height={"15px"}
                        />
                        <label>Москва</label>
                        <img
                            src={dropdownImage}
                            alt="drop"
                            width={"8px"}
                            height={"8px"}
                        />
                    </div>
                    <div className="mail">
                    <img
                            src={mailImage}
                            alt="mail"
                            width={"15px"}
                            height={"15px"}
                        />
                        <label>info@bastion.pro</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
