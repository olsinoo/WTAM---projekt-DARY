import { Routes as RouterRoutes, Route } from 'react-router-dom';

import { RecipeListPage } from './pages/RecipeListPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { NewRecipe } from './pages/NewRecipePage';
import { EditRecipe } from './pages/EditRecipePage';
import { MyRecipesList } from './pages/MyListOfRecipesPage';

export function Routes() {
    return(
        <RouterRoutes>
           <Route index element={<RecipeListPage />} />
           <Route path="/new-recipe" element={<NewRecipe />} />
           <Route path="/recipes/:slug" element={<RecipeDetailPage />} />
           <Route path="/recipes/:slug/edit" element={<EditRecipe />} />
           <Route path="/recipes-basket" element={<MyRecipesList />} />
        </RouterRoutes>
    );
}