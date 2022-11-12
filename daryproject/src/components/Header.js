import { useState } from "react";
import { Link } from "react-router-dom";
import { faArrowDownShortWide} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";

export function Header() {
  const [linksMobile, setlinksMobile] = useState(false);

  const openLinks = () => {
    setlinksMobile(!linksMobile);
  }

  return (
    <nav>
      <div className="nav-section">
        <div className="nav-mainName">
        <Link className="nav-cookbook" to="/"><h1>Low-Budget Cooking</h1></Link>
        </div>
        <div className="nav-topings-Name">
          <Link className="nav-recipe" to="/"><h3>Recipe</h3></Link>
        </div>

        <div className="nav-topings-name-mobile">
        <button className="nav-topings-name-mobile-button" onClick={openLinks}><FontAwesomeIcon className="nav-topings-name-mobile-icon" icon={faArrowDownShortWide} /></button>

        <ul hidden={!linksMobile}>
            <li><Link className="nav-mobile-recipe" to="/"><h3>Recipe</h3></Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}