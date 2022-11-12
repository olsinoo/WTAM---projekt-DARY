import { Routes as RouterRoutes, Route } from 'react-router-dom';

import { RecipeListPage } from './pages/RecipeListPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { NewRecipe } from './pages/NewRecipePage';
import { EditRecipe } from './pages/EditRecipePage';

export function Routes() {
    return(
        <RouterRoutes>
           <Route index element={<RecipeListPage />} />
           <Route path="/new-recipe" element={<NewRecipe />} />
           <Route path="/recipes/:slug" element={<RecipeDetailPage />} />
           <Route path="/recipes/:slug/upravit" element={<EditRecipe />} />
        </RouterRoutes>
    );
}