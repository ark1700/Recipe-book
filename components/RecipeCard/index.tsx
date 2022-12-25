import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { IRecipe } from '../../models/Recipe';
import Link from 'next/link';

export default function RecipeCard({recipe} : {recipe: IRecipe}) {
  return (
    <Card sx={{
      display: 'flex'
    }}>
      <CardActionArea component={Link} href={`/recipe/${recipe._id}`} passHref>
        <CardMedia
          component="img"
          height="140"
          image={recipe.img ?? 'https://img.freepik.com/premium-vector/electric-plug-barbeque-chef-with-grill_152558-63748.jpg'}
          alt={recipe.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {recipe.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {recipe.descr}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
