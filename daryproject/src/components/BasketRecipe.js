import { Link } from 'react-router-dom';

export function BasketRecipe({recipe}){
    const {title, img, slug, price, } = {...recipe}

    return(
       <Link className=''>
            <div>{title}</div>
       </Link>
    );
}