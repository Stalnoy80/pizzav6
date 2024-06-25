import React, { useEffect, useState } from "react";

import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import Pizzablock from "../components/Pizzablock";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import qs from "qs";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

const Home = () => {
  const { сategoryId, sort, currentPage } = useSelector(
    (state) => state.filterSlice
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const [activeSort, setActiveSort] = useState({
  //   name: "популярности",
  //   sortProperty: "rating",
  // });

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  // const category = сategoryId > 0 ? `category=${сategoryId}` : "";
  const sortBy = sort.sortProperty;
  // const order = ""; // под вопросом

  const pizzas = items
    // .filter((obj) =>
    //   obj.title.toLowerCase().includes(searchValue.toLowerCase())
    // ) //фильтрация статика
    .map((obj, i) => <Pizzablock {...obj} key={i} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      console.log(params);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `https://813cecfc1deed960.mokky.dev/items?page=${currentPage}&limit=4&title=*${searchValue}&${
          сategoryId > 0 ? `category=${сategoryId}` : ""
        }&sortBy=${sortBy}`
      )
      .then((res) => {
        setItems(res.data.items);
        setIsLoading(false);
      })
      .catch((err) => err.message);
    window.scrollTo(0, 0);
  }, [сategoryId, sort, searchValue, currentPage]);

  useEffect(() => {
    const queryString = qs.stringify({
      сategoryId,
      sort,

      currentPage,
    });
    navigate(`?${queryString}`);
  }, [сategoryId, sort, , currentPage]);

  return (
    <>
      <div className="content">
        <div className="content__top">
          <Categories
            value={сategoryId}
            onChangeCategory={(i) => dispatch(setCategoryId(i))}
          />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
        <Pagination onChangePage={onChangePage} currentPage={currentPage} />
      </div>
    </>
  );
};

export default Home;
