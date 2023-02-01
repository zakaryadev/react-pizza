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
import { sortList } from "../components/Sort";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { toast, ToastContainer } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, searchValue, currentPage } = useSelector(
    (state) => state.filter
  );
  const { items, status } = useSelector((state) => state.pizzas);

  const error = (txt) => toast.error(txt);

  const getPizzas = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `&category=${categoryId - 1}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

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
  };
  if (status === "error") error("Error an occured");
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
      <ToastContainer autoClose={500} theme="light" />
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="cart cart--empty error">
          <h2>
            Ошибка при <br /> получений пиццы 😑
          </h2>
          <p>
            Произошла непредвиденная ошибка.
            <br /> Пожалуйста, попробуйте позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "success" ? pizzas : skeleton}
        </div>
      )}
      <Pagination />
    </div>
  );
};

export default Home;
