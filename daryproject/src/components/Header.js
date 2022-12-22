import { Link } from "react-router-dom";
import React, { Component } from "react";
import { useEffect, useState } from 'react';

import {faBasketShopping} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import "./Header.css";

export function Header() {
  const [price, setPrice] = useState(parseFloat(localStorage.getItem('price')));
  const [lim, setLimit] = useState(parseFloat(localStorage.getItem('lim')));


    useEffect(() => {

      window.addEventListener('storage', () => {
        const theme = parseFloat(localStorage.getItem('price'))
        setPrice(theme);
        setLimit(parseFloat(localStorage.getItem('lim')));
      });  
      })

   

  return (
    <nav>
      <div className="Nav-Toast">
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            />
        </div>
      <div className="nav-section">
        <div className="nav-mainName">
        <Link className="nav-cookbook" to="/"><h1>Low-Budget Cooking</h1></Link>
        </div>
        <div className="nav-topings-Name">
          <Link className="nav-recipe" to="/"><h3>Recipes</h3></Link>
          <Link className="nav-my-basket" to={"/recipes-basket"}>
              <div>{!price ?  <FontAwesomeIcon icon={faBasketShopping}/> : price < lim ? <FontAwesomeIcon icon={faBasketShopping} color={"green"}/> : <FontAwesomeIcon icon={faBasketShopping} color={"red"}/>}{ !price ? 0.0 : Number(price).toFixed(2) } &euro; </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}