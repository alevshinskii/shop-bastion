import React from "react";
import { useAppSelector } from "../hooks/redux";
import "../styles/footer.css"

function Footer() {

    const contactImage=require("../images/contact.png");
    const footerImage=require("../images/footer.png");

    return (
        <div className="Footer">
            <div className="container">
                <div className="contact">
                    <img src={contactImage} alt="Contact"></img>
                </div>
                <div className="footer">
                    <img src={footerImage} alt="Footer"></img>
                </div>
            </div>
            
        </div>
    );
}

export default Footer;