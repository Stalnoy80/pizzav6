import React, { useEffect, useRef } from "react";

import Categories from "../components/Categories.tsx";
import Sort from "../components/Sort.tsx";

import { list } from "../components/Sort.tsx";
import Skeleton from "../components/Skeleton.tsx";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import qs from "qs";

import {
  filterSelector,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice.tsx";
import {
  SearchPizzaParams,
  fetchPizzas,
  pizzaSelector,
} from "../redux/slices/pizzasSlice.tsx";
import Pagination from "../components/Pagination/index.tsx";
import Pizzablock from "../components/Pizzablock.tsx";
import { useAppDispatch } from "../redux/store.tsx";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector(pizzaSelector);

  const { сategoryId, sort, currentPage, searchValue } =
    useSelector(filterSelector);

  const searchParams = useSearchParams();

  const getPizzas = async () => {
    dispatch(
      fetchPizzas({
        сategoryId,
        sortBy,
        searchValue,
        currentPage,
      })
    );
    window.scrollTo(0, 0);
  };

  // const [activeSort, setActiveSort] = useState({
  //   name: "популярности",
  //   sortProperty: "rating",
  // });

  const onChangePage = (index: number) => {
    dispatch(setCurrentPage(index));
  };

  // const category = сategoryId > 0 ? `category=${сategoryId}` : "";
  const sortBy = sort.sortProperty;
  // const order = ""; // под вопросом

  const pizzas = items
    // .filter((obj) =>
    //   obj.title.toLowerCase().includes(searchValue.toLowerCase())
    // ) //фильтрация статика
    .map((obj: any, i: number) => <Pizzablock {...obj} key={i} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  //Если был первый рендер , то проверяем URL-параметры и сохраняем в редукс

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(
  //       window.location.search.substring(1)
  //     ) as unknown as SearchPizzaParams;
  //     const sortList = list.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(setFilters({ ...params, sortList }));
  //     isSearch.current = true;
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // Если изменили параметры и уже был первый рендер,

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        сategoryId,
        sort,
        currentPage,
        searchValue,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [сategoryId, sort, currentPage]);

  // Если уже был первый рендер , запрашиваем пиццы

  useEffect(() => {
    getPizzas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [сategoryId, sort, currentPage, searchValue]);

  return (
    <>
      <div className="content">
        <div className="content__top">
          <Categories
            value={сategoryId}
            onChangeCategory={(i: number) => dispatch(setCategoryId(i))}
          />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === "error" ? (
          <div>
            <div className="content__error-info">
              <h2>
                Произошла ошибка! <span>😕</span>
              </h2>
              <p>
                Вероятней всего, вы не заказывали ещё пиццу.
                <br />
                Не удалось получить питцы.
              </p>

              <a className="button button--black" href="/">
                <span>Вернуться назад</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading" ? skeletons : pizzas}
          </div>
        )}

        <Pagination onChangePage={onChangePage} currentPage={currentPage} />
      </div>
    </>
  );
};

export default Home;
