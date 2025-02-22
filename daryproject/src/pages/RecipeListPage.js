import {useEffect, useState} from 'react';
import {faBasketShopping, faPeopleGroup} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import listOfRecipes from '../database/listOfRecipes.json';
import Ingredients from '../database/Ingredients.json';
import {SearchInput} from '../components/SearchInput';
import {RecipesList} from '../components/RecipesList';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './RecipeListPage.css';

export function RecipeListPage() {
    const [recipes, setRecipes] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [allergens, setallergens] = useState([]);
    const [lim, setLim] = useState();
    const [servCount, setServCount] = useState();
    const [allergensIngredients, setAllergensIngredients] = useState([]);

    useEffect(() => {
        setRecipes(listOfRecipes);
        setIngredientsByAllergens() ;
        window.addEventListener('storage', () => {
            const theme = localStorage.getItem("allergens");
            setallergens(theme);
            const theme3 = localStorage.getItem("lim");
            setLim(theme3);
            const theme4 = localStorage.getItem("servingCount");
            setServCount(theme4);
          })
        document.title = "Recipes Overview"
    }, [])

    const filterredRecipes = recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(searchValue.toLowerCase()),
    ).filter(recipe => (localStorage.getItem("allergens") !== null ? allergensIngredients : [])
            .every(ingredient => recipe.ingredients.indexOf(ingredient) === -1))

    const showAlert = (allergen, text) =>{
        console.log(allergen);
        toast.info(text + allergen, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }


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

    const updateallergens = (e) => {
        const ingFormLocalStorage = localStorage.getItem("allergens") !== null ? localStorage.getItem("allergens").toLowerCase() : "";
        let foundTargetIngredient = Object.keys(Ingredients[0]).find(ingre => {return ingre.toLowerCase() === e.target.value.toLowerCase()});
        // if (Object.keys(Ingredients[0]).includes(e.target.value) && !ingFormLocalStorage.includes(e.target.value)){
        if (foundTargetIngredient !== undefined && !ingFormLocalStorage.includes(e.target.value.toLowerCase())){
            showAlert(foundTargetIngredient, "Filter Recipes without Allergen: ");
            let allergenstest = localStorage.getItem("allergens") !== null ? JSON.parse(localStorage.getItem("allergens")): [];
            allergenstest.push(foundTargetIngredient);
            localStorage.setItem("allergens", JSON.stringify(allergenstest));
            let arrayOfIngredients = allergensIngredients;
            Ingredients[0][foundTargetIngredient].forEach(ingredient => arrayOfIngredients.push(ingredient));
            setAllergensIngredients(arrayOfIngredients);
            window.dispatchEvent(new Event('storage'));
            e.target.value = "";
        }
    }

    const setIngredientsByAllergens = () => {
        const arrayOfAllergens = localStorage.getItem("allergens") !== null ? JSON.parse(localStorage.getItem("allergens")) : []
        let arrayOfIngredients = [];
        arrayOfAllergens.forEach(allergen => {
            Ingredients[0][allergen].forEach(ingredient => arrayOfIngredients.push(ingredient));
        });
        setAllergensIngredients(arrayOfIngredients);
    }

    const removeAllergenFromFilter = (e) => {
        showAlert(e.target.value, "Return to records Allergen:");
        let localAllergens = JSON.parse(localStorage.getItem("allergens"));
        localStorage.setItem("allergens", JSON.stringify(localAllergens.filter(item => item !== e.target.value)));
        setIngredientsByAllergens();
        window.dispatchEvent(new Event('storage'));
    }
    
    const resetFilters = () => {
        showAlert("", "Filters have been set to default");
        localStorage.removeItem("allergens");
        setSearchValue("");
        window.dispatchEvent(new Event('storage'));
    }

    // const resetOptions = () => {
    //     localStorage.removeItem("lim");
    //     localStorage.removeItem("servingCount");
    //     setRecipes(recipes.map(recipe => {
    //         return {...recipe,
    //                 price: Number(recipe.price / recipe.countOfServing * 4).toFixed(2),
    //                 countOfServing: 4
    //                 }
    //         }));
    //     document.getElementById('maxSum').value = "";
    //     window.dispatchEvent(new Event('storage'));
    // }
    
    return(
        <div className="RecipeListPage-section">
            <div className="RecipeListPage-header">
                <div className="RecipeListPage-filters">
                    <h3>Filters</h3>
                    <div className="RecipeListPage-underHeader-searchButton">
                        <SearchInput
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.target.value)}/>
                        
                    </div>
                    <div className="RecipeListPage-filters-allergens">
                        <label>Allergens </label>
                       
                        <div className='RecipeListPage-filters-allergens-input '>
                            <input onfocus="this.value=''" list="allergens" placeholder="Write allergens here" onChange={updateallergens}/>
                            <datalist id="allergens">
                                {
                                Object.keys(Ingredients[0]).map( allergen => {
                            
                                    if (localStorage.getItem("allergens") !== null){
                                        if ( !JSON.parse(localStorage.getItem("allergens").includes(allergen))){
                                            return <option key={allergen} value={allergen}   />
                                        }
                                    }else{
                                        return <option key={allergen} value={allergen}   />
                                    }
                            })
                            }
                            </datalist>
                        </div>
                      
                    </div>
                    <div className='RecipeListPage-filters-allergens-chosenAllergens'>
                            {
                                JSON.parse(localStorage.getItem("allergens"))?.map(allergen => {
                                    return (
                                        <div className='RecipeListPage-filters-allergen' key={allergen}>
                                            {allergen}
                                            <button value={allergen} id={allergen} onClick={removeAllergenFromFilter}>Х</button>
                                            
                                        </div>
                                    );
                                }) 
                        
                            }
                        </div>
                    <div className='RecipeListPage-ResetFilter'>
                        <button className='button-green' onClick={resetFilters}>Reset Filters</button>
                    </div>
                </div>  
                <div className="RecipeListPage-options">
                    <h3>Options</h3>
                    <div className='RecipeListPage-options-body'>
                        <div className="RecipeListPage-options-servingCount">
                            <label >Serving Count</label>
                            <div className='RecipeListPage-options-servingCount-input'>
                                <input type="number" min="1" max="99" className='RecipeListPage-options-input' value={localStorage.getItem("servingCount")  !== null ? JSON.parse(localStorage.getItem("servingCount")) : recipes[0]?.countOfServing} onChange={updateServingCount} />
                                <FontAwesomeIcon icon={faPeopleGroup} />
                            </div>
                        </div>
                        <div className="RecipeListPage-options-maxSum">
                            <label >Your budget <FontAwesomeIcon icon={faBasketShopping} /></label>
                            <div className='RecipeListPage-options-maxSum-input'>
                                <input id="maxSum" type="number" min="0" max="100" step="0.1" placeholder='Set num' className='RecipeListPage-options-input' value={localStorage.getItem("lim") !== null ? JSON.parse(localStorage.getItem("lim")) : "Set Lim"} onChange={setMaxSumToToLocalStorage} />
                                &euro;
                            </div>
                        </div>
                    </div>
                    {/* <div className='RecipeListPage-ResetOptions'>
                        <button className='button-blue' onClick={resetOptions}>Reset Options</button>
                    </div> */}
                </div>
             
   
                
            </div>
            <div className="RecipeListPage-Reipe-records">
                    <h2>Amount of recipes: {filterredRecipes.length} </h2>
            </div>
            <RecipesList recipes={filterredRecipes} />
        </div>
    );
}
