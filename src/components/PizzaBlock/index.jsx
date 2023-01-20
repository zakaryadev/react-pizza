import React from "react";

export const PizzaBlock = ({
  imageUrl,
  title,
  types,
  sizes,
  price,
  category,
  rating,
}) => {
  const typeNames = ["тонкое", "традиционное"];
  const [count, setCount] = React.useState(0);
  const [typeIndex, setActiveType] = React.useState(0);
  const [indexSize, setActiveSize] = React.useState(0);

  const onAdd = () => {
    setCount(count + 1);
  };

  const onAddType = (indx) => {
    setActiveType(indx);
  };

  const onAddSize = (indx) => {
    setActiveSize(indx);
  };

  const addClass = (indx, index) => {
    if (index === indx) return "active";
    else return null;
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt={title} />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((value, index) => {
              return (
                <li
                  key={value}
                  className={addClass(index, typeIndex)}
                  onClick={() => onAddType(index)}
                >
                  {typeNames[value]}
                </li>
              );
            })}
          </ul>
          <ul>
            {sizes.map((value, index) => {
              return (
                <li
                  key={index}
                  className={addClass(index, indexSize)}
                  onClick={() => onAddSize(index)}
                >
                  {value} см
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            className="button button--outline button--add"
            onClick={onAdd}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              ></path>
            </svg>
            <span>Добавить</span>
            <i>{count}</i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
