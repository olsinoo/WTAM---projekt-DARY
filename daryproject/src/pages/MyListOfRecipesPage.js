import { useEffect, useState } from 'react';
import { ListOfIngredients } from '../components/ListOfIngredients';
import { RecipesList } from '../components/RecipesList'; 


import "./MyListOfRecipesPage.css";

export function MyRecipesList(){
    const recipes =  
                Object.keys(localStorage).map(
                    key => {

                        if (key !== "price"){
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