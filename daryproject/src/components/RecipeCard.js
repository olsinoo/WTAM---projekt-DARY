import { Link } from "react-router-dom";
import { faBowlFood, faClock, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function RecipeCard({ title, preparationTime, slug, price, calories, countOfServing, img }) {
    function convertPreparatonTime(){
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
        <Link className='RecipeCard-section' to={`/recipes/${slug}`}>
            <div className='RecipeCard-image'>
                <img src={`/img/${img}`} alt="Preview" />
            </div>
            <div className='RecipeCard-bodyText'>
                <h2>{title.length > 30 ? title.slice(0, 30) + "..." : title}</h2>
                <p>{convertPreparatonTime() === "Not added time" ? "" :<FontAwesomeIcon icon={faClock} />  }{convertPreparatonTime()}</p>
                <p>{price} eur</p>
                <p>{calories} kcal</p>
                <p><FontAwesomeIcon icon={faPeopleGroup} /> {countOfServing}</p>
            </div>
        </Link>
    );

}