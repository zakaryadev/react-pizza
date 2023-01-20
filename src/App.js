import React from "react";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import PizzaSkeleton from "./components/PizzaBlock/PizzaSkeleton";

function App() {
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
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            {Categories()}
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            <PizzaSkeleton />
            {loaded &&
              pizzas.map((item, index) => {
                return <PizzaBlock {...item} key={index} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
