export function ListOfIngredients({ingredients, servingCount}){
    if(ingredients?.length === 0){
      return (<div className='RecipeDetailPage-noIngrdients'>No Ingredients.</div>);
    };
    
    const ShowIngredient = ({ingredient}) => {
        let ingredientAmount = Number((ingredient.amount / 4 * servingCount).toFixed(2));
        let ingredientPrice = Number((ingredient.price / 4  * servingCount).toFixed(2));

        
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

    return ( 
        <div className='RecipeDetailPage-Ingredients-box'>
            {ingredients?.map((ingredient) => <ShowIngredient  key={ingredient._id} ingredient={ingredient} />)}
        </div>
    );


    
}
