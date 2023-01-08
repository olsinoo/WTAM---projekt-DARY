import { Link } from "react-router-dom";
import "../pages/MyListOfRecipesPage.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export function BasketCard({recipe}){

    function getIngredients(_recipe, _amount) {
        return _recipe.ingredients.map(ingredient => {
            return {...ingredient,
                amount: ingredient.amount / _recipe.servingCount  * _amount.target.valueAsNumber,
                price: ingredient.price / _recipe.servingCount  * _amount.target.valueAsNumber}
        });
    }

    function servingLabel(amount) {
        return amount > 1 ? "servings" : "serving";
    }

    const updateRecipe = (e) => {
        if (e.target.value === ""){
            return;
        }
        if (e.target.valueAsNumber === 0) {
            e.target.value = 1;
        }
        if (e.target.valueAsNumber > 99) {
            e.target.value = 99;
        }
        let newRecipe = JSON.parse(localStorage.getItem(recipe.title));

        newRecipe.servingCount  = e.target.valueAsNumber;
        newRecipe.price =  recipe.price / recipe.servingCount  * e.target.valueAsNumber;
        newRecipe.ingredients = getIngredients(recipe, e);
        localStorage.setItem(newRecipe.title, JSON.stringify(newRecipe));

        const oldPrice = JSON.parse(localStorage.getItem("price"));
        localStorage.setItem("price", JSON.stringify(oldPrice - recipe.price + newRecipe.price));
        window.dispatchEvent(new Event('storage'));
    }

    const showAlert = () =>{
        toast.error('Recipe was removed!', {
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


    const removeRecipe = () => {
        showAlert();
        localStorage.removeItem(recipe.title);
        const oldPrice = JSON.parse(localStorage.getItem("price"));
        localStorage.setItem("price", JSON.stringify(oldPrice - recipe.price));
        window.dispatchEvent(new Event('storage'));
    }

    return (
        <div className="BasketCard">
            <div className='BasketCardRecipe'>
                <Link to={`/recipes/${recipe.slug}`} style={{ textDecoration: 'none' }} >
                    <img src={`/img/${recipe.img}`} alt={'Image of '.concat(recipe.title)} />
                    <h3>{recipe.title}</h3>
                </Link>
            </div>
            <div className='BasketCardInformation'>
                <div className='cardIngredients'>
                    show ingredients
                    <span className='cardIngredientsHint'>
                        {recipe.ingredients.map(ing => {return ing.name}).join(', ')}
                    </span>
                </div>
                <div className='BasketCardServings'>
                    <input type="number" min="1" max="99" value={recipe.servingCount} maxLength={2} onChange={updateRecipe}/>
                    <span className='cardServingLabelText'>{servingLabel(recipe.servingCount)}</span>
                </div>
                <div className='BasketCardOtherInfo'>
                    <span><b>{Number(recipe.price).toFixed(2)} &euro;</b></span>
                    {/*<div className="Basket-button-removed">*/}
                    <button onClick={removeRecipe} className='BasketCardRemoveButton'>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </div>
            </div>
        </div>
    );
}