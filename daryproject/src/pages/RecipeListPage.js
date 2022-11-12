import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import listOfRecipes from '../database/listOfRecipes.json'
import { SearchInput } from '../components/SearchInput';
import { RecipesList } from '../components/RecipesList';

export function RecipeListPage() {
    const [recipes, setRecipes] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        setRecipes(listOfRecipes)
    }, [])


    return(
        <div className="RecipeListPage-section">
            <div className="RecipeListPage-header">
                <div className="RecipeListPage-advancedFilter">
                    <button>Advanced Filter</button>
                </div>
                <div className="RecipeListPage-underHeader-searchButton">
                    <SearchInput
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}/>
                </div>
                <div className="RecipeListPage-header-button-link">
                    <Link to={'/new-recipe'}>
                        <button className="button-green">
                        <FontAwesomeIcon icon={faUtensils} /> New Recipe
                        </button>
                    </Link>
                </div>
            </div>
            <div className="RecipeListPage-Reipe-records">
                    <h1>Recipes</h1>
                    <h5>Aviable records: {recipes.length} </h5>
            </div>
            <RecipesList recipes={recipes} />
        </div>
    );
}


{/* <div>
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
); */}