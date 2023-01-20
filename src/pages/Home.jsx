import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";

const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const baseUrl = "https://63ca2496d0ab64be2b4d182c.mockapi.io/api/v1/items";

  React.useEffect(() => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((res) => {
        setPizzas(res);
        res && setLoaded(true);
      });
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        {Categories()}
        <Sort />
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
