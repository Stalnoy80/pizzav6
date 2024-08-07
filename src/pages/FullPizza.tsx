import { useEffect, useState } from "react";

import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header.tsx";
import React from "react";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizzas() {
      try {
        const { data } = await axios.get(
          `https://813cecfc1deed960.mokky.dev/items/` + id
        );
        setPizza(data);
      } catch (error) {
        alert("ошибка при получении пиццы");
        navigate("/");
      }
    }
    fetchPizzas();
  }, []);

  if (!pizza) {
    return "Загрузка...";
  }

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <img src={pizza.imageUrl} height={400} />
          <h2>{pizza.title}</h2>
          <h3>{pizza.price} р</h3>
          <Link to="/">
            <div className="button pay-btn">
              <span>Назад</span>
            </div>
          </Link>
        </div>{" "}
      </div>
    </div>
  );
};
export default FullPizza;
