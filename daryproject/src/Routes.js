import { Routes as RouterRoutes, Route } from 'react-router-dom';

import { RecipeListPage } from './pages/RecipeListPage';
import { NewRecipe } from './pages/NewRecipePage';

export function Routes() {
    return(
        <RouterRoutes>
           <Route index element={<RecipeListPage />} />
           <Route path="/new-recipe" element={<NewRecipe />} />
        </RouterRoutes>
    );
}