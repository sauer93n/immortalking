import React from 'react';
import logo from "../../img/imortal_king_logo.svg";
import './Header.css';

function Header() {
    return (
        <header className="header sticky">
            <nav className="navigation-bar">
                <div className="navigation-bar__wrapper">
                    <div className="navigation-bar__item">Галерея</div>
                    <div className="navigation-bar__item">Доставка</div>

                        <div className="navigation-bar__item logo">
                            <a href="/">
                                <img src={logo} alt="logo"/>
                            </a>
                        </div>


                    <div className="navigation-bar__item">Контакты</div>
                    <div className="navigation-bar__item">Войти</div>
                </div>
            </nav>
        </header>
    )
}

export default Header;