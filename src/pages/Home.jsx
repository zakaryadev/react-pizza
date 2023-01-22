import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";

const Home = ({ searchValue }) => {
  const [pizzas, setPizzas] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });

  React.useEffect(() => {
    setLoaded(false);
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId - 1}` : "";
    fetch(
      `https://63ca2496d0ab64be2b4d182c.mockapi.io/api/v1/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((res) => {
        setPizzas(res);
        res && setLoaded(true);
      });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [categoryId, sortType]);

  const searchAlphabet = (letter) => {
    return letter.length > 0
      ? pizzas.filter((pizza) => pizza.title.includes(letter) === true)
      : pizzas;
  };
  React.useEffect(() => {
    setPizzas(searchAlphabet(searchValue));
    // eslint-disable-next-line
  }, [searchValue]);

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
      <div className="content__items">
        {loaded
          ? pizzas.map((item, index) => {
              return <PizzaBlock {...item} key={index} />;
            })
          : [...new Array(6)].map((_, indx) => {
              return <PizzaSkeleton key={indx} />;
            })}
      </div>
    </div>
  );
};

export default Home;
