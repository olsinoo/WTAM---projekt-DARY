import { RecipeCard } from './RecipeCard';

export function RecipesList({ recipes }) {
  return (
    <div className='RecipeList-section'>
      {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            title={recipe.title}
            preparationTime={recipe.preparationTime}
            slug={recipe.slug}
            price={recipe.price}
            calories={recipe.calories}
            countOfServing={recipe.countOfServing}
            img={recipe.img}
          />
      ))}
    </div>
  );
}
