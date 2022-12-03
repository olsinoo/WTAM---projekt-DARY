import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import listOfRecipes from '../database/listOfRecipes.json'
import Ingredients from '../database/Ingredients.json'
import { SearchInput } from '../components/SearchInput';
import { RecipesList } from '../components/RecipesList';

import './RecipeListPage.css';

export function RecipeListPage() {
    const [recipes, setRecipes] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [filterIngredients, setFilterIngredients] = useState([]);

    const filterredRecipes = recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(searchValue.toLowerCase()),
    ).filter(recipe => 
        (localStorage.getItem("likedIngredients") !== null ? JSON.parse(localStorage.getItem("likedIngredients")) : [])
            .every(ingredient => 
                recipe.ingredients.includes(ingredient)
    )).filter(recipe => (localStorage.getItem("dislikedIngredients") !== null ? JSON.parse(localStorage.getItem("dislikedIngredients")) : [])
            .every(ingredient => recipe.ingredients.indexOf(ingredient) === -1))

    useEffect(() => {
        
        setRecipes(listOfRecipes);
        setFilterIngredients(Ingredients);
        window.addEventListener('storage', () => {
            const theme = localStorage.getItem("dislikedIngredients");
            const theme2 = localStorage.getItem("likedIngredients");
            const theme3 = localStorage.getItem("lim");
          })
    }, [])


    const updateServingCount = (e) => {
        if (e.target.value === ""){
            return
          }
      
        if (e.target.valueAsNumber < 1 || e.target.valueAsNumber > 99){
            return
        }
        
        localStorage.setItem("servingCount", JSON.stringify(e.target.valueAsNumber));
        setRecipes(recipes.map(recipe => {
                    return {...recipe,
                            price: Number(recipe.price / recipe.countOfServing * e.target.valueAsNumber).toFixed(2),
                            countOfServing: e.target.valueAsNumber
                            }
                    }));
    }

    const setMaxSumToToLocalStorage = (e) => {
        const value = parseFloat(e.target.value);
        localStorage.setItem("lim", JSON.stringify(value));
        window.dispatchEvent(new Event('storage'));
    }

    const updateDislikedIngredients = (e) => {
        const ingFormLocalStorage = localStorage.getItem("dislikedIngredients") !== null ? localStorage.getItem("dislikedIngredients") : "";
        if (Ingredients.includes(e.target.value) && !ingFormLocalStorage.includes(e.target.value)){
            let dislikedIngredientstest = localStorage.getItem("dislikedIngredients") !== null ? JSON.parse(localStorage.getItem("dislikedIngredients")): [];
            dislikedIngredientstest.push(e.target.value);
            localStorage.setItem("dislikedIngredients", JSON.stringify(dislikedIngredientstest));
            window.dispatchEvent(new Event('storage'));
        }
    }

    const updateLikedIngredients = (e) => {
        const ingFormLocalStorage = localStorage.getItem("likedIngredients") !== null ? localStorage.getItem("likedIngredients") : "";
        if (Ingredients.includes(e.target.value) && !ingFormLocalStorage.includes(e.target.value)){
            let dislikedIngredientstest = localStorage.getItem("likedIngredients") !== null ? JSON.parse(localStorage.getItem("likedIngredients")): [];
            dislikedIngredientstest.push(e.target.value);
            localStorage.setItem("likedIngredients", JSON.stringify(dislikedIngredientstest));
            window.dispatchEvent(new Event('storage'));
        }
    }

    
    return(
        <div className="RecipeListPage-section">
            <div className="RecipeListPage-header">
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
            <div className="RecipeListPage-filters">
                <div className="RecipeListPage-filters-servingCount">
                    <label htmlFor="">Serving Count: </label>
                    <input type="number" min="1" max="99" value={localStorage.getItem("servingCount")  !== null ? localStorage.getItem("servingCount") : recipes[0]?.countOfServing} onChange={updateServingCount} />
                </div>
                <div className="RecipeListPage-filters-maxSum">
                    <label htmlFor="">Max Sum: </label>
                    <input type="number" min="0" max="99" step="0.01" onChange={setMaxSumToToLocalStorage} />
                </div>
                <div className="RecipeListPage-filters-dilikedIngredients">
                    <label>Choose Disliked Ingredients: </label>
                    <input list="dislikeIngredients" onChange={updateDislikedIngredients}/>
                    <datalist id="dislikeIngredients">
                        {
                        filterIngredients.map(ingredient => {
                            return <option key={ingredient} value={ingredient}   />
                        })
                        }
                    </datalist>
                </div>
                <div className='RecipeListPage-filters-likedIngredinets'>
                    <label>Choose Liked Ingredients: </label>
                    <input list="likeIngredients" onChange={updateLikedIngredients} />
                    <datalist id="likeIngredients"  >
                        {
                        filterIngredients.map(ingredient => {
                            return <option key={ingredient} value={ingredient}   />
                        })
                        }
                    </datalist>
                </div>
                    
            </div>
            <div className="RecipeListPage-showChoosenFilters">
                <p>Disliked Ingredients: {localStorage.getItem("dislikedIngredients") !== null ? localStorage.getItem("dislikedIngredients") : "[]"}</p>
                <p>Liked Ingredients: {localStorage.getItem("likedIngredients") !== null ? localStorage.getItem("likedIngredients") : "[]"}</p>
            </div>
      
            
            <div className="RecipeListPage-Reipe-records">
                    <h2>Aviable Recipes: {filterredRecipes.length} </h2>
            </div>
            <RecipesList recipes={filterredRecipes} />
        </div>
    );
}
