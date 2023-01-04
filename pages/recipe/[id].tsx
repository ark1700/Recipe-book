import { GetServerSideProps } from 'next'
import Recipe, { IIngredient, IRecipe } from '../../models/Recipe';
import MainLayout from '../../layouts/MainLayout';
import dbConnect from '../../lib/mongodb';
import { Container, Typography } from '@mui/material';
import { Ingredient, IngredientDash, Ingredients, MainImg } from '../../styles/recipe';
import Grid from '@mui/material/Grid';

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
          <Typography
            variant="h3"
            component="h1"
            sx={{
              marginBottom: 5,
              textAlign: 'center',
            }}
          >{recipe.title}</Typography>
          <Container maxWidth="sm">
            {recipe.img && (
              <MainImg src={recipe.img} alt={recipe.title} />
            )}
            <Typography sx={{marginBlock: 2}}>{recipe.descr}</Typography>
            <Grid
              container
              rowSpacing={0}
              columnSpacing={2}
              columns={{ xs: 4, sm: 12 }}
              sx={{ marginBottom: 3 }}
            >
              {recipe.prepTimeInMinutes && (
                <Grid item xs={4}>
                  <Typography fontSize={12} sx={{margin: 0}}><b>Prep:</b> {recipe.prepTimeInMinutes} minutes</Typography>
                </Grid>
              )}
              {recipe.cookTimeInMinutes && (
                <Grid item xs={4}>
                  <Typography fontSize={12} sx={{margin: 0}}><b>Cook:</b> {recipe.cookTimeInMinutes} minutes</Typography>
                </Grid>
              )}
              <Grid item xs={4}>
                <Typography fontSize={12} sx={{margin: 0}}><b>Serves:</b> {recipe.serves}</Typography>
              </Grid>
            </Grid>
            <Typography
              variant='h5'
              component='h2'
              sx={{marginBlock: 2}}
            >
              Ingredients:
            </Typography>
            <Ingredients>
              {recipe.ingredients.map((i: IIngredient, index: React.Key) => (
                <Ingredient key={index}>
                  <span>{i.name}</span>
                  <IngredientDash></IngredientDash>
                  <span>{i.amount}</span>
                </Ingredient>
              ))}
            </Ingredients>
            <Typography
              variant="h5"
              component="h2"
              sx={{marginBlock: 2}}
            >Nutrition per serve</Typography>
            <Grid
              container
              rowSpacing={0}
              columnSpacing={2}
              columns={{ xs: 4, sm: 12 }}
              sx={{ marginBottom: 3 }}
            >
              <Grid item xs={3}>
                <Typography fontSize={12} sx={{
                  margin: 0,
                  display: 'grid',
                }}>
                  <b>Calories:</b>
                  <span>{recipe.nutrition.calories ?? '-'}kcal</span>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography fontSize={12} sx={{
                  margin: 0,
                  display: 'grid',
                }}>
                  <b>Fat:</b>
                  <span>{recipe.nutrition.fat ?? '-'}g</span>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography fontSize={12} sx={{
                  margin: 0,
                  display: 'grid',
                }}>
                  <b>Carbs:</b>
                  <span>{recipe.nutrition.carbs ?? '-'}g</span>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography fontSize={12} sx={{
                  margin: 0,
                  display: 'grid',
                }}>
                  <b>Protein:</b>
                  <span>{recipe.nutrition.protein ?? '-'}g</span>
                </Typography>
              </Grid>
            </Grid>
            <Typography
              variant="h5"
              component="h2"
              sx={{marginBlock: 2}}
            >Method</Typography>
            <ul>
              {recipe.method.map((i, index: number) => (
                <li key={index}>
                  <p>{i.descr}</p>
                  {i.img && (
                    <MainImg src={i.img} alt={`Step ${index}`} />
                  )}
                </li>
              ))}
            </ul>
          </Container>
        </Container>
      )}
    </MainLayout>
  )
}
