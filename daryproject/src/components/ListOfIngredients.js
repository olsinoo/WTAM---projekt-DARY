export function ListOfIngredients({ingredients}){
    if(ingredients?.length === 0){
      return (<div className='RecipeDetailPage-noIngrdients'>No Ingredients.</div>);
    }

    // function groupIngredientsByRecipe(duplicateIngredientsInMultipleRecipes = false) {
    //     const groupedIngredients = {};
    //     for (let ing of ingredients) {
    //         ing.multipleRecipes = ing.recipes.length > 1;
    //         if (duplicateIngredientsInMultipleRecipes) {
    //             for (let rec of ing.recipes) {
    //                 if (rec in groupedIngredients) {
    //                     groupedIngredients[rec].push(ing);
    //                 } else {
    //                     groupedIngredients[rec] = [ing];
    //                 }
    //             }
    //         } else {
    //             if (ing.recipes[0] in groupedIngredients) {
    //                 groupedIngredients[ing.recipes[0]].push(ing);
    //             } else {
    //                 groupedIngredients[ing.recipes[0]] = [ing];
    //             }
    //         }
    //
    //     }
    //     return Object.entries(groupedIngredients).map(([key, value]) => tryNumberOne(key, value));
    //     // Object.entries(groupedIngredients).map(([key, value]) => value?.map((ingredient) => <ShowIngredient key={ingredient._id} ingredient={ingredient} />));
    //     // {ingredients?.map((ingredient) => <ShowIngredient  key={ingredient._id} ingredient={ingredient} />)}
    // }
    //
    // function tryNumberOne(recipeName, ingredients) {
    //     return (
    //         <div>
    //             <li className='RecipeDetailPage-ingredient-recipe'>{recipeName}</li>
    //             {ingredients?.map((ingredient) => <ShowIngredientByRecipe key={ingredient._id} ingredient={ingredient} />)}
    //         </div>
    //     )
    // }
    //
    // const isIngredientInMultipleRecipes = ({ingredient}) => {
    //     return {ingredient}.ingredient.multipleRecipes? {color : 'red'} : {color: 'black'};
    // }
    //
    // const ShowIngredientByRecipe = ({ingredient}) => {
    //     return (
    //         <li className='RecipeDetailPage-ingredient'>
    //             <p className='RecipeDetailPage-ingredient-ingredientAmount'>
    //                 {Number(ingredient?.amount).toFixed(2)}
    //             </p >
    //             <p className='RecipeDetailPage-ingredient-ingredientAmountUnit'>{ingredient?.amountUnit}
    //             </p>
    //             {/*<p className='RecipeDetailPage-ingredient-ingredientName' style={isIngredientInMultipleRecipes({ingredient})}>{ingredient.name}</p>*/}
    //             <p className='RecipeDetailPage-ingredient-ingredientName'>{ingredient.name}</p>
    //             <p className='RecipeDetailPage-ingredient-ingredientPrice'>{Number(ingredient?.price).toFixed(2)} &euro;</p>
    //         </li>
    //     );
    // }

    const ShowIngredient = ({ingredient}) => {
        return (
            <li className='RecipeDetailPage-ingredient'>
                <p className='RecipeDetailPage-ingredient-ingredientAmount'>
                {Number(ingredient?.amount).toFixed(2)}</p>
                <p className='RecipeDetailPage-ingredient-ingredientAmountUnit'>{ingredient?.amountUnit}</p>
                <p className='RecipeDetailPage-ingredient-ingredientName'>{ingredient.name} </p>
                <p className='RecipeDetailPage-ingredient-ingredientPrice'>{Number(ingredient?.price).toFixed(2)} &euro;</p>
            </li>
        );
    }

    return (
        <div className='RecipeDetailPage-Ingredients-box'>
            {ingredients?.map((ingredient) => <ShowIngredient  key={ingredient._id} ingredient={ingredient} />)}
        </div>
        // /*{groupIngredientsByRecipe(false)}*/
);
}
