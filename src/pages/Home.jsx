import React, { useEffect, useState } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pizzablock from "../components/Pizzablock";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";
import { useContext } from "react";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";

import setCategoryId from "../redux/slices/filterSlice";

const Home = () => {
  const { searchValue } = useContext(SearchContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeSort, setActiveSort] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  const [currentPage, setCurrentPage] = useState(0);

  const сategoryId = useSelector((state) => state.filterSlice.value);

  const dispatch = useDispatch();

  // const category = сategoryId > 0 ? `category=${сategoryId}` : "";
  const sortBy = activeSort.sortProperty;
  // const order = ""; // под вопросом

  const pizzas = items
    // .filter((obj) =>
    //   obj.title.toLowerCase().includes(searchValue.toLowerCase())
    // ) //фильтрация статика
    .map((obj, i) => <Pizzablock {...obj} key={i} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://813cecfc1deed960.mokky.dev/items?page=${currentPage}&limit=4&title=*${searchValue}&${
        сategoryId > 0 ? `category=${сategoryId}` : ""
      }&sortBy=${sortBy}`
    )
      .then((res) => res.json())
      .then((items) => {
        setItems(items.items);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [сategoryId, activeSort, searchValue, currentPage]);

  return (
    <>
      <div className="content">
        <div className="content__top">
          <Categories
            value={сategoryId}
            onChangeCategory={(i) => dispatch(setCategoryId)}
          />
          <Sort value={activeSort} onClickListItem={(i) => setActiveSort(i)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
        <Pagination
          onChangePage={(currentPage) => setCurrentPage(currentPage)}
        />
      </div>
    </>
  );
};

export default Home;
