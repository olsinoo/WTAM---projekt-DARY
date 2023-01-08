import { ListOfIngredients } from '../components/ListOfIngredients';
import { BasketRecipes } from '../components/BasketRecipes';
import { useEffect, useState } from 'react';


import "./MyListOfRecipesPage.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileArrowDown} from "@fortawesome/free-solid-svg-icons";

export function MyRecipesList(){
    const [updatePrice, setUpdatePrice] = useState();

    useEffect(() => {
        window.addEventListener('storage', () => {
            const theme = localStorage.getItem("price");
            setUpdatePrice(theme);

        })

        document.title = "My Recipes"

    }, [])



    const recipes =
                Object.keys(localStorage).map(
                    key => {
                        if ((key !== "price")
                            && (key !== "lim")
                            && (key !== "servingCount")
                            && (key !== "allergens")
                            && (key !== "likedIngredients")){
                            return JSON.parse(localStorage.getItem(key));
                        }
                    }).filter(item => item);

    const getIngredients = () => {
        return recipes.map(recipe =>
            {
                let rec = recipe?.ingredients;
                rec.recipeName = recipe.title;
                return rec;
            });
    }

    const GetPrice = () => {
        const arrayOfPrice = recipes.map(recipe =>  recipe?.price);

        return (
            <div className='basket-price'>
                {arrayOfPrice.length !== 0 ? "/" + Number(arrayOfPrice.reduce((result, price) => result = result + price)).toFixed(2) + " €" : "" }
            </div>
        );

    }

    const ingredientsArray = getIngredients();
    const sortedIngredients = () => {
        const updatedIngredients  = {};
        ingredientsArray?.forEach(ingredients => {
            ingredients?.forEach(ingredient =>
                {
                    if (updatedIngredients.hasOwnProperty(ingredient.name)){
                        updatedIngredients[ingredient.name].amount += ingredient.amount;
                        updatedIngredients[ingredient.name].price += ingredient.price;
                        updatedIngredients[ingredient.name].recipes.push(ingredients.recipeName);
                    }
                    else{
                        updatedIngredients[ingredient.name] = ingredient;
                        updatedIngredients[ingredient.name].recipes = [ingredients.recipeName];
                    }
                }
            )
        })
        return Object.keys(updatedIngredients).map( key => updatedIngredients[key]);
    }

    function shopListObjectToText() {
        const groupedIngredients = {};
        let longestIngredientName = "";
        for (let ing of sortedIngredients()) {
            ing.multipleRecipes = ing.recipes.length > 1;
            if (ing.name.length > longestIngredientName.length) {
                longestIngredientName = ing.name;
            }
            for (let rec of ing.recipes) {
                if (rec in groupedIngredients) {
                    groupedIngredients[rec].push(ing);
                } else {
                    groupedIngredients[rec] = [ing];
                }
            }
        }

        let outputText = "";
        for (const [recipeName, recipeIngredients] of Object.entries(groupedIngredients)) {
            outputText += "● " + recipeName + "\n";
            for (let ing of recipeIngredients) {
                outputText += "  ";
                outputText += ing.name + (" ".repeat(longestIngredientName.length - ing.name.length + 1));
                outputText += Number(ing.amount).toFixed(2) + (ing.amountUnit === ""? "pcs" : ing.amountUnit);
                outputText += " -> " + Number(ing.price).toFixed(2) + "€";
                outputText += "\n";
            }
            outputText += "\n";
        }
        return outputText;
    }

    function downloadShoppingList() {
        let blobx = new Blob([shopListObjectToText()], { type: 'text/plain' }); // ! Blob
        let elemx = window.document.createElement('a');
        elemx.href = window.URL.createObjectURL(blobx); // ! createObjectURL
        elemx.download = "ShoppingList.txt";
        elemx.style.display = 'none';
        document.body.appendChild(elemx);
        elemx.click();
        document.body.removeChild(elemx);
    }

    return(
        <div className='basket'>

            <div className='basket-your-limit'>
                <form className='basket-your-limit-form'>
                    <label>Your budget: </label>
                    <input type="number" id="txt1" defaultValue={JSON.parse(localStorage.getItem('lim')) } onChange={(e) => localStorage.setItem('lim', JSON.stringify(e.target.valueAsNumber))} className='basket-your-limit-form-input'/>&euro; </form>
            </div>
            <section>
                <div className='chosen-recipes'>
                    Selected recipes
                </div>
                <details className='basket-recipes'>
                    <summary id='basket-recipes'>show recipes</summary>
                    <div className='basket-recipes'>
                        <BasketRecipes recipes={recipes}  />
                    </div>
                </details>
            </section>

            <section>
                <div className='basket-your-shopping-list'>
                    Your Shopping List
                </div>
                <div className='basket-ingredients'>
                    <ListOfIngredients  ingredients={sortedIngredients()}/>
                </div>
                <div className='basket-shopping-list-bottom'>
                    <button onClick={downloadShoppingList} className="basket-download-button" title="Download shopping list"><FontAwesomeIcon icon={faFileArrowDown}/></button>
                    <GetPrice/>
                </div>
            </section>
        </div>

    )
}