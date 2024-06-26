import React from "react";
import emptyCart from "../assets/img/empty-cart.png";
import { Link } from "react-router-dom";
import Header from "./Header";
const CartEmpty = () => {
  return (
    <div className="wrapper">
      <Header />
      <div class="content">
        <div className="container">
          <div class="cart cart--empty">
            <h2>
              Корзина пустая <span>😕</span>
            </h2>
            <p>
              Вероятней всего, вы не заказывали ещё пиццу.
              <br />
              Для того, чтобы заказать пиццу, перейди на главную страницу.
            </p>
            <img src={emptyCart} alt="Empty cart" />
            <Link to="/" class="button button--black">
              <span>Вернуться назад</span>
            </Link>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default CartEmpty;
