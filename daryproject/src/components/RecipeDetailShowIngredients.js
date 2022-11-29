import { ListOfIngredients } from "./ListOfIngredients"
import { useEffect, useState } from 'react';
export function ShowIngredients ({recipe, setRecipe}){


    const updateServingCount = (e) => {
        if (e.target.value === ""){
          return
        }
    
        if (e.target.valueAsNumber < 1 || e.target.valueAsNumber > 99){
          return
        }
       
        setRecipe({...recipe, 
            price: recipe.price / recipe.servingCount * e.target.valueAsNumber,
            servingCount: e.target.valueAsNumber,
            ingredients: recipe.ingredients
                            .map(ingredient => {
                                return {...ingredient,
                                     amount: Number(ingredient.amount / recipe.servingCount * e.target.valueAsNumber).toFixed(2),
                                     price: Number(ingredient.price / recipe.servingCount * e.target.valueAsNumber).toFixed(2)}
                                })});
        
    }

    return(
        <div className='RecipeDetailPage-Ingredients-and-Directions'>
            <div className='RecipeDetailPage-Ingredients'>
                <div className="RecipeDetailPage-Ingredient-ServingCount-Section">
                    <div className="RecipeDetailPage-Ingredient-ServingCount-Count">
                        <span hidden={recipe.ingredients?.length === 0}>Change Serving Count</span>
                        <input  className='RecipeDetailPage-Ingredient-ServingCount-Section-input' type="number" min="1" max="99" value={recipe.servingCount} onChange={updateServingCount} ></input>
                    </div>
                    <div className="RecipeDetailPage-Ingredients-priceOfAllIngredients">   {Number(recipe.price).toFixed(2)} eur</div>
                </div>   
               
                <ListOfIngredients ingredients={recipe.ingredients} /> 
                
            </div>
            
        </div>
    );
}