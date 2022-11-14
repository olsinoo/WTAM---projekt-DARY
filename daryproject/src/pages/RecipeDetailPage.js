import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { faClock, faPenToSquare, faTrashAlt, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactMarkdown from "react-markdown";

import { ShowIngredients } from '../components/RecipeDetailShowIngredients';


export function RecipeDetailPage() {
    const { slug } = useParams();
    const [recipe, setRecipe] = useState({});
    const [addToBasket, setAddToBasekt] = useState(false);

    useEffect(() => {
        setRecipe(require('../database/Recipes/' + slug + '.json')[0]); 
    },[slug]);

    const convertPreparationTime = () =>{
        const hours = recipe.preparationTime / 60;
        const minutes = recipe.preparationTime % 60;
    
        if (recipe.preparationTime === 0 || recipe.preparationTime === undefined){
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

    useEffect(() =>{
        localStorage.setItem(recipe.title, JSON.stringify(recipe))
    }, [addToBasket])

    return(
        <div className='RecipeDetailPage-section'> 
            <div className='RecipeDetailPage-header-and-buttons'>
                <div className='RecipeDetailPage-recipeTitle'>
                    <h1>{recipe.title}</h1>
                </div>
                <div className='RecipeDetailPage-recipeImage'>
                    <img src={`/img/${recipe.img}`} alt="FoodImage" />
                </div>
                <div className='RecipeDetailPage-buttons'>
                    <button className='button-blue-add-to-basket' onClick={() => setAddToBasekt(!addToBasket)}><FontAwesomeIcon icon={faShoppingBasket}/> Add to List</button>
                    <Link to={`/recipes/${slug}/edit`} >
                        <button className='button-green'> <FontAwesomeIcon icon={faPenToSquare} />     Edit</button>
                    </Link>
                    <Link to={'/'}>
                        <button className='button-red' onClick={() => console.log("Wwooooo you delete recipe -_-")}> <FontAwesomeIcon icon={faTrashAlt} />     Delete</button>
                    </Link>
                </div>
            </div>
            <div className='RecipeDetailPage-body'>
                <div className='RecipeDetailPage-preparationTime'>
                    <h5>
                        {convertPreparationTime() === "Not added time" ? "" : <FontAwesomeIcon icon={faClock} /> } {convertPreparationTime()}
                    </h5>
                </div>
               <ShowIngredients recipe={recipe} setRecipe={setRecipe} />
            </div> 
            <div className="RecipeDetailPage-Directions">
                <ReactMarkdown className="reactmarckDown" hidden={recipe?.directions?.length < 1} >
                    {recipe.directions}
                </ReactMarkdown>
                <div className="RecipeDetailPage-Directions-noMethod" hidden={recipe?.directions?.length > 1}>
                    No Method
                </div>
            </div>
            <div className="RecipeDetailPage-lastUpdateTime">
                <h3>Last Changes:</h3>
                <h4>{recipe.lastModifiedDate?.split('T')[0]}</h4>
            </div>   
        </div>
    );
}