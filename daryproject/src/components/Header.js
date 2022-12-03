import { Link } from "react-router-dom";
import React, { Component } from "react";
import { useEffect, useState } from 'react';

import {faBasketShopping, faBus, faShoppingBasket} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Header.css";

export function Header() {
  const [price, setPrice] = useState(parseFloat(localStorage.getItem('price')));
  const [lim, setLimit] = useState(0);


    useEffect(() => {

      window.addEventListener('storage', () => {
        const theme = parseFloat(localStorage.getItem('price'))
        setPrice(theme);
      })
      setLimit(parseFloat(localStorage.getItem('lim')));


}, [])

  return (
    <nav>
      <div className="nav-section">
        <div className="nav-mainName">
        <Link className="nav-cookbook" to="/"><h1>Low-Budget Cooking</h1></Link>
        </div>
        <div className="nav-topings-Name">
          <Link className="nav-recipe" to="/"><h3>Recipe</h3></Link>
          <Link className="nav-my-basket" to={"/recipes-basket"}>
              <div>{ !price ? "" : Number(price).toFixed(2) + "eur"}  {!lim ?  <FontAwesomeIcon icon={faBasketShopping}/> : price < lim ? <FontAwesomeIcon icon={faBasketShopping} color={"green"}/> : <FontAwesomeIcon icon={faBasketShopping} color={"red"}/>}</div>
          </Link>
        </div>
      </div>
    </nav>
  );
}