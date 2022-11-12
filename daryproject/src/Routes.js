import { Routes as RouterRoutes, Route } from 'react-router-dom';

import { RecipeListPage } from './pages/RecipeListPage';

export function Routes() {
    return(
        <RouterRoutes>
           <Route index element={<RecipeListPage />} />
        </RouterRoutes>
    );
}