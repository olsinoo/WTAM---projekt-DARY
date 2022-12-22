import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { faClock, faPenToSquare, faTrashAlt, faShoppingBasket, 	faFire, faAllergies, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactMarkdown from "react-markdown";
import { ShowIngredients } from '../components/RecipeDetailShowIngredients';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


import './RecipeDetailPage.css';

export function RecipeDetailPage() {
    const { slug } = useParams();
    const [recipe, setRecipe] = useState({});
    const navigate = useNavigate();
    const [openPopup, setOpenPopup] = useState(false);
    
 
    useEffect(() => {
        const newRecipe = require('../database/Recipes/' + slug + '.json')[0]
        const servingCountLS = localStorage.getItem("servingCount") !== null ? parseInt(localStorage.getItem("servingCount")) : newRecipe.servingCount
        setRecipe({...newRecipe, 
            price: newRecipe.price / newRecipe.servingCount * servingCountLS,
            servingCount: servingCountLS,
            ingredients: newRecipe.ingredients
                            .map(ingredient => {
                                return {...ingredient,
                                     amount: ingredient.amount / newRecipe.servingCount * servingCountLS,
                                     price: ingredient.price / newRecipe.servingCount * servingCountLS}
                                })});
    },[slug]);

    

    const convertPreparationTime = () =>{
        const hours = recipe.preparationTime / 60;
        const minutes = recipe.preparationTime % 60;
    
        if (recipe.preparationTime === 0 || recipe.preparationTime === undefined){
          return "Not added time";
        }
    
        let result = "";
    
        if (hours >= 1 ){
          result  =  parseInt(hours) + " h ";
        }
    
        if (minutes !== 0){
          result += minutes + " min";
        }
    
        return result;
    }

    const setMaxSumToToLocalStorage = (e) => {
        
        const value = parseFloat(e.target.value);
        localStorage.setItem("lim", JSON.stringify(value));
    }

    const closeModal = () => {
        setOpenPopup(false);
        addToBasket();
    }

    const PopupButtonCustom = () => {
        if (localStorage.getItem('lim') === null){
            setOpenPopup(true);
            return (<Popup   onClose={closeModal} trigger={ <button className='button-blue' onClick={addToBasket}>Add to <FontAwesomeIcon icon={faShoppingBasket}/>  </button>} modal>
                    <div className='RecipeDetailPage-section-popup'>
                        <h3>You don't set the limit for your    <FontAwesomeIcon icon={faShoppingBasket} />  !!!</h3>
                        <div className='RecipeDerailPage-section-popup-buttons'>
                            <label>Please set the limit  </label>
                            <input type="number" min="1" max="99" onChange={setMaxSumToToLocalStorage} property='Write number here'/>
                            <button className='button-green' onClick={closeModal}> Confirm</button>
                        </div>
                    </div>
            </Popup>);
        }

        return <button className='button-blue' onClick={addToBasket}>Add to <FontAwesomeIcon icon={faShoppingBasket}/>  </button>
    }

    const showAlert =() =>{
        toast.success('Recipe was added!', {
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

    const addToBasket = () =>{
       
        showAlert();
        if (localStorage.getItem('price') === null){
            localStorage.setItem('price', JSON.stringify(recipe.price));
        } else{
            if(localStorage.getItem(recipe.title) === null){
            localStorage.setItem('price', JSON.stringify(recipe.price + parseFloat(localStorage.getItem('price'))));
            }
            else{
                const oldRecipe = JSON.parse(localStorage.getItem(recipe.title));
                const oldPrice = oldRecipe.price;
                localStorage.setItem('price', JSON.stringify(recipe.price + parseFloat(localStorage.getItem('price') - oldPrice)));
            }
            
        }
        if(JSON.parse(localStorage.getItem("lim")) < JSON.parse(localStorage.getItem("price")) ){
            toast.warn('You have exceeded the budget limit', {
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
        localStorage.setItem(recipe.title, JSON.stringify(recipe));
        window.dispatchEvent(new Event('storage'));
    }

    const GetAllergens = () => {
        return recipe?.allergens?.join('  ');
    }

    return(

        <div className='RecipeDetailPage-section'> 
            <button className='RecipeDetailPage-section-buttonBack' onClick={() => navigate(-1)}> <FontAwesomeIcon icon={faArrowLeft} /> Back</button>
            <div className='RecipeDetailPage-header-and-buttons'>
                <div className='RecipeDetailPage-recipeTitle'>
                    <h1>{recipe.title}</h1>
                </div>
                <div className='RecipeDetailPage-buttons'>
                    <PopupButtonCustom />
                  
                    <Link to={`/recipes/${slug}/edit`} >
                        <button className='button-green'> <FontAwesomeIcon icon={faPenToSquare} />     Edit</button>
                    </Link>
                    <Link to={'/'}>
                        <button className='button-red' onClick={() => console.log("Wwooooo you delete recipe -_-")}> <FontAwesomeIcon icon={faTrashAlt} />     Delete</button>
                    </Link>
                </div>
             
            </div>
            <div className='RecipeDetailPage-preparationTime'>
                    <h5>
                        {convertPreparationTime() === "Not added time" ? "" : <FontAwesomeIcon icon={faClock} /> } {convertPreparationTime()}
                    </h5>
                    <h5>
                        <FontAwesomeIcon icon={faFire} /> {Number(recipe.calories).toFixed(0)} kcal
                    </h5>
                    <h5>
                        <FontAwesomeIcon icon={faAllergies} /> <GetAllergens />
                    </h5>
                    
            </div>
            <div className='RecipeDetailPage-body'>
                <div className='RecipeDetailPage-left'>
                    <div className='RecipeDetailPage-recipeImage'>
                        <img src={`/img/${recipe.img}`} alt="FoodImage" />
                    </div>
                    <ShowIngredients recipe={recipe} setRecipe={setRecipe} />    
                </div> 
                <div className="RecipeDetailPage-Directions">
                    <ReactMarkdown className="reactmarckDown" hidden={recipe?.directions?.length < 1} >
                        {recipe.directions}
                    </ReactMarkdown>
                    <div className="RecipeDetailPage-Directions-noMethod" hidden={recipe?.directions?.length > 1}>
                        No Method
                    </div>
                </div>
            </div>
          
            <div className="RecipeDetailPage-lastUpdateTime">
                <h3>Last Changes:</h3>
                <h4>{recipe.lastModifiedDate?.split('T')[0]}</h4>
            </div>   
        </div>
    );
}