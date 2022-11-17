import { useEffect, useState } from 'react';


import { BasketRecipe } from '../components/BasketRecipe';

export function MyRecipesList(){
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        const recipesFromLocalStorage = Object.keys(localStorage).map(key => JSON.parse(localStorage.getItem(key)))
        setRecipes(recipesFromLocalStorage)
    }, [])



    return(
        <div className='basket'>
            <div className='basket-header'>
                <h2>Your Recipes List</h2>
            </div>
            {console.log(recipes)}
             {recipes?.map((recipe) => (
                    <BasketRecipe key={recipe._id} recipe={recipe} />))}
        </div>

    )

}