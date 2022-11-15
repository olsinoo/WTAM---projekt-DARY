import { useEffect, useState } from 'react';


import { BasketRecipe } from '../components/BasketRecipe';

export function MyRecipesList(){
    const [recipes, setRecipes] = useState({})

    useEffect(() => {
        setRecipes(Object.entries(localStorage))
    }, [])

    const ListOfRecipes = () => {
        return(
            <div className='basket-body'>
                 {/* {recipes.map((key, recipe) => {}
                    <BasketRecipe recipe={recipe} />)} */}
            </div>
           
        );
    }

    return(
        <div className='basket'>
            <div className='basket-header'>
                <h2>Your Recipes List</h2>
            </div>
            <ListOfRecipes />
        </div>

    )

}