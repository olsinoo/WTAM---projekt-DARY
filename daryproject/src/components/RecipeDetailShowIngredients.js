import { ListOfIngredients } from "./ListOfIngredients"

export function ShowIngredients ({recipe, setRecipe}){

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
                <ListOfIngredients ingredients={recipe.ingredients} servingCount={recipe.servingCount} /> 
           
                <div className="RecipeDetailPage-Ingredients-priceOfAllIngredients">
                    Price of all ingredients:  
                    <p>   {Number(recipe.price / 4 * recipe.servingCount).toFixed(2)} eur</p>
                </div>
                
            </div>
            
        </div>
    );
}