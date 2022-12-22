import { ListOfIngredients } from '../components/ListOfIngredients';
import { BasketRecipes } from '../components/BasketRecipes';
import { useEffect, useState } from 'react';


import "./MyListOfRecipesPage.css";

export function MyRecipesList(){
    const [updatePrice, setUpdatePrice] = useState();
 
    useEffect(() => {
        window.addEventListener('storage', () => {
            const theme = localStorage.getItem("price");
            setUpdatePrice(theme);
           
        })
       
    }, [])

   

    const recipes =  
                Object.keys(localStorage).map(
                    key => {

                        if ((key !== "price") && (key !== "lim") && (key !== "servingCount") && (key !== "allergens") && (key !== "likedIngredients")){
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
                {arrayOfPrice.length !== 0 ? "/" + Number(arrayOfPrice.reduce((result, price) => result = result + price)).toFixed(2) + " €" : "" }
            </div> 
        );
   
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
                    <input type="number" id="txt1" value={JSON.parse(localStorage.getItem('lim')) } onChange={(e) => localStorage.setItem('lim', JSON.stringify(e.target.value))} className='basket-your-limit-form-input'/>                </form>
            </div>
            <section className='basket-recipes'>
                <div className='choosen-recipes'>
                    Choosen recipes
                </div>
                <div className='basket-recipes'>
                    <BasketRecipes recipes={recipes}  />
                </div>
            </section>

            <section>
                <div className='basket-your-shopping-list'>
                    Your Shopping List
                </div>
                <div className='basket-ingredients'>
                    <ListOfIngredients  ingredients={sortedIngredients()}/>
                </div>
                <GetPrice/>
            </section>
        </div>

    )
}