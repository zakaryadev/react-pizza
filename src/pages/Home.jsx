import React from "react";
import qs from "qs";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas, setLoaded } from "../redux/slices/pizzaSlice";
import { sortList } from "../components/Sort";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, searchValue, currentPage } = useSelector(
    (state) => state.filter
  );
  const { items, loaded } = useSelector((state) => state.pizzas);

  const getPizzas = async () => {
    dispatch(setLoaded(false));
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `&category=${categoryId - 1}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    try {
      dispatch(
        fetchPizzas({
          order,
          sortBy,
          category,
          search,
          currentPage,
        })
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.log("ERROR", error.message);
    } finally {
      dispatch(setLoaded(true));
    }
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          search: searchValue,
          categoryId,
          sortProperty: sort.sortProperty,
          currentPage,
        },
        { addQueryPrefix: true }
      );
      navigate(`${queryString}`);
    }
    isMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort.sortProperty, currentPage, searchValue]);

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort.sortProperty, currentPage, searchValue]);
  const pizzas = items.map((item, index) => {
    return <PizzaBlock {...item} key={index} />;
  });
  const skeleton = [...new Array(4)].map((_, indx) => {
    return <PizzaSkeleton key={indx} />;
  });

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{loaded ? pizzas : skeleton}</div>
      <Pagination />
    </div>
  );
};

export default Home;
