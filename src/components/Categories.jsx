import React from "react";
import { useSelector, useDispatch} from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

export const Categories = () => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const { categoryId } = useSelector(state => state.filter);
  const dispatch = useDispatch();
  
  const addClass = (indx) => {
    if (categoryId === indx) return "active";
    else return null;
  };
  
  const setCategory = (indx) => {
    dispatch(setCategoryId(indx));
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((name, indx) => {
          return (
            <li
              className={addClass(indx)}
              onClick={() => setCategory(indx)}
              key={indx}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
