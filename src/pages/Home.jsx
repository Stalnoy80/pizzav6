import React, { useEffect, useRef, useState } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";

import { list } from "../components/Sort";
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
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPizzas = () => {
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
  };

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

  //Если был первый рендер , то проверяем URL-параметры и сохраняем в редукс

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortList = list.find(
        (obj) => obj.sortProperty === params.sort.sortProperty
      );

      dispatch(setFilters({ ...params, sortList }));
      isSearch.current = true;
    }
  }, []);

  // Если изменили параметры и уже был первый рендер,

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        сategoryId,
        sort,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [сategoryId, sort, currentPage]);

  // Если уже был первый рендер , запрашиваем пиццы

  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [сategoryId, sort, searchValue, currentPage]);

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
