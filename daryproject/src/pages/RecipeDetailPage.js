import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { faClock, faPenToSquare, faTrashAlt, faShoppingBasket, 	faFire, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactMarkdown from "react-markdown";
import { ShowIngredients } from '../components/RecipeDetailShowIngredients';


import './RecipeDetailPage.css';

export function RecipeDetailPage() {
    const { slug } = useParams();
    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        const newRecipe = require('../database/Recipes/' + slug + '.json')[0]
        const servingCountLS = localStorage.getItem("servingCount") !== null ? parseInt(localStorage.getItem("servingCount")) : newRecipe.servingCount
        setRecipe({...newRecipe, 
            price: newRecipe.price / newRecipe.servingCount * servingCountLS,
            servingCount: servingCountLS,
            ingredients: newRecipe.ingredients
                            .map(ingredient => {
                                return {...ingredient,
                                     amount: ingredient.amount / newRecipe.servingCount * servingCountLS,
                                     price: ingredient.price / newRecipe.servingCount * servingCountLS}
                                })});
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
    const showAlert =() =>{
        if (localStorage.getItem('price') === null){
            let limit = prompt("The recipe has been added to the basket. \n Do you want to set a price limit for the cart?\n Set Limit:", "");
            if (limit === null || limit === "") {
                //lim = parseInt(limit);
            } else {
                localStorage.setItem('lim', parseInt(limit));
            }
        }
        else{
            alert("The recipe has been added to the basket.")
        }

    }

    const addToBasket = () =>{
        if(localStorage.getItem(recipe.title) == null){
            showAlert();
            localStorage.setItem(recipe.title, JSON.stringify(recipe))
            if (localStorage.getItem('price') === null){
                localStorage.setItem('price', JSON.stringify(recipe.price));
            } else {
                localStorage.setItem('price', JSON.stringify(recipe.price + parseFloat(localStorage.getItem('price'))));
            }
        }

        window.dispatchEvent(new Event('storage'));
    }

    return(

        <div className='RecipeDetailPage-section'> 
            <div className='RecipeDetailPage-header-and-buttons'>
                <div className='RecipeDetailPage-recipeTitle'>
                    <h1>{recipe.title}</h1>
                </div>
                <div className='RecipeDetailPage-buttons'>
                    <button className='button-blue' onClick={() => addToBasket()}>Add to <FontAwesomeIcon icon={faShoppingBasket}/>  </button>
                    <Link to={`/recipes/${slug}/edit`} >
                        <button className='button-green'> <FontAwesomeIcon icon={faPenToSquare} />     Edit</button>
                    </Link>
                    <Link to={'/'}>
                        <button className='button-red' onClick={() => console.log("Wwooooo you delete recipe -_-")}> <FontAwesomeIcon icon={faTrashAlt} />     Delete</button>
                    </Link>
                </div>
             
            </div>
            <div className='RecipeDetailPage-preparationTime'>
                    <h5>
                        {convertPreparationTime() === "Not added time" ? "" : <FontAwesomeIcon icon={faClock} /> } {convertPreparationTime()}
                    </h5>
                    <h5>
                        <FontAwesomeIcon icon={faFire} /> {Number(recipe.calories).toFixed(0)} kcal
                    </h5>
                    <h5>
                        <FontAwesomeIcon icon={faMoneyBill} /> {Number(recipe.price).toFixed(2)} eur
                    </h5>
            </div>
            <div className='RecipeDetailPage-body'>
                <div className='RecipeDetailPage-left'>
                    <div className='RecipeDetailPage-recipeImage'>
                        <img src={`/img/${recipe.img}`} alt="FoodImage" />
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
            </div>
          
            <div className="RecipeDetailPage-lastUpdateTime">
                <h3>Last Changes:</h3>
                <h4>{recipe.lastModifiedDate?.split('T')[0]}</h4>
            </div>   
        </div>
    );
}