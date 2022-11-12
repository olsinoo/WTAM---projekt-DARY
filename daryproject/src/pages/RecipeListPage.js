import { useEffect, useState } from 'react';

import listOfRecipes from '../database/listOfRecipes.json'

export function RecipeListPage() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        setRecipes(listOfRecipes)
    }, [])



    return(
        <div>
            <h1>Recipe List Page</h1>
            <div>{recipes.length}</div>
            <div>{recipes.map( recipe => {
                return(
                    <div>
                        <img src={`/img/${recipe.img}`} alt="test" />
                        <div>{recipe._id}</div>
                    </div>  
                );  
                }
                
            )}</div>
        </div>
        );
}