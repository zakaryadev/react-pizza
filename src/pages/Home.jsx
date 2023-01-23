import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../layouts/MainLayouts";

const Home = () => {
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    setLoaded(false);
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId - 1}` : "";
    const search = searchValue ? `search=${searchValue}` : "";
    const Page = page >= 0 ? `page=${page}` : "";
    fetch(
      `https://63ca2496d0ab64be2b4d182c.mockapi.io/api/v1/items?&${Page}&${category}&${search}&sortBy=${sortBy}&order=${order}&limit=4`
    )
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        res && setLoaded(true);
      });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [categoryId, sortType, searchValue, page]);
  console.log(searchValue);
  const pizzas = items.map((item, index) => {
    return <PizzaBlock {...item} key={index} />;
  });

  const skeleton = [...new Array(6)].map((_, indx) => {
    return <PizzaSkeleton key={indx} />;
  });

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(indx) => setCategoryId(indx)}
        />
        <Sort value={sortType} onClickSort={(indx) => setSortType(indx)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{loaded ? pizzas : skeleton}</div>
      <Pagination setPage={setPage} />
    </div>
  );
};

export default Home;
