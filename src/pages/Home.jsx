import React, { useEffect, useState } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pizzablock from "../components/Pizzablock";
import Skeleton from "../components/Skeleton";

const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [сategoryId, setCategoryId] = useState(0);

  const [selected, setSelected] = useState(false);
  const [activeSort, setActiveSort] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  const category = сategoryId > 0 ? `category=${сategoryId}` : "";
  const sortBy = activeSort.sortProperty;
  const order = ""; // под вопросом

  console.log(searchValue);

  useEffect(() => {
    setIsLoading(true);

    fetch(`https://813cecfc1deed960.mokky.dev/items?title=*${searchValue}`)
      .then((res) => res.json())
      .then((items) => {
        setItems(items);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [сategoryId, activeSort]);

  return (
    <>
      <div className="content">
        <div className="content__top">
          <Categories
            value={сategoryId}
            onChangeCategory={(i) => setCategoryId(i)}
          />
          <Sort value={activeSort} onClickListItem={(i) => setActiveSort(i)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
            : items.map((obj, i) => <Pizzablock {...obj} key={i} />)}
        </div>{" "}
      </div>
    </>
  );
};

export default Home;
