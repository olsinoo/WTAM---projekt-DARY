export function ListOfIngredients({ingredients}){
    if(ingredients?.length === 0){
      return (<div className='RecipeDetailPage-noIngrdients'>No Ingredients.</div>);
    };

    
    const ShowIngredient = ({ingredient}) => {
        return (
        <li className='RecipeDetailPage-ingredient'>
            <div className='RecipeDetailPage-ingredient-ingredientAmount'>
            {Number(ingredient?.amount).toFixed(2)}
            </div >
            <div className='RecipeDetailPage-ingredient-ingredientAmountUnit'>{ingredient?.amountUnit}
            </div>
            <div className='RecipeDetailPage-ingredient-ingredientName'>{ingredient.name} </div>
            <div className='RecipeDetailPage-ingredient-ingredietPrice'>{Number(ingredient?.price).toFixed(2)} eur</div>
        </li>
        );
    }

    return ( 
        <div className='RecipeDetailPage-Ingredients-box'>
            {ingredients?.map((ingredient) => <ShowIngredient  key={ingredient._id} ingredient={ingredient} />)}
        </div>
    );


    
}
