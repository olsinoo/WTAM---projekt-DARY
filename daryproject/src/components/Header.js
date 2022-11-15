import { Link } from "react-router-dom";

import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

import "./Header.css";

export function Header() {

  return (
    <nav>
      <div className="nav-section">
        <div className="nav-mainName">
        <Link className="nav-cookbook" to="/"><h1>Low-Budget Cooking</h1></Link>
        </div>
        <div className="nav-topings-Name">
          <Link className="nav-recipe" to="/"><h3>Recipe</h3></Link>
          <Link className="nav-my-basket" to={"/recipes-basket"}><h3>Basket</h3></Link>
        </div>
      </div>
    </nav>
  );
}