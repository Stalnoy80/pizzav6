import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { cartItemSelectorById } from "../redux/Cart/selectors.ts";
import { CartItem } from "../redux/Cart/types";
import { addItems } from "../redux/Cart/slice.ts";

const pizzaTypes = ["традиционное", "тонкое"];
type PizzaBlockProps = {
  id: number;
  title: string;
  price: number;
  types: number[];
  imageUrl: string;
  sizes: number[];
  rating: number;
};
const Pizzablock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  types,
  imageUrl,
  sizes,
}) => {
  const [activeType, setActiveType] = useState(0);

  const [activeSize, setActiveSize] = useState(0);
  const dispatch = useDispatch();

  const cartItem = useSelector(cartItemSelectorById(id));

  const addedCount = cartItem ? cartItem.count : 0;
  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      type: pizzaTypes[activeType],
      size: sizes[activeSize],
      imageUrl,
      count: 0,
      item: [],
    };
    dispatch(addItems(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link key={id} to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId, index) => (
              <li
                onClick={() => setActiveType(index)}
                key={index}
                className={index === activeType ? "active" : ""}
              >
                {pizzaTypes[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((obj, i) => (
              <li
                onClick={() => setActiveSize(i)}
                key={i}
                className={i === activeSize ? "active" : ""}
              >
                {obj} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price}💲</div>
          <button
            className="button button--outline button--add"
            onClick={onClickAdd}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount ? <i>{addedCount}</i> : ""}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pizzablock;
