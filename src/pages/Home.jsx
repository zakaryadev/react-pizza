import React from "react";
import axios from "axios";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";
import Pagination from "../components/Pagination";
import {useSelector, useDispatch} from "react-redux";
import {setCategoryId, setCurrentPage} from "../redux/slices/filterSlice";


const Home = () => {
  const [items, setItems] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const {categoryId, sort, searchValue, currentPage} = useSelector(state => state.filter);
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    setLoaded(false);
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `&category=${categoryId - 1}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    
    axios
      .get(`https://63ca2496d0ab64be2b4d182c.mockapi.io/api/v1/items?${category}${search}&sortBy=${sortBy}&order=${order}&limit=4&page=${currentPage}`)
      .then(res => {
        setItems(res.data);
        res && setLoaded(true);
      })
    
    window.scrollTo({
      top: 0, behavior: "smooth",
    });
  }, [categoryId, sort, currentPage, searchValue]);
  
  const pizzas = items.map((item, index) => {
    return <PizzaBlock {...item} key={index}/>;
  });
  
  const skeleton = [...new Array(4)].map((_, indx) => {
    return <PizzaSkeleton key={indx}/>;
  });
  
  return (<div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(indx) => dispatch(setCategoryId(indx))}
        />
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{loaded ? pizzas : skeleton}</div>
      <Pagination />
    </div>);
};

export default Home;
