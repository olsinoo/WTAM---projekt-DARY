export function ListOfIngredients({ingredients}){
    if(ingredients?.length === 0){
      return (<div className='RecipeDetailPage-noIngrdients'>No Ingredients.</div>);
    };

    
    const ShowIngredient = ({ingredient}) => {
        return (
        <li className='RecipeDetailPage-ingredient'>
            <p className='RecipeDetailPage-ingredient-ingredientAmount'>
            {Number(ingredient?.amount).toFixed(2)}
            </p >
            <p className='RecipeDetailPage-ingredient-ingredientAmountUnit'>{ingredient?.amountUnit}
            </p>
            <p className='RecipeDetailPage-ingredient-ingredientName'>{ingredient.name} </p>
            <p className='RecipeDetailPage-ingredient-ingredietPrice'>{Number(ingredient?.price).toFixed(2)} &euro;</p>
        </li>
        );
    }

    return ( 
        <div className='RecipeDetailPage-Ingredients-box'>
            {ingredients?.map((ingredient) => <ShowIngredient  key={ingredient._id} ingredient={ingredient} />)}
        </div>
    );


    
}
