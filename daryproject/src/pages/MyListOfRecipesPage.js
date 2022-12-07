import { ListOfIngredients } from '../components/ListOfIngredients';
import { RecipesList } from '../components/RecipesList'; 


import "./MyListOfRecipesPage.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function MyRecipesList(){
    const recipes =  
                Object.keys(localStorage).map(
                    key => {

                        if ((key !== "price") && (key !== "lim") && (key !== "servingCount") && (key !== "dislikedIngredients") && (key !== "likedIngredients")){
                            return JSON.parse(localStorage.getItem(key));  
                        }
                    }).filter(item => item);
    
    
                    
    const getIngredients = () => {
        return recipes.map(recipe =>
            recipe?.ingredients);
    }
    
    const GetPrice = () => {
        const arrayOfPrice = recipes.map(recipe =>  recipe?.price);

        return ( 
            <div className='basket-price'>
                {arrayOfPrice.length !== 0 ? "/" + Number(arrayOfPrice.reduce((result, price) => result = result + price)).toFixed(2) + " eur" : "" }
            </div> 
        );
   
    }

    const changeLimit = () =>{
        localStorage.setItem('lim', document.getElementById('txt1').value);
        window.dispatchEvent(new Event('storage'));
    }

    const ingredientsArray = getIngredients();

    const sortedIngredients = () => {
        const updatedIngredinets  = {};
        ingredientsArray?.forEach(ingredients => {
            ingredients?.forEach(ingredient => 
                {
                if (updatedIngredinets.hasOwnProperty(ingredient.name)){
                    
                    updatedIngredinets[ingredient.name].amount += ingredient.amount;
                    updatedIngredinets[ingredient.name].price += ingredient.price;
                
                }
                else{
                  updatedIngredinets[ingredient.name] = ingredient;
                }    
              }        
            )
        })      
        return Object.keys(updatedIngredinets).map( key => updatedIngredinets[key]);
    }

    return(
        <div className='basket'>
            <div className='basket-your-limit'>
                <form className='basket-your-limit-form'>
                    <label>Your basket limit: </label>
                    <input type="text" id="txt1" defaultValue={localStorage.getItem('lim')} className='basket-your-limit-form-input'/>
                    <button className='button-green' onClick={() => changeLimit()}>Change <FontAwesomeIcon/>  </button>
                </form>
            </div>
            <div className='basket-your-shopping-list'>
                Your Shopping List:
            </div>
            <div className='basket-ingredients'>
                <ListOfIngredients  ingredients={sortedIngredients()}/>
            </div>
            <GetPrice/>
            <div className='choosen-recipes'>
                Choosen recipes:
            </div>
            <div className='basket-recipes'>
                <RecipesList recipes={recipes}  />
            </div>
            
        </div>

    )
}