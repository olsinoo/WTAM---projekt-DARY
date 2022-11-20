import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Header.css";

export function Header() {
  const [price, setPrice] = useState(0);


  useEffect(() => {
    setPrice(parseFloat(localStorage.getItem('price')))
}, [localStorage.getItem("price")])

  return (
    <nav>
      <div className="nav-section">
        <div className="nav-mainName">
        <Link className="nav-cookbook" to="/"><h1>Low-Budget Cooking</h1></Link>
        </div>
        <div className="nav-topings-Name">
          <Link className="nav-recipe" to="/"><h3>Recipe</h3></Link>
          <Link className="nav-my-basket" to={"/recipes-basket"}>
              <div>{ !price ? "" : Number(price).toFixed(2) + "eur"}  <FontAwesomeIcon icon={faShoppingBasket}/></div>
          </Link>
        </div>
      </div>
    </nav>
  );
}