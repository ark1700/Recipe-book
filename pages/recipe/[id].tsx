import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Recipe, { IIngredient, IRecipe } from '../../models/Recipe';
import MainLayout from '../../layouts/MainLayout';
import dbConnect from '../../lib/mongodb';
import { Container } from '@mui/material';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    await dbConnect()
    const recipe = await Recipe.findById(params?.id)
    return {
      props: {
        recipe: JSON.parse(JSON.stringify(recipe)),
      },
    };
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export default function RecipePage({recipe}: {recipe: IRecipe}) {
  return (
    <MainLayout title={recipe?.title}>
      {!recipe ? (
        <h1>Data error</h1>
      ) : (
        <Container>
          <h1 className="title">{recipe.title}</h1>
          {recipe.prepTimeInMinutes && (
            <img src={recipe.img} alt={recipe.title} />
          )}
          <p>{recipe.descr}</p>
          {recipe.prepTimeInMinutes && (
            <p>Prep: {recipe.prepTimeInMinutes} minutes</p>
          )}
          <p>Cook: {recipe.prepTimeInMinutes} minutes</p>
          <p>Serves: {recipe.serves} minutes</p>
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((i: IIngredient, index: React.Key) => (
              <li key={index}>{i.name} - {i.amount}</li>
            ))}
          </ul>
          <h2>Nutrition</h2>
          <p>Calories: {recipe.nutrition.calories ?? '-'}kcal</p>
          <p>Fat: {recipe.nutrition.fat ?? '-'}g</p>
          <p>Carbs: {recipe.nutrition.carbs ?? '-'}g</p>
          <p>Protein: {recipe.nutrition.protein ?? '-'}g</p>
          <h2>Method</h2>
          <ul>
            {recipe.method.map((i, index: number) => (
              <li key={index}>
                <p>{i.descr}</p>
                {i.img && (
                  <img src={i.img} alt={`Step ${index}`} />
                )}
              </li>
            ))}
          </ul>
        </Container>
      )}
    </MainLayout>
  )
}
