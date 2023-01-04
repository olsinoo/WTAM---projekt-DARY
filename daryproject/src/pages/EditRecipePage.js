import { useEffect } from 'react';

export function EditRecipe () {

    useEffect(() => {
        document.title = "Edit Recipe"
     }, []);

     
    return(
        <div>Edit Recipe page</div>
    );
}