import { Link } from 'react-router-dom';

export function BasketRecipe({recipe}){
    const {title, img, slug, price, ingredients} = {...recipe}

    return(
       <Link className='' to>
            <div>{title}</div>
       </Link>
    );
}