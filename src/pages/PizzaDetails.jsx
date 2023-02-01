import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const PizzaDetails = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState();
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://63ca2496d0ab64be2b4d182c.mockapi.io/api/v1/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPizza();
  }, []);

  return (
    <div className="container">
      {pizza ? (
        <div className="pizza-details">
          <img src={pizza.imageUrl} alt={pizza.imgUrl} />
          <h1>{pizza.title}</h1>
          <h4>{pizza.price} ₽</h4>
          <Link to={"/"} className="button button--outline">
            <span>Назад</span>
          </Link>
        </div>
      ) : (
        <h1>Загрузка...</h1>
      )}
    </div>
  );
};

export default PizzaDetails;
