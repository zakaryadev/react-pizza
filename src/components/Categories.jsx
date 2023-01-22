import React from "react";

export const Categories = ({ value, onClickCategory }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const addClass = (indx) => {
    if (value === indx) return "active";
    else return null;
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((name, indx) => {
          return (
            <li
              className={addClass(indx)}
              onClick={() => onClickCategory(indx)}
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
