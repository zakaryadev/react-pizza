import React from "react";

export const Categories = () => {
  const [index, setActiveIndx] = React.useState(0);
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const onChange = (indx) => {
    setActiveIndx(indx);
  };

  const addClass = (indx) => {
    if (index === indx) return "active";
    else return null;
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((name, indx) => {
          return (
            <li
              className={addClass(indx)}
              onClick={() => onChange(indx)}
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
