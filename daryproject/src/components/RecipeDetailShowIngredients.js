export function ShowIngredients ({recipe, setRecipe}){
   

    const ListOfIngredients = ({ingredients}) => {
        if(ingredients?.length === 0){
          return (<div className='RecipeDetailPage-noIngrdients'>No Ingredients.</div>);
        }
    
        return ( 
            <div className='RecipeDetailPage-Ingredients-box'>
                {ingredients?.map((ingredient) => <ShowIngredient  key={ingredient._id} ingredient={ingredient} />)}
            </div>
        );
    }

    const ShowIngredient = ({ingredient}) => {
        let ingredientAmount = Number((ingredient.amount / 4 * recipe.servingCount).toFixed(2));
        let ingredientPrice = Number((ingredient.price / 4  * recipe.servingCount).toFixed(2));

        
        return (
          <li className='RecipeDetailPage-ingredient'>
            <div className='RecipeDetailPage-ingredient-ingredientAmount'>
            {ingredientAmount}
            </div >
            <div className='RecipeDetailPage-ingredient-ingredientAmountUnit'>{ingredient?.amountUnit}
            </div>
            <div className='RecipeDetailPage-ingredient-ingredientName'>{ingredient.name} </div>
            <div className='RecipeDetailPage-ingredient-ingredietPrice'>{ingredientPrice} eur</div>
          </li>
        );
    }

    const updateServingCount = (e) => {
        if (e.target.value === ""){
          return
        }
    
        if (e.target.valueAsNumber < 1 || e.target.valueAsNumber > 99){
          return
        }
        
        setRecipe({...recipe, servingCount: e.target.valueAsNumber})
    }

    return(
        <div className='RecipeDetailPage-Ingredients-and-Directions'>
            <div className='RecipeDetailPage-Ingredients'>
                <div className="RecipeDetailPage-Ingredient-ServingCount-Section">
                    <span hidden={recipe.ingredients?.length === 0}>Serving Count</span>
                    <div className='RecipeDetailPage-Ingredient-ServingCount-Section-input'>
                        <input type="number" min="1" max="99" value={recipe.servingCount} onChange={updateServingCount} ></input>
                    </div>    
                </div>   
                <ListOfIngredients ingredients={recipe.ingredients}/> 
           
                <div className="RecipeDetailPage-Ingredients-priceOfAllIngredients">
                    Price of all ingredients:  
                    <p>   {Number(recipe.price / 4 * recipe.servingCount).toFixed(2)} eur</p>
                </div>
                
            </div>
            
        </div>
    );
}