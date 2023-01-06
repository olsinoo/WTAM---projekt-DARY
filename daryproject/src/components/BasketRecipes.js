import { BasketCard } from "./BasketCard";
import "../pages/MyListOfRecipesPage.css";


export function BasketRecipes ({recipes}){

    const ListOfRecipes = () => {
        return recipes.map(recipe => <BasketCard key={recipe.title} recipe={recipe} />);
    }
  
    
    
    return (
        <div className="Basket-listOfRecipes">
            <ListOfRecipes />  
        </div>
    
    );
}