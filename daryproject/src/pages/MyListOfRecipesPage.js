import { useEffect, useState } from 'react';

import { BasketIngredients } from '../components/BasketIngredients';
import { RecipesList } from '../components/RecipesList'; 

export function MyRecipesList(){
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        setRecipes(
            Object.keys(localStorage).map(
                key => 
                    JSON.parse(
                        localStorage.getItem(key)
                    )
                )
        );
    }, [])

    const getIngredients = () => {
        return recipes.map(recipe =>
            recipe.ingredients);
    }

    return(
        <div className='basket'>
            <div className='basket-header'>
                <h2>Your Basket</h2>
            </div>
            <div className='basket-body'>
                <BasketIngredients ingredientsArray={getIngredients()}/>
                <RecipesList recipes={recipes} />
            </div>    
        </div>

    )

}