import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Header.css";

export function Header() {
  const [price, setPrice] = useState()

  useEffect(() => {
    const arrayOfPriceOfRecipesFromLocalStorage = Object.keys(localStorage).map(key => (JSON.parse(localStorage.getItem(key)).price))
    console.log(arrayOfPriceOfRecipesFromLocalStorage)
    const sumOfPrices = arrayOfPriceOfRecipesFromLocalStorage.reduce((result, price) => parseFloat(result) + parseFloat(price))
    setPrice(sumOfPrices)
}, [])



  return (
    <nav>
      <div className="nav-section">
        <div className="nav-mainName">
        <Link className="nav-cookbook" to="/"><h1>Low-Budget Cooking</h1></Link>
        </div>
        <div className="nav-topings-Name">
          <Link className="nav-recipe" to="/"><h3>Recipe</h3></Link>
          {console.log(price)}
          <Link className="nav-my-basket" to={"/recipes-basket"}>
              <div>{price} eur <FontAwesomeIcon icon={faShoppingBasket}/></div>
          </Link>
        </div>
      </div>
    </nav>
  );
}