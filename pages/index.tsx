import { GetServerSideProps } from 'next'
import Recipe, { IRecipe } from '../models/Recipe';
import MainLayout from '../layouts/MainLayout';
import dbConnect from '../lib/mongodb';
import RecipeCard from '../components/RecipeCard';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  try {
    await dbConnect()
    const recipes = await Recipe.find({})
    return {
      props: {
        recipes: JSON.parse(JSON.stringify(recipes)),
      }
    };
  } catch (e) {
    console.error(e)
    return {
      props: {},
    }
  }
}

export default function Home({recipes}: {recipes: [IRecipe]}) {
  return (
    <MainLayout>
      <Container>
        <Grid container spacing={2} alignItems="stretch">
            {recipes?.map((item:IRecipe) => (
              <Grid item xs={12} sm={6} md={4} key={item._id.toString()}  sx={{
                display: 'flex'
              }}>
                <RecipeCard recipe={item}/>
              </Grid>
            ))}
        </Grid>
      </Container>
    </MainLayout>
  )
}
