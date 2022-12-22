import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { IRecipe } from '../../models/Recipe';

export default function RecipeCard({recipe} : {recipe: IRecipe}) {
  return (
    <Card sx={{
      display: 'flex'
    }}>
      <CardActionArea href={`/recipe/${recipe._id}`}>
        <CardMedia
          component="img"
          height="140"
          image={recipe.img}
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
