import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import listOfRecipes from '../database/listOfRecipes.json'
import { SearchInput } from '../components/SearchInput';
import { RecipesList } from '../components/RecipesList';

import './RecipeListPage.css';

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
                    <button className="button-green">Advanced Filter</button>
                </div>
                <div className="RecipeListPage-underHeader-searchButton">
                    <SearchInput
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}/>
                </div>
                <Link className="RecipeListPage-header-button-link" to={'/new-recipe'}>
                    <button className="button-green">
                    <FontAwesomeIcon icon={faUtensils} /> New Recipe
                    </button>
                </Link>
            </div>
            <div className="RecipeListPage-Reipe-records">
                    <h2>Aviable Recipes: {recipes.length} </h2>
            </div>
            <RecipesList recipes={recipes} />
        </div>
    );
}
