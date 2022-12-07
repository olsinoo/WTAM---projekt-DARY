import { Link } from "react-router-dom";
import { faClock, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function RecipeCard({ title, preparationTime, slug, price, calories, countOfServing, img }) {
  const convertPreparatonTime = () => {
        const hours = preparationTime / 60;
        const minutes = preparationTime % 60;
    
        if (preparationTime === 0 || preparationTime === undefined){
          return "Not added time";
        }
    
        let result = "";
    
        if (hours >= 1 ){
          result  =  parseInt(hours) + " h ";
        }
    
        if (minutes !== 0){
          result += minutes + " min";
        }
    
        return result;
    }
    
    return(
        <Link className='RecipeCard-section' to={`/recipes/${slug}`} style={{backgroundImage: `url(/img/${img})`}}>
            <div className='RecipeCard-bodyText' hidden={() => onmouseleave}>
                <div className="RecipeCard-noHoverMenu">
                  <h2 className="RecipeCard-title">{title.length > 30 ? title.slice(0, 30) + "..." : title}</h2>
                  <p className="RecipeCard-price">{price} eur</p>
                </div>
                <div className="RecipeCard-time">
                  <p>{convertPreparatonTime() === "Not added time" ? "" :<FontAwesomeIcon icon={faClock} />  } {convertPreparatonTime()}</p>
                </div>
                <div className="RecipeCard-another">
                  <p>{calories} kcal</p>
                  <p><FontAwesomeIcon icon={faPeopleGroup} /> {countOfServing}</p>
                </div>
            </div>
        </Link>
    );

}